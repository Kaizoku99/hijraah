// Barrel file for all types - SINGLE SOURCE OF TRUTH

// Core domain types
export * from "./api";
export * from "./auth";
export * from "./artifact";
export * from "./cases";
export * from "./chat";
export * from "./monitoring";
export * from "./research";

// UI Component types (renamed to avoid conflicts)
export type {
  SidebarProps,
  UIDocumentStatus,
  DocumentCardProps,
  ExtendedAttachment,
  ArtifactState,
  StreamDataPoint,
  RouteKey,
  RoadmapType,
  PhaseType,
  TaskType,
  ArtifactConfig,
  ArtifactAction,
  ArtifactToolbarItem,
  InitializeParameters,
  UIArtifact,
  ToastAction,
  ToasterToast,
  DataStreamDelta,
  Suggestion,
} from "./components";

// ActionType is an enum, not a type
export { ActionType } from "./components";

// Domain-specific types with naming adjustments
export {
  type DocumentAnalysisRequest,
  DocumentType,
  type DocumentAnalysis,
  type ValidationResult,
  type Document as DomainDocument,
} from "./domain/documents";

// Supabase generated types
export * from "./supabase";

// Database type helpers
import { Database } from "./supabase";

// Export enum types from the database
export type UserRole = Database["public"]["Enums"]["user_role"];
export type CaseStatus = Database["public"]["Enums"]["case_status"];
export type SessionStatus = Database["public"]["Enums"]["session_status"];
export type SessionType = Database["public"]["Enums"]["session_type"];
export type NotificationType = Database["public"]["Enums"]["notification_type"];
export type SourceCategory = Database["public"]["Enums"]["source_category"];

// Add other domain types here as they are created e.g.
// export * from './domain/cases';
// export * from './domain/chat';
