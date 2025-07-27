import FirecrawlApp from "@mendable/firecrawl-js";
import { db } from "@hijraah/database/client";
import {
  webIndexes,
  crawlJobs,
  documents,
  // documentChunks, // TODO: Add documentChunks table to schema
} from "@hijraah/database/schema";
import { eq } from "drizzle-orm";
import { generateEmbedding } from "@/lib/ai/embeddings";
import type { CrawlJobUpdate, FirecrawlJobResponse } from "@hijraah/types";

// Initialize Firecrawl client
const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

export class FirecrawlService {
  /**
   * Start a crawl job for a web index
   */
  static async startCrawl(webIndexId: string): Promise<{ jobId: string }> {
    try {
      // Get web index details
      const [webIndex] = await db
        .select()
        .from(webIndexes)
        .where(eq(webIndexes.id, webIndexId))
        .limit(1);

      if (!webIndex) {
        throw new Error("Web index not found");
      }

      const crawlConfig = (webIndex.crawlConfig as any) || {};

      // Start Firecrawl job
      const crawlResponse = await firecrawl.crawlUrl(webIndex.url, {
        maxPages: crawlConfig.maxPages || 100,
        includeHtml: false,
        includeMarkdown: true,
        includeMetadata: true,
        excludePaths: crawlConfig.excludePatterns || [],
        includePaths: crawlConfig.includePatterns || [],
        respectRobotsTxt: crawlConfig.respectRobotsTxt !== false,
        delay: crawlConfig.delay || 1000,
        extractorOptions: {
          mode: "llm-extraction",
          extractionPrompt:
            "Extract the main content and metadata from this page, focusing on text content that would be useful for search and question-answering.",
        },
      });

      if (!crawlResponse.success) {
        throw new Error(`Firecrawl job failed: ${crawlResponse.error}`);
      }

      const jobId = crawlResponse.id || crawlResponse.jobId;

      // Update crawl job record
      await db
        .update(crawlJobs)
        .set({
          firecrawlJobId: jobId,
          status: "processing",
          startedAt: new Date(),
        })
        .where(eq(crawlJobs.webIndexId, webIndexId));

      return { jobId };
    } catch (error) {
      console.error("Error starting crawl:", error);
      throw error;
    }
  }

  /**
   * Check the status of a running crawl job
   */
  static async checkCrawlStatus(
    firecrawlJobId: string,
  ): Promise<CrawlJobUpdate> {
    try {
      const statusResponse = await firecrawl.checkCrawlStatus(firecrawlJobId);

      if (!statusResponse.success) {
        throw new Error(`Failed to check status: ${statusResponse.error}`);
      }

      const status = statusResponse.status;
      const isCompleted = status === "completed";
      const isFailed = status === "failed";

      return {
        status: isFailed ? "failed" : isCompleted ? "completed" : "processing",
        pagesProcessed: statusResponse.current || 0,
        totalPages: statusResponse.total,
        data: isCompleted ? statusResponse.data : undefined,
        errorMessage: isFailed ? statusResponse.error : undefined,
      };
    } catch (error) {
      console.error("Error checking crawl status:", error);
      return {
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        pagesProcessed: 0,
      };
    }
  }

