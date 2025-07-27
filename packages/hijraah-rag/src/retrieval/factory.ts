import { SupabaseClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import { HybridRetriever } from "./hybrid-retriever.js";
import { ImageRetriever } from "./image-retriever.js";
import type { RetrievalQuery, RetrievalResult } from "../types.js";

// Context7 Pattern: Factory function for creating retrievers
export function createRetriever(
  type: "hybrid" | "image" | "vector" | "keyword",
  dependencies: {
    supabase?: SupabaseClient;
    openai: OpenAI;
  },
) {
  switch (type) {
    case "hybrid":
      if (!dependencies.supabase) {
        throw new Error("Hybrid retriever requires Supabase client");
      }
      return new HybridRetriever(dependencies.supabase, dependencies.openai);

    case "image":
      return new ImageRetriever(dependencies.openai);

    case "vector":
      // Future implementation for vector-only search
      throw new Error("Vector retriever not yet implemented");

    case "keyword":
      // Future implementation for keyword-only search
      throw new Error("Keyword retriever not yet implemented");

    default:
      throw new Error(`Unknown retriever type: ${type}`);
  }
}

// Context7 Pattern: Composite retriever that combines multiple strategies
export class CompositeRetriever {
  private retrievers: Map<string, any> = new Map();

  constructor(
    private dependencies: {
      supabase: SupabaseClient;
      openai: OpenAI;
    },
  ) {}

  async search(
    query: string,
    options: Partial<RetrievalQuery> & { strategies?: string[] },
  ): Promise<RetrievalResult> {
    const strategies = options.strategies || ["hybrid"];
    const results: RetrievalResult[] = [];

    // Run all strategies in parallel
    await Promise.all(
      strategies.map(async (strategy) => {
        try {
          const retriever = this.getOrCreateRetriever(strategy);
          const result = await retriever.search(query, options);
          results.push(result);
        } catch (error) {
          console.warn(`Strategy ${strategy} failed:`, error);
        }
      }),
    );

    // Merge results (simple implementation, can be enhanced)
    if (results.length === 0) {
      throw new Error("All retrieval strategies failed");
    }

    if (results.length === 1) {
      return results[0];
    }

    // Merge multiple results
    return this.mergeResults(results);
  }

  private getOrCreateRetriever(type: string): any {
    if (!this.retrievers.has(type)) {
      const retriever = createRetriever(type as any, this.dependencies);
      this.retrievers.set(type, retriever);
    }
    return this.retrievers.get(type);
  }

  private mergeResults(results: RetrievalResult[]): RetrievalResult {
    // Simple merge - takes unique chunks and combines KG contexts
    const allChunks = results.flatMap((r) => r.chunks);
    const uniqueChunks = Array.from(
      new Map(allChunks.map((c) => [c.id || c.content, c])).values(),
    );

    const allEntities = results.flatMap((r) => r.kgContext.entities);
    const uniqueEntities = Array.from(
      new Map(allEntities.map((e) => [e.name, e])).values(),
    );

    const allRelationships = results.flatMap((r) => r.kgContext.relationships);
    const uniqueRelationships = Array.from(
      new Map(allRelationships.map((r) => [r.id, r])).values(),
    );

    const allImages = results.flatMap((r) => r.images || []);
    const uniqueImages = Array.from(
      new Map(allImages.map((i) => [i.id, i])).values(),
    );

    return {
      chunks: uniqueChunks.slice(0, 10), // Limit to top 10
      kgContext: {
        entities: uniqueEntities,
        relationships: uniqueRelationships,
      },
      images: uniqueImages,
      userContext: results[0].userContext,
      totalResults: uniqueChunks.length,
      processingTime: Math.max(...results.map((r) => r.processingTime)),
      confidence: Math.max(...results.map((r) => r.confidence)),
    };
  }
}
