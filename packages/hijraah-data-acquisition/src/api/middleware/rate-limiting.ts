/**
 * Rate Limiting Middleware
 * 
 * Implements rate limiting with Redis-based tracking, subscription tier enforcement,
 * and intelligent usage monitoring for Firecrawl and AI SDK resources.
 */

import type { 
  RateLimitingMiddleware, 
  RequestContext, 
  ApiResponse,
  RateLimitStatus,
  AuthContext
} from "../types.js";
import type { SupabaseClient } from "@supabase/supabase-js";

export class RateLimitingMiddlewareImpl implements RateLimitingMiddleware {
  name = "rate-limiting";
  priority = 90; // High priority - runs after authentication

  constructor(
    private supabase: SupabaseClient,
    private redisClient?: any // Optional Redis client for distributed rate limiting
  ) {}

  async execute(
    context: RequestContext, 
    next: () => Promise<ApiResponse>
  ): Promise<ApiResponse> {
    try {
      // Check rate limits
      const rateLimitStatus = await this.checkLimits(context.auth);
      
      if (rateLimitStatus.remaining <= 0) {
        return this.createRateLimitResponse(rateLimitStatus, context);
      }

      // Execute the request
      const response = await next();

      // Update usage after successful request
      await this.updateUsage(context.auth, context.metadata.endpoint || "unknown");

      // Add rate limit headers to response
      response.metadata = {
        ...response.metadata,
        rateLimitStatus,
      };

      return response;
    } catch (error) {
      console.error("Rate limiting middleware error:", error);
      return this.createErrorResponse("RATE_LIMIT_ERROR", "Rate limiting failed", context);
    }
  }

  async checkLimits(auth: AuthContext): Promise<RateLimitStatus> {
    const now = new Date();
    const limits = auth.rateLimits;
    const usage = auth.usage;

    // Check minute limit
    if (usage.currentMinute >= limits.requestsPerMinute) {
      const resetAt = new Date(now);
      resetAt.setMinutes(resetAt.getMinutes() + 1, 0, 0);
      
      return {
        limit: limits.requestsPerMinute,
        remaining: 0,
        resetAt: resetAt.toISOString(),
        retryAfter: Math.ceil((resetAt.getTime() - now.getTime()) / 1000),
      };
    }

    // Check hour limit
    if (usage.currentHour >= limits.requestsPerHour) {
      const resetAt = new Date(now);
      resetAt.setHours(resetAt.getHours() + 1, 0, 0, 0);
      
      return {
        limit: limits.requestsPerHour,
        remaining: 0,
        resetAt: resetAt.toISOString(),
        retryAfter: Math.ceil((resetAt.getTime() - now.getTime()) / 1000),
      };
    }

    // Check day limit
    if (usage.currentDay >= limits.requestsPerDay) {
      const resetAt = new Date(now);
      resetAt.setDate(resetAt.getDate() + 1);
      resetAt.setHours(0, 0, 0, 0);
      
      return {
        limit: limits.requestsPerDay,
        remaining: 0,
        resetAt: resetAt.toISOString(),
        retryAfter: Math.ceil((resetAt.getTime() - now.getTime()) / 1000),
      };
    }

    // Check monthly resource limits
    if (usage.currentMonth.firecrawlCredits >= limits.firecrawlCreditsPerMonth) {
      const resetAt = new Date(now);
      resetAt.setMonth(resetAt.getMonth() + 1, 1);
      resetAt.setHours(0, 0, 0, 0);
      
      return {
        limit: limits.firecrawlCreditsPerMonth,
        remaining: 0,
        resetAt: resetAt.toISOString(),
        retryAfter: Math.ceil((resetAt.getTime() - now.getTime()) / 1000),
      };
    }

    if (usage.currentMonth.aiTokens >= limits.aiTokensPerMonth) {
      const resetAt = new Date(now);
      resetAt.setMonth(resetAt.getMonth() + 1, 1);
      resetAt.setHours(0, 0, 0, 0);
      
      return {
        limit: limits.aiTokensPerMonth,
        remaining: 0,
        resetAt: resetAt.toISOString(),
        retryAfter: Math.ceil((resetAt.getTime() - now.getTime()) / 1000),
      };
    }

    // Calculate remaining requests (use most restrictive limit)
    const minuteRemaining = limits.requestsPerMinute - usage.currentMinute;
    const hourRemaining = limits.requestsPerHour - usage.currentHour;
    const dayRemaining = limits.requestsPerDay - usage.currentDay;
    
    const remaining = Math.min(minuteRemaining, hourRemaining, dayRemaining);
    
    // Calculate next reset time (use nearest reset)
    const minuteReset = new Date(now);
    minuteReset.setMinutes(minuteReset.getMinutes() + 1, 0, 0);
    
    const hourReset = new Date(now);
    hourReset.setHours(hourReset.getHours() + 1, 0, 0, 0);
    
    const dayReset = new Date(now);
    dayReset.setDate(dayReset.getDate() + 1);
    dayReset.setHours(0, 0, 0, 0);
    
    const nextReset = new Date(Math.min(
      minuteReset.getTime(),
      hourReset.getTime(),
      dayReset.getTime()
    ));

    return {
      limit: Math.min(limits.requestsPerMinute, limits.requestsPerHour, limits.requestsPerDay),
      remaining,
      resetAt: nextReset.toISOString(),
    };
  }

