import { SupabaseClient, User } from "@supabase/supabase-js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Context, MiddlewareHandler, Next } from "hono";

import { AppEnv } from "@/app/api/[[...route]]/route";
import { supabase } from "@/lib/supabase/client";

// Initialize Redis client
const redis = Redis.fromEnv();

// Define resource types for rate limiting
export enum ResourceType {
  API = "api",
  SCRAPING = "scraping",
  VECTOR = "vector",
  RESEARCH = "research",
}

// Define subscription tiers
export enum SubscriptionTier {
  FREE = "free",
  PRO = "pro",
  ENTERPRISE = "enterprise",
}

// Supported rate limit actions (from config.ts)
export type RateLimitAction =
  | "ocr"
  | "documentQA"
  | "batchProcessing"
  | "api" // Note: "api" action also exists in ResourceType. Ensure distinct usage if necessary.
  | "caseManagement"
  | "documentUpload";

// Type for action-specific rate limit settings (window in seconds, includes tokens)
export type ActionRateLimitConfig = {
  requests: number;
  window: number; // seconds
  tokens: number;
};

// Action-specific rate limit configurations (adapted from config.ts rateLimits)
// Mapping 'standard' -> FREE, 'premium' -> PRO, 'enterprise' -> ENTERPRISE
export const ACTION_SPECIFIC_RATE_LIMITS: {
  [key in RateLimitAction]?: {
    // Action might not be defined for all tiers
    [key in SubscriptionTier]?: ActionRateLimitConfig;
  };
} = {
  ocr: {
    [SubscriptionTier.FREE]: { requests: 50, window: 86400, tokens: 3 },
    [SubscriptionTier.PRO]: { requests: 500, window: 86400, tokens: 2 },
    [SubscriptionTier.ENTERPRISE]: { requests: 5000, window: 86400, tokens: 1 },
  },
  documentQA: {
    [SubscriptionTier.FREE]: { requests: 20, window: 86400, tokens: 5 },
    [SubscriptionTier.PRO]: { requests: 200, window: 86400, tokens: 3 },
    [SubscriptionTier.ENTERPRISE]: { requests: 2000, window: 86400, tokens: 2 },
  },
  batchProcessing: {
    [SubscriptionTier.FREE]: { requests: 5, window: 86400, tokens: 10 },
    [SubscriptionTier.PRO]: { requests: 50, window: 86400, tokens: 5 },
    [SubscriptionTier.ENTERPRISE]: { requests: 500, window: 86400, tokens: 3 },
  },
  api: {
    // This is the 'api' action from config.ts, distinct from ResourceType.API
    [SubscriptionTier.FREE]: { requests: 100, window: 60, tokens: 1 },
    [SubscriptionTier.PRO]: { requests: 500, window: 60, tokens: 1 },
    [SubscriptionTier.ENTERPRISE]: { requests: 2000, window: 60, tokens: 1 },
  },
  caseManagement: {
    [SubscriptionTier.FREE]: { requests: 100, window: 60, tokens: 1 },
    [SubscriptionTier.PRO]: { requests: 500, window: 60, tokens: 1 },
    [SubscriptionTier.ENTERPRISE]: { requests: 2000, window: 60, tokens: 1 },
  },
  documentUpload: {
    [SubscriptionTier.FREE]: { requests: 30, window: 60, tokens: 2 },
    [SubscriptionTier.PRO]: { requests: 100, window: 60, tokens: 1 },
    [SubscriptionTier.ENTERPRISE]: { requests: 500, window: 60, tokens: 1 },
  },
};

/**
 * Create a rate limiter for a specific action and tier (adapted from config.ts)
 */
function createActionRateLimiter(
  action: RateLimitAction,
  tier: SubscriptionTier,
): Ratelimit | null {
  const actionLimitsTiered = ACTION_SPECIFIC_RATE_LIMITS[action];
  if (!actionLimitsTiered) return null;

  const config = actionLimitsTiered[tier];
  if (!config) return null; // Tier might not be defined for this action

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.requests, `${config.window} s`),
    analytics: true,
    prefix: `ratelimit:action:${action}:${tier}`,
  });
}

// Pre-create rate limiters for each action and tier (adapted from config.ts limiters)
// Using a nested record for easier access: ACTION_SPECIFIC_LIMITERS[action][tier]
export const ACTION_SPECIFIC_LIMITERS: Partial<
  Record<RateLimitAction, Partial<Record<SubscriptionTier, Ratelimit | null>>>
> = {};

for (const action in ACTION_SPECIFIC_RATE_LIMITS) {
  const typedAction = action as RateLimitAction;
  ACTION_SPECIFIC_LIMITERS[typedAction] = {};
  const tierConfigs = ACTION_SPECIFIC_RATE_LIMITS[typedAction];
  if (tierConfigs) {
    for (const tier in tierConfigs) {
      const typedTier = tier as SubscriptionTier;
      ACTION_SPECIFIC_LIMITERS[typedAction]![typedTier] =
        createActionRateLimiter(typedAction, typedTier);
    }
  }
}

// Define rate limit configuration type with specific window strings
// Using the formats accepted by Upstash Ratelimit
type TimeUnit = "s" | "m" | "h" | "d";
type WindowFormat = `${number} ${TimeUnit}`;

export type RateLimit = {
  requests: number;
  window: WindowFormat; // e.g., '1 h', '10 s', '1 d'
};

// Rate limit configurations by tier and resource type
export type SubscriptionLimits = {
  [key in ResourceType]: RateLimit;
};

