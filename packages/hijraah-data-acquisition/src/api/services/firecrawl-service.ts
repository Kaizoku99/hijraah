/**
 * Firecrawl Integration Service
 * 
 * Handles Firecrawl API integration for data extraction with intelligent
 * credit monitoring, job management, and AI-enhanced processing.
 */

import type { 
  FirecrawlJobConfig, 
  FirecrawlJobResult,
  RequestContext,
  AuthContext
} from "../types.js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export class FirecrawlService {
  private firecrawlApiKey: string;
  private baseUrl = "https://api.firecrawl.dev/v1";

  constructor(
    private supabase: SupabaseClient,
    firecrawlApiKey: string
  ) {
    this.firecrawlApiKey = firecrawlApiKey;
  }

  async scrapeUrl(
    config: FirecrawlJobConfig,
    context: RequestContext
  ): Promise<FirecrawlJobResult> {
    try {
      // Check credit availability
      const creditCheck = await this.checkCreditAvailability(context.auth, 1);
      if (!creditCheck.available) {
        throw new Error(`Insufficient Firecrawl credits: ${creditCheck.reason}`);
      }

      // Make Firecrawl API request
      const response = await fetch(`${this.baseUrl}/scrape`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.firecrawlApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: config.url,
          formats: config.options.formats,
          onlyMainContent: config.options.onlyMainContent,
          includeLinks: config.options.includeLinks,
          screenshot: config.options.screenshot,
          waitFor: config.options.waitFor,
          timeout: config.options.timeout,
        }),
      });

      if (!response.ok) {
        throw new Error(`Firecrawl API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Record credit usage
      await this.recordCreditUsage(context.auth, result.creditsUsed || 1, {
        url: config.url,
        formats: config.options.formats,
        success: result.success,
      });

      return {
        jobId: result.jobId || `scrape-${Date.now()}`,
        status: result.success ? "completed" : "failed",
        data: result.success ? {
          markdown: result.data?.markdown,
          html: result.data?.html,
          rawHtml: result.data?.rawHtml,
          screenshot: result.data?.screenshot,
          links: result.data?.links,
          metadata: {
            title: result.data?.metadata?.title,
            description: result.data?.metadata?.description,
            language: result.data?.metadata?.language,
            sourceURL: config.url,
            statusCode: result.data?.metadata?.statusCode || 200,
            error: result.error,
          },
        } : undefined,
        creditsUsed: result.creditsUsed || 1,
        error: result.error,
      };
    } catch (error) {
      console.error("Firecrawl scrape error:", error);
      throw error;
    }
  }

  async crawlUrl(
    config: FirecrawlJobConfig & { 
      maxPages?: number; 
      allowedDomains?: string[];
      excludePaths?: string[];
    },
    context: RequestContext
  ): Promise<FirecrawlJobResult> {
    try {
      // Estimate credit usage (rough estimate)
      const estimatedCredits = Math.min(config.maxPages || 10, 50);
      
      const creditCheck = await this.checkCreditAvailability(context.auth, estimatedCredits);
      if (!creditCheck.available) {
        throw new Error(`Insufficient Firecrawl credits: ${creditCheck.reason}`);
      }

      // Start crawl job
      const response = await fetch(`${this.baseUrl}/crawl`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.firecrawlApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: config.url,
          formats: config.options.formats,
          onlyMainContent: config.options.onlyMainContent,
          includeLinks: config.options.includeLinks,
          maxPages: config.maxPages,
          allowedDomains: config.allowedDomains,
          excludePaths: config.excludePaths,
          webhook: config.webhook,
        }),
      });

      if (!response.ok) {
        throw new Error(`Firecrawl API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Store job for tracking
      await this.storeJob(result.jobId, {
        type: "crawl",
        config,
        status: "pending",
        userId: context.auth.userId!,
        apiKeyId: context.auth.apiKey!.id,
        estimatedCredits,
      });

      return {
        jobId: result.jobId,
        status: "pending",
        creditsUsed: 0, // Will be updated when job completes
      };
    } catch (error) {
      console.error("Firecrawl crawl error:", error);
      throw error;
    }
  }

  async batchScrape(
    urls: string[],
    options: FirecrawlJobConfig["options"],
    context: RequestContext
  ): Promise<FirecrawlJobResult> {
    try {
      const estimatedCredits = urls.length;
      
      const creditCheck = await this.checkCreditAvailability(context.auth, estimatedCredits);
      if (!creditCheck.available) {
        throw new Error(`Insufficient Firecrawl credits: ${creditCheck.reason}`);
      }

      // Start batch job
      const response = await fetch(`${this.baseUrl}/batch/scrape`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.firecrawlApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls,
          formats: options.formats,
          onlyMainContent: options.onlyMainContent,
          includeLinks: options.includeLinks,
          screenshot: options.screenshot,
          waitFor: options.waitFor,
          timeout: options.timeout,
        }),
      });

      if (!response.ok) {
        throw new Error(`Firecrawl API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Store job for tracking
      await this.storeJob(result.jobId, {
        type: "batch",
        config: { urls, options },
        status: "pending",
        userId: context.auth.userId!,
        apiKeyId: context.auth.apiKey!.id,
        estimatedCredits,
      });

      return {
        jobId: result.jobId,
        status: "pending",
        creditsUsed: 0, // Will be updated when job completes
      };
    } catch (error) {
      console.error("Firecrawl batch scrape error:", error);
      throw error;
    }
  }

  async getJobStatus(jobId: string): Promise<FirecrawlJobResult> {
    try {
      const response = await fetch(`${this.baseUrl}/crawl/status/${jobId}`, {
        headers: {
          "Authorization": `Bearer ${this.firecrawlApiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Firecrawl API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Update job status in database
      await this.updateJobStatus(jobId, {
        status: result.status,
        creditsUsed: result.creditsUsed,
        data: result.data,
        error: result.error,
      });

      return {
        jobId,
        status: result.status,
        data: result.data,
        creditsUsed: result.creditsUsed || 0,
        error: result.error,
      };
    } catch (error) {
      console.error("Firecrawl job status error:", error);
      throw error;
    }
  }

  async enhanceWithAI(
    scrapedData: any,
    enhancementType: "extract" | "summarize" | "classify" | "analyze",
    context: RequestContext
  ): Promise<any> {
    try {
      const content = scrapedData.markdown || scrapedData.html || JSON.stringify(scrapedData);
      
      switch (enhancementType) {
        case "extract":
          return await this.extractStructuredData(content, context);
        case "summarize":
          return await this.summarizeContent(content, context);
        case "classify":
          return await this.classifyContent(content, context);
        case "analyze":
          return await this.analyzeContent(content, context);
        default:
          throw new Error(`Unknown enhancement type: ${enhancementType}`);
      }
    } catch (error) {
      console.error("AI enhancement error:", error);
      throw error;
    }
  }

  private async extractStructuredData(content: string, context: RequestContext): Promise<any> {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      system: "Extract structured immigration-related data from the provided content. Focus on policies, requirements, timelines, and procedures.",
      prompt: `Extract structured data from this content:\n\n${content.substring(0, 8000)}`,
      schema: z.object({
        title: z.string().optional(),
        summary: z.string(),
        keyPoints: z.array(z.string()),
        requirements: z.array(z.object({
          category: z.string(),
          description: z.string(),
          mandatory: z.boolean(),
        })).optional(),
        timelines: z.array(z.object({
          stage: z.string(),
          duration: z.string(),
          description: z.string(),
        })).optional(),
        contacts: z.array(z.object({
          type: z.string(),
          value: z.string(),
        })).optional(),
        lastUpdated: z.string().optional(),
        confidence: z.number().min(0).max(1),
      }),
    });

    // Record AI token usage
    await this.recordAiUsage(context.auth, "extraction", 1000); // Estimate

    return object;
  }

  private async summarizeContent(content: string, context: RequestContext): Promise<any> {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: "Provide a concise summary of immigration-related content, highlighting key changes, requirements, and important dates.",
      prompt: `Summarize this immigration content:\n\n${content.substring(0, 8000)}`,
      maxTokens: 500,
    });

    // Record AI token usage
    await this.recordAiUsage(context.auth, "summarization", 500);

    return { summary: text };
  }

  private async classifyContent(content: string, context: RequestContext): Promise<any> {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      system: "Classify immigration content by type, country, and relevance.",
      prompt: `Classify this immigration content:\n\n${content.substring(0, 4000)}`,
      schema: z.object({
        contentType: z.enum(["policy", "procedure", "form", "news", "guide", "faq", "contact"]),
        country: z.string().optional(),
        visaTypes: z.array(z.string()).optional(),
        categories: z.array(z.string()),
        urgency: z.enum(["low", "medium", "high", "critical"]),
        relevanceScore: z.number().min(0).max(1),
        confidence: z.number().min(0).max(1),
      }),
    });

    // Record AI token usage
    await this.recordAiUsage(context.auth, "classification", 300);

    return object;
  }

  private async analyzeContent(content: string, context: RequestContext): Promise<any> {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      system: "Analyze immigration content for changes, impacts, and recommendations.",
      prompt: `Analyze this immigration content for changes and impacts:\n\n${content.substring(0, 6000)}`,
      schema: z.object({
        changes: z.array(z.object({
          type: z.string(),
          description: z.string(),
          impact: z.enum(["positive", "negative", "neutral"]),
          severity: z.enum(["low", "medium", "high", "critical"]),
        })),
        recommendations: z.array(z.string()),
        affectedGroups: z.array(z.string()),
        timeline: z.string().optional(),
        confidence: z.number().min(0).max(1),
      }),
    });

    // Record AI token usage
    await this.recordAiUsage(context.auth, "analysis", 1500);

    return object;
  }

  private async checkCreditAvailability(
    auth: AuthContext, 
    requiredCredits: number
  ): Promise<{ available: boolean; reason?: string }> {
    const remaining = auth.rateLimits.firecrawlCreditsPerMonth - auth.usage.currentMonth.firecrawlCredits;
    
    if (remaining < requiredCredits) {
      return {
        available: false,
        reason: `Insufficient credits. Required: ${requiredCredits}, Available: ${remaining}`,
      };
    }

    return { available: true };
  }

  private async recordCreditUsage(
    auth: AuthContext,
    creditsUsed: number,
    metadata: Record<string, any>
  ): Promise<void> {
    try {
      await this.supabase
        .from("api_usage_records")
        .insert({
          api_key_id: auth.apiKey!.id,
          endpoint: "firecrawl",
          method: "POST",
          status_code: 200,
          firecrawl_credits_used: creditsUsed,
          timestamp: new Date().toISOString(),
          metadata,
        });
    } catch (error) {
      console.error("Error recording credit usage:", error);
    }
  }

  private async recordAiUsage(
    auth: AuthContext,
    operation: string,
    tokensUsed: number
  ): Promise<void> {
    try {
      await this.supabase
        .from("api_usage_records")
        .insert({
          api_key_id: auth.apiKey!.id,
          endpoint: `ai-${operation}`,
          method: "POST",
          status_code: 200,
          ai_tokens_used: tokensUsed,
          timestamp: new Date().toISOString(),
          metadata: { operation },
        });
    } catch (error) {
      console.error("Error recording AI usage:", error);
    }
  }

  private async storeJob(
    jobId: string,
    jobData: {
      type: string;
      config: any;
      status: string;
      userId: string;
      apiKeyId: string;
      estimatedCredits: number;
    }
  ): Promise<void> {
    try {
      await this.supabase
        .from("firecrawl_jobs")
        .insert({
          job_id: jobId,
          type: jobData.type,
          config: jobData.config,
          status: jobData.status,
          user_id: jobData.userId,
          api_key_id: jobData.apiKeyId,
          estimated_credits: jobData.estimatedCredits,
          created_at: new Date().toISOString(),
        });
    } catch (error) {
      console.error("Error storing job:", error);
    }
  }

  private async updateJobStatus(
    jobId: string,
    updates: {
      status: string;
      creditsUsed?: number;
      data?: any;
      error?: string;
    }
  ): Promise<void> {
    try {
      await this.supabase
        .from("firecrawl_jobs")
        .update({
          status: updates.status,
          credits_used: updates.creditsUsed,
          result_data: updates.data,
          error: updates.error,
          completed_at: updates.status === "completed" || updates.status === "failed" 
            ? new Date().toISOString() 
            : undefined,
        })
        .eq("job_id", jobId);
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  }
}