# Hono API Development Guide

This guide provides comprehensive documentation for developing and using the Hono API in the Hijraah platform.

## Overview

Hono.js is used as the primary API framework for high-performance, type-safe API endpoints in the Hijraah platform. Hono provides:

- Type-safe routing with TypeScript
- Middleware support for cross-cutting concerns
- Excellent performance characteristics
- Support for various environments (Edge, Node.js, etc.)

## API Architecture

The Hono API is structured following these principles:

- Feature-based organization
- Consistent error handling
- Strong input validation with Zod
- Proper middleware composition
- Clear separation of concerns

## Directory Structure

```
src/
└── api/
    └── hono/
        ├── index.ts             # Main Hono app configuration
        ├── server.ts            # Local development server
        ├── types.ts             # Shared types for the API
        ├── routes/              # API route definitions
        │   ├── auth/            # Authentication routes
        │   ├── documents/       # Document management routes
        │   ├── research/        # Research-related routes
        │   └── ...
        ├── middleware/          # Shared middleware
        │   ├── auth.ts          # Authentication middleware
        │   ├── redis-cache.ts   # Redis caching middleware
        │   ├── subscription-rate-limit.ts # Rate limiting middleware
        │   └── ...
        └── lib/                 # API-specific utilities
            ├── validation.ts    # Validation utilities
            ├── error-handler.ts # Error handling utilities
            └── ...
```

## Core API Setup

The main Hono API setup is defined in `src/api/hono/index.ts`:

```typescript
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { authMiddleware } from './middleware/auth';
import { errorHandlerMiddleware } from './middleware/error-handler';
import { metricsMiddleware } from './middleware/metrics';
import { authRoutes } from './routes/auth';
import { documentsRoutes } from './routes/documents';
import { researchRoutes } from './routes/research';
import { type HijarahEnv } from './types';

// Create the main Hono app
const app = new Hono<HijarahEnv>();

// Global middleware
app.use('*', logger());
app.use('*', metricsMiddleware());
app.use('*', cors({
  origin: ['https://hijraah.com', 'http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  exposeHeaders: ['Content-Length', 'X-Request-Id'],
  credentials: true,
  maxAge: 86400,
}));
app.use('*', errorHandlerMiddleware());

// Development-only middleware
if (process.env.NODE_ENV === 'development') {
  app.use('*', prettyJSON());
}

// API routes
app.route('/auth', authRoutes);
app.route('/documents', documentsRoutes);
app.route('/research', researchRoutes);

// Protected routes (requiring authentication)
const protectedApp = new Hono<HijarahEnv>();
protectedApp.use('*', authMiddleware());
app.route('/api/v1', protectedApp);

export default app;
```

## Environment Variables

The Hono API requires the following environment variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your-upstash-redis-rest-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-rest-token

# API
API_SECRET_KEY=your-api-secret-key
```

## Authentication

The API supports several authentication methods:

1. **JWT Authentication** (primary) - Using Supabase Auth tokens
2. **API Key Authentication** - For service-to-service communication
3. **Anonymous Access** - For public endpoints

### Authentication Middleware

The authentication middleware (`authMiddleware`) verifies user tokens and sets the user context:

```typescript
import { createMiddleware } from 'hono/factory';
import { supabase } from '@/lib/supabase/server';
import { UnauthorizedError } from '../lib/errors';

export const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing or invalid authorization header');
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      throw new UnauthorizedError('Invalid token');
    }
    
    // Set user in context for downstream handlers
    c.set('user', user);
    
    return next();
  } catch (error) {
    throw new UnauthorizedError('Authentication failed');
  }
});
```

## Request Validation

Hono routes use Zod for request validation. Example:

```typescript
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

// Define the validation schema
const createDocumentSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().optional(),
  type: z.enum(['passport', 'visa', 'certificate', 'other']),
  expirationDate: z.string().optional(),
});

