/**
 * Chat domain entity
 *
 * This entity represents a chat between a user and the AI assistant.
 */

import {
  DBChatAttachmentRow,
  DBChatMessageRow,
  DBChatSessionRow,
} from "@/_infrastructure/repositories/chat-repository";

export enum ChatModelType {
  GPT_3_5 = "gpt-3.5-turbo",
  GPT_4 = "gpt-4",
  GPT_4_VISION = "gpt-4-vision-preview",
  CLAUDE_3_SONNET = "claude-3-sonnet",
  CLAUDE_3_OPUS = "claude-3-opus",
  CLAUDE_3_HAIKU = "claude-3-haiku",
}

export type ChatVisibility = "private" | "public" | "team";

export class ChatMessage {
  id: string;
  chatId: string;
  role: "user" | "assistant" | "system";
  content: string;
  attachments: ChatAttachment[];
  metadata: Record<string, any>;
  createdAt: Date;

  constructor(data: {
    id: string;
    chatId: string;
    role: "user" | "assistant" | "system";
    content: string;
    attachments?: ChatAttachment[];
    metadata?: Record<string, any>;
    createdAt?: Date;
  }) {
    this.id = data.id;
    this.chatId = data.chatId;
    this.role = data.role;
    this.content = data.content;
    this.attachments = data.attachments || [];
    this.metadata = data.metadata || {};
    this.createdAt = data.createdAt || new Date();
  }

  static fromDatabase(
    record: DBChatMessageRow,
    attachments: ChatAttachment[] = [],
  ): ChatMessage {
    return new ChatMessage({
      id: record.id,
      chatId: record.session_id,
      role: record.role as "user" | "assistant" | "system",
      content: record.content || "",
      attachments: attachments.filter((a) => a.messageId === record.id),
      metadata:
        typeof record.metadata === "object" && record.metadata
          ? (record.metadata as Record<string, any>)
          : {},
      createdAt: new Date(record.created_at),
    });
  }
}

export class ChatAttachment {
  id: string;
  messageId: string;
  type: "image" | "document" | "link";
  fileId: string | null; // Reference to a document in the document system
  url: string | null;
  name: string;
  contentType: string | null;
  size: number | null;
  metadata: Record<string, any>;
  createdAt: Date;

  constructor(data: {
    id: string;
    messageId: string;
    type: "image" | "document" | "link";
    fileId?: string | null;
    url?: string | null;
    name: string;
    contentType?: string | null;
    size?: number | null;
    metadata?: Record<string, any>;
    createdAt?: Date;
  }) {
    this.id = data.id;
    this.messageId = data.messageId;
    this.type = data.type;
    this.fileId = data.fileId || null;
    this.url = data.url || null;
    this.name = data.name;
    this.contentType = data.contentType || null;
    this.size = data.size || null;
    this.metadata = data.metadata || {};
    this.createdAt = data.createdAt || new Date();
  }

  static fromDatabase(record: DBChatAttachmentRow): ChatAttachment {
    return new ChatAttachment({
      id: record.id,
      messageId: record.message_id,
      type: record.type as "image" | "document" | "link",
      fileId: record.file_id,
      url: record.url,
      name: record.name,
      contentType: record.content_type,
      size: record.size,
      metadata:
        typeof record.metadata === "object" && record.metadata
          ? (record.metadata as Record<string, any>)
          : {},
      createdAt: new Date(record.created_at),
    });
  }
}

/**
 * Chat entity representing conversations with the AI assistant
 */
export class Chat {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  modelType: ChatModelType;
  visibility: ChatVisibility;
  systemPrompt: string | null;
  messages: ChatMessage[];
  case_id: string | null; // Optional association with a case
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    userId: string;
    title: string;
    description?: string | null;
    modelType?: ChatModelType;
    visibility?: ChatVisibility;
    systemPrompt?: string | null;
    messages?: ChatMessage[];
    case_id?: string | null;
    rawMetadata?: Record<string, any> | null;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.userId = data.userId;
    this.title = data.title;
    this.description = data.description || null;
    this.modelType = data.modelType || ChatModelType.GPT_4;
    this.visibility = data.visibility || "private";
    this.systemPrompt = data.systemPrompt || null;
    this.messages = data.messages || [];
    this.case_id = data.case_id || null;
    this.metadata = data.rawMetadata || {};
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Add a new message to the chat
   */
  addMessage(message: Omit<ChatMessage, "chatId">): Chat {
    const newMessage: ChatMessage = {
      ...message,
      chatId: this.id,
    };

    this.messages.push(newMessage);
    this.updatedAt = new Date();

    return this;
  }

  /**
   * Get the latest message in the chat
   */
  getLatestMessage(): ChatMessage | null {
    if (this.messages.length === 0) {
      return null;
    }

    // Sort messages by creation date (newest first)
    const sortedMessages = [...this.messages].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    return sortedMessages[0];
  }

  /**
   * Associate this chat with a case
   */
  assignToCase(case_id: string): Chat {
    this.case_id = case_id;
    this.updatedAt = new Date();

    return this;
  }

  /**
   * Update chat metadata
   */
  updateMetadata(metadata: Record<string, any>): Chat {
    this.metadata = {
      ...this.metadata,
      ...metadata,
    };
    this.updatedAt = new Date();

    return this;
  }

  /**
   * Update chat title and description
   */
  updateDetails(data: {
    title?: string;
    description?: string | null;
    modelType?: ChatModelType;
    visibility?: ChatVisibility;
    systemPrompt?: string | null;
  }): Chat {
    if (data.title !== undefined) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.modelType !== undefined) this.modelType = data.modelType;
    if (data.visibility !== undefined) this.visibility = data.visibility;
    if (data.systemPrompt !== undefined) this.systemPrompt = data.systemPrompt;

    this.updatedAt = new Date();

    return this;
  }

  /**
   * Convert the chat to a plain object
   */
  toObject(): Record<string, any> {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      description: this.description,
      modelType: this.modelType,
      visibility: this.visibility,
      systemPrompt: this.systemPrompt,
      messages: this.messages,
      case_id: this.case_id,
      metadata: this.metadata,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromDatabase(
    record: DBChatSessionRow,
    messages: DBChatMessageRow[] = [],
    attachments: DBChatAttachmentRow[] = [],
  ): Chat {
    const metadata =
      typeof record.metadata === "object" &&
      record.metadata !== null &&
      !Array.isArray(record.metadata)
        ? (record.metadata as Record<string, any>)
        : {};

    const chatAttachments = attachments.map(ChatAttachment.fromDatabase);

    return new Chat({
      id: record.id,
      userId: record.user_id,
      title: record.title || "Untitled Chat",
      description: (metadata?.description as string) || null,
      modelType: (record.model as ChatModelType) || ChatModelType.GPT_4,
      visibility: (record.visibility as ChatVisibility) || "private",
      systemPrompt: record.system_prompt || null,
      messages: messages.map((m) =>
        ChatMessage.fromDatabase(m, chatAttachments),
      ),
      case_id: record.case_id || null,
      rawMetadata: metadata,
      createdAt: record.created_at ? new Date(record.created_at) : new Date(),
      updatedAt: record.updated_at ? new Date(record.updated_at) : new Date(),
    });
  }
}
