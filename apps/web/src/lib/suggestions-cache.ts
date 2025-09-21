/**
 * Suggestions Cache Module
 *
 * Provides specialized caching for AI-generated suggestions using Upstash Redis.
 * This module implements intelligent cache key generation, TTL management, and
 * cache invalidation strategies optimized for suggestion generation.
 */

import { redis } from "@/lib/redis";
import { logger } from "@/lib/logger";

// Cache configuration constants
export const SUGGESTIONS_CACHE_CONFIG = {
  TTL_SECONDS: 600, // 10 minutes
  KEY_PREFIX: "suggestions:",
  MAX_CACHE_SIZE: 1000,
  CLEANUP_INTERVAL: 3600, // 1 hour
} as const;

// Types for suggestion caching
export interface CachedSuggestion {
  text: string;
  category: "initial" | "follow-up" | "contextual";
  confidence: number;
}

export interface SuggestionCacheEntry {
  suggestions: CachedSuggestion[];
  timestamp: number;
  metadata: {
    userId: string;
    type: string;
    conversationLength: number;
    messageHash: string;
  };
}

/**
 * Create a deterministic cache key for suggestion requests
 */
export function createSuggestionsCacheKey(
  userId: string,
  type: "initial" | "follow-up" | "contextual",
  conversationLength: number,
  messageContent: string
): string {
  // Create a hash of the message content to keep keys manageable
  const contentHash = Buffer.from(messageContent.slice(0, 200))
    .toString("base64")
    .replace(/[+/=]/g, "") // Remove URL-unsafe characters
    .slice(0, 20);

  return `${SUGGESTIONS_CACHE_CONFIG.KEY_PREFIX}${userId}:${type}:${conversationLength}:${contentHash}`;
}

/**
 * Get cached suggestions from Redis
 */
export async function getCachedSuggestions(
  cacheKey: string
): Promise<CachedSuggestion[] | null> {
  if (!redis) {
    logger.warn("Redis client not available for suggestions cache");
    return null;
  }

  try {
    const cachedData = await redis.get<string>(cacheKey);
    if (!cachedData) {
      return null;
    }

    // Context7: Safe JSON parsing with defensive coding
    let entry: SuggestionCacheEntry;
    try {
      entry = JSON.parse(cachedData);
    } catch (parseError) {
      logger.warn("Invalid JSON in suggestions cache, clearing entry", {
        cacheKey: cacheKey.slice(0, 50) + "...",
        parseError:
          parseError instanceof Error ? parseError.message : String(parseError),
      });
      await redis.del(cacheKey);
      return null;
    }

    // Context7: Validate parsed data structure
    if (
      !entry ||
      typeof entry !== "object" ||
      !Array.isArray(entry.suggestions) ||
      typeof entry.timestamp !== "number"
    ) {
      logger.warn("Invalid suggestions cache entry structure, clearing", {
        cacheKey: cacheKey.slice(0, 50) + "...",
        hasEntry: !!entry,
        hasSuggestions: entry ? Array.isArray(entry.suggestions) : false,
        hasTimestamp: entry ? typeof entry.timestamp === "number" : false,
      });
      await redis.del(cacheKey);
      return null;
    }

    // Check if cache entry is still valid (additional TTL check)
    const ageMinutes = (Date.now() - entry.timestamp) / (1000 * 60);
    if (ageMinutes > 15) {
      // Extra safety check beyond Redis TTL
      await redis.del(cacheKey);
      return null;
    }

    logger.info("Retrieved cached suggestions", {
      cacheKey: cacheKey.slice(0, 50) + "...",
      count: entry.suggestions.length,
      ageMinutes: Math.round(ageMinutes),
    });

    return entry.suggestions;
  } catch (error) {
    logger.error(
      "Error retrieving cached suggestions",
      error instanceof Error ? error : new Error(String(error)),
      {
        cacheKey: cacheKey.slice(0, 50) + "...",
      }
    );
    return null;
  }
}

/**
 * Cache suggestions in Redis with metadata
 */
export async function cacheSuggestions(
  cacheKey: string,
  suggestions: CachedSuggestion[],
  metadata: SuggestionCacheEntry["metadata"]
): Promise<void> {
  if (!redis) {
    logger.warn("Redis client not available for suggestions cache");
    return;
  }

  if (suggestions.length === 0) {
    logger.warn("Attempting to cache empty suggestions array");
    return;
  }

  try {
    const entry: SuggestionCacheEntry = {
      suggestions,
      timestamp: Date.now(),
      metadata,
    };

    await redis.set(cacheKey, JSON.stringify(entry), {
      ex: SUGGESTIONS_CACHE_CONFIG.TTL_SECONDS,
    });

    // Track cache key for cleanup
    await redis.sadd(`${SUGGESTIONS_CACHE_CONFIG.KEY_PREFIX}keys`, cacheKey);

    logger.info("Cached suggestions successfully", {
      cacheKey: cacheKey.slice(0, 50) + "...",
      count: suggestions.length,
      type: metadata.type,
      ttl: SUGGESTIONS_CACHE_CONFIG.TTL_SECONDS,
    });
  } catch (error) {
    logger.error(
      "Error caching suggestions",
      error instanceof Error ? error : new Error(String(error)),
      {
        cacheKey: cacheKey.slice(0, 50) + "...",
        count: suggestions.length,
      }
    );
  }
}

