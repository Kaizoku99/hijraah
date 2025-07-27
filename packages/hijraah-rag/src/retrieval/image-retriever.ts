import { OpenAI } from "openai";
import { RetrievedImage, RetrievalError } from "../types.js";
import { createClient } from "@supabase/supabase-js";

export class ImageRetriever {
  private openai: OpenAI;
  private supabase;

  constructor(openai: OpenAI) {
    this.openai = openai;

    // Initialize Supabase client for image search
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!supabaseUrl || !supabaseKey) {
      console.warn(
        "Supabase credentials not found, image retrieval will be limited",
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async retrieve(query: string, limit = 5): Promise<RetrievedImage[]> {
    // Generate embedding for image search
    let embedding: number[] = [];

    try {
      embedding = (
        await this.openai.embeddings.create({
          model: "text-embedding-3-small",
          input: query,
        })
      ).data[0].embedding;
    } catch (err: any) {
      if (
        err?.code === "model_not_found" ||
        /model .* does not exist/i.test(err?.message ?? "")
      ) {
        // Retry once with large model
        console.warn(
          "text-embedding-3-small unavailable, retrying with text-embedding-3-large",
        );
        try {
          embedding = (
            await this.openai.embeddings.create({
              model: "text-embedding-3-large",
              input: query,
            })
          ).data[0].embedding;
        } catch (retryErr) {
          throw new RetrievalError(
            "Failed to generate embedding for image search",
            retryErr,
          );
        }
      } else {
        console.error("Embedding generation failed", err);
        return [];
      }
    }

    // Search image_embeddings by vector distance
    try {
      const { data, error } = await this.supabase.rpc(
        "match_image_embeddings",
        {
          p_query_embedding: embedding,
          p_match_count: limit,
        },
      );

      if (error) {
        console.error("Image search error", error.message);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.image_url || crypto.randomUUID(),
        url: row.image_url,
        metadata: row.metadata || {},
        score: row.similarity,
      }));
    } catch (error) {
      console.warn("Image retrieval failed:", error);
      return [];
    }
  }

  // Alternative search method using metadata
  async searchByMetadata(
    filters: Record<string, any>,
    limit = 5,
  ): Promise<RetrievedImage[]> {
    try {
      let query = this.supabase
        .from("image_embeddings")
        .select("image_url, metadata, created_at");

      // Apply filters to metadata JSONB column
      Object.entries(filters).forEach(([key, value]) => {
        query = query.filter(`metadata->>${key}`, "eq", value);
      });

      const { data, error } = await query.limit(limit);

      if (error) {
        console.error("Metadata search error", error.message);
        return [];
      }

      return (data || []).map((row: any, index: number) => ({
        id: row.image_url || crypto.randomUUID(),
        url: row.image_url,
        metadata: row.metadata || {},
        score: 1 - index * 0.1, // Simple ranking by order
      }));
    } catch (error) {
      console.warn("Metadata search failed:", error);
      return [];
    }
  }

  // Context7 Pattern: Caching frequently accessed images
  private imageCache = new Map<string, RetrievedImage[]>();

  async retrieveWithCache(
    query: string,
    limit = 5,
    cacheTTL = 3600000, // 1 hour
  ): Promise<RetrievedImage[]> {
    const cacheKey = `${query}-${limit}`;
    const cached = this.imageCache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const results = await this.retrieve(query, limit);
    this.imageCache.set(cacheKey, results);

    // Clear cache after TTL
    setTimeout(() => {
      this.imageCache.delete(cacheKey);
    }, cacheTTL);

    return results;
  }
}
