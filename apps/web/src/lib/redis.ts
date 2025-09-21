/**
 * Redis Module - Centralized Redis functionality
 *
 * This module serves as the single source of truth for all Redis operations
 * in the application. It provides:
 *
 * 1. A singleton Redis client instance with connection management
 * 2. Cache utilities for Next.js API routes
 * 3. Translation cache utilities
 * 4. Cache invalidation and statistics
 * 5. Testing utilities
 */

import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

// Environment variables for Upstash Redis
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Constants for cache stats
const STATS_KEYS = {
  HITS: "cache:stats:hits",
  MISSES: "cache:stats:misses",
  KEYS: "cache:stats:keys",
};

// Interface for cache options
interface CacheOptions {
  ttl?: number; // Time to live in seconds (default: 300 seconds)
  key?: (req: NextRequest) => string; // Custom key generator
  ignoreQuery?: boolean; // Whether to ignore query parameters in the cache key
  varyByAuth?: boolean; // Whether to create different cache entries based on authentication status
}

// Singleton pattern for Redis client
let redisClient: Redis | null = null;
let redisInitializationAttempted = false;

/**
 * Create a new Redis client
 */
function createRedisClient(): Redis | null {
  console.log("[Redis Client] Attempting to use URL:", UPSTASH_REDIS_REST_URL);

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    console.warn(
      "[Redis Client] Missing Redis URL or Token in environment variables. Redis client will not be initialized.",
    );
    return null;
  }

  try {
    return new Redis({
      url: UPSTASH_REDIS_REST_URL,
      token: UPSTASH_REDIS_REST_TOKEN,
      retry: {
        retries: 3,
        backoff: (retryCount) => Math.min(retryCount * 50, 1000),
      },
    });
  } catch (error) {
    console.error(
      "[Redis Client] Error during Redis client instantiation:",
      error,
    );
    return null;
  }
}

/**
 * Get Redis client (singleton pattern)
 */
export function getRedisClient(): Redis | null {
  if (!redisInitializationAttempted) {
    redisClient = createRedisClient();
    if (redisClient) {
      console.log("Upstash Redis client initialized successfully.");
    } else {
      console.warn(
        "Upstash Redis client could not be initialized. Features requiring Redis may not work.",
      );
    }
    redisInitializationAttempted = true;
  }
  return redisClient;
}

/**
 * Sets a custom Redis client (for testing)
 */
export function setRedisClient(client: Redis): void {
  redisClient = client;
}

/**
 * Resets the Redis client (for testing)
 */
export function resetRedisClient(): void {
  if (redisClient && typeof (redisClient as any).quit === "function") {
    try {
      (redisClient as any).quit();
    } catch (e) {
      console.error("Error quitting existing redis client during reset:", e);
    }
  }
  redisClient = null;
  redisInitializationAttempted = false;
}

// Export Redis client for direct access
export const redis: Redis | null = getRedisClient();

/**
 * Health check function for Redis
 */
export async function isRedisHealthy(): Promise<boolean> {
  if (!redis) {
    console.warn(
      "[isRedisHealthy] Redis client not initialized. Health check returning false.",
    );
    return false;
  }
  try {
    const result = await redis.ping();
    return result === "PONG";
  } catch (error) {
    console.error("Redis health check failed:", error);
    return false;
  }
}

/**
 * Translation cache helper functions
 */
export const translationCache = {
  async get(locale: string): Promise<Record<string, any> | null> {
    if (!redis) {
      console.warn("[translationCache.get] Redis client not available.");
      return null;
    }
    try {
      const cached = await redis.get(`i18n:${locale}`);
      return cached ? JSON.parse(cached as string) : null;
    } catch (error) {
      console.error("Translation cache get error:", error);
      return null;
    }
  },

  async set(
    locale: string,
    translations: Record<string, any>,
    ttl: number = 3600,
  ): Promise<void> {
    if (!redis) {
      console.warn("[translationCache.set] Redis client not available.");
      return;
    }
    try {
      await redis.setex(`i18n:${locale}`, ttl, JSON.stringify(translations));
    } catch (error) {
      console.error("Translation cache set error:", error);
    }
  },

  async invalidate(locale: string): Promise<void> {
    if (!redis) {
      console.warn("[translationCache.invalidate] Redis client not available.");
      return;
    }
    try {
      await redis.del(`i18n:${locale}`);
    } catch (error) {
      console.error("Translation cache invalidate error:", error);
    }
  },

  async invalidateAll(): Promise<void> {
    if (!redis) {
      console.warn(
        "[translationCache.invalidateAll] Redis client not available.",
      );
      return;
    }
    try {
      const keys = await redis.keys("i18n:*");
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      console.error("Translation cache invalidate all error:", error);
    }
  },
};

/**
 * Default cache key generator based on URL, path, and user ID
 */
function defaultKeyGenerator(req: NextRequest): string {
  const url = new URL(req.url);

  // Get user info for personalized caching (from headers or auth)
  const authHeader = req.headers.get("authorization");
  const userId = authHeader ? "authenticated" : "anonymous";

  // Construct path with query parameters
  const pathWithQuery = url.pathname + url.search;

  return `cache:${userId}:${pathWithQuery}`;
}

