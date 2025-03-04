import { Context, Next } from 'hono';
import { getRedisClient } from '../lib/redis';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Available subscription plans with rate limits
export enum SubscriptionTier {
  FREE = 'free',
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
}

// Define rate limits for each subscription tier and resource type
export interface RateLimitConfig {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number; // Maximum requests in a short time window (5 seconds)
}

// Resource types that have separate rate limits
export enum ResourceType {
  API = 'api',           // General API requests
  SCRAPING = 'scraping', // Web scraping requests
  VECTOR = 'vector',     // Vector search and embedding
  RESEARCH = 'research', // Research session management
}

// Rate limit configuration by subscription tier and resource type
export const SUBSCRIPTION_RATE_LIMITS: Record<SubscriptionTier, Record<ResourceType, RateLimitConfig>> = {
  [SubscriptionTier.FREE]: {
    [ResourceType.API]: {
      requestsPerMinute: 30,
      requestsPerHour: 500,
      requestsPerDay: 5000,
      burstLimit: 10,
    },
    [ResourceType.SCRAPING]: {
      requestsPerMinute: 5,
      requestsPerHour: 20,
      requestsPerDay: 50,
      burstLimit: 3,
    },
    [ResourceType.VECTOR]: {
      requestsPerMinute: 10,
      requestsPerHour: 100,
      requestsPerDay: 500,
      burstLimit: 5,
    },
    [ResourceType.RESEARCH]: {
      requestsPerMinute: 2,
      requestsPerHour: 10,
      requestsPerDay: 20,
      burstLimit: 2,
    },
  },
  [SubscriptionTier.BASIC]: {
    [ResourceType.API]: {
      requestsPerMinute: 60,
      requestsPerHour: 1000,
      requestsPerDay: 10000,
      burstLimit: 20,
    },
    [ResourceType.SCRAPING]: {
      requestsPerMinute: 15,
      requestsPerHour: 100,
      requestsPerDay: 500,
      burstLimit: 10,
    },
    [ResourceType.VECTOR]: {
      requestsPerMinute: 30,
      requestsPerHour: 300,
      requestsPerDay: 3000,
      burstLimit: 15,
    },
    [ResourceType.RESEARCH]: {
      requestsPerMinute: 5,
      requestsPerHour: 30,
      requestsPerDay: 100,
      burstLimit: 5,
    },
  },
  [SubscriptionTier.PROFESSIONAL]: {
    [ResourceType.API]: {
      requestsPerMinute: 300,
      requestsPerHour: 5000,
      requestsPerDay: 50000,
      burstLimit: 100,
    },
    [ResourceType.SCRAPING]: {
      requestsPerMinute: 60,
      requestsPerHour: 500,
      requestsPerDay: 5000,
      burstLimit: 30,
    },
    [ResourceType.VECTOR]: {
      requestsPerMinute: 100,
      requestsPerHour: 1000,
      requestsPerDay: 10000,
      burstLimit: 50,
    },
    [ResourceType.RESEARCH]: {
      requestsPerMinute: 20,
      requestsPerHour: 200,
      requestsPerDay: 1000,
      burstLimit: 10,
    },
  },
  [SubscriptionTier.ENTERPRISE]: {
    [ResourceType.API]: {
      requestsPerMinute: 1000,
      requestsPerHour: 20000,
      requestsPerDay: 200000,
      burstLimit: 500,
    },
    [ResourceType.SCRAPING]: {
      requestsPerMinute: 200,
      requestsPerHour: 2000,
      requestsPerDay: 20000,
      burstLimit: 100,
    },
    [ResourceType.VECTOR]: {
      requestsPerMinute: 500,
      requestsPerHour: 5000,
      requestsPerDay: 50000,
      burstLimit: 200,
    },
    [ResourceType.RESEARCH]: {
      requestsPerMinute: 100,
      requestsPerHour: 1000,
      requestsPerDay: 10000,
      burstLimit: 50,
    },
  },
};

// Interface for subscription rate limit options
interface SubscriptionRateLimitOptions {
  resourceType?: ResourceType;
  getTier?: (c: Context) => Promise<SubscriptionTier> | SubscriptionTier;
  includeHeaders?: boolean;
  errorMessage?: string;
  statusCode?: 429 | 403 | 400;
  getRedisClient?: () => Redis; // For testing/DI
}

// Cache of ratelimit instances
const ratelimiters: Record<string, Record<string, Ratelimit>> = {};

