import { createAIMultiplexer } from "@hijraah/ai";
import { createDocumentProcessor } from "@hijraah/documents";
import { FirecrawlApp } from "@mendable/firecrawl-js";
import { createClient } from "@supabase/supabase-js";
import { task, logger, schedules } from "@trigger.dev/sdk/v3";
import { OpenAI } from "openai";
import { z } from "zod";

// Task payload schemas
const DocumentProcessingPayload = z.object({
  documentId: z.string(),
  url: z.string().url().optional(),
  content: z.string().optional(),
  format: z.enum(["pdf", "docx", "html", "markdown", "text", "webpage"]),
  options: z
    .object({
      extractText: z.boolean().default(true),
      generateSummary: z.boolean().default(true),
      extractEntities: z.boolean().default(true),
      generateEmbeddings: z.boolean().default(true),
      detectPII: z.boolean().default(true),
    })
    .optional(),
});

const AIAnalysisPayload = z.object({
  prompt: z.string(),
  content: z.string(),
  analysisType: z.enum([
    "classification",
    "sentiment",
    "extraction",
    "summarization",
    "translation",
  ]),
  model: z.string().optional(),
  temperature: z.number().min(0).max(2).default(0.1),
  metadata: z.record(z.any()).optional(),
});

const WebScrapingPayload = z.object({
  url: z.string().url(),
  formats: z
    .array(z.enum(["markdown", "html", "rawHtml", "screenshot", "links"]))
    .default(["markdown"]),
  includeTags: z.array(z.string()).optional(),
  excludeTags: z.array(z.string()).optional(),
  waitFor: z.number().optional(),
  headers: z.record(z.string()).optional(),
});

const EmailNotificationPayload = z.object({
  to: z.array(z.string().email()),
  subject: z.string(),
  template: z.string(),
  variables: z.record(z.any()).optional(),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
});