/**
 * Cache wrapper for Next.js API routes
 * Use this to wrap your API route handlers with caching functionality
 */
export function withCache(
  handler: (req: NextRequest) => Promise<Response>,
  options: CacheOptions = {},
) {
  return async (req: NextRequest): Promise<Response> => {
    if (!redis) {
      console.warn("[withCache] Redis client not available. Skipping cache.");
      return handler(req);
    }

    // Only cache GET requests
    if (req.method !== "GET") {
      return handler(req);
    }

    // Log incoming Cache-Control header
    const requestCacheControl = req.headers.get("Cache-Control");
    console.log(
      `[withCache] Incoming Cache-Control: ${requestCacheControl}`,
    );

    // Generate cache key
    const generateKey = options.key || defaultKeyGenerator;
    const cacheKey = generateKey(req);

    // Check if cached response exists
    try {
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        // Track cache hit
        await redis.incr(STATS_KEYS.HITS);

        const parsedData = JSON.parse(cachedData as string);
        
        // Create response with cache headers
        const response = NextResponse.json(parsedData);
        response.headers.set("X-Cache", "HIT");
        response.headers.set("X-Cache-Key", cacheKey);

        // Use a default TTL of 300 seconds if none is provided
        const maxAge = options.ttl ? options.ttl.toString() : "300";
        response.headers.set("Cache-Control", `public, max-age=${maxAge}`);

        return response;
      }

      // Track cache miss
      await redis.incr(STATS_KEYS.MISSES);
    } catch (error) {
      console.error("Redis cache read error:", error);
      // Continue without caching on error
    }

    // Execute the original handler
    const response = await handler(req);

    // Store the response in cache only if status is success
    if (response.status >= 200 && response.status < 300) {
      try {
        // Clone the response to read the body
        const clonedResponse = response.clone();
        const responseData = await clonedResponse.json();

        // Store in Redis with TTL
        const ttl = options.ttl || 300; // Default 5 minutes
        await redis.set(cacheKey, JSON.stringify(responseData), { ex: ttl });

        // Track cache keys
        await redis.sadd(STATS_KEYS.KEYS, cacheKey);

        // Add cache-related headers to the response
        response.headers.set("X-Cache", "MISS");
        response.headers.set("X-Cache-Key", cacheKey);
        response.headers.set("Cache-Control", `public, max-age=${ttl}`);
      } catch (error) {
        console.error("Redis cache write error:", error);
      }
    }

    return response;
  };
}

/**
 * Invalidate cache entries matching a pattern
 * @param pattern String pattern to match against cache keys
 */
export async function invalidateRedisCache(pattern: string): Promise<number> {
  if (!redis) {
    console.warn("[invalidateRedisCache] Redis client not available.");
    return 0;
  }
  try {
    // Find all keys matching the pattern
    let cursor = 0;
    const matchingKeys: string[] = [];

    do {
      // The scan function returns [cursor, keys] where cursor might be a string depending on the implementation
      // Cast it to unknown first then to the type we need
      const scanResult = await redis.scan(cursor, {
        match: pattern,
        count: 100,
      });
      const nextCursor = Number(scanResult[0]);
      const keys = scanResult[1] as string[];

      cursor = nextCursor;
      matchingKeys.push(...keys);
    } while (cursor !== 0);

    if (matchingKeys.length === 0) {
      return 0;
    }

    // Delete all matching keys
    await Promise.all(matchingKeys.map((key) => redis.del(key)));

    console.log(
      `Invalidated ${matchingKeys.length} cache entries matching "${pattern}"`,
    );
    return matchingKeys.length;
  } catch (error) {
    console.error("Error invalidating cache:", error);
    return 0;
  }
}

/**
 * Clear all cache entries
 */
export async function clearRedisCache(): Promise<number> {
  if (!redis) {
    console.warn("[clearRedisCache] Redis client not available.");
    return 0;
  }
  try {
    // Get all cache keys
    const keys = (await redis.smembers(STATS_KEYS.KEYS)) as string[];

    if (keys.length === 0) {
      return 0;
    }

    // Delete all keys and reset stats
    await Promise.all([
      ...keys.map((key) => redis.del(key)),
      redis.del(STATS_KEYS.HITS),
      redis.del(STATS_KEYS.MISSES),
      redis.del(STATS_KEYS.KEYS),
    ]);

    console.log(`Cleared ${keys.length} cache entries`);
    return keys.length;
  } catch (error) {
    console.error("Error clearing cache:", error);
    return 0;
  }
}

/**
 * Get cache statistics
 */
