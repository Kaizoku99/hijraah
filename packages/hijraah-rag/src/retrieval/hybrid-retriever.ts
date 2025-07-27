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

    // Initialize Upstash clients
    this.vectorCache = new Index({
      url: process.env.UPSTASH_VECTOR_URL!,
      token: process.env.UPSTASH_VECTOR_TOKEN!,
    });

    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    });
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
        { onConflict: "id" },
      );

    if (docError) {
      throw new RetrievalError(
        `Error storing document metadata: ${docError.message}`,
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
          `Error storing document chunks: ${chunkError.message}`,
        );
      }
    }
  }

  private async getUserProfile(userId: string): Promise<UserContext | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select(
        "id, country_of_residence, country_of_interest, country_of_citizenship, immigration_goals",
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
    userContext?: UserContext | null,
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
        error,
      );
      return {
        embedding_query: query,
        full_text_query: query.split(" ").join(" | "),
      };
    }
  }

  private async extractEntitiesFromQuery(
    query: string,
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
    entities: { name: string; type: string }[],
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
        return { entities, relationships: [] };
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
    queryHash: string,
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
        data.retrieved_chunks,
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
        JSON.stringify(result),
      );
    } catch (err) {
      console.warn("Cache write error", err);
    }
  }

  // Enhanced search method with multi-level caching
  async search(
    query: string,
    options: Partial<RetrievalQuery> = {},
  ): Promise<RetrievalResult> {
    const startTime = Date.now();
    const queryOptions: QueryOptions = {
      limit: options.limit,
      threshold: options.threshold,
      userId: options.userId,
    };
    const queryHash = this.hashQuery(query, queryOptions);

    try {
      // L1 Cache: Check Redis for exact query results
      const redisKey = `hybrid:${queryHash}`;
      const redisResult = await this.redis.get(redisKey);
      if (redisResult) {
        console.log("✅ Redis cache hit");
        const cached = JSON.parse(redisResult as string);
        return cached;
      }

      // L2 Cache: Check Supabase cache
      const cached = await this.getCachedRetrieval(queryHash);
      if (cached && cached.chunks && cached.kgContext) {
        // Populate Redis cache for next time
        const fullResult: RetrievalResult = {
          chunks: cached.chunks,
          kgContext: cached.kgContext,
          totalResults: cached.totalResults!,
          processingTime: Date.now() - startTime,
          confidence: cached.confidence!,
        };
        await this.redis.setex(redisKey, 3600, JSON.stringify(fullResult));
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
        userContext,
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
          console.log("✅ Upstash vector cache hit");
          const cachedResult = vectorCacheResults[0].metadata as any;
          if (cachedResult?.result) {
            return cachedResult.result;
          }
        }
      } catch (vectorCacheError) {
        console.warn("Vector cache query failed:", vectorCacheError);
      }

      // L4 Storage: Perform actual retrieval
      console.log("🔍 Cache miss, performing retrieval");
      const result = await this._searchWithoutCache(query, queryOptions);

      // Cache the results for future queries
      await this.cacheRetrieval(queryHash, result);

      // Cache query embedding for semantic similarity
      const nsIndex = userId
        ? this.vectorCache.namespace(`user_${userId}`)
        : this.vectorCache;

      await nsIndex.upsert({
        id: queryHash,
        vector: queryEmbedding,
        metadata: {
          query,
          result,
          cachedAt: Date.now(),
        },
      });

      return result;
    } catch (error) {
      console.error("Enhanced hybrid retrieval failed:", error);
      throw new RetrievalError("Failed to perform hybrid search", error);
    }
  }

  // Extract existing search logic into private _searchWithoutCache
  private async _searchWithoutCache(
    query: string,
    options: QueryOptions = {},
  ): Promise<RetrievalResult> {
    const startTime = Date.now();
    const { limit = 10, threshold = 0.7, userId } = options;

    let userContext: UserContext | null = null;
    if (userId) {
      userContext = await this.getUserProfile(userId);
    }

    // 1. Understand Query
    const { embedding_query, full_text_query } = await this.understandQuery(
      query,
      userContext,
    );

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
      },
    );

    if (chunksError) {
      throw new RetrievalError(`Search error: ${chunksError.message}`);
    }

    const rows: SearchRAGHybridRow[] = (chunksData ||
      []) as SearchRAGHybridRow[];

    // Structured log for observability (non-cached path)
    console.log(
      "[HybridRetriever] _searchWithoutCache top 3:",
      rows.slice(0, 3).map((r) => ({ id: r.chunk_id, score: r.final_score })),
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

    // 4. Extract Entities and Search Knowledge Graph
    const extractedEntities = await this.extractEntitiesFromQuery(query);
    const kgContext = await this.searchKnowledgeGraph(extractedEntities);

    // Image search
    const imageRetriever = new ImageRetriever(this.openai);
    const images = await imageRetriever.retrieve(query, 5);

    // 5. Personalization based on user profile
    const personalizedChunks = this.personalizeChunks(
      retrievedChunks,
      userContext,
    );

    const rerankedChunks = await this.rerankResults(personalizedChunks, query);

    const retrievalResult: RetrievalResult = {
      chunks: rerankedChunks,
      kgContext: kgContext,
      images,
      userContext: userContext,
      totalResults: rows.length,
      processingTime: Date.now() - startTime,
      confidence: this.calculateConfidence(rerankedChunks, kgContext),
    };

    return retrievalResult;
  }

  private calculateConfidence(
    chunks: RAGProcessedDocumentChunk[],
    kgContext: KGContext,
  ): number {
    // Simple confidence calculation based on results
    const chunkScore = Math.min(chunks.length / 5, 1) * 0.5;
    const kgScore =
      Math.min(
        (kgContext.entities.length + kgContext.relationships.length) / 10,
        1,
      ) * 0.5;
    return chunkScore + kgScore;
  }

  private async rerankResults(
    chunks: RAGProcessedDocumentChunk[],
    query: string,
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
    context: UserContext | null,
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
        chunk.metadata.sourceUrl?.toLowerCase().includes(keyword),
    );
  }

  private histBoost(
    chunk: RAGProcessedDocumentChunk,
    boost: Record<string, number>,
  ) {
    for (const key in boost) {
      if (chunk.content.toLowerCase().includes(key)) return boost[key];
    }
    return 0;
  }
}