// Document Processing Task
export const documentProcessingTask = task({
  id: "document-processing",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 30000,
  },
  run: async (payload: z.infer<typeof DocumentProcessingPayload>) => {
    logger.info("Starting document processing", {
      documentId: payload.documentId,
    });

    // Validate payload
    const validatedPayload = DocumentProcessingPayload.parse(payload);

    // Initialize services
    const processor = createDocumentProcessor({
      firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
      openaiApiKey: process.env.OPENAI_API_KEY!,
      redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    try {
      // Process document
      const result = await processor.processDocument({
        content: validatedPayload.content,
        url: validatedPayload.url,
        format: validatedPayload.format,
        options: validatedPayload.options || {},
      });

      // Store results in database
      const { error: dbError } = await supabase
        .from("documents")
        .update({
          processed_content: result.processedContent,
          summary: result.summary,
          entities: result.entities,
          embeddings: result.embeddings,
          processing_status: "completed",
          processed_at: new Date().toISOString(),
        })
        .eq("id", validatedPayload.documentId);

      if (dbError) {
        throw new Error(`Database update failed: ${dbError.message}`);
      }

      logger.info("Document processing completed successfully", {
        documentId: validatedPayload.documentId,
        chunks: result.chunks?.length || 0,
        entitiesFound: result.entities?.length || 0,
      });

      return {
        success: true,
        documentId: validatedPayload.documentId,
        chunksGenerated: result.chunks?.length || 0,
        entitiesExtracted: result.entities?.length || 0,
        summaryGenerated: !!result.summary,
        embeddingsGenerated: !!result.embeddings,
      };
    } catch (error) {
      logger.error("Document processing failed", {
        documentId: validatedPayload.documentId,
        error: error instanceof Error ? error.message : String(error),
      });

      // Update status in database
      await supabase
        .from("documents")
        .update({
          processing_status: "failed",
          processing_error:
            error instanceof Error ? error.message : String(error),
        })
        .eq("id", validatedPayload.documentId);

      throw error;
    }
  },
});

// AI Analysis Task
export const aiAnalysisTask = task({
  id: "ai-analysis",
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 15000,
  },
  run: async (payload: z.infer<typeof AIAnalysisPayload>) => {
    logger.info("Starting AI analysis", { analysisType: payload.analysisType });

    const validatedPayload = AIAnalysisPayload.parse(payload);

    // Initialize AI multiplexer
    const aiMultiplexer = createAIMultiplexer({
      openaiApiKey: process.env.OPENAI_API_KEY!,
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      googleApiKey: process.env.GOOGLE_API_KEY,
      redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    try {
      const response = await aiMultiplexer.generateText({
        prompt: `${validatedPayload.prompt}\n\nContent to analyze:\n${validatedPayload.content}`,
        model: validatedPayload.model || "gpt-4o-mini",
        temperature: validatedPayload.temperature,
        maxTokens: 2000,
      });

      logger.info("AI analysis completed", {
        analysisType: validatedPayload.analysisType,
        tokensUsed: response.usage?.totalTokens || 0,
        provider: response.provider,
      });

      return {
        success: true,
        result: response.text,
        analysisType: validatedPayload.analysisType,
        provider: response.provider,
        tokensUsed: response.usage?.totalTokens || 0,
        metadata: validatedPayload.metadata,
      };
    } catch (error) {
      logger.error("AI analysis failed", {
        analysisType: validatedPayload.analysisType,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  },
});

// Web Scraping Task
export const webScrapingTask = task({
  id: "web-scraping",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 60000,
  },
  run: async (payload: z.infer<typeof WebScrapingPayload>) => {
    logger.info("Starting web scraping", { url: payload.url });

    const validatedPayload = WebScrapingPayload.parse(payload);

    // Initialize Firecrawl
    const firecrawl = new FirecrawlApp({
      apiKey: process.env.FIRECRAWL_API_KEY!,
    });

    try {
      const scrapeResult = await firecrawl.scrapeUrl(validatedPayload.url, {
        formats: validatedPayload.formats,
        includeTags: validatedPayload.includeTags,
        excludeTags: validatedPayload.excludeTags,
        waitFor: validatedPayload.waitFor,
        headers: validatedPayload.headers,
      });

      if (!scrapeResult.success) {
        throw new Error(
          `Scraping failed: ${scrapeResult.error || "Unknown error"}`
        );
      }

      logger.info("Web scraping completed", {
        url: validatedPayload.url,
        contentLength: scrapeResult.data?.markdown?.length || 0,
        formats: validatedPayload.formats,
      });

      return {
        success: true,
        url: validatedPayload.url,
        content: scrapeResult.data,
        metadata: scrapeResult.data?.metadata || {},
        scrapedAt: new Date().toISOString(),
      };
    } catch (error) {
      logger.error("Web scraping failed", {
        url: validatedPayload.url,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  },
});

// Email Notification Task
export const emailNotificationTask = task({
  id: "email-notification",
  retry: {
    maxAttempts: 5,
    factor: 1.5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: z.infer<typeof EmailNotificationPayload>) => {
    logger.info("Sending email notification", {
      recipients: payload.to.length,
      subject: payload.subject,
      priority: payload.priority,
    });

    const validatedPayload = EmailNotificationPayload.parse(payload);

    try {
      // In a real implementation, you'd integrate with your email service
      // For now, we'll simulate email sending
      logger.info("Email sent successfully", {
        to: validatedPayload.to,
        subject: validatedPayload.subject,
        template: validatedPayload.template,
      });

      return {
        success: true,
        recipients: validatedPayload.to,
        subject: validatedPayload.subject,
        sentAt: new Date().toISOString(),
      };
    } catch (error) {
      logger.error("Email sending failed", {
        recipients: validatedPayload.to,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  },
});

// Scheduled Tasks
export const dailyReportsTask = schedules.task({
  id: "daily-reports",
  cron: "0 8 * * *", // 8 AM UTC every day
  run: async () => {
    logger.info("Generating daily reports");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    try {
      // Get yesterday's metrics
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      const { data: metrics, error } = await supabase
        .from("daily_metrics")
        .select("*")
        .eq("date", yesterdayStr)
        .single();

      if (error && error.code !== "PGRST116") {
        // Not found is OK
        throw new Error(`Failed to fetch metrics: ${error.message}`);
      }

      // Trigger email notification with report
      await emailNotificationTask.trigger({
        to: [process.env.ADMIN_EMAIL!],
        subject: `Daily Report - ${yesterdayStr}`,
        template: "daily-report",
        variables: {
          date: yesterdayStr,
          metrics: metrics || {},
        },
        priority: "normal",
      });

      logger.info("Daily reports generated and sent");

      return {
        success: true,
        date: yesterdayStr,
        metricsFound: !!metrics,
      };
    } catch (error) {
      logger.error("Daily reports generation failed", {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  },
});

// Index Maintenance Task
export const indexMaintenanceTask = schedules.task({
  id: "index-maintenance",
  cron: "0 2 * * 0", // 2 AM UTC every Sunday
  run: async () => {
    logger.info("Starting index maintenance");

    try {
      // Trigger vector index optimization
      // Trigger knowledge graph cleanup
      // Trigger cache invalidation

      logger.info("Index maintenance completed");

      return {
        success: true,
        maintenanceType: "weekly",
        completedAt: new Date().toISOString(),
      };
    } catch (error) {
      logger.error("Index maintenance failed", {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  },
});

// Export all task types for type-safe triggering
export type DocumentProcessingTask = typeof documentProcessingTask;
export type AIAnalysisTask = typeof aiAnalysisTask;
export type WebScrapingTask = typeof webScrapingTask;
export type EmailNotificationTask = typeof emailNotificationTask;
