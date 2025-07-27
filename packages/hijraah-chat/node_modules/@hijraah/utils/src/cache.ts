import { Redis } from "@upstash/redis";

// ===== UPSTASH REDIS CLIENT =====
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// ===== CACHE KEY GENERATORS =====
export const CacheKeys = {
  // Chat-related keys
  chatSession: (id: string) => `chat:session:${id}`,
  chatMessages: (chatId: string) => `chat:messages:${chatId}`,
  chatSuggestions: (chatId: string) => `chat:suggestions:${chatId}`,

  // Vector embedding keys
  embedding: (documentId: string) => `embedding:${documentId}`,
  embeddingSearch: (query: string) =>
    `embedding:search:${Buffer.from(query).toString("base64")}`,

  // Document processing keys
  document: (id: string) => `document:${id}`,
  documentContent: (id: string) => `document:content:${id}`,

  // Web index keys
  webIndex: (id: string) => `web_index:${id}`,
  crawlJob: (id: string) => `crawl_job:${id}`,

  // User session keys
  userSession: (userId: string) => `user:session:${userId}`,
  userPreferences: (userId: string) => `user:preferences:${userId}`,

  // Search results keys
  searchResults: (query: string, filters?: Record<string, any>) => {
    const filterKey = filters
      ? Buffer.from(JSON.stringify(filters)).toString("base64")
      : "";
    return `search:${Buffer.from(query).toString("base64")}:${filterKey}`;
  },
} as const;

// ===== CACHE TTL CONSTANTS =====
export const CacheTTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  EXTENDED: 86400, // 24 hours
  PERMANENT: -1, // No expiration
} as const;

// ===== CACHE INTERFACE =====
export interface CacheOptions {
  ttl?: number;
  namespace?: string;
  tags?: string[];
}

export interface VectorEmbedding {
  id: string;
  vector: number[];
  metadata?: Record<string, any>;
}

export interface SearchResultCache {
  results: any[];
  total: number;
  query: string;
  filters?: Record<string, any>;
  timestamp: number;
}

// ===== CORE CACHE OPERATIONS =====
export class CacheManager {
  private redis: Redis;

  constructor() {
    this.redis = redis;
  }

  async get<T = any>(key: string): Promise<T | null> {
    try {
      const result = await this.redis.get(key);
      return result as T;
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }

  async set<T = any>(
    key: string,
    value: T,
    options: CacheOptions = {}
  ): Promise<boolean> {
    try {
      const { ttl = CacheTTL.MEDIUM } = options;

      if (ttl === CacheTTL.PERMANENT) {
        await this.redis.set(key, value);
      } else {
        await this.redis.setex(key, ttl, value);
      }

      return true;
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      await this.redis.del(key);
      return true;
    } catch (error) {
      console.error(`Cache delete error for key ${key}:`, error);
      return false;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error(`Cache exists error for key ${key}:`, error);
      return false;
    }
  }

  async expire(key: string, seconds: number): Promise<boolean> {
    try {
      await this.redis.expire(key, seconds);
      return true;
    } catch (error) {
      console.error(`Cache expire error for key ${key}:`, error);
      return false;
    }
  }

  async mget<T = any>(keys: string[]): Promise<(T | null)[]> {
    try {
      const results = await this.redis.mget(...keys);
      return results as (T | null)[];
    } catch (error) {
      console.error(`Cache mget error for keys ${keys.join(", ")}:`, error);
      return new Array(keys.length).fill(null);
    }
  }

  async mset(
    keyValuePairs: Record<string, any>,
    ttl?: number
  ): Promise<boolean> {
    try {
      const pipeline = this.redis.pipeline();

      for (const [key, value] of Object.entries(keyValuePairs)) {
        if (ttl) {
          pipeline.setex(key, ttl, value);
        } else {
          pipeline.set(key, value);
        }
      }

      await pipeline.exec();
      return true;
    } catch (error) {
      console.error(`Cache mset error:`, error);
      return false;
    }
  }

  async increment(key: string, by: number = 1): Promise<number | null> {
    try {
      const result = await this.redis.incrby(key, by);
      return result;
    } catch (error) {
      console.error(`Cache increment error for key ${key}:`, error);
      return null;
    }
  }

  async getAndUpdate<T = any>(
    key: string,
    updater: (current: T | null) => T,
    ttl?: number
  ): Promise<T> {
    try {
      const current = await this.get<T>(key);
      const updated = updater(current);
      await this.set(key, updated, { ttl });
      return updated;
    } catch (error) {
      console.error(`Cache getAndUpdate error for key ${key}:`, error);
      throw error;
    }
  }
}

// ===== SPECIALIZED CACHE MANAGERS =====
export class VectorCache extends CacheManager {
  async storeEmbedding(
    documentId: string,
    embedding: VectorEmbedding,
    ttl: number = CacheTTL.EXTENDED
  ): Promise<boolean> {
    const key = CacheKeys.embedding(documentId);
    return this.set(key, embedding, { ttl });
  }

