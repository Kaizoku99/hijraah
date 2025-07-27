import { Index } from "@upstash/vector";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Types and interfaces following Context7 patterns
export interface RetrievalResult {
  id: string;
  content: string;
  score: number;
  metadata: Record<string, any>;
  source: "vector" | "fulltext" | "knowledge_graph";
  reasoning?: string;
}

export interface HybridQuery {
  text: string;
  vector?: number[];
  sparseVector?: { indices: number[]; values: number[] };
  filters?: Record<string, any>;
  limit?: number;
  threshold?: number;
  includeKnowledgeGraph?: boolean;
  fusionAlgorithm?: "RRF" | "DBSF";
}

const HybridQuerySchema = z.object({
  text: z.string(),
  vector: z.array(z.number()).optional(),
  sparseVector: z
    .object({
      indices: z.array(z.number()),
      values: z.array(z.number()),
    })
    .optional(),
  filters: z.record(z.any()).optional(),
  limit: z.number().default(10),
  threshold: z.number().default(0.7),
  includeKnowledgeGraph: z.boolean().default(true),
  fusionAlgorithm: z.enum(["RRF", "DBSF"]).default("RRF"),
});

export class HybridRetriever {
  private vectorIndex: Index;
  private supabase: any;
  private cache: Map<string, RetrievalResult[]> = new Map();
  private cacheTimeout = 300000; // 5 minutes

  constructor(
    private config: {
      upstashUrl: string;
      upstashToken: string;
      supabaseUrl: string;
      supabaseKey: string;
      namespace?: string;
    }
  ) {
    this.vectorIndex = new Index({
      url: config.upstashUrl,
      token: config.upstashToken,
    });

    this.supabase = createClient(config.supabaseUrl, config.supabaseKey);
  }

