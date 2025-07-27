// This will be the single source of truth for API response structures, pagination, etc.

import { SupabaseClient, User, Session } from "@supabase/supabase-js";

import { Locale } from "@/i18n";
import { TranslateService } from "@/lib/i18n/translate-service";

/**
 * Declaration merging for Hono's Context
 * This adds type information for our custom context variables
 */
declare module "hono" {
  interface ContextVariableMap {
    // Supabase and auth related
    supabase: SupabaseClient;
    user: User | null;
    session: Session | null;

    // Middleware flags and tracking
    rateLimited: boolean;
    requestId: string;

    // Performance tracking
    startTime: number;

    // Request metadata
    clientIp: string;
    userAgent: string;

    /** The detected language for the current request */
    language: Locale;

    /** Cached translations for the detected language */
    translations: Record<string, any>;

    /** Translation service instance */
    translator: TranslateService;
  }
}

/**
 * API Hono type
 */
export type ApiHono = import("hono").Hono;

/**
 * Define subscription tiers and resource types
 */
export enum SubscriptionTier {
  FREE = "free",
  PRO = "pro",
  ENTERPRISE = "enterprise",
}

export enum ResourceType {
  API = "api",
  SCRAPING = "scraping",
  VECTOR = "vector",
  RESEARCH = "research",
}

export interface RateLimit {
  requests: number;
  window: string;
}

export type SubscriptionLimits = {
  [key in ResourceType]: RateLimit;
};

export type SubscriptionRateLimits = {
  [key in SubscriptionTier]: SubscriptionLimits;
};

/**
 * Validation type for request data
 */
export type ValidationType = "body" | "query" | "params";

// Unified API types

/**
 * Common response structure
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    status: number;
    code?: string;
  };
}

/**
 * Pagination types
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

/**
 * Generic API Error type
 */
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

/**
 * Configuration for subscription rate limits
 */
export const SUBSCRIPTION_RATE_LIMITS: SubscriptionRateLimits = {
  [SubscriptionTier.FREE]: {
    [ResourceType.API]: { requests: 1000, window: "1h" },
    [ResourceType.SCRAPING]: { requests: 100, window: "1h" },
    [ResourceType.VECTOR]: { requests: 100, window: "1h" },
    [ResourceType.RESEARCH]: { requests: 50, window: "1h" },
  },
  [SubscriptionTier.PRO]: {
    [ResourceType.API]: { requests: 10000, window: "1h" },
    [ResourceType.SCRAPING]: { requests: 1000, window: "1h" },
    [ResourceType.VECTOR]: { requests: 1000, window: "1h" },
    [ResourceType.RESEARCH]: { requests: 500, window: "1h" },
  },
  [SubscriptionTier.ENTERPRISE]: {
    [ResourceType.API]: { requests: 100000, window: "1h" },
    [ResourceType.SCRAPING]: { requests: 10000, window: "1h" },
    [ResourceType.VECTOR]: { requests: 10000, window: "1h" },
    [ResourceType.RESEARCH]: { requests: 5000, window: "1h" },
  },
};

// It seems the old src/types/api.ts had more specific response types
// (e.g., SignInResponse, ResearchSessionResponse).
// If that content can be recovered, those should be merged here.
// For now, this file contains the essentials from src/app/api/types.ts

// Placeholder for User type if it becomes API specific,
// otherwise it should come from @/types/auth
// export type ApiUser = { id: string, name: string, ... };

export {}; // Ensures this is treated as a module if no other exports are present initially
