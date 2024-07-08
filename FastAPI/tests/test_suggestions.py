from app import schemas

def test_create_suggestion(client):
    response = client.post("/suggestions/", json={"suggestion": "Test suggestion"})
    assert response.status_code == 201
    suggestion = schemas.SuggestionResponse(**response.json())
    assert suggestion.suggestion == "Test suggestion"

def test_create_suggestion_invalid_data(client):
    response = client.post("/suggestions/", json={"suggestion": 8})
    assert response.status_code == 422

def test_get_suggestion(client, test_suggestion):
    response = client.get(f"/suggestions/{test_suggestion['id']}")
    suggestion = schemas.SuggestionResponse(**response.json())
    assert suggestion.id == test_suggestion['id']
    assert response.status_code == 200

def test_get_suggestion_not_found(client):
    response = client.get("/suggestions/999")
    assert response.status_code == 404

def test_get_suggestions(client, test_suggestion):
    response = client.get("/suggestions/")
    assert response.status_code == 200

def test_delete_suggestion(client, test_suggestion):
    response = client.delete(f"/suggestions/{test_suggestion['id']}")
    assert response.status_code == 204