/**
 * Rate Limiting System
 * 
 * Provides functions and middleware for API rate limiting using Upstash Redis.
 */

import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Initialize Redis client
const redis = Redis.fromEnv();

// Rate limit configurations
const rateLimits = {
  // OCR API limits
  ocr: {
    standard: {
      requests: 50,     // 50 requests
      window: 86400,    // per day (24 hours in seconds)
      tokens: 3         // cost per request (token-based rate limiting)
    },
    premium: {
      requests: 500,    // 500 requests
      window: 86400,    // per day (24 hours in seconds)
      tokens: 2         // cost per request (less than standard)
    },
    enterprise: {
      requests: 5000,   // 5000 requests
      window: 86400,    // per day (24 hours in seconds)
      tokens: 1         // cost per request (less than premium)
    }
  },
  
  // Document understanding API limits
  documentQA: {
    standard: {
      requests: 20,     // 20 requests
      window: 86400,    // per day (24 hours in seconds)
      tokens: 5         // cost per request (token-based rate limiting)
    },
    premium: {
      requests: 200,    // 200 requests
      window: 86400,    // per day (24 hours in seconds)
      tokens: 3         // cost per request (less than standard)
    },
    enterprise: {
      requests: 2000,   // 2000 requests
      window: 86400,    // per day (24 hours in seconds)
      tokens: 2         // cost per request (less than premium)
    }
  },
  
  // Batch processing limits
  batchProcessing: {
    standard: {
      requests: 5,      // 5 batch requests
      window: 86400,    // per day (24 hours in seconds)
      tokens: 10        // cost per request (token-based rate limiting)
    },
    premium: {
      requests: 50,     // 50 batch requests
      window: 86400,    // per day (24 hours in seconds)
      tokens: 5         // cost per request (less than standard)
    },
    enterprise: {
      requests: 500,    // 500 batch requests
      window: 86400,    // per day (24 hours in seconds)
      tokens: 3         // cost per request (less than premium)
    }
  }
};

// Type for rate limit action
type RateLimitAction = 'ocr' | 'documentQA' | 'batchProcessing';

// Type for user tier
type UserTier = 'standard' | 'premium' | 'enterprise';

// Create rate limiters for each action and tier
const limiters: Record<RateLimitAction, Record<UserTier, Ratelimit>> = {
  ocr: {
    standard: createRateLimiter('ocr', 'standard'),
    premium: createRateLimiter('ocr', 'premium'),
    enterprise: createRateLimiter('ocr', 'enterprise')
  },
  documentQA: {
    standard: createRateLimiter('documentQA', 'standard'),
    premium: createRateLimiter('documentQA', 'premium'),
    enterprise: createRateLimiter('documentQA', 'enterprise')
  },
  batchProcessing: {
    standard: createRateLimiter('batchProcessing', 'standard'),
    premium: createRateLimiter('batchProcessing', 'premium'),
    enterprise: createRateLimiter('batchProcessing', 'enterprise')
  }
};

/**
 * Create a rate limiter for a specific action and tier
 */
function createRateLimiter(action: RateLimitAction, tier: UserTier): Ratelimit {
  const config = rateLimits[action][tier];
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.requests, config.window),
    analytics: true,
    prefix: `ratelimit:${action}:${tier}`
  });
}

/**
 * Check if a request is rate limited
 * 
 * @param identifier User identifier (e.g., user ID or IP address)
 * @param action Rate limit action
 * @param tier User tier
 * @param cost Number of tokens to consume (default: defined by tier)
 * @returns Rate limit result with success status, limit, and remaining tokens
 */
export async function checkRateLimit(
  identifier: string,
  action: RateLimitAction,
  tier: UserTier = 'standard',
  cost?: number
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: Date;
  pending: Promise<void>;
}> {
  const limiter = limiters[action][tier];
  const tokenCost = cost ?? rateLimits[action][tier].tokens;
  
  // Use the identifier as the key for rate limiting
  const result = await limiter.limit(identifier);
  
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: new Date(Date.now() + result.reset),
    pending: result.pending as Promise<void>
  };
}

/**
 * Get rate limit information for a user
 * 
 * @param identifier User identifier
 * @param action Rate limit action
 * @param tier User tier
 * @returns Rate limit information
 */
