import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { getSupabaseClient } from '@/lib/supabase/client';
import { createClient } from '@supabase/supabase-js';
import { customModel } from '@/lib/ai/models';

// For API optimization
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 120; // Set max duration to 120 seconds for deeper research

// Schema for request validation
const researchSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
  query: z.string().min(1, "Query cannot be empty"),
  maxDepth: z.number().optional().default(3),
});

/**
 * API route for starting a deep research session
 * This initiates a multi-stage research process that will:
 * 1. Perform initial search to identify primary sources
 * 2. Extract information from these sources
 * 3. Identify secondary sources for deeper research
 * 4. Synthesize findings into a comprehensive report
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { sessionId, query, maxDepth } = researchSchema.parse(body);

    // Get the user session
    const cookieStore = cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    // Initialize admin client for background operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
      },
    });

    // Use admin privileges to update the research session
    await supabase
      .from('research_sessions')
      .update({
        status: 'processing',
        metadata: {
          maxDepth,
          startTime: new Date().toISOString(),
        },
      })
      .eq('id', sessionId);

    // Start the research process in the background without waiting for it to finish
    // We're deliberately ignoring the promise to allow it to run in the background
    // after the response is sent
    (async () => {
      try {
        await startResearchProcess(sessionId, query, maxDepth, supabaseUrl, supabaseServiceKey);
      } catch (error: any) {
        console.error('Background research process error:', error);
        
        // Try to update the session with the error status
        try {
          const errorClient = createClient(supabaseUrl, supabaseServiceKey, {
            auth: { persistSession: false },
          });
          
          await errorClient
            .from('research_sessions')
            .update({
              status: 'error',
              metadata: {
                error: error.message || 'Unknown error',
                errorTime: new Date().toISOString(),
              },
            })
            .eq('id', sessionId);
            
          console.log('Updated session with error status');
        } catch (updateError) {
          console.error('Failed to update error status:', updateError);
        }
      }
    })();

    // Return successful response immediately
    return NextResponse.json({
      success: true,
      message: 'Research session started',
      sessionId,
    });
  } catch (error) {
    console.error('Research start API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
}

/**
 * Background process to conduct deep research
 * This runs asynchronously after the API returns
 */
