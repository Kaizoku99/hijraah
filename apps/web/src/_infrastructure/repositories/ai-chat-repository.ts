/**
 * Enhanced AI SDK v5 Compatible Chat Repository
 * 
 * This repository provides comprehensive chat management following AI SDK v5 patterns
 * while preserving all valuable functionality from the legacy chat_sessions system.
 * 
 * Features:
 * - AI SDK v5 compatible Chat/Message/Stream tables
 * - Rich metadata support for chat configuration
 * - Business logic integration (cases, system prompts, models)
 * - Advanced querying and filtering capabilities
 * - Message validation and type safety
 * - Performance optimized with proper indexing
 */
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { createSupabaseServiceClient } from "@/lib/supabase/client";

// Enhanced AI SDK v5 compatible types
export type EnhancedChatRow = Database["public"]["Tables"]["Chat"]["Row"];
export type EnhancedChatInsert = Database["public"]["Tables"]["Chat"]["Insert"];
export type EnhancedChatUpdate = Database["public"]["Tables"]["Chat"]["Update"];

export type MessageRow = Database["public"]["Tables"]["Message"]["Row"];
export type MessageInsert = Database["public"]["Tables"]["Message"]["Insert"];
export type MessageUpdate = Database["public"]["Tables"]["Message"]["Update"];

export type StreamRow = Database["public"]["Tables"]["Stream"]["Row"];
export type StreamInsert = Database["public"]["Tables"]["Stream"]["Insert"];

// Chat metadata structure following AI SDK v5 patterns
export interface ChatMetadata {
  // Agent configuration
  agentConfig?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    tools?: string[];
    [key: string]: any;
  };
  
  // Chat settings
  settings?: {
    autoSave?: boolean;
    streamingEnabled?: boolean;
    contextWindow?: number;
    memoryEnabled?: boolean;
    [key: string]: any;
  };
  
  // Business context
  context?: {
    purpose?: string;
    category?: string;
    tags?: string[];
    priority?: 'low' | 'medium' | 'high';
    [key: string]: any;
  };
  
  // Legacy compatibility
  legacyData?: {
    originalPrompt?: string;
    migrationVersion?: string;
    [key: string]: any;
  };
  
  [key: string]: any;
}

// Message part types following AI SDK v5 specification
export type MessagePart = 
  | { type: "text"; text: string }
  | { type: "image"; image: string | Uint8Array | URL }
  | { type: "file"; file: { name: string; url: string; mediaType?: string } }
  | { type: "tool-call"; toolCallId: string; toolName: string; args: any }
  | { type: "tool-result"; toolCallId: string; result: any; isError?: boolean }
  | { type: "data"; data: any; metadata?: Record<string, any> };

export type MessageAttachment = {
  name: string;
  url: string;
  contentType?: string;
  size?: number;
  metadata?: Record<string, any>;
};

// Query options for advanced filtering
export interface ChatQueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'lastMessageAt' | 'title';
  orderDirection?: 'asc' | 'desc';
  visibility?: string;
  caseId?: string;
  model?: string;
  hasMessages?: boolean;
  dateRange?: {
    start?: string;
    end?: string;
  };
  search?: string;
}

export interface MessageQueryOptions {
  limit?: number;
  offset?: number;
  role?: 'user' | 'assistant' | 'system';
  hasAttachments?: boolean;
  dateRange?: {
    start?: string;
    end?: string;
  };
}

/**
 * Enhanced AI SDK v5 Compatible Chat Repository
 * Provides comprehensive chat management with business logic support
 */
export class EnhancedAIChatRepository {
  private client: SupabaseClient<Database>;

  constructor() {
    this.client = createSupabaseServiceClient();
  }

  // CHAT OPERATIONS WITH ENHANCED FUNCTIONALITY

  /**
   * Create a new chat with full metadata support
   */
  async createChat(data: {
    userId: string;
    title: string;
    visibility?: string;
    model?: string;
    systemPrompt?: string;
    caseId?: string;
    metadata?: ChatMetadata;
  }): Promise<EnhancedChatRow> {
    const chatData: EnhancedChatInsert = {
      userId: data.userId,
      title: data.title,
      visibility: data.visibility || 'private',
      model: data.model,
      systemPrompt: data.systemPrompt,
      caseId: data.caseId,
      metadata: data.metadata as any || {},
      createdAt: new Date().toISOString(),
    };

    const { data: chat, error } = await this.client
      .from("Chat")
      .insert(chatData)
      .select()
      .single();

    if (error) {
      console.error("Error creating chat:", error);
      throw new Error(`Failed to create chat: ${error.message}`);
    }

    return chat;
  }

