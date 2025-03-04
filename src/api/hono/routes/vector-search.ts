import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import OpenAI from 'openai';
import { requireAuth } from '../middleware/supabase';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a Hono app for vector search routes
export const vectorSearchRoutes = new Hono();

// Schema for text embedding generation
const embeddingSchema = z.object({
  text: z.string().min(1, "Text cannot be empty"),
  userId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  collectionId: z.string().optional().default('default'),
});

// Schema for vector search
const searchSchema = z.object({
  query: z.string().min(1, "Query cannot be empty"),
  limit: z.number().optional().default(10),
  threshold: z.number().optional().default(0.7),
  collectionId: z.string().optional(),
  userId: z.string().optional(),
});

// Create vector embedding and store it
vectorSearchRoutes.post(
  '/embed',
  requireAuth,
  zValidator('json', embeddingSchema),
  async (c) => {
    try {
      const { text, metadata, collectionId } = c.req.valid('json');
      const supabase = c.get('supabase');
      const user = c.get('user');
      
      // Generate embedding using OpenAI
      const embedding = await generateEmbedding(text);
      
      // Store the embedding in Supabase
      const embeddingId = await storeEmbedding(
        supabase,
        text, 
        embedding, 
        user.id, 
        metadata, 
        collectionId
      );
      
      return c.json({
        success: true,
        embeddingId,
        message: 'Embedding created and stored successfully',
      });
    } catch (error: any) {
      console.error('Embedding creation error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Semantic search using vector embeddings
vectorSearchRoutes.post(
  '/search',
  zValidator('json', searchSchema),
  async (c) => {
    try {
      const { query, limit, threshold, collectionId, userId } = c.req.valid('json');
      const supabase = c.get('supabase');
      
      // Generate embedding for the query
      const queryEmbedding = await generateEmbedding(query);
      
      // Perform the vector search in Supabase
      const results = await performVectorSearch(
        supabase,
        queryEmbedding, 
        limit, 
        threshold, 
        collectionId, 
        userId
      );
      
      return c.json({
        success: true,
        query,
        results,
      });
    } catch (error: any) {
      console.error('Vector search error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Bulk embed content
vectorSearchRoutes.post(
  '/bulk-embed',
  requireAuth,
  async (c) => {
    try {
      const body = await c.req.json();
      const { texts, collectionId } = body;
      const supabase = c.get('supabase');
      const user = c.get('user');
      
      if (!Array.isArray(texts) || texts.length === 0) {
        return c.json({
          success: false,
          error: 'No texts provided for embedding',
        }, 400);
      }
      
      // Process each text in batches (to avoid rate limits)
      const batchSize = 5;
      const results = [];
      
      for (let i = 0; i < texts.length; i += batchSize) {
        const batch = texts.slice(i, i + batchSize);
        
        // Process batch concurrently
        const batchResults = await Promise.all(
          batch.map(async (item) => {
            try {
              const { text, metadata } = item;
              const embedding = await generateEmbedding(text);
              const embeddingId = await storeEmbedding(
                supabase,
                text,
                embedding,
                user.id,
                metadata || {},
                collectionId || 'default'
              );
              
              return {
                success: true,
                text: text.substring(0, 50) + '...',
                embeddingId,
              };
            } catch (error: any) {
              return {
                success: false,
                text: item.text.substring(0, 50) + '...',
                error: error.message,
              };
            }
          })
        );
        
        results.push(...batchResults);
      }
      
      return c.json({
        success: true,
        processedCount: results.filter(r => r.success).length,
        failedCount: results.filter(r => !r.success).length,
        results,
      });
    } catch (error: any) {
      console.error('Bulk embedding error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Delete embeddings - Protected route
vectorSearchRoutes.delete(
  '/embeddings/:id',
  requireAuth,
  async (c) => {
    try {
      const id = c.req.param('id');
      const supabase = c.get('supabase');
      const user = c.get('user');
      
      // Delete the embedding, but only if it belongs to the user
      const { error } = await supabase
        .from('embeddings')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw new Error(error.message);
      
      return c.json({
        success: true,
        message: 'Embedding deleted successfully',
      });
    } catch (error: any) {
      console.error('Delete embedding error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

/**
 * Generate embedding using OpenAI API
 */
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });
    
    return response.data[0].embedding;
  } catch (error: any) {
    console.error('OpenAI embedding generation error:', error);
    throw new Error(`Failed to generate embedding: ${error.message}`);
  }
}

/**
 * Store embedding in Supabase
 */
async function storeEmbedding(
  supabase: any,
  text: string,
  embedding: number[],
  userId: string,
  metadata?: any,
  collectionId: string = 'default'
): Promise<string> {
  try {
    // Store in the embeddings table
    const { data, error } = await supabase
      .from('embeddings')
      .insert({
        content: text,
        embedding,
        collection_id: collectionId,
        user_id: userId,
        metadata: metadata || {},
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();
    
    if (error) throw error;
    
    return data.id;
  } catch (error: any) {
    console.error('Embedding storage error:', error);
    throw new Error(`Failed to store embedding: ${error.message}`);
  }
}

/**
 * Perform vector search in Supabase
 */
async function performVectorSearch(
  supabase: any,
  queryEmbedding: number[],
  limit: number = 10,
  threshold: number = 0.7,
  collectionId?: string,
  userId?: string
): Promise<any[]> {
  try {
    // Build the query
    let query = supabase.rpc('match_embeddings', {
      query_embedding: queryEmbedding,
      match_threshold: threshold,
      match_count: limit,
    });
    
    // Apply filters if provided
    if (collectionId) {
      query = query.eq('collection_id', collectionId);
    }
    
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    // Execute the query
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data || [];
  } catch (error: any) {
    console.error('Vector search error:', error);
    throw new Error(`Failed to perform vector search: ${error.message}`);
  }
} 