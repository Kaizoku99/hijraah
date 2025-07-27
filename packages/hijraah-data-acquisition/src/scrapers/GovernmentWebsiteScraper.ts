/**
 * Government Website Scraper
 *
 * Specialized scraper for government immigration websites using Firecrawl integration.
 * Handles complex government website structures, policy documents, and multi-language content.
 */

import { BaseWebScraper } from "../base/WebScraper";
import { ScrapingConfig, ScrapingResult } from "../interfaces";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import FirecrawlApp from "@mendable/firecrawl-js";

// Government website scraping configuration schema
export const GovernmentScrapingConfigSchema = z.object({
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
  linkPatterns: z.array(z.string()).optional(),
  excludePatterns: z.array(z.string()).optional(),
  waitForSelector: z.string().optional(),
  javascript: z.boolean().default(true),
  userAgent: z.string().optional(),
  proxy: z.boolean().default(false),
  timeout: z.number().int().min(5000).max(120000).default(30000),
  retries: z.number().int().min(0).max(5).default(2),
});

export type GovernmentScrapingConfig = z.infer<
  typeof GovernmentScrapingConfigSchema
>;

// Structured government data schema
export const GovernmentDataSchema = z.object({
  title: z.string(),
  summary: z.string(),
  lastUpdated: z.string().optional(),
  effectiveDate: z.string().optional(),
  content: z.object({
    sections: z.array(
      z.object({
        heading: z.string(),
        content: z.string(),
        subsections: z
          .array(
            z.object({
              heading: z.string(),
              content: z.string(),
            }),
          )
          .optional(),
      }),
    ),
    tables: z
      .array(
        z.object({
          caption: z.string().optional(),
          headers: z.array(z.string()),
          rows: z.array(z.array(z.string())),
        }),
      )
      .optional(),
    forms: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
          description: z.string().optional(),
        }),
      )
      .optional(),
    relatedLinks: z
      .array(
        z.object({
          title: z.string(),
          url: z.string(),
          description: z.string().optional(),
        }),
      )
      .optional(),
  }),
  metadata: z.object({
    source: z.string(),
    country: z.string(),
    agency: z.string(),
    documentType: z.string(),
    language: z.string(),
    scrapedAt: z.string(),
  }),
});

export type GovernmentData = z.infer<typeof GovernmentDataSchema>;

/**
 * Government Website Scraper class for immigration-related government websites
 */
export class GovernmentWebsiteScraper extends BaseWebScraper {
  private firecrawlClient: FirecrawlApp;
  private supabaseClient: any;

