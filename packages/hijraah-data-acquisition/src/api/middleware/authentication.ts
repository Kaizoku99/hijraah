/**
 * Authentication Middleware
 * 
 * Handles API key authentication, permission validation, and Supabase Auth integration
 * with subscription tier management and usage validation.
 */

import { createHash } from "crypto";
import type { 
  AuthenticationMiddleware, 
  AuthContext, 
  RequestContext, 
  ApiResponse,
  ApiKey,
  SubscriptionTier
} from "../types.js";
import { apiErrorSchema } from "../../schemas/api-integration.js";
import type { SupabaseClient } from "@supabase/supabase-js";

export class AuthenticationMiddlewareImpl implements AuthenticationMiddleware {
  name = "authentication";
  priority = 100; // High priority - runs early

  constructor(
    private supabase: SupabaseClient,
    private subscriptionTiers: Map<string, SubscriptionTier>
  ) {}

  async execute(
    context: RequestContext, 
    next: () => Promise<ApiResponse>
  ): Promise<ApiResponse> {
    try {
      // Extract API key from request
      const apiKeyHeader = this.extractApiKey(context);
      
      if (!apiKeyHeader) {
        return this.createErrorResponse("MISSING_API_KEY", "API key is required", context);
      }

      // Authenticate and get context
      const auth = await this.authenticate(apiKeyHeader);
      
      if (!auth) {
        return this.createErrorResponse("INVALID_API_KEY", "Invalid or expired API key", context);
      }

      // Update context with authentication info
      context.auth = auth;

      // Update last used timestamp
      await this.updateLastUsed(auth.apiKey!.id);

      return await next();
    } catch (error) {
      console.error("Authentication middleware error:", error);
      return this.createErrorResponse(
        "AUTH_ERROR", 
        "Authentication failed", 
        context,
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  async authenticate(apiKeyValue: string): Promise<AuthContext | null> {
    try {
      // Hash the API key for lookup
      const keyHash = this.hashApiKey(apiKeyValue);

      // Get API key from database
      const { data: apiKeyData, error } = await this.supabase
        .from("api_keys")
        .select("*")
        .eq("key_hash", keyHash)
        .eq("is_active", true)
        .single();

      if (error || !apiKeyData) {
        return null;
      }

      // Check expiration
      if (apiKeyData.expires_at && new Date(apiKeyData.expires_at) < new Date()) {
        return null;
      }

      // Get subscription tier info
      const subscriptionTier = this.subscriptionTiers.get(apiKeyData.subscription_tier);
      if (!subscriptionTier) {
        throw new Error(`Unknown subscription tier: ${apiKeyData.subscription_tier}`);
      }

      // Get current usage
      const usage = await this.getCurrentUsage(apiKeyData.id);

      return {
        apiKey: {
          id: apiKeyData.id,
          userId: apiKeyData.user_id,
          keyHash: apiKeyData.key_hash,
          name: apiKeyData.name,
          permissions: apiKeyData.permissions,
          rateLimit: apiKeyData.rate_limit,
          subscriptionTier: apiKeyData.subscription_tier,
          isActive: apiKeyData.is_active,
          expiresAt: apiKeyData.expires_at,
          createdAt: apiKeyData.created_at,
          lastUsedAt: apiKeyData.last_used_at,
        },
        userId: apiKeyData.user_id,
        permissions: apiKeyData.permissions,
        subscriptionTier: apiKeyData.subscription_tier,
        rateLimits: subscriptionTier.limits,
        usage,
      };
    } catch (error) {
      console.error("Authentication error:", error);
      return null;
    }
  }

  validatePermissions(auth: AuthContext, requiredPermissions: string[]): boolean {
    if (!requiredPermissions.length) {
      return true;
    }

    return requiredPermissions.every(permission => 
      auth.permissions.includes(permission)
    );
  }

  private extractApiKey(context: RequestContext): string | null {
    // Try Authorization header first
    const authHeader = context.metadata.headers?.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }

    // Try X-API-Key header
    const apiKeyHeader = context.metadata.headers?.["x-api-key"];
    if (apiKeyHeader) {
      return apiKeyHeader;
    }

    // Try query parameter
    const queryApiKey = context.metadata.query?.api_key;
    if (queryApiKey) {
      return queryApiKey;
    }

    return null;
  }

  private hashApiKey(apiKey: string): string {
    return createHash("sha256").update(apiKey).digest("hex");
  }

  private async getCurrentUsage(apiKeyId: string): Promise<AuthContext["usage"]> {
    const now = new Date();
    const currentMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
    const currentHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
    const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentMonth = new Date(now.getFullYear(), now.getMonth());

    try {
      // Get usage counts for different time periods
      const [minuteUsage, hourUsage, dayUsage, monthUsage] = await Promise.all([
        this.getUsageCount(apiKeyId, currentMinute, "minute"),
        this.getUsageCount(apiKeyId, currentHour, "hour"),
        this.getUsageCount(apiKeyId, currentDay, "day"),
        this.getMonthlyUsage(apiKeyId, currentMonth),
      ]);

      return {
        currentMinute: minuteUsage,
        currentHour: hourUsage,
        currentDay: dayUsage,
        currentMonth: monthUsage,
      };
    } catch (error) {
      console.error("Error getting current usage:", error);
      return {
        currentMinute: 0,
        currentHour: 0,
        currentDay: 0,
        currentMonth: {
          firecrawlCredits: 0,
          aiTokens: 0,
        },
      };
    }
  }

  private async getUsageCount(
    apiKeyId: string, 
    startTime: Date, 
    period: "minute" | "hour" | "day"
  ): Promise<number> {
    const endTime = new Date(startTime);
    
    switch (period) {
      case "minute":
        endTime.setMinutes(endTime.getMinutes() + 1);
        break;
      case "hour":
        endTime.setHours(endTime.getHours() + 1);
        break;
      case "day":
        endTime.setDate(endTime.getDate() + 1);
        break;
    }

    const { count, error } = await this.supabase
      .from("api_usage_records")
      .select("*", { count: "exact", head: true })
      .eq("api_key_id", apiKeyId)
      .gte("timestamp", startTime.toISOString())
      .lt("timestamp", endTime.toISOString());

    if (error) {
      console.error(`Error getting ${period} usage:`, error);
      return 0;
    }

    return count || 0;
  }

  private async getMonthlyUsage(
    apiKeyId: string, 
    startTime: Date
  ): Promise<{ firecrawlCredits: number; aiTokens: number }> {
    const endTime = new Date(startTime);
    endTime.setMonth(endTime.getMonth() + 1);

    const { data, error } = await this.supabase
      .from("api_usage_records")
      .select("firecrawl_credits_used, ai_tokens_used")
      .eq("api_key_id", apiKeyId)
      .gte("timestamp", startTime.toISOString())
      .lt("timestamp", endTime.toISOString());

    if (error) {
      console.error("Error getting monthly usage:", error);
      return { firecrawlCredits: 0, aiTokens: 0 };
    }

    const totals = data.reduce(
      (acc, record) => ({
        firecrawlCredits: acc.firecrawlCredits + (record.firecrawl_credits_used || 0),
        aiTokens: acc.aiTokens + (record.ai_tokens_used || 0),
      }),
      { firecrawlCredits: 0, aiTokens: 0 }
    );

    return totals;
  }

  private async updateLastUsed(apiKeyId: string): Promise<void> {
    try {
      await this.supabase
        .from("api_keys")
        .update({ last_used_at: new Date().toISOString() })
        .eq("id", apiKeyId);
    } catch (error) {
      console.error("Error updating last used timestamp:", error);
      // Don't throw - this is not critical
    }
  }

  private createErrorResponse(
    code: string, 
    message: string, 
    context: RequestContext,
    details?: string
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
          details,
          timestamp: context.timestamp.toISOString(),
          requestId: context.requestId,
        },
      },
    };
  }
}

