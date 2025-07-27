import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Document } from "langchain/document";
import { OpenAI } from "openai";

import { AIModelManager } from "@/lib/ai/models";
import { logger } from "@/lib/logger";

import { FirecrawlClient } from "./client";

// ... existing code ...

export class SearchEngine {
  private supabase: ReturnType<typeof createClient>;
  private firecrawl: FirecrawlClient;
  private modelManager: AIModelManager;

  constructor(config: SearchEngineConfig) {
    this.supabase = config.supabase;
    this.firecrawl = config.firecrawl;
    this.modelManager =
      config.modelManager ||
      new AIModelManager({
        openaiKey: config.openaiKey,
      });
  }

  async search(
    query: string,
    options: SearchOptions = {}
  ): Promise<SearchResult[]> {
    const {
      k = 10,
      searchMode = "hybrid",
      hybridWeights = { vector: 0.5, firecrawl: 0.5 },
    } = options;

    try {
      const embedding = await this.modelManager.generateEmbedding(query);

      // Vector search
      const { data: vectorResults, error } = await this.supabase.rpc(
        "match_documents",
        {
          query_embedding: embedding,
          match_count: k,
          filter: options.filters ? JSON.stringify(options.filters) : "{}",
        }
      );

      if (error) throw error;

      // Firecrawl search
      const firecrawlResults = await this.firecrawl.search(query, {
        limit: k,
        mode: "semantic",
      });

      // Combine results based on search mode
      let results: SearchResult[] = [];

      if (searchMode === "vector") {
        results = this.transformVectorResults(vectorResults);
      } else if (searchMode === "firecrawl") {
        results = this.transformFirecrawlResults(firecrawlResults);
      } else {
        // Hybrid search
        results = this.combineResults(
          this.transformVectorResults(vectorResults),
          this.transformFirecrawlResults(firecrawlResults),
          hybridWeights
        );
      }

      // Apply reranking if requested
      if (options.rerank) {
        results = await this.rerankResults(query, results);
      }

      return results.slice(0, k);
    } catch (error) {
      logger.error({
        message: "Search failed",
        context: { query, options, error },
      });
      throw error;
    }
  }

  private transformVectorResults(results: any[]): SearchResult[] {
    return results.map((r) => ({
      url: r.url,
      title: r.metadata?.title || r.url,
      description: r.metadata?.description || "",
      content: r.content,
      score: r.similarity,
      metadata: r.metadata || {},
    }));
  }

  private transformFirecrawlResults(
    results: FirecrawlSearchResult[]
  ): SearchResult[] {
    return results.map((r) => ({
      url: r.url,
      title: r.title,
      description: r.description,
      content: r.content,
      score: r.score,
      metadata: {
        source: "firecrawl",
        url: r.url,
        title: r.title,
      },
    }));
  }

  private combineResults(
    vectorResults: SearchResult[],
    firecrawlResults: SearchResult[],
    weights: { vector: number; firecrawl: number }
  ): SearchResult[] {
    const combined = new Map<string, SearchResult>();

    // Add vector results with weight
    vectorResults.forEach((r) => {
      combined.set(r.url, {
        ...r,
        score: r.score * weights.vector,
      });
    });

    // Add or merge firecrawl results
    firecrawlResults.forEach((r) => {
      if (combined.has(r.url)) {
        const existing = combined.get(r.url)!;
        combined.set(r.url, {
          ...existing,
          score: existing.score + r.score * weights.firecrawl,
        });
      } else {
        combined.set(r.url, {
          ...r,
          score: r.score * weights.firecrawl,
        });
      }
    });

    return Array.from(combined.values()).sort((a, b) => b.score - a.score);
  }

  // ... rest of the existing code ...
}
