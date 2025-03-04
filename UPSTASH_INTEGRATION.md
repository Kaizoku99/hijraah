# Upstash Redis Integration

This document describes how we've integrated Upstash Redis into the Hijraah Immigration Platform to enable serverless-optimized caching and rate limiting.

## Why Upstash Redis?

Upstash Redis provides a REST-based, serverless-optimized Redis service that is particularly well-suited for applications deployed to edge computing platforms like Vercel Edge Functions, Cloudflare Workers, and other serverless environments.

**Key advantages of Upstash Redis:**

1. **REST API Interface**: No need to maintain persistent connections, which are problematic in serverless environments
2. **Per-Request Pricing**: Pay only for the requests you make, ideal for serverless and edge functions
3. **Global Replication**: Data can be replicated across regions for low-latency access
4. **Specialized SDKs**: Purpose-built libraries like `@upstash/ratelimit` for common use cases
5. **Simple Integration**: Easy to set up with REST API tokens

## Implementation

We have replaced the traditional Redis implementation (ioredis) with Upstash Redis in the following components:

### 1. Redis Client

**File:** `src/api/hono/lib/redis.ts`

We've replaced the ioredis implementation with `@upstash/redis`:

```typescript
import { Redis } from "@upstash/redis";

// Environment variables for Upstash Redis
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";

// Create Redis client
function createRedisClient(): Redis {
  // Initialize Upstash Redis client
  const client = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
    retry: {
      retries: 3,
      backoff: (retryCount) => Math.min(retryCount * 50, 1000),
    },
  });

  return client;
}
```

### 2. Redis Cache Middleware

**File:** `src/api/hono/middleware/redis-cache.ts`

Key changes include:

- Adapted to Upstash Redis API (different method signatures)
- Replaced pipeline operations with Promise.all for concurrent operations
- Updated cache TTL syntax to use the object format
- Improved type handling for Redis responses

```typescript
// Example of cache TTL syntax change
await redis.set(cacheKey, JSON.stringify(responseData), { ex: ttl });

// Example of replacing pipeline with Promise.all
await Promise.all([
  ...keys.map((key) => redis.del(key)),
  redis.del(STATS_KEYS.HITS),
  redis.del(STATS_KEYS.MISSES),
  redis.del(STATS_KEYS.KEYS),
]);
```

### 3. Subscription Rate Limiting

**File:** `src/api/hono/middleware/subscription-rate-limit.ts`

We've significantly improved the rate limiting implementation:

- Replaced manual rate limiting with specialized `@upstash/ratelimit` library
- Implemented a sliding window rate limiter for better accuracy
- Added a caching layer for rate limiters to improve performance
- Improved reset time calculations based on Upstash's built-in functionality

```typescript
// Example of creating a rate limiter with Upstash Ratelimit
const ratelimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(limit, `${duration} s`),
  prefix: `ratelimit:${tier}:${resourceType}:${window}`,
  analytics: true,
});

// Example of checking a rate limit
const result = await ratelimiter.limit(userId);
```

## Configuration

To use Upstash Redis, you need to set the following environment variables:

```
UPSTASH_REDIS_REST_URL=your-upstash-redis-rest-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-rest-token
```

## Performance Considerations

### Benefits

- **Reduced Cold Start Impact**: No connection overhead for serverless functions
- **Global Distribution**: Data can be accessed with low latency from anywhere
- **Simplified Error Handling**: No connection errors to manage
- **Better Rate Limiting**: More accurate rate limiting with sliding windows

### Limitations

- **Higher Latency for Multiple Operations**: Each Redis operation is a separate HTTP request
- **Potential Cost Implications**: Per-request pricing can be more expensive for high-volume usage

## Usage Examples

### Caching API Responses

```typescript
import { redisCacheMiddleware } from "../middleware/redis-cache";

// Cache for 5 minutes
app.get("/api/data", redisCacheMiddleware({ ttl: 300 }), (c) => {
  // Handler code
});
```

### Rate Limiting API Endpoints

```typescript
import {
  subscriptionRateLimit,
  ResourceType,
} from "../middleware/subscription-rate-limit";

// Apply rate limiting for research operations
app.use(
  "/api/research/*",
  subscriptionRateLimit({ resourceType: ResourceType.RESEARCH }),
  (c, next) => next()
);
```

## Migration Notes

When migrating from traditional Redis to Upstash Redis:

1. Replace the client library from `ioredis` to `@upstash/redis`
2. Remove connection management code - not needed with REST API
3. Update method signatures (especially for TTL and options)
4. Replace pipeline operations with parallel Promise.all calls
5. Use specialized libraries like `@upstash/ratelimit` where applicable
