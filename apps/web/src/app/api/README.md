# API Documentation

This API is built using Hono.js and is integrated with Next.js API routes. It provides a RESTful interface for the application with built-in authentication using Supabase.

## Structure

```
api/
├── middleware/     # API middleware (auth, rate-limit, etc.)
├── routes/         # Route handlers
├── types.ts        # Shared types
└── route.ts        # Main API setup
```

## Authentication

The API uses Supabase for authentication. Protected routes require a valid session token which should be included in the request cookies.

## Rate Limiting

All endpoints are protected by rate limiting:

- 100 requests per minute per IP by default
- Headers included in response:
  - `X-RateLimit-Limit`: Maximum requests allowed per window
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Time when the rate limit resets (Unix timestamp)

## Available Endpoints

### Public Routes

- `GET /api/health`
  - Check API health status
  - No authentication required

### Protected Routes

All protected routes require authentication.

#### Users

- `GET /api/users`

  - List users (paginated)
  - Query Parameters:
    - `page` (optional): Page number (default: 1)
    - `limit` (optional): Items per page (default: 10)
    - `search` (optional): Search users by name

- `POST /api/users`

  - Create a new user
  - Body:
    ```typescript
    {
      name: string; // min 2 characters
      email: string; // valid email
    }
    ```

- `GET /api/users/:id`

  - Get user details by ID

- `PATCH /api/users/:id`

  - Update user details
  - Body (at least one field required):
    ```typescript
    {
      name?: string;  // min 2 characters
      email?: string; // valid email
    }
    ```

- `DELETE /api/users/:id`
  - Delete a user
  - Returns 204 on success

## Response Format

All API responses follow this format:

```typescript
{
  data?: T;  // Success response data
  error?: {
    message: string;
    status: number;
  }
}
```

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 204: No Content (for successful DELETE)
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict (e.g., email already exists)
- 429: Too Many Requests (rate limit exceeded)
- 500: Internal Server Error

Common error scenarios:

- User not found: 404
- Email already exists: 409
- Invalid input: 400
- Rate limit exceeded: 429
- Authentication failed: 401

## Development

To add new routes:

1. Create a new file in the `routes` directory
2. Define your routes using Hono
3. Import and mount the routes in `route.ts`
4. Update types in `types.ts` if needed
5. Add rate limiting using the `rateLimit()` middleware

## Testing

To test the API endpoints:

1. Make sure the development server is running
2. Use the health check endpoint to verify the API is accessible
3. For protected routes, ensure you're authenticated with Supabase
4. Check rate limit headers in responses

## Environment Variables

Required environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