// Use the schema in a route
app.post(
  '/documents', 
  zValidator('json', createDocumentSchema),
  async (c) => {
    // The request body is now validated and typed
    const data = c.req.valid('json');
    
    // Process the validated data
    const documentId = await documentService.create(data);
    
    return c.json({ id: documentId });
  }
);
```

## Middleware Composition

Middleware can be composed for routes with common requirements:

```typescript
// Create a middleware stack for documents API
const documentMiddleware = compose(
  authMiddleware(),
  subscriptionRateLimit({ resourceType: 'document', limit: 50 }),
  auditLogMiddleware({ resource: 'document' })
);

// Apply middleware stack to routes
app.post('/documents', documentMiddleware, createDocumentHandler);
app.get('/documents/:id', documentMiddleware, getDocumentHandler);
```

## Error Handling

The API uses a standardized error handling approach:

```typescript
// Custom error classes
export class ApiError extends Error {
  status: number;
  code: string;
  
  constructor(message: string, status = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

// Error handler middleware
export const errorHandlerMiddleware = createMiddleware(async (c, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ApiError) {
      return c.json({
        error: {
          message: error.message,
          code: error.code,
        }
      }, error.status);
    }
    
    console.error('Unhandled API error:', error);
    
    return c.json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
      }
    }, 500);
  }
});
```

## Redis Caching

The API uses Redis for caching frequently accessed data:

```typescript
import { createMiddleware } from 'hono/factory';
import { redis } from '@/lib/redis';

interface RedisCacheOptions {
  ttl?: number;              // Time-to-live in seconds
  key?: (c: Context) => string;  // Custom key generator
  methods?: string[];        // HTTP methods to cache
}

export const redisCacheMiddleware = (options: RedisCacheOptions = {}) => {
  const {
    ttl = 300,               // Default: 5 minutes
    methods = ['GET'],       // Default: Only cache GET requests
    key = defaultKeyGenerator,
  } = options;
  
  return createMiddleware(async (c, next) => {
    // Only cache specified methods
    if (!methods.includes(c.req.method)) {
      return next();
    }
    
    const cacheKey = key(c);
    
    // Try to get from cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return c.json(JSON.parse(cached));
    }
    
    // If not in cache, continue to handler
    await next();
    
    // After handler execution, store response in cache
    const response = c.res;
    
    if (response.status === 200) {
      const body = await response.json();
      await redis.set(cacheKey, JSON.stringify(body), { ex: ttl });
    }
  });
};
```

## Rate Limiting

Subscription-based rate limiting is implemented using Upstash Ratelimit:

```typescript
import { createMiddleware } from 'hono/factory';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { getSubscriptionTier } from '@/lib/subscriptions';

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Define rate limit tiers
const rateLimits = {
  free: {
    api: { requests: 100, per: 60 * 60 },        // 100 requests per hour
    research: { requests: 10, per: 60 * 60 * 24 }, // 10 requests per day
  },
  pro: {
    api: { requests: 1000, per: 60 * 60 },       // 1000 requests per hour
    research: { requests: 100, per: 60 * 60 * 24 }, // 100 requests per day
  },
  enterprise: {
    api: { requests: 10000, per: 60 * 60 },      // 10000 requests per hour
    research: { requests: 1000, per: 60 * 60 * 24 }, // 1000 requests per day
  },
};

interface RateLimitOptions {
  resourceType?: 'api' | 'research';
}