// Default function to get subscription tier from user object
async function getDefaultTier(c: Context): Promise<SubscriptionTier> {
  const user = c.get('user');
  
  if (!user) {
    return SubscriptionTier.FREE;
  }
  
  // Check user's subscription in metadata
  // This assumes a specific structure in Supabase user metadata
  const metadata = user.app_metadata || user.user_metadata || {};
  
  // Get subscription tier from metadata or default to FREE
  const tier = metadata.subscription_tier || SubscriptionTier.FREE;
  
  // Validate that the tier exists in our config
  if (!Object.values(SubscriptionTier).includes(tier)) {
    console.warn(`Unknown subscription tier: ${tier}, falling back to FREE`);
    return SubscriptionTier.FREE;
  }
  
  return tier as SubscriptionTier;
}

/**
 * Get rate limits for a specific user
 * This can be used to display limits to users in the UI
 */
export async function getUserRateLimits(
  userId: string,
  subscriptionTier: SubscriptionTier
): Promise<Record<ResourceType, RateLimitConfig>> {
  // Create result object with limits for each resource type
  const result: Record<ResourceType, RateLimitConfig> = {} as any;
  
  // Get limits for each resource type
  for (const resourceType of Object.values(ResourceType)) {
    result[resourceType] = SUBSCRIPTION_RATE_LIMITS[subscriptionTier][resourceType];
  }
  
  return result;
}

/**
 * Get rate limit usage for a specific user
 */
export async function getUserRateUsage(
  userId: string,
  resourceType: ResourceType = ResourceType.API
): Promise<{
  minute: number;
  hour: number;
  day: number;
  burst: number;
}> {
  const redis = getRedisClient();
  
  // Generate keys for different time windows
  const keyPrefix = `rate:${userId}:${resourceType}`;
  const minuteKey = `${keyPrefix}:minute`;
  const hourKey = `${keyPrefix}:hour`;
  const dayKey = `${keyPrefix}:day`;
  const burstKey = `${keyPrefix}:burst`;
  
  // Get current counts directly with Upstash Redis
  const [minute, hour, day, burst] = await Promise.all([
    redis.get<string>(minuteKey),
    redis.get<string>(hourKey),
    redis.get<string>(dayKey),
    redis.get<string>(burstKey)
  ]);
  
  return {
    minute: minute ? parseInt(minute) : 0,
    hour: hour ? parseInt(hour) : 0,
    day: day ? parseInt(day) : 0,
    burst: burst ? parseInt(burst) : 0,
  };
}

/**
 * Get or create a ratelimiter for a specific tier, resource, and window
 */
