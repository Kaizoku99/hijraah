import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { HTTPException } from 'hono/http-exception';
import type { MiddlewareHandler } from 'hono';

interface RateLimitOptions {
  max: number;
  windowMs: number;
}

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limiter instance
const createRatelimit = (options: RateLimitOptions) => {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(options.max, `${options.windowMs}ms`),
  });
};

// Rate limit middleware
export const rateLimit = (options: RateLimitOptions): MiddlewareHandler => {
  const ratelimit = createRatelimit(options);

  return async (c, next) => {
    try {
      const ip = c.req.header('x-forwarded-for') || 'unknown';
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

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