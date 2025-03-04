import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateEmbedding } from '@/lib/openai';

// Initialize Supabase client
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Semantic search API endpoint
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const threshold = parseFloat(searchParams.get('threshold') || '0.7');
    const visibility = searchParams.get('visibility');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // Generate embedding for the search query
    const embedding = await generateEmbedding(query);

    // Perform similarity search using the match_artifacts function
    const { data: results, error } = await supabaseClient.rpc(
      'match_artifacts',
      {
        query_embedding: embedding,
        match_threshold: threshold,
        match_count: limit,
        filter_visibility: visibility
      }
    );

    if (error) {
      console.error('Error performing semantic search:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      query,
      results: results || []
    });
  } catch (error: any) {
    console.error('Error in search API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}