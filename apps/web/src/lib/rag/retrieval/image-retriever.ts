import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { OpenAI } from "openai";
import { RetrievedImage } from "@/lib/rag/types";

export class ImageRetriever {
  private supabase = createSupabaseClient("service");
  private openai: OpenAI;

  constructor(openai: OpenAI) {
    this.openai = openai;
  }

  async retrieve(query: string, limit = 5): Promise<RetrievedImage[]> {
    // Generate embedding. image-embedding-001 is deprecated – switch to text-embedding-3-small with fallback.
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
        embedding = (
          await this.openai.embeddings.create({
            model: "text-embedding-3-large",
            input: query,
          })
        ).data[0].embedding;
      } else {
        console.error("Embedding generation failed", err);
        return [];
      }
    }

    // Search image_embeddings by vector distance
    const { data, error } = await this.supabase.rpc("match_image_embeddings", {
      p_query_embedding: embedding,
      p_match_count: limit,
    });

    if (error) {
      console.error("Image search error", error.message);
      return [];
    }

    return (data || []).map((row: any) => ({
      url: row.image_url,
      metadata: row.metadata || {},
      score: row.similarity,
    }));
  }
}