export const subscriptionRateLimit = (options: RateLimitOptions = {}) => {
  const { resourceType = 'api' } = options;
  
  return createMiddleware(async (c, next) => {
    const user = c.get('user');
    
    if (!user) {
      // For anonymous users, use IP-based rate limiting
      const ip = c.req.header('x-forwarded-for') || 'unknown';
      const anonymousRatelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(50, '1h'),
        analytics: true,
        prefix: `hijraah:ratelimit:anon:${resourceType}`,
      });
      
      const { success, limit, reset, remaining } = await anonymousRatelimit.limit(ip);
      
      c.header('X-RateLimit-Limit', limit.toString());
      c.header('X-RateLimit-Remaining', remaining.toString());
      c.header('X-RateLimit-Reset', reset.toString());
      
      if (!success) {
        return c.json({ error: 'Rate limit exceeded' }, 429);
      }
      
      return next();
    }
    
    // For authenticated users, use subscription-based rate limiting
    const tier = await getSubscriptionTier(user.id);
    const limits = rateLimits[tier][resourceType];
    
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limits.requests, `${limits.per}s`),
      analytics: true,
      prefix: `hijraah:ratelimit:${tier}:${resourceType}`,
    });
    
    const { success, limit, reset, remaining } = await ratelimit.limit(user.id);
    
    c.header('X-RateLimit-Limit', limit.toString());
    c.header('X-RateLimit-Remaining', remaining.toString());
    c.header('X-RateLimit-Reset', reset.toString());
    
    if (!success) {
      return c.json({ 
        error: 'Rate limit exceeded',
        subscription: tier,
        upgrade: tier !== 'enterprise'
      }, 429);
    }
    
    return next();
  });
};
```

## Creating a New API Route

Follow these steps to create a new API route:

1. **Create a new route file** in `src/api/hono/routes`
2. **Define validation schemas** for request parameters
3. **Implement the route handler** with proper error handling
4. **Apply appropriate middleware** (auth, rate limiting, etc.)
5. **Register the route** in the main app

Example:

```typescript
// src/api/hono/routes/documents.ts
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth';
import { redisCacheMiddleware } from '../middleware/redis-cache';
import { HijarahEnv } from '../types';
import { documentService } from '@/lib/documents';

const documentsRoutes = new Hono<HijarahEnv>();

// Apply authentication to all document routes
documentsRoutes.use('*', authMiddleware());

// Get all documents for the current user (with caching)
documentsRoutes.get(
  '/',
  redisCacheMiddleware({
    ttl: 60, // 1 minute cache
    key: (c) => `documents:list:${c.get('user').id}`,
  }),
  async (c) => {
    const user = c.get('user');
    const documents = await documentService.getAllForUser(user.id);
    
    return c.json({ documents });
  }
);

// Create a new document
const createDocumentSchema = z.object({
  title: z.string().min(3).max(100),
  type: z.enum(['passport', 'visa', 'certificate', 'other']),
  expirationDate: z.string().optional(),
  content: z.string().optional(),
});

documentsRoutes.post(
  '/',
  zValidator('json', createDocumentSchema),
  async (c) => {
    const user = c.get('user');
    const data = c.req.valid('json');
    
    const documentId = await documentService.create({
      ...data,
      userId: user.id,
    });
    
    return c.json({ id: documentId }, 201);
  }
);

// Get a single document by ID
documentsRoutes.get(
  '/:id',
  async (c) => {
    const user = c.get('user');
    const id = c.req.param('id');
    
    const document = await documentService.getById(id, user.id);
    
    if (!document) {
      return c.json({ error: 'Document not found' }, 404);
    }
    
    return c.json({ document });
  }
);

// Update a document
const updateDocumentSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  expirationDate: z.string().optional(),
  content: z.string().optional(),
});

documentsRoutes.put(
  '/:id',
  zValidator('json', updateDocumentSchema),
  async (c) => {
    const user = c.get('user');
    const id = c.req.param('id');
    const data = c.req.valid('json');
    
    const success = await documentService.update(id, data, user.id);
    
    if (!success) {
      return c.json({ error: 'Document not found or update failed' }, 404);
    }
    
    return c.json({ success: true });
  }
);

// Delete a document
documentsRoutes.delete(
  '/:id',
  async (c) => {
    const user = c.get('user');
    const id = c.req.param('id');
    
    const success = await documentService.delete(id, user.id);
    
    if (!success) {
      return c.json({ error: 'Document not found or delete failed' }, 404);
    }
    
    return c.json({ success: true });
  }
);

export { documentsRoutes };
```

## Testing API Routes

Use Jest for testing API routes:

```typescript
// src/api/hono/routes/documents.test.ts
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { createRequest } from 'node-mocks-http';
import app from '../index';
import { documentService } from '@/lib/documents';
import { mockUser, mockToken } from '@/lib/test-utils';

// Mock document service
vi.mock('@/lib/documents', () => ({
  documentService: {
    getAllForUser: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock auth service
vi.mock('@/lib/supabase/server', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: mockUser },
        error: null,
      }),
    },
  },
}));

