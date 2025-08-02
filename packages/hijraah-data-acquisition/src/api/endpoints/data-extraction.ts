/**
 * Data Extraction API Endpoints
 * 
 * RESTful endpoints for data extraction using Firecrawl integration
 * with AI-enhanced processing and structured output generation.
 */

import type { 
  ApiEndpoint, 
  RequestContext, 
  ApiResponse,
  DataExtractionRequest,
  DataExtractionResponse
} from "../types.js";
import { FirecrawlService } from "../services/firecrawl-service.js";
import { 
  dataExtractionRequestSchema, 
  dataExtractionResponseSchema 
} from "../../schemas/api-integration.js";
import { z } from "zod";

export function createDataExtractionEndpoints(
  firecrawlService: FirecrawlService
): ApiEndpoint[] {
  return [
    // Single URL extraction
    {
      path: "/api/v1/extract/url",
      method: "POST",
      permissions: ["read:data", "write:data"],
      rateLimit: {
        requestsPerMinute: 10,
        requestsPerHour: 100,
      },
      validation: {
        body: z.object({
          url: z.string().url(),
          options: z.object({
            formats: z.array(z.enum(["markdown", "html", "rawHtml", "screenshot", "links"])).default(["markdown"]),
            onlyMainContent: z.boolean().default(true),
            includeLinks: z.boolean().default(false),
            screenshot: z.boolean().default(false),
            waitFor: z.number().min(0).max(30000).default(0),
            timeout: z.number().min(1000).max(60000).default(30000),
            aiEnhancement: z.boolean().default(true),
            enhancementType: z.enum(["extract", "summarize", "classify", "analyze"]).default("extract"),
          }).optional(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { url, options = {} } = params.body;

          // Configure Firecrawl job
          const firecrawlConfig = {
            url,
            options: {
              formats: options.formats || ["markdown"],
              onlyMainContent: options.onlyMainContent ?? true,
              includeLinks: options.includeLinks ?? false,
              screenshot: options.screenshot ?? false,
              waitFor: options.waitFor || 0,
              timeout: options.timeout || 30000,
            },
          };

          // Execute scraping
          const result = await firecrawlService.scrapeUrl(firecrawlConfig, context);

          // Apply AI enhancement if requested
          let enhancedData = result.data;
          if (options.aiEnhancement && result.data) {
            try {
              enhancedData = await firecrawlService.enhanceWithAI(
                result.data,
                options.enhancementType || "extract",
                context
              );
            } catch (error) {
              console.warn("AI enhancement failed:", error);
              // Continue with original data
            }
          }

          const response: DataExtractionResponse = {
            jobId: result.jobId,
            status: result.status,
            results: result.data ? [{
              sourceUrl: url,
              extractedData: enhancedData || result.data,
              confidence: enhancedData?.confidence || 0.8,
              metadata: {
                extractionMethod: "firecrawl",
                processingTime: Date.now() - context.timestamp.getTime(),
                firecrawlCredits: result.creditsUsed,
                aiTokens: enhancedData ? 1000 : 0, // Estimate
              },
            }] : undefined,
            error: result.error,
            createdAt: context.timestamp.toISOString(),
            completedAt: result.status === "completed" ? new Date().toISOString() : undefined,
          };

          return {
            success: true,
            data: response,
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Data extraction error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Data extraction failed",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },

    // Batch URL extraction
    {
      path: "/api/v1/extract/batch",
      method: "POST",
      permissions: ["read:data", "write:data"],
      rateLimit: {
        requestsPerMinute: 5,
        requestsPerHour: 50,
      },
      validation: {
        body: z.object({
          urls: z.array(z.string().url()).min(1).max(10),
          options: z.object({
            formats: z.array(z.enum(["markdown", "html", "rawHtml", "screenshot", "links"])).default(["markdown"]),
            onlyMainContent: z.boolean().default(true),
            includeLinks: z.boolean().default(false),
            screenshot: z.boolean().default(false),
            waitFor: z.number().min(0).max(30000).default(0),
            timeout: z.number().min(1000).max(60000).default(30000),
            aiEnhancement: z.boolean().default(true),
            enhancementType: z.enum(["extract", "summarize", "classify", "analyze"]).default("extract"),
          }).optional(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { urls, options = {} } = params.body;

          // Execute batch scraping
          const result = await firecrawlService.batchScrape(
            urls,
            {
              formats: options.formats || ["markdown"],
              onlyMainContent: options.onlyMainContent ?? true,
              includeLinks: options.includeLinks ?? false,
              screenshot: options.screenshot ?? false,
              waitFor: options.waitFor || 0,
              timeout: options.timeout || 30000,
            },
            context
          );

          const response: DataExtractionResponse = {
            jobId: result.jobId,
            status: result.status,
            createdAt: context.timestamp.toISOString(),
          };

          return {
            success: true,
            data: response,
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Batch extraction error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Batch extraction failed",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },

    // Website crawling
    {
      path: "/api/v1/extract/crawl",
      method: "POST",
      permissions: ["read:data", "write:data"],
      rateLimit: {
        requestsPerMinute: 2,
        requestsPerHour: 20,
      },
      validation: {
        body: z.object({
          url: z.string().url(),
          options: z.object({
            formats: z.array(z.enum(["markdown", "html", "rawHtml", "screenshot", "links"])).default(["markdown"]),
            onlyMainContent: z.boolean().default(true),
            includeLinks: z.boolean().default(false),
            maxPages: z.number().min(1).max(100).default(10),
            allowedDomains: z.array(z.string()).optional(),
            excludePaths: z.array(z.string()).optional(),
            waitFor: z.number().min(0).max(30000).default(0),
            timeout: z.number().min(1000).max(60000).default(30000),
          }).optional(),
          webhook: z.object({
            url: z.string().url(),
            headers: z.record(z.string()).optional(),
          }).optional(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { url, options = {}, webhook } = params.body;

          // Configure crawl job
          const crawlConfig = {
            url,
            options: {
              formats: options.formats || ["markdown"],
              onlyMainContent: options.onlyMainContent ?? true,
              includeLinks: options.includeLinks ?? false,
              waitFor: options.waitFor || 0,
              timeout: options.timeout || 30000,
            },
            maxPages: options.maxPages || 10,
            allowedDomains: options.allowedDomains,
            excludePaths: options.excludePaths,
            webhook,
          };

          // Execute crawling
          const result = await firecrawlService.crawlUrl(crawlConfig, context);

          const response: DataExtractionResponse = {
            jobId: result.jobId,
            status: result.status,
            createdAt: context.timestamp.toISOString(),
          };

          return {
            success: true,
            data: response,
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Crawl extraction error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Crawl extraction failed",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },

    // Job status check
    {
      path: "/api/v1/extract/status/:jobId",
      method: "GET",
      permissions: ["read:data"],
      validation: {
        params: z.object({
          jobId: z.string(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { jobId } = params.params;

          // Get job status
          const result = await firecrawlService.getJobStatus(jobId);

          const response: DataExtractionResponse = {
            jobId: result.jobId,
            status: result.status,
            results: result.data ? [{
              sourceUrl: "multiple", // For crawl jobs
              extractedData: result.data,
              confidence: 0.8,
              metadata: {
                extractionMethod: "firecrawl",
                processingTime: 0,
                firecrawlCredits: result.creditsUsed,
              },
            }] : undefined,
            error: result.error,
            createdAt: context.timestamp.toISOString(),
            completedAt: result.status === "completed" || result.status === "failed" 
              ? new Date().toISOString() 
              : undefined,
          };

          return {
            success: true,
            data: response,
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Job status error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to get job status",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },
  ];
}