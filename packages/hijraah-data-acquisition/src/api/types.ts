/**
 * API Integration Types
 * 
 * TypeScript types for API integration, authentication, and data syndication
 * with Firecrawl, Supabase Edge Functions, and AI SDK integration.
 */

import type { 
  ApiResponse,
  ApiKey,
  UsageRecord,
  UsageStats,
  DataExtractionRequest,
  DataExtractionResponse,
  PolicySearchRequest,
  PolicySearchResponse,
  CommunityDataSubmission,
  CommunityDataResponse,
  WebhookConfig,
  WebhookEvent,
  WebhookDelivery,
  SubscriptionTier,
  AnalyticsRequest,
  AnalyticsResponse,
  ApiError,
  RateLimitStatus
} from "../schemas/api-integration.js";

// API Configuration
export interface ApiConfig {
  baseUrl: string;
  version: string;
  timeout: number;
  retryAttempts: number;
  rateLimiting: {
    enabled: boolean;
    windowMs: number;
    maxRequests: number;
  };
  authentication: {
    required: boolean;
    methods: ("api-key" | "jwt" | "oauth")[];
  };
  cors: {
    enabled: boolean;
    origins: string[];
    methods: string[];
    headers: string[];
  };
}

// Authentication Context
export interface AuthContext {
  apiKey?: ApiKey;
  userId?: string;
  permissions: string[];
  subscriptionTier: SubscriptionTier["tier"];
  rateLimits: {
    requestsPerMinute: number;
    requestsPerHour: number;
    requestsPerDay: number;
    firecrawlCreditsPerMonth: number;
    aiTokensPerMonth: number;
  };
  usage: {
    currentMinute: number;
    currentHour: number;
    currentDay: number;
    currentMonth: {
      firecrawlCredits: number;
      aiTokens: number;
    };
  };
}

// Request Context
export interface RequestContext {
  requestId: string;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
  auth: AuthContext;
  metadata: Record<string, any>;
}

// API Endpoint Definitions
export interface ApiEndpoint {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  permissions: string[];
  rateLimit?: {
    requestsPerMinute?: number;
    requestsPerHour?: number;
  };
  validation: {
    query?: any;
    body?: any;
    params?: any;
  };
  handler: (context: RequestContext, params: any) => Promise<ApiResponse>;
}

// Firecrawl Integration Types
export interface FirecrawlJobConfig {
  url: string;
  options: {
    formats: ("markdown" | "html" | "rawHtml" | "screenshot" | "links")[];
    onlyMainContent?: boolean;
    includeLinks?: boolean;
    screenshot?: boolean;
    waitFor?: number;
    timeout?: number;
  };
  webhook?: {
    url: string;
    headers?: Record<string, string>;
  };
}

export interface FirecrawlJobResult {
  jobId: string;
  status: "pending" | "processing" | "completed" | "failed";
  data?: {
    markdown?: string;
    html?: string;
    rawHtml?: string;
    screenshot?: string;
    links?: string[];
    metadata: {
      title?: string;
      description?: string;
      language?: string;
      sourceURL: string;
      statusCode: number;
      error?: string;
    };
  };
  creditsUsed: number;
  error?: string;
}

// AI SDK Integration Types
export interface AiProcessingConfig {
  model: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  tools?: string[];
  structuredOutput?: boolean;
}

export interface AiProcessingResult {
  content: string;
  tokensUsed: {
    input: number;
    output: number;
    total: number;
  };
  model: string;
  confidence?: number;
  metadata: Record<string, any>;
}

// Data Syndication Types
export interface SyndicationConfig {
  partnerId: string;
  dataTypes: string[];
  filters: {
    countries?: string[];
    categories?: string[];
    minConfidence?: number;
  };
  format: "json" | "xml" | "csv";
  delivery: {
    method: "webhook" | "api" | "file";
    schedule?: string; // cron expression
    batchSize?: number;
  };
  attribution: {
    required: boolean;
    format: string;
  };
}

export interface SyndicationJob {
  id: string;
  partnerId: string;
  config: SyndicationConfig;
  status: "pending" | "processing" | "completed" | "failed";
  recordsProcessed: number;
  recordsDelivered: number;
  errors: string[];
  startedAt: Date;
  completedAt?: Date;
  nextRunAt?: Date;
}

// Webhook Management Types
export interface WebhookManager {
  register(config: WebhookConfig): Promise<string>;
  update(id: string, config: Partial<WebhookConfig>): Promise<void>;
  delete(id: string): Promise<void>;
  list(userId: string): Promise<WebhookConfig[]>;
  trigger(event: WebhookEvent, filters?: Record<string, any>): Promise<void>;
  getDeliveryStatus(webhookId: string): Promise<WebhookDelivery[]>;
  retry(deliveryId: string): Promise<void>;
}

