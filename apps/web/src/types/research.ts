import { User } from "@supabase/supabase-js";

export type ResearchStatus = "active" | "completed" | "archived" | "error";
export type DocumentStatus = "pending" | "processing" | "completed" | "error";
export type VerificationStatus = "pending" | "verified" | "disputed";
export type SearchMode = "vector" | "keyword" | "hybrid";

export interface Document {
  id: string;
  url: string;
  title?: string;
  content: string;
  type: string;
  status: DocumentStatus;
  metadata: Record<string, any>;
  embedding_model?: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentMetadata {
  id: string;
  document_id: string;
  language?: string;
  source_type?: string;
  credibility_score?: number;
  last_verified?: string;
  extraction_data?: Record<string, any>;
  analysis_data?: Record<string, any>;
  metadata: Record<string, any>;
}

export interface ResearchSession {
  id: string;
  user_id: string;
  title?: string;
  query: string;
  status: ResearchStatus;
  max_depth: number;
  search_mode: SearchMode;
  model_config: Record<string, any>;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ResearchReport {
  id: string;
  session_id: string;
  user_id: string;
  title: string;
  summary?: string;
  status: "draft" | "published" | "archived";
  report_data: Record<string, any>;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ResearchSource {
  id: string;
  report_id: string;
  document_id?: string;
  url: string;
  title?: string;
  content?: string;
  relevance?: number;
  credibility_score?: number;
  citation_data?: Record<string, any>;
  metadata: Record<string, any>;
  created_at: string;
}

export interface ResearchFinding {
  id: string;
  report_id: string;
  source_id?: string;
  content: string;
  category?: string;
  confidence?: number;
  importance?: number;
  verification_status: VerificationStatus;
  metadata: Record<string, any>;
  created_at: string;
}

export interface ResearchTopic {
  id: string;
  report_id: string;
  name: string;
  description?: string;
  relevance?: number;
  parent_id?: string;
  findings: Array<{
    id: string;
    content: string;
    confidence: number;
  }>;
  metadata: Record<string, any>;
  created_at: string;
}

export interface ResearchAnalysis {
  id: string;
  report_id: string;
  analysis_type: string;
  summary?: string;
  key_findings?: any[];
  gaps?: any[];
  next_steps?: any[];
  analysis_data: Record<string, any>;
  metadata: Record<string, any>;
  created_at: string;
}

export interface ResearchChatSession {
  id: string;
  research_session_id: string;
  user_id: string;
  title?: string;
  status: "active" | "archived";
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ResearchChatMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  metadata: Record<string, any>;
  created_at: string;
}
