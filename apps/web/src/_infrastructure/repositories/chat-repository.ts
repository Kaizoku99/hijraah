/**
 * This file is a stub that re-exports the ChatRepository from its proper location.
 * This ensures backward compatibility with components that import it from this location.
 */

import { Chat } from "@/_core/chat/entities/chat";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { BaseRepository, RepositoryOptions } from "./base-repository";
import { toSnakeCase } from "@/lib/utils/case-converter";
import { createSupabaseServiceClient } from "@/lib/supabase/client";
import {
  DomainMapper,
  DBChatSessionRow,
  DBChatMessageRow,
  ChatSessionDomain,
  ChatMessageDomain,
} from "@/types/domain-mappings";

// Use Supabase generated types for DB operations
export type DBChatSessionInsert =
  Database["public"]["Tables"]["chat_sessions"]["Insert"];
export type DBChatMessageInsert =
  Database["public"]["Tables"]["chat_messages"]["Insert"];
export type DBChatAttachmentRow =
  Database["public"]["Tables"]["chat_attachments"]["Row"];

/**
 * ChatRepository provides data access operations for chats
 */
export class ChatRepository extends BaseRepository<
  DBChatSessionRow,
  string,
  "chat_sessions"
> {
  constructor(options: RepositoryOptions = {}) {
    super("chat_sessions", options);
  }

  /**
   * Get a single chat by its ID, and return a domain entity
   * This overrides the base method to return a Chat entity
   */
  async getChatById(id: string): Promise<Chat | null> {
    const record = await super.getById(id);
    if (!record) return null;
    return this.toChatEntity(record);
  }

  /**
   * Base repository compatibility - returns raw database record
   */
  async getById(id: string): Promise<DBChatSessionRow | null> {
    return await super.getById(id);
  }

  /**
   * Get all chats for a user
   */
  async getByUserId(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
      orderBy?: string;
      case_id?: string;
      withMessages?: boolean;
    }
  ): Promise<DBChatSessionRow[]> {
    const client = await this.getClient();

    let query = client.from("chat_sessions").select("*").eq("user_id", userId);

    // Filter by case if specified
    if (options?.case_id) {
      query = query.eq("case_id", options.case_id);
    }

    // Apply ordering with field name mapping
    if (options?.orderBy) {
      const [field, direction] = options.orderBy.split(":");

      // Map camelCase field names to snake_case database column names
      const fieldMapping: Record<string, string> = {
        createdAt: "created_at",
        updatedAt: "updated_at",
        lastMessageAt: "last_message_at",
        userId: "user_id",
        caseId: "case_id",
        systemPrompt: "system_prompt",
        agentConfig: "agent_config",
      };

      const dbField = fieldMapping[field] || field;
      query = query.order(dbField, { ascending: direction !== "desc" });
    } else {
      query = query.order("last_message_at", { ascending: false });
    }

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(
        options.offset,
        options.offset + (options.limit || 10) - 1
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching chats by user ID:", error);
      throw new Error(`Failed to fetch chats: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get messages for a chat session
   */
  async getMessages(chatId: string): Promise<DBChatMessageRow[]> {
    const client = await this.getClient();

    const { data: messages, error } = await client
      .from("chat_messages")
      .select("*")
      .eq("session_id", chatId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching chat messages:", error);
      throw new Error(`Failed to fetch chat messages: ${error.message}`);
    }

    return messages || [];
  }

  /**
   * Get chat with messages and attachments
   */
  async getWithDetails(chatId: string): Promise<{
    chat: DBChatSessionRow;
    messages: DBChatMessageRow[];
    attachments: DBChatAttachmentRow[];
  } | null> {
    const client = await this.getClient();

    // Fetch chat
    const { data: chat, error: chatError } = await client
      .from("chat_sessions")
      .select("*")
      .eq("id", chatId)
      .single();

    if (chatError || !chat) {
      if (chatError && chatError.code === "PGRST116") return null; // Record not found
      console.error("Error fetching chat:", chatError);
      return null;
    }

    // Fetch messages
    const { data: messages, error: messagesError } = await client
      .from("chat_messages")
      .select("*")
      .eq("session_id", chatId)
      .order("created_at", { ascending: true });

    if (messagesError) {
      console.error("Error fetching chat messages:", messagesError);
      throw new Error(
        `Failed to fetch chat messages: ${messagesError.message}`
      );
    }

    // Get message IDs to fetch attachments
    const messageIds = (messages || []).map((m) => m.id);

    // Fetch attachments if there are messages
    let attachments: DBChatAttachmentRow[] = [];
    if (messageIds.length > 0) {
      const { data: attachmentData, error: attachmentsError } = await client
        .from("chat_attachments")
        .select("*")
        .in("message_id", messageIds);

      if (attachmentsError) {
        console.error("Error fetching chat attachments:", attachmentsError);
        throw new Error(
          `Failed to fetch chat attachments: ${attachmentsError.message}`
        );
      }

      attachments = attachmentData || [];
    }

    return {
      chat,
      messages: messages || [],
      attachments,
    };
  }

  /**
   * Add a new message to a chat
   */
  async addMessage(
    chatId: string,
    messageData: Omit<DBChatMessageInsert, "session_id">
  ): Promise<DBChatMessageRow> {
    const client = await this.getClient();

    // Prepare the message data
    const payload: DBChatMessageInsert = {
      ...messageData,
      session_id: chatId,
      created_at: messageData.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await client
      .from("chat_messages")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Error adding chat message:", error);
      throw new Error(`Failed to add chat message: ${error.message}`);
    }

    // Update the chat's last_message_at timestamp
    await client
      .from("chat_sessions")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", chatId);

    return data;
  }

  async deleteChat(id: string): Promise<{ success: boolean }> {
    const client = await this.getClient();

    const { error: messageError } = await client
      .from("chat_messages")
      .delete()
      .eq("session_id", id);
    if (messageError) {
      console.error("Error deleting chat messages:", messageError);
      throw messageError;
    }

    const { error: sessionError } = await client
      .from("chat_sessions")
      .delete()
      .eq("id", id);
    if (sessionError) {
      console.error("Error deleting chat session:", sessionError);
      throw sessionError;
    }

    return { success: true };
  }

  async getMessageCountForUser(userId: string, hours: number): Promise<number> {
    const client = await this.getClient();
    const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    const { count, error } = await client
      .from("chat_messages")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", since);

    if (error) {
      console.error("Error getting message count for user:", error);
      throw error;
    }
    return count || 0;
  }

  async storeStreamId(chatId: string, streamId: string): Promise<void> {
    const client = await this.getClient();
    const { data, error } = await client
      .from("chat_sessions")
      .select("context")
      .eq("id", chatId)
      .single();

    if (error || !data) {
      console.error(`Chat not found for storing stream ID: ${chatId}`, error);
      return;
    }

    const context =
      typeof data.context === "object" && data.context !== null
        ? (data.context as Record<string, any>)
        : {};
    const streamIds = Array.isArray(context.streamIds) ? context.streamIds : [];
    if (!streamIds.includes(streamId)) {
      streamIds.push(streamId);
    }
    context.streamIds = streamIds;

    const { error: updateError } = await client
      .from("chat_sessions")
      .update({ context: context as any })
      .eq("id", chatId);

    if (updateError) {
      console.error(`Error storing stream ID for chat ${chatId}:`, updateError);
    }
  }

  async getStreamIdsForChat(chatId: string): Promise<string[]> {
    const client = await this.getClient();
    const { data, error } = await client
      .from("chat_sessions")
      .select("context")
      .eq("id", chatId)
      .single();

    if (error || !data) {
      console.error(`Chat not found for getting stream IDs: ${chatId}`, error);
      return [];
    }
    const context =
      typeof data.context === "object" && data.context !== null
        ? (data.context as Record<string, any>)
        : {};
    return context?.streamIds || [];
  }

  async deleteStreamIdsForChat(chatId: string): Promise<void> {
    const client = await this.getClient();
    const { data, error } = await client
      .from("chat_sessions")
      .select("context")
      .eq("id", chatId)
      .single();

    if (error || !data) {
      console.error(`Chat not found for deleting stream IDs: ${chatId}`, error);
      return;
    }

    const context =
      typeof data.context === "object" && data.context !== null
        ? (data.context as Record<string, any>)
        : {};
    if (context.streamIds) {
      delete context.streamIds;
      const { error: updateError } = await client
        .from("chat_sessions")
        .update({ context: context as any })
        .eq("id", chatId);

      if (updateError) {
        console.error(
          `Error deleting stream IDs for chat ${chatId}:`,
          updateError
        );
      }
    }
  }

  /**
   * Convert database record to domain entity
   */
  toDomainEntity(record: DBChatSessionRow): DBChatSessionRow {
    // For compatibility with the BaseRepository's typing
    return record;
  }

  /**
   * Get domain entity from database record (chat model)
   */
  toChatEntity(record: DBChatSessionRow): Chat {
    return Chat.fromDatabase(record);
  }

  /**
   * Convert database record to domain mapping format
   */
  toChatSessionDomain(record: DBChatSessionRow): ChatSessionDomain {
    return DomainMapper.toChatSessionDomain(record);
  }

  /**
   * Prepare domain entity for database storage
   */
  fromDomainEntity(entity: Chat): Partial<DBChatSessionRow> {
    const entityObject = entity.toObject();
    const snakeCaseObject = toSnakeCase(
      entityObject
    ) as Partial<DBChatSessionRow>;
    return snakeCaseObject;
  }

  /**
   * Prepare chat session domain entity for database storage
   */
  fromChatSessionDomain(domain: ChatSessionDomain): Partial<DBChatSessionRow> {
    return DomainMapper.fromChatSessionDomain(domain);
  }

  /**
   * Map domain entity to database record (alias for fromDomainEntity)
   */
  fromDomainEntityToDbRecord(entity: Chat): Partial<DBChatSessionRow> {
    return this.fromDomainEntity(entity);
  }

  /**
   * Map database record to domain entity
   */
  mapRecordToDomain(record: DBChatSessionRow): Chat {
    return this.toChatEntity(record);
  }
}