async function startResearchProcess(
  sessionId: string,
  query: string,
  maxDepth: number,
  supabaseUrl: string,
  supabaseKey: string
) {
  // Create an admin client for this background process
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  // For storing sources and findings
  const sources: Array<{ url: string; title: string; relevance: number }> = [];
  const findings: Array<{ content: string; confidence: number }> = [];
  let currentDepth = 1;

  try {
    // Step 1: Initial Search
    await updateSession(supabase, sessionId, 'processing', {
      step: 'initial_search',
      currentDepth,
      progress: { completed: 0, total: maxDepth * 2 + 1 },
    });

    // Perform initial search
    const searchResponse = await fetch(`${supabaseUrl}/functions/v1/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ query, maxResults: 5 }),
    });

    if (!searchResponse.ok) {
      throw new Error('Initial search failed');
    }

    const searchResults = await searchResponse.json();
    
    // Add to sources
    sources.push(...searchResults.data.map((result: any) => ({
      url: result.url,
      title: result.title,
      relevance: 1.0, // High relevance for initial sources
    })));

    // Log sources to research_sources table
    await Promise.all(sources.map(source => 
      supabase.from('research_sources').insert({
        report_id: sessionId,
        url: source.url,
        title: source.title,
        relevance: source.relevance,
      })
    ));

    // Step 2: Extract and analyze information from initial sources
    await updateSession(supabase, sessionId, 'processing', {
      step: 'extract_analyze',
      currentDepth,
      progress: { completed: 1, total: maxDepth * 2 + 1 },
    });

    // Extract information from each source
    const initialExtractions = await Promise.all(
      sources.slice(0, 3).map(async (source) => {
        // Use AI to extract relevant information
        const model = customModel('claude-3-sonnet-20240229', false);
        
        // First, get the content
        const scrapeResponse = await fetch(`${supabaseUrl}/functions/v1/scrape`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({ url: source.url }),
        });

        if (!scrapeResponse.ok) {
          return {
            url: source.url,
            error: 'Failed to scrape content',
          };
        }

        const scrapeResult = await scrapeResponse.json();
        
        // Then analyze it
        const analyzeResponse = await fetch(`${supabaseUrl}/functions/v1/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({ 
            content: scrapeResult.markdown || scrapeResult.data,
            query,
          }),
        });

        if (!analyzeResponse.ok) {
          return {
            url: source.url,
            error: 'Failed to analyze content',
          };
        }

        const analysisResult = await analyzeResponse.json();
        
        // Store findings
        findings.push(...analysisResult.findings.map((finding: string) => ({
          content: finding,
          confidence: 0.8,
        })));

        return {
          url: source.url,
          findings: analysisResult.findings,
          summary: analysisResult.summary,
        };
      })
    );

    // Step 3: Recursive research for deeper insights (if maxDepth > 1)
    for (let depth = 2; depth <= maxDepth; depth++) {
      currentDepth = depth;
      
      await updateSession(supabase, sessionId, 'processing', {
        step: `depth_${depth}_search`,
        currentDepth,
        progress: { completed: (depth - 1) * 2 + 1, total: maxDepth * 2 + 1 },
      });

      // Use findings to generate new search queries
      const existingFindings = findings.map(f => f.content).join('\n');
      
      // Generate follow-up queries using AI
      const followUpResponse = await fetch(`${supabaseUrl}/functions/v1/generate-queries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ 
          originalQuery: query,
          findings: existingFindings,
          depth,
        }),
      });

      if (!followUpResponse.ok) {
        throw new Error(`Failed to generate follow-up queries at depth ${depth}`);
      }

      const followUpQueries = await followUpResponse.json();
      
      // Perform follow-up searches
      const deeperSearchResults = await Promise.all(
        followUpQueries.queries.slice(0, 2).map(async (followUpQuery: string) => {
          const searchResponse = await fetch(`${supabaseUrl}/functions/v1/search`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({ query: followUpQuery, maxResults: 3 }),
          });

          if (!searchResponse.ok) {
            return { query: followUpQuery, error: 'Search failed' };
          }

          return searchResponse.json();
        })
      );

      // Process and add new sources
      const newSources = deeperSearchResults.flatMap((result, index) => 
        result.data?.map((item: any) => ({
          url: item.url,
          title: item.title,
          relevance: 0.9 - (depth * 0.1),  // Decrease relevance with depth
          query: followUpQueries.queries[index],
        })) || []
      );

      // Add new sources to the database
      await Promise.all(newSources.map(source => 
        supabase.from('research_sources').insert({
          report_id: sessionId,
          url: source.url,
          title: source.title,
          relevance: source.relevance,
          description: `Found via follow-up query: ${source.query}`,
        })
      ));

      // Extract from new sources (just the top ones)
      await updateSession(supabase, sessionId, 'processing', {
        step: `depth_${depth}_extract`,
        currentDepth,
        progress: { completed: (depth - 1) * 2 + 2, total: maxDepth * 2 + 1 },
      });

      const deeperExtractions = await Promise.all(
        newSources.slice(0, 3).map(async (source) => {
          // Similar extraction and analysis as before
          const scrapeResponse = await fetch(`${supabaseUrl}/functions/v1/scrape`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({ url: source.url }),
          });

          if (!scrapeResponse.ok) {
            return {
              url: source.url,
              error: 'Failed to scrape content',
            };
          }

          const scrapeResult = await scrapeResponse.json();
          
          // Analyze the content
          const analyzeResponse = await fetch(`${supabaseUrl}/functions/v1/analyze`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({ 
              content: scrapeResult.markdown || scrapeResult.data,
              query,
              depth,
            }),
          });

          if (!analyzeResponse.ok) {
            return {
              url: source.url,
              error: 'Failed to analyze content',
            };
          }

          const analysisResult = await analyzeResponse.json();
          
          // Store findings with decreasing confidence by depth
          findings.push(...analysisResult.findings.map((finding: string) => ({
            content: finding,
            confidence: 0.9 - (depth * 0.1),
          })));

          return {
            url: source.url,
            findings: analysisResult.findings,
            summary: analysisResult.summary,
          };
        })
      );
    }

    // Step 4: Final synthesis
    await updateSession(supabase, sessionId, 'processing', {
      step: 'final_synthesis',
      currentDepth: maxDepth,
      progress: { completed: maxDepth * 2, total: maxDepth * 2 + 1 },
    });

    // Combine all findings and generate a comprehensive report
    const allFindings = findings.map(f => f.content).join('\n\n');
    const allSources = await supabase.from('research_sources')
      .select('url, title, relevance')
      .eq('report_id', sessionId);
    
    const synthesisResponse = await fetch(`${supabaseUrl}/functions/v1/synthesize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ 
        query,
        findings: allFindings,
        sources: allSources.data || [],
      }),
    });

    if (!synthesisResponse.ok) {
      throw new Error('Failed to synthesize research');
    }

    const synthesis = await synthesisResponse.json();
    
    // Create research report
    await supabase.from('research_reports').insert({
      id: sessionId,
      title: synthesis.title || `Research on ${query}`,
      query,
      summary: synthesis.summary,
      created_at: new Date().toISOString(),
    });

    // Add findings
    await Promise.all(synthesis.keyFindings.map((finding: string) => 
      supabase.from('research_findings').insert({
        report_id: sessionId,
        content: finding,
        confidence: 0.9,
      })
    ));

    // Mark as completed
    await updateSession(supabase, sessionId, 'completed', {
      step: 'completed',
      currentDepth: maxDepth,
      progress: { completed: maxDepth * 2 + 1, total: maxDepth * 2 + 1 },
      completedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Research process error:', error);
    
    // Mark as error
    await updateSession(supabase, sessionId, 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      errorTime: new Date().toISOString(),
      currentDepth,
    });
    
    throw error;
  }
}

/**
 * Helper to update session status
 */
async function updateSession(
  supabase: any,
  sessionId: string,
  status: 'processing' | 'completed' | 'error',
  metadata: any
) {
  await supabase
    .from('research_sessions')
    .update({
      status,
      metadata: { ...metadata, updatedAt: new Date().toISOString() },
    })
    .eq('id', sessionId);
} 