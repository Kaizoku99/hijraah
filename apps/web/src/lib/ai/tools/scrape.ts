import { z } from 'zod';

import { getSupabaseClient } from '@/lib/supabase/client';

/**
 * Tool for scraping web pages using Firecrawl or other available services
 */
export const scrapeTool = {
  description: 'Scrape web pages. Use this to get raw content from a URL.',
  parameters: z.object({
    url: z.string().describe('URL to scrape'),
  }),
  execute: async ({ url }: { url: string }) => {
    try {
      // Call the scraping API
      const response = await fetch('/api/ai/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
        }),
      });

      if (!response.ok) {
        throw new Error(`Scraping request failed with status ${response.status}`);
      }

      const result = await response.json();
      
      // Save scraping results to the database
      try {
        const supabase = getSupabaseClient();
        await supabase.from('scrape_queries').insert({
          url,
          content: result.markdown || result.data,
          created_at: new Date().toISOString(),
        });
      } catch (dbError) {
        // Don't fail the scraping if database storage fails
        console.error('Failed to save scraping results:', dbError);
      }

      return {
        data: result.markdown || result.data || 'Could not get the page content, try using search or extract',
        success: true,
      };
    } catch (error) {
      console.error('Scraping error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred during scraping',
        success: false,
      };
    }
  },
}; 