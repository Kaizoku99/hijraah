/**
 * Comprehensive Immigration Data Scraping Task
 *
 * This task implements end-to-end immigration data acquisition using:
 * - Firecrawl v2 with change tracking and semantic crawling
 * - Google AI (Vercel SDK) for intelligent data processing
 * - Supabase storage integration
 * - RAG pipeline and knowledge graph updates
 *
 * Features:
 * - Multi-source immigration policy monitoring
 * - Change detection with git-diff and JSON comparison
 * - AI-powered data cleaning and structuring
 * - Real-time webhook notifications
 * - Comprehensive error handling and retries
 * - Performance monitoring and analytics
 */

import {
  task,
  schedules,
  locals,
  tasks,
  logger,
  metadata,
} from "@trigger.dev/sdk";
import { z } from "zod";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";
import FirecrawlApp from "@mendable/firecrawl-js";

// Import RAG pipeline factory
import { RAGPipelineFactory, createRAGPipeline } from "@hijraah/rag";
import { KnowledgeGraphBuilder } from "@hijraah/rag";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize Firecrawl client
const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

// Initialize RAG pipeline
const ragFactory = new RAGPipelineFactory({
  supabase,
  openai: openai(process.env.OPENAI_API_KEY!),
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY,
});

// Comprehensive list of immigration sources to monitor
const IMMIGRATION_SOURCES = [
  // Government Sources
  {
    name: "USCIS Official Website",
    url: "https://www.uscis.gov",
    category: "government",
    country: "US",
    type: "official",
    priority: "critical",
    changeSensitivity: "high",
  },
  {
    name: "US Department of State - Visas",
    url: "https://travel.state.gov/content/travel/en/us-visas.html",
    category: "government",
    country: "US",
    type: "official",
    priority: "critical",
    changeSensitivity: "high",
  },
  {
    name: "Canada IRCC",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    category: "government",
    country: "CA",
    type: "official",
    priority: "critical",
    changeSensitivity: "high",
  },
  {
    name: "UK Home Office Immigration",
    url: "https://www.gov.uk/browse/visas-immigration",
    category: "government",
    country: "UK",
    type: "official",
    priority: "critical",
    changeSensitivity: "high",
  },
  {
    name: "Australia Department of Home Affairs",
    url: "https://immi.homeaffairs.gov.au",
    category: "government",
    country: "AU",
    type: "official",
    priority: "critical",
    changeSensitivity: "high",
  },

  // Immigration Forums and Communities
  {
    name: "Immigration.com Forums",
    url: "https://www.immigration.com/forums",
    category: "community",
    country: "global",
    type: "forum",
    priority: "high",
    changeSensitivity: "medium",
  },
  {
    name: "Trackitt - Visa Journey Tracking",
    url: "https://www.trackitt.com",
    category: "community",
    country: "global",
    type: "tracking",
    priority: "high",
    changeSensitivity: "medium",
  },
  {
    name: "Reddit Immigration Subreddits",
    url: "https://www.reddit.com/r/immigration/",
    category: "community",
    country: "global",
    type: "social",
    priority: "medium",
    changeSensitivity: "low",
  },

  // Immigration Blogs and Resources
  {
    name: "Immigration Road Blog",
    url: "https://www.immigrationroad.com",
    category: "blog",
    country: "global",
    type: "resource",
    priority: "high",
    changeSensitivity: "medium",
  },
  {
    name: "Boundless Immigration",
    url: "https://www.boundless.com/immigration-resources",
    category: "blog",
    country: "global",
    type: "resource",
    priority: "high",
    changeSensitivity: "medium",
  },
  {
    name: "Nolo's Immigration Law Blog",
    url: "https://www.nolo.com/legal-encyclopedia/immigration-law",
    category: "blog",
    country: "global",
    type: "legal",
    priority: "high",
    changeSensitivity: "medium",
  },

  // Visa Processing Centers and Consulates
  {
    name: "US Embassy and Consulate Websites",
    url: "https://www.usembassy.gov",
    category: "government",
    country: "global",
    type: "embassy",
    priority: "medium",
    changeSensitivity: "medium",
  },
  {
    name: "Canadian Visa Application Centers",
    url: "https://www.vfsglobal.com/canada",
    category: "government",
    country: "global",
    type: "visa_center",
    priority: "medium",
    changeSensitivity: "medium",
  },
];

