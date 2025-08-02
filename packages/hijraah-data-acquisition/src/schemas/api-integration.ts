/**
 * API Integration Schemas
 * 
 * Zod schemas for API integration, data syndication, and webhook systems
 * with Firecrawl, Supabase, and AI SDK integration.
 */

import { z } from "zod";

// Base API Response Schema
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  metadata: z.object({
    timestamp: z.string(),
    requestId: z.string(),
    version: z.string(),
    processingTime: z.number(),
  }),
});

// Authentication Schemas
export const apiKeySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  keyHash: z.string(),
  name: z.string(),
  permissions: z.array(z.enum([
    "read:data",
    "write:data", 
    "read:policies",
    "read:community",
    "write:community",
    "read:analytics",
    "webhook:receive"
  ])),
  rateLimit: z.object({
    requestsPerMinute: z.number(),
    requestsPerHour: z.number(),
    requestsPerDay: z.number(),
  }),
  subscriptionTier: z.enum(["free", "basic", "premium", "enterprise"]),
  isActive: z.boolean(),
  expiresAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  lastUsedAt: z.string().datetime().optional(),
});

// Usage Tracking Schemas
export const usageRecordSchema = z.object({
  id: z.string().uuid(),
  apiKeyId: z.string().uuid(),
  endpoint: z.string(),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  statusCode: z.number(),
  responseTime: z.number(),
  requestSize: z.number(),
  responseSize: z.number(),
  firecrawlCreditsUsed: z.number().optional(),
  aiTokensUsed: z.number().optional(),
  timestamp: z.string().datetime(),
  metadata: z.record(z.any()).optional(),
});

export const usageStatsSchema = z.object({
  period: z.enum(["hour", "day", "week", "month"]),
  totalRequests: z.number(),
  successfulRequests: z.number(),
  failedRequests: z.number(),
  averageResponseTime: z.number(),
  totalFirecrawlCredits: z.number(),
  totalAiTokens: z.number(),
  topEndpoints: z.array(z.object({
    endpoint: z.string(),
    count: z.number(),
  })),
  errorBreakdown: z.record(z.number()),
});

// Data Extraction API Schemas
export const dataExtractionRequestSchema = z.object({
  sources: z.array(z.object({
    url: z.string().url(),
    type: z.enum(["government", "news", "forum", "official"]),
    extractionRules: z.object({
      selectors: z.record(z.string()).optional(),
      patterns: z.array(z.string()).optional(),
      excludeElements: z.array(z.string()).optional(),
    }).optional(),
  })),
  options: z.object({
    useFirecrawl: z.boolean().default(true),
    aiEnhancement: z.boolean().default(true),
    structuredOutput: z.boolean().default(true),
    includeMetadata: z.boolean().default(true),
    timeout: z.number().default(30000),
  }).optional(),
});

export const dataExtractionResponseSchema = z.object({
  jobId: z.string().uuid(),
  status: z.enum(["pending", "processing", "completed", "failed"]),
  results: z.array(z.object({
    sourceUrl: z.string().url(),
    extractedData: z.record(z.any()),
    confidence: z.number(),
    metadata: z.object({
      extractionMethod: z.string(),
      processingTime: z.number(),
      firecrawlCredits: z.number().optional(),
      aiTokens: z.number().optional(),
    }),
  })).optional(),
  error: z.string().optional(),
  createdAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
});

// Policy Search API Schemas
export const policySearchRequestSchema = z.object({
  query: z.string(),
  filters: z.object({
    countries: z.array(z.string()).optional(),
    policyTypes: z.array(z.string()).optional(),
    impactLevels: z.array(z.enum(["critical", "high", "medium", "low"])).optional(),
    dateRange: z.object({
      from: z.string().datetime(),
      to: z.string().datetime(),
    }).optional(),
  }).optional(),
  options: z.object({
    limit: z.number().default(20),
    offset: z.number().default(0),
    includeAnalysis: z.boolean().default(false),
    sortBy: z.enum(["relevance", "date", "impact"]).default("relevance"),
  }).optional(),
});

export const policySearchResponseSchema = z.object({
  results: z.array(z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    country: z.string(),
    policyType: z.string(),
    impactLevel: z.string(),
    effectiveDate: z.string().datetime().optional(),
    sourceUrl: z.string().url(),
    confidence: z.number(),
    relevanceScore: z.number(),
    analysis: z.object({
      summary: z.string(),
      keyChanges: z.array(z.string()),
      affectedCategories: z.array(z.string()),
      recommendations: z.array(z.string()),
    }).optional(),
  })),
  pagination: z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    hasMore: z.boolean(),
  }),
});

// Community Data API Schemas
export const communityDataSubmissionSchema = z.object({
  pathway: z.string(),
  targetCountry: z.string(),
  milestone: z.string(),
  actualTimeline: z.number(),
  actualCost: z.number(),
  difficulty: z.number().min(1).max(10),
  success: z.boolean(),
  feedback: z.string(),
  metadata: z.record(z.any()).optional(),
});