  async updateUsage(auth: AuthContext, endpoint: string): Promise<void> {
    try {
      // Record usage in database
      await this.supabase
        .from("api_usage_records")
        .insert({
          api_key_id: auth.apiKey!.id,
          endpoint,
          method: "GET", // This should come from the actual request
          status_code: 200, // This should come from the actual response
          response_time: 0, // This should be calculated
          request_size: 0, // This should be calculated
          response_size: 0, // This should be calculated
          timestamp: new Date().toISOString(),
        });

      // Update Redis counters if available
      if (this.redisClient) {
        await this.updateRedisCounters(auth.apiKey!.id);
      }
    } catch (error) {
      console.error("Error updating usage:", error);
      // Don't throw - this shouldn't break the request
    }
  }

  private async updateRedisCounters(apiKeyId: string): Promise<void> {
    if (!this.redisClient) return;

    const now = new Date();
    const minuteKey = `rate_limit:${apiKeyId}:minute:${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`;
    const hourKey = `rate_limit:${apiKeyId}:hour:${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}`;
    const dayKey = `rate_limit:${apiKeyId}:day:${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

    try {
      const pipeline = this.redisClient.pipeline();
      
      // Increment counters
      pipeline.incr(minuteKey);
      pipeline.expire(minuteKey, 60); // Expire after 1 minute
      
      pipeline.incr(hourKey);
      pipeline.expire(hourKey, 3600); // Expire after 1 hour
      
      pipeline.incr(dayKey);
      pipeline.expire(dayKey, 86400); // Expire after 1 day
      
      await pipeline.exec();
    } catch (error) {
      console.error("Error updating Redis counters:", error);
    }
  }

  async checkResourceUsage(
    auth: AuthContext, 
    resourceType: "firecrawl" | "ai", 
    estimatedUsage: number
  ): Promise<{ allowed: boolean; reason?: string }> {
    const limits = auth.rateLimits;
    const usage = auth.usage.currentMonth;

    switch (resourceType) {
      case "firecrawl":
        if (usage.firecrawlCredits + estimatedUsage > limits.firecrawlCreditsPerMonth) {
          return {
            allowed: false,
            reason: `Firecrawl credit limit exceeded. Used: ${usage.firecrawlCredits}, Limit: ${limits.firecrawlCreditsPerMonth}, Requested: ${estimatedUsage}`,
          };
        }
        break;
        
      case "ai":
        if (usage.aiTokens + estimatedUsage > limits.aiTokensPerMonth) {
          return {
            allowed: false,
            reason: `AI token limit exceeded. Used: ${usage.aiTokens}, Limit: ${limits.aiTokensPerMonth}, Requested: ${estimatedUsage}`,
          };
        }
        break;
    }

    return { allowed: true };
  }

  async recordResourceUsage(
    auth: AuthContext,
    resourceType: "firecrawl" | "ai",
    actualUsage: number,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      };

      if (resourceType === "firecrawl") {
        updateData.firecrawl_credits_used = actualUsage;
      } else if (resourceType === "ai") {
        updateData.ai_tokens_used = actualUsage;
      }

      if (metadata) {
        updateData.metadata = metadata;
      }

      // Update the most recent usage record
      await this.supabase
        .from("api_usage_records")
        .update(updateData)
        .eq("api_key_id", auth.apiKey!.id)
        .order("timestamp", { ascending: false })
        .limit(1);

    } catch (error) {
      console.error("Error recording resource usage:", error);
    }
  }

  private createRateLimitResponse(
    rateLimitStatus: RateLimitStatus, 
    context: RequestContext
  ): ApiResponse {
    return {
      success: false,
      error: "Rate limit exceeded",
      metadata: {
        timestamp: context.timestamp.toISOString(),
        requestId: context.requestId,
        version: "1.0.0",
        processingTime: Date.now() - context.timestamp.getTime(),
        rateLimitStatus,
      },
      data: {
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Rate limit exceeded",
          details: `Limit: ${rateLimitStatus.limit}, Remaining: ${rateLimitStatus.remaining}, Reset at: ${rateLimitStatus.resetAt}`,
          timestamp: context.timestamp.toISOString(),
          requestId: context.requestId,
        },
      },
    };
  }

  private createErrorResponse(
    code: string, 
    message: string, 
    context: RequestContext
  ): ApiResponse {
    return {
      success: false,
      error: message,
      metadata: {
        timestamp: context.timestamp.toISOString(),
        requestId: context.requestId,
        version: "1.0.0",
        processingTime: Date.now() - context.timestamp.getTime(),
      },
      data: {
        error: {
          code,
          message,
          timestamp: context.timestamp.toISOString(),
          requestId: context.requestId,
        },
      },
    };
  }
}

export function createRateLimitingMiddleware(
  supabase: SupabaseClient,
  redisClient?: any
): RateLimitingMiddleware {
  return new RateLimitingMiddlewareImpl(supabase, redisClient);
}