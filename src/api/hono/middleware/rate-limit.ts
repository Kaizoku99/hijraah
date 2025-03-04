import { Context, Next } from 'hono';
import NodeCache from 'node-cache';

// Initialize cache for storing rate limit data
// Short TTL as we're using it for counting requests in a time window
const rateCache = new NodeCache({
  stdTTL: 60, // 1 minute in seconds
  checkperiod: 5, // Check for expired keys every 5 seconds
});

// Predefine common rate limit configurations
export const RATE_LIMITS = {
  DEFAULT: { limit: 100, window: 60 },
  STRICT: { limit: 20, window: 60 },
  LENIENT: { limit: 300, window: 60 },
  API_DOCS: { limit: 500, window: 60 },
  AUTHENTICATED: { limit: 200, window: 60 },
  UNAUTHENTICATED: { limit: 50, window: 60 },
  // Resource-intensive operations
  SCRAPING: { limit: 10, window: 60 },
  VECTOR_SEARCH: { limit: 30, window: 60 },
  RESEARCH: { limit: 20, window: 60 },
  // Time windows
  PER_MINUTE: { window: 60 },
  PER_HOUR: { window: 3600 },
  PER_DAY: { window: 86400 },
};

// Interface for rate limit options
interface RateLimitOptions {
  limit: number; // Maximum number of requests in the window
  window: number; // Time window in seconds
  keyGenerator?: (c: Context) => string; // Custom key generator
  errorMessage?: string; // Custom error message
  statusCode?: 429 | 403 | 400; // Custom status code for rate limit exceeded
  includeHeaders?: boolean; // Whether to include rate limit headers in responses
}

/**
 * Middleware to implement rate limiting
 * 
 * @param options Rate limit options
 * @returns Hono middleware
 */
export function rateLimitMiddleware(options: RateLimitOptions) {
  const {
    limit = 100,
    window = 60,
    keyGenerator = defaultKeyGenerator,
    errorMessage = 'Rate limit exceeded. Please try again later.',
    statusCode = 429,
    includeHeaders = true
  } = options;

  return async (c: Context, next: Next) => {
    const key = keyGenerator(c);
    
    // Get current count
    let count = rateCache.get<number>(key) || 0;
    
    // Increment count
    count += 1;
    
    // Set remaining headers
    if (includeHeaders) {
      c.header('X-RateLimit-Limit', limit.toString());
      c.header('X-RateLimit-Remaining', Math.max(0, limit - count).toString());
      c.header('X-RateLimit-Reset', Math.floor(Date.now() / 1000 + window).toString());
    }
    
    // Store updated count
    rateCache.set(key, count, window);
    
    // Check if rate limit exceeded
    if (count > limit) {
      // Add Retry-After header
      if (includeHeaders) {
        c.header('Retry-After', window.toString());
      }
      
      // Use statusCode as a valid Hono status code
      return c.json({
        success: false,
        error: 'Too Many Requests',
        message: errorMessage,
        retryAfter: window
      }, statusCode);
    }
    
    await next();
  };
}

/**
 * Default key generator based on IP address or user ID
 */
function defaultKeyGenerator(c: Context): string {
  // Try to get user ID first for authenticated requests
  const user = c.get('user');
  if (user && user.id) {
    return `rate:user:${user.id}`;
  }

  // Fallback to IP address
  const ip = c.req.header('x-forwarded-for') || 
             c.req.header('x-real-ip') || 
             'unknown';
             
  return `rate:ip:${ip}`;
}

/**
 * Generate a key for a specific API endpoint
 */
export function endpointRateLimiter(endpoint: string) {
  return (c: Context): string => {
    const baseKey = defaultKeyGenerator(c);
    return `${baseKey}:${endpoint}`;
  };
}

/**
 * Create a rate limiter based on IP only (ignores user authentication)
 */
export function ipRateLimiter() {
  return (c: Context): string => {
    const ip = c.req.header('x-forwarded-for') || 
               c.req.header('x-real-ip') || 
               'unknown';
               
    return `rate:ip-only:${ip}`;
  };
}

/**
 * Get current rate limit status for a specific key
 */
export function getRateLimitStatus(key: string) {
  const count = rateCache.get<number>(key) || 0;
  
  return {
    key,
    count,
    exists: count > 0
  };
}

/**
 * Reset rate limit for a specific key
 */
export function resetRateLimit(key: string): boolean {
  return rateCache.del(key) > 0;
} 