  /**
   * Get a chat by ID with optional message loading
   */
  async getChat(
    id: string, 
    options?: { includeMessages?: boolean; messageLimit?: number }
  ): Promise<(EnhancedChatRow & { messages?: MessageRow[] }) | null> {
    const { data: chat, error } = await this.client
      .from("Chat")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching chat:", error);
      throw new Error(`Failed to fetch chat: ${error.message}`);
    }

    if (!chat) return null;

    // Include messages if requested
    if (options?.includeMessages) {
      const messages = await this.getMessages(id, { 
        limit: options.messageLimit || 50 
      });
      return { ...chat, messages };
    }

    return chat;
  }

  /**
   * Get chats for a user with advanced filtering
   */
  async getChatsForUser(
    userId: string,
    options: ChatQueryOptions = {}
  ): Promise<EnhancedChatRow[]> {
    let query = this.client
      .from("Chat")
      .select("*")
      .eq("userId", userId);

    // Apply filters
    if (options.visibility) {
      query = query.eq("visibility", options.visibility);
    }

    if (options.caseId) {
      query = query.eq("caseId", options.caseId);
    }

    if (options.model) {
      query = query.eq("model", options.model);
    }

    if (options.dateRange?.start) {
      query = query.gte("createdAt", options.dateRange.start);
    }

    if (options.dateRange?.end) {
      query = query.lte("createdAt", options.dateRange.end);
    }

    if (options.search) {
      query = query.ilike("title", `%${options.search}%`);
    }

    // Apply ordering
    const orderBy = options.orderBy || 'lastMessageAt';
    const direction = options.orderDirection || 'desc';
    query = query.order(orderBy, { ascending: direction === 'asc', nullsFirst: false });

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(
        options.offset,
        options.offset + (options.limit || 10) - 1
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching chats for user:", error);
      throw new Error(`Failed to fetch chats: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Update a chat with enhanced metadata support
   */
  async updateChat(
    id: string, 
    updates: Partial<{
      title: string;
      visibility: string;
      model: string;
      systemPrompt: string;
      caseId: string;
      metadata: ChatMetadata;
    }>
  ): Promise<EnhancedChatRow> {
    const updateData: EnhancedChatUpdate = {
      ...updates,
      metadata: updates.metadata as any,
    };

    const { data, error } = await this.client
      .from("Chat")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating chat:", error);
      throw new Error(`Failed to update chat: ${error.message}`);
    }

    return data;
  }

  /**
   * Delete a chat and all associated data
   */
  async deleteChat(id: string): Promise<{ success: boolean }> {
    // Delete in proper order to maintain referential integrity
    
    // 1. Delete messages
    const { error: messageError } = await this.client
      .from("Message")
      .delete()
      .eq("chatId", id);

    if (messageError) {
      console.error("Error deleting chat messages:", messageError);
      throw new Error(`Failed to delete chat messages: ${messageError.message}`);
    }

    // 2. Delete streams
    const { error: streamError } = await this.client
      .from("Stream")
      .delete()
      .eq("chatId", id);

    if (streamError) {
      console.error("Error deleting streams:", streamError);
      // Don't throw for streams as they're optional
    }

    // 3. Delete chat
    const { error: chatError } = await this.client
      .from("Chat")
      .delete()
      .eq("id", id);

    if (chatError) {
      console.error("Error deleting chat:", chatError);
      throw new Error(`Failed to delete chat: ${chatError.message}`);
    }

    return { success: true };
  }

  // MESSAGE OPERATIONS WITH AI SDK v5 PATTERNS

  /**
   * Get messages for a chat with filtering
   */
  async getMessages(
    chatId: string, 
    options: MessageQueryOptions = {}
  ): Promise<MessageRow[]> {
    let query = this.client
      .from("Message")
      .select("*")
      .eq("chatId", chatId);

    if (options.role) {
      query = query.eq("role", options.role);
    }

    if (options.dateRange?.start) {
      query = query.gte("createdAt", options.dateRange.start);
    }

    if (options.dateRange?.end) {
      query = query.lte("createdAt", options.dateRange.end);
    }

    // Always order by creation time for conversation flow
    query = query.order("createdAt", { ascending: true });

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(
        options.offset,
        options.offset + (options.limit || 50) - 1
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching messages:", error);
      throw new Error(`Failed to fetch messages: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Add a message with AI SDK v5 structure
   */
  async addMessage(data: {
    chatId: string;
    role: 'user' | 'assistant' | 'system';
    parts: MessagePart[];
    attachments?: MessageAttachment[];
  }): Promise<MessageRow> {
    const messageData: MessageInsert = {
      chatId: data.chatId,
      role: data.role,
      parts: data.parts as any,
      attachments: (data.attachments || []) as any,
      createdAt: new Date().toISOString(),
    };

    const { data: message, error } = await this.client
      .from("Message")
      .insert(messageData)
      .select()
      .single();

    if (error) {
      console.error("Error adding message:", error);
      throw new Error(`Failed to add message: ${error.message}`);
    }

    return message;
  }

  /**
   * Add a simple text message (convenience method)
   */
  async addTextMessage(
    chatId: string,
    role: 'user' | 'assistant' | 'system',
    text: string
  ): Promise<MessageRow> {
    return this.addMessage({
      chatId,
      role,
      parts: [{ type: "text", text }],
    });
  }

  /**
   * Update a message
   */
  async updateMessage(id: string, updates: MessageUpdate): Promise<MessageRow> {
    const { data, error } = await this.client
      .from("Message")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating message:", error);
      throw new Error(`Failed to update message: ${error.message}`);
    }

    return data;
  }

  // BUSINESS LOGIC METHODS

  /**
   * Get chats by case ID
   */
  async getChatsByCase(caseId: string): Promise<EnhancedChatRow[]> {
    const { data, error } = await this.client
      .from("Chat")
      .select("*")
      .eq("caseId", caseId)
      .order("lastMessageAt", { ascending: false, nullsFirst: false });

    if (error) {
      console.error("Error fetching chats by case:", error);
      throw new Error(`Failed to fetch chats by case: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Check chat ownership
   */
  async checkChatOwnership(chatId: string, userId: string): Promise<boolean> {
    const chat = await this.getChat(chatId);
    return chat?.userId === userId;
  }

  /**
   * Get message count for user (rate limiting)
   */
  async getMessageCountForUser(userId: string, hours: number): Promise<number> {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    
    // Get all chat IDs for the user
    const userChats = await this.getChatsForUser(userId);
    const chatIds = userChats.map(chat => chat.id);

    if (chatIds.length === 0) return 0;

    const { count, error } = await this.client
      .from("Message")
      .select("*", { count: "exact", head: true })
      .in("chatId", chatIds)
      .gte("createdAt", since);

    if (error) {
      console.error("Error getting message count for user:", error);
      throw new Error(`Failed to get message count: ${error.message}`);
    }

    return count || 0;
  }

  /**
   * Get chat statistics
   */
  async getChatStats(chatId: string): Promise<{
    messageCount: number;
    userMessages: number;
    assistantMessages: number;
    lastActivity: string | null;
    averageResponseTime?: number;
  }> {
    const messages = await this.getMessages(chatId);
    
    const userMessages = messages.filter(m => m.role === 'user').length;
    const assistantMessages = messages.filter(m => m.role === 'assistant').length;
    const lastActivity = messages.length > 0 ? 
      messages[messages.length - 1].createdAt : null;

    return {
      messageCount: messages.length,
      userMessages,
      assistantMessages,
      lastActivity,
    };
  }

  // STREAM OPERATIONS

  /**
   * Create a stream entry
   */
  async createStream(chatId: string): Promise<StreamRow> {
    const { data: stream, error } = await this.client
      .from("Stream")
      .insert({
        chatId,
        createdAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating stream:", error);
      throw new Error(`Failed to create stream: ${error.message}`);
    }

    return stream;
  }

  /**
   * Get active streams for a chat
   */
  async getActiveStreams(chatId: string): Promise<StreamRow[]> {
    const { data, error } = await this.client
      .from("Stream")
      .select("*")
      .eq("chatId", chatId)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching streams:", error);
      throw new Error(`Failed to fetch streams: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Clean up old streams (older than 24 hours)
   */
  async cleanupOldStreams(): Promise<number> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    const { count, error } = await this.client
      .from("Stream")
      .delete()
      .lt("createdAt", oneDayAgo);

    if (error) {
      console.error("Error cleaning up old streams:", error);
      throw new Error(`Failed to cleanup old streams: ${error.message}`);
    }

    return count || 0;
  }
}
