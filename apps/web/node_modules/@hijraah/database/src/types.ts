import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  profiles,
  webIndexes,
  crawlJobs,
  chatSessions,
  chatMessages,
  chatMessageVotes,
  artifacts,
  suggestions,
  streams,
  upstashCacheMeta,
  documents,
  embeddings,
  entities,
  relationships,
  dataRetentionPolicies,
} from "./schema";

// ===== CORE TYPES =====
export type Visibility = "private" | "public" | "shared";
export type MessageRole = "system" | "user" | "assistant" | "tool";
export type VoteType = "up" | "down";
export type JobStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";
export type ArtifactType =
  | "code"
  | "text"
  | "image"
  | "sheet"
  | "chart"
  | "diagram";
export type DataType =
  | "chat_messages"
  | "documents"
  | "embeddings"
  | "artifacts"
  | "user_data"
  | "search_history";

// ===== DRIZZLE INFERRED TYPES (Context7 Best Practice) =====

// Profile Types
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type ProfileUpdate = Partial<
  Omit<NewProfile, "id" | "userId" | "createdAt">
>;

// Web Index Types
export type WebIndex = typeof webIndexes.$inferSelect;
export type NewWebIndex = typeof webIndexes.$inferInsert;
export type WebIndexUpdate = Partial<
  Omit<NewWebIndex, "id" | "userId" | "createdAt">
>;

// Crawl Job Types
export type CrawlJob = typeof crawlJobs.$inferSelect;
export type NewCrawlJob = typeof crawlJobs.$inferInsert;
export type CrawlJobUpdate = Partial<
  Omit<NewCrawlJob, "id" | "webIndexId" | "createdAt">
>;

// Chat Session Types
export type ChatSession = typeof chatSessions.$inferSelect;
export type NewChatSession = typeof chatSessions.$inferInsert;
export type ChatSessionUpdate = Partial<
  Omit<NewChatSession, "id" | "userId" | "createdAt">
>;

// Chat Message Types
export type ChatMessage = typeof chatMessages.$inferSelect;
export type NewChatMessage = typeof chatMessages.$inferInsert;
export type ChatMessageUpdate = Partial<
  Omit<NewChatMessage, "id" | "chatId" | "createdAt">
>;

// Artifact Types
export type Artifact = typeof artifacts.$inferSelect;
export type NewArtifact = typeof artifacts.$inferInsert;
export type ArtifactUpdate = Partial<
  Omit<NewArtifact, "id" | "userId" | "createdAt">
>;

// Document Types
export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
export type DocumentUpdate = Partial<
  Omit<NewDocument, "id" | "userId" | "createdAt">
>;

// Embedding Types
export type Embedding = typeof embeddings.$inferSelect;
export type NewEmbedding = typeof embeddings.$inferInsert;
export type EmbeddingUpdate = Partial<
  Omit<NewEmbedding, "id" | "documentId" | "createdAt">
>;

// ===== ZOD VALIDATION SCHEMAS (Context7 Best Practice) =====

// Base Schemas
export const profileInsertSchema = createInsertSchema(profiles);

export const profileSelectSchema = createSelectSchema(profiles);

export const webIndexInsertSchema = createInsertSchema(webIndexes);

export const webIndexSelectSchema = createSelectSchema(webIndexes);

export const chatSessionInsertSchema = createInsertSchema(chatSessions);

export const chatSessionSelectSchema = createSelectSchema(chatSessions);

export const chatMessageInsertSchema = createInsertSchema(chatMessages);

export const chatMessageSelectSchema = createSelectSchema(chatMessages);

export const artifactInsertSchema = createInsertSchema(artifacts);

export const artifactSelectSchema = createSelectSchema(artifacts);

// ===== COMPOSITE TYPES FOR API RESPONSES =====
export type ChatSessionWithMessages = ChatSession & {
  messages: ChatMessage[];
  messageCount: number;
  lastMessage?: ChatMessage;
};

export type ChatMessageWithVotes = ChatMessage & {
  votes: ChatMessageVotes[];
  voteCount: number;
  userVote?: VoteType;
};

export type ChatMessageVotes = typeof chatMessageVotes.$inferSelect;

export type WebIndexWithStats = WebIndex & {
  documentsCount: number;
  crawlJobsCount: number;
  lastSuccessfulCrawl?: CrawlJob;
  chatSessionsCount: number;
};

export type DocumentWithEmbeddings = Document & {
  embeddings: Embedding[];
  embeddingCount: number;
};

export type ArtifactWithMessage = Artifact & {
  message?: ChatMessage;
  chatSession?: ChatSession;
};

// ===== SEARCH & FILTER TYPES =====
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ChatSessionFilters extends PaginationParams, SortParams {
  userId?: string;
  visibility?: Visibility;
  model?: string;
  webIndexId?: string;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface WebIndexFilters extends PaginationParams, SortParams {
  userId?: string;
  isActive?: boolean;
  isPublic?: boolean;
  search?: string;
  namespace?: string;
  hasDocuments?: boolean;
}

export interface DocumentFilters extends PaginationParams, SortParams {
  userId?: string;
  webIndexId?: string;
  contentType?: string;
  isProcessed?: boolean;
  search?: string;
  hasEmbeddings?: boolean;
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    sort?: SortParams;
    filters?: Record<string, any>;
  };
}

export interface StreamResponse {
  id: string;
  object: "chat.completion.chunk";
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      role?: MessageRole;
      content?: string;
      tool_calls?: any[];
    };
    finish_reason?: string | null;
  }>;
}

// ===== VALIDATION FUNCTIONS =====
export const validateProfile = (data: unknown): NewProfile => {
  return profileInsertSchema.parse(data);
};

export const validateWebIndex = (data: unknown): NewWebIndex => {
  return webIndexInsertSchema.parse(data);
};

export const validateChatSession = (data: unknown): NewChatSession => {
  return chatSessionInsertSchema.parse(data);
};

export const validateChatMessage = (data: unknown): NewChatMessage => {
  return chatMessageInsertSchema.parse(data);
};

export const validateArtifact = (data: unknown): NewArtifact => {
  return artifactInsertSchema.parse(data);
};

// ===== ERROR TYPES =====
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any,
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: z.ZodError,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends Error {
  constructor(action: string) {
    super(`Unauthorized to perform action: ${action}`);
    this.name = "UnauthorizedError";
  }
}
