import { Redis } from '@upstash/redis';

// Environment variables for Upstash Redis
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || '';
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';

// Create Redis client
let redisClient: Redis;

// Create Redis client
function createRedisClient(): Redis {
  // Initialize Upstash Redis client
  const client = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
    retry: {
      retries: 3,
      backoff: (retryCount) => Math.min(retryCount * 50, 1000)
    }
  });
  
  console.log('Upstash Redis client initialized');
  return client;
}

// Get Redis client (singleton pattern)
export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = createRedisClient();
  }
  return redisClient;
}

// Health check function for Redis
export async function isRedisHealthy(): Promise<boolean> {
  try {
    const client = getRedisClient();
    const result = await client.ping();
    return result === 'PONG';
  } catch (error) {
    console.error('Redis health check failed:', error);
    return false;
  }
} 