  /**
   * Process completed crawl results and store in database
   */
  static async processCrawlResults(
    webIndexId: string,
    crawlData: any[],
  ): Promise<void> {
    try {
      const [webIndex] = await db
        .select()
        .from(webIndexes)
        .where(eq(webIndexes.id, webIndexId))
        .limit(1);

      if (!webIndex) {
        throw new Error("Web index not found");
      }

      console.log(
        `Processing ${crawlData.length} pages for web index ${webIndexId}`,
      );

      // Process each crawled page
      for (const page of crawlData) {
        if (!page.markdown || !page.metadata?.title) {
          continue; // Skip pages without content
        }

        // Create document record
        const [document] = await db
          .insert(documents)
          .values({
            userId: webIndex.userId,
            webIndexId: webIndexId,
            filename:
              page.metadata.title ||
              new URL(page.metadata.sourceURL || page.url).pathname,
            filePath: page.metadata.sourceURL || page.url,
            fileType: "text/html",
            fileSize: page.markdown.length,
            title: page.metadata.title || "Untitled",
            content: page.markdown,
            status: "processing",
            metadata: {
              url: page.metadata.sourceURL || page.url,
              description: page.metadata.description,
              keywords: page.metadata.keywords,
              ogTitle: page.metadata.ogTitle,
              ogDescription: page.metadata.ogDescription,
              statusCode: page.metadata.statusCode,
              crawledAt: new Date().toISOString(),
            },
          })
          .returning();

        // Create embeddings for the content
        await this.createDocumentEmbeddings(document.id, page.markdown);

        // Update document status
        await db
          .update(documents)
          .set({ status: "complete" })
          .where(eq(documents.id, document.id));
      }

      // Update web index statistics
      await db
        .update(webIndexes)
        .set({
          pagesCrawled: crawlData.length,
          totalPages: crawlData.length,
          lastCrawledAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(webIndexes.id, webIndexId));

      console.log(
        `Completed processing ${crawlData.length} pages for web index ${webIndexId}`,
      );
    } catch (error) {
      console.error("Error processing crawl results:", error);
      throw error;
    }
  }

  /**
   * Create embeddings for document content
   */
  private static async createDocumentEmbeddings(
    documentId: string,
    content: string,
  ): Promise<void> {
    try {
      // Split content into chunks (simple approach - can be enhanced)
      const chunks = this.splitIntoChunks(content, 1000, 200); // 1000 chars with 200 char overlap

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        // Generate embedding for the chunk
        const embedding = await generateEmbedding(chunk);

        // Store chunk with embedding
        // TODO: Re-enable when documentChunks table is added to schema
        // await db.insert(documentChunks).values({
        //   documentId: documentId,
        //   chunkIndex: i,
        //   textContent: chunk,
        //   embedding: embedding,
        //   tokenCount: Math.ceil(chunk.length / 4), // Rough estimate
        // });
      }
    } catch (error) {
      console.error("Error creating document embeddings:", error);
      throw error;
    }
  }

  /**
   * Split text into overlapping chunks
   */
  private static splitIntoChunks(
    text: string,
    chunkSize: number = 1000,
    overlap: number = 200,
  ): string[] {
    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      const chunk = text.slice(start, end);

      chunks.push(chunk);

      if (end === text.length) break;
      start += chunkSize - overlap;
    }

    return chunks;
  }

  /**
   * Monitor and update all active crawl jobs
   */
  static async monitorActiveCrawls(): Promise<void> {
    try {
      // Get all processing crawl jobs
      const activeCrawls = await db
        .select({
          id: crawlJobs.id,
          webIndexId: crawlJobs.webIndexId,
          firecrawlJobId: crawlJobs.firecrawlJobId,
        })
        .from(crawlJobs)
        .where(eq(crawlJobs.status, "processing"));

      console.log(`Monitoring ${activeCrawls.length} active crawl jobs`);

      for (const crawl of activeCrawls) {
        if (!crawl.firecrawlJobId) continue;

        try {
          const statusUpdate = await this.checkCrawlStatus(
            crawl.firecrawlJobId,
          );

          // Update crawl job status
          await db
            .update(crawlJobs)
            .set({
              status: statusUpdate.status,
              pagesProcessed: statusUpdate.pagesProcessed,
              errorMessage: statusUpdate.errorMessage,
              completedAt:
                statusUpdate.status === "completed" ||
                statusUpdate.status === "failed"
                  ? new Date()
                  : undefined,
              metadata: {
                ...crawl,
                lastStatusCheck: new Date().toISOString(),
                totalPages: statusUpdate.totalPages,
              },
            })
            .where(eq(crawlJobs.id, crawl.id));

          // Process results if completed
          if (statusUpdate.status === "completed" && statusUpdate.data) {
            await this.processCrawlResults(crawl.webIndexId, statusUpdate.data);
          }
        } catch (error) {
          console.error(`Error monitoring crawl ${crawl.id}:`, error);

          // Mark as failed
          await db
            .update(crawlJobs)
            .set({
              status: "failed",
              errorMessage:
                error instanceof Error ? error.message : "Monitoring failed",
              completedAt: new Date(),
            })
            .where(eq(crawlJobs.id, crawl.id));
        }
      }
    } catch (error) {
      console.error("Error monitoring active crawls:", error);
    }
  }
}

export default FirecrawlService;
