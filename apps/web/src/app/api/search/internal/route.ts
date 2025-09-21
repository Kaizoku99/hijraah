import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

import { generateEmbedding } from "@/lib/openai";
import { withCache } from "@/lib/redis";
import { withCircuitBreakerRoute } from "@/lib/circuit-breaker";

// Supabase admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Validation schema
const internalSearchSchema = z.object({
  query: z.string().min(1, "Query parameter is required"),
  limit: z.coerce.number().int().positive().optional().default(5),
  threshold: z.coerce.number().min(0).max(1).optional().default(0.7),
  visibility: z.string().optional(),
});

async function internalSearchHandler(req: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const rawParams = {
      query: searchParams.get("query"),
      limit: searchParams.get("limit"),
      threshold: searchParams.get("threshold"),
      visibility: searchParams.get("visibility"),
    };

    // Validate input
    const { query, limit, threshold, visibility } = internalSearchSchema.parse(rawParams);

    // Generate embedding for the search query
    const embedding = await generateEmbedding(query);

    // Perform similarity search using the match_artifacts function
    const { data: results, error } = await supabaseAdmin.rpc(
      "match_artifacts",
      {
        query_embedding: embedding,
        match_threshold: threshold,
        match_count: limit,
        filter_visibility: visibility,
      },
    );

    if (error) {
      console.error("Error performing semantic search:", error);
      return NextResponse.json(
        { error: "Error during semantic search", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      query,
      results: results || [],
    });
  } catch (error: any) {
    console.error("Error in internal search API:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// Apply circuit breaker and caching
const protectedHandler = withCircuitBreakerRoute(
  withCache(internalSearchHandler, {
    ttl: 300, // Cache for 5 minutes
    key: (req) => {
      const url = new URL(req.url);
      return `internal-search:${url.searchParams.toString()}`;
    },
  }),
  {
    maxFailures: 3,
    resetTimeout: 30000, // 30 seconds
  },
);

export const GET = protectedHandler;