  /**
   * Create a new GovernmentWebsiteScraper
   */
  constructor(
    firecrawlApiKey: string,
    supabaseUrl: string,
    supabaseKey: string,
  ) {
    super();

    // Initialize Firecrawl client
    this.firecrawlClient = new FirecrawlApp({
      apiKey: firecrawlApiKey,
    });

    // Initialize Supabase client for storing results
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Perform the actual scraping operation
   */
  protected async performScrape(
    config: ScrapingConfig,
  ): Promise<ScrapingResult> {
    try {
      // Validate and parse the config using Zod
      const govConfig = GovernmentScrapingConfigSchema.parse(config);

      console.log(`🌐 Scraping government website: ${govConfig.url}`);
      console.log(
        `🏛️ Agency: ${govConfig.agency}, Country: ${govConfig.country}`,
      );

      // Step 1: Scrape the website using Firecrawl with structured extraction
      const scrapeOptions = {
        formats: ["markdown", "extract"] as const,
        extract: {
          schema: GovernmentDataSchema.shape.content,
          prompt: `Extract structured information from this ${govConfig.documentType} document from ${govConfig.agency} in ${govConfig.country}. 
          Focus on:
          - Main sections and their content
          - Any tables with data
          - Forms or applications mentioned
          - Related links and resources
          - Key dates and requirements`,
          systemPrompt: `You are an expert at extracting structured information from government immigration documents. 
          Pay special attention to requirements, procedures, timelines, fees, and eligibility criteria.`,
        },
        onlyMainContent: true,
        timeout: govConfig.timeout,
      };

      const scrapeResult = await this.firecrawlClient.scrapeUrl(
        govConfig.url,
        scrapeOptions,
      );

      if (!scrapeResult.success) {
        throw new Error(`Firecrawl scraping failed: ${scrapeResult.error}`);
      }

      // Step 2: Process and structure the extracted data
      const processedData = await this.processGovernmentData(
        scrapeResult,
        govConfig,
      );

      // Step 3: Store the results in Supabase
      const storageResult = await this.storeScrapingResult(
        processedData,
        govConfig,
      );

      // Step 4: Return the successful result
      return {
        success: true,
        url: govConfig.url,
        timestamp: new Date().toISOString(),
        data: processedData,
        metadata: {
          country: govConfig.country,
          agency: govConfig.agency,
          documentType: govConfig.documentType,
          processingTimeMs: Date.now() - new Date().getTime(),
          storageId: storageResult.id,
          firecrawlMetadata: scrapeResult.metadata,
        },
      };
    } catch (error: any) {
      console.error(`❌ Scraping failed for ${config.url}:`, error);

      // Return error result
      return {
        success: false,
        url: config.url,
        timestamp: new Date().toISOString(),
        error: {
          message: error.message,
          code: error.code || "SCRAPING_ERROR",
          details: error.details || {},
        },
      };
    }
  }

  /**
   * Process and structure government website data
   */
  private async processGovernmentData(
    scrapeResult: any,
    config: GovernmentScrapingConfig,
  ): Promise<GovernmentData> {
    console.log("🔄 Processing government data");

    // Extract basic information from the scraped content
    const markdown = scrapeResult.data?.markdown || "";
    const extractedData = scrapeResult.data?.extract || {};
    const metadata = scrapeResult.data?.metadata || {};

    // Generate title and summary from markdown if not extracted
    const title =
      metadata.title ||
      this.extractTitleFromMarkdown(markdown) ||
      `${config.documentType} - ${config.agency}`;
    const summary = this.generateSummary(markdown, extractedData);

    // Process the structured data
    const processedContent = {
      sections: this.processSections(extractedData.sections || [], markdown),
      tables: this.processTables(extractedData.tables || []),
      forms: this.processForms(extractedData.forms || []),
      relatedLinks: this.processRelatedLinks(extractedData.relatedLinks || []),
    };

    // Create the final structured data
    const governmentData: GovernmentData = {
      title,
      summary,
      lastUpdated: metadata.lastModified || new Date().toISOString(),
      effectiveDate: this.extractEffectiveDate(markdown),
      content: processedContent,
      metadata: {
        source: config.url,
        country: config.country,
        agency: config.agency,
        documentType: config.documentType,
        language: config.language,
        scrapedAt: new Date().toISOString(),
      },
    };

    return governmentData;
  }

  /**
   * Extract title from markdown content
   */
  private extractTitleFromMarkdown(markdown: string): string | null {
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : null;
  }

  /**
   * Generate summary from content
   */
  private generateSummary(markdown: string, extractedData: any): string {
    // Try to get summary from extracted data first
    if (extractedData.summary) {
      return extractedData.summary;
    }

    // Generate summary from first few paragraphs of markdown
    const paragraphs = markdown
      .split("\n\n")
      .filter(
        (p) =>
          p.trim() &&
          !p.startsWith("#") &&
          !p.startsWith("*") &&
          !p.startsWith("-") &&
          p.length > 50,
      );

    if (paragraphs.length > 0) {
      const firstParagraph = paragraphs[0].trim();
      return firstParagraph.length > 200
        ? firstParagraph.substring(0, 200) + "..."
        : firstParagraph;
    }

    return "Government document with immigration-related information.";
  }

  /**
   * Process sections from extracted data
   */
  private processSections(sections: any[], markdown: string): any[] {
    if (sections && sections.length > 0) {
      return sections.map((section) => ({
        heading: section.heading || "Untitled Section",
        content: section.content || "",
        subsections: section.subsections || [],
      }));
    }

    // Fallback: extract sections from markdown
    return this.extractSectionsFromMarkdown(markdown);
  }

  /**
   * Extract sections from markdown content
   */
  private extractSectionsFromMarkdown(markdown: string): any[] {
    const sections: any[] = [];
    const lines = markdown.split("\n");
    let currentSection: any = null;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check for section headers (## or ###)
      if (trimmedLine.match(/^#{2,3}\s+/)) {
        // Save previous section
        if (currentSection) {
          sections.push(currentSection);
        }

        // Start new section
        currentSection = {
          heading: trimmedLine.replace(/^#{2,3}\s+/, ""),
          content: "",
          subsections: [],
        };
      } else if (currentSection && trimmedLine) {
        // Add content to current section
        currentSection.content +=
          (currentSection.content ? "\n" : "") + trimmedLine;
      }
    }

    // Add the last section
    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  }

  /**
   * Process tables from extracted data
   */
  private processTables(tables: any[]): any[] {
    return tables.map((table) => ({
      caption: table.caption || "",
      headers: table.headers || [],
      rows: table.rows || [],
    }));
  }

  /**
   * Process forms from extracted data
   */
  private processForms(forms: any[]): any[] {
    return forms.map((form) => ({
      name: form.name || "Unnamed Form",
      url: form.url || "",
      description: form.description || "",
    }));
  }

  /**
   * Process related links from extracted data
   */
  private processRelatedLinks(links: any[]): any[] {
    return links.map((link) => ({
      title: link.title || "Untitled Link",
      url: link.url || "",
      description: link.description || "",
    }));
  }

  /**
   * Extract effective date from content
   */
  private extractEffectiveDate(markdown: string): string | undefined {
    const datePatterns = [
      /effective\s+(?:date|from):\s*([^\n]+)/i,
      /effective\s+([^\n]+)/i,
      /last\s+updated:\s*([^\n]+)/i,
      /updated\s+on:\s*([^\n]+)/i,
    ];

    for (const pattern of datePatterns) {
      const match = markdown.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return undefined;
  }

  /**
   * Store scraping results in Supabase
   */
  private async storeScrapingResult(
    data: GovernmentData,
    config: GovernmentScrapingConfig,
  ): Promise<any> {
    console.log("💾 Storing scraping results in Supabase");

    try {
      // Store in collection_results table
      const { data: insertedData, error } = await this.supabaseClient
        .from("collection_results")
        .insert({
          status: "success",
          data: data,
          metadata: {
            url: config.url,
            country: config.country,
            agency: config.agency,
            documentType: config.documentType,
            language: config.language,
            title: data.title,
            sectionsCount: data.content.sections.length,
            tablesCount: data.content.tables?.length || 0,
            formsCount: data.content.forms?.length || 0,
            linksCount: data.content.relatedLinks?.length || 0,
          },
          items_collected: 1,
        })
        .select("id")
        .single();

      if (error) throw error;

      return { id: insertedData.id };
    } catch (error) {
      console.error("Failed to store scraping results:", error);
      return { id: null, error };
    }
  }

  /**
   * Scrape multiple government websites in batch
   */
  async scrapeBatch(
    configs: GovernmentScrapingConfig[],
  ): Promise<ScrapingResult[]> {
    console.log(
      `🔄 Starting batch scraping of ${configs.length} government websites`,
    );

    const results: ScrapingResult[] = [];

    // Process in batches to avoid overwhelming the API
    const batchSize = 5;
    for (let i = 0; i < configs.length; i += batchSize) {
      const batch = configs.slice(i, i + batchSize);

      const batchPromises = batch.map((config) => this.scrape(config));
      const batchResults = await Promise.allSettled(batchPromises);

      for (const result of batchResults) {
        if (result.status === "fulfilled") {
          results.push(result.value);
        } else {
          console.error("Batch scraping error:", result.reason);
          results.push({
            success: false,
            url: "unknown",
            timestamp: new Date().toISOString(),
            error: {
              message: result.reason.message || "Unknown error",
              code: "BATCH_ERROR",
              details: {},
            },
          });
        }
      }

      // Add delay between batches to be respectful to servers
      if (i + batchSize < configs.length) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    console.log(
      `✅ Batch scraping completed: ${results.filter((r) => r.success).length}/${results.length} successful`,
    );

    return results;
  }
}
