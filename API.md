# API Documentation

Base URL: `http://localhost:3000/api`

## Table of Contents
- [Authentication](#authentication)
- [Task Management](#task-management)
- [Error Handling](#error-handling)

---

## Authentication

### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Missing required fields or user already exists
- `500` - Server error

---

### Login User

Authenticate and receive a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Missing credentials
- `401` - Invalid credentials
- `500` - Server error

---

### Get Current User

Get authenticated user details.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2026-02-01T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` - No token provided
- `403` - Invalid or expired token
- `404` - User not found

---

## Task Management

### Get All Tasks

Retrieve all tasks with optional filtering and search.

**Endpoint:** `GET /tasks`

**Headers (Optional):**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `status` (optional) - Filter by status: `pending`, `in-progress`, `completed`, or `all`
- `search` (optional) - Search in title and description
- `sortBy` (optional) - Sort field: `created_at`, `updated_at`, `title`, `status` (default: `created_at`)
- `order` (optional) - Sort order: `ASC` or `DESC` (default: `DESC`)

**Example Requests:**
```
GET /api/tasks
GET /api/tasks?status=pending
GET /api/tasks?search=meeting
GET /api/tasks?status=completed&sortBy=title&order=ASC
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": null,
      "title": "Sample Task",
      "description": "This is a sample task",
      "status": "pending",
      "created_at": "2026-02-01T10:00:00.000Z",
      "updated_at": "2026-02-01T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

### Get Single Task

Retrieve a specific task by ID.

**Endpoint:** `GET /tasks/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": null,
    "title": "Sample Task",
    "description": "This is a sample task",
    "status": "pending",
    "created_at": "2026-02-01T10:00:00.000Z",
    "updated_at": "2026-02-01T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `404` - Task not found
- `500` - Server error

---

### Create Task

Create a new task.

**Endpoint:** `POST /tasks`

**Headers (Optional):**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending"
}
```

**Fields:**
- `title` (required) - Task title
- `description` (optional) - Task description
- `status` (optional) - `pending`, `in-progress`, or `completed` (default: `pending`)

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "user_id": 1,
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "created_at": "2026-02-01T11:00:00.000Z",
    "updated_at": "2026-02-01T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing required fields
- `500` - Server error

---

### Update Task

Update an existing task.

**Endpoint:** `PUT /tasks/:id`

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "user_id": 1,
    "title": "Updated Task",
    "description": "Updated description",
    "status": "completed",
    "created_at": "2026-02-01T11:00:00.000Z",
    "updated_at": "2026-02-01T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing required fields
- `404` - Task not found
- `500` - Server error

---

### Delete Task

Delete a task by ID.

**Endpoint:** `DELETE /tasks/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Responses:**
- `404` - Task not found
- `500` - Server error

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (invalid token)
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication Flow

1. **Register or Login** to get JWT token
2. **Include token** in subsequent requests:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
3. **Token expires** after 7 days (configurable)
4. **Re-authenticate** when token expires

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Get Tasks (Authenticated)
```bash
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"New Task","description":"Description","status":"pending"}'
```

### Update Task
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","description":"Updated desc","status":"completed"}'
```

### Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

---

## Testing with Postman

1. Import the API endpoints into Postman
2. Create an environment variable `token` 
3. Set `token` value after login
4. Use `{{token}}` in Authorization header

---

## Rate Limiting (Future Enhancement)

Consider implementing rate limiting for production:
- Max 100 requests per 15 minutes per IP
- Max 1000 requests per hour per user

## Pagination (Future Enhancement)

For large datasets, consider adding pagination:
```
GET /api/tasks?page=1&limit=10
```
