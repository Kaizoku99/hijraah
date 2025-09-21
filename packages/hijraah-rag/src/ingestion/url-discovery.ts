import FirecrawlApp from "firecrawl";
import { evaluateSourceConfidence } from "../sources/source-evaluator.js";
import { IngestionError } from "../types.js";

export interface DiscoveredUrl {
  url: string;
  title?: string;
  snippet?: string;
  confidence: number;
}

export class UrlDiscovery {
  private firecrawl: FirecrawlApp;

  constructor() {
    if (!process.env.FIRECRAWL_API_KEY) {
      throw new IngestionError("FIRECRAWL_API_KEY not set");
    }
    this.firecrawl = new FirecrawlApp({
      apiKey: process.env.FIRECRAWL_API_KEY,
    });
  }

  /**
   * Uses Firecrawl Search v2 to find relevant immigration URLs.
   * @param query user query or topic
   */
  async discover(query: string, limit = 10): Promise<DiscoveredUrl[]> {
    const results: any = await (this.firecrawl as any).search(query, {
      numResults: limit * 2,
      safeSearch: true,
      // Some SDK versions don't support includeHeaders, keep it optional
      includeHeaders: false,
    } as any);

    return (results.items || [])
      .map((item: any) => {
        const confidence = evaluateSourceConfidence(item.url);
        return {
          url: item.url,
          title: item.title,
          snippet: item.snippet,
          confidence,
        } as DiscoveredUrl;
      })
      .sort((a: DiscoveredUrl, b: DiscoveredUrl) => b.confidence - a.confidence)
      .slice(0, limit);
  }

  /**
   * Context7 Pattern: Crawl entire site for comprehensive discovery
   */
  async crawlSite(
    baseUrl: string,
    options?: {
      maxPages?: number;
      includePatterns?: string[];
      excludePatterns?: string[];
    }
  ): Promise<DiscoveredUrl[]> {
    const crawlResult = await (this.firecrawl as any).crawlUrl(baseUrl, {
      limit: options?.maxPages || 100,
      includes: options?.includePatterns,
      excludes: options?.excludePatterns,
    } as any);

    if (!crawlResult.success) {
      throw new IngestionError(
        `Failed to crawl ${baseUrl}: ${crawlResult.error}`
      );
    }

    return (crawlResult.data || []).map((page: any) => ({
      url: page.url,
      title: page.metadata?.title,
      snippet: page.markdown?.slice(0, 200),
      confidence: evaluateSourceConfidence(page.url),
    }));
  }

  /**
   * Context7 Pattern: Topic-focused discovery
   */
  async discoverByTopic(
    topic: string,
    sources: string[] = []
  ): Promise<DiscoveredUrl[]> {
    const allResults: DiscoveredUrl[] = [];

    // Search general web if no specific sources
    if (sources.length === 0) {
      const webResults = await this.discover(topic);
      allResults.push(...webResults);
    } else {
      // Search within specific sources
      for (const source of sources) {
        try {
          const sourceResults = await this.discover(`${topic} site:${source}`);
          allResults.push(...sourceResults);
        } catch (error) {
          console.warn(`Failed to search ${source}:`, error);
        }
      }
    }

    // Deduplicate and sort by confidence
    const uniqueUrls = new Map<string, DiscoveredUrl>();
    allResults.forEach((result) => {
      const existing = uniqueUrls.get(result.url);
      if (!existing || result.confidence > existing.confidence) {
        uniqueUrls.set(result.url, result);
      }
    });

    return Array.from(uniqueUrls.values()).sort(
      (a, b) => b.confidence - a.confidence
    );
  }
}
