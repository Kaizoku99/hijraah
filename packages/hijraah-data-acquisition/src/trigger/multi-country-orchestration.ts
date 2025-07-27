/**
 * Multi-Country Government Source Orchestration
 *
 * Trigger.dev tasks for orchestrating data collection across multiple countries,
 * handling language detection, source reliability monitoring, and failure recovery.
 */

import { createClient } from "@supabase/supabase-js";
import { task, schedules, batch, logger, metadata } from "@trigger.dev/sdk/v3";
import { z } from "zod";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

import {
  GovernmentWebsiteScraper,
  GovernmentScrapingConfig,
} from "../scrapers/GovernmentWebsiteScraper";
import {
  ImmigrationPolicyScraper,
  PolicyScrapingConfig,
} from "../scrapers/ImmigrationPolicyScraper";

// Task payload schemas
export const MultiCountryScrapingPayloadSchema = z.object({
  countries: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      language: z.string(),
      timezone: z.string(),
      sources: z.array(
        z.object({
          url: z.string().url(),
          agency: z.string(),
          documentType: z.string(),
          policyType: z.string().optional(),
          priority: z.enum(["high", "medium", "low"]).default("medium"),
          expectedLanguage: z.string().optional(),
        }),
      ),
    }),
  ),
  orchestrationConfig: z.object({
    maxConcurrentCountries: z.number().int().min(1).max(10).default(3),
    maxConcurrentSourcesPerCountry: z.number().int().min(1).max(5).default(2),
    enableLanguageDetection: z.boolean().default(true),
    enableReliabilityMonitoring: z.boolean().default(true),
    retryFailedSources: z.boolean().default(true),
    respectRateLimits: z.boolean().default(true),
  }),
});

export const LanguageDetectionPayloadSchema = z.object({
  content: z.string(),
  expectedLanguage: z.string().optional(),
  sourceUrl: z.string().url(),
  country: z.string(),
});

export const SourceReliabilityPayloadSchema = z.object({
  sourceId: z.string(),
  url: z.string().url(),
  country: z.string(),
  agency: z.string(),
  successRate: z.number().min(0).max(1),
  averageResponseTime: z.number(),
  lastSuccessfulScrape: z.string().optional(),
  errorPatterns: z.array(z.string()),
});

// Initialize clients
const initializeClients = () => {
  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!firecrawlApiKey || !supabaseUrl || !supabaseKey) {
    throw new Error("Missing required environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const govScraper = new GovernmentWebsiteScraper(
    firecrawlApiKey,
    supabaseUrl,
    supabaseKey,
  );
  const policyScraper = new ImmigrationPolicyScraper(
    firecrawlApiKey,
    supabaseUrl,
    supabaseKey,
  );
  const aiModel = openai("gpt-4o");

  return { supabase, govScraper, policyScraper, aiModel };
};

/**
 * Task: Orchestrate Multi-Country Scraping
 *
 * Coordinates scraping across multiple countries with intelligent scheduling,
 * language detection, and failure handling.
 */
