import { NextResponse } from 'next/server';
import { scrapeUrl, ScrapingOptions } from '@/lib/firecrawl/client';
import { createClient } from '@supabase/supabase-js';
import { summarizeText } from '@/lib/ai/summarize';
import { extractImmigrationData } from '@/lib/ai/extract-immigration-data';

// Set the maximum duration for this function to ensure it has enough time to complete
export const maxDuration = 60; // 60 seconds

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { url, options, userId, generateSummary = true, extractData = true } = body;

    // Validate the URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Valid URL is required' },
        { status: 400 }
      );
    }

    // Validate the URL format
    try {
      new URL(url);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Scrape the URL using Firecrawl
    const scrapedContent = await scrapeUrl(url, options || {});

    // Initialize result object
    const result: any = {
      url,
      content: scrapedContent.content,
      title: scrapedContent.title,
      metadata: scrapedContent.metadata,
    };

    // Generate AI summary if requested
    if (generateSummary) {
      try {
        const summary = await summarizeText(scrapedContent.content, {
          maxTokens: 500,
          temperature: 0.3,
        });
        result.summary = summary;
      } catch (error) {
        console.error('Error generating summary:', error);
        result.summary = 'Failed to generate summary.';
      }
    }

    // Extract structured immigration data if requested
    if (extractData) {
      try {
        const immigrationData = await extractImmigrationData(
          scrapedContent.content,
          url
        );
        result.immigrationData = immigrationData;
      } catch (error) {
        console.error('Error extracting immigration data:', error);
        result.immigrationData = null;
      }
    }

    // Save to database if user ID is provided
    if (userId) {
      try {
        // Prepare artifact data
        const artifactData = {
          user_id: userId,
          title: scrapedContent.title || 'Scraped Content',
          content: {
            rawContent: scrapedContent.content,
            summary: result.summary || '',
            source_url: url,
            immigration_data: result.immigrationData || null,
            scraped_at: new Date().toISOString(),
          },
          type: 'scraped',
          visibility: 'private' as const,
        };

        // Insert into artifacts table
        const { data: artifact, error } = await supabase
          .from('artifacts')
          .insert(artifactData)
          .select()
          .single();

        if (error) {
          console.error('Error saving to database:', error);
          result.saved = false;
          result.error = error.message;
        } else {
          result.saved = true;
          result.artifact_id = artifact.id;
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        result.saved = false;
        result.error = 'Failed to save to database';
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Scraper API error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape content' },
      { status: 500 }
    );
  }
} 