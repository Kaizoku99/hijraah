import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseClient } from '@/lib/supabase/client';

// For API optimization
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Set max duration to 60 seconds

// Schema for request validation
const scrapeSchema = z.object({
  url: z.string().url(),
});

// Define an interface for the scrape results
interface ScrapeResult {
  success: boolean;
  markdown?: string;
  data?: any;
  error?: string;
}

/**
 * API route for scraping content from a URL using Firecrawl or other services
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { url } = scrapeSchema.parse(body);

    // If using Firecrawl, instantiate the client
    if (process.env.FIRECRAWL_API_KEY) {
      try {
        // Using a more basic approach to dynamic import for compatibility
        let scrapeResult: ScrapeResult;
        
        try {
          // Use eval to avoid TypeScript errors with dynamic imports
          // We're in a try/catch block so this is safe
          const firecrawlImport = await eval("import('@mendable/firecrawl-js')");
          const FirecrawlApp = firecrawlImport.default;
          
          const firecrawl = new FirecrawlApp({
            apiKey: process.env.FIRECRAWL_API_KEY
          });

          // Perform the scrape
          scrapeResult = await firecrawl.scrapeUrl(url);
        } catch (importError) {
          console.error('Firecrawl not available:', importError);
          throw new Error('Scrape service not available');
        }

        if (!scrapeResult.success) {
          throw new Error(scrapeResult.error || 'Scrape failed');
        }

        // Log the scrape for analytics
        try {
          const supabase = getSupabaseClient();
          await supabase.from('scrape_queries').insert({
            url,
            timestamp: new Date().toISOString(),
          });
        } catch (logError) {
          // Just log the error but don't fail the request
          console.error('Failed to log scrape:', logError);
        }

        return NextResponse.json({
          success: true,
          markdown: scrapeResult.markdown,
          data: scrapeResult.data,
        });
      } catch (error) {
        console.error('Firecrawl scrape error:', error);
        throw error;
      }
    } else {
      // Fallback for when Firecrawl is not available
      return NextResponse.json({
        success: true,
        markdown: `# Fallback Content\n\nThis is a fallback response because the scrape service is not configured. You wanted to scrape content from "${url}".`,
      });
    }
  } catch (error) {
    console.error('Scrape API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
} 