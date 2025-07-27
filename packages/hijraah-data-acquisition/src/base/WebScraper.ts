import { task } from "@trigger.dev/sdk";
import type {
  WebScraper as IWebScraper,
  ScrapingConfig,
  ScrapingResult,
  ChangeDetectionResult,
  ValidationResult,
  BatchConfig,
} from "../interfaces/index.js";
import { ScrapingConfigSchema } from "../types/index.js";
import PQueue from "p-queue";
import pRetry from "p-retry";

/**
 * Base WebScraper class implementing Context7 patterns
 * Provides foundation for government website scraping with Trigger.dev integration
 */
export abstract class BaseWebScraper implements IWebScraper {
  protected queue: PQueue;
  protected defaultBatchConfig: BatchConfig;

  constructor(concurrency: number = 5) {
    this.queue = new PQueue({ concurrency });
    this.defaultBatchConfig = {
      batchSize: 10,
      concurrency: 5,
      retryAttempts: 3,
      retryDelay: 1000,
      timeout: 30000,
    };
  }

  /**
   * Abstract method for implementing specific scraping logic
   */
  protected abstract performScrape(
    config: ScrapingConfig,
  ): Promise<ScrapingResult>;

  /**
   * Scrape a single URL with retry logic and error handling
   */
  async scrape(config: ScrapingConfig): Promise<ScrapingResult> {
    // Validate configuration
    const validation = await this.validateConfig(config);
    if (!validation.isValid) {
      throw new Error(
        `Invalid scraping configuration: ${validation.errors.join(", ")}`,
      );
    }

    return pRetry(
      async () => {
        const startTime = Date.now();

        try {
          const result = await this.performScrape(config);

          // Add processing time to metadata
          result.metadata.processingTime = Date.now() - startTime;

          return result;
        } catch (error) {
          console.error(`Scraping failed for ${config.url}:`, error);
          throw error;
        }
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 10000,
        onFailedAttempt: (error) => {
          console.warn(
            `Scraping attempt ${error.attemptNumber} failed for ${config.url}. ${error.retriesLeft} retries left.`,
          );
        },
      },
    );
  }

  /**
   * Scrape multiple URLs in batch with concurrency control
   */
  async batchScrape(
    configs: ScrapingConfig[],
    batchConfig: BatchConfig = this.defaultBatchConfig,
  ): Promise<ScrapingResult[]> {
    const results: ScrapingResult[] = [];
    const errors: Array<{ config: ScrapingConfig; error: Error }> = [];

    // Process in batches
    for (let i = 0; i < configs.length; i += batchConfig.batchSize) {
      const batch = configs.slice(i, i + batchConfig.batchSize);

      const batchPromises = batch.map((config) =>
        this.queue.add(async () => {
          try {
            return await this.scrape(config);
          } catch (error) {
            errors.push({ config, error: error as Error });
            // Return a failed result instead of throwing
            return {
              success: false,
              data: null,
              metadata: {
                url: config.url,
                scrapedAt: new Date(),
                processingTime: 0,
                contentLength: 0,
                statusCode: 0,
              },
              errors: [error instanceof Error ? error.message : String(error)],
            };
          }
        }),
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Add delay between batches if specified
      if (
        batchConfig.retryDelay > 0 &&
        i + batchConfig.batchSize < configs.length
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, batchConfig.retryDelay),
        );
      }
    }

    // Log batch completion statistics
    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.length - successCount;

    console.log(
      `Batch scraping completed: ${successCount} successful, ${failureCount} failed out of ${configs.length} total`,
    );

