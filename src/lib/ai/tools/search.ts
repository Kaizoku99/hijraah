import { tool } from 'ai';
import { z } from 'zod';
import { getSupabaseClient } from '@/lib/supabase/client';

/**
 * Tool for searching the web using Firecrawl or other available search services
 */
export const searchTool = {
  description: 'Search for web pages. Use this to find information on any topic.',
  parameters: z.object({
    query: z.string().describe('Search query to find relevant web pages'),
    maxResults: z.number().optional().describe('Maximum number of results to return (default 5)'),
  }),
  execute: async ({ query, maxResults = 5 }: { query: string; maxResults?: number }) => {
    try {
      // Initialize search service - in this case we're using an API route that will use Firecrawl
      const response = await fetch('/api/ai/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          maxResults,
        }),
      });

      if (!response.ok) {
        throw new Error(`Search request failed with status ${response.status}`);
      }

      const result = await response.json();

      // Add favicon URLs to search results
      const resultsWithFavicons = result.data.map((result: any) => {
        try {
          const url = new URL(result.url);
          const favicon = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
          return {
            ...result,
            favicon,
          };
        } catch (error) {
          // If URL parsing fails, return the original result without a favicon
          return result;
        }
      });
      
      // Save search results to the database for future reference
      try {
        const supabase = getSupabaseClient();
        await supabase.from('search_queries').insert({
          query,
          results: resultsWithFavicons,
          created_at: new Date().toISOString(),
        });
      } catch (dbError) {
        // Don't fail the search if database storage fails
        console.error('Failed to save search results:', dbError);
      }

      return {
        data: resultsWithFavicons,
        success: true,
      };
    } catch (error) {
      console.error('Search error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred during search',
        success: false,
      };
    }
  },
}; 