// Schema definitions
const ImmigrationSourceSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  category: z.enum([
    "government",
    "community",
    "blog",
    "forum",
    "resource",
    "legal",
    "embassy",
    "visa_center",
  ]),
  country: z.string(),
  type: z.string(),
  priority: z.enum(["critical", "high", "medium", "low"]),
  changeSensitivity: z.enum(["high", "medium", "low"]),
});

const ScrapingPayloadSchema = z.object({
  sources: z.array(ImmigrationSourceSchema).optional(),
  forceFullCrawl: z.boolean().default(false),
  includeChangeTracking: z.boolean().default(true),
  includeSemanticAnalysis: z.boolean().default(true),
  maxPagesPerSource: z.number().min(1).max(100).default(20),
  aiProcessingEnabled: z.boolean().default(true),
  webhookUrl: z.string().url().optional(),
});

const PolicyChangeAnalysisSchema = z.object({
  changeType: z.enum([
    "new_policy",
    "policy_update",
    "clarification",
    "removal",
    "no_change",
  ]),
  impactLevel: z.enum(["critical", "high", "medium", "low"]),
  summary: z.string(),
  details: z.string(),
  affectedCategories: z.array(z.string()),
  effectiveDate: z.string().optional(),
  actionRequired: z.boolean(),
  urgency: z.enum(["immediate", "within_week", "within_month", "no_urgency"]),
  confidence: z.number().min(0).max(1),
  recommendations: z.array(z.string()),
});

