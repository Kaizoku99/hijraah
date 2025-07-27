/**
 * Government Website Scraping Tasks
 *
 * Trigger.dev v4 tasks for scraping government immigration websites,
 * extracting policy data, and detecting changes.
 */

import { createClient } from "@supabase/supabase-js";
import { task, schedules, batch, logger, metadata } from "@trigger.dev/sdk/v3";
import { z } from "zod";

import {
  GovernmentWebsiteScraper,
  GovernmentScrapingConfig,
} from "../scrapers/GovernmentWebsiteScraper";
import {
  ImmigrationPolicyScraper,
  PolicyScrapingConfig,
} from "../scrapers/ImmigrationPolicyScraper";

// Task payload schemas
export const GovernmentScrapingPayloadSchema = z.object({
  config: z.object({
    url: z.string().url(),
    country: z.string(),
    agency: z.string(),
    documentType: z.enum([
      "policy",
      "form",
      "guidance",
      "legislation",
      "announcement",
      "statistics",
      "faq",
      "other",
    ]),
    language: z.string().default("en"),
    depth: z.number().int().min(1).max(5).default(2),
    extractTables: z.boolean().default(true),
    extractPDF: z.boolean().default(true),
    followLinks: z.boolean().default(true),
    timeout: z.number().int().min(5000).max(120000).default(30000),
    retries: z.number().int().min(0).max(5).default(2),
  }),
});

export const PolicyScrapingPayloadSchema = z.object({
  config: z.object({
    url: z.string().url(),
    country: z.string(),
    agency: z.string(),
    documentType: z.enum([
      "policy",
      "form",
      "guidance",
      "legislation",
      "announcement",
      "statistics",
      "faq",
      "other",
    ]),
    policyType: z.enum([
      "visa",
      "residency",
      "citizenship",
      "work_permit",
      "student_visa",
      "family_reunification",
      "asylum",
      "other",
    ]),
    language: z.string().default("en"),
    trackChanges: z.boolean().default(true),
    extractRequirements: z.boolean().default(true),
    extractTimelines: z.boolean().default(true),
    extractFees: z.boolean().default(true),
    extractEligibility: z.boolean().default(true),
    compareWithPrevious: z.boolean().default(true),
    previousVersionUrl: z.string().url().optional(),
  }),
});

export const BatchScrapingPayloadSchema = z.object({
  configs: z.array(GovernmentScrapingPayloadSchema.shape.config),
  batchSize: z.number().int().min(1).max(10).default(5),
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

  return { supabase, govScraper, policyScraper };
};

/**
 * Task: Scrape Government Sites
 *
 * Scrapes government immigration websites and extracts structured information.
 */
export const scrapeGovernmentSites = task({
  id: "scrape-government-sites",
  name: "Scrape Government Immigration Sites",
  version: "1.0.0",
  machine: "medium-1x",
  maxDuration: 600, // 10 minutes
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 30000,
    randomize: true,
  },
  run: async (
    payload: z.infer<typeof GovernmentScrapingPayloadSchema>,
    { ctx },
  ) => {
    ctx.logger.info("🏛️ Starting government website scraping", {
      url: payload.config.url,
      country: payload.config.country,
      agency: payload.config.agency,
    });

    const { govScraper } = initializeClients();

    const startTime = Date.now();
    const result = await govScraper.scrape(
      payload.config as GovernmentScrapingConfig,
    );
    const duration = Date.now() - startTime;

    ctx.logger.info("✅ Government scraping completed", {
      success: result.success,
      duration: `${duration}ms`,
      documentType: payload.config.documentType,
    });

    return {
      ...result,
      processingTime: duration,
    };
  },
});

/**
 * Task: Scrape Immigration Policies
 *
 * Specialized scraping for immigration policy documents with structured extraction.
 */