// Subscription tier configurations
export const DEFAULT_SUBSCRIPTION_TIERS: Map<string, SubscriptionTier> = new Map([
  ["free", {
    tier: "free",
    limits: {
      requestsPerMinute: 10,
      requestsPerHour: 100,
      requestsPerDay: 1000,
      firecrawlCreditsPerMonth: 100,
      aiTokensPerMonth: 10000,
      webhooksCount: 1,
      dataRetentionDays: 7,
    },
    features: [
      "basic_api_access",
      "policy_search",
      "community_data_read",
    ],
    price: {
      monthly: 0,
      yearly: 0,
    },
  }],
  ["basic", {
    tier: "basic",
    limits: {
      requestsPerMinute: 50,
      requestsPerHour: 1000,
      requestsPerDay: 10000,
      firecrawlCreditsPerMonth: 1000,
      aiTokensPerMonth: 100000,
      webhooksCount: 5,
      dataRetentionDays: 30,
    },
    features: [
      "basic_api_access",
      "policy_search",
      "community_data_read",
      "community_data_write",
      "data_extraction",
      "webhooks",
    ],
    price: {
      monthly: 29,
      yearly: 290,
    },
  }],
  ["premium", {
    tier: "premium",
    limits: {
      requestsPerMinute: 200,
      requestsPerHour: 5000,
      requestsPerDay: 50000,
      firecrawlCreditsPerMonth: 10000,
      aiTokensPerMonth: 1000000,
      webhooksCount: 20,
      dataRetentionDays: 90,
    },
    features: [
      "basic_api_access",
      "policy_search",
      "community_data_read",
      "community_data_write",
      "data_extraction",
      "webhooks",
      "analytics",
      "priority_support",
      "custom_integrations",
    ],
    price: {
      monthly: 99,
      yearly: 990,
    },
  }],
  ["enterprise", {
    tier: "enterprise",
    limits: {
      requestsPerMinute: 1000,
      requestsPerHour: 25000,
      requestsPerDay: 250000,
      firecrawlCreditsPerMonth: 100000,
      aiTokensPerMonth: 10000000,
      webhooksCount: 100,
      dataRetentionDays: 365,
    },
    features: [
      "basic_api_access",
      "policy_search",
      "community_data_read",
      "community_data_write",
      "data_extraction",
      "webhooks",
      "analytics",
      "priority_support",
      "custom_integrations",
      "dedicated_support",
      "sla_guarantee",
      "custom_deployment",
    ],
    price: {
      monthly: 499,
      yearly: 4990,
    },
  }],
]);

export function createAuthenticationMiddleware(
  supabase: SupabaseClient,
  subscriptionTiers: Map<string, SubscriptionTier> = DEFAULT_SUBSCRIPTION_TIERS
): AuthenticationMiddleware {
  return new AuthenticationMiddlewareImpl(supabase, subscriptionTiers);
}