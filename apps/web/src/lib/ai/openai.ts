import { OpenAI } from "openai";
import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { createHash } from "crypto";

let openai: OpenAI;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} else {
  console.warn(
    "OPENAI_API_KEY environment variable is not set. AI-related features will be disabled."
  );
}

export async function generateEmbedding(
  text: string,
  model = "text-embedding-3-small"
): Promise<number[]> {
  if (!openai) {
    throw new Error(
      "OpenAI client is not initialized. Please set OPENAI_API_KEY."
    );
  }

  const normalized = text.replace(/\s+/g, " ").trim();
  const hash = createHash("sha256").update(normalized).digest("hex");
  const supabase = createSupabaseClient("service");

  // Try cache first
  const { data: cached } = await supabase
    .from("embedding_cache")
    .select("embedding")
    .eq("text_hash", hash)
    .maybeSingle();
  if (cached?.embedding) {
    return cached.embedding as number[];
  }

  // Generate via OpenAI
  const input = normalized;
  const { data } = await openai.embeddings.create({ model, input });
  if (!data || data.length === 0) {
    throw new Error("Failed to generate embedding: No data returned.");
  }
  const embedding = data[0].embedding;

  // Insert into cache
  await supabase.from("embedding_cache").insert({
    text_hash: hash,
    text: input.slice(0, 1000),
    embedding,
  });

  return embedding;
}