export const scrapeImmigrationPolicies = task({
  id: "scrape-immigration-policies",
  name: "Scrape Immigration Policies",
  version: "1.0.0",
  machine: "medium-2x",
  maxDuration: 900, // 15 minutes
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 30000,
    randomize: true,
  },
  run: async (
    payload: z.infer<typeof PolicyScrapingPayloadSchema>,
    { ctx },
  ) => {
    ctx.logger.info("📜 Starting immigration policy scraping", {
      url: payload.config.url,
      country: payload.config.country,
      policyType: payload.config.policyType,
    });

    const { policyScraper } = initializeClients();

    const startTime = Date.now();
    const result = await policyScraper.scrape(
      payload.config as PolicyScrapingConfig,
    );
    const duration = Date.now() - startTime;

    if (result.success) {
      const changesDetected = result.data.changes?.length || 0;
      ctx.logger.info("✅ Policy scraping completed", {
        duration: `${duration}ms`,
        changesDetected,
        requirementsCount: result.data.requirements?.length || 0,
      });

      // Trigger change detection if changes were found
      if (changesDetected > 0) {
        await ctx.waitFor("policy-change-detector", {
          country: payload.config.country,
          policyType: payload.config.policyType,
          currentContent: JSON.stringify(result.data),
          sourceUrl: payload.config.url,
          enableSemanticAnalysis: true,
          confidenceThreshold: 0.7,
        });
      }
    } else {
      ctx.logger.error("❌ Policy scraping failed", {
        error: result.error?.message,
      });
    }

    return {
      ...result,
      processingTime: duration,
    };
  },
});

/**
 * Task: Detect Policy Changes
 *
 * Compares policy versions and detects changes using AI analysis.
 */
