import { z } from 'zod';

import { getSupabaseClient } from '@/lib/supabase/client';

/**
 * Tool for extracting structured data from web pages using Firecrawl
 */
export const extractTool = {
  description: 'Extract structured data from web pages. Use this to get specific information from a URL.',
  parameters: z.object({
    urls: z.array(z.string()).describe('Array of URLs to extract data from'),
    prompt: z.string().describe('Description of what data to extract'),
  }),
  execute: async ({ urls, prompt }: { urls: string[]; prompt: string }) => {
    try {
      // Call the extraction API
      const response = await fetch('/api/ai/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls,
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Extraction request failed with status ${response.status}`);
      }

      const result = await response.json();
      
      // Save extraction results to the database
      try {
        const supabase = getSupabaseClient();
        await supabase.from('extraction_queries').insert({
          urls,
          prompt,
          results: result.data,
          created_at: new Date().toISOString(),
        });
      } catch (dbError) {
        // Don't fail the extraction if database storage fails
        console.error('Failed to save extraction results:', dbError);
      }

      return {
        data: result.data,
        success: true,
      };
    } catch (error) {
      console.error('Extraction error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred during extraction',
        success: false,
      };
    }
  },
}; 