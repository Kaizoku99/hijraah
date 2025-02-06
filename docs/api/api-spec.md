# Hijraah API Specifications

## API Overview

Base URL: `https://api.hijraah.com/v1`

### Authentication
- Bearer token authentication
- Tokens issued via OAuth 2.0
- JWT format
- 24-hour expiration
- Refresh token support

### Request Headers
```
Authorization: Bearer <token>
Content-Type: application/json
Accept: application/json
X-Request-ID: <unique-request-id>
```

### Response Format
```json
{
  "status": "success|error",
  "data": {}, // Response data
  "error": {}, // Error details if status is error
  "meta": {    // Pagination and other metadata
    "page": 1,
    "per_page": 20,
    "total": 100
  }
}
```

## API Endpoints

### Authentication

#### POST /auth/register
Create a new user account
```json
Request:
{
  "email": "string",
  "password": "string",
  "first_name": "string",
  "last_name": "string",
  "country": "string"
}

Response:
{
  "status": "success",
  "data": {
    "user_id": "uuid",
    "email": "string",
    "verification_sent": true
  }
}
```

#### POST /auth/login
Authenticate user
```json
Request:
{
  "email": "string",
  "password": "string"
}

Response:
{
  "status": "success",
  "data": {
    "access_token": "string",
    "refresh_token": "string",
    "expires_in": 86400
  }
}
```

#### POST /auth/refresh
Refresh access token
```json
Request:
{
  "refresh_token": "string"
}

Response:
{
  "status": "success",
  "data": {
    "access_token": "string",
    "expires_in": 86400
  }
}
```

### User Management

#### GET /users/me
Get current user profile
```json
Response:
{
  "status": "success",
  "data": {
    "id": "uuid",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "country": "string",
    "created_at": "timestamp",
    "profile": {}
  }
}
```

#### PUT /users/me
Update user profile
```json
Request:
{
  "first_name": "string",
  "last_name": "string",
  "country": "string",
  "phone": "string",
  "preferences": {}
}

Response:
{
  "status": "success",
  "data": {
    "id": "uuid",
    "updated_at": "timestamp"
  }
}
```

### Immigration Cases

#### POST /cases
Create new immigration case
```json
Request:
{
  "case_type": "string",
  "destination_country": "string",
  "target_date": "date",
  "notes": "string",
  "requirements": {}
}

Response:
{
  "status": "success",
  "data": {
    "case_id": "uuid",
    "created_at": "timestamp"
  }
}
```

#### GET /cases
List user's immigration cases
```json
Query Parameters:
- page (integer)
- per_page (integer)
- status (string)
- type (string)

Response:
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "case_type": "string",
      "destination_country": "string",
      "current_stage": "string",
      "status": "string",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100
  }
}
```

#### GET /cases/{case_id}
Get case details
```json
Response:
{
  "status": "success",
  "data": {
    "id": "uuid",
    "case_type": "string",
    "destination_country": "string",
    "current_stage": "string",
    "status": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "target_date": "date",
    "requirements": {},
    "notes": "string",
    "documents": [],
    "tasks": []
  }
}
```

### Document Management

#### POST /documents/upload
Upload document
```json
Request:
Content-Type: multipart/form-data
{
  "file": "binary",
  "case_id": "uuid",
  "type": "string",
  "metadata": {}
}

Response:
{
  "status": "success",
  "data": {
    "document_id": "uuid",
    "name": "string",
    "type": "string",
    "size": "integer",
    "uploaded_at": "timestamp"
  }
}
```

#### GET /documents
List documents
```json
Query Parameters:
- case_id (uuid)
- type (string)
- page (integer)
- per_page (integer)

Response:
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "type": "string",
      "status": "string",
      "uploaded_at": "timestamp",
      "expires_at": "date"
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100
  }
}
```

### Chat System

#### POST /chat/sessions
Create new chat session
```json
Request:
{
  "case_id": "uuid?",
  "context": {}
}

Response:
{
  "status": "success",
  "data": {
    "session_id": "uuid",
    "created_at": "timestamp"
  }
}
```

#### POST /chat/messages
Send chat message
```json
Request:
{
  "session_id": "uuid",
  "content": "string",
  "metadata": {}
}

Response:
{
  "status": "success",
  "data": {
    "message_id": "uuid",
    "content": "string",
    "timestamp": "timestamp",
    "role": "user|assistant"
  }
}
```

#### GET /chat/sessions/{session_id}/messages
Get chat history
```json
Query Parameters:
- before (timestamp)
- limit (integer)

Response:
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "content": "string",
      "role": "user|assistant",
      "timestamp": "timestamp",
      "metadata": {}
    }
  ]
}
```

### Assessment Tools

#### POST /assessments/eligibility
Create eligibility assessment
```json
Request:
{
  "case_type": "string",
  "destination_country": "string",
  "criteria": {
    "age": "integer",
    "education": "string",
    "work_experience": "integer",
    "language_scores": {},
    "other_factors": {}
  }
}

Response:
{
  "status": "success",
  "data": {
    "assessment_id": "uuid",
    "score": "integer",
    "eligible": "boolean",
    "breakdown": {},
    "recommendations": []
  }
}
```

### Tasks

#### POST /tasks
Create task
```json
Request:
{
  "case_id": "uuid",
  "title": "string",
  "description": "string",
  "due_date": "date",
  "priority": "integer"
}

Response:
{
  "status": "success",
  "data": {
    "task_id": "uuid",
    "created_at": "timestamp"
  }
}
```

#### GET /tasks
List tasks
```json
Query Parameters:
- case_id (uuid)
- status (string)
- page (integer)
- per_page (integer)

Response:
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "due_date": "date",
      "status": "string",
      "priority": "integer"
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100
  }
}
```

### Notifications

#### GET /notifications
List notifications
```json
Query Parameters:
- unread_only (boolean)
- page (integer)
- per_page (integer)

Response:
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "type": "string",
      "message": "string",
      "created_at": "timestamp",
      "read_at": "timestamp?",
      "action_url": "string?"
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100
  }
}
```

## Error Codes

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Unprocessable Entity
- 429: Too Many Requests
- 500: Internal Server Error

### Error Response Format
```json
{
  "status": "error",
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

### Common Error Codes
```
AUTH_001: Invalid credentials
AUTH_002: Token expired
AUTH_003: Invalid token
AUTH_004: Account locked

VAL_001: Invalid input
VAL_002: Missing required field
VAL_003: Invalid format

API_001: Rate limit exceeded
API_002: Service unavailable
API_003: Resource not found
API_004: Permission denied
```

## Rate Limiting

- Rate limit: 100 requests per minute per user
- Rate limit headers included in response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1625097600
```

## Webhooks

### Configuration
Endpoint: POST /webhooks/configure
```json
Request:
{
  "url": "string",
  "events": ["case.updated", "document.uploaded", "assessment.completed"],
  "secret": "string"
}
```

### Event Format
```json
{
  "event_type": "string",
  "timestamp": "timestamp",
  "data": {},
  "signature": "string"
}
```

## API Versioning

- Version included in URL path
- Supported versions: v1
- Deprecation notice via response header:
```
X-API-Deprecation: Version v1 will be deprecated on 2024-12-31
```
