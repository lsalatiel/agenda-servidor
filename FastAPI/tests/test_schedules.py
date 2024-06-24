import pytest
from app import schemas
from datetime import datetime, timedelta

def test_create_schedule(client, test_area, test_user):
    start_time = datetime.now()
    end_time = start_time + timedelta(hours=1)
    response = client.post("/schedules/", json={"area_id": test_area['id'], "user_id": test_user['id'], "start_time": start_time.isoformat(), "end_time": end_time.isoformat()})
    new_schedule = schemas.ScheduleResponse(**response.json())
    assert new_schedule.area.id == int(test_area['id'])
    assert new_schedule.user.id == test_user['id']
    assert response.status_code == 201

def test_create_schedule_invalid_data(client):
    response = client.post("/schedules/", json={"area_id": 999, "user_id": "invalid", "start_time": "invalid", "end_time": "invalid"})
    assert response.status_code == 422

def test_get_schedule(client, test_schedule):
    response = client.get(f"/schedules/{test_schedule['id']}")
    schedule = schemas.ScheduleResponse(**response.json())
    assert schedule.id == test_schedule['id']
    assert response.status_code == 200

def test_get_schedule_not_found(client):
    response = client.get("/schedules/999")
    assert response.status_code == 404

def test_delete_schedule(client, test_schedule):
    response = client.delete(f"/schedules/{test_schedule['id']}")
    assert response.status_code == 204

def test_delete_schedule_not_found(client):
    response = client.delete("/schedules/999")
    assert response.status_code == 404
