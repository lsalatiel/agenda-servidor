import pytest
from app import schemas
from app.config import settings
from jose import jwt

def test_create_user(client):
    response = client.post("/users/", json={"id": "12345678911", "name": "Pedro", "email": "pedroCampagnoli@gmail.com", "password": "123"})
    new_user = schemas.UserResponse(**response.json())
    assert new_user.email == "pedroCampagnoli@gmail.com"
    assert response.status_code == 201

@pytest.mark.parametrize("id, name, email, password, status_code", [
    ('56789723141', 'carlos', 'wrongemail.com', 'password123', 422),  # invalid email
    (56789723142, 'lucas', 'lucas@gmail.com', '123', 422), # invalid id
    ('12345678911', 'gabi', 'gabi@gmail.com', 'gabi', 400), # id already exists
    ('56789723144', 'pedro lucas', 'pedroCampagnoli@gmail.com', 'pass', 400), # email already exists
])
def test_create_user_incorrect(client, test_user, id, name, email, password, status_code):
    response = client.post("/users/", json={"id": id, "name": name, "email": email, "password": password})
    assert response.status_code == status_code

def test_get_user(test_user, client):
    response = client.get("/users/12345678911")
    user = schemas.UserResponse(**response.json())
    assert user.email == "pedroCampagnoli@gmail.com"
    assert response.status_code == 200
    assert user.name == "Pedro"

def test_login_user(client, test_user):
    response = client.post("/login/", data={"username": test_user['id'], "password": test_user['password']})
    login_response = schemas.Token(**response.json())
    payload = jwt.decode(login_response.access_token, settings.secret_key, algorithms=[settings.algorithm])
    id = payload.get("user_id")
    assert id == test_user['id']
    assert login_response.token_type == "bearer"
    assert response.status_code == 200

@pytest.mark.parametrize("username, password, status_code", [
    ('12345678911', 'wrongpassword', 403),  # invalid
    ('wrongusername', '123', 403), # invalid
])
def test_login_user_incorrect(client, test_user, username, password, status_code):
    response = client.post("/login/", data={"username": test_user['id'], "password": "wrongpassword"})
    assert response.status_code == 403