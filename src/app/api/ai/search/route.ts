import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseClient } from '@/lib/supabase/client';

// For API optimization
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Set max duration to 60 seconds

// Schema for request validation
const searchSchema = z.object({
  query: z.string().min(1, "Query cannot be empty"),
  maxResults: z.number().optional().default(5),
});

// Define an interface for the search results
interface SearchResult {
  success: boolean;
  data: Array<{
    url: string;
    title: string;
    snippet: string;
    [key: string]: any;
  }>;
  error?: string;
}

/**
 * API route for searching using Firecrawl or other services
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { query, maxResults } = searchSchema.parse(body);

    // If using Firecrawl, instantiate the client
    if (process.env.FIRECRAWL_API_KEY) {
      try {
        // Using a more basic approach to dynamic import for compatibility
        let searchResult: SearchResult;
        
        try {
          // Use eval to avoid TypeScript errors with dynamic imports
          // We're in a try/catch block so this is safe
          const firecrawlImport = await eval("import('@mendable/firecrawl-js')");
          const FirecrawlApp = firecrawlImport.default;
          
          const firecrawl = new FirecrawlApp({
            apiKey: process.env.FIRECRAWL_API_KEY
          });

          // Perform the search
          searchResult = await firecrawl.search(query);
        } catch (importError) {
          console.error('Firecrawl not available:', importError);
          throw new Error('Search service not available');
        }

        if (!searchResult.success) {
          throw new Error(searchResult.error || 'Search failed');
        }

        // Format results
        const formattedResults = searchResult.data.slice(0, maxResults);

        // Log the search for analytics
        try {
          const supabase = getSupabaseClient();
          await supabase.from('user_searches').insert({
            query,
            result_count: formattedResults.length,
            timestamp: new Date().toISOString(),
          });
        } catch (logError) {
          // Just log the error but don't fail the request
          console.error('Failed to log search:', logError);
        }

        return NextResponse.json({
          success: true,
          data: formattedResults,
        });
      } catch (error) {
        console.error('Firecrawl search error:', error);
        throw error;
      }
    } else {
      // Fallback to a simple search implementation
      // In a real implementation, you might use another search service
      return NextResponse.json({
        success: true,
        data: [
          {
            url: 'https://example.com/fallback',
            title: 'Fallback Result (Firecrawl not configured)',
            snippet: `This is a fallback result because Firecrawl is not configured. Your query was: "${query}"`,
          }
        ],
      });
    }
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
} 