/**
 * API Response Types for Hijraah API
 * These types represent the response structures returned by the API
 */

// Base API Response
export interface ApiResponse {
  success: boolean;
  error?: string;
}

// General Types
export interface User {
  id: string;
  email: string;
  user_metadata: {
    first_name: string;
    last_name: string;
  };
}

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

// Authentication API Types
export interface SignInResponse extends ApiResponse {
  user: User;
  session: {
    access_token: string;
    expires_at: number;
  };
}

export interface SignUpResponse extends ApiResponse {
  message: string;
  user: User;
}

export interface ProfileResponse extends ApiResponse {
  user: User;
  profile: UserProfile;
}

// Research API Types
export interface ResearchSession {
  id: string;
  user_id: string;
  query: string;
  status: 'active' | 'processing' | 'completed' | 'error' | 'cancelled';
  metadata: {
    source: string;
    depth: number;
    startTime?: string;
    completedAt?: string;
    error?: string;
    errorTime?: string;
    cancelled_at?: string;
    cancelled_by?: string;
  };
  created_at: string;
  updated_at?: string;
}

export interface ResearchSource {
  id: string;
  report_id: string;
  url: string;
  title: string;
  content: string;
  metadata: any;
  created_at: string;
}

export interface ResearchFinding {
  id: string;
  report_id: string;
  content: string;
  category: string;
  metadata: any;
  created_at: string;
}

export interface ResearchSessionResponse extends ApiResponse {
  session: ResearchSession;
  sources: ResearchSource[];
  findings: ResearchFinding[];
}

export interface ResearchStartResponse extends ApiResponse {
  message: string;
  sessionId: string;
}

export interface UserSessionsResponse extends ApiResponse {
  sessions: ResearchSession[];
}

// Vector Search API Types
export interface EmbeddingResult {
  id: string;
  content: string;
  collection_id: string;
  user_id: string;
  metadata: any;
  similarity: number;
}

export interface EmbeddingResponse extends ApiResponse {
  embeddingId: string;
  message: string;
}

export interface VectorSearchResponse extends ApiResponse {
  query: string;
  results: EmbeddingResult[];
}

export interface BulkEmbeddingResult {
  success: boolean;
  text: string;
  embeddingId?: string;
  error?: string;
}

export interface BulkEmbeddingResponse extends ApiResponse {
  processedCount: number;
  failedCount: number;
  results: BulkEmbeddingResult[];
}

// Scraping API Types
export interface ScrapeMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  url: string;
  scrapedAt: string;
}

export interface ScrapeResponse extends ApiResponse {
  url: string;
  content: string;
  metadata: ScrapeMetadata;
  storageUrl?: string;
}

export interface BulkScrapeResult {
  success: boolean;
  url: string;
  content?: string;
  metadata?: ScrapeMetadata;
  storageUrl?: string;
  error?: string;
}

export interface BulkScrapeResponse extends ApiResponse {
  results: BulkScrapeResult[];
}

export interface ScrapeHistoryEntry {
  id: string;
  user_id: string;
  url: string;
  title: string;
  storage_path?: string;
  public_url?: string;
  metadata: any;
  created_at: string;
}

export interface ScrapeHistoryResponse extends ApiResponse {
  history: ScrapeHistoryEntry[];
} 