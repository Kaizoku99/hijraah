import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { withCache } from "@/lib/redis";
import { withCircuitBreakerRoute } from "@/lib/circuit-breaker";

// Validation schema
const webSearchSchema = z.object({
  query: z.string().min(1, "Query cannot be empty"),
  maxResults: z.coerce.number().int().positive().optional().default(5),
});

async function webSearchHandler(req: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const rawParams = {
      query: searchParams.get("query"),
      maxResults: searchParams.get("maxResults"),
    };

    // Validate input
    const { query, maxResults } = webSearchSchema.parse(rawParams);

    // Dynamically import Firecrawl ONLY if the API key is present
    if (process.env.FIRECRAWL_API_KEY) {
      try {
        const firecrawlImport = await import("@mendable/firecrawl-js");
        const FirecrawlApp = firecrawlImport.default;

        const firecrawl = new FirecrawlApp({
          apiKey: process.env.FIRECRAWL_API_KEY,
        });

        // Perform the search using Firecrawl
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
          return NextResponse.json(
            {
              error: "Web search failed",
              details:
                searchResult?.error ||
                "Unknown Firecrawl error or invalid format",
            },
            { status: 502 },
          );
        }

        // Format results
        const formattedResults = searchResult.data
          .slice(0, maxResults)
          .map((item: any) => ({
            url: item.url,
            title: item.title,
            snippet:
              item.snippet ||
              item.markdown?.substring(0, 200) ||
              item.content?.substring(0, 200) ||
              "",
          }));

        return NextResponse.json({
          success: true,
          query,
          data: formattedResults,
        });
      } catch (importError) {
        console.error("Failed to import or use Firecrawl:", importError);
        return NextResponse.json(
          {
            success: false,
            error: "Web search service unavailable",
            details: (importError as Error).message,
          },
          { status: 503 },
        );
      }
    } else {
      // Fallback if Firecrawl is not configured
      console.warn(
        "Firecrawl API key not configured. Returning fallback web search result.",
      );
      return NextResponse.json({
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
  } catch (error: any) {
    console.error("Web search API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: error.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

// Apply circuit breaker and caching
const protectedHandler = withCircuitBreakerRoute(
  withCache(webSearchHandler, {
    ttl: 600, // Cache for 10 minutes (web search results change less frequently)
    key: (req) => {
      const url = new URL(req.url);
      return `web-search:${url.searchParams.toString()}`;
    },
  }),
  {
    maxFailures: 5,
    resetTimeout: 60000, // 1 minute
  },
);

export const GET = protectedHandler;