    return results;
  }

  /**
   * Monitor a URL for changes using periodic checking
   */
  async monitorChanges(
    url: string,
    checkInterval: number,
  ): Promise<ChangeDetectionResult> {
    // This is a simplified implementation
    // In a real implementation, you would store previous content and compare
    const config: ScrapingConfig = { url };
    const currentResult = await this.scrape(config);

    // For now, return no changes detected
    // This would be enhanced with actual change detection logic
    return {
      hasChanges: false,
      changes: [],
      metadata: {
        checkedAt: new Date(),
        changeScore: 0,
      },
    };
  }

  /**
   * Extract structured data from scraped content
   */
  async extractStructuredData(
    content: string,
    schema: Record<string, any>,
  ): Promise<any> {
    // This would integrate with AI SDK for structured extraction
    // For now, return a placeholder implementation
    return {
      extracted: true,
      schema,
      content: content.substring(0, 100) + "...",
      extractedAt: new Date(),
    };
  }

  /**
   * Validate scraping configuration
   */
  async validateConfig(config: ScrapingConfig): Promise<ValidationResult> {
    try {
      ScrapingConfigSchema.parse(config);

      // Additional validation logic
      const errors: string[] = [];
      const warnings: string[] = [];

      // Check URL accessibility (basic validation)
      try {
        new URL(config.url);
      } catch {
        errors.push("Invalid URL format");
      }

      // Check timeout values
      if (config.timeout && config.timeout < 1000) {
        warnings.push("Timeout less than 1 second may cause failures");
      }

      // Check wait time
      if (config.waitFor && config.waitFor > 30000) {
        warnings.push("Wait time greater than 30 seconds may cause timeouts");
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        score: errors.length === 0 ? (warnings.length === 0 ? 1 : 0.8) : 0,
        metadata: {
          validatedAt: new Date(),
          configType: "scraping",
        },
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [error instanceof Error ? error.message : String(error)],
        warnings: [],
        score: 0,
        metadata: {
          validatedAt: new Date(),
          configType: "scraping",
        },
      };
    }
  }

  /**
   * Create a Trigger.dev v4 task for scraping
   */
  static createScrapingTask(taskId: string, scraper: BaseWebScraper) {
    return task({
      id: taskId,
      machine: "small-2x", // Adequate resources for web scraping
      maxDuration: 300, // 5 minutes
      retry: {
        maxAttempts: 3,
        factor: 2,
        minTimeoutInMs: 1000,
        maxTimeoutInMs: 10000,
        randomize: true,
      },
      run: async (payload: { config: ScrapingConfig }, { ctx }) => {
        console.log(`🕷️ Starting scraping task for ${payload.config.url}`);

        const result = await scraper.scrape(payload.config);

        console.log(
          `✅ Scraping completed for ${payload.config.url} - Success: ${result.success}`,
        );
        return result;
      },
    });
  }

  /**
   * Create a Trigger.dev v4 task for batch scraping
   */
  static createBatchScrapingTask(taskId: string, scraper: BaseWebScraper) {
    return task({
      id: taskId,
      machine: "large-1x", // More resources for batch operations
      maxDuration: 1800, // 30 minutes for batch operations
      retry: {
        maxAttempts: 2,
        factor: 1.5,
        minTimeoutInMs: 2000,
        maxTimeoutInMs: 20000,
        randomize: true,
      },
      run: async (
        payload: {
          configs: ScrapingConfig[];
          batchConfig?: BatchConfig;
        },
        { ctx },
      ) => {
        console.log(
          `🔄 Starting batch scraping for ${payload.configs.length} URLs`,
        );

        const results = await scraper.batchScrape(
          payload.configs,
          payload.batchConfig,
        );

        const successCount = results.filter((r) => r.success).length;
        console.log(
          `✅ Batch scraping completed: ${successCount}/${results.length} successful`,
        );

        return results;
      },
    });
  }

  /**
   * Create a Trigger.dev v4 scheduled task for monitoring changes
   */
  static createMonitoringTask(taskId: string, scraper: BaseWebScraper) {
    return task({
      id: taskId,
      machine: "small-1x",
      maxDuration: 180, // 3 minutes
      retry: {
        maxAttempts: 2,
        factor: 1.5,
        minTimeoutInMs: 1000,
        maxTimeoutInMs: 5000,
        randomize: true,
      },
      run: async (
        payload: {
          url: string;
          checkInterval: number;
        },
        { ctx },
      ) => {
        console.log(`👀 Monitoring changes for ${payload.url}`);

        const result = await scraper.monitorChanges(
          payload.url,
          payload.checkInterval,
        );

        console.log(
          `🔍 Change monitoring completed - Changes detected: ${result.hasChanges}`,
        );
        return result;
      },
    });
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    await this.queue.onIdle();
    this.queue.clear();
  }
}
