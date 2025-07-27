import { Buffer } from "buffer";
import { createHash } from "crypto";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // Using AWS SDK v3 for S3 (R2 compatible)
import { createClient, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";

import { FirecrawlClient } from "./client";
import { CountryConfig, CountryConfigType } from "./config";

// Define a type for the Supabase client
type SupabaseDBClient = SupabaseClient<Database>;

export class ScraperService {
  private firecrawl: FirecrawlClient;
  private supabaseAdmin: SupabaseDBClient;
  private r2Client: S3Client;
  private r2BucketName: string;

  constructor(
    firecrawlApiKey: string,
    supabaseUrl: string,
    supabaseServiceKey: string,
    r2Endpoint: string,
    r2AccountId: string,
    r2AccessKeyId: string,
    r2SecretAccessKey: string,
    r2BucketName: string
  ) {
    this.firecrawl = new FirecrawlClient(firecrawlApiKey);
    // Use service role key for admin operations
    this.supabaseAdmin = createClient<Database>(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: { persistSession: false },
      }
    );

    // Configure R2 Client (using AWS SDK v3 pattern)
    this.r2Client = new S3Client({
      region: "auto", // R2 region is typically 'auto'
      endpoint: r2Endpoint, // e.g., https://<ACCOUNT_ID>.r2.cloudflarestorage.com
      credentials: {
        accessKeyId: r2AccessKeyId,
        secretAccessKey: r2SecretAccessKey,
      },
    });
    this.r2BucketName = r2BucketName;
  }

  private async uploadToR2(key: string, content: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.r2BucketName,
      Key: key,
      Body: Buffer.from(content, "utf-8"),
      ContentType: "text/markdown; charset=utf-8", // Assuming markdown
    });

    try {
      await this.r2Client.send(command);
      console.log(
        `Successfully uploaded ${key} to R2 bucket ${this.r2BucketName}`
      );
      return key;
    } catch (error) {
      console.error(`Failed to upload ${key} to R2:`, error);
      throw new Error(`Failed to upload to R2: ${error.message}`);
    }
  }

  private async getActiveScrapeConfigs(): Promise<CountryConfigType[]> {
    const { data, error } = await this.supabaseAdmin
      .from("scrape_configurations")
      .select("*")
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching scrape configurations:", error);
      throw new Error(`Failed to fetch scrape configs: ${error.message}`);
    }

    // Validate fetched data against Zod schema
    return data.map((config) =>
      CountryConfig.parse({
        ...config,
        selectors:
          typeof config.selectors === "string"
            ? JSON.parse(config.selectors)
            : config.selectors,
      })
    );
  }

  async getScrapeConfigById(
    configId: string
  ): Promise<CountryConfigType | null> {
    console.log(`Fetching scrape configuration by ID: ${configId}`);
    const { data, error } = await this.supabaseAdmin
      .from("scrape_configurations")
      .select("*")
      .eq("id", configId)
      .single(); // Expecting a single result or null

    if (error) {
      if (error.code === "PGRST116") {
        // PostgREST error for "Fetched zero rows"
        console.warn(`No scrape configuration found with ID: ${configId}`);
        return null;
      }
      console.error(
        `Error fetching scrape configuration ${configId}: Code ${error.code}`,
        error.message,
        error.details
      );
      throw new Error(
        `Failed to fetch scrape config ${configId}: ${error.message}`
      );
    }

    if (!data) {
      console.warn(
        `No data returned for scrape configuration ID: ${configId}, though no specific error was thrown.`
      );
      return null;
    }

    // Validate fetched data against Zod schema
    try {
      return CountryConfig.parse({
        ...data,
        selectors:
          typeof data.selectors === "string"
            ? JSON.parse(data.selectors)
            : data.selectors,
      });
    } catch (validationError) {
      const errorMessage =
        validationError instanceof Error
          ? validationError.message
          : String(validationError);
      console.error(
        `Validation error for scrape configuration ${configId}:`,
        errorMessage
      );
      throw new Error(
        `Invalid scrape configuration data for ${configId}: ${errorMessage}`
      );
    }
  }

  async processScrapeConfig(config: CountryConfigType) {
    console.log(`Processing scrape config: ${config.name}`);
    const urlsToScrape = config.paths.map((path) => `${config.baseUrl}${path}`);
    let successCount = 0;

    for (const url of urlsToScrape) {
      try {
        console.log(`Scraping URL: ${url}`);
        const scrapeResult = await this.firecrawl.scrapeUrl(url, config);

        if (scrapeResult.success && scrapeResult.markdown) {
          const content = scrapeResult.markdown;
          const contentHash = createHash("sha256")
            .update(content)
            .digest("hex");

          // Check if content has changed (optional, R2 versioning might be better)
          const { data: existingSource } = await this.supabaseAdmin
            .from("scraped_sources")
            .select("content_hash")
            .eq("url", url)
            .single();

          if (existingSource && existingSource.content_hash === contentHash) {
            console.log(`Content for ${url} hasn't changed. Skipping upload.`);
            // Optionally update last_scraped_at timestamp even if content is same
            await this.supabaseAdmin
              .from("scraped_sources")
              .update({ last_scraped_at: new Date().toISOString() })
              .eq("url", url);
            successCount++;
            continue;
          }

          // Generate R2 key (e.g., based on hostname and path)
          const urlObject = new URL(url);
          const r2Key = `${urlObject.hostname}${urlObject.pathname.replace(/\//g, "_") || "_index"}.md`;

          // Upload content to R2
          await this.uploadToR2(r2Key, content);

          // Upsert metadata into Supabase
          const { error: upsertError } = await this.supabaseAdmin
            .from("scraped_sources")
            .upsert(
              {
                url: url,
                title: scrapeResult.metadata.title || config.name, // Use title from metadata or config name
                source_type: config.source_type,
                country_code: config.country_code,
                r2_object_key: r2Key,
                autorag_indexed: false, // AutoRAG should pick this up from R2
                last_scraped_at: new Date().toISOString(),
                content_hash: contentHash,
                metadata: scrapeResult.metadata, // Store original Firecrawl metadata
              },
              { onConflict: "url" }
            );

          if (upsertError) {
            console.error(`Failed to upsert metadata for ${url}:`, upsertError);
            // Decide if we should continue or throw
          } else {
            console.log(
              `Successfully processed and stored metadata for ${url}`
            );
            successCount++;
          }
        } else {
          console.error(
            `Failed to scrape ${url}: ${scrapeResult.error || "No markdown content"}`
          );
          // Optionally log failed scrapes to a separate table or monitoring system
        }
      } catch (error) {
        console.error(
          `Error processing URL ${url} for config ${config.name}:`,
          error
        );
      }

      // Add delay between requests to be respectful
      await new Promise((resolve) =>
        setTimeout(resolve, config.rateLimit || 1000)
      );
    }
    console.log(
      `Finished processing config ${config.name}. Successes: ${successCount}/${urlsToScrape.length}`
    );
  }

  async runAllActiveScrapers() {
    console.log("Starting scraper service run...");
    const activeConfigs = await this.getActiveScrapeConfigs();
    console.log(`Found ${activeConfigs.length} active configurations.`);

    for (const config of activeConfigs) {
      await this.processScrapeConfig(config);
      // Add a larger delay between processing different configurations if needed
      // await new Promise(resolve => setTimeout(resolve, 5000));
    }

    console.log("Scraper service run finished.");
  }

  /**
   * Tracks changes in a website content compared to previous scrape
   *
   * @param url URL to track changes for
   * @param options Options for change tracking
   * @returns The result of the scrape with change tracking information
   */
  async trackWebsiteChanges(
    url: string,
    options?: {
      modes?: ("git-diff" | "json")[];
      jsonSchema?: Record<string, any>;
    }
  ) {
    console.log(`Tracking changes for URL: ${url}`);

    // Create a minimal configuration that satisfies CountryConfigType
    const scrapeConfig: Partial<CountryConfigType> = {
      name: "change-tracking",
      baseUrl: new URL(url).origin,
      paths: [new URL(url).pathname],
      language: "en",
      rateLimit: 1000,
      selectors: {
        content: "body",
        title: "title",
      },
      source_type: "website",
      is_active: true,
      trackChanges: true,
      pageOptions: {
        formats: ["markdown", "html", "changeTracking"],
        changeTrackingOptions: {
          modes: options?.modes || ["git-diff"],
          schema: options?.jsonSchema,
        },
      },
    };

    try {
      // Perform the scrape with change tracking enabled
      const result = await this.firecrawl.scrapeUrl(url, scrapeConfig);

      if (!result.success) {
        console.error(`Failed to track changes for ${url}: ${result.error}`);
        throw new Error(result.error || "Failed to track website changes");
      }

      // Check if change tracking data is available
      if (!result.changeTracking) {
        console.log(
          `No change tracking data available for ${url}. This might be the first scrape.`
        );
        return {
          url,
          success: true,
          changeTracking: {
            previousScrapeAt: null,
            changeStatus: "new",
            visibility: "visible",
          },
          content: result.markdown || result.html,
          metadata: result.metadata,
        };
      }

      // Return result with change tracking information
      console.log(
        `Successfully tracked changes for ${url}. Status: ${result.changeTracking.changeStatus}`
      );
      return {
        url,
        success: true,
        changeTracking: result.changeTracking,
        content: result.markdown || result.html,
        metadata: result.metadata,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`Error tracking changes for ${url}:`, errorMessage);
      throw error;
    }
  }

  // Add a method to track changes for all active configs
  async trackChangesForAllActiveConfigs() {
    console.log("Starting change tracking for all active configurations...");
    const activeConfigs = await this.getActiveScrapeConfigs();
    console.log(
      `Found ${activeConfigs.length} active configurations to track.`
    );

    const results: Record<string, any> = {};

    for (const config of activeConfigs) {
      // Skip if trackChanges is not explicitly set to true
      if (config.trackChanges !== true) {
        console.log(
          `Skipping change tracking for ${config.name} (not enabled)`
        );
        continue;
      }

      console.log(`Tracking changes for config: ${config.name}`);
      const configResults: Record<string, any> = {};

      for (const path of config.paths) {
        const url = `${config.baseUrl}${path}`;
        try {
          const changeResult = await this.trackWebsiteChanges(url);
          configResults[path] = {
            success: true,
            changeStatus:
              changeResult.changeTracking?.changeStatus || "unknown",
            previousScrapeAt: changeResult.changeTracking?.previousScrapeAt,
          };
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.error(`Failed to track changes for ${url}:`, errorMessage);
          configResults[path] = {
            success: false,
            error: errorMessage,
          };
        }

        // Add delay between requests to be respectful
        await new Promise((resolve) =>
          setTimeout(resolve, config.rateLimit || 1000)
        );
      }

      results[config.name] = configResults;
    }

    console.log("Change tracking run completed.");
    return results;
  }
}
