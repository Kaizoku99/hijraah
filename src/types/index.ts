// Barrel file for all types
export * from "./auth";
export * from "./api";
export {
  type DocumentAnalysisRequest,
  DocumentType,
  type DocumentAnalysis,
  type ValidationResult,
  type Document as DomainDocument,
} from "./domain/documents";
export * from "./artifact";
export * from "./cases";
export * from "./chat";
export * from "./monitoring";
export {
  type ResearchStatus,
  type DocumentStatus,
  type VerificationStatus,
  type SearchMode,
  type Document as ResearchDocument,
  type DocumentMetadata,
  type ResearchSession,
  type ResearchReport,
  type ResearchSource,
  type ResearchFinding,
  type ResearchTopic,
  type ResearchAnalysis,
  type ResearchChatSession,
  type ResearchChatMessage,
} from "./research";
export * from "./supabase";

// Import Database type to use with enum types
import { Database } from "./supabase";

// Database type helpers
export type UserRole = Database["public"]["Enums"]["user_role"];
export type CaseStatus = Database["public"]["Enums"]["case_status"];
export type SessionStatus = Database["public"]["Enums"]["session_status"];
export type SessionType = Database["public"]["Enums"]["session_type"];
export type NotificationType = Database["public"]["Enums"]["notification_type"];
export type SourceCategory = Database["public"]["Enums"]["source_category"];

// Add other domain types here as they are created e.g.
// export * from './domain/cases';
// export * from './domain/chat';