function getRatelimiter(
  redis: Redis,
  tier: SubscriptionTier,
  resourceType: ResourceType,
  window: 'minute' | 'hour' | 'day' | 'burst'
): Ratelimit {
  const key = `${tier}:${resourceType}:${window}`;
  
  // Initialize tier in cache if needed
  if (!ratelimiters[tier]) {
    ratelimiters[tier] = {};
  }
  
  // Return cached instance if available
  if (ratelimiters[tier][key]) {
    return ratelimiters[tier][key];
  }
  
  // Get the limit value based on window
  let limit: number;
  let duration: number;
  
  switch (window) {
    case 'minute':
      limit = SUBSCRIPTION_RATE_LIMITS[tier][resourceType].requestsPerMinute;
      duration = 60; // 60 seconds
      break;
    case 'hour':
      limit = SUBSCRIPTION_RATE_LIMITS[tier][resourceType].requestsPerHour;
      duration = 3600; // 3600 seconds
      break;
    case 'day':
      limit = SUBSCRIPTION_RATE_LIMITS[tier][resourceType].requestsPerDay;
      duration = 86400; // 86400 seconds
      break;
    case 'burst':
      limit = SUBSCRIPTION_RATE_LIMITS[tier][resourceType].burstLimit;
      duration = 5; // 5 seconds
      break;
  }
  
  // Create new ratelimiter
  const ratelimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${duration} s`),
    prefix: `ratelimit:${tier}:${resourceType}:${window}`,
    analytics: true, // Enable analytics for usage metrics
  });
  
  // Cache for reuse
  ratelimiters[tier][key] = ratelimiter;
  
  return ratelimiter;
}

/**
 * Middleware for subscription-based rate limiting
 */
export function subscriptionRateLimit(options: SubscriptionRateLimitOptions = {}) {
  const {
    resourceType = ResourceType.API,
    getTier = getDefaultTier,
    includeHeaders = true,
    errorMessage = 'Rate limit exceeded for your subscription tier. Please upgrade your plan for higher limits.',
    statusCode = 429,
  } = options;
  
  // Use provided Redis client or get the default one
  const redisClient = options.getRedisClient || getRedisClient;
  
  return async (c: Context, next: Next) => {
    // Get user information
    const user = c.get('user');
    const userId = user?.id || 'anonymous';
    
    // Get subscription tier (might be async in real implementations)
    const subscriptionTier = await Promise.resolve(getTier(c));
    
    // Get rate limits for this tier and resource
    const limits = SUBSCRIPTION_RATE_LIMITS[subscriptionTier][resourceType];
    
    // Get Redis client
    const redis = redisClient();
    
    try {
      // Check rate limits for each window
      const [minuteResult, hourResult, dayResult, burstResult] = await Promise.all([
        getRatelimiter(redis, subscriptionTier, resourceType, 'minute').limit(userId),
        getRatelimiter(redis, subscriptionTier, resourceType, 'hour').limit(userId),
        getRatelimiter(redis, subscriptionTier, resourceType, 'day').limit(userId),
        getRatelimiter(redis, subscriptionTier, resourceType, 'burst').limit(userId)
      ]);
      
      // Extract counts and remaining from results
      const minuteCount = minuteResult.limit - minuteResult.remaining;
      const hourCount = hourResult.limit - hourResult.remaining;
      const dayCount = dayResult.limit - dayResult.remaining;
      const burstCount = burstResult.limit - burstResult.remaining;
      
      // Add rate limit headers if enabled
      if (includeHeaders) {
        c.header('X-RateLimit-Limit-Minute', limits.requestsPerMinute.toString());
        c.header('X-RateLimit-Remaining-Minute', minuteResult.remaining.toString());
        
        c.header('X-RateLimit-Limit-Hour', limits.requestsPerHour.toString());
        c.header('X-RateLimit-Remaining-Hour', hourResult.remaining.toString());
        
        c.header('X-RateLimit-Limit-Day', limits.requestsPerDay.toString());
        c.header('X-RateLimit-Remaining-Day', dayResult.remaining.toString());
        
        c.header('X-RateLimit-Subscription-Tier', subscriptionTier);
      }
      
      // Check if any limit is exceeded
      const isMinuteLimitExceeded = !minuteResult.success;
      const isHourLimitExceeded = !hourResult.success;
      const isDayLimitExceeded = !dayResult.success;
      const isBurstLimitExceeded = !burstResult.success;
      
      // If any limit is exceeded, return error
      if (isMinuteLimitExceeded || isHourLimitExceeded || isDayLimitExceeded || isBurstLimitExceeded) {
        let retryAfter = 60; // Default retry after 1 minute
        let specificMessage = errorMessage;
        
        // Determine which limit was exceeded for more helpful error message
        if (isBurstLimitExceeded) {
          retryAfter = Math.ceil(burstResult.reset / 1000) || 5;
          specificMessage = `Burst limit exceeded. Please slow down your requests.`;
        } else if (isMinuteLimitExceeded) {
          retryAfter = Math.ceil(minuteResult.reset / 1000) || 60;
          specificMessage = `Minute limit exceeded for your ${subscriptionTier} subscription.`;
        } else if (isHourLimitExceeded) {
          retryAfter = Math.ceil(hourResult.reset / 1000) || 3600;
          specificMessage = `Hour limit exceeded for your ${subscriptionTier} subscription.`;
        } else if (isDayLimitExceeded) {
          retryAfter = Math.ceil(dayResult.reset / 1000) || 86400;
          specificMessage = `Daily limit exceeded for your ${subscriptionTier} subscription.`;
        }
        
        // Add retry header
        if (includeHeaders) {
          c.header('Retry-After', retryAfter.toString());
        }
        
        // Return rate limit error
        return c.json({
          success: false,
          error: 'Rate Limit Exceeded',
          message: specificMessage,
          retryAfter,
          tier: subscriptionTier,
          limits: {
            requestsPerMinute: limits.requestsPerMinute,
            requestsPerHour: limits.requestsPerHour,
            requestsPerDay: limits.requestsPerDay,
          },
          usage: {
            minute: minuteCount,
            hour: hourCount,
            day: dayCount,
          },
        }, statusCode);
      }
      
      // If not exceeded, continue to the next middleware/handler
      await next();
    } catch (error) {
      console.error('Rate limit error:', error);
      
      // In case of Redis error, continue to prevent blocking all requests
      await next();
    }
  };
} 