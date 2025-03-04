import { SupabaseClient } from '@supabase/supabase-js';
import { User, Session } from '@supabase/supabase-js';

/**
 * Declaration merging for Hono's Context
 * This adds type information for our custom context variables
 */
declare module 'hono' {
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
  }
}

// Define subscription tiers and resource types
export enum SubscriptionTier {
  FREE = 'free',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

export enum ResourceType {
  API = 'api',
  SCRAPING = 'scraping',
  VECTOR = 'vector',
  RESEARCH = 'research'
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

// Define subscription rate limits
export const SUBSCRIPTION_RATE_LIMITS: SubscriptionRateLimits = {
  [SubscriptionTier.FREE]: {
    [ResourceType.API]: { requests: 1000, window: '1h' },
    [ResourceType.SCRAPING]: { requests: 100, window: '1h' },
    [ResourceType.VECTOR]: { requests: 100, window: '1h' },
    [ResourceType.RESEARCH]: { requests: 50, window: '1h' }
  },
  [SubscriptionTier.PRO]: {
    [ResourceType.API]: { requests: 10000, window: '1h' },
    [ResourceType.SCRAPING]: { requests: 1000, window: '1h' },
    [ResourceType.VECTOR]: { requests: 1000, window: '1h' },
    [ResourceType.RESEARCH]: { requests: 500, window: '1h' }
  },
  [SubscriptionTier.ENTERPRISE]: {
    [ResourceType.API]: { requests: 100000, window: '1h' },
    [ResourceType.SCRAPING]: { requests: 10000, window: '1h' },
    [ResourceType.VECTOR]: { requests: 10000, window: '1h' },
    [ResourceType.RESEARCH]: { requests: 5000, window: '1h' }
  }
}; 