from app import schemas

def test_create_area(client):
    response = client.post("/areas/", json={"id": "3", "name": "Test Area"})
    new_area = schemas.AreaCreate(**response.json())
    assert new_area.name == "Test Area"
    assert response.status_code == 201

def test_create_area_duplicate(test_area, client):
    response = client.post("/areas/", json={"id": "3", "name": "Area"})
    assert response.status_code == 400

def test_get_area(client, test_area):
    response = client.get(f"/areas/{test_area['id']}")
    area = schemas.AreaResponse(**response.json())
    assert area.id == int(test_area['id'])
    assert response.status_code == 200
    assert area.name == "Test Area"

def test_get_area_not_found(client):
    response = client.get("/areas/999")
    assert response.status_code == 404

def test_delete_area(client, test_area):
    response = client.delete(f"/areas/{test_area['id']}")
    assert response.status_code == 204

def test_delete_area_not_found(client):
    response = client.delete("/areas/999")
    assert response.status_code == 404
