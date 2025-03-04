import { z } from 'zod';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Session } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

// Define a DataStream interface to match the expected structure
interface DataStream {
  writeData: (data: any) => void;
}

/**
 * Factory function that creates a document creation tool
 * This enables the AI to create documents with session context
 */
export function createDocumentTool({ session, dataStream }: { 
  session: Session | null; 
  dataStream?: DataStream;
}) {
  return {
    description: 'Create a new document or note with the provided content.',
    parameters: z.object({
      title: z.string().describe('Title of the document'),
      content: z.string().describe('Content of the document'),
      kind: z.enum(['text', 'code', 'formula', 'diagram', 'note']).default('text')
        .describe('Type of document to create'),
    }),
    execute: async ({ 
      title, 
      content, 
      kind = 'text' 
    }: { 
      title: string; 
      content: string; 
      kind?: 'text' | 'code' | 'formula' | 'diagram' | 'note';
    }) => {
      try {
        if (!session?.user?.id) {
          throw new Error('User is not authenticated');
        }

        // Generate a unique document ID
        const documentId = nanoid();

        // Emit a notification event through the data stream if available
        if (dataStream) {
          dataStream.writeData({
            type: 'document-creation',
            content: {
              id: documentId,
              title,
              kind,
              status: 'pending',
            },
          });
        }

        // Save the document to the database
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from('documents')
          .insert({
            id: documentId,
            title,
            content,
            kind,
            user_id: session.user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        // Emit a notification event through the data stream if available
        if (dataStream) {
          dataStream.writeData({
            type: 'document-creation',
            content: {
              id: documentId,
              title,
              kind,
              status: 'completed',
            },
          });
        }

        return {
          success: true,
          documentId,
          document: data,
        };
      } catch (error) {
        console.error('Document creation error:', error);
        
        // Emit error notification through the data stream if available
        if (dataStream) {
          dataStream.writeData({
            type: 'document-creation',
            content: {
              title,
              kind,
              status: 'error',
              error: error instanceof Error ? error.message : 'Failed to create document',
            },
          });
        }
        
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to create document',
        };
      }
    },
  };
} 