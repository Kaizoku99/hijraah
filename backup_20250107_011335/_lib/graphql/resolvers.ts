import { createClient } from '@supabase/supabase-js';
import { GraphQLError } from 'graphql';
import { generateEmbeddings } from '@/lib/embeddings';
import { logger } from '@/lib/logger';
import { Database } from '@/types/database';

type Context = {
  user: { id: string } | null;
};

type DocumentMatch = {
  id: string;
  content: string;
  similarity: number;
};

type Document = Database['public']['Tables']['documents']['Row'];

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const resolvers = {
  Query: {
    searchDocuments: async (
      _: unknown,
      { query, threshold, limit }: { query: string; threshold: number; limit: number },
      { user }: Context
    ) => {
      try {
        if (!user) {
          throw new GraphQLError('Not authenticated');
        }

        // Generate embedding for search query
        const queryEmbedding = await generateEmbeddings(query);

        // Search for similar documents
        const { data: matches, error } = await supabase.rpc('match_documents', {
          query_embedding: queryEmbedding,
          match_threshold: threshold,
          match_count: limit,
        });

        if (error) throw error;

        // Fetch full document details for matches
        const documentIds = (matches as DocumentMatch[]).map(match => match.id);
        const { data: documents, error: docError } = await supabase
          .from('documents')
          .select('*')
          .in('id', documentIds)
          .eq('user_id', user.id);

        if (docError) throw docError;

        // Combine similarity scores with document details
        return matches.map(match => ({
          id: match.id,
          document: documents?.find(doc => doc.id === match.id),
          similarity: match.similarity,
        }));
      } catch (error) {
        logger.error('Error in searchDocuments:', { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }
    },

    getDocument: async (
      _: unknown,
      { id }: { id: string },
      { user }: Context
    ) => {
      try {
        if (!user) {
          throw new GraphQLError('Not authenticated');
        }

        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        logger.error('Error in getDocument:', { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }
    },

    getUserDocuments: async (
      _: unknown,
      __: unknown,
      { user }: Context
    ) => {
      try {
        if (!user) {
          throw new GraphQLError('Not authenticated');
        }

        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
      } catch (error) {
        logger.error('Error in getUserDocuments:', { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }
    },

    getChatHistory: async (
      _: unknown,
      __: unknown,
      { user }: Context
    ) => {
      try {
        if (!user) {
          throw new GraphQLError('Not authenticated');
        }

        const { data, error } = await supabase
          .from('chat_messages')
          .select('*, chat_sessions!inner(*)')
          .eq('chat_sessions.user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
      } catch (error) {
        logger.error('Error in getChatHistory:', { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }
    },
  },

  Mutation: {
    createDocument: async (
      _: unknown,
      { input }: { input: Omit<Document, 'id' | 'created_at' | 'user_id'> },
      { user }: Context
    ) => {
      try {
        if (!user) {
          throw new GraphQLError('Not authenticated');
        }

        // Start a transaction
        const { data: document, error: docError } = await supabase
          .from('documents')
          .insert({
            ...input,
            user_id: user.id,
          })
          .select()
          .single();

        if (docError) throw docError;

        // Generate embedding for document content
        if (document?.file_path) {
          const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(document.file_path);

          const content = await fetch(publicUrl).then(res => res.text());
          const embedding = await generateEmbeddings(content);

          const { error: embeddingError } = await supabase
            .from('document_embeddings')
            .insert({
              document_id: document.id,
              content,
              embedding,
            });

          if (embeddingError) throw embeddingError;
        }

        return document;
      } catch (error) {
        logger.error('Error in createDocument:', { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }
    },

    updateDocument: async (
      _: unknown,
      { id, input }: { id: string; input: Partial<Omit<Document, 'id' | 'created_at' | 'user_id'>> },
      { user }: Context
    ) => {
      try {
        if (!user) {
          throw new GraphQLError('Not authenticated');
        }

        const { data, error } = await supabase
          .from('documents')
          .update(input)
          .eq('id', id)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        logger.error('Error in updateDocument:', { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }
    },

    deleteDocument: async (
      _: unknown,
      { id }: { id: string },
      { user }: Context
    ) => {
      try {
        if (!user) {
          throw new GraphQLError('Not authenticated');
        }

        // Delete document and its embedding
        const { error: embeddingError } = await supabase
          .from('document_embeddings')
          .delete()
          .eq('document_id', id);

        if (embeddingError) throw embeddingError;

        const { error: docError } = await supabase
          .from('documents')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (docError) throw docError;

        return true;
      } catch (error) {
        logger.error('Error in deleteDocument:', { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }
    },

    createChatMessage: async (
      _: unknown,
      { input }: { input: Database['public']['Tables']['chat_messages']['Insert'] },
      { user }: Context
    ) => {
      try {
        if (!user) {
          throw new GraphQLError('Not authenticated');
        }

        const { data, error } = await supabase
          .from('chat_messages')
          .insert(input)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        logger.error('Error in createChatMessage:', { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }
    },
  },
};