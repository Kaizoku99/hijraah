import { Context, Next } from 'hono';
import { getRedisClient } from '../lib/redis';
import { Redis } from '@upstash/redis';

// Interface for cache options
interface RedisCacheOptions {
  ttl?: number; // Time to live in seconds
  key?: (c: Context) => string; // Custom key generator
  ignoreQuery?: boolean; // Whether to ignore query parameters in the cache key
  varyByAuth?: boolean; // Whether to create different cache entries based on authentication status
  prefix?: string; // Prefix for cache keys
  useStale?: boolean; // Whether to serve stale cache while refreshing
}

// Cache statistics in Redis
const STATS_KEYS = {
  HITS: 'cache:stats:hits',
  MISSES: 'cache:stats:misses',
  KEYS: 'cache:keys',
};

/**
 * Middleware to cache API responses in Redis
 * 
 * @param options Cache options
 * @returns Hono middleware
 */
export function redisCacheMiddleware(options: RedisCacheOptions = {}) {
  const {
    ttl = 300, // Default TTL is 5 minutes
    prefix = 'api:cache:',
    useStale = true,
  } = options;

  return async (c: Context, next: Next) => {
    // Only cache GET requests
    if (c.req.method !== 'GET') {
      return next();
    }

    const redis = getRedisClient();
    
    // Generate cache key
    const generateKey = options.key || defaultKeyGenerator;
    const rawKey = generateKey(c);
    const cacheKey = `${prefix}${rawKey}`;
    
    // Try to get cached response
    try {
      // Get cached value
      const cachedValue = await redis.get(cacheKey);
      
      if (cachedValue) {
        // Parse cached response if it's a string
        const cachedResponse = typeof cachedValue === 'string' 
          ? JSON.parse(cachedValue) 
          : cachedValue;
        
        // Check if cached response exists and is valid
        if (cachedResponse) {
          // Record cache hit
          await redis.incr(STATS_KEYS.HITS);
          
          // Add cache headers
          c.header('X-Cache', 'HIT');
          c.header('X-Cache-Key', cacheKey);
          c.header('Cache-Control', `public, max-age=${ttl}`);
          
          return c.json(cachedResponse);
        }
      }
      
      // Record cache miss
      await redis.incr(STATS_KEYS.MISSES);
      
      // Set header to indicate cache miss
      c.header('X-Cache', 'MISS');
      c.header('X-Cache-Key', cacheKey);
    } catch (error) {
      console.error('Redis cache read error:', error);
      c.header('X-Cache', 'ERROR');
    }
    
    // Continue to the next middleware/handler
    await next();
    
    // Store the response in cache
    try {
      const responseBody = c.res.body;
      if (responseBody && c.res.status === 200) {
        const responseData = await c.res.json();
        
        // Add response to Redis with expiration
        await redis.set(cacheKey, JSON.stringify(responseData), { ex: ttl });
        
        // Add key to the set of cache keys for management
        await redis.sadd(STATS_KEYS.KEYS, cacheKey);
        
        // Add cache-related headers to the response
        c.header('Cache-Control', `public, max-age=${ttl}`);
        
        return c.json(responseData);
      }
    } catch (error) {
      console.error('Redis cache write error:', error);
    }
  };
}

/**
 * Default cache key generator based on URL and query params
 */
function defaultKeyGenerator(c: Context): string {
  const url = new URL(c.req.url);
  
  // Get user info for personalized caching
  const user = c.get('user');
  const userId = user?.id || 'anonymous';
  
  // Construct path with or without query parameters
  const pathWithQuery = `${url.pathname}${url.search}`;
  
  return `${userId}:${pathWithQuery}`;
}

/**
 * Utility to invalidate cache for a specific key pattern
 * @param keyPattern String pattern to match against cache keys
 */
export async function invalidateRedisCache(keyPattern: string): Promise<number> {
  const redis = getRedisClient();
  
  // Find all matching keys
  const matchPattern = `*${keyPattern}*`;
  const keys = await redis.keys(matchPattern);
  
  if (keys.length === 0) {
    return 0;
  }
  
  // Remove found keys from the cache
  // Upstash Redis doesn't support pipeline, so we'll use Promise.all
  await Promise.all([
    // Delete each key
    ...keys.map(key => redis.del(key)),
    // Remove from the set of cache keys
    ...keys.map(key => redis.srem(STATS_KEYS.KEYS, key))
  ]);
  
  console.log(`Invalidated ${keys.length} cache entries matching "${keyPattern}"`);
  return keys.length;
}

/**
 * Utility to get cache stats
 */
export async function getRedisStats() {
  const redis = getRedisClient();
  
  const [hits, misses, keys] = await Promise.all([
    redis.get(STATS_KEYS.HITS),
    redis.get(STATS_KEYS.MISSES),
    redis.scard(STATS_KEYS.KEYS),
  ]);
  
  return {
    hits: parseInt(hits?.toString() || '0'),
    misses: parseInt(misses?.toString() || '0'),
    keys: keys || 0,
    hitRate: calculateHitRate(parseInt(hits?.toString() || '0'), parseInt(misses?.toString() || '0')),
  };
}

/**
 * Calculate cache hit rate
 */
function calculateHitRate(hits: number, misses: number): number {
  const total = hits + misses;
  if (total === 0) return 0;
  return parseFloat((hits / total * 100).toFixed(2));
}

/**
 * Utility to clear all cache
 */
export async function clearRedisCache(): Promise<number> {
  const redis = getRedisClient();
  
  // Get all cache keys
  const keys = await redis.smembers(STATS_KEYS.KEYS);
  
  if (keys.length === 0) {
    return 0;
  }
  
  // Delete all cache keys - Upstash Redis doesn't support pipeline
  // so we'll use Promise.all
  await Promise.all([
    // Delete each key
    ...keys.map(key => redis.del(key)),
    // Reset stats
    redis.del(STATS_KEYS.HITS),
    redis.del(STATS_KEYS.MISSES),
    redis.del(STATS_KEYS.KEYS)
  ]);
  
  console.log(`Cleared ${keys.length} cache entries`);
  return keys.length;
} 