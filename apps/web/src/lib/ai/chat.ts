import { deepseek } from '@ai-sdk/deepseek';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { nanoid } from 'nanoid';

import { getSupabaseClient } from '../supabase/client';

import { AIConfig, type ChatMessage } from './config';



export type ChatModel = 'gpt4' | 'deepseek';

export async function streamChatResponse(
  messages: ChatMessage[],
  model: ChatModel = 'gpt4',
  options: {
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
  } = {}
) {
  const modelConfig = model === 'gpt4' ? AIConfig.models.gpt4 : AIConfig.models.deepseek;
  const modelClient = model === 'gpt4' ? openai(modelConfig.modelName) : deepseek(modelConfig.modelName);

  const stream = await streamText({
    model: modelClient,
    messages: [
      {
        role: 'system',
        content: options.systemPrompt || AIConfig.chat.defaultSystemPrompt,
      },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    ],
    temperature: options.temperature ?? modelConfig.temperature,
    maxTokens: options.maxTokens ?? modelConfig.maxTokens,
  });

  return stream;
}

export async function saveChatHistory(
  messages: ChatMessage[],
  userId: string,
  metadata?: Record<string, unknown>
) {
  const supabase = getSupabaseClient();
  const chatId = nanoid();

  const { error } = await supabase
    .from('chat_history')
    .insert({
      id: chatId,
      user_id: userId,
      messages,
      metadata,
      created_at: new Date().toISOString(),
    });

  if (error) throw error;
  return chatId;
}

export async function getChatHistory(userId: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export function processChatContext(
  messages: ChatMessage[],
  maxLength = AIConfig.chat.maxHistoryLength
): ChatMessage[] {
  return messages
    .slice(-maxLength)
    .map(msg => ({
      ...msg,
      content: msg.content.trim(),
    }))
    .filter(msg => msg.content.length > 0);
}

export async function generateChatTitle(messages: ChatMessage[]): Promise<string> {
  const firstUserMessage = messages.find(msg => msg.role === 'user')?.content;
  if (!firstUserMessage) return 'New Chat';

  const stream = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [
      {
        role: 'system',
        content: 'Generate a short, concise title (max 6 words) for this chat based on the user\'s first message.',
      },
      {
        role: 'user',
        content: firstUserMessage,
      },
    ],
    temperature: 0.7,
    maxTokens: 20,
  });

  const title = await stream.toString();
  return title.trim() || 'New Chat';
} 