/**
 * Scheduled Scraping API
 * 
 * This API route is designed to be called by a scheduler (e.g., Supabase cron job)
 * to perform periodic scraping of sources. It can also be triggered manually.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { 
  getSourcesDueForScraping, 
  recordScrape,
  getScrapingSourceById
} from '@/lib/supabase/scraping-sources';
import { scrapeUrl } from '@/lib/firecrawl/client';
import { summarizeText } from '@/lib/ai/summarize';
import { extractImmigrationData } from '@/lib/ai/extract-immigration-data';

// Set a longer timeout for this function
export const maxDuration = 120; // 2 minutes

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// API Key for cron job authentication (should match the one in the Supabase function)
const API_KEY = process.env.SCRAPING_API_KEY || 'your-secure-api-key';

/**
 * Authenticate the request using API key or session
 */
async function authenticateRequest(request: Request): Promise<boolean> {
  // Check for API key in Authorization header (used by the cron job)
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const providedKey = authHeader.substring(7);
    return providedKey === API_KEY;
  }
  
  // Check for API key in query parameter (used for manual testing/direct calls)
  const url = new URL(request.url);
  const apiKey = url.searchParams.get('apiKey');
  if (apiKey) {
    return apiKey === API_KEY;
  }
  
  // If no API key, check for authenticated session (for manual triggers from the admin UI)
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error('Error checking session:', error);
    return false;
  }
}

// GET endpoint for cron job triggers
export async function GET(request: Request) {
  // Authenticate the request
  const isAuthorized = await authenticateRequest(request);
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Perform the scraping
  try {
    const result = await performScheduledScraping();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error during scheduled scraping:', error);
    return NextResponse.json(
      { error: 'Error performing scheduled scraping' },
      { status: 500 }
    );
  }
}

// POST endpoint for manual triggers
export async function POST(request: Request) {
  // Authenticate the request
  const isAuthorized = await authenticateRequest(request);
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const { sourceIds } = body;
    
    const result = await performScheduledScraping(sourceIds);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error during manual scraping:', error);
    return NextResponse.json(
      { error: 'Error performing manual scraping' },
      { status: 500 }
    );
  }
}

/**
 * Perform scheduled scraping of sources that are due
 * @param specificSourceIds Optional array of source IDs to scrape
 * @returns Results of the scraping operation
 */
async function performScheduledScraping(specificSourceIds?: string[]) {
  const results = {
    total: 0,
    successful: 0,
    failed: 0,
    sources: [] as any[]
  };
  
  try {
    // Get sources due for scraping
    let sources = specificSourceIds 
      ? await Promise.all(specificSourceIds.map(id => getSingleSourceById(id)))
      : await getSourcesDueForScraping();
    
    // Filter out any null results from getSingleSourceById
    sources = sources.filter(source => source !== null);
    
    results.total = sources.length;
    
    if (sources.length === 0) {
      return { message: 'No sources due for scraping', results };
    }
    
    // Process each source one by one to avoid rate limiting
    for (const source of sources) {
      if (!source) continue;
      
      const sourceResult = {
        id: source.id,
        name: source.name,
        url: source.url,
        status: 'pending' as 'success' | 'error' | 'pending',
        message: '',
        artifactId: ''
      };
      
      try {
        // Record the scrape attempt
        const scrapeRecord = await recordScrape(source.id, 'pending');
        
        // Scrape the URL
        const { html, text } = await scrapeUrl(source.url);
        
        if (!text || text.length < 10) {
          throw new Error('Insufficient content scraped');
        }
        
        // Generate a summary
        const summary = await summarizeText(text, {
          maxTokens: 1000,
          method: 'map-reduce',
          category: source.category
        });
        
        // Extract structured immigration data
        const immigrationData = await extractImmigrationData(text, source.url);
        
        // Save as an artifact in the database
        const { data: artifact, error } = await supabase
          .from('artifacts')
          .insert({
            user_id: null, // System-generated
            title: `Scraped: ${source.name}`,
            description: `Auto-scraped from ${source.url}`,
            content: {
              text: text.substring(0, 10000), // Limit to 10k chars to avoid DB size issues
              html: html.substring(0, 20000), // Limit to 20k chars
              summary,
              immigration_data: immigrationData,
              source_url: source.url,
              source_id: source.id
            },
            type: 'scraped',
            is_public: true,
            tags: ['scraped', source.category]
          })
          .select()
          .single();
        
        if (error) {
          throw new Error(`Failed to save artifact: ${error.message}`);
        }
        
        // Update the source's last_scraped timestamp
        await supabase
          .from('scraping_sources')
          .update({ last_scraped: new Date().toISOString() })
          .eq('id', source.id);
        
        // Update the scrape record
        await recordScrape(
          source.id, 
          'success', 
          text, 
          artifact.id
        );
        
        // Update result tracking
        sourceResult.status = 'success';
        sourceResult.message = 'Successfully scraped';
        sourceResult.artifactId = artifact.id;
        results.successful++;
      } catch (error: any) {
        console.error(`Error scraping ${source.name} (${source.url}):`, error);
        
        // Record the failed scrape
        await recordScrape(
          source.id, 
          'error', 
          undefined, 
          undefined, 
          error.message
        );
        
        // Update result tracking
        sourceResult.status = 'error';
        sourceResult.message = error.message;
        results.failed++;
      }
      
      results.sources.push(sourceResult);
      
      // Add a small delay between requests to avoid hammering external servers
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    return {
      message: `Scraping completed: ${results.successful} successful, ${results.failed} failed`,
      results
    };
  } catch (error: any) {
    console.error('Error in performScheduledScraping:', error);
    throw error;
  }
}

/**
 * Helper function to get a single source by ID
 */
async function getSingleSourceById(id: string) {
  try {
    return await getScrapingSourceById(id);
  } catch (error) {
    console.error(`Error getting source with ID ${id}:`, error);
    return null;
  }
} 