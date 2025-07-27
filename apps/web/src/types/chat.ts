import { type Message as AIMessage, type JSONValue } from "ai";

export type ChatRole = "user" | "assistant" | "system";
export type ChatSessionStatus = "active" | "archived" | "deleted";
export type MessageStatus = "sending" | "sent" | "error";
export type MessageSeverity = "low" | "medium" | "high";
export type ReactionType =
  | "👍"
  | "❤️"
  | "😄"
  | "😮"
  | "😢"
  | "😡"
  | "🎉"
  | "🚀"
  | "👀"
  | "💯";

export interface ChatMetadata {
  user_name?: string;
  status?: MessageStatus;
  attachments?: Array<{
    id: string;
    name: string;
  }>;
}

/**
 * Base interface for chat messages with common properties
 */
export interface BaseChatMessage {
  id: string;
  sessionId: string;
  createdAt: string;
  updatedAt?: string;
  metadata?: Record<string, any>;
}

/**
 * Primary chat message interface that extends AI package's Message type
 */
export interface ChatMessage
  extends Omit<AIMessage, "id" | "createdAt">,
    BaseChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  userId?: string;
  conversationId?: string; // Alias to sessionId for backward compatibility
  status?: MessageStatus;
  isProcessed?: boolean;
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
  | "message.created"
  | "message.updated"
  | "message.deleted"
  | "session.created"
  | "session.updated"
  | "session.deleted"
  | "attachment.added"
  | "attachment.removed";

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
  type: "status" | "error" | "progress" | "tool";
  value: {
    name?: string;
    status?: "running" | "complete" | "error" | "processing";
    message?: string;
    progress?: number;
    result?: JSONValue;
    error?: string;
  };
}

export interface ToolCallResult {
  name: string;
  status: "running" | "complete" | "error";
  result?: unknown;
  error?: string;
}

export type MessageRole = "user" | "assistant" | "system";

/**
 * @deprecated Use ChatMessage interface instead.
 * Legacy message interface being phased out in favor of ChatMessage.
 */
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
  role: "owner" | "member";
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
/**
 * Type guard to check if an object is a valid ChatMessage
 */
export function isAIMessage(message: any): message is ChatMessage {
  return "role" in message && "content" in message && "id" in message;
}

/**
 * Creates an empty ChatMessage object with default values
 */
export function createEmptyMessage(): ChatMessage {
  const now = new Date().toISOString();
  return {
    id: "",
    sessionId: "",
    conversationId: "", // Kept for backward compatibility
    userId: "",
    role: "user",
    content: "",
    status: "sending",
    isProcessed: false,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Transforms a ChatMessage for consistent formatting
 */
export function transformMessage(message: ChatMessage): ChatMessage {
  return {
    ...message,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
}

/**
 * Converts a legacy Message to the new ChatMessage format
 * @param message - Legacy message object
 * @returns ChatMessage object
 */
export function convertMessageToChatMessage(message: Message): ChatMessage {
  return {
    id: message.id,
    sessionId: message.conversation_id,
    conversationId: message.conversation_id,
    userId: message.user_id,
    role: message.role,
    content: message.content,
    status: message.status,
    isProcessed: message.is_processed,
    createdAt: message.created_at,
    updatedAt: message.updated_at,
    metadata: message.context,
  };
}

/**
 * Converts a ChatMessage to the legacy Message format
 * @param chatMessage - ChatMessage object
 * @returns Message object
 */
export function convertChatMessageToMessage(chatMessage: ChatMessage): Message {
  return {
    id: chatMessage.id,
    conversation_id: chatMessage.sessionId || chatMessage.conversationId || "",
    user_id: chatMessage.userId || "",
    role: chatMessage.role,
    content: chatMessage.content,
    status: chatMessage.status || "sent",
    is_processed: chatMessage.isProcessed || false,
    created_at: chatMessage.createdAt,
    updated_at: chatMessage.updatedAt || chatMessage.createdAt,
    context: chatMessage.metadata,
  };
}
