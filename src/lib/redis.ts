import { Redis } from '@upstash/redis';

// Initialize Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Translation cache helper functions
export const translationCache = {
  async get(locale: string): Promise<Record<string, any> | null> {
    try {
      const cached = await redis.get(`i18n:${locale}`);
      return cached ? JSON.parse(cached as string) : null;
    } catch (error) {
      console.error('Translation cache get error:', error);
      return null;
    }
  },

  async set(locale: string, translations: Record<string, any>, ttl: number = 3600): Promise<void> {
    try {
      await redis.setex(`i18n:${locale}`, ttl, JSON.stringify(translations));
    } catch (error) {
      console.error('Translation cache set error:', error);
    }
  },

  async invalidate(locale: string): Promise<void> {
    try {
      await redis.del(`i18n:${locale}`);
    } catch (error) {
      console.error('Translation cache invalidate error:', error);
    }
  },

  async invalidateAll(): Promise<void> {
    try {
      const keys = await redis.keys('i18n:*');
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      console.error('Translation cache invalidate all error:', error);
    }
  }
}; 