export type SubscriptionRateLimits = {
  [key in SubscriptionTier]: SubscriptionLimits;
};

// Define subscription rate limits
export const SUBSCRIPTION_RATE_LIMITS: SubscriptionRateLimits = {
  [SubscriptionTier.FREE]: {
    [ResourceType.API]: { requests: 1000, window: "1 h" },
    [ResourceType.SCRAPING]: { requests: 100, window: "1 h" },
    [ResourceType.VECTOR]: { requests: 100, window: "1 h" },
    [ResourceType.RESEARCH]: { requests: 50, window: "1 h" },
  },
  [SubscriptionTier.PRO]: {
    [ResourceType.API]: { requests: 10000, window: "1 h" },
    [ResourceType.SCRAPING]: { requests: 1000, window: "1 h" },
    [ResourceType.VECTOR]: { requests: 1000, window: "1 h" },
    [ResourceType.RESEARCH]: { requests: 500, window: "1 h" },
  },
  [SubscriptionTier.ENTERPRISE]: {
    [ResourceType.API]: { requests: 100000, window: "1 h" },
    [ResourceType.SCRAPING]: { requests: 10000, window: "1 h" },
    [ResourceType.VECTOR]: { requests: 10000, window: "1 h" },
    [ResourceType.RESEARCH]: { requests: 5000, window: "1 h" },
  },
};

// Cache of rate limiters to avoid recreating them
const rateLimiterCache = new Map<string, Ratelimit>();

/**
 * Get the proper rate limiter for a tier and resource type
 */
function getRateLimiter(
  tier: SubscriptionTier,
  resourceType: ResourceType,
): Ratelimit {
  const cacheKey = `${tier}:${resourceType}`;

  if (rateLimiterCache.has(cacheKey)) {
    return rateLimiterCache.get(cacheKey)!;
  }

  const { requests, window } = SUBSCRIPTION_RATE_LIMITS[tier][resourceType];

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    prefix: `ratelimit:${tier}:${resourceType}`,
    analytics: true,
  });

  rateLimiterCache.set(cacheKey, limiter);
  return limiter;
}

/**
 * Get user's subscription tier from Supabase database
 * @param supabase Supabase client instance
 * @param userId User ID
 */
export async function getUserTier(
  supabaseClient: SupabaseClient,
  userId: string,
): Promise<SubscriptionTier> {
  try {
    const { data, error } = await supabaseClient
      .from("subscriptions")
      .select("tier")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    if (!data || !data.tier) {
      console.debug(
        `No subscription found for user ${userId}, defaulting to free tier`,
      );
      return SubscriptionTier.FREE;
    }

    // Map subscription tier to rate limit tier
    switch (data.tier.toLowerCase()) {
      case "pro":
      case "premium":
        return SubscriptionTier.PRO;
      case "enterprise":
      case "business":
        return SubscriptionTier.ENTERPRISE;
      default:
        return SubscriptionTier.FREE;
    }
  } catch (error) {
    console.error(`Error getting user tier for ${userId}:`, error);
    return SubscriptionTier.FREE; // Default to free tier on error
  }
}

// Interface for subscription rate limit options
interface SubscriptionRateLimitOptions {
  resourceType: ResourceType;
  errorMessage?: string;
}

/**
 * Subscription-aware rate limiting middleware
 */
export function subscriptionRateLimit(
  options: SubscriptionRateLimitOptions,
): MiddlewareHandler<AppEnv> {
  const { resourceType, errorMessage } = options;

  return async (c: Context<AppEnv>, next: Next) => {
    let user: User | null = null;
    let identifier: string = "anonymous";
    let tier: SubscriptionTier = SubscriptionTier.FREE; // Default tier

    try {
      // 1. Get User
      user = c.get("user");

      // 2. Determine Identifier and Tier
      if (user && user.id) {
        identifier = user.id;

        // 3. Get user's subscription tier if available
        try {
          // Use the imported Supabase client directly
          tier = await getUserTier(supabase, identifier);
        } catch (error) {
          console.error("Error getting user tier:", error);
          // Continue with default tier
        }
      } else {
        // Use IP address for anonymous users
        identifier =
          c.req.header("x-forwarded-for") ||
          c.req.header("x-real-ip") ||
          "anonymous";
      }

      // 4. Get the appropriate rate limiter
      const rateLimiter = getRateLimiter(tier, resourceType);

      // 5. Check Rate Limit
      const result = await rateLimiter.limit(identifier);

      // 6. Set Headers
      c.header("X-RateLimit-Limit", String(result.limit));
      c.header("X-RateLimit-Remaining", String(result.remaining));
      c.header("X-RateLimit-Reset", String(Math.floor(result.reset / 1000))); // Convert MS to seconds
      c.header("X-RateLimit-Tier", tier);
      c.header("X-RateLimit-Resource", resourceType);

      // 7. Handle Limit Exceeded
      if (!result.success) {
        return c.json(
          {
            success: false,
            error: "Rate limit exceeded",
            message:
              errorMessage ||
              `You have exceeded your ${resourceType} request limit for your ${tier} subscription.`,
            details: {
              tier,
              resourceType,
              limit: result.limit,
              remaining: result.remaining,
              reset: new Date(result.reset).toISOString(),
            },
          },
          429,
        );
      }

      // 8. Proceed with the request if allowed
      await next();

      // 9. Wait for analytics to be submitted if needed
      if (result.pending) {
        await result.pending;
      }
    } catch (error) {
      console.error(`Rate limiting error (Resource: ${resourceType}):`, error);
      // Continue without rate limiting if there's an error
      await next();
    }
  };
}
