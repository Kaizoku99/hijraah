import { Redis } from "@upstash/redis";
import FirecrawlApp from "@mendable/firecrawl-js";
import { createHijraahAI, type GenerationRequest } from "@hijraah/ai";
import { z } from "zod";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { createHash } from "crypto";

// Document processing types and schemas
export const DocumentSchema = z.object({
  id: z.string(),
  url: z.string().url().optional(),
  content: z.string(),
  title: z.string().optional(),
  format: z.enum(["pdf", "docx", "html", "markdown", "text", "webpage"]),
  metadata: z.record(z.any()).optional(),
  chunks: z
    .array(
      z.object({
        id: z.string(),
        content: z.string(),
        metadata: z.record(z.any()).optional(),
        embedding: z.array(z.number()).optional(),
      })
    )
    .optional(),
});

export const ProcessingOptionsSchema = z.object({
  enableChunking: z.boolean().default(true),
  chunkSize: z.number().min(100).max(8000).default(1000),
  chunkOverlap: z.number().min(0).max(500).default(200),
  enableEmbeddings: z.boolean().default(true),
  enablePIIDetection: z.boolean().default(true),
  enableSummarization: z.boolean().default(false),
  enableEntityExtraction: z.boolean().default(false),
  maxConcurrentProcessing: z.number().min(1).max(10).default(3),
});

export type Document = z.infer<typeof DocumentSchema>;
export type ProcessingOptions = z.infer<typeof ProcessingOptionsSchema>;

export interface ProcessingResult {
  document: Document;
  processingTime: number;
  chunksGenerated: number;
  embeddingsGenerated: number;
  entitiesExtracted?: string[];
  summary?: string;
  piiDetected?: boolean;
  metadata: {
    originalSize: number;
    processedSize: number;
    compressionRatio: number;
    processingMethod: string;
  };
}

export interface ProcessorConfig {
  redis?: Redis;
  firecrawlApiKey?: string;
  enableCaching: boolean;
  cachePrefix: string;
  cacheTTL: number;
}

// Enhanced Document Processor with Context7 patterns
export class EnhancedDocumentProcessor {
  private redis?: Redis;
  private firecrawl?: FirecrawlApp;
  private aiProvider;
  private turndown: TurndownService;
  private config: ProcessorConfig;