export const communityDataResponseSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["submitted", "validating", "validated", "rejected"]),
  qualityScore: z.number().optional(),
  validationFeedback: z.string().optional(),
  submittedAt: z.string().datetime(),
});

// Webhook Schemas
export const webhookConfigSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  url: z.string().url(),
  events: z.array(z.enum([
    "policy.changed",
    "data.extracted",
    "community.validated",
    "alert.created",
    "job.completed",
    "job.failed"
  ])),
  filters: z.object({
    countries: z.array(z.string()).optional(),
    policyTypes: z.array(z.string()).optional(),
    severity: z.array(z.string()).optional(),
  }).optional(),
  headers: z.record(z.string()).optional(),
  secret: z.string().optional(),
  isActive: z.boolean(),
  retryConfig: z.object({
    maxRetries: z.number().default(3),
    backoffMultiplier: z.number().default(2),
    initialDelay: z.number().default(1000),
  }).optional(),
  createdAt: z.string().datetime(),
});

export const webhookEventSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  data: z.record(z.any()),
  timestamp: z.string().datetime(),
  source: z.string(),
  metadata: z.record(z.any()).optional(),
});

export const webhookDeliverySchema = z.object({
  id: z.string().uuid(),
  webhookId: z.string().uuid(),
  eventId: z.string().uuid(),
  status: z.enum(["pending", "delivered", "failed", "retrying"]),
  attempts: z.number(),
  lastAttemptAt: z.string().datetime().optional(),
  nextRetryAt: z.string().datetime().optional(),
  responseStatus: z.number().optional(),
  responseBody: z.string().optional(),
  error: z.string().optional(),
  createdAt: z.string().datetime(),
});

// Subscription Management Schemas
export const subscriptionTierSchema = z.object({
  tier: z.enum(["free", "basic", "premium", "enterprise"]),
  limits: z.object({
    requestsPerMinute: z.number(),
    requestsPerHour: z.number(),
    requestsPerDay: z.number(),
    firecrawlCreditsPerMonth: z.number(),
    aiTokensPerMonth: z.number(),
    webhooksCount: z.number(),
    dataRetentionDays: z.number(),
  }),
  features: z.array(z.string()),
  price: z.object({
    monthly: z.number(),
    yearly: z.number(),
  }),
});

// Analytics Schemas
export const analyticsRequestSchema = z.object({
  metrics: z.array(z.enum([
    "requests",
    "errors", 
    "response_time",
    "firecrawl_usage",
    "ai_usage",
    "data_quality",
    "policy_changes"
  ])),
  timeRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  granularity: z.enum(["hour", "day", "week", "month"]).default("day"),
  filters: z.record(z.any()).optional(),
});

export const analyticsResponseSchema = z.object({
  metrics: z.record(z.array(z.object({
    timestamp: z.string().datetime(),
    value: z.number(),
    metadata: z.record(z.any()).optional(),
  }))),
  summary: z.record(z.object({
    total: z.number(),
    average: z.number(),
    min: z.number(),
    max: z.number(),
    trend: z.enum(["up", "down", "stable"]),
  })),
});

// Error Schemas
export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.any()).optional(),
  timestamp: z.string().datetime(),
  requestId: z.string(),
});

// Rate Limiting Schemas
export const rateLimitStatusSchema = z.object({
  limit: z.number(),
  remaining: z.number(),
  resetAt: z.string().datetime(),
  retryAfter: z.number().optional(),
});

// Export all schemas
export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type ApiKey = z.infer<typeof apiKeySchema>;
export type UsageRecord = z.infer<typeof usageRecordSchema>;
export type UsageStats = z.infer<typeof usageStatsSchema>;
export type DataExtractionRequest = z.infer<typeof dataExtractionRequestSchema>;
export type DataExtractionResponse = z.infer<typeof dataExtractionResponseSchema>;
export type PolicySearchRequest = z.infer<typeof policySearchRequestSchema>;
export type PolicySearchResponse = z.infer<typeof policySearchResponseSchema>;
export type CommunityDataSubmission = z.infer<typeof communityDataSubmissionSchema>;
export type CommunityDataResponse = z.infer<typeof communityDataResponseSchema>;
export type WebhookConfig = z.infer<typeof webhookConfigSchema>;
export type WebhookEvent = z.infer<typeof webhookEventSchema>;
export type WebhookDelivery = z.infer<typeof webhookDeliverySchema>;
export type SubscriptionTier = z.infer<typeof subscriptionTierSchema>;
export type AnalyticsRequest = z.infer<typeof analyticsRequestSchema>;
export type AnalyticsResponse = z.infer<typeof analyticsResponseSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
export type RateLimitStatus = z.infer<typeof rateLimitStatusSchema>;