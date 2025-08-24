# API Contracts

Base URL: `http://<backend-host>:8080/api`

## Todo
- `GET /todos` → 200 OK `[ { id, title, completed } ]`
- `GET /todos/{id}` → 200 OK `{ id, title, completed }` | 404
- `POST /todos` body `{ title: string, completed: boolean }` → 201 Created `{ id, title, completed }`
- `PUT /todos/{id}` body `{ title: string, completed: boolean }` → 200 OK `{ id, title, completed }`
- `DELETE /todos/{id}` → 204 No Content

## Validation
- `title` is required (non-blank)

## Errors
- 400: validation errors
- 404: not found
- 500: server error