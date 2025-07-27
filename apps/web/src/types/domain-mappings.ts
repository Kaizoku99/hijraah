/**
 * Domain Type Mappings
 *
 * This file provides type-safe mappings between Supabase database types (snake_case)
 * and our domain entities (camelCase). It serves as the central place for all
 * database-to-domain type conversions.
 */

import { Database, Tables } from "./database.types";
import { toCamelCase, toSnakeCase } from "@/lib/utils/case-converter";

// Database table types
export type DBChatSessionRow = Tables<"chat_sessions">;
export type DBChatMessageRow = Tables<"chat_messages">;
export type DBDocumentRow = Tables<"documents">;
export type DBCaseRow = Tables<"cases">;
export type DBUserProfileRow = Tables<"profiles">;
export type DBResearchSessionRow = Tables<"research_sessions">;

// Domain entity interfaces that match our business logic
export interface ChatSessionDomain {
  id: string;
  userId: string;
  title: string | null;
  systemPrompt: string | null;
  context: string | null;
  model: string | null;
  prompt: string | null;
  agentConfig: any | null;
  caseId: string | null;
  lastMessageAt: string | null;
  metadata: any | null;
  visibility: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ChatMessageDomain {
  id: string;
  sessionId: string;
  userId: string | null;
  role: string;
  content: string;
  sources: any | null;
  toolCalls: any | null;
  tokens: number | null;
  metadata: any | null;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentDomain {
  id: string;
  userId: string | null;
  title: string;
  filename: string;
  filePath: string;
  fileType: string | null;
  fileSize: number | null;
  content: string | null;
  text: string;
  status: string;
  classification: any | null;
  metadata: any | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CaseDomain {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  status: Database["public"]["Enums"]["case_status"];
  metadata: any | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface UserProfileDomain {
  id: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  countryOfCitizenship: string | null;
  countryOfInterest: string | null;
  countryOfResidence: string | null;
  immigrationGoals: string | null;
  language: string | null;
  timezone: string | null;
  visaType: string | null;
  role: Database["public"]["Enums"]["user_role"] | null;
  isAdmin: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Type-safe mapping functions
 */
export class DomainMapper {
  /**
   * Maps a database chat session row to domain entity
   */
  static toChatSessionDomain(dbRow: DBChatSessionRow): ChatSessionDomain {
    return {
      id: dbRow.id,
      userId: dbRow.user_id,
      title: dbRow.title,
      systemPrompt: dbRow.system_prompt,
      context: dbRow.context,
      model: dbRow.model,
      prompt: dbRow.prompt,
      agentConfig: dbRow.agent_config,
      caseId: dbRow.case_id,
      lastMessageAt: dbRow.last_message_at,
      metadata: dbRow.metadata,
      visibility: dbRow.visibility,
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at,
    };
  }

  /**
   * Maps a domain chat session entity to database row
   */
  static fromChatSessionDomain(
    domain: ChatSessionDomain,
  ): Partial<DBChatSessionRow> {
    return {
      id: domain.id,
      user_id: domain.userId,
      title: domain.title,
      system_prompt: domain.systemPrompt,
      context: domain.context,
      model: domain.model,
      prompt: domain.prompt,
      agent_config: domain.agentConfig,
      case_id: domain.caseId,
      last_message_at: domain.lastMessageAt,
      metadata: domain.metadata,
      visibility: domain.visibility,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  /**
   * Maps a database chat message row to domain entity
   */
  static toChatMessageDomain(dbRow: DBChatMessageRow): ChatMessageDomain {
    return {
      id: dbRow.id,
      sessionId: dbRow.session_id,
      userId: dbRow.user_id,
      role: dbRow.role,
      content: dbRow.content,
      sources: dbRow.sources,
      toolCalls: dbRow.tool_calls,
      tokens: dbRow.tokens,
      metadata: dbRow.metadata,
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at,
    };
  }

  /**
   * Maps a domain chat message entity to database row
   */
  static fromChatMessageDomain(
    domain: ChatMessageDomain,
  ): Partial<DBChatMessageRow> {
    return {
      id: domain.id,
      session_id: domain.sessionId,
      user_id: domain.userId,
      role: domain.role,
      content: domain.content,
      sources: domain.sources,
      tool_calls: domain.toolCalls,
      tokens: domain.tokens,
      metadata: domain.metadata,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  /**
   * Maps a database document row to domain entity
   */
  static toDocumentDomain(dbRow: DBDocumentRow): DocumentDomain {
    return {
      id: dbRow.id,
      userId: dbRow.user_id,
      title: dbRow.title,
      filename: dbRow.filename,
      filePath: dbRow.file_path,
      fileType: dbRow.file_type,
      fileSize: dbRow.file_size,
      content: dbRow.content,
      text: dbRow.text,
      status: dbRow.status,
      classification: dbRow.classification,
      metadata: dbRow.metadata,
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at,
    };
  }

  /**
   * Maps a domain document entity to database row
   */
  static fromDocumentDomain(domain: DocumentDomain): Partial<DBDocumentRow> {
    return {
      id: domain.id,
      user_id: domain.userId,
      title: domain.title,
      filename: domain.filename,
      file_path: domain.filePath,
      file_type: domain.fileType,
      file_size: domain.fileSize,
      content: domain.content,
      text: domain.text,
      status: domain.status,
      classification: domain.classification,
      metadata: domain.metadata,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  /**
   * Maps a database case row to domain entity
   */
  static toCaseDomain(dbRow: DBCaseRow): CaseDomain {
    return {
      id: dbRow.id,
      userId: dbRow.user_id,
      title: dbRow.title,
      description: dbRow.description,
      status: dbRow.status,
      metadata: dbRow.metadata,
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at,
    };
  }

  /**
   * Maps a domain case entity to database row
   */
  static fromCaseDomain(domain: CaseDomain): Partial<DBCaseRow> {
    return {
      id: domain.id,
      user_id: domain.userId,
      title: domain.title,
      description: domain.description,
      status: domain.status,
      metadata: domain.metadata,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  /**
   * Maps a database user profile row to domain entity
   */
  static toUserProfileDomain(dbRow: DBUserProfileRow): UserProfileDomain {
    return {
      id: dbRow.id,
      firstName: dbRow.first_name,
      lastName: dbRow.last_name,
      avatarUrl: dbRow.avatar_url,
      bio: dbRow.bio,
      countryOfCitizenship: dbRow.country_of_citizenship,
      countryOfInterest: dbRow.country_of_interest,
      countryOfResidence: dbRow.country_of_residence,
      immigrationGoals: dbRow.immigration_goals,
      language: dbRow.language,
      timezone: dbRow.timezone,
      visaType: dbRow.visa_type,
      role: dbRow.role,
      isAdmin: dbRow.is_admin,
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at,
    };
  }

  /**
   * Maps a domain user profile entity to database row
   */
  static fromUserProfileDomain(
    domain: UserProfileDomain,
  ): Partial<DBUserProfileRow> {
    return {
      id: domain.id,
      first_name: domain.firstName,
      last_name: domain.lastName,
      avatar_url: domain.avatarUrl,
      bio: domain.bio,
      country_of_citizenship: domain.countryOfCitizenship,
      country_of_interest: domain.countryOfInterest,
      country_of_residence: domain.countryOfResidence,
      immigration_goals: domain.immigrationGoals,
      language: domain.language,
      timezone: domain.timezone,
      visa_type: domain.visaType,
      role: domain.role,
      is_admin: domain.isAdmin,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  /**
   * Generic mapping function using case converter
   * Use when specific mapping isn't available
   */
  static genericToDomain<T>(dbRow: any): T {
    return toCamelCase<T>(dbRow);
  }

  /**
   * Generic mapping function using case converter
   * Use when specific mapping isn't available
   */
  static genericFromDomain<T>(domain: any): T {
    return toSnakeCase<T>(domain);
  }
}
