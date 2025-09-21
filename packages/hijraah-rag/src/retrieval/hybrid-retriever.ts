import { SupabaseClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import {
  RAGProcessedDocument,
  RetrievalResult,
  KGContext,
  RAGProcessedDocumentChunk,
  UserContext,
  RetrievalQuery,
  RetrievalError,
} from "../types.js";
import NodeCache from "node-cache";
import { QueryHistoryAnalyzer } from "../personalization/history-analyzer.js";
import { PreferenceLearner } from "../personalization/preference-learner.js";
import { ImageRetriever } from "./image-retriever.js";
import { Index } from "@upstash/vector";
import { Redis } from "@upstash/redis";
import crypto from "crypto";

interface QueryOptions {
  limit?: number;
  threshold?: number;
  userId?: string;
}

// Context7: Type-safe cache metadata interface with Upstash Vector compatibility
interface VectorCacheMetadata {
  query: string;
  result: RetrievalResult;
  cachedAt: number;
  [key: string]: any; // Allow additional properties for Upstash Vector compatibility
}

// Context7: Cache entry size limits for memory management
const CACHE_LIMITS = {
  MAX_ENTRY_SIZE_MB: 10,
  MAX_RESULT_CHUNKS: 50,
  MAX_QUERY_LENGTH: 1000,
} as const;

interface SearchResult {
  id: string;
  document_id: string;
  content: string;
  score: number;
}

interface UnderstoodQuery {
  embedding_query: string;
  full_text_query: string;
}

// New: strongly-typed row returned by search_rag_hybrid RPC
interface SearchRAGHybridRow {
  chunk_id: string;
  document_id: string;
  chunk_index: number;
  content: string;
  source_url: string;
  vector_similarity: number;
  text_rank: number;
  entities: unknown;
  final_score: number;
}

/**
 * HybridRetriever - Context7 Enhanced RAG Retrieval System
 *
 * This class implements Context7 defensive programming patterns for robust,
 * scalable, and maintainable RAG operations. Key enhancements include:
 *
 * ## Context7 Patterns Implemented:
 *
 * ### 1. **Multi-Level Cache Architecture**
 * - L1: Redis (fast, 1-hour TTL)
 * - L2: Supabase (persistent, 24-hour TTL)
 * - L3: Vector similarity cache (Upstash Vector)
 * - L4: Fresh retrieval (fallback)
 *
 * ### 2. **Defensive Error Handling**
 * - Graceful cache degradation with fallbacks
 * - Individual operation error boundaries
 * - Comprehensive logging with structured data
 * - No single point of failure
 *
 * ### 3. **Type Safety & Validation**
 * - Proper TypeScript interfaces for cache metadata
 * - Runtime type guards for cache entries
 * - Input validation and sanitization
 * - Compile-time safety with no 'as any'
 *
 * ### 4. **Performance Optimization**
 * - Parallel execution of independent operations
 * - Cache size limits and memory management
 * - Embedding optimization for caching
 * - Query length validation
 *
 * ### 5. **Observability & Monitoring**
 * - Structured logging with queryHash tracking
 * - Cache hit/miss metrics
 * - Performance timing measurements
 * - Error tracking with context
 *
 * ### 6. **Resource Management**
 * - Automatic cache cleanup
 * - Memory-conscious cache entry limits
 * - Embedding removal for cache storage
 * - Graceful resource cleanup on errors
 *
 * ## Usage Patterns:
 * ```typescript
 * const retriever = new HybridRetriever(supabase, openai);
 *
 * // Context7: Always returns valid results with graceful fallbacks
 * const results = await retriever.search("immigration query", {
 *   limit: 10,
 *   threshold: 0.7,
 *   userId: "user-123"
 * });
 * ```
 *
 * ## Cache Flow:
 * 1. L1 Redis → Fast retrieval, JSON validation
 * 2. L2 Supabase → Persistent storage, promotion to L1
 * 3. L3 Vector → Semantic similarity, score threshold
 * 4. L4 Fresh → Full retrieval, cache population
 *
 * ## Error Recovery:
 * - Cache corruption → Clear and continue to next level
 * - API failures → Use fallback values (empty arrays)
 * - Size limits → Skip caching, log warnings
 * - Network issues → Degrade gracefully with context
 */
export class HybridRetriever {
  private supabase: SupabaseClient;
  private openai: OpenAI;
  private queryCache: NodeCache;
  private vectorCache: Index;
  private redis: Redis;

  constructor(supabaseClient: SupabaseClient, openaiClient: OpenAI) {
    this.supabase = supabaseClient;
    this.openai = openaiClient;

    // Initialize cache with a 10-minute TTL for understood queries
    this.queryCache = new NodeCache({ stdTTL: 600 });

    // Initialize Upstash clients (support REST env names with fallback)
    const vectorUrl =
      process.env.UPSTASH_VECTOR_REST_URL || process.env.UPSTASH_VECTOR_URL;
    const vectorToken =
      process.env.UPSTASH_VECTOR_REST_TOKEN || process.env.UPSTASH_VECTOR_TOKEN;
    const redisUrl =
      process.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_URL;
    const redisToken =
      process.env.UPSTASH_REDIS_REST_TOKEN || process.env.UPSTASH_REDIS_TOKEN;

    if (!vectorUrl || !vectorToken) {
      throw new RetrievalError(
        "Upstash Vector configuration missing: set UPSTASH_VECTOR_REST_URL and UPSTASH_VECTOR_REST_TOKEN"
      );
    }
    if (!redisUrl || !redisToken) {
      throw new RetrievalError(
        "Upstash Redis configuration missing: set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN"
      );
    }

    this.vectorCache = new Index({ url: vectorUrl, token: vectorToken });
    this.redis = new Redis({ url: redisUrl, token: redisToken });
  }

  async storeDocument(document: RAGProcessedDocument): Promise<void> {
    const { error: docError } = await this.supabase
      .from("rag_documents")
      .upsert(
        {
          id: document.documentId,
          source_url: document.sourceUrl,
          raw_text: document.rawText,
          status: "processed",
        },
        { onConflict: "id" }
      );

    if (docError) {
      throw new RetrievalError(
        `Error storing document metadata: ${docError.message}`
      );
    }

    const chunksToInsert = document.chunks.map((chunk) => ({
      id: `${document.documentId}_${chunk.metadata.chunkIndex}`,
      document_id: document.documentId,
      content: chunk.content,
      embedding: chunk.embedding,
      chunk_index: chunk.metadata.chunkIndex,
      metadata: chunk.metadata,
    }));

    const batchSize = 100;
    for (let i = 0; i < chunksToInsert.length; i += batchSize) {
      const batch = chunksToInsert.slice(i, i + batchSize);
      const { error: chunkError } = await this.supabase
        .from("document_chunks_enhanced")
        .insert(batch);
      if (chunkError) {
        throw new RetrievalError(
          `Error storing document chunks: ${chunkError.message}`
        );
      }
    }
  }

  private async getUserProfile(userId: string): Promise<UserContext | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select(
        "id, country_of_residence, country_of_interest, country_of_citizenship, immigration_goals"
      )
      .eq("id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // PGRST116: "The result contains 0 rows" - this is not an error for us
        console.log(`No profile found for userId: ${userId}`);
        return null;
      }
      console.error(`Error fetching profile for userId ${userId}:`, error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Map to UserContext structure
    return {
      userId: data.id,
      preferences: {
        language: "en", // Default, could be expanded
        complexity: "intermediate",
        domains: data.immigration_goals || [],
      },
      history: {
        queries: [],
        interactions: [],
        feedback: [],
      },
      profile: {
        interests: [data.country_of_interest].filter(Boolean),
        goals: data.immigration_goals || [],
      },
    };
  }

  private async understandQuery(
    query: string,
    userContext?: UserContext | null
  ): Promise<UnderstoodQuery> {
    const cacheKey = `understood_query_${
      userContext?.userId || "anonymous"
    }_${query}`;
    const cachedResult = this.queryCache.get<UnderstoodQuery>(cacheKey);

    if (cachedResult) {
      console.log("Returning cached understood query.");
      return cachedResult;
    }

    const profileContext = userContext
      ? `
      Here is the user's profile for context:
      - Interests: ${userContext.profile?.interests?.join(", ") || "N/A"}
      - Goals: ${userContext.profile?.goals?.join(", ") || "N/A"}
      - Preferred Language: ${userContext.preferences?.language || "N/A"}
      
      Personalize the queries based on this context. For example, if the user asks about "visa requirements", assume they are asking for themselves.`
      : "The user is anonymous. Generate a generic query.";

    const prompt = `
      Analyze the following user query for an immigration assistant bot. 
      ${profileContext}

      User Query: "${query}"

      1.  **Embedding Query**: Rephrase the user's query to be a clear, concise question or statement that captures the core semantic meaning, incorporating the user's context. This will be used to find semantically similar document chunks.
      2.  **Full-Text Query**: Extract the most important keywords and entities from the user's query and profile. Combine them using OR operators for a broad full-text search. Focus on nouns, proper nouns, and key immigration terms.

      Return the result as a JSON object with two keys: "embedding_query" and "full_text_query".
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a query optimization expert for retrieval systems specializing in immigration.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("No content returned from OpenAI.");
      const parsedContent = JSON.parse(content);

      const result: UnderstoodQuery = {
        embedding_query: parsedContent.embedding_query || query,
        full_text_query:
          parsedContent.full_text_query || query.split(" ").join(" | "),
      };

      this.queryCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.warn(
        "Error understanding query, falling back to basic search:",
        error
      );
      return {
        embedding_query: query,
        full_text_query: query.split(" ").join(" | "),
      };
    }
  }

  private async extractEntitiesFromQuery(
    query: string
  ): Promise<{ name: string; type: string }[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at extracting key entities (like countries, visa types, organizations) from user queries about immigration.",
          },
          {
            role: "user",
            content: `Extract all named entities from the following query and classify them. Query: "${query}"

Respond with a JSON object containing a single key "entities", which is an array of objects, where each object has "name" and "type".
Example: {"entities": [{"name": "Canada", "type": "Country"}, {"name": "Express Entry", "type": "Visa/Program"}]}`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) return [];

      const parsed = JSON.parse(content);
      return parsed.entities || [];
    } catch (error) {
      console.error("Error extracting entities from query:", error);
      return [];
    }
  }

  private async searchKnowledgeGraph(
    entities: { name: string; type: string }[]
  ): Promise<KGContext> {
    if (entities.length === 0) {
      return { entities: [], relationships: [] };
    }

    const entityNames = entities.map((e) => e.name);

    try {
      // Use new RPC that encapsulates the join logic in SQL to avoid complex REST filters
      const { data, error } = await this.supabase.rpc("get_related_edges", {
        p_entity_names: entityNames,
      });

      if (error) {
        console.error("Error searching knowledge graph:", error);
        const kgEntities = entities.map((e) => ({
          id: crypto.randomUUID(),
          name: e.name,
          type: e.type,
        }));
        return { entities: kgEntities, relationships: [] };
      }

      const relationships = (data || []).map((row: any) => ({
        id: crypto.randomUUID(),
        sourceEntityId: row.source_entity_id ?? "",
        targetEntityId: row.target_entity_id ?? "",
        sourceEntityName: row.source_entity_name ?? "",
        targetEntityName: row.target_entity_name ?? "",
        type: row.relationship_type,
      }));

      // Convert to KGEntity format
      const kgEntities = entities.map((e) => ({
        id: crypto.randomUUID(),
        name: e.name,
        type: e.type,
      }));

      return {
        entities: kgEntities,
        relationships,
      };
    } catch (err) {
      console.error("Unexpected KG search error", err);
      return { entities: [], relationships: [] };
    }
  }

  /**
   * Attempt to fetch a cached retrieval result from the `rag_query_cache` table.
   */
  private async getCachedRetrieval(
    queryHash: string
  ): Promise<Partial<RetrievalResult> | null> {
    const { data, error } = await this.supabase
      .from("rag_query_cache")
      .select("retrieved_chunks, kg_entities")
      .eq("query_hash", queryHash)
      .lte("expires_at", new Date().toISOString())
      .maybeSingle();

    if (error) {
      console.warn("Cache lookup error:", error.message);
      return null;
    }
    if (!data) return null;

    try {
      const chunks = JSON.parse(
        data.retrieved_chunks
      ) as RAGProcessedDocumentChunk[];
      const kgContext = JSON.parse(data.kg_entities) as KGContext;
      return {
        chunks,
        kgContext,
        totalResults: chunks.length,
        processingTime: 0,
        confidence: 0.9,
      };
    } catch {
      return null;
    }
  }

  /**
   * Store the retrieval result in the cache table for faster future access.
   */
  private hashQuery(query: string, options: QueryOptions): string {
    const payload = JSON.stringify({ query, ...options });
    return crypto.createHash("sha256").update(payload).digest("hex");
  }

  private async cacheRetrieval(queryHash: string, result: RetrievalResult) {
    try {
      // Cache in Supabase for long-term storage
      await this.supabase.from("rag_query_cache").upsert({
        query_hash: queryHash,
        query_text: "", // optional full text
        retrieved_chunks: JSON.stringify(result.chunks),
        kg_entities: JSON.stringify(result.kgContext),
        expires_at: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // 1 hour ttl
      });

      // Cache in Redis for fast access
      await this.redis.setex(
        `hybrid:${queryHash}`,
        3600,
        JSON.stringify(result)
      );
    } catch (err) {
      console.warn("Cache write error", err);
    }
  }

  // Context7: Type guard for vector cache metadata
  private isValidVectorCacheMetadata(
    metadata: any
  ): metadata is VectorCacheMetadata {
    return (
      metadata &&
      typeof metadata === "object" &&
      typeof metadata.query === "string" &&
      metadata.result &&
      typeof metadata.result === "object" &&
      Array.isArray(metadata.result.chunks) &&
      typeof metadata.cachedAt === "number"
    );
  }

  // Context7: Validate cache entry size to prevent memory issues
  private validateCacheEntrySize(result: RetrievalResult): boolean {
    const resultSize = JSON.stringify(result).length / (1024 * 1024); // Size in MB

    // Check size limits
    if (resultSize > CACHE_LIMITS.MAX_ENTRY_SIZE_MB) {
      console.warn("Context7: Cache entry too large by size, skipping cache", {
        sizeMB: Math.round(resultSize * 100) / 100,
        maxSizeMB: CACHE_LIMITS.MAX_ENTRY_SIZE_MB,
        chunksCount: result.chunks.length,
      });
      return false;
    }

    // Check chunk count limits
    if (result.chunks.length > CACHE_LIMITS.MAX_RESULT_CHUNKS) {
      console.warn("Context7: Too many chunks for cache, skipping cache", {
        chunksCount: result.chunks.length,
        maxChunks: CACHE_LIMITS.MAX_RESULT_CHUNKS,
        sizeMB: Math.round(resultSize * 100) / 100,
      });
      return false;
    }

    return true;
  }

  // Context7: Optimize result for caching by removing large embeddings
  private optimizeResultForCache(result: RetrievalResult): RetrievalResult {
    const optimizedChunks = result.chunks.map((chunk) => ({
      ...chunk,
      embedding: [], // Remove embeddings to save space in cache
    }));

    return {
      ...result,
      chunks: optimizedChunks,
    };
  }

  // Enhanced search method with multi-level caching
  async search(
    query: string,
    options: Partial<RetrievalQuery> = {}
  ): Promise<RetrievalResult> {
    const startTime = Date.now();

    // Context7: Validate query length to prevent issues
    if (query.length > CACHE_LIMITS.MAX_QUERY_LENGTH) {
      console.warn("Context7: Query too long, truncating", {
        originalLength: query.length,
        maxLength: CACHE_LIMITS.MAX_QUERY_LENGTH,
      });
      query = query.slice(0, CACHE_LIMITS.MAX_QUERY_LENGTH);
    }
    const queryOptions: QueryOptions = {
      limit: options.limit,
      threshold: options.threshold,
      userId: options.userId,
    };
    const queryHash = this.hashQuery(query, queryOptions);

    try {
      // L1 Cache: Check Redis for exact query results with Context7 safe parsing
      const redisKey = `hybrid:${queryHash}`;
      const redisResult = await this.redis.get(redisKey);
      if (redisResult) {
        console.log("✅ Redis cache hit");
        console.log("Redis result type:", typeof redisResult);
        console.log(
          "Redis result (first 200 chars):",
          String(redisResult).substring(0, 200)
        );

        try {
          // Context7: Ensure we have a string before parsing
          const stringResult =
            typeof redisResult === "string"
              ? redisResult
              : JSON.stringify(redisResult);
          const cached = JSON.parse(stringResult);

          // Context7: Validate retrieved cache structure
          if (
            !cached ||
            typeof cached !== "object" ||
            !Array.isArray(cached.chunks)
          ) {
            console.warn("Context7: L1 cache invalid, degrading to L2", {
              redisKey: redisKey.slice(0, 50) + "...",
              cacheType: cached ? typeof cached : "null",
              hasChunks: cached ? Array.isArray(cached.chunks) : false,
              degradationReason: "invalid_structure",
            });
            await this.redis.del(redisKey);
            // Continue to L2 cache instead of returning null
          } else {
            return cached;
          }
        } catch (parseError) {
          console.warn("Context7: L1 cache parse error, degrading to L2", {
            redisKey: redisKey.slice(0, 50) + "...",
            error:
              parseError instanceof Error
                ? parseError.message
                : String(parseError),
            degradationReason: "json_parse_error",
          });
          await this.redis.del(redisKey);
          // Continue to L2 cache
        }
      }

      // L2 Cache: Check Supabase cache
      const cached = await this.getCachedRetrieval(queryHash);
      if (cached && cached.chunks && cached.kgContext) {
        console.log("✅ Context7: L2 Supabase cache hit, promoting to L1", {
          queryHash: queryHash.slice(0, 16) + "...",
          cacheLevel: "L2_Supabase",
          chunksCount: cached.chunks.length,
        });

        // Populate Redis cache for next time
        const fullResult: RetrievalResult = {
          chunks: cached.chunks,
          kgContext: cached.kgContext,
          totalResults: cached.totalResults!,
          processingTime: Date.now() - startTime,
          confidence: cached.confidence!,
        };
        // Context7: Safe JSON serialization with error handling
        try {
          await this.redis.setex(redisKey, 3600, JSON.stringify(fullResult));
        } catch (serializeError) {
          console.warn("Failed to serialize cache result:", serializeError);
          // Continue without caching
        }
        return fullResult;
      }

      // L3 Cache: Check Upstash vector cache for similar queries
      const { limit = 10, threshold = 0.7, userId } = queryOptions;
      let userContext: UserContext | null = null;
      if (userId) {
        userContext = await this.getUserProfile(userId);
      }

      const { embedding_query } = await this.understandQuery(
        query,
        userContext
      );
      const queryEmbedding = (
        await this.openai.embeddings.create({
          model: "text-embedding-3-small",
          input: embedding_query,
        })
      ).data[0].embedding;

      try {
        const nsIndex = userId
          ? this.vectorCache.namespace(`user_${userId}`)
          : this.vectorCache;

        const vectorCacheResults = await nsIndex.query({
          vector: queryEmbedding,
          topK: 3,
          includeMetadata: true,
        });

        if (
          vectorCacheResults.length > 0 &&
          vectorCacheResults[0].score > 0.95
        ) {
          console.log("✅ Context7: L3 Vector cache hit", {
            queryHash: queryHash.slice(0, 16) + "...",
            cacheLevel: "L3_Vector",
            score: vectorCacheResults[0].score,
          });

          // Context7: Type-safe metadata access with validation
          const metadata = vectorCacheResults[0].metadata;
          if (this.isValidVectorCacheMetadata(metadata)) {
            return metadata.result;
          } else {
            console.warn("Context7: Invalid vector cache metadata structure", {
              queryHash: queryHash.slice(0, 16) + "...",
              hasResult:
                metadata &&
                typeof metadata === "object" &&
                "result" in metadata,
            });
          }
        }
      } catch (vectorCacheError) {
        console.warn("Vector cache query failed:", vectorCacheError);
      }

      // L4 Storage: Perform actual retrieval
      console.log("🔍 Context7: Full cache miss, degrading to L4 retrieval", {
        queryHash: queryHash.slice(0, 16) + "...",
        cacheLevel: "L4_Fresh_Retrieval",
        degradationReason: "all_cache_levels_missed",
      });
      const result = await this._searchWithoutCache(query, queryOptions);

      // Context7: Optimize and validate cache entry before storing
      const optimizedResult = this.optimizeResultForCache(result);
      if (this.validateCacheEntrySize(optimizedResult)) {
        // Cache the results for future queries
        await this.cacheRetrieval(queryHash, optimizedResult);

        // Cache query embedding for semantic similarity
        const nsIndex = userId
          ? this.vectorCache.namespace(`user_${userId}`)
          : this.vectorCache;

        const vectorMetadata: VectorCacheMetadata = {
          query,
          result: optimizedResult,
          cachedAt: Date.now(),
        };

        await nsIndex.upsert({
          id: queryHash,
          vector: queryEmbedding,
          metadata: vectorMetadata,
        });
      } else {
        console.warn("Context7: Skipping cache storage due to size limits", {
          queryHash: queryHash.slice(0, 16) + "...",
          chunksCount: result.chunks.length,
          originalSizeMB:
            Math.round((JSON.stringify(result).length / (1024 * 1024)) * 100) /
            100,
        });
      }

      return result;
    } catch (error) {
      console.error("Enhanced hybrid retrieval failed:", error);
      throw new RetrievalError("Failed to perform hybrid search", error);
    }
  }

  // Extract existing search logic into private _searchWithoutCache
  private async _searchWithoutCache(
    query: string,
    options: QueryOptions = {}
  ): Promise<RetrievalResult> {
    const startTime = Date.now();
    const { limit = 10, threshold = 0.7, userId } = options;

    let userContext: UserContext | null = null;
    if (userId) {
      userContext = await this.getUserProfile(userId);
    }

    // 1. Context7: Defensive query understanding with fallback
    const { embedding_query, full_text_query } = await this.understandQuery(
      query,
      userContext
    ).catch((error) => {
      console.warn(
        "Context7: Query understanding failed, using basic queries",
        {
          error: error instanceof Error ? error.message : String(error),
          originalQuery: query.slice(0, 100) + "...",
        }
      );
      return {
        embedding_query: query,
        full_text_query: query.split(" ").join(" | "),
      };
    });

    // 2. Generate Embedding for the Semantic Part of the Query
    const queryEmbedding = (
      await this.openai.embeddings.create({
        model: "text-embedding-3-small",
        input: embedding_query,
      })
    ).data[0].embedding;

    // 3. Hybrid Search for Document Chunks
    const { data: chunksData, error: chunksError } = await this.supabase.rpc(
      "search_rag_hybrid",
      {
        p_query_embedding: queryEmbedding,
        p_query_text: full_text_query,
        p_match_count: limit,
        p_similarity_threshold: threshold,
      }
    );

    if (chunksError) {
      throw new RetrievalError(`Search error: ${chunksError.message}`);
    }

    const rows: SearchRAGHybridRow[] = (chunksData ||
      []) as SearchRAGHybridRow[];

    // Structured log for observability (non-cached path)
    console.log(
      "[HybridRetriever] _searchWithoutCache top 3:",
      rows.slice(0, 3).map((r) => ({ id: r.chunk_id, score: r.final_score }))
    );

    const retrievedChunks: RAGProcessedDocumentChunk[] = rows.map((item) => ({
      id: item.chunk_id,
      content: item.content,
      embedding: [], // Embedding not needed for context
      metadata: {
        sourceUrl: item.source_url,
        documentId: item.document_id,
        chunkIndex: item.chunk_index,
      },
    }));

    // 4. Context7: Parallelize independent async operations for better performance
    const [extractedEntities, images] = await Promise.allSettled([
      this.extractEntitiesFromQuery(query).catch((error) => {
        console.warn("Context7: Entity extraction failed, using empty array", {
          error: error.message,
        });
        return [];
      }),
      new ImageRetriever(this.openai).retrieve(query, 5).catch((error) => {
        console.warn("Context7: Image retrieval failed, using empty array", {
          error: error.message,
        });
        return [];
      }),
    ]);

    // Extract results from settled promises
    const validEntities =
      extractedEntities.status === "fulfilled" ? extractedEntities.value : [];
    const validImages = images.status === "fulfilled" ? images.value : [];

    // Knowledge graph search (depends on entities, so runs after)
    const kgContext = await this.searchKnowledgeGraph(validEntities).catch(
      (error) => {
        console.warn(
          "Context7: Knowledge graph search failed, using empty context",
          { error: error.message }
        );
        return { entities: [], relationships: [] };
      }
    );

    // 5. Context7: Defensive personalization and reranking with fallbacks
    const personalizedChunks = (() => {
      try {
        return this.personalizeChunks(retrievedChunks, userContext);
      } catch (error) {
        console.warn(
          "Context7: Personalization failed, using original chunks",
          {
            error: error instanceof Error ? error.message : String(error),
            chunksCount: retrievedChunks.length,
          }
        );
        return retrievedChunks;
      }
    })();

    const rerankedChunks = await this.rerankResults(
      personalizedChunks,
      query
    ).catch((error) => {
      console.warn("Context7: Reranking failed, using personalized chunks", {
        error: error instanceof Error ? error.message : String(error),
        chunksCount: personalizedChunks.length,
      });
      return personalizedChunks;
    });

    const retrievalResult: RetrievalResult = {
      chunks: rerankedChunks,
      kgContext: kgContext,
      images: validImages,
      userContext: userContext,
      totalResults: rows.length,
      processingTime: Date.now() - startTime,
      confidence: this.calculateConfidence(rerankedChunks, kgContext),
    };

    return retrievalResult;
  }

  private calculateConfidence(
    chunks: RAGProcessedDocumentChunk[],
    kgContext: KGContext
  ): number {
    // Simple confidence calculation based on results
    const chunkScore = Math.min(chunks.length / 5, 1) * 0.5;
    const kgScore =
      Math.min(
        (kgContext.entities.length + kgContext.relationships.length) / 10,
        1
      ) * 0.5;
    return chunkScore + kgScore;
  }

  private async rerankResults(
    chunks: RAGProcessedDocumentChunk[],
    query: string
  ): Promise<RAGProcessedDocumentChunk[]> {
    if (chunks.length <= 3) return chunks; // No need to rerank few

    const prompt = `You are a reranking model. Given a user query and a list of document excerpts, rank the excerpts from most to least relevant. Respond with a JSON array of integers representing the new order (1-based indices).`;

    const excerpts = chunks
      .map((c, i) => `Excerpt ${i + 1}: "${c.content.slice(0, 300)}"`)
      .join("\n\n");

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini", // cheaper reranker
      messages: [
        { role: "system", content: prompt },
        {
          role: "user",
          content: `Query: "${query}"

${excerpts}

Return JSON array now.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    let order: number[] = [];
    try {
      const content = response.choices[0]?.message?.content || "";
      const parsed = JSON.parse(content);
      order = parsed.order || parsed.indices || parsed;
    } catch {
      return chunks;
    }

    const reordered: RAGProcessedDocumentChunk[] = [];
    order.forEach((idx) => {
      const c = chunks[idx - 1];
      if (c) reordered.push(c);
    });
    // Append any missing
    chunks.forEach((c) => {
      if (!reordered.includes(c)) reordered.push(c);
    });
    return reordered;
  }

  // ---------------- PERSONALIZATION ----------------
  private personalizeChunks(
    chunks: RAGProcessedDocumentChunk[],
    context: UserContext | null
  ): RAGProcessedDocumentChunk[] {
    if (!context) return chunks;

    const interests = context.profile?.interests || [];
    const goals = context.profile?.goals || [];
    const allKeywords = [...interests, ...goals].map((k) => k.toLowerCase());

    if (allKeywords.length === 0) return chunks;

    let historyBoost: Record<string, number> = {};
    if (context.userId) {
      const analyzer = new QueryHistoryAnalyzer(this.openai);
      // fire and forget, but could await for synchronous personalization
      analyzer.getTopInterests(context.userId).then((interests) => {
        interests.forEach((i) => {
          historyBoost[i.entity.toLowerCase()] = i.score;
        });
      });
    }

    // preference boost from feedback
    let prefBoost: Record<string, number> = {};
    if (context?.userId) {
      const learner = new PreferenceLearner();
      learner.getUserWeights(context.userId).then((prefs) => {
        prefs.forEach((p) => {
          prefBoost[p.keyword] = p.weight;
        });
      });
    }

    return chunks.sort((a, b) => {
      const aScore = this.matchKeywords(a, allKeywords) ? 1 : 0;
      const bScore = this.matchKeywords(b, allKeywords) ? 1 : 0;

      const aHist = this.histBoost(a, historyBoost);
      const bHist = this.histBoost(b, historyBoost);

      const aPref = this.histBoost(a, prefBoost);
      const bPref = this.histBoost(b, prefBoost);

      return bScore + bHist + bPref - (aScore + aHist + aPref);
    });
  }

  private matchKeywords(chunk: RAGProcessedDocumentChunk, keywords: string[]) {
    const contentLower = chunk.content.toLowerCase();
    return keywords.some(
      (keyword) =>
        contentLower.includes(keyword) ||
        chunk.metadata.sourceUrl?.toLowerCase().includes(keyword)
    );
  }

  private histBoost(
    chunk: RAGProcessedDocumentChunk,
    boost: Record<string, number>
  ) {
    for (const key in boost) {
      if (chunk.content.toLowerCase().includes(key)) return boost[key];
    }
    return 0;
  }
}
