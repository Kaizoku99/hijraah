import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getSupabaseClient } from '@/lib/supabase/client';

// For API optimization - using Node.js runtime
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Set max duration to 60 seconds

// Schema for request validation
const extractSchema = z.object({
  urls: z.array(z.string().url()),
  prompt: z.string().min(1, "Prompt cannot be empty"),
});

// Define an interface for the extraction results
interface ExtractionResult {
  success: boolean;
  data: any;
  error?: string;
}

/**
 * API route for extracting data from URLs using Firecrawl or other services
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { urls, prompt } = extractSchema.parse(body);

    // If using Firecrawl, instantiate the client
    if (process.env.FIRECRAWL_API_KEY) {
      try {
        // Using proper dynamic import
        let extractionResult: ExtractionResult;
        
        try {
          // Standard dynamic import
          const firecrawlImport = await import('@mendable/firecrawl-js');
          const FirecrawlApp = firecrawlImport.default;
          
          const firecrawl = new FirecrawlApp({
            apiKey: process.env.FIRECRAWL_API_KEY
          });

          // Perform the extraction
          extractionResult = await firecrawl.extract(urls, {
            prompt,
          });
        } catch (importError) {
          console.error('Firecrawl not available:', importError);
          throw new Error('Extraction service not available');
        }

        if (!extractionResult.success) {
          throw new Error(extractionResult.error || 'Extraction failed');
        }

        // Log the extraction for analytics
        try {
          const supabase = getSupabaseClient();
          await supabase.from('extraction_queries').insert({
            urls: urls.join(','),
            prompt,
            timestamp: new Date().toISOString(),
          });
        } catch (logError) {
          // Just log the error but don't fail the request
          console.error('Failed to log extraction:', logError);
        }

        return NextResponse.json({
          success: true,
          data: extractionResult.data,
        });
      } catch (error) {
        console.error('Firecrawl extraction error:', error);
        throw error;
      }
    } else {
      // Fallback for when Firecrawl is not available
      return NextResponse.json({
        success: true,
        data: {
          extracted: `This is a fallback response because the extraction service is not configured. You wanted to extract information about "${prompt}" from ${urls.length} URLs.`,
        },
      });
    }
  } catch (error) {
    console.error('Extraction API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
} 