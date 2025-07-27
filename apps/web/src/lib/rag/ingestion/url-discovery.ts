import FirecrawlApp from "@mendable/firecrawl-js";
import { evaluateSourceConfidence } from "@/lib/rag/sources/source-evaluator";

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
      throw new Error("FIRECRAWL_API_KEY not set");
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
    const results: any = await this.firecrawl.search(query, {
      numResults: limit * 2,
      safeSearch: true,
      includeHeaders: false,
    });

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
}
