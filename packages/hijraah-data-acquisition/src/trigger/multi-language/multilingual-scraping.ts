/**
 * Multilingual Scraping Tasks
 *
 * Trigger.dev v4 tasks for scraping multilingual content using Firecrawl
 * with language detection and translation capabilities.
 */

import { createClient } from "@supabase/supabase-js";
import { task, schedules, logger } from "@trigger.dev/sdk/v3";
import { z } from "zod";

import {
  MultiLanguageScrapingPayloadSchema,
  MultiLanguageScrapingResultSchema,
  type MultiLanguageScrapingPayload,
  type MultiLanguageScrapingResult,
} from "./types";
import { MultilingualContentExtractionService } from "../../services/MultilingualContentExtractionService";
import { LanguageDetectionService } from "../../services/LanguageDetectionService";

// Initialize services
const initializeServices = () => {
  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!firecrawlApiKey || !supabaseUrl || !supabaseKey) {
    throw new Error("Missing required environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const multilingualExtraction = new MultilingualContentExtractionService(firecrawlApiKey);
  const languageDetection = new LanguageDetectionService();

  return { supabase, multilingualExtraction, languageDetection };
};

/**
 * Task: Multilingual Content Scraping
 *
 * Scrapes content from multiple URLs with language detection and translation.
 */
export const scrapeMultilingualContent = task({
  id: "scrape-multilingual-content",
  name: "Scrape Multilingual Content",
  version: "1.0.0",
  machine: "large-1x",
  maxDuration: 1800, // 30 minutes
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 60000,
    randomize: true,
  },
  run: async (payload: MultiLanguageScrapingPayload, { ctx }) => {
    ctx.logger.info("🌐 Starting multilingual content scraping", {
      urlCount: payload.urls.length,
      targetLanguages: payload.targetLanguages,
      batchSize: payload.batchSize,
    });

    const { supabase, multilingualExtraction } = initializeServices();
    const startTime = Date.now();
    const results = [];
    const errors = [];

    try {
      // Prepare extraction requests
      const extractionRequests = payload.urls.map(url => ({
        url,
        targetLanguages: payload.targetLanguages,
        extractionOptions: payload.extractionOptions,
        firecrawlOptions: {
          formats: ["markdown"] as const,
          onlyMainContent: true,
        },
      }));

      // Process URLs in batches
      for (let i = 0; i < extractionRequests.length; i += payload.batchSize) {
        const batch = extractionRequests.slice(i, i + payload.batchSize);
        
        ctx.logger.info(
          `📊 Processing batch ${Math.floor(i / payload.batchSize) + 1}/${Math.ceil(extractionRequests.length / payload.batchSize)}`
        );

        try {
          const batchResults = await multilingualExtraction.extractMultilingualContentBatch(batch);
          
          // Validate and store results
          for (const result of batchResults) {
            const validation = multilingualExtraction.validateExtractionQuality(
              result,
              payload.qualityThreshold
            );

            if (validation.isValid) {
              results.push(result);
              
              // Store in database
              await supabase.from("multilingual_content_extractions").insert({
                url: result.url,
                detected_language: result.detectedLanguage.language,
                language_confidence: result.detectedLanguage.confidence,
                original_content: result.originalContent,
                translations: result.translations,
                structured_data: result.structuredData,
                extraction_options: payload.extractionOptions,
                firecrawl_options: { formats: ["markdown"], onlyMainContent: true },
                metadata: result.metadata,
              });
            } else {
              ctx.logger.warn(`⚠️ Quality validation failed for ${result.url}`, {
                issues: validation.issues,
                recommendations: validation.recommendations,
              });
              
              errors.push({
                url: result.url,
                error: `Quality validation failed: ${validation.issues.join(", ")}`,
                timestamp: new Date().toISOString(),
              });
            }
          }
        } catch (error: any) {
          ctx.logger.error(`❌ Batch processing failed`, { error: error.message });
          
          // Add batch errors
          for (const request of batch) {
            errors.push({
              url: request.url,
              error: error.message,
              timestamp: new Date().toISOString(),
            });
          }
        }

        // Add delay between batches
        if (i + payload.batchSize < extractionRequests.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // Calculate statistics
      const statistics = multilingualExtraction.getExtractionStatistics(results);
      const processingTime = Date.now() - startTime;

      ctx.logger.info("✅ Multilingual scraping completed", {
        successful: results.length,
        failed: errors.length,
        processingTime: `${processingTime}ms`,
        statistics,
      });

      const result: MultiLanguageScrapingResult = {
        success: true,
        results,
        statistics,
        errors,
        processingTime,
        timestamp: new Date().toISOString(),
      };

      return result;
    } catch (error: any) {
      ctx.logger.error("❌ Multilingual scraping failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

/**
 * Task: Language Detection Batch
 *
 * Detects languages for multiple text samples.
 */
export const detectLanguagesBatch = task({
  id: "detect-languages-batch",
  name: "Detect Languages Batch",
  version: "1.0.0",
  machine: "medium-1x",
  maxDuration: 600, // 10 minutes
  run: async (
    payload: {
      texts: string[];
      contentType: string;
    },
    { ctx }
  ) => {
    ctx.logger.info("🔍 Starting batch language detection", {
      textCount: payload.texts.length,
      contentType: payload.contentType,
    });

    const { languageDetection } = initializeServices();
    const startTime = Date.now();

    try {
      const detections = await languageDetection.detectLanguagesBatch(payload.texts);
      const processingTime = Date.now() - startTime;

      // Analyze language distribution
      const distribution = await languageDetection.analyzeLanguageDistribution(payload.texts);

      ctx.logger.info("✅ Language detection completed", {
        detections: detections.length,
        primaryLanguage: distribution.primaryLanguage,
        mixedContent: distribution.mixedLanguageContent,
        processingTime: `${processingTime}ms`,
      });

      return {
        success: true,
        detections,
        distribution,
        processingTime,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Language detection failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

/**
 * Task: Monitor Multilingual Sources
 *
 * Monitors language-specific data sources for updates.
 */
export const monitorMultilingualSources = task({
  id: "monitor-multilingual-sources",
  name: "Monitor Multilingual Sources",
  version: "1.0.0",
  machine: "large-1x",
  maxDuration: 3600, // 1 hour
  run: async (
    payload: {
      languages?: string[];
      countries?: string[];
      priority?: "high" | "medium" | "low";
    },
    { ctx }
  ) => {
    ctx.logger.info("🔄 Starting multilingual source monitoring", {
      languages: payload.languages,
      countries: payload.countries,
      priority: payload.priority,
    });

    const { supabase, multilingualExtraction } = initializeServices();

    try {
      // Get language-specific data sources
      let query = supabase
        .from("language_specific_data_sources")
        .select("*")
        .eq("is_active", true);

      if (payload.languages) {
        query = query.in("language", payload.languages);
      }

      if (payload.countries) {
        query = query.in("country", payload.countries);
      }

      if (payload.priority) {
        query = query.eq("priority", payload.priority);
      }

      const { data: sources, error } = await query.order("priority", { ascending: false });

      if (error) throw error;

      ctx.logger.info(`📊 Found ${sources.length} multilingual sources to monitor`);

      // Group sources by language for efficient processing
      const sourcesByLanguage: Record<string, any[]> = {};
      for (const source of sources) {
        if (!sourcesByLanguage[source.language]) {
          sourcesByLanguage[source.language] = [];
        }
        sourcesByLanguage[source.language].push(source);
      }

      const results = [];
      const errors = [];

      // Process each language group
      for (const [language, languageSources] of Object.entries(sourcesByLanguage)) {
        ctx.logger.info(`🌐 Processing ${languageSources.length} sources for language: ${language}`);

        try {
          // Trigger multilingual scraping for this language group
          const scrapingResult = await ctx.waitFor("scrape-multilingual-content", {
            urls: languageSources.map(s => s.url),
            targetLanguages: languageSources[0].translation_targets || ["en"],
            extractionOptions: {
              detectLanguage: true,
              translateContent: true,
              preserveOriginal: true,
              extractStructuredData: true,
              followLinks: false,
              maxDepth: 1,
            },
            qualityThreshold: languageSources[0].quality_threshold || 0.8,
            batchSize: 3,
          });

          results.push({
            language,
            sourceCount: languageSources.length,
            result: scrapingResult,
          });

          // Update last monitoring timestamps
          const updatePromises = languageSources.map(source =>
            supabase
              .from("language_specific_data_sources")
              .update({ updated_at: new Date().toISOString() })
              .eq("id", source.id)
          );

          await Promise.all(updatePromises);
        } catch (error: any) {
          ctx.logger.error(`❌ Failed to process language ${language}`, {
            error: error.message,
          });

          errors.push({
            language,
            sourceCount: languageSources.length,
            error: error.message,
          });
        }
      }

      ctx.logger.info("✅ Multilingual source monitoring completed", {
        languagesProcessed: Object.keys(sourcesByLanguage).length,
        totalSources: sources.length,
        successful: results.length,
        failed: errors.length,
      });

      return {
        success: true,
        languagesProcessed: Object.keys(sourcesByLanguage).length,
        totalSources: sources.length,
        results,
        errors,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Multilingual source monitoring failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

/**
 * Scheduled Task: Daily Multilingual Monitoring
 *
 * Runs daily monitoring of high-priority multilingual sources.
 */
export const dailyMultilingualMonitoring = schedules.task({
  id: "daily-multilingual-monitoring",
  name: "Daily Multilingual Monitoring",
  version: "1.0.0",
  cron: "0 2 * * *", // Daily at 2 AM UTC
  timezone: "UTC",
  machine: "large-1x",
  maxDuration: 7200, // 2 hours
  run: async (payload, { ctx }) => {
    ctx.logger.info("🌅 Starting daily multilingual monitoring");

    try {
      // Monitor high-priority sources
      const highPriorityResult = await ctx.waitFor("monitor-multilingual-sources", {
        priority: "high",
      });

      // Monitor medium-priority sources
      const mediumPriorityResult = await ctx.waitFor("monitor-multilingual-sources", {
        priority: "medium",
      });

      ctx.logger.info("✅ Daily multilingual monitoring completed", {
        highPriority: {
          languagesProcessed: highPriorityResult.languagesProcessed,
          totalSources: highPriorityResult.totalSources,
        },
        mediumPriority: {
          languagesProcessed: mediumPriorityResult.languagesProcessed,
          totalSources: mediumPriorityResult.totalSources,
        },
      });

      return {
        success: true,
        highPriorityResult,
        mediumPriorityResult,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Daily multilingual monitoring failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

// Export all tasks
export const multilingualScrapingTasks = {
  scrapeMultilingualContent,
  detectLanguagesBatch,
  monitorMultilingualSources,
  dailyMultilingualMonitoring,
};