describe('Documents API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('GET /documents', () => {
    it('should return all documents for the authenticated user', async () => {
      const mockDocuments = [
        { id: '1', title: 'Passport', type: 'passport' },
        { id: '2', title: 'Visa', type: 'visa' },
      ];
      
      documentService.getAllForUser.mockResolvedValue(mockDocuments);
      
      const req = createRequest({
        method: 'GET',
        url: '/documents',
        headers: {
          'Authorization': `Bearer ${mockToken}`,
        },
      });
      
      const res = await app.request(req);
      const body = await res.json();
      
      expect(res.status).toBe(200);
      expect(body).toEqual({ documents: mockDocuments });
      expect(documentService.getAllForUser).toHaveBeenCalledWith(mockUser.id);
    });
  });
  
  // More tests...
});
```

## API Documentation

The API is documented using OpenAPI (Swagger):

```typescript
// src/api/hono/openapi.ts
import { OpenAPIHono } from '@hono/openapi-plugin';
import { createRoute } from '@hono/zod-openapi';
import { z } from 'zod';

const openApiApp = new OpenAPIHono();

// Document schema
const documentSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['passport', 'visa', 'certificate', 'other']),
  expirationDate: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Get all documents route
const getAllDocuments = createRoute({
  method: 'get',
  path: '/documents',
  tags: ['Documents'],
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: 'List of documents',
      content: {
        'application/json': {
          schema: z.object({
            documents: z.array(documentSchema),
          }),
        },
      },
    },
    401: {
      description: 'Unauthorized',
    },
  },
});

openApiApp.openapi(getAllDocuments, async (c) => {
  // Handler implementation
});

// More routes...

export default openApiApp;
```

## API Versioning

The API uses a versioning strategy to support multiple API versions:

```typescript
// Current version (v1)
app.route('/api/v1', v1Routes);

// Future version (v2)
app.route('/api/v2', v2Routes);

// Legacy support
app.route('/api/legacy', legacyRoutes);
```

## Webhooks

The API supports webhooks for event-driven architecture:

```typescript
// src/api/hono/routes/webhooks.ts
import { Hono } from 'hono';
import { webhookAuthMiddleware } from '../middleware/webhook-auth';
import { HijarahEnv } from '../types';

const webhooksRoutes = new Hono<HijarahEnv>();

// Authenticate webhook requests
webhooksRoutes.use('*', webhookAuthMiddleware());

// Document status webhook
webhooksRoutes.post('/document-status', async (c) => {
  const data = await c.req.json();
  
  // Process webhook data
  await processDocumentStatusUpdate(data);
  
  return c.json({ success: true });
});

export { webhooksRoutes };
```

## Health Check

The API includes a health check endpoint:

```typescript
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    version: process.env.APP_VERSION || '1.0.0',
    timestamp: new Date().toISOString(),
  });
});
```

## Rate Limiting Headers

The API includes standard rate limiting headers:

- `X-RateLimit-Limit`: Maximum requests allowed in the time window
- `X-RateLimit-Remaining`: Remaining requests in the current time window
- `X-RateLimit-Reset`: Time (in seconds) until the rate limit resets

## CORS Configuration

The API uses a permissive CORS configuration for development but restricts it in production:

```typescript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://hijraah.com', 'https://app.hijraah.com']
    : ['http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  exposeHeaders: ['Content-Length', 'X-Request-Id'],
  credentials: true,
  maxAge: 86400,
};

app.use('*', cors(corsOptions));
```

## API Client

A type-safe API client is available for frontend consumption:

```typescript
// src/lib/api-client.ts
import { createHijarahApiClient } from '@/lib/api';

export const apiClient = createHijarahApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  getToken: async () => {
    // Get token from auth store
  },
});

// Example usage
const documents = await apiClient.documents.getAll();
const newDocument = await apiClient.documents.create({
  title: 'My Passport',
  type: 'passport',
});
```

## Conclusion

This guide provides a comprehensive overview of the Hono API implementation in the Hijraah platform. By following these patterns, you can create consistent, type-safe, and high-performance API endpoints that scale with the platform's needs. 