export async function getRateLimitInfo(
  identifier: string,
  action: RateLimitAction,
  tier: UserTier = 'standard'
): Promise<{
  limit: number;
  remaining: number;
  reset: Date;
}> {
  const key = `ratelimit:${action}:${tier}:${identifier}`;
  const [used, ttl] = await redis.pipeline()
    .get(key)
    .ttl(key)
    .exec();
  
  const limit = rateLimits[action][tier].requests;
  const usedCount = used ? parseInt(used as string) : 0;
  const remaining = Math.max(0, limit - usedCount);
  const resetInSeconds = ttl ? parseInt(ttl as string) : 0;
  
  return {
    limit,
    remaining,
    reset: new Date(Date.now() + resetInSeconds * 1000)
  };
}

/**
 * Hono middleware for rate limiting
 * 
 * @param action Rate limit action
 * @param getUserTier Function to get the user tier from the request
 * @param getIdentifier Function to get the user identifier from the request
 * @returns Hono middleware function
 */
export function createRateLimitMiddleware(
  action: RateLimitAction,
  getUserTier: (c: any) => UserTier | Promise<UserTier> = () => 'standard',
  getIdentifier: (c: any) => string | Promise<string> = (c) => c.req.header('x-forwarded-for') || 'anonymous'
) {
  return async (c: any, next: () => Promise<void>) => {
    try {
      // Get user tier and identifier
      const tier = await (typeof getUserTier === 'function' ? getUserTier(c) : getUserTier);
      const identifier = await (typeof getIdentifier === 'function' ? getIdentifier(c) : getIdentifier);
      
      // Check rate limit
      const result = await checkRateLimit(identifier, action, tier);
      
      // Set rate limit headers
      c.header('X-RateLimit-Limit', String(result.limit));
      c.header('X-RateLimit-Remaining', String(result.remaining));
      c.header('X-RateLimit-Reset', String(result.reset.getTime()));
      
      if (!result.success) {
        return c.json({
          success: false,
          error: 'Rate limit exceeded',
          limit: result.limit,
          remaining: result.remaining,
          reset: result.reset.toISOString()
        }, 429);
      }
      
      // Continue to the next middleware or route handler
      await next();
      
      // Wait for the rate limit to be applied
      await result.pending;
    } catch (error) {
      console.error('Rate limiting error:', error);
      
      // Continue to the next middleware or route handler even if rate limiting fails
      await next();
    }
  };
}

/**
 * Get user tier from database or other source
 * 
 * @param userId User ID
 * @returns User tier
 */
export async function getUserTier(userId: string): Promise<UserTier> {
  try {
    // This is a placeholder; implement the actual logic to get the user's tier
    // e.g., from the database, subscription service, etc.
    return 'standard';
  } catch (error) {
    console.error('Error getting user tier:', error);
    // Default to standard tier if there's an error
    return 'standard';
  }
}

/**
 * Check if batch processing is allowed for the user
 * 
 * @param userId User ID
 * @param documentCount Number of documents to process
 * @returns Whether batch processing is allowed
 */
export async function canProcessBatch(userId: string, documentCount: number): Promise<{
  allowed: boolean;
  maxBatchSize: number;
  tier: UserTier;
  reason?: string;
}> {
  try {
    // Get user tier
    const tier = await getUserTier(userId);
    
    // Define max batch size based on tier
    const maxBatchSizes = {
      standard: 10,
      premium: 50,
      enterprise: 200
    };
    
    const maxBatchSize = maxBatchSizes[tier];
    
    // Check if batch size exceeds maximum
    if (documentCount > maxBatchSize) {
      return {
        allowed: false,
        maxBatchSize,
        tier,
        reason: `Batch size (${documentCount}) exceeds maximum allowed for ${tier} tier (${maxBatchSize})`
      };
    }
    
    // Check rate limit
    const result = await checkRateLimit(userId, 'batchProcessing', tier);
    
    if (!result.success) {
      return {
        allowed: false,
        maxBatchSize,
        tier,
        reason: `Rate limit exceeded. Resets at ${result.reset.toISOString()}`
      };
    }
    
    return {
      allowed: true,
      maxBatchSize,
      tier
    };
  } catch (error) {
    console.error('Batch processing check error:', error);
    return {
      allowed: false,
      maxBatchSize: 0,
      tier: 'standard',
      reason: 'Error checking batch processing permissions'
    };
  }
} 