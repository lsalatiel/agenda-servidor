# Endpoints

## User Create
To create a new user, send a POST request to the `/users` endpoint with the following JSON payload:

```json
{
    "id": "123-456-789-10"
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}
```

The server will respond with a 201 Created status code and the newly created user object in the response body.

```json
{
    "id": "123-456-789-10",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "type": "student",
    "course": "None",
    "created_at": "2024-07-08T08:57:10.251572-03:00"
}
```

Endpoint: `/users`
Method: POST


## User Login
To authenticate a user, send a POST request to the `/login` endpoint with the following form-data payload:

```
username: 123-456-789-10
password: password123
```

The server will respond with a 200 OK status code and a JSON Web Token (JWT) in the response body. This token can be used for subsequent authenticated requests.

```json
{
    "access_token": "x.x.x",
    "token_type": "bearer"
}
```

Endpoint: `/login`
Method: POST

Please note that the email and password provided must match an existing user in the system.


## User Get
To retrieve the profile of a user, send a GET request to the `/users/{id}` endpoint, where `{id}` is the CPF of the user.

The server will respond with a 200 OK status code and the user object in the response body.

```json
{
    "id": "123-456-789-10",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "type": "student",
    "course": "None",
    "created_at": "2024-07-08T08:57:10.251572-03:00"
}
```

Endpoint: `/users/{id}`
Method: GET


## Schedule Create
To create a new schedule, send a POST request to the `/schedules` endpoint with the following JSON payload:

```json
{
    "area_id": 1,
    "user_id": "123-456-789-10",
    "start_time": "2024-06-21T14:00:00Z",
    "end_time": "2024-06-21T16:00:00Z"
}
```

The server will respond with a 201 Created status code and the newly created schedule object in the response body.

```json
{
    "id": 1,
    "area": {
        "id": 1,
        "name": "Field",
        "is_open": 1
    },
    "user": {
        "id": "123-456-789-10",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "type": "student",
        "course": "None",
        "created_at": "2024-07-08T08:57:10.251572-03:00"
    },
    "start_time": "2024-06-21T14:00:00Z",
    "end_time": "2024-06-21T16:00:00Z",
    "created_at": "2024-07-08T09:01:18.115479-03:00"
}
```

Endpoint: `/schedules`
Method: POST


## Schedule Get
To retrieve the details of a schedule, send a GET request to the `/schedules/{id}` endpoint, where `{id}` is the unique identifier of the schedule.

The server will respond with a 200 OK status code and the schedule object in the response body.

Endpoint: `/schedules/{id}`
Method: GET


## Schedules Get
To retrieve all schedules, send a GET request to the `/schedules` endpoint.

The server will respond with a 200 OK status code and an array of schedule objects in the response body.

Endpoint: `/schedules`
Method: GET


## Schedule Delete
To delete a schedule, send a DELETE request to the `/schedules/{id}` endpoint, where {id} is the unique identifier of the schedule.

The server will respond with a 204 No Content status code if the schedule is successfully deleted.

Endpoint: `/schedules/{id}` Method: DELETE

## Area Create
To create a new area, send a POST request to the `/areas` endpoint with the following JSON payload:

```json
{
    "id": 1,
    "name": "Field"
}
```

The server will respond with a 201 Created status code and the newly created area object in the response body.

```json
{
    "id": 1,
    "name": "Field",
    "is_open": 1
}
```

Endpoint: `/areas`
Method: POST


## Area Get
To retrieve the details of an area, send a GET request to the `/areas/{id}` endpoint, where `{id}` is the unique identifier of the area.

The server will respond with a 200 OK status code and the area object in the response body.

Endpoint: `/areas/{id}`
Method: GET


## Areas Get
To retrieve all areas, send a GET request to the `/areas` endpoint.

The server will respond with a 200 OK status code and an array of area objects in the response body.

Endpoint: `/areas`
Method: GET

## Area Delete
To delete an area, send a DELETE request to the `/areas/{id}` endpoint, where `{id}` is the unique identifier of the area.

The server will respond with a 204 No Content status code if the area is successfully deleted.

Endpoint: `/areas/{id}`
Method: DELETE

## Suggestion Create
To suggest a new feature or report a bug, send a POST request to the `/suggestions` endpoint with the following JSON payload:

```json
{
    "suggestion": "I would like to suggest adding a search functionality to the application.",
}
```

The server will respond with a 201 Created status code and the newly created suggestion object in the response body.

```json
{
    "id": 1,
    "suggestion": "I would like to suggest adding a search functionality to the application",
    "created_at": "2024-07-08T09:05:08.833909-03:00"
}
```

Endpoint: `/suggestions`
Method: POST

## Suggestion Get
To retrieve the details of a suggestion, send a GET request to the `/suggestions/{id}` endpoint, where `{id}` is the unique identifier of the suggestion.

The server will respond with a 200 OK status code and the suggestion object in the response body.

Endpoint: `/suggestions/{id}`
Method: GET

## Suggestions Get
To retrieve all suggestions, send a GET request to the `/suggestions` endpoint.

The server will respond with a 200 OK status code and an array of suggestion objects in the response body.

Endpoint: `/suggestions`
Method: GET

## Suggestion Delete
To delete a suggestion, send a DELETE request to the `/suggestions/{id}` endpoint, where `{id}` is the unique identifier of the suggestion.

The server will respond with a 204 No Content status code if the suggestion is successfully deleted.

Endpoint: `/suggestions/{id}`
Method: DELETE
