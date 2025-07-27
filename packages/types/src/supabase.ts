// Supabase Auth types
export interface SupabaseUser {
  id: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  user_metadata: Record<string, any>;
  app_metadata: Record<string, any>;
}

export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: SupabaseUser;
}

// Database utility types
export interface DatabaseConfig {
  url: string;
  anon_key: string;
  service_role_key?: string;
}

// Vector database types for pgvector
export interface VectorQuery {
  query_embedding: number[];
  match_count?: number;
  similarity_threshold?: number;
  filter?: Record<string, any>;
}

export interface VectorMatch {
  id: string;
  content: string;
  metadata: Record<string, any>;
  similarity: number;
}

// RLS policies and security
export interface RowLevelSecurityPolicy {
  schema: string;
  table: string;
  name: string;
  command: "SELECT" | "INSERT" | "UPDATE" | "DELETE" | "ALL";
  role: string;
  expression: string;
}

// Supabase Edge Function types
export interface EdgeFunctionContext {
  req: Request;
  connInfo: {
    localAddr: string;
    remoteAddr: string;
  };
}

export interface EdgeFunctionResponse {
  status?: number;
  headers?: Record<string, string>;
  body?: any;
}

// Storage types
export interface StorageObject {
  name: string;
  bucket_id: string;
  owner?: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
}

export interface UploadOptions {
  cacheControl?: string;
  contentType?: string;
  duplex?: string;
  upsert?: boolean;
}