/**
 * Invalidate suggestions cache for a specific user
 */
export async function invalidateUserSuggestionsCache(
  userId: string
): Promise<number> {
  if (!redis) {
    logger.warn(
      "Redis client not available for suggestions cache invalidation"
    );
    return 0;
  }

  try {
    const pattern = `${SUGGESTIONS_CACHE_CONFIG.KEY_PREFIX}${userId}:*`;
    let cursor = 0;
    let deletedCount = 0;

    do {
      const scanResult = await redis.scan(cursor, {
        match: pattern,
        count: 100,
      });

      const nextCursor = Number(scanResult[0]);
      const keys = scanResult[1] as string[];

      if (keys.length > 0) {
        const deleteResult = await redis.del(...keys);
        deletedCount += deleteResult;

        // Remove from tracking set
        await redis.srem(`${SUGGESTIONS_CACHE_CONFIG.KEY_PREFIX}keys`, ...keys);
      }

      cursor = nextCursor;
    } while (cursor !== 0);

    logger.info("Invalidated user suggestions cache", {
      userId,
      deletedCount,
    });

    return deletedCount;
  } catch (error) {
    logger.error(
      "Error invalidating user suggestions cache",
      error instanceof Error ? error : new Error(String(error)),
      {
        userId,
      }
    );
    return 0;
  }
}

/**
 * Clean up expired suggestions cache entries
 */
export async function cleanupExpiredSuggestionsCache(): Promise<void> {
  if (!redis) {
    logger.warn("Redis client not available for suggestions cache cleanup");
    return;
  }

  try {
    const trackingKey = `${SUGGESTIONS_CACHE_CONFIG.KEY_PREFIX}keys`;
    const allKeys = (await redis.smembers(trackingKey)) as string[];

    if (allKeys.length === 0) {
      return;
    }

    let cleanedCount = 0;
    const batchSize = 50;

    for (let i = 0; i < allKeys.length; i += batchSize) {
      const batch = allKeys.slice(i, i + batchSize);
      const pipeline = redis.pipeline();

      batch.forEach((key) => {
        pipeline.exists(key);
      });

      const results = await pipeline.exec();
      const expiredKeys: string[] = [];

      results?.forEach((result, index) => {
        // Redis pipeline results are [error, value] tuples
        const [, value] = result as [Error | null, number];
        if (value === 0) {
          // Key doesn't exist (expired)
          expiredKeys.push(batch[index]);
        }
      });

      if (expiredKeys.length > 0) {
        await redis.srem(trackingKey, ...expiredKeys);
        cleanedCount += expiredKeys.length;
      }
    }

    if (cleanedCount > 0) {
      logger.info("Cleaned up expired suggestions cache entries", {
        cleanedCount,
        totalKeys: allKeys.length,
      });
    }
  } catch (error) {
    logger.error(
      "Error cleaning up expired suggestions cache",
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

/**
 * Get suggestions cache statistics
 */
export async function getSuggestionsCacheStats(): Promise<{
  totalKeys: number;
  hitRate?: number;
  averageAge?: number;
}> {
  if (!redis) {
    return { totalKeys: 0 };
  }

  try {
    const trackingKey = `${SUGGESTIONS_CACHE_CONFIG.KEY_PREFIX}keys`;
    const totalKeys = await redis.scard(trackingKey);

    // Sample a few keys to get average age
    const sampleKeys = (await redis.srandmember(
      trackingKey,
      Math.min(10, totalKeys)
    )) as string[];
    let totalAge = 0;
    let validSamples = 0;

    if (sampleKeys.length > 0) {
      for (const key of sampleKeys) {
        try {
          const data = await redis.get<string>(key);
          if (data) {
            const entry: SuggestionCacheEntry = JSON.parse(data);
            totalAge += Date.now() - entry.timestamp;
            validSamples++;
          }
        } catch (error) {
          // Skip invalid entries
        }
      }
    }

    return {
      totalKeys,
      averageAge:
        validSamples > 0
          ? Math.round(totalAge / validSamples / 1000 / 60)
          : undefined, // in minutes
    };
  } catch (error) {
    logger.error(
      "Error getting suggestions cache stats",
      error instanceof Error ? error : new Error(String(error))
    );
    return { totalKeys: 0 };
  }
}

/**
 * Warm up the suggestions cache with common queries
 */
export async function warmupSuggestionsCache(): Promise<void> {
  logger.info("Starting suggestions cache warmup");

  // This could be implemented to pre-populate cache with common suggestions
  // For now, it's a placeholder for future enhancement

  logger.info("Suggestions cache warmup completed");
}

// Schedule periodic cleanup if in server environment
if (typeof window === "undefined" && redis) {
  // Run cleanup every hour
  setInterval(() => {
    cleanupExpiredSuggestionsCache().catch((error) => {
      logger.error(
        "Scheduled cleanup failed",
        error instanceof Error ? error : new Error(String(error))
      );
    });
  }, SUGGESTIONS_CACHE_CONFIG.CLEANUP_INTERVAL * 1000);
}
