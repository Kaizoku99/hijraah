import { z } from 'zod';

export const AIConfig = {
  models: {
    deepseek: {
      modelName: 'deepseek-coder-33b-instruct',
      temperature: 0.7,
      maxTokens: 2048,
      topP: 0.95,
      frequencyPenalty: 0,
      presencePenalty: 0,
    },
    gpt4: {
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.7,
      maxTokens: 4096,
      topP: 0.95,
      frequencyPenalty: 0,
      presencePenalty: 0,
    },
  },
  rag: {
    chunkSize: 1000,
    chunkOverlap: 200,
    embeddingModel: 'text-embedding-3-large',
    retrievalTopK: 5,
    maxDistance: 0.8,
    minRelevanceScore: 0.7,
  },
  chat: {
    maxHistoryLength: 10,
    maxResponseTokens: 1000,
    streamingEnabled: true,
    defaultSystemPrompt: 'You are a helpful immigration assistant.',
  },
};

export const DocumentSchema = z.object({
  id: z.string(),
  content: z.string(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  embedding: z.array(z.number()).optional(),
});

export type Document = z.infer<typeof DocumentSchema>;

export const ChatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string(),
  timestamp: z.date(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>; 