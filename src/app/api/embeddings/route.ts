import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateEmbedding, getTextForEmbedding } from '@/lib/openai';

// Initialize Supabase client with admin privileges for direct database access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Process documents that need embeddings
 */
export async function POST(request: Request) {
  try {
    // Verify API key for security (if this is an internal API)
    const { key } = await request.json();
    if (key !== process.env.EMBEDDING_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get documents that need embeddings
    const { data: artifacts, error } = await supabaseAdmin
      .from('artifacts')
      .select('*')
      .eq('needs_embedding', true)
      .limit(10); // Process in batches

    if (error) {
      console.error('Error fetching artifacts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!artifacts || artifacts.length === 0) {
      return NextResponse.json({ message: 'No artifacts need embedding' });
    }

    // Process each artifact
    const results = await Promise.all(
      artifacts.map(async (artifact) => {
        try {
          // Generate text for embedding
          const text = getTextForEmbedding(artifact);
          
          // Generate embedding
          const embedding = await generateEmbedding(text);
          
          // Update the artifact with the new embedding
          const { error: updateError } = await supabaseAdmin
            .from('artifacts')
            .update({ 
              embedding,
              needs_embedding: false 
            })
            .eq('id', artifact.id);

          if (updateError) {
            throw updateError;
          }
          
          return { id: artifact.id, status: 'success' };
        } catch (err: any) {
          console.error(`Error processing artifact ${artifact.id}:`, err);
          return { id: artifact.id, status: 'error', message: err.message };
        }
      })
    );

    return NextResponse.json({ 
      processed: results.length,
      results 
    });
  } catch (error: any) {
    console.error('Error in embedding API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Endpoint to manually request embedding for a specific document
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }
    
    // Get the specific artifact
    const { data: artifact, error } = await supabaseAdmin
      .from('artifacts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    if (!artifact) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    
    // Generate text for embedding
    const text = getTextForEmbedding(artifact);
    
    // Generate embedding
    const embedding = await generateEmbedding(text);
    
    // Update the artifact with the new embedding
    const { error: updateError } = await supabaseAdmin
      .from('artifacts')
      .update({ 
        embedding,
        needs_embedding: false 
      })
      .eq('id', artifact.id);
    
    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    
    return NextResponse.json({ 
      id: artifact.id,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Error in embedding API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 