export async function getRedisStats(): Promise<{
  hits: number;
  misses: number;
  keys: number;
  hitRatio: number;
}> {
  if (!redis) {
    console.warn("[getRedisStats] Redis client not available.");
    return {
      hits: 0,
      misses: 0,
      keys: 0,
      hitRatio: 0,
    };
  }
  try {
    // Get stats from Redis
    const [hits, misses, keys] = (await Promise.all([
      redis.get(STATS_KEYS.HITS),
      redis.get(STATS_KEYS.MISSES),
      redis.scard(STATS_KEYS.KEYS),
    ])) as [string | null, string | null, number];

    // Parse stats
    const hitCount = hits ? parseInt(hits) : 0;
    const missCount = misses ? parseInt(misses) : 0;
    const total = hitCount + missCount;

    return {
      hits: hitCount,
      misses: missCount,
      keys: keys || 0,
      hitRatio: total > 0 ? hitCount / total : 0,
    };
  } catch (error) {
    console.error("Error getting cache stats:", error);
    return {
      hits: 0,
      misses: 0,
      keys: 0,
      hitRatio: 0,
    };
  }
}

// --- Start of CacheManager consolidation ---

interface CacheManagerOptions {
  ttl?: number; // Default TTL for LRU cache in milliseconds
  maxSize?: number; // Max number of items in LRU cache
  redisKeyPrefix?: string; // Prefix for all keys stored in Redis by this manager
}

class CacheManager {
  private redisClientInternal: Redis | null = null;
  private lruCache: LRUCache<string, string>;
  private redisKeyPrefix: string;

  constructor(options: CacheManagerOptions = {}) {
    this.redisClientInternal = getRedisClient();
    if (!this.redisClientInternal) {
      console.warn(
        "[CacheManager] Redis client is not available. CacheManager will operate in LRU-only mode.",
      );
    }

    this.redisKeyPrefix = options.redisKeyPrefix || "cacheManager:";

    this.lruCache = new LRUCache({
      max: options.maxSize || 500, // Use provided maxSize or default
      ttl: options.ttl || 3600 * 1000, // Use provided ttl (in ms) or default 1 hour
    });
  }

  private getPrefixedKey(key: string): string {
    return `${this.redisKeyPrefix}${key}`;
  }

  async get(key: string): Promise<string | null> {
    if (this.redisClientInternal) {
      const prefixedKey = this.getPrefixedKey(key);
      try {
        const value = await this.redisClientInternal.get<string>(prefixedKey);
        if (value !== null && value !== undefined) {
          return value;
        }
      } catch (error) {
        console.error(
          `CacheManager: Redis get error for key ${prefixedKey}:`,
          error,
        );
      }
    }
    return this.lruCache.get(key) || null;
  }

  async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
    if (this.redisClientInternal) {
      const prefixedKey = this.getPrefixedKey(key);
      try {
        await this.redisClientInternal.set(prefixedKey, value, {
          ex: ttlInSeconds || 3600, // Default 1 hour for Redis
        });
      } catch (error) {
        console.error(
          `CacheManager: Redis set error for key ${prefixedKey}:`,
          error,
        );
      }
    }
    this.lruCache.set(key, value, {
      ttl: ttlInSeconds ? ttlInSeconds * 1000 : undefined,
    });
  }

  async delete(key: string): Promise<void> {
    if (this.redisClientInternal) {
      const prefixedKey = this.getPrefixedKey(key);
      try {
        await this.redisClientInternal.del(prefixedKey);
      } catch (error) {
        console.error(
          `CacheManager: Redis delete error for key ${prefixedKey}:`,
          error,
        );
      }
    }
    this.lruCache.delete(key);
  }

  async clear(): Promise<void> {
    // Clear Redis keys matching the prefix
    if (this.redisClientInternal) {
      console.log(
        `CacheManager: Attempting to clear Redis keys with prefix "${this.redisKeyPrefix}"...`,
      );
      let cursor = 0;
      let keysDeletedCount = 0;
      try {
        do {
          const scanResult = await this.redisClientInternal.scan(cursor, {
            match: `${this.redisKeyPrefix}*`,
            count: 100, // Process in batches
          });
          const nextCursor = Number(scanResult[0]);
          const keys = scanResult[1] as string[];

          if (keys.length > 0) {
            const deleted = await this.redisClientInternal.del(...keys);
            keysDeletedCount += deleted;
          }
          cursor = nextCursor;
        } while (cursor !== 0);
        console.log(
          `CacheManager: Cleared ${keysDeletedCount} keys from Redis with prefix "${this.redisKeyPrefix}".`,
        );
      } catch (error) {
        console.error(
          `CacheManager: Error clearing Redis keys with prefix "${this.redisKeyPrefix}":`,
          error,
        );
      }
    }

    // Clear LRU cache
    this.lruCache.clear();
    console.log("CacheManager: LRU cache cleared.");
  }
}

// Export singleton instance of CacheManager
// You can configure the global 'cache' instance here if needed, e.g.:
// export const cache = new CacheManager({
//   redisKeyPrefix: process.env.CACHE_MANAGER_REDIS_PREFIX || 'globalCache:',
//   ttl: process.env.CACHE_MANAGER_LRU_TTL_MS ? parseInt(process.env.CACHE_MANAGER_LRU_TTL_MS) : 3600 * 1000,
//   maxSize: process.env.CACHE_MANAGER_LRU_MAX_SIZE ? parseInt(process.env.CACHE_MANAGER_LRU_MAX_SIZE) : 500,
// });
// For now, using defaults:
export const cache = new CacheManager();

// --- End of CacheManager consolidation ---
