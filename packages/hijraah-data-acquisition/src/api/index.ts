/**
 * API Integration Main Module
 * 
 * Main entry point for the RESTful API system with Firecrawl integration,
 * Supabase Edge Functions, AI SDK processing, and comprehensive middleware.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { 
  ApiServer, 
  ApiConfig, 
  ApiEndpoint,
  RequestContext,
  ApiResponse
} from "./types.js";

// Middleware
import { 
  createAuthenticationMiddleware, 
  DEFAULT_SUBSCRIPTION_TIERS 
} from "./middleware/authentication.js";
import { createRateLimitingMiddleware } from "./middleware/rate-limiting.js";
import { createValidationMiddleware, commonSchemas } from "./middleware/validation.js";

// Services
import { FirecrawlService } from "./services/firecrawl-service.js";
import { WebhookService } from "./services/webhook-service.js";

// Endpoints
import { createDataExtractionEndpoints } from "./endpoints/data-extraction.js";
import { createPolicySearchEndpoints } from "./endpoints/policy-search.js";
import { createWebhookEndpoints } from "./endpoints/webhooks.js";

// MAS-Enhanced Endpoints
import { createMasEnhancedDataExtractionEndpoints } from "./endpoints/mas-enhanced-data-extraction.js";
import { createMasEnhancedPolicySearchEndpoints } from "./endpoints/mas-enhanced-policy-search.js";
import { createMASEnhancedWebhookEndpoints } from "./endpoints/mas-enhanced-webhooks.js";
import { createEnhancedMasEndpoints } from "./endpoints/mas-enhanced-endpoints.js";

// Schemas
import { 
  dataExtractionRequestSchema,
  policySearchRequestSchema,
  webhookConfigSchema,
  apiResponseSchema
} from "../schemas/api-integration.js";

export class HijraahApiServer implements ApiServer {
  public config: ApiConfig;
  public endpoints: Map<string, ApiEndpoint> = new Map();
  public middleware: any[] = [];

  private firecrawlService: FirecrawlService;
  private webhookService: WebhookService;

  constructor(
    private supabase: SupabaseClient,
    config: Partial<ApiConfig> = {},
    private firecrawlApiKey: string,
    private redisClient?: any
  ) {
    this.config = {
      baseUrl: config.baseUrl || "https://api.hijraah.com",
      version: config.version || "1.0.0",
      timeout: config.timeout || 30000,
      retryAttempts: config.retryAttempts || 3,
      rateLimiting: {
        enabled: true,
        windowMs: 60000, // 1 minute
        maxRequests: 100,
        ...config.rateLimiting,
      },
      authentication: {
        required: true,
        methods: ["api-key"],
        ...config.authentication,
      },
      cors: {
        enabled: true,
        origins: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        headers: ["Content-Type", "Authorization", "X-API-Key"],
        ...config.cors,
      },
    };

    // Initialize services
    this.firecrawlService = new FirecrawlService(this.supabase, this.firecrawlApiKey);
    this.webhookService = new WebhookService(this.supabase);

    this.setupMiddleware();
    this.setupEndpoints();
  }

  async start(): Promise<void> {
    console.log(`🚀 Hijraah API Server starting on ${this.config.baseUrl}`);
    console.log(`📊 Registered ${this.endpoints.size} endpoints`);
    console.log(`🔧 Loaded ${this.middleware.length} middleware`);
    
    // In a real implementation, this would start an HTTP server
    // For now, we'll just log that the server is ready
    console.log("✅ API Server ready to handle requests");
  }

  async stop(): Promise<void> {
    console.log("🛑 Hijraah API Server stopping...");
    // Cleanup logic would go here
    console.log("✅ API Server stopped");
  }

  registerEndpoint(endpoint: ApiEndpoint): void {
    const key = `${endpoint.method}:${endpoint.path}`;
    this.endpoints.set(key, endpoint);
  }

  registerMiddleware(middleware: any): void {
    this.middleware.push(middleware);
    // Sort by priority (higher priority runs first)
    this.middleware.sort((a, b) => b.priority - a.priority);
  }

  async handleRequest(request: any): Promise<ApiResponse> {
    const startTime = Date.now();
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create request context
    const context: RequestContext = {
      requestId,
      timestamp: new Date(),
      userAgent: request.headers?.["user-agent"],
      ipAddress: request.ip || request.connection?.remoteAddress,
      auth: {} as any, // Will be populated by auth middleware
      metadata: {
        method: request.method,
        path: request.path,
        query: request.query,
        body: request.body,
        headers: request.headers,
        endpoint: `${request.method}:${request.path}`,
      },
    };

    try {
      // Find matching endpoint
      const endpointKey = `${request.method}:${request.path}`;
      const endpoint = this.endpoints.get(endpointKey);

      if (!endpoint) {
        return this.createErrorResponse(
          "ENDPOINT_NOT_FOUND",
          `Endpoint ${request.method} ${request.path} not found`,
          context
        );
      }

      // Execute middleware chain
      let response: ApiResponse;
      let middlewareIndex = 0;

      const executeNext = async (): Promise<ApiResponse> => {
        if (middlewareIndex < this.middleware.length) {
          const middleware = this.middleware[middlewareIndex++];
          return await middleware.execute(context, executeNext);
        } else {
          // All middleware executed, run the endpoint handler
          return await endpoint.handler(context, {
            query: request.query,
            body: request.body,
            params: request.params,
          });
        }
      };

      response = await executeNext();

      // Add processing time to response
      response.metadata.processingTime = Date.now() - startTime;

      return response;
    } catch (error) {
      console.error("Request handling error:", error);
      return this.createErrorResponse(
        "INTERNAL_ERROR",
        "Internal server error",
        context,
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  private setupMiddleware(): void {
    // Authentication middleware
    const authMiddleware = createAuthenticationMiddleware(
      this.supabase,
      DEFAULT_SUBSCRIPTION_TIERS
    );
    this.registerMiddleware(authMiddleware);

    // Rate limiting middleware
    const rateLimitMiddleware = createRateLimitingMiddleware(
      this.supabase,
      this.redisClient
    );
    this.registerMiddleware(rateLimitMiddleware);

    // Validation middleware
    const validationSchemas = new Map([
      // Standard data extraction endpoints
      ["POST:/api/v1/extract/url", {
        body: dataExtractionRequestSchema,
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/extract/batch", {
        body: dataExtractionRequestSchema,
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/extract/crawl", {
        body: dataExtractionRequestSchema,
        response: apiResponseSchema,
      }],
      ["GET:/api/v1/extract/status/:jobId", {
        params: commonSchemas.uuid,
        response: apiResponseSchema,
      }],

      // Standard policy search endpoints
      ["POST:/api/v1/policies/search", {
        body: policySearchRequestSchema,
        response: apiResponseSchema,
      }],
      ["GET:/api/v1/policies/:id", {
        params: commonSchemas.uuid,
        response: apiResponseSchema,
      }],

      // Standard webhook endpoints
      ["POST:/api/v1/webhooks", {
        body: webhookConfigSchema,
        response: apiResponseSchema,
      }],
      ["PUT:/api/v1/webhooks/:id", {
        params: commonSchemas.uuid,
        body: webhookConfigSchema.partial(),
        response: apiResponseSchema,
      }],

      // MAS-Enhanced endpoints (validation handled within endpoint handlers)
      ["POST:/api/v1/extract/mas/url", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/mas/predictive-analysis", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/mas/policy-analysis", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/mas/community-validation", {
        response: apiResponseSchema,
      }],
      ["GET:/api/v1/mas/performance", {
        response: apiResponseSchema,
      }],
      
      // Enhanced MAS endpoints with comprehensive agent integration
      ["POST:/api/v1/mas/document-processing", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/mas/predictive-analytics", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/mas/policy-analysis", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/mas/community-validation", {
        response: apiResponseSchema,
      }],
      ["GET:/api/v1/mas/agent-performance", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/policies/mas/search", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/policies/mas/impact-analysis", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/policies/mas/trend-analysis", {
        response: apiResponseSchema,
      }],
      ["GET:/api/v1/policies/mas/monitoring-status", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/webhooks/mas", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/webhooks/mas/trigger", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/webhooks/mas/test", {
        response: apiResponseSchema,
      }],
      ["POST:/api/v1/webhooks/mas/analytics", {
        response: apiResponseSchema,
      }],
    ]);

    const validationMiddleware = createValidationMiddleware(validationSchemas);
    this.registerMiddleware(validationMiddleware);
  }

  private setupEndpoints(): void {
    // Standard endpoints
    const dataExtractionEndpoints = createDataExtractionEndpoints(this.firecrawlService);
    dataExtractionEndpoints.forEach(endpoint => this.registerEndpoint(endpoint));

    const policySearchEndpoints = createPolicySearchEndpoints(this.supabase);
    policySearchEndpoints.forEach(endpoint => this.registerEndpoint(endpoint));

    const webhookEndpoints = createWebhookEndpoints(this.webhookService);
    webhookEndpoints.forEach(endpoint => this.registerEndpoint(endpoint));

    // MAS-Enhanced endpoints
    const masDataExtractionEndpoints = createMasEnhancedDataExtractionEndpoints(this.firecrawlService);
    masDataExtractionEndpoints.forEach(endpoint => this.registerEndpoint(endpoint));

    const masPolicySearchEndpoints = createMasEnhancedPolicySearchEndpoints(this.supabase);
    masPolicySearchEndpoints.forEach(endpoint => this.registerEndpoint(endpoint));

    const masWebhookEndpoints = createMASEnhancedWebhookEndpoints(this.webhookService);
    masWebhookEndpoints.forEach(endpoint => this.registerEndpoint(endpoint));

    // Enhanced MAS endpoints with full agent integration
    const enhancedMasEndpoints = createEnhancedMasEndpoints(this.firecrawlService);
    enhancedMasEndpoints.forEach(endpoint => this.registerEndpoint(endpoint));

    // Health check endpoint
    this.registerEndpoint({
      path: "/api/v1/health",
      method: "GET",
      permissions: [],
      validation: {},
      handler: async (context: RequestContext): Promise<ApiResponse> => {
        return {
          success: true,
          data: {
            status: "healthy",
            version: this.config.version,
            timestamp: context.timestamp.toISOString(),
            uptime: process.uptime(),
            endpoints: this.endpoints.size,
            middleware: this.middleware.length,
          },
          metadata: {
            timestamp: context.timestamp.toISOString(),
            requestId: context.requestId,
            version: this.config.version,
            processingTime: Date.now() - context.timestamp.getTime(),
          },
        };
      },
    });

    // API info endpoint
    this.registerEndpoint({
      path: "/api/v1/info",
      method: "GET",
      permissions: [],
      validation: {},
      handler: async (context: RequestContext): Promise<ApiResponse> => {
        return {
          success: true,
          data: {
            name: "Hijraah Data Acquisition API",
            version: this.config.version,
            description: "RESTful API for immigration data extraction, policy search, and webhook management",
            features: [
              "Firecrawl web scraping integration",
              "AI-enhanced data processing",
              "Policy search and analysis",
              "Webhook management and delivery",
              "Usage tracking and analytics",
              "Subscription-based rate limiting",
            ],
            endpoints: Array.from(this.endpoints.keys()),
            documentation: `${this.config.baseUrl}/docs`,
          },
          metadata: {
            timestamp: context.timestamp.toISOString(),
            requestId: context.requestId,
            version: this.config.version,
            processingTime: Date.now() - context.timestamp.getTime(),
          },
        };
      },
    });
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
        version: this.config.version,
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

// Factory function to create API server
export function createApiServer(
  supabase: SupabaseClient,
  firecrawlApiKey: string,
  config?: Partial<ApiConfig>,
  redisClient?: any
): HijraahApiServer {
  return new HijraahApiServer(supabase, config, firecrawlApiKey, redisClient);
}

// Export types and utilities
export type { 
  ApiServer, 
  ApiConfig, 
  ApiEndpoint, 
  RequestContext, 
  ApiResponse 
} from "./types.js";

export { 
  FirecrawlService,
  WebhookService,
} from "./services/index.js";

export {
  createDataExtractionEndpoints,
  createPolicySearchEndpoints,
  createWebhookEndpoints,
  createMasEnhancedDataExtractionEndpoints,
  createMasEnhancedPolicySearchEndpoints,
  createMASEnhancedWebhookEndpoints,
  createEnhancedMasEndpoints,
} from "./endpoints/index.js";

export {
  createAuthenticationMiddleware,
  createRateLimitingMiddleware,
  createValidationMiddleware,
  DEFAULT_SUBSCRIPTION_TIERS,
} from "./middleware/index.js";