import OpenAI from 'openai';
import { supabase } from './supabase';
import { logger } from './logger';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbeddings(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error: any) {
    logger.error('Error generating embeddings:', { error: error?.message || error });
    throw error;
  }
}

export async function searchSimilarDocuments(query: string, limit = 5) {
  try {
    const queryEmbedding = await generateEmbeddings(query);

    const { data: documents, error } = await supabase
      .rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: limit,
      });

    if (error) throw error;

    return documents;
  } catch (error: any) {
    logger.error('Error searching similar documents:', { error: error?.message || error });
    throw error;
  }
}

export async function indexDocument(documentId: string, text: string) {
  try {
    const embedding = await generateEmbeddings(text);

    const { error } = await supabase
      .from('document_embeddings')
      .insert({
        document_id: documentId,
        embedding,
        content: text,
      });

    if (error) throw error;
  } catch (error: any) {
    logger.error('Error indexing document:', { error: error?.message || error });
    throw error;
  }
}