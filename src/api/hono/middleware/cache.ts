import { Context, Next } from 'hono';
import NodeCache from 'node-cache';

// Initialize cache with default TTL of 5 minutes
const cache = new NodeCache({
  stdTTL: 300, // 5 minutes in seconds
  checkperiod: 60, // Check for expired keys every 60 seconds
  useClones: false, // For better performance
});

// Interface for cache options
interface CacheOptions {
  ttl?: number; // Time to live in seconds
  key?: (c: Context) => string; // Custom key generator
  ignoreQuery?: boolean; // Whether to ignore query parameters in the cache key
  varyByAuth?: boolean; // Whether to create different cache entries based on authentication status
}

/**
 * Middleware to cache API responses
 * 
 * @param options Cache options
 * @returns Hono middleware
 */
export function cacheMiddleware(options: CacheOptions = {}) {
  return async (c: Context, next: Next) => {
    // Only cache GET requests
    if (c.req.method !== 'GET') {
      return next();
    }

    // Generate cache key
    const generateKey = options.key || defaultKeyGenerator;
    const cacheKey = generateKey(c);
    
    // Check if cached response exists
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      // Add cache headers
      c.header('X-Cache', 'HIT');
      c.header('X-Cache-Key', cacheKey);
      // Use a default TTL of 300 seconds if none is provided
      const maxAge = options.ttl ? options.ttl.toString() : '300';
      c.header('Cache-Control', `public, max-age=${maxAge}`);
      return c.json(cachedResponse);
    }

    // Set header to indicate cache miss
    c.header('X-Cache', 'MISS');
    c.header('X-Cache-Key', cacheKey);
    
    // Continue to the next middleware/handler
    await next();
    
    // Store the response in cache
    const responseBody = c.res.body;
    if (responseBody && c.res.status === 200) {
      try {
        const responseData = await c.res.json();
        cache.set(cacheKey, responseData, options.ttl);
        
        // Add cache-related headers to the response
        const maxAge = options.ttl ? options.ttl.toString() : '300';
        c.header('Cache-Control', `public, max-age=${maxAge}`);
      } catch (error) {
        console.error('Failed to cache response:', error);
      }
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
export function invalidateCache(keyPattern: string): void {
  const keys = cache.keys();
  const matchingKeys = keys.filter(key => key.includes(keyPattern));
  
  matchingKeys.forEach(key => cache.del(key));
  console.log(`Invalidated ${matchingKeys.length} cache entries matching "${keyPattern}"`);
}

/**
 * Utility to get cache stats
 */
export function getCacheStats() {
  return {
    keys: cache.keys().length,
    hits: cache.getStats().hits,
    misses: cache.getStats().misses,
    ksize: cache.getStats().ksize,
    vsize: cache.getStats().vsize,
  };
}

/**
 * Utility to clear all cache
 */
export function clearCache(): void {
  cache.flushAll();
  console.log('Cache cleared');
} 