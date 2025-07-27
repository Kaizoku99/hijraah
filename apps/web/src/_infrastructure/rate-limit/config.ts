/**
 * Centralized Rate Limiting Configuration
 *
 * Consolidates all rate limiting configurations and exports reusable limiters
 * Based on Upstash Redis best practices from Context7
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client following Context7 best practices
const redis = Redis.fromEnv();

// Type definitions - centralized to avoid duplication
export type RateLimitAction =
  | "ocr"
  | "documentQA"
  | "batchProcessing"
  | "api"
  | "caseManagement"
  | "documentUpload";
export type UserTier = "standard" | "premium" | "enterprise";

// Rate limit configurations with consistent structure
export const rateLimitConfigs = {
  // OCR API limits
  ocr: {
    standard: { requests: 50, window: "1 d", tokens: 3 },
    premium: { requests: 500, window: "1 d", tokens: 2 },
    enterprise: { requests: 5000, window: "1 d", tokens: 1 },
  },

  // Document understanding API limits
  documentQA: {
    standard: { requests: 20, window: "1 d", tokens: 5 },
    premium: { requests: 200, window: "1 d", tokens: 3 },
    enterprise: { requests: 2000, window: "1 d", tokens: 2 },
  },

  // Batch processing limits
  batchProcessing: {
    standard: { requests: 5, window: "1 d", tokens: 10 },
    premium: { requests: 50, window: "1 d", tokens: 5 },
    enterprise: { requests: 500, window: "1 d", tokens: 3 },
  },

  // General API limits
  api: {
    standard: { requests: 100, window: "1 m", tokens: 1 },
    premium: { requests: 500, window: "1 m", tokens: 1 },
    enterprise: { requests: 2000, window: "1 m", tokens: 1 },
  },

  // Case management limits
  caseManagement: {
    standard: { requests: 100, window: "1 m", tokens: 1 },
    premium: { requests: 500, window: "1 m", tokens: 1 },
    enterprise: { requests: 2000, window: "1 m", tokens: 1 },
  },

  // Document upload limits
  documentUpload: {
    standard: { requests: 30, window: "1 m", tokens: 2 },
    premium: { requests: 100, window: "1 m", tokens: 1 },
    enterprise: { requests: 500, window: "1 m", tokens: 1 },
  },
} as const;

/**
 * Create a rate limiter for a specific action and tier
 * Following Context7 best practices for sliding window implementation
 */
function createRateLimiter(action: RateLimitAction, tier: UserTier): Ratelimit {
  const config = rateLimitConfigs[action][tier];
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.requests, config.window),
    analytics: true,
    prefix: `hijraah:ratelimit:${action}:${tier}`,
    ephemeralCache: new Map(), // Context7 recommendation for edge environments
  });
}

// Pre-create all limiters to avoid runtime overhead
export const limiters: Record<RateLimitAction, Record<UserTier, Ratelimit>> = {
  ocr: {
    standard: createRateLimiter("ocr", "standard"),
    premium: createRateLimiter("ocr", "premium"),
    enterprise: createRateLimiter("ocr", "enterprise"),
  },
  documentQA: {
    standard: createRateLimiter("documentQA", "standard"),
    premium: createRateLimiter("documentQA", "premium"),
    enterprise: createRateLimiter("documentQA", "enterprise"),
  },
  batchProcessing: {
    standard: createRateLimiter("batchProcessing", "standard"),
    premium: createRateLimiter("batchProcessing", "premium"),
    enterprise: createRateLimiter("batchProcessing", "enterprise"),
  },
  api: {
    standard: createRateLimiter("api", "standard"),
    premium: createRateLimiter("api", "premium"),
    enterprise: createRateLimiter("api", "enterprise"),
  },
  caseManagement: {
    standard: createRateLimiter("caseManagement", "standard"),
    premium: createRateLimiter("caseManagement", "premium"),
    enterprise: createRateLimiter("caseManagement", "enterprise"),
  },
  documentUpload: {
    standard: createRateLimiter("documentUpload", "standard"),
    premium: createRateLimiter("documentUpload", "premium"),
    enterprise: createRateLimiter("documentUpload", "enterprise"),
  },
};

// Export rate limit helper functions
export { createRateLimiter };
