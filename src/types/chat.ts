import { type Message as AIMessage } from 'ai';
import { type JSONValue } from 'ai';

export type ChatRole = 'user' | 'assistant' | 'system';
export type ChatSessionStatus = 'active' | 'archived' | 'deleted';
export type MessageStatus = 'sending' | 'sent' | 'error';
export type MessageSeverity = 'low' | 'medium' | 'high';
export type ReactionType = '👍' | '❤️' | '😄' | '😮' | '😢' | '😡' | '🎉' | '🚀' | '👀' | '💯';

export interface ChatMetadata {
  user_name?: string;
  status?: MessageStatus;
  attachments?: Array<{
    id: string;
    name: string;
  }>;
}

export interface BaseChatMessage {
  id: string;
  sessionId: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface ChatMessage extends Omit<AIMessage, 'id' | 'createdAt'>, BaseChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatSession {
  id: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface ChatDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: number;
  metadata?: {
    mime_type?: string;
    extension?: string;
    preview_url?: string;
    thumbnail_url?: string;
    extracted_text?: string;
    [key: string]: any;
  };
}

export interface ChatAttachment {
  id: string;
  session_id: string;
  message_id?: string;
  document_id: string;
  created_at: string;
}

export interface ChatError extends Error {
  code?: string;
  details?: Record<string, any>;
}

export interface ChatContextValue {
  messages: ChatMessage[];
  session: ChatSession | null;
  isLoading: boolean;
  error: ChatError | null;
  sendMessage: (content: string, attachments?: ChatDocument[]) => Promise<void>;
  startNewSession: () => Promise<void>;
  loadSession: (sessionId: string) => Promise<void>;
  clearSession: () => void;
}

export interface ChatSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  language: string;
  enableAttachments: boolean;
  enableCodeHighlighting: boolean;
  enableMarkdown: boolean;
}

export type ChatEventType = 
  | 'message.created'
  | 'message.updated'
  | 'message.deleted'
  | 'session.created'
  | 'session.updated'
  | 'session.deleted'
  | 'attachment.added'
  | 'attachment.removed';

export interface ChatEvent {
  type: ChatEventType;
  payload: any;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ChatAnalytics {
  totalMessages: number;
  averageResponseTime: number;
  sessionsCount: number;
  activeUsers: number;
  popularTopics: Array<{
    topic: string;
    count: number;
  }>;
  userSatisfaction: number;
  errorRate: number;
}

export interface StreamData {
  type: 'status' | 'error' | 'progress' | 'tool';
  value: {
    name?: string;
    status?: 'running' | 'complete' | 'error' | 'processing';
    message?: string;
    progress?: number;
    result?: JSONValue;
    error?: string;
  };
}

export interface ToolCallResult {
  name: string;
  status: 'running' | 'complete' | 'error';
  result?: unknown;
  error?: string;
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  conversation_id: string;
  user_id: string;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  severity?: MessageSeverity;
  is_processed: boolean;
  processed_at?: string;
  error_message?: string;
  context?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Participant {
  id: string;
  conversation_id: string;
  user_id: string;
  role: 'owner' | 'member';
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  title: string;
  created_by: string;
  settings: {
    model: string;
    temperature: number;
    maxTokens: number;
    language: string;
    enableAttachments: boolean;
    enableCodeHighlighting: boolean;
    enableMarkdown: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface Analytics {
  id: string;
  conversation_id: string;
  event_type: string;
  event_data: Record<string, any>;
  created_at: string;
}

export interface Reaction {
  id: string;
  message_id: string;
  user_id: string;
  type: ReactionType;
  created_at: string;
  updated_at: string;
}

export interface PresenceState {
  user_id: string;
  conversation_id: string;
  is_typing: boolean;
  last_seen: string;
}

// Type guards and transformers
export function isAIMessage(message: any): message is Message {
  return 'role' in message && 'content' in message && 'id' in message;
}

export function createEmptyMessage(): ChatMessage {
  return {
    id: '',
    conversationId: '',
    userId: '',
    role: 'user',
    content: '',
    status: 'sending',
    isProcessed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function transformMessage(message: ChatMessage): ChatMessage {
  return {
    ...message,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt
  };
}