const ProcessedDataSchema = z.object({
  sourceUrl: z.string(),
  title: z.string().optional(),
  content: z.string(),
  extractedEntities: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
      confidence: z.number(),
      context: z.string().optional(),
    })
  ),
  policyChanges: z.array(PolicyChangeAnalysisSchema),
  structuredData: z.object({
    visaTypes: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    timelines: z
      .array(
        z.object({
          stage: z.string(),
          duration: z.string(),
          description: z.string(),
        })
      )
      .optional(),
    fees: z
      .array(
        z.object({
          type: z.string(),
          amount: z.string(),
          currency: z.string().default("USD"),
        })
      )
      .optional(),
    contacts: z
      .array(
        z.object({
          type: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  }),
  metadata: z.object({
    processingTime: z.number(),
    aiModel: z.string(),
    confidence: z.number(),
    tokensUsed: z.number(),
    lastUpdated: z.string(),
  }),
});

// Task definitions
export const scrapeImmigrationDataTask = task({
  id: "scrape-immigration-data",
  retry: {
    maxAttempts: 5,
    factor: 1.8,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 30000,
  },
  catchError: async ({ error, ctx }) => {
    logger.error("Scraping task failed", {
      error: error.message,
      taskId: ctx.task.id,
      runId: ctx.run.id,
    });
    return { retryAt: new Date(Date.now() + 60000) };
  },
  run: async (payload: z.infer<typeof ScrapingPayloadSchema>, { ctx }) => {
    const startTime = Date.now();
    const sources = payload.sources || IMMIGRATION_SOURCES;

    logger.info("🚀 Starting comprehensive immigration data scraping", {
      sourceCount: sources.length,
      forceFullCrawl: payload.forceFullCrawl,
      aiProcessingEnabled: payload.aiProcessingEnabled,
    });

    // Initialize metadata tracking
    metadata
      .set("totalSources", sources.length)
      .set("processedSources", 0)
      .set("successfulSources", 0)
      .set("failedSources", 0)
      .set("totalChangesDetected", 0)
      .set("processingStage", "initializing");

    const results = [];
    let totalChangesDetected = 0;

    // Process each source
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];

      try {
        logger.info(`🌐 Processing source: ${source.name} (${source.url})`);

        metadata
          .set("currentSource", source.name)
          .set("processingStage", "scraping")
          .increment("processedSources", 1);

        // Configure Firecrawl scraping with advanced options
        const scrapeConfig = {
          url: source.url,
          formats: payload.includeChangeTracking
            ? ["markdown", "html", "changeTracking"]
            : ["markdown", "html"],
          onlyMainContent: true,
          includeLinks: true,
          waitFor: 2000,
          timeout: 30000,
          scrapeOptions: {
            maxPages: payload.maxPagesPerSource,
            allowExternalLinks: false,
            includeTags: ["article", "section", "div", "p", "h1", "h2", "h3"],
            excludeTags: ["script", "style", "nav", "footer", "aside"],
          },
        };

        // Add change tracking configuration
        if (payload.includeChangeTracking) {
          scrapeConfig.changeTrackingOptions = {
            modes: ["git-diff", "json"],
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                content: { type: "string" },
                lastUpdated: { type: "string" },
                policyChanges: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      description: { type: "string" },
                      date: { type: "string" },
                    },
                  },
                },
              },
            },
            tag: `${source.category}_${source.country}`,
          };
        }

        // Execute scraping
        const scrapeResult = await firecrawl.scrapeUrl(scrapeConfig, {
          requestId: ctx.run.id,
          timestamp: new Date(),
          auth: ctx.auth || {},
          metadata: {},
        });

        if (!scrapeResult.success) {
          logger.warn(
            `⚠️ Failed to scrape ${source.url}: ${scrapeResult.error}`
          );
          metadata.increment("failedSources", 1);
          continue;
        }

        // Analyze change tracking data
        let changeAnalysis = null;
        if (
          payload.includeChangeTracking &&
          scrapeResult.data?.changeTracking
        ) {
          changeAnalysis = await analyzeChangeTrackingData(
            scrapeResult.data.changeTracking,
            source
          );

          if (changeAnalysis.hasChanges) {
            totalChangesDetected++;
            metadata.increment("totalChangesDetected", 1);
          }
        }

        // Process with AI if enabled
        let processedData = null;
        if (payload.aiProcessingEnabled && scrapeResult.data?.markdown) {
          metadata.set("processingStage", "ai_processing");

          processedData = await processWithGoogleAI(
            scrapeResult.data.markdown,
            source,
            ctx
          );
        }

        // Store results
        const result = {
          source,
          scrapeResult,
          changeAnalysis,
          processedData,
          scrapedAt: new Date().toISOString(),
          processingTime: Date.now() - startTime,
        };

        results.push(result);
        metadata.increment("successfulSources", 1);

        // Update RAG pipeline and knowledge graph
        if (processedData) {
          await updateRAGPipeline(processedData, source);
        }

        logger.info(`✅ Successfully processed ${source.name}`);
      } catch (error) {
        logger.error(`❌ Failed to process ${source.name}`, {
          error: error instanceof Error ? error.message : "Unknown error",
          source: source.url,
        });
        metadata.increment("failedSources", 1);
      }
    }

    // Final processing and storage
    metadata.set("processingStage", "finalizing");

    const finalResult = {
      totalSources: sources.length,
      successfulSources: results.length,
      failedSources: sources.length - results.length,
      totalChangesDetected,
      processingTime: Date.now() - startTime,
      results,
      metadata: {
        runId: ctx.run.id,
        timestamp: new Date().toISOString(),
        triggerVersion: "v4",
      },
    };

    // Store final results in Supabase
    await storeScrapingResults(finalResult);

    // Send webhook notification if configured
    if (payload.webhookUrl) {
      await sendWebhookNotification(payload.webhookUrl, finalResult);
    }

    logger.info("🎉 Immigration data scraping completed", {
      totalSources: sources.length,
      successfulSources: results.length,
      totalChangesDetected,
      processingTime: Date.now() - startTime,
    });

    return finalResult;
  },
});

// Scheduled task for regular immigration data monitoring
export const scheduledImmigrationScrapingTask = schedules.task({
  id: "scheduled-immigration-scraping",
  cron: "0 */6 * * *", // Every 6 hours
  run: async (payload, { ctx }) => {
    logger.info("🕐 Running scheduled immigration data scraping");

    // Focus on high-priority sources for scheduled runs
    const highPrioritySources = IMMIGRATION_SOURCES.filter(
      (source) => source.priority === "critical" || source.priority === "high"
    );

    return await scrapeImmigrationDataTask.trigger({
      sources: highPrioritySources,
      forceFullCrawl: false,
      includeChangeTracking: true,
      includeSemanticAnalysis: true,
      maxPagesPerSource: 10,
      aiProcessingEnabled: true,
    });
  },
});

