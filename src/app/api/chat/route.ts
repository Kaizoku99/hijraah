import { createDataStreamResponse, streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { saveMessageWithRetry } from '@/lib/supabase/chat';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import type { ChatMessage, StreamData, ToolCallResult } from '@/types/chat';

export const runtime = 'edge';

const tools = {
  search: tool({
    description: 'Search for relevant information',
    parameters: z.object({
      query: z.string().min(1),
    }),
    execute: async ({ query }: { query: string }) => {
      try {
        // Implement search logic
        return { results: [] };
      } catch (error) {
        console.error('Search error:', error);
        return { results: [], error: 'Search failed' };
      }
    }
  }),
  saveMessage: tool({
    description: 'Save message to database',
    parameters: z.object({
      content: z.string(),
      sessionId: z.string(),
    }),
    execute: async ({ content, sessionId }: { content: string; sessionId: string }) => {
      const messageId = nanoid();
      const result = await saveMessageWithRetry({
        id: messageId,
        content,
        sessionId,
        createdAt: new Date().toISOString(),
        role: 'assistant',
      } as ChatMessage);
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to save message');
      }
      
      return { success: true, messageId };
    }
  })
} as const;

export async function POST(req: Request) {
  return createDataStreamResponse({
    execute: async (dataStream) => {
      try {
        const { messages, sessionId } = await req.json();
        
        dataStream.writeData({
          type: 'status',
          value: { status: 'processing' }
        } as StreamData);

        const result = await streamText({
          model: openai('gpt-4-turbo-preview'),
          messages,
          tools,
          maxTokens: 1000,
          temperature: 0.7,
          onToolInvocation: async (call: { name: string; arguments: Record<string, unknown> }) => {
            const toolResult: ToolCallResult = {
              name: call.name,
              status: 'running'
            };
            dataStream.writeData({
              type: 'tool',
              value: toolResult
            } as StreamData);
          }
        });

        result.mergeIntoDataStream(dataStream);
      } catch (error) {
        dataStream.writeData({
          type: 'error',
          value: { 
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        } as StreamData);
      }
    }
  });
}