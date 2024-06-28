from fastapi.testclient import TestClient
from app.main import app
from app.database import Base

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import settings
from app.database import get_db

import pytest
from datetime import datetime, timedelta

from app.oauth2 import create_access_token

SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}'

engine = create_engine(SQLALCHEMY_DATABASE_URL)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture()
def session():
    Base.metadata.drop_all(bind=engine) # drop the tables before the test
    Base.metadata.create_all(bind=engine) # create the tables before the test
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

@pytest.fixture()
def client(session):
    def override_get_db():
        try:
            yield session
        finally:
            session.close()
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)

@pytest.fixture()
def test_user(client):
    user_data = {"id": "912.890.377-36", "name": "Pedro", "email": "pedroCampagnoli@gmail.com", "password": "123"}
    response = client.post("/users/", json=user_data)
    assert response.status_code == 201

    new_user = response.json()
    new_user['password'] = user_data['password']
    return new_user

@pytest.fixture()
def test_area(client):
    area_data = {"id": "3", "name": "Test Area"}
    response = client.post("/areas/", json=area_data)
    assert response.status_code == 201

    return area_data

@pytest.fixture()
def test_schedule(client, test_area, test_user):
    start_time = datetime.now()
    end_time = start_time + timedelta(hours=1)
    schedule_data = {"area_id": "3", "user_id": "912.890.377-36", "start_time": start_time.isoformat(), "end_time": end_time.isoformat()}
    response = client.post("/schedules/", json=schedule_data)
    assert response.status_code == 201

    return response.json()

@pytest.fixture()
def token(test_user):
    return create_access_token({"user_id": test_user['id']})

@pytest.fixture()
def authorized_client(client, token):
    client.headers = {
        **client.headers,
        "Authorization": f"Bearer {token}"
    }
    return client