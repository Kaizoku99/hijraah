import { Redis } from '@upstash/redis';
import { LRUCache } from 'lru-cache';

interface CacheOptions {
  ttl?: number;
  maxSize?: number;
}

class CacheManager {
  private redis: Redis | null = null;
  private lruCache: LRUCache<string, string>;

  constructor(options: CacheOptions = {}) {
    // Initialize Redis if credentials are available
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      this.redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
    }

    // Initialize LRU cache as fallback
    this.lruCache = new LRUCache({
      max: options.maxSize || 500,
      ttl: options.ttl || 3600 * 1000, // 1 hour in milliseconds
    });
  }

  async get(key: string): Promise<string | null> {
    try {
      // Try Redis first if available
      if (this.redis) {
        const value = await this.redis.get<string>(key);
        if (value) return value;
      }

      // Fallback to LRU cache
      return this.lruCache.get(key) || null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    try {
      // Set in Redis if available
      if (this.redis) {
        await this.redis.set(key, value, {
          ex: ttl || 3600, // Default 1 hour
        });
      }

      // Also set in LRU cache
      this.lruCache.set(key, value, {
        ttl: ttl ? ttl * 1000 : undefined, // Convert seconds to milliseconds
      });
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      // Delete from Redis if available
      if (this.redis) {
        await this.redis.del(key);
      }

      // Delete from LRU cache
      this.lruCache.delete(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      // Clear Redis if available
      if (this.redis) {
        await this.redis.flushall();
      }

      // Clear LRU cache
      this.lruCache.clear();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
}

// Export singleton instance
export const cache = new CacheManager(); 