export const detectPolicyChanges = task({
  id: "detect-policy-changes",
  name: "Detect Policy Changes",
  version: "1.0.0",
  machine: "small-2x",
  maxDuration: 300, // 5 minutes
  run: async (
    payload: {
      policyUrl: string;
      previousVersionUrl?: string;
      country: string;
      policyType: string;
    },
    { ctx },
  ) => {
    ctx.logger.info("🔍 Detecting policy changes", {
      policyUrl: payload.policyUrl,
      country: payload.country,
      policyType: payload.policyType,
    });

    const { policyScraper } = initializeClients();

    // Scrape current version
    const currentConfig: PolicyScrapingConfig = {
      url: payload.policyUrl,
      country: payload.country,
      agency: "Immigration Department",
      documentType: "policy",
      policyType: payload.policyType as any,
      trackChanges: true,
      compareWithPrevious: !!payload.previousVersionUrl,
      previousVersionUrl: payload.previousVersionUrl,
      extractRequirements: true,
      extractTimelines: true,
      extractFees: true,
      extractEligibility: true,
    };

    const result = await policyScraper.scrape(currentConfig);

    if (result.success) {
      const changesDetected = result.data.changes?.length || 0;
      ctx.logger.info("✅ Change detection completed", {
        changesDetected,
        hasComparison: !!payload.previousVersionUrl,
      });

      return {
        success: true,
        policyUrl: payload.policyUrl,
        country: payload.country,
        policyType: payload.policyType,
        changesDetected,
        changes: result.data.changes || [],
        timestamp: new Date().toISOString(),
      };
    } else {
      ctx.logger.error("❌ Change detection failed", {
        error: result.error?.message,
      });

      return {
        success: false,
        policyUrl: payload.policyUrl,
        error: result.error,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

/**
 * Task: Extract Requirements
 *
 * Extracts structured requirements from immigration policy documents.
 */
export const extractRequirements = task({
  id: "extract-requirements",
  name: "Extract Immigration Requirements",
  version: "1.0.0",
  machine: "small-1x",
  maxDuration: 300, // 5 minutes
  run: async (
    payload: {
      policyUrl: string;
      country: string;
      policyType: string;
    },
    { ctx },
  ) => {
    ctx.logger.info("📋 Extracting requirements", {
      policyUrl: payload.policyUrl,
      country: payload.country,
      policyType: payload.policyType,
    });

    const { policyScraper } = initializeClients();

    const config: PolicyScrapingConfig = {
      url: payload.policyUrl,
      country: payload.country,
      agency: "Immigration Department",
      documentType: "policy",
      policyType: payload.policyType as any,
      extractRequirements: true,
      extractTimelines: false,
      extractFees: false,
      extractEligibility: false,
      compareWithPrevious: false,
    };

    const result = await policyScraper.scrape(config);

    if (result.success) {
      const requirementsCount = result.data.requirements?.length || 0;
      ctx.logger.info("✅ Requirements extraction completed", {
        requirementsCount,
      });

      return {
        success: true,
        policyUrl: payload.policyUrl,
        country: payload.country,
        policyType: payload.policyType,
        requirements: result.data.requirements || [],
        timestamp: new Date().toISOString(),
      };
    } else {
      ctx.logger.error("❌ Requirements extraction failed", {
        error: result.error?.message,
      });

      return {
        success: false,
        policyUrl: payload.policyUrl,
        error: result.error,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

/**
 * Task: Batch Government Scraping
 *
 * Scrapes multiple government websites in parallel batches.
 */
export const batchGovernmentScraping = task({
  id: "batch-government-scraping",
  name: "Batch Government Scraping",
  version: "1.0.0",
  machine: "large-1x",
  maxDuration: 1800, // 30 minutes
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 60000,
  },
  run: async (payload: z.infer<typeof BatchScrapingPayloadSchema>, { ctx }) => {
    ctx.logger.info("🔄 Starting batch government scraping", {
      configsCount: payload.configs.length,
      batchSize: payload.batchSize,
    });

    const { govScraper } = initializeClients();
    const results = [];
    const errors = [];

    // Process configs in batches
    for (let i = 0; i < payload.configs.length; i += payload.batchSize) {
      const batch = payload.configs.slice(i, i + payload.batchSize);

      ctx.logger.info(
        `📊 Processing batch ${Math.floor(i / payload.batchSize) + 1}/${Math.ceil(payload.configs.length / payload.batchSize)}`,
      );

      // Process batch in parallel
      const batchPromises = batch.map(async (config) => {
        try {
          const result = await govScraper.scrape(
            config as GovernmentScrapingConfig,
          );
          return {
            success: result.success,
            config: {
              url: config.url,
              country: config.country,
              agency: config.agency,
            },
            result,
          };
        } catch (error: any) {
          ctx.logger.error(`❌ Failed to scrape: ${config.url}`, {
            error: error.message,
          });

          return {
            success: false,
            config: {
              url: config.url,
              country: config.country,
              agency: config.agency,
            },
            error: error.message,
          };
        }
      });

      const batchResults = await Promise.allSettled(batchPromises);

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
            config: { url: "unknown" },
            error: result.reason.message || "Unknown error",
          });
        }
      }

      // Add delay between batches
      if (i + payload.batchSize < payload.configs.length) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    ctx.logger.info("✅ Batch government scraping completed", {
      successful: results.length,
      failed: errors.length,
    });

    return {
      success: true,
      summary: {
        configsProcessed: results.length,
        configsFailed: errors.length,
        totalConfigs: payload.configs.length,
      },
      results,
      errors,
      timestamp: new Date().toISOString(),
    };
  },
});

/**
 * Scheduled Task: Monitor Government Websites
 *
 * Regularly checks government websites for updates and changes.
 */
export const monitorGovernmentWebsites = schedules.task({
  id: "monitor-government-websites",
  name: "Monitor Government Websites",
  version: "1.0.0",
  cron: "0 0 * * *", // Daily at midnight
  timezone: "UTC",
  machine: "medium-1x",
  maxDuration: 3600, // 1 hour
  run: async (payload, { ctx }) => {
    ctx.logger.info("🔄 Starting scheduled government website monitoring");

    const { supabase } = initializeClients();

    try {
      // Get active government data sources
      const { data: sources, error } = await supabase
        .from("data_sources")
        .select("*")
        .eq("type", "government")
        .eq("is_active", true)
        .order("last_updated", { ascending: true });

      if (error) throw error;

      ctx.logger.info(
        `📊 Found ${sources.length} government sources to monitor`,
      );

      // Prepare batch scraping configs
      const configs = sources.map((source) => ({
        url: source.url,
        country: source.metadata.country,
        agency: source.metadata.agency,
        documentType: source.metadata.documentType || "other",
        language: source.metadata.language || "en",
        depth: 2,
        extractTables: true,
        extractPDF: true,
        followLinks: true,
      }));

      // Trigger batch scraping
      const batchResult = await ctx.waitFor("batch-government-scraping", {
        configs,
        batchSize: 5,
      });

      // Update last_updated timestamps
      const updatePromises = sources.map((source) =>
        supabase
          .from("data_sources")
          .update({ last_updated: new Date().toISOString() })
          .eq("id", source.id),
      );

      await Promise.all(updatePromises);

      ctx.logger.info("✅ Scheduled monitoring completed", {
        sourcesMonitored: sources.length,
        successful: batchResult.summary.configsProcessed,
        failed: batchResult.summary.configsFailed,
      });

      return {
        success: true,
        sourcesMonitored: sources.length,
        successful: batchResult.summary.configsProcessed,
        failed: batchResult.summary.configsFailed,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Scheduled monitoring failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

// Export all tasks
export const governmentScrapingTasks = {
  scrapeGovernmentSites,
  scrapeImmigrationPolicies,
  detectPolicyChanges,
  extractRequirements,
  batchGovernmentScraping,
  monitorGovernmentWebsites,
};