  async getEmbedding(documentId: string): Promise<VectorEmbedding | null> {
    const key = CacheKeys.embedding(documentId);
    return this.get<VectorEmbedding>(key);
  }

  async storeSearchResults(
    query: string,
    results: any[],
    total: number,
    filters?: Record<string, any>
  ): Promise<boolean> {
    const key = CacheKeys.embeddingSearch(query);
    const cacheData: SearchResultCache = {
      results,
      total,
      query,
      filters,
      timestamp: Date.now(),
    };
    return this.set(key, cacheData, { ttl: CacheTTL.MEDIUM });
  }

  async getSearchResults(query: string): Promise<SearchResultCache | null> {
    const key = CacheKeys.embeddingSearch(query);
    return this.get<SearchResultCache>(key);
  }
}

export class SessionCache extends CacheManager {
  async storeUserSession(
    userId: string,
    sessionData: any,
    ttl: number = CacheTTL.LONG
  ): Promise<boolean> {
    const key = CacheKeys.userSession(userId);
    return this.set(key, sessionData, { ttl });
  }

  async getUserSession(userId: string): Promise<any | null> {
    const key = CacheKeys.userSession(userId);
    return this.get(key);
  }

  async storeUserPreferences(
    userId: string,
    preferences: any
  ): Promise<boolean> {
    const key = CacheKeys.userPreferences(userId);
    return this.set(key, preferences, { ttl: CacheTTL.EXTENDED });
  }

  async getUserPreferences(userId: string): Promise<any | null> {
    const key = CacheKeys.userPreferences(userId);
    return this.get(key);
  }
}

export class ChatCache extends CacheManager {
  async storeChatSession(
    chatId: string,
    sessionData: any,
    ttl: number = CacheTTL.LONG
  ): Promise<boolean> {
    const key = CacheKeys.chatSession(chatId);
    return this.set(key, sessionData, { ttl });
  }

  async getChatSession(chatId: string): Promise<any | null> {
    const key = CacheKeys.chatSession(chatId);
    return this.get(key);
  }

  async storeChatMessages(
    chatId: string,
    messages: any[],
    ttl: number = CacheTTL.MEDIUM
  ): Promise<boolean> {
    const key = CacheKeys.chatMessages(chatId);
    return this.set(key, messages, { ttl });
  }

  async getChatMessages(chatId: string): Promise<any[] | null> {
    const key = CacheKeys.chatMessages(chatId);
    return this.get<any[]>(key);
  }
}

// ===== SINGLETON INSTANCES =====
export const cache = new CacheManager();
export const vectorCache = new VectorCache();
export const sessionCache = new SessionCache();
export const chatCache = new ChatCache();

// ===== CACHE WARMING UTILITIES =====
export async function warmCache(
  keys: Array<{ key: string; fetcher: () => Promise<any>; ttl?: number }>
) {
  const results = await Promise.allSettled(
    keys.map(async ({ key, fetcher, ttl }) => {
      const exists = await cache.exists(key);
      if (!exists) {
        const data = await fetcher();
        await cache.set(key, data, { ttl });
      }
    })
  );

  const failed = results.filter(
    (result) => result.status === "rejected"
  ).length;
  console.log(
    `Cache warming completed: ${keys.length - failed}/${keys.length} successful`
  );
}

// ===== CACHE INVALIDATION =====
export async function invalidatePattern(pattern: string): Promise<number> {
  try {
    // Note: Upstash Redis doesn't support SCAN, so this is a simplified approach
    // In production, you might want to maintain a separate index of keys to invalidate
    console.warn(`Pattern invalidation not fully supported: ${pattern}`);
    return 0;
  } catch (error) {
    console.error(`Cache invalidation error for pattern ${pattern}:`, error);
    return 0;
  }
}

// ===== HEALTH CHECK =====
export async function checkCacheHealth(): Promise<boolean> {
  try {
    await redis.ping();
    return true;
  } catch (error) {
    console.error("Cache health check failed:", error);
    return false;
  }
}

export default cache;
