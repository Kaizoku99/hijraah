/**
 * Rate Limit Service
 *
 * Unified service layer for rate limiting with enhanced functionality
 * Based on Context7 best practices and Upstash Redis patterns
 */

import { type Ratelimit } from "@upstash/ratelimit";
import {
  limiters,
  type RateLimitAction,
  type UserTier,
  rateLimitConfigs,
} from "@/_infrastructure/rate-limit/config";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: Date;
  pending?: Promise<void>;
  reason?: string;
}

export class RateLimitService {
  /**
   * Check if a request is allowed based on the identifier, action, and tier
   * Enhanced with Context7 best practices
   */
  static async isAllowed(
    identifier: string,
    action: RateLimitAction,
    tier: UserTier = "standard",
  ): Promise<RateLimitResult> {
    try {
      const limiter = limiters[action]?.[tier];

      if (!limiter) {
        throw new Error(
          `No rate limiter found for action: ${action}, tier: ${tier}`,
        );
      }

      const result = await limiter.limit(identifier);

      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: new Date(Date.now() + result.reset),
        pending: result.pending as Promise<void>,
        reason: result.reason,
      };
    } catch (error) {
      console.error(
        `Rate limit check failed for ${action}:${tier}:${identifier}`,
        error,
      );

      // Fail open - allow request if rate limiting system fails
      const config = rateLimitConfigs[action]?.[tier];
      return {
        success: true,
        limit: config?.requests ?? 0,
        remaining: config?.requests ?? 0,
        reset: new Date(Date.now() + 60000), // 1 minute fallback
        reason: "rate_limit_error",
      };
    }
  }

  /**
   * Get the remaining limit for a specific identifier, action, and tier
   */
  static async getRemainingLimit(
    identifier: string,
    action: RateLimitAction,
    tier: UserTier = "standard",
  ): Promise<number> {
    const response = await this.isAllowed(identifier, action, tier);
    return response.remaining;
  }

  /**
   * Get the reset time for a specific identifier, action, and tier
   */
  static async getResetTime(
    identifier: string,
    action: RateLimitAction,
    tier: UserTier = "standard",
  ): Promise<Date> {
    const response = await this.isAllowed(identifier, action, tier);
    return response.reset;
  }

  /**
   * Check multiple rate limits at once
   * Useful for complex operations that consume multiple quotas
   */
  static async checkMultiple(
    identifier: string,
    checks: Array<{ action: RateLimitAction; tier: UserTier }>,
  ): Promise<Record<string, RateLimitResult>> {
    const results = await Promise.all(
      checks.map(async ({ action, tier }) => {
        const result = await this.isAllowed(identifier, action, tier);
        return [`${action}:${tier}`, result] as const;
      }),
    );

    return Object.fromEntries(results);
  }

  /**
   * Get rate limit headers for HTTP responses
   * Following Context7 recommended header format
   */
  static getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
    return {
      "X-RateLimit-Limit": String(result.limit),
      "X-RateLimit-Remaining": String(result.remaining),
      "X-RateLimit-Reset": String(Math.floor(result.reset.getTime() / 1000)),
      "X-RateLimit-Success": String(result.success),
    };
  }
}
