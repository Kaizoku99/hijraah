import { zValidator } from "@hono/zod-validator";
import { createClient } from "@supabase/supabase-js";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { z } from "zod";

import { generateEmbedding } from "@/lib/openai"; // Used for internal search
import { getSupabaseClient } from "@/lib/supabase/client"; // Used for Firecrawl logging

// --- Hono App Setup --- //
const app = new Hono().basePath("/api/search");

// --- Middleware --- //
app.use("*", cors());
// TODO: Add authentication middleware if needed, especially if logging user searches

// --- Supabase Clients --- //
// Client for semantic search RPC
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// --- Schemas --- //
const internalSearchSchema = z.object({
  query: z.string().min(1, "Query parameter is required"),
  limit: z.coerce.number().int().positive().optional().default(5), // Coerce to number
  threshold: z.coerce.number().min(0).max(1).optional().default(0.7), // Coerce to number
  visibility: z.string().optional(), // Keep as string for flexibility
});

const webSearchSchema = z.object({
  query: z.string().min(1, "Query cannot be empty"),
  maxResults: z.coerce.number().int().positive().optional().default(5), // Coerce to number
});

// Define an interface for the Firecrawl search results
// Adjusted based on assumed structure from firecrawl.search()
interface FirecrawlSearchResult {
  success: boolean;
  data: Array<{
    url: string;
    title: string;
    snippet?: string; // Make snippet optional or check library type
    content?: string; // Firecrawl might return content or markdown
    markdown?: string;
    metadata?: Record<string, any>; // Include metadata
    [key: string]: any; // Allow other potential fields
  }>;
  error?: string;
}

// --- Internal Semantic Search Route --- //
app.get("/internal", zValidator("query", internalSearchSchema), async (c) => {
  const { query, limit, threshold, visibility } = c.req.valid("query");

  try {
    // Generate embedding for the search query
    const embedding = await generateEmbedding(query);

    // Perform similarity search using the match_artifacts function
    const { data: results, error } = await supabaseAdmin.rpc(
      "match_artifacts",
      {
        query_embedding: embedding,
        match_threshold: threshold,
        match_count: limit,
        filter_visibility: visibility, // Pass visibility directly
      },
    );

    if (error) {
      console.error("Error performing semantic search:", error);
      return c.json(
        { error: "Error during semantic search", details: error.message },
        500,
      );
    }

    return c.json({
      query,
      results: results || [],
    });
  } catch (error: any) {
    console.error("Error in internal search API:", error);
    return c.json(
      { error: "Internal server error", details: error.message },
      500,
    );
  }
});

// --- External Web Search Route --- //
app.get("/web", zValidator("query", webSearchSchema), async (c) => {
  const { query, maxResults } = c.req.valid("query");
  // const userId = c.get('userId'); // Get userId from auth middleware if implemented

  try {
    // Dynamically import Firecrawl ONLY if the API key is present
    if (process.env.FIRECRAWL_API_KEY) {
      try {
        const firecrawlImport = await import("@mendable/firecrawl-js");
        const FirecrawlApp = firecrawlImport.default;

        const firecrawl = new FirecrawlApp({
          apiKey: process.env.FIRECRAWL_API_KEY,
        });

        // Perform the search using Firecrawl
        // Using `any` temporarily to bypass strict type checking until library types are fully resolved
        const searchResult: any = await firecrawl.search(query);

        // Robust check for success and data presence
        if (
          !searchResult ||
          !searchResult.success ||
          !Array.isArray(searchResult.data)
        ) {
          console.error(
            "Firecrawl search failed or returned unexpected format:",
            searchResult?.error,
          );
          return c.json(
            {
              error: "Web search failed",
              details:
                searchResult?.error ||
                "Unknown Firecrawl error or invalid format",
            },
            502,
          );
        }

        // Format results - adapt based on actual Firecrawl response structure
        const formattedResults = searchResult.data
          .slice(0, maxResults)
          .map((item: any) => ({
            url: item.url,
            title: item.title,
            snippet:
              item.snippet ||
              item.markdown?.substring(0, 200) ||
              item.content?.substring(0, 200) ||
              "", // Prioritize snippet, then markdown/content excerpt
            // Include other relevant fields if needed
          }));

        // Log the search for analytics (Optional: Requires user context)
        // if (userId) {
        //   try {
        //     const supabaseLogger = getSupabaseClient(); // Use appropriate client
        //     await supabaseLogger.from('user_searches').insert({
        //       query,
        //       result_count: formattedResults.length,
        //       timestamp: new Date().toISOString(),
        //       user_id: userId, // Include user ID if available
        //       search_type: 'web' // Add type for clarity
        //     });
        //   } catch (logError) {
        //     console.error('Failed to log web search:', logError); // Log but don't fail request
        //   }
        // }

        return c.json({
          success: true,
          query,
          data: formattedResults,
        });
      } catch (importError) {
        console.error("Failed to import or use Firecrawl:", importError);
        return c.json(
          {
            success: false,
            error: "Web search service unavailable",
            details: (importError as Error).message,
          },
          503,
        ); // 503 Service Unavailable
      }
    } else {
      // Fallback if Firecrawl is not configured
      console.warn(
        "Firecrawl API key not configured. Returning fallback web search result.",
      );
      return c.json({
        success: true,
        query,
        data: [
          {
            url: "https://example.com/fallback",
            title: "Fallback Result (Firecrawl not configured)",
            snippet: `This is a fallback result because Firecrawl is not configured. Your query was: "${query}"`,
          },
        ],
      });
    }
  } catch (error) {
    console.error("Web search API error:", error);
    // Distinguish Zod errors (Bad Request) from others (Internal Server Error)
    const status = error instanceof z.ZodError ? 400 : 500;
    const message =
      error instanceof z.ZodError
        ? "Invalid query parameters"
        : "Internal server error";
    return c.json(
      {
        success: false,
        error: message,
        details:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status },
    );
  }
});

// --- Export Hono App --- //
export const GET = handle(app);
// Removed POST as both searches are now GET

// Optional: Specify runtime if needed
// export const runtime = 'edge'; // Or 'nodejs' if libraries require it
