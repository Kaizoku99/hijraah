import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { HTTPException } from 'hono/http-exception';
import type { MiddlewareHandler } from 'hono';
import type { Context } from 'hono';

export interface RateLimitOptions {
  max: number;
  windowMs: number;
  keyGenerator?: (c: Context) => string;
  skip?: (c: Context) => boolean;
}

// Initialize Redis client
let redis: Redis | null = null;

const getRedis = () => {
  if (!redis && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redis;
};

// Create rate limiter instance
const createRatelimit = (options: RateLimitOptions) => {
  const redisClient = getRedis();
  
  if (!redisClient) {
    console.warn('Redis client not initialized, rate limiting disabled');
    return null;
  }
  
  return new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.slidingWindow(options.max, `${options.windowMs}ms`),
  });
};

// Default key generator function
const defaultKeyGenerator = (c: Context): string => {
  return c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
};

// Default skip function
const defaultSkip = (_c: Context): boolean => {
  return false;
};

// Rate limit middleware
export const rateLimit = (options: RateLimitOptions): MiddlewareHandler => {
  const ratelimit = createRatelimit(options);
  const keyGenerator = options.keyGenerator || defaultKeyGenerator;
  const skip = options.skip || defaultSkip;

  return async (c, next) => {
    // Skip rate limiting if specified
    if (skip(c)) {
      return await next();
    }
    
    // Skip if rate limiter is not available (Redis not configured)
    if (!ratelimit) {
      return await next();
    }

    try {
      const key = keyGenerator(c);
      const { success, limit, reset, remaining } = await ratelimit.limit(key);

      // Set rate limit headers
      c.header('X-RateLimit-Limit', limit.toString());
      c.header('X-RateLimit-Remaining', remaining.toString());
      c.header('X-RateLimit-Reset', reset.toString());

      if (!success) {
        throw new HTTPException(429, { 
          message: 'Too many requests',
          res: new Response(null, {
            status: 429,
            headers: {
              'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
            },
          }),
        });
      }

      await next();
    } catch (error) {
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: 'Rate limiting error' });
    }
  };
}; 