// Usage Tracking Types
export interface UsageTracker {
  record(record: Omit<UsageRecord, "id">): Promise<void>;
  getStats(apiKeyId: string, period: UsageStats["period"]): Promise<UsageStats>;
  checkLimits(apiKeyId: string): Promise<{
    withinLimits: boolean;
    limits: AuthContext["rateLimits"];
    usage: AuthContext["usage"];
    resetTimes: {
      minute: Date;
      hour: Date;
      day: Date;
      month: Date;
    };
  }>;
  incrementUsage(apiKeyId: string, type: "request" | "firecrawl" | "ai", amount: number): Promise<void>;
}

// Analytics Types
export interface AnalyticsEngine {
  query(request: AnalyticsRequest): Promise<AnalyticsResponse>;
  generateReport(userId: string, timeRange: { from: Date; to: Date }): Promise<{
    summary: Record<string, number>;
    charts: Array<{
      type: string;
      title: string;
      data: Array<{ x: string; y: number }>;
    }>;
    insights: string[];
  }>;
  getTopEndpoints(userId: string, limit: number): Promise<Array<{
    endpoint: string;
    requests: number;
    averageResponseTime: number;
    errorRate: number;
  }>>;
}

// Error Handling Types
export interface ApiErrorHandler {
  handle(error: Error, context: RequestContext): ApiError;
  isRetryable(error: ApiError): boolean;
  getSeverity(error: ApiError): "low" | "medium" | "high" | "critical";
  notify(error: ApiError, context: RequestContext): Promise<void>;
}

// Middleware Types
export interface ApiMiddleware {
  name: string;
  priority: number;
  execute(context: RequestContext, next: () => Promise<ApiResponse>): Promise<ApiResponse>;
}

export interface AuthenticationMiddleware extends ApiMiddleware {
  authenticate(request: any): Promise<AuthContext>;
  validatePermissions(auth: AuthContext, requiredPermissions: string[]): boolean;
}

export interface RateLimitingMiddleware extends ApiMiddleware {
  checkLimits(auth: AuthContext): Promise<RateLimitStatus>;
  updateUsage(auth: AuthContext, endpoint: string): Promise<void>;
}

export interface ValidationMiddleware extends ApiMiddleware {
  validateRequest(request: any, schema: any): Promise<any>;
  validateResponse(response: any, schema: any): Promise<any>;
}

// API Server Types
export interface ApiServer {
  config: ApiConfig;
  endpoints: Map<string, ApiEndpoint>;
  middleware: ApiMiddleware[];
  
  start(): Promise<void>;
  stop(): Promise<void>;
  registerEndpoint(endpoint: ApiEndpoint): void;
  registerMiddleware(middleware: ApiMiddleware): void;
  handleRequest(request: any): Promise<ApiResponse>;
}

// Database Integration Types
export interface ApiDatabase {
  // API Keys
  createApiKey(userId: string, config: Partial<ApiKey>): Promise<ApiKey>;
  getApiKey(keyHash: string): Promise<ApiKey | null>;
  updateApiKey(id: string, updates: Partial<ApiKey>): Promise<void>;
  deleteApiKey(id: string): Promise<void>;
  listApiKeys(userId: string): Promise<ApiKey[]>;
  
  // Usage Tracking
  recordUsage(record: UsageRecord): Promise<void>;
  getUsageStats(apiKeyId: string, period: string): Promise<UsageStats>;
  
  // Webhooks
  createWebhook(config: WebhookConfig): Promise<string>;
  getWebhook(id: string): Promise<WebhookConfig | null>;
  updateWebhook(id: string, updates: Partial<WebhookConfig>): Promise<void>;
  deleteWebhook(id: string): Promise<void>;
  listWebhooks(userId: string): Promise<WebhookConfig[]>;
  
  // Webhook Deliveries
  createDelivery(delivery: Omit<WebhookDelivery, "id">): Promise<string>;
  updateDelivery(id: string, updates: Partial<WebhookDelivery>): Promise<void>;
  getDeliveries(webhookId: string): Promise<WebhookDelivery[]>;
  
  // Analytics
  getAnalytics(request: AnalyticsRequest): Promise<any[]>;
}

// Export all types
export type {
  ApiResponse,
  ApiKey,
  UsageRecord,
  UsageStats,
  DataExtractionRequest,
  DataExtractionResponse,
  PolicySearchRequest,
  PolicySearchResponse,
  CommunityDataSubmission,
  CommunityDataResponse,
  WebhookConfig,
  WebhookEvent,
  WebhookDelivery,
  SubscriptionTier,
  AnalyticsRequest,
  AnalyticsResponse,
  ApiError,
  RateLimitStatus,
};