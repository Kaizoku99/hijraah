import { type Message } from 'ai';
import { type JSONValue } from 'ai';

export type ChatRole = 'user' | 'assistant' | 'system';
export type ChatSessionStatus = 'active' | 'archived' | 'deleted';
export type MessageStatus = 'sending' | 'sent' | 'error';

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

export interface ChatMessage extends Omit<Message, 'id' | 'createdAt'>, BaseChatMessage {
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

export interface StreamData implements JSONValue {
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