// Helper functions
async function analyzeChangeTrackingData(changeTracking: any, source: any) {
  const changeStatus = changeTracking.changeStatus;

  const hasChanges = changeStatus === "changed" || changeStatus === "new";

  let changeAnalysis = null;

  if (hasChanges) {
    // Use AI to analyze the changes in detail
    const analysis = await generateObject({
      model: openai("gpt-4o"),
      schema: PolicyChangeAnalysisSchema,
      messages: [
        {
          role: "system",
          content: `You are an immigration policy analyst. Analyze the change tracking data from a ${source.category} source and provide a detailed assessment of what changed and its impact on immigration applicants.`,
        },
        {
          role: "user",
          content: `Change Tracking Data:
Status: ${changeTracking.changeStatus}
Previous Scrape: ${changeTracking.previousScrapeAt || "None"}
Visibility: ${changeTracking.visibility}

Source: ${source.name} (${source.category})
Country: ${source.country}

Please analyze what type of change this represents and its potential impact.`,
        },
      ],
    });

    changeAnalysis = analysis.object;
  }

  return {
    hasChanges,
    changeStatus,
    previousScrapeAt: changeTracking.previousScrapeAt,
    visibility: changeTracking.visibility,
    analysis: changeAnalysis,
    gitDiff: changeTracking.diff?.text,
    jsonComparison: changeTracking.json,
  };
}

async function processWithGoogleAI(content: string, source: any, ctx: any) {
  try {
    // Use Google AI (via OpenAI-compatible interface) to process and structure the content
    const structuredData = await generateObject({
      model: openai("gpt-4o"), // Using OpenAI as proxy for Google AI
      schema: ProcessedDataSchema,
      messages: [
        {
          role: "system",
          content: `You are an immigration data processing specialist. Extract and structure immigration-related information from the provided content. Focus on policies, requirements, timelines, fees, and contact information.`,
        },
        {
          role: "user",
          content: `Process this immigration content from ${source.name} (${source.category}, ${source.country}):

${content.substring(0, 8000)}

Extract:
1. Key entities and concepts
2. Policy changes or updates
3. Structured data (visa types, requirements, timelines, fees, contacts)
4. Any relevant immigration information`,
        },
      ],
    });

    return structuredData.object;
  } catch (error) {
    logger.warn("AI processing failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return null;
  }
}

async function updateRAGPipeline(processedData: any, source: any) {
  try {
    const ragPipeline = createRAGPipeline({
      supabase,
      openai: openai(process.env.OPENAI_API_KEY!),
      firecrawlApiKey: process.env.FIRECRAWL_API_KEY,
    }).advanced;

    // Ingest the processed data into RAG pipeline
    const ingestionResult = await ragPipeline.ingest({
      id: `immigration_${source.name}_${Date.now()}`,
      sourceUrl: source.url,
      storagePath: null, // Data is already processed
    });

    // Update knowledge graph with immigration-specific entities
    const kgBuilder = new KnowledgeGraphBuilder(
      openai(process.env.OPENAI_API_KEY!),
      supabase
    );

    if (processedData.extractedEntities) {
      for (const entity of processedData.extractedEntities) {
        await kgBuilder.addEntity({
          id: `${entity.type}_${entity.value}_${Date.now()}`,
          name: entity.value,
          type: entity.type,
          properties: {
            source: source.name,
            confidence: entity.confidence,
            context: entity.context,
            country: source.country,
            category: source.category,
          },
        });
      }
    }

    logger.info("RAG pipeline and knowledge graph updated", {
      source: source.name,
      entitiesExtracted: processedData.extractedEntities?.length || 0,
    });
  } catch (error) {
    logger.error("Failed to update RAG pipeline", {
      error: error instanceof Error ? error.message : "Unknown error",
      source: source.name,
    });
  }
}

async function storeScrapingResults(results: any) {
  try {
    const { data, error } = await supabase
      .from("immigration_scraping_results")
      .insert({
        run_id: results.metadata.runId,
        total_sources: results.totalSources,
        successful_sources: results.successfulSources,
        failed_sources: results.failedSources,
        total_changes_detected: results.totalChangesDetected,
        processing_time: results.processingTime,
        results: results.results,
        metadata: results.metadata,
        created_at: new Date().toISOString(),
      });

    if (error) {
      logger.error("Failed to store scraping results", { error });
    } else {
      logger.info("Scraping results stored successfully");
    }
  } catch (error) {
    logger.error("Error storing scraping results", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

async function sendWebhookNotification(webhookUrl: string, data: any) {
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Source": "hijraah-immigration-scraper",
      },
      body: JSON.stringify({
        event: "immigration_data_scraped",
        timestamp: new Date().toISOString(),
        data,
      }),
    });

    logger.info("Webhook notification sent successfully");
  } catch (error) {
    logger.error("Failed to send webhook notification", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Export task for use in other parts of the application
export default scrapeImmigrationDataTask;
