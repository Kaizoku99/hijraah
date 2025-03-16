import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { OpenAI } from 'openai';
import { nanoid } from 'nanoid';
import { getSupabaseClient } from '@/lib/supabase/client';

// For API optimization
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Set max duration to 60 seconds

// Schema for request validation
const researchSchema = z.object({
  topic: z.string().min(1, "Topic cannot be empty"),
  maxDepth: z.number().optional().default(3),
  maxSources: z.number().optional().default(5),
});

/**
 * API route for comprehensive research using multiple sources
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { topic, maxDepth, maxSources } = researchSchema.parse(body);

    // Create a unique ID for this research session
    const researchId = nanoid();
      
    // Log the research request in Supabase
    try {
      const supabase = getSupabaseClient();
      await supabase.from('research_sessions').insert({
        id: researchId,
        topic,
        max_depth: maxDepth,
        status: 'started',
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to log research session:', error);
    }
    
    // Step 1: Initial search to find relevant sources
    let searchResults: any[] = [];
    try {
      const searchResponse = await fetch(`${request.nextUrl.origin}/api/ai/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: topic, 
          maxResults: maxSources
        }),
      });
      
      if (!searchResponse.ok) {
        throw new Error('Initial search failed');
      }
      
      const searchData = await searchResponse.json();
      searchResults = searchData.data || [];
      
      // If no search results, try to find content from the database
      if (searchResults.length === 0) {
        const supabase = getSupabaseClient();
        const { data: vectorResults } = await supabase.rpc('match_documents', {
          query_embedding: await generateEmbedding(topic),
          match_threshold: 0.7,
          match_count: maxSources
        });
        
        if (vectorResults?.length) {
          searchResults = vectorResults.map((doc: any) => ({
            url: doc.url || '',
            title: doc.title,
            snippet: doc.content.substring(0, 200) + '...',
          }));
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      searchResults = [];
    }
    
    // Step 2: Extract detailed information from each source
    const extractResults = [];
    for (const result of searchResults) {
      try {
        // Try to scrape content first
        if (result.url) {
          const scrapeResponse = await fetch(`${request.nextUrl.origin}/api/ai/scrape`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: result.url }),
          });
          
          if (scrapeResponse.ok) {
            const scrapeResult = await scrapeResponse.json();
            if (scrapeResult.success && (scrapeResult.markdown || scrapeResult.data)) {
              extractResults.push({
                url: result.url,
                title: result.title,
                data: scrapeResult.markdown || JSON.stringify(scrapeResult.data),
              });
              continue;
            }
          }
        }
        
        // Fall back to extract API if scrape fails
        const extractResponse = await fetch(`${request.nextUrl.origin}/api/ai/extract`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            urls: [result.url],
            prompt: `Extract detailed information about ${topic}. Include facts, statistics, expert opinions, and comprehensive analysis.`,
          }),
        });
        
        if (extractResponse.ok) {
          const extractResult = await extractResponse.json();
          if (extractResult.success && extractResult.data) {
            extractResults.push({
              url: result.url,
              title: result.title,
              data: extractResult.data,
            });
          }
        }
      } catch (error) {
        console.error(`Extraction error for ${result.url}:`, error);
        // Continue with other sources even if one fails
      }
    }
    
    // If we don't have any extracted content, use the search snippets directly
    if (extractResults.length === 0 && searchResults.length > 0) {
      for (const result of searchResults) {
        extractResults.push({
          url: result.url,
          title: result.title,
          data: result.snippet,
        });
      }
    }
    
    // Step 3: Synthesize information with OpenAI
    const synthesis: {
      topic: string;
      sources: string[];
      findings: Array<{ url: string; title: string; data: string }>;
      summary?: string;
    } = {
      topic,
      sources: extractResults.map(r => r.url),
      findings: extractResults,
    };
    
    // Synthesize findings into a comprehensive summary
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      
      const sourceData = extractResults.map(res => 
        `Source: ${res.title || res.url}\n${res.data.substring(0, 1500)}...`
      ).join('\n\n');
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are an expert immigration researcher. Your task is to synthesize information from multiple sources about an immigration topic into a comprehensive, accurate summary.`
          },
          {
            role: 'user',
            content: `Please analyze the following information about "${topic}" and provide a detailed synthesis:\n\n${sourceData}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });
      
      synthesis.summary = response.choices[0]?.message?.content || 
        `Research on ${topic} based on ${extractResults.length} sources.`;
    } catch (error) {
      console.error('Synthesis error:', error);
      synthesis.summary = `Research on ${topic} based on ${extractResults.length} sources.`;
    }
    
    // Update the research session in Supabase
    try {
      const supabase = getSupabaseClient();
      await supabase.from('research_sessions').update({
        status: 'completed',
        results: synthesis,
        completed_at: new Date().toISOString(),
      }).eq('id', researchId);
    } catch (error) {
      console.error('Failed to update research session:', error);
    }
    
    return NextResponse.json({
      success: true,
      data: synthesis,
    });
  } catch (error) {
    console.error('Research API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
}

/**
 * Generates an embedding for the given text using OpenAI
 */
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const response = await openai.embeddings.create({
      input: text,
      model: 'text-embedding-3-small'
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
} 