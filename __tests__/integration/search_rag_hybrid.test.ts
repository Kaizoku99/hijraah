import { createClient } from "@supabase/supabase-js";

// Integration test to guard against RPC contract drift
// Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars when running tests

describe("search_rag_hybrid RPC", () => {
  const supabaseUrl = process.env.SUPABASE_URL as string;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn(
      "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set; skipping integration test."
    );
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  it("returns expected column shape", async () => {
    // Use a dummy embedding (all zeros) – similarity threshold set to 0 so that any rows qualify.
    const dummyEmbedding = new Array(1536).fill(0);

    const { data, error } = await supabase.rpc("search_rag_hybrid", {
      p_query_embedding: dummyEmbedding,
      p_query_text: "test",
      p_match_count: 1,
      p_similarity_threshold: 0,
    });

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);

    if (data && data.length > 0) {
      const item = data[0] as Record<string, any>;
      expect(item).toHaveProperty("content");
      expect(item).toHaveProperty("source_url");
      expect(item).toHaveProperty("document_id");
      expect(item).toHaveProperty("chunk_index");
    }
  });
});
