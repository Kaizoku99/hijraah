import { Context, Next } from 'hono'
import { Redis } from '@upstash/redis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Configure rate limiter
const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'rate_limit',
  points: 100, // Number of points
  duration: 60, // Per 60 seconds
})

export async function rateLimitMiddleware(c: Context, next: Next) {
  try {
    // Get user IP or ID for rate limiting
    const identifier = c.get('user')?.id || c.req.header('x-forwarded-for') || 'anonymous'
    
    // Check rate limit
    await rateLimiter.consume(identifier)
    
    // Add rate limit headers
    const rateLimitRes = await rateLimiter.get(identifier)
    if (rateLimitRes) {
      c.header('X-RateLimit-Limit', '100')
      c.header('X-RateLimit-Remaining', String(rateLimitRes.remainingPoints))
      c.header('X-RateLimit-Reset', String(rateLimitRes.msBeforeNext))
    }
    
    await next()
  } catch (error) {
    if (error instanceof Error) {
      return c.json({
        error: {
          message: 'Too Many Requests',
          status: 429
        }
      }, 429)
    }
    throw error
  }
} 