  constructor(config: ProcessorConfig) {
    this.config = {
      enableCaching: true,
      cachePrefix: "hijraah:docs",
      cacheTTL: 3600,
      ...config,
    };

    this.redis =
      config.redis ||
      (process.env.UPSTASH_REDIS_REST_URL
        ? new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
          })
        : undefined);

    if (config.firecrawlApiKey || process.env.FIRECRAWL_API_KEY) {
      this.firecrawl = new FirecrawlApp({
        apiKey: config.firecrawlApiKey || process.env.FIRECRAWL_API_KEY!,
      });
    }

    this.aiProvider = createHijraahAI({
      redis: this.redis,
      fallbackStrategy: "cost",
      enableCaching: true,
      enableMonitoring: true,
    });

    this.turndown = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
    });
  }

  // Main processing entry point
  async processDocument(
    input: string | Buffer | File,
    options: Partial<ProcessingOptions> = {}
  ): Promise<ProcessingResult> {
    const startTime = Date.now();
    const processingOptions = ProcessingOptionsSchema.parse(options);

    try {
      // Determine input type and extract content
      const document = await this.extractContent(input);

      // Check cache first
      if (this.config.enableCaching) {
        const cached = await this.getCachedResult(document.content);
        if (cached) {
          console.log("Document processing cache hit");
          return cached;
        }
      }

      // Process document through pipeline
      const result = await this.processDocumentPipeline(
        document,
        processingOptions
      );

      // Cache result
      if (this.config.enableCaching) {
        await this.cacheResult(document.content, result);
      }

      result.processingTime = Date.now() - startTime;
      return result;
    } catch (error) {
      console.error("Document processing failed:", error);
      throw new Error(
        `Document processing failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  // Extract content from various input types
  private async extractContent(
    input: string | Buffer | File
  ): Promise<Document> {
    let content: string;
    let format: Document["format"];
    let title: string | undefined;
    let metadata: Record<string, any> = {};

    if (typeof input === "string") {
      // Handle URL input
      if (input.startsWith("http://") || input.startsWith("https://")) {
        return this.processWebpage(input);
      }
      // Handle raw text input
      content = input;
      format = "text";
    } else if (input instanceof Buffer) {
      // Handle file buffer
      const result = await this.processFileBuffer(input);
      content = result.content;
      format = result.format;
      title = result.title;
      metadata = result.metadata;
    } else if (input instanceof File) {
      // Handle File object
      const buffer = await input.arrayBuffer();
      const result = await this.processFileBuffer(
        Buffer.from(buffer),
        input.name
      );
      content = result.content;
      format = result.format;
      title = result.title || input.name;
      metadata = result.metadata;
    } else {
      throw new Error("Unsupported input type");
    }

    return {
      id: this.generateDocumentId(content),
      content,
      format,
      title,
      metadata,
    };
  }

  // Process webpage using Firecrawl
  private async processWebpage(url: string): Promise<Document> {
    if (!this.firecrawl) {
      throw new Error("Firecrawl not configured. Please provide API key.");
    }

    try {
      const scrapeResult = await this.firecrawl.scrapeUrl(url, {
        formats: ["markdown", "html"],
        includeTags: ["title", "meta"],
        excludeTags: ["nav", "footer", "aside"],
        waitFor: 1000,
      });

      if (!scrapeResult.success) {
        throw new Error(`Failed to scrape URL: ${scrapeResult.error}`);
      }

      return {
        id: this.generateDocumentId(scrapeResult.data.markdown || ""),
        url,
        content: scrapeResult.data.markdown || scrapeResult.data.html || "",
        title: scrapeResult.data.metadata?.title,
        format: "webpage",
        metadata: {
          ...scrapeResult.data.metadata,
          scrapedAt: new Date().toISOString(),
          originalUrl: url,
        },
      };
    } catch (error) {
      console.error("Webpage processing failed:", error);
      throw new Error(
        `Webpage processing failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  // Process file buffer based on extension/content
  private async processFileBuffer(
    buffer: Buffer,
    filename?: string
  ): Promise<{
    content: string;
    format: Document["format"];
    title?: string;
    metadata: Record<string, any>;
  }> {
    const extension = filename?.toLowerCase().split(".").pop();

    switch (extension) {
      case "pdf":
        return this.processPDF(buffer);
      case "docx":
        return this.processDOCX(buffer);
      case "html":
      case "htm":
        return this.processHTML(buffer);
      case "md":
      case "markdown":
        return {
          content: buffer.toString("utf-8"),
          format: "markdown",
          metadata: { originalSize: buffer.length },
        };
      default:
        return {
          content: buffer.toString("utf-8"),
          format: "text",
          metadata: { originalSize: buffer.length },
        };
    }
  }

  // Process PDF files
  private async processPDF(buffer: Buffer): Promise<{
    content: string;
    format: Document["format"];
    title?: string;
    metadata: Record<string, any>;
  }> {
    try {
      const pdfData = await pdfParse(buffer);

      return {
        content: pdfData.text,
        format: "pdf",
        title: pdfData.info?.Title,
        metadata: {
          pages: pdfData.numpages,
          info: pdfData.info,
          originalSize: buffer.length,
          processedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      throw new Error(
        `PDF processing failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  // Process DOCX files
  private async processDOCX(buffer: Buffer): Promise<{
    content: string;
    format: Document["format"];
    title?: string;
    metadata: Record<string, any>;
  }> {
    try {
      const result = await mammoth.extractRawText({ buffer });

      return {
        content: result.value,
        format: "docx",
        metadata: {
          messages: result.messages,
          originalSize: buffer.length,
          processedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      throw new Error(
        `DOCX processing failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  // Process HTML content
  private async processHTML(buffer: Buffer): Promise<{
    content: string;
    format: Document["format"];
    title?: string;
    metadata: Record<string, any>;
  }> {
    const html = buffer.toString("utf-8");
    const $ = cheerio.load(html);

    // Extract title
    const title = $("title").text() || $("h1").first().text();

    // Remove script and style tags
    $("script, style, nav, footer, aside").remove();

    // Convert to markdown
    const bodyHtml = $("body").html() || html;
    const markdown = this.turndown.turndown(bodyHtml);

    return {
      content: markdown,
      format: "html",
      title,
      metadata: {
        originalSize: buffer.length,
        processedAt: new Date().toISOString(),
      },
    };
  }

  // Main document processing pipeline
  private async processDocumentPipeline(
    document: Document,
    options: ProcessingOptions
  ): Promise<ProcessingResult> {
    const originalSize = document.content.length;
    let processedDocument = { ...document };

    // Step 1: Clean and normalize content
    processedDocument.content = this.cleanContent(processedDocument.content);

    // Step 2: PII Detection and anonymization
    if (options.enablePIIDetection) {
      const piiResult = await this.detectAndAnonymizePII(
        processedDocument.content
      );
      processedDocument.content = piiResult.content;
      processedDocument.metadata = {
        ...processedDocument.metadata,
        piiDetected: piiResult.detected,
        piiEntities: piiResult.entities,
      };
    }

    // Step 3: Text chunking
    let chunks: Document["chunks"] = [];
    if (options.enableChunking) {
      chunks = await this.chunkText(
        processedDocument.content,
        options.chunkSize,
        options.chunkOverlap
      );
    }

    // Step 4: Generate embeddings
    let embeddingsGenerated = 0;
    if (options.enableEmbeddings && chunks) {
      embeddingsGenerated = await this.generateEmbeddings(
        chunks,
        options.maxConcurrentProcessing
      );
    }

    // Step 5: Entity extraction
    let entitiesExtracted: string[] = [];
    if (options.enableEntityExtraction) {
      entitiesExtracted = await this.extractEntities(processedDocument.content);
    }

    // Step 6: Summarization
    let summary: string | undefined;
    if (options.enableSummarization) {
      summary = await this.generateSummary(processedDocument.content);
    }

    processedDocument.chunks = chunks;

    return {
      document: processedDocument,
      processingTime: 0, // Will be set by caller
      chunksGenerated: chunks?.length || 0,
      embeddingsGenerated,
      entitiesExtracted:
        entitiesExtracted.length > 0 ? entitiesExtracted : undefined,
      summary,
      piiDetected: processedDocument.metadata?.piiDetected,
      metadata: {
        originalSize,
        processedSize: processedDocument.content.length,
        compressionRatio: processedDocument.content.length / originalSize,
        processingMethod: "enhanced-pipeline",
      },
    };
  }

  // Clean and normalize text content
  private cleanContent(content: string): string {
    return (
      content
        // Normalize whitespace
        .replace(/\s+/g, " ")
        // Remove excessive line breaks
        .replace(/\n{3,}/g, "\n\n")
        // Remove non-printable characters
        .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
        // Trim whitespace
        .trim()
    );
  }

  // Text chunking with overlap
  private async chunkText(
    content: string,
    chunkSize: number,
    overlap: number
  ): Promise<Document["chunks"]> {
    const chunks: Document["chunks"] = [];
    const sentences = content
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0);

    let currentChunk = "";
    let chunkIndex = 0;

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (!trimmedSentence) continue;

      const potentialChunk =
        currentChunk + (currentChunk ? ". " : "") + trimmedSentence;

      if (potentialChunk.length > chunkSize && currentChunk) {
        // Create chunk
        chunks.push({
          id: `chunk_${chunkIndex}`,
          content: currentChunk,
          metadata: {
            chunkIndex,
            characterCount: currentChunk.length,
            sentenceCount: currentChunk.split(/[.!?]+/).length - 1,
          },
        });

        // Handle overlap
        const overlapText = this.getOverlapText(currentChunk, overlap);
        currentChunk =
          overlapText + (overlapText ? ". " : "") + trimmedSentence;
        chunkIndex++;
      } else {
        currentChunk = potentialChunk;
      }
    }

    // Add final chunk
    if (currentChunk.trim()) {
      chunks.push({
        id: `chunk_${chunkIndex}`,
        content: currentChunk,
        metadata: {
          chunkIndex,
          characterCount: currentChunk.length,
          sentenceCount: currentChunk.split(/[.!?]+/).length - 1,
        },
      });
    }

    return chunks;
  }

  // Get overlap text from end of chunk
  private getOverlapText(content: string, overlapSize: number): string {
    if (content.length <= overlapSize) return content;

    // Find the last sentence that fits within overlap
    const sentences = content.split(/[.!?]+/);
    let overlap = "";

    for (let i = sentences.length - 1; i >= 0; i--) {
      const candidateOverlap = sentences.slice(i).join(". ");
      if (candidateOverlap.length <= overlapSize) {
        overlap = candidateOverlap;
        break;
      }
    }

    return overlap || content.slice(-overlapSize);
  }

  // Generate embeddings for chunks
  private async generateEmbeddings(
    chunks: NonNullable<Document["chunks"]>,
    maxConcurrent: number
  ): Promise<number> {
    let generated = 0;
    const semaphore = new Array(maxConcurrent).fill(null);

    const processChunk = async (chunk: (typeof chunks)[0]) => {
      try {
        const response = await this.aiProvider.generateText({
          messages: [
            {
              role: "system",
              content:
                "Generate a semantic embedding for the following text. Return only the embedding vector as JSON array.",
            },
            {
              role: "user",
              content: chunk.content,
            },
          ],
          model: "text-embedding-3-small",
          maxTokens: 1024,
        });

        // Parse embedding from response (this is simplified - in practice you'd use proper embedding models)
        try {
          const embedding = JSON.parse(response.text || "[]");
          if (Array.isArray(embedding)) {
            chunk.embedding = embedding;
            generated++;
          }
        } catch (e) {
          console.warn("Failed to parse embedding for chunk:", chunk.id);
        }
      } catch (error) {
        console.warn(
          "Failed to generate embedding for chunk:",
          chunk.id,
          error
        );
      }
    };

    // Process chunks with concurrency limit
    const promises: Promise<void>[] = [];
    for (let i = 0; i < chunks.length; i += maxConcurrent) {
      const batch = chunks.slice(i, i + maxConcurrent);
      const batchPromises = batch.map(processChunk);
      promises.push(...batchPromises);

      if (promises.length >= maxConcurrent) {
        await Promise.all(promises.splice(0, maxConcurrent));
      }
    }

    // Process remaining promises
    if (promises.length > 0) {
      await Promise.all(promises);
    }

    return generated;
  }

  // PII Detection and anonymization
  private async detectAndAnonymizePII(content: string): Promise<{
    content: string;
    detected: boolean;
    entities: string[];
  }> {
    // Simple PII patterns (in production, use proper NLP libraries)
    const patterns = {
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
      ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
      creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    };

    let detected = false;
    const entities: string[] = [];
    let anonymizedContent = content;

    for (const [type, pattern] of Object.entries(patterns)) {
      const matches = content.match(pattern);
      if (matches) {
        detected = true;
        entities.push(type);
        anonymizedContent = anonymizedContent.replace(
          pattern,
          `[${type.toUpperCase()}_REDACTED]`
        );
      }
    }

    return {
      content: anonymizedContent,
      detected,
      entities,
    };
  }

  // Entity extraction using AI
  private async extractEntities(content: string): Promise<string[]> {
    try {
      const response = await this.aiProvider.generateText({
        messages: [
          {
            role: "system",
            content:
              "Extract named entities (people, places, organizations, dates) from the following text. Return as a JSON array of strings.",
          },
          {
            role: "user",
            content: content.slice(0, 2000), // Limit for token efficiency
          },
        ],
        model: "gpt-4o-mini",
        maxTokens: 512,
        temperature: 0,
      });

      const entities = JSON.parse(response.text || "[]");
      return Array.isArray(entities) ? entities : [];
    } catch (error) {
      console.warn("Entity extraction failed:", error);
      return [];
    }
  }

  // Generate summary using AI
  private async generateSummary(content: string): Promise<string> {
    try {
      const response = await this.aiProvider.generateText({
        messages: [
          {
            role: "system",
            content:
              "Generate a concise summary of the following text, highlighting the main points and key information.",
          },
          {
            role: "user",
            content: content.slice(0, 4000), // Limit for token efficiency
          },
        ],
        model: "gpt-4o-mini",
        maxTokens: 256,
        temperature: 0.3,
      });

      return response.text || "Summary generation failed";
    } catch (error) {
      console.warn("Summary generation failed:", error);
      return "Summary generation failed";
    }
  }

  // Generate document ID
  private generateDocumentId(content: string): string {
    return createHash("sha256").update(content).digest("hex").slice(0, 16);
  }

  // Cache management
  private async getCachedResult(
    content: string
  ): Promise<ProcessingResult | null> {
    if (!this.redis) return null;

    try {
      const key = `${this.config.cachePrefix}:${this.generateDocumentId(content)}`;
      const cached = await this.redis.get(key);
      return cached ? JSON.parse(cached as string) : null;
    } catch (error) {
      console.warn("Cache read error:", error);
      return null;
    }
  }

  private async cacheResult(
    content: string,
    result: ProcessingResult
  ): Promise<void> {
    if (!this.redis) return;

    try {
      const key = `${this.config.cachePrefix}:${this.generateDocumentId(content)}`;
      await this.redis.setex(key, this.config.cacheTTL, JSON.stringify(result));
    } catch (error) {
      console.warn("Cache write error:", error);
    }
  }

  // Health check
  async healthCheck(): Promise<{
    processor: boolean;
    firecrawl: boolean;
    ai: boolean;
    redis: boolean;
  }> {
    const health = {
      processor: true,
      firecrawl: !!this.firecrawl,
      ai: false,
      redis: !!this.redis,
    };

    // Test AI provider
    try {
      await this.aiProvider.generateText({
        messages: [{ role: "user", content: "test" }],
        model: "gpt-4o-mini",
        maxTokens: 5,
      });
      health.ai = true;
    } catch (error) {
      console.warn("AI health check failed:", error);
    }

    // Test Redis
    if (this.redis) {
      try {
        await this.redis.ping();
      } catch (error) {
        health.redis = false;
        console.warn("Redis health check failed:", error);
      }
    }

    return health;
  }
}