  /**
   * Hybrid retrieval combining multiple search strategies
   * Following Context7 fusion algorithm patterns
   */
  async retrieve(query: HybridQuery): Promise<RetrievalResult[]> {
    const validatedQuery = HybridQuerySchema.parse(query);
    const cacheKey = this.generateCacheKey(validatedQuery);

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // Parallel execution of different retrieval strategies
      const [vectorResults, fulltextResults, kgResults] = await Promise.all([
        this.vectorSearch(validatedQuery),
        this.fulltextSearch(validatedQuery),
        validatedQuery.includeKnowledgeGraph
          ? this.knowledgeGraphSearch(validatedQuery)
          : [],
      ]);

      // Fusion and ranking following Context7 DBSF/RRF patterns
      const fusedResults = this.fuseResults(
        [vectorResults, fulltextResults, kgResults],
        validatedQuery.fusionAlgorithm
      );

      // Apply threshold filtering
      const filteredResults = fusedResults.filter(
        (result) => result.score >= validatedQuery.threshold
      );

      // Limit results
      const finalResults = filteredResults.slice(0, validatedQuery.limit);

      // Cache results
      this.cache.set(cacheKey, finalResults);
      setTimeout(() => this.cache.delete(cacheKey), this.cacheTimeout);

      return finalResults;
    } catch (error) {
      console.error("Hybrid retrieval error:", error);
      throw new Error(
        `Retrieval failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Vector similarity search using Upstash Vector
   * Supports both dense and sparse vectors with hybrid indexing
   */
  private async vectorSearch(query: HybridQuery): Promise<RetrievalResult[]> {
    try {
      let results;

      if (query.vector && query.sparseVector) {
        // Hybrid vector search (dense + sparse)
        results = await this.vectorIndex.query({
          vector: query.vector,
          sparseVector: query.sparseVector,
          topK: query.limit * 2, // Retrieve more for fusion
          includeMetadata: true,
          includeData: true,
          filter: this.buildVectorFilter(query.filters),
          fusionAlgorithm: query.fusionAlgorithm as any,
        });
      } else if (query.vector) {
        // Dense vector search only
        results = await this.vectorIndex.query({
          vector: query.vector,
          topK: query.limit * 2,
          includeMetadata: true,
          includeData: true,
          filter: this.buildVectorFilter(query.filters),
        });
      } else if (query.sparseVector) {
        // Sparse vector search only
        results = await this.vectorIndex.query({
          sparseVector: query.sparseVector,
          topK: query.limit * 2,
          includeMetadata: true,
          includeData: true,
          filter: this.buildVectorFilter(query.filters),
        });
      } else {
        // Text-based search using Upstash embedding models
        results = await this.vectorIndex.query({
          data: query.text,
          topK: query.limit * 2,
          includeMetadata: true,
          includeData: true,
          filter: this.buildVectorFilter(query.filters),
        });
      }

      return results.map((result: any) => ({
        id: result.id,
        content: result.data || result.metadata?.content || "",
        score: result.score,
        metadata: result.metadata || {},
        source: "vector" as const,
        reasoning: "Vector similarity match",
      }));
    } catch (error) {
      console.error("Vector search error:", error);
      return [];
    }
  }

  /**
   * PostgreSQL full-text search with ranking
   * Uses tsvector and tsquery for semantic matching
   */
  private async fulltextSearch(query: HybridQuery): Promise<RetrievalResult[]> {
    try {
      const { data, error } = await this.supabase.rpc(
        "hybrid_fulltext_search",
        {
          search_query: query.text,
          limit_count: query.limit * 2,
          filters: query.filters || {},
        }
      );

      if (error) {
        console.error("Fulltext search error:", error);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.id,
        content: row.content,
        score: row.rank, // PostgreSQL ts_rank score
        metadata: row.metadata || {},
        source: "fulltext" as const,
        reasoning: "Full-text keyword match",
      }));
    } catch (error) {
      console.error("Fulltext search error:", error);
      return [];
    }
  }

  /**
   * Knowledge graph traversal for entity relationships
   * Finds connected entities and their relationships
   */
  private async knowledgeGraphSearch(
    query: HybridQuery
  ): Promise<RetrievalResult[]> {
    try {
      const { data, error } = await this.supabase.rpc(
        "knowledge_graph_search",
        {
          search_text: query.text,
          max_depth: 2,
          limit_count: query.limit,
          filters: query.filters || {},
        }
      );

      if (error) {
        console.error("Knowledge graph search error:", error);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.entity_id,
        content: row.entity_content,
        score: row.relevance_score,
        metadata: {
          ...row.metadata,
          relationships: row.relationships,
          entity_type: row.entity_type,
        },
        source: "knowledge_graph" as const,
        reasoning: `Connected via ${row.relationship_path}`,
      }));
    } catch (error) {
      console.error("Knowledge graph search error:", error);
      return [];
    }
  }

  /**
   * Result fusion using RRF (Reciprocal Rank Fusion) or DBSF algorithms
   * Following Context7 fusion patterns for hybrid search
   */
  private fuseResults(
    resultSets: RetrievalResult[][],
    algorithm: "RRF" | "DBSF"
  ): RetrievalResult[] {
    if (algorithm === "DBSF") {
      return this.distributionBasedScoreFusion(resultSets);
    } else {
      return this.reciprocalRankFusion(resultSets);
    }
  }

  /**
   * Reciprocal Rank Fusion (RRF) implementation
   * More stable across different scoring systems
   */
  private reciprocalRankFusion(
    resultSets: RetrievalResult[][]
  ): RetrievalResult[] {
    const k = 60; // RRF parameter
    const scoreMap = new Map<
      string,
      { result: RetrievalResult; score: number }
    >();

    resultSets.forEach((results) => {
      results.forEach((result, rank) => {
        const rrfScore = 1 / (k + rank + 1);

        if (scoreMap.has(result.id)) {
          scoreMap.get(result.id)!.score += rrfScore;
        } else {
          scoreMap.set(result.id, {
            result: { ...result },
            score: rrfScore,
          });
        }
      });
    });

    return Array.from(scoreMap.values())
      .map(({ result, score }) => ({ ...result, score }))
      .sort((a, b) => b.score - a.score);
  }

  /**
   * Distribution-Based Score Fusion (DBSF) implementation
   * More sensitive to score variations
   */
  private distributionBasedScoreFusion(
    resultSets: RetrievalResult[][]
  ): RetrievalResult[] {
    const scoreMap = new Map<
      string,
      { result: RetrievalResult; scores: number[] }
    >();

    // Collect all scores for each result
    resultSets.forEach((results, setIndex) => {
      results.forEach((result) => {
        if (scoreMap.has(result.id)) {
          scoreMap.get(result.id)!.scores[setIndex] = result.score;
        } else {
          const scores = new Array(resultSets.length).fill(0);
          scores[setIndex] = result.score;
          scoreMap.set(result.id, { result: { ...result }, scores });
        }
      });
    });

    // Calculate normalized fusion scores
    const fusedResults = Array.from(scoreMap.values()).map(
      ({ result, scores }) => {
        // Normalize scores and calculate weighted average
        const normalizedScores = scores.map((score, i) => {
          const setMean = this.calculateMean(resultSets[i].map((r) => r.score));
          const setStd = this.calculateStd(
            resultSets[i].map((r) => r.score),
            setMean
          );
          return setStd > 0 ? (score - setMean) / setStd : 0;
        });

        const fusedScore =
          normalizedScores.reduce((sum, score) => sum + score, 0) /
          normalizedScores.length;

        return { ...result, score: fusedScore };
      }
    );

    return fusedResults.sort((a, b) => b.score - a.score);
  }

  /**
   * Build vector filter from query filters
   * Converts generic filters to Upstash Vector filter format
   */
  private buildVectorFilter(filters?: Record<string, any>): string {
    if (!filters || Object.keys(filters).length === 0) {
      return "";
    }

    const conditions = Object.entries(filters)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key} = '${value}'`;
        } else if (typeof value === "number") {
          return `${key} = ${value}`;
        } else if (Array.isArray(value)) {
          return `${key} IN [${value.map((v) => (typeof v === "string" ? `'${v}'` : v)).join(", ")}]`;
        }
        return "";
      })
      .filter(Boolean);

    return conditions.join(" AND ");
  }

  private generateCacheKey(query: HybridQuery): string {
    return JSON.stringify({
      text: query.text,
      vector: query.vector ? `${query.vector.length}d` : null,
      sparseVector: query.sparseVector
        ? `${query.sparseVector.indices.length}sparse`
        : null,
      filters: query.filters,
      limit: query.limit,
      threshold: query.threshold,
      includeKnowledgeGraph: query.includeKnowledgeGraph,
      fusionAlgorithm: query.fusionAlgorithm,
    });
  }

  private calculateMean(values: number[]): number {
    return values.length > 0
      ? values.reduce((sum, val) => sum + val, 0) / values.length
      : 0;
  }

  private calculateStd(values: number[], mean: number): number {
    if (values.length <= 1) return 0;
    const variance =
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
      (values.length - 1);
    return Math.sqrt(variance);
  }

  /**
   * Health check for all retrieval components
   */
  async healthCheck(): Promise<{
    vector: boolean;
    database: boolean;
    cache: boolean;
    overall: boolean;
  }> {
    const health = {
      vector: false,
      database: false,
      cache: true,
      overall: false,
    };

    try {
      // Test vector index
      await this.vectorIndex.fetch(["health-check"], {
        includeMetadata: false,
      });
      health.vector = true;
    } catch (error) {
      console.warn("Vector index health check failed:", error);
    }

    try {
      // Test database connection
      const { data, error } = await this.supabase
        .from("documents")
        .select("id")
        .limit(1);
      health.database = !error;
    } catch (error) {
      console.warn("Database health check failed:", error);
    }

    health.overall = health.vector && health.database && health.cache;
    return health;
  }

  /**
   * Clear cache manually
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; maxAge: number } {
    return {
      size: this.cache.size,
      maxAge: this.cacheTimeout,
    };
  }
}

// Factory function following Context7 patterns
export function createHybridRetriever(config: {
  upstashUrl: string;
  upstashToken: string;
  supabaseUrl: string;
  supabaseKey: string;
  namespace?: string;
}): HybridRetriever {
  return new HybridRetriever(config);
}

// Export types for TypeScript support
export type { HybridQuery, RetrievalResult };