export const orchestrateMultiCountryScraping = task({
  id: "orchestrate-multi-country-scraping",
  name: "Orchestrate Multi-Country Scraping",
  version: "1.0.0",
  machine: "large-2x", // More resources for orchestration
  maxDuration: 3600, // 1 hour
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 60000,
  },
  run: async (
    payload: z.infer<typeof MultiCountryScrapingPayloadSchema>,
    { ctx },
  ) => {
    ctx.logger.info("🌍 Starting multi-country scraping orchestration", {
      countriesCount: payload.countries.length,
      totalSources: payload.countries.reduce(
        (sum, country) => sum + country.sources.length,
        0,
      ),
      maxConcurrentCountries:
        payload.orchestrationConfig.maxConcurrentCountries,
    });

    const { supabase } = initializeClients();
    const results = new Map<string, any>();
    const errors = new Map<string, any[]>();

    // Process countries in batches to respect concurrency limits
    const countryBatches = [];
    for (
      let i = 0;
      i < payload.countries.length;
      i += payload.orchestrationConfig.maxConcurrentCountries
    ) {
      countryBatches.push(
        payload.countries.slice(
          i,
          i + payload.orchestrationConfig.maxConcurrentCountries,
        ),
      );
    }

    for (const [batchIndex, countryBatch] of countryBatches.entries()) {
      ctx.logger.info(
        `🔄 Processing country batch ${batchIndex + 1}/${countryBatches.length}`,
        {
          countries: countryBatch.map((c) => c.name),
        },
      );

      // Process countries in parallel within the batch
      const countryPromises = countryBatch.map(async (country) => {
        try {
          const countryResult = await ctx.waitFor("process-country-sources", {
            country,
            orchestrationConfig: payload.orchestrationConfig,
          });

          results.set(country.code, countryResult);

          return {
            success: true,
            country: country.code,
            result: countryResult,
          };
        } catch (error: any) {
          ctx.logger.error(`❌ Failed to process country: ${country.name}`, {
            error: error.message,
          });

          const countryErrors = errors.get(country.code) || [];
          countryErrors.push({
            type: "country_processing_error",
            message: error.message,
            timestamp: new Date().toISOString(),
          });
          errors.set(country.code, countryErrors);

          return {
            success: false,
            country: country.code,
            error: error.message,
          };
        }
      });

      await Promise.allSettled(countryPromises);

      // Add delay between country batches to be respectful
      if (batchIndex < countryBatches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    // Generate orchestration summary
    const successfulCountries = Array.from(results.keys()).length;
    const failedCountries = Array.from(errors.keys()).length;
    const totalSources = Array.from(results.values()).reduce((sum, result) => {
      return sum + (result.summary?.sourcesProcessed || 0);
    }, 0);

    ctx.logger.info("✅ Multi-country orchestration completed", {
      successfulCountries,
      failedCountries,
      totalSources,
    });

    // Store orchestration results
    await supabase.from("orchestration_runs").insert({
      type: "multi_country_scraping",
      countries_processed: successfulCountries,
      countries_failed: failedCountries,
      total_sources: totalSources,
      results: Object.fromEntries(results),
      errors: Object.fromEntries(errors),
      completed_at: new Date().toISOString(),
    });

    return {
      success: true,
      summary: {
        countriesProcessed: successfulCountries,
        countriesFailed: failedCountries,
        totalSources,
      },
      results: Object.fromEntries(results),
      errors: Object.fromEntries(errors),
      timestamp: new Date().toISOString(),
    };
  },
});

/**
 * Task: Process Country Sources
 *
 * Processes all sources for a specific country with language detection
 * and source reliability monitoring.
 */
export const processCountrySources = task({
  id: "process-country-sources",
  name: "Process Country Sources",
  version: "1.0.0",
  machine: "medium-2x",
  maxDuration: 1800, // 30 minutes
  run: async (
    payload: {
      country: {
        code: string;
        name: string;
        language: string;
        timezone: string;
        sources: Array<{
          url: string;
          agency: string;
          documentType: string;
          policyType?: string;
          priority: "high" | "medium" | "low";
          expectedLanguage?: string;
        }>;
      };
      orchestrationConfig: {
        maxConcurrentSourcesPerCountry: number;
        enableLanguageDetection: boolean;
        enableReliabilityMonitoring: boolean;
        retryFailedSources: boolean;
        respectRateLimits: boolean;
      };
    },
    { ctx },
  ) => {
    ctx.logger.info(`🏛️ Processing sources for ${payload.country.name}`, {
      sourcesCount: payload.country.sources.length,
      language: payload.country.language,
    });

    const { supabase } = initializeClients();
    const results = [];
    const errors = [];

    // Sort sources by priority
    const sortedSources = [...payload.country.sources].sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    // Process sources in batches
    const sourceBatches = [];
    for (
      let i = 0;
      i < sortedSources.length;
      i += payload.orchestrationConfig.maxConcurrentSourcesPerCountry
    ) {
      sourceBatches.push(
        sortedSources.slice(
          i,
          i + payload.orchestrationConfig.maxConcurrentSourcesPerCountry,
        ),
      );
    }

    for (const [batchIndex, sourceBatch] of sourceBatches.entries()) {
      ctx.logger.info(
        `📊 Processing source batch ${batchIndex + 1}/${sourceBatches.length} for ${payload.country.name}`,
      );

      // Process sources in parallel within the batch
      const sourcePromises = sourceBatch.map(async (source) => {
        try {
          // Check source reliability if enabled
          if (payload.orchestrationConfig.enableReliabilityMonitoring) {
            const reliabilityCheck = await ctx.waitFor(
              "check-source-reliability",
              {
                url: source.url,
                country: payload.country.code,
                agency: source.agency,
              },
            );

            if (!reliabilityCheck.isReliable) {
              ctx.logger.warn(
                `⚠️ Source reliability check failed for ${source.url}`,
                {
                  reliability: reliabilityCheck,
                },
              );

              // Skip unreliable sources unless they're high priority
              if (source.priority !== "high") {
                return {
                  success: false,
                  source: source.url,
                  error: "Source reliability check failed",
                  skipped: true,
                };
              }
            }
          }

          // Determine scraping approach based on document type
          let scrapingResult;
          if (source.policyType) {
            // Use policy scraper for policy documents
            const config: PolicyScrapingConfig = {
              url: source.url,
              country: payload.country.code,
              agency: source.agency,
              documentType: source.documentType as any,
              policyType: source.policyType as any,
              language: source.expectedLanguage || payload.country.language,
              trackChanges: true,
              extractRequirements: true,
              extractTimelines: true,
              extractFees: true,
              extractEligibility: true,
            };

            scrapingResult = await ctx.waitFor("scrape-immigration-policies", {
              config,
            });
          } else {
            // Use general government scraper
            const config: GovernmentScrapingConfig = {
              url: source.url,
              country: payload.country.code,
              agency: source.agency,
              documentType: source.documentType as any,
              language: source.expectedLanguage || payload.country.language,
              depth: 2,
              extractTables: true,
              extractPDF: true,
              followLinks: true,
            };

            scrapingResult = await ctx.waitFor("scrape-government-sites", {
              config,
            });
          }

          // Perform language detection if enabled
          if (
            payload.orchestrationConfig.enableLanguageDetection &&
            scrapingResult.success
          ) {
            const languageDetection = await ctx.waitFor(
              "detect-content-language",
              {
                content: JSON.stringify(scrapingResult.data).substring(0, 2000), // First 2000 chars
                expectedLanguage:
                  source.expectedLanguage || payload.country.language,
                sourceUrl: source.url,
                country: payload.country.code,
              },
            );

            scrapingResult.languageDetection = languageDetection;
          }

          return {
            success: scrapingResult.success,
            source: source.url,
            agency: source.agency,
            priority: source.priority,
            result: scrapingResult,
          };
        } catch (error: any) {
          ctx.logger.error(`❌ Failed to process source: ${source.url}`, {
            error: error.message,
          });

          return {
            success: false,
            source: source.url,
            agency: source.agency,
            priority: source.priority,
            error: error.message,
          };
        }
      });

      const batchResults = await Promise.allSettled(sourcePromises);

      // Collect results and errors
      for (const result of batchResults) {
        if (result.status === "fulfilled") {
          if (result.value.success) {
            results.push(result.value);
          } else {
            errors.push(result.value);
          }
        } else {
          errors.push({
            success: false,
            source: "unknown",
            error: result.reason.message || "Unknown error",
          });
        }
      }

      // Add delay between source batches if rate limiting is enabled
      if (
        payload.orchestrationConfig.respectRateLimits &&
        batchIndex < sourceBatches.length - 1
      ) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    // Retry failed sources if enabled
    if (payload.orchestrationConfig.retryFailedSources && errors.length > 0) {
      ctx.logger.info(
        `🔄 Retrying ${errors.length} failed sources for ${payload.country.name}`,
      );

      const retryResults = [];
      for (const failedSource of errors.filter((e) => !e.skipped)) {
        try {
          // Simple retry with basic config
          const retryConfig: GovernmentScrapingConfig = {
            url: failedSource.source,
            country: payload.country.code,
            agency: failedSource.agency || "Unknown Agency",
            documentType: "other",
            language: payload.country.language,
            depth: 1, // Reduced depth for retry
            extractTables: false,
            extractPDF: false,
            followLinks: false,
            timeout: 15000, // Shorter timeout
            retries: 1,
          };

          const retryResult = await ctx.waitFor("scrape-government-sites", {
            config: retryConfig,
          });

          if (retryResult.success) {
            retryResults.push({
              success: true,
              source: failedSource.source,
              agency: failedSource.agency,
              priority: failedSource.priority,
              result: retryResult,
              retried: true,
            });
          }
        } catch (error: any) {
          ctx.logger.warn(`⚠️ Retry failed for ${failedSource.source}`, {
            error: error.message,
          });
        }
      }

      results.push(...retryResults);
    }

    ctx.logger.info(
      `✅ Country processing completed for ${payload.country.name}`,
      {
        successful: results.length,
        failed: errors.length,
        retried: results.filter((r) => r.retried).length,
      },
    );

    return {
      success: true,
      country: payload.country.code,
      summary: {
        sourcesProcessed: results.length,
        sourcesFailed: errors.length,
        sourcesRetried: results.filter((r) => r.retried).length,
      },
      results,
      errors,
      timestamp: new Date().toISOString(),
    };
  },
});

/**
 * Task: Detect Content Language
 *
 * Uses AI to detect the language of scraped content and validate
 * against expected language.
 */
export const detectContentLanguage = task({
  id: "detect-content-language",
  name: "Detect Content Language",
  version: "1.0.0",
  machine: "small-1x",
  maxDuration: 120, // 2 minutes
  run: async (
    payload: z.infer<typeof LanguageDetectionPayloadSchema>,
    { ctx },
  ) => {
    ctx.logger.info("🌐 Detecting content language", {
      sourceUrl: payload.sourceUrl,
      country: payload.country,
      expectedLanguage: payload.expectedLanguage,
    });

    const { aiModel } = initializeClients();

    try {
      const { text: languageAnalysis } = await generateText({
        model: aiModel,
        system: `You are a language detection expert. Analyze the provided text and determine:
        1. The primary language of the content
        2. Confidence level (0-1)
        3. Any secondary languages detected
        4. Whether the content matches the expected language
        
        Respond in JSON format with: {
          "primaryLanguage": "language_code",
          "confidence": 0.95,
          "secondaryLanguages": ["lang1", "lang2"],
          "matchesExpected": true/false,
          "reasoning": "brief explanation"
        }`,
        prompt: `Analyze this content and detect its language:
        
        Expected Language: ${payload.expectedLanguage || "Unknown"}
        Source URL: ${payload.sourceUrl}
        Country: ${payload.country}
        
        Content:
        ${payload.content}`,
        maxTokens: 300,
      });

      let detectionResult;
      try {
        detectionResult = JSON.parse(languageAnalysis);
      } catch {
        // Fallback if JSON parsing fails
        detectionResult = {
          primaryLanguage: payload.expectedLanguage || "unknown",
          confidence: 0.5,
          secondaryLanguages: [],
          matchesExpected: true,
          reasoning: "JSON parsing failed, using fallback",
        };
      }

      ctx.logger.info("✅ Language detection completed", {
        primaryLanguage: detectionResult.primaryLanguage,
        confidence: detectionResult.confidence,
        matchesExpected: detectionResult.matchesExpected,
      });

      return {
        success: true,
        sourceUrl: payload.sourceUrl,
        country: payload.country,
        detection: detectionResult,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Language detection failed", {
        error: error.message,
      });

      return {
        success: false,
        sourceUrl: payload.sourceUrl,
        country: payload.country,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

/**
 * Task: Check Source Reliability
 *
 * Monitors source reliability based on historical success rates,
 * response times, and error patterns.
 */
export const checkSourceReliability = task({
  id: "check-source-reliability",
  name: "Check Source Reliability",
  version: "1.0.0",
  machine: "small-1x",
  maxDuration: 60, // 1 minute
  run: async (
    payload: {
      url: string;
      country: string;
      agency: string;
    },
    { ctx },
  ) => {
    ctx.logger.info("🔍 Checking source reliability", {
      url: payload.url,
      country: payload.country,
      agency: payload.agency,
    });

    const { supabase } = initializeClients();

    try {
      // Get historical data for this source
      const { data: historicalData, error } = await supabase
        .from("collection_results")
        .select("status, processing_time_ms, collected_at, errors")
        .eq("metadata->>url", payload.url)
        .order("collected_at", { ascending: false })
        .limit(50); // Last 50 attempts

      if (error) throw error;

      if (!historicalData || historicalData.length === 0) {
        // No historical data, assume reliable for new sources
        return {
          isReliable: true,
          reason: "No historical data available",
          metrics: {
            successRate: null,
            averageResponseTime: null,
            totalAttempts: 0,
          },
          timestamp: new Date().toISOString(),
        };
      }

      // Calculate reliability metrics
      const totalAttempts = historicalData.length;
      const successfulAttempts = historicalData.filter(
        (d) => d.status === "success",
      ).length;
      const successRate = successfulAttempts / totalAttempts;

      const responseTimes = historicalData
        .filter((d) => d.processing_time_ms)
        .map((d) => d.processing_time_ms);
      const averageResponseTime =
        responseTimes.length > 0
          ? responseTimes.reduce((sum, time) => sum + time, 0) /
            responseTimes.length
          : null;

      // Get recent error patterns
      const recentErrors = historicalData
        .filter((d) => d.errors && d.status !== "success")
        .slice(0, 10) // Last 10 errors
        .map((d) => d.errors)
        .flat();

      // Determine reliability
      const isReliable =
        successRate >= 0.7 && // At least 70% success rate
        (averageResponseTime === null || averageResponseTime < 60000); // Under 60 seconds average

      let reason = "Source meets reliability criteria";
      if (successRate < 0.7) {
        reason = `Low success rate: ${(successRate * 100).toFixed(1)}%`;
      } else if (averageResponseTime && averageResponseTime >= 60000) {
        reason = `High response time: ${(averageResponseTime / 1000).toFixed(1)}s average`;
      }

      ctx.logger.info("✅ Source reliability check completed", {
        isReliable,
        successRate: (successRate * 100).toFixed(1) + "%",
        averageResponseTime: averageResponseTime
          ? `${(averageResponseTime / 1000).toFixed(1)}s`
          : "N/A",
      });

      // Store reliability assessment
      await supabase.from("source_reliability_assessments").insert({
        url: payload.url,
        country: payload.country,
        agency: payload.agency,
        is_reliable: isReliable,
        success_rate: successRate,
        average_response_time: averageResponseTime,
        total_attempts: totalAttempts,
        recent_errors: recentErrors,
        reason,
        assessed_at: new Date().toISOString(),
      });

      return {
        isReliable,
        reason,
        metrics: {
          successRate,
          averageResponseTime,
          totalAttempts,
          recentErrors: recentErrors.slice(0, 5), // Top 5 recent errors
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Source reliability check failed", {
        error: error.message,
      });

      // Default to reliable if check fails
      return {
        isReliable: true,
        reason: "Reliability check failed, defaulting to reliable",
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

/**
 * Scheduled Task: Global Source Monitoring
 *
 * Monitors all government sources across countries on a scheduled basis.
 */
export const globalSourceMonitoring = schedules.task({
  id: "global-source-monitoring",
  name: "Global Source Monitoring",
  version: "1.0.0",
  cron: "0 1 * * *", // Daily at 1 AM
  timezone: "UTC",
  machine: "large-1x",
  maxDuration: 7200, // 2 hours
  run: async (payload, { ctx }) => {
    ctx.logger.info("🌍 Starting global source monitoring");

    const { supabase } = initializeClients();

    try {
      // Get all countries with active sources
      const { data: countries, error } = await supabase
        .from("data_sources")
        .select(
          `
          metadata->country as country_code,
          metadata->country_name as country_name,
          metadata->language as language,
          metadata->timezone as timezone,
          url,
          metadata->agency as agency,
          metadata->document_type as document_type,
          metadata->policy_type as policy_type,
          metadata->priority as priority
        `,
        )
        .eq("type", "government")
        .eq("is_active", true);

      if (error) throw error;

      // Group sources by country
      const countryGroups = new Map<string, any>();
      for (const source of countries) {
        const countryCode = source.country_code;
        if (!countryGroups.has(countryCode)) {
          countryGroups.set(countryCode, {
            code: countryCode,
            name: source.country_name || countryCode,
            language: source.language || "en",
            timezone: source.timezone || "UTC",
            sources: [],
          });
        }

        countryGroups.get(countryCode).sources.push({
          url: source.url,
          agency: source.agency || "Unknown Agency",
          documentType: source.document_type || "other",
          policyType: source.policy_type,
          priority: source.priority || "medium",
        });
      }

      const countriesArray = Array.from(countryGroups.values());

      ctx.logger.info(
        `📊 Found ${countriesArray.length} countries with active sources`,
      );

      // Trigger multi-country orchestration
      const orchestrationResult = await ctx.waitFor(
        "orchestrate-multi-country-scraping",
        {
          countries: countriesArray,
          orchestrationConfig: {
            maxConcurrentCountries: 3,
            maxConcurrentSourcesPerCountry: 2,
            enableLanguageDetection: true,
            enableReliabilityMonitoring: true,
            retryFailedSources: true,
            respectRateLimits: true,
          },
        },
      );

      ctx.logger.info("✅ Global source monitoring completed", {
        countriesProcessed: orchestrationResult.summary.countriesProcessed,
        totalSources: orchestrationResult.summary.totalSources,
      });

      return {
        success: true,
        summary: orchestrationResult.summary,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Global source monitoring failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

// Export all tasks
export const multiCountryOrchestrationTasks = {
  orchestrateMultiCountryScraping,
  processCountrySources,
  detectContentLanguage,
  checkSourceReliability,
  globalSourceMonitoring,
};
