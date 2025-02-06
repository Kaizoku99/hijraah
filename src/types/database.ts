export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Document = Database['public']['Tables']['documents']['Row']

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          avatar_url?: string
          settings_theme?: string
          settings_language?: string
          settings_emailNotifications?: boolean
          settings_documentReminders?: boolean
          settings_applicationUpdates?: boolean
          settings_twoFactorAuth?: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          avatar_url?: string
          settings_theme?: string
          settings_language?: string
          settings_emailNotifications?: boolean
          settings_documentReminders?: boolean
          settings_applicationUpdates?: boolean
          settings_twoFactorAuth?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          avatar_url?: string
          settings_theme?: string
          settings_language?: string
          settings_emailNotifications?: boolean
          settings_documentReminders?: boolean
          settings_applicationUpdates?: boolean
          settings_twoFactorAuth?: boolean
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          file_path: string
          file_type: string
          file_size: number
          category_id: string | null
          session_id: string | null
          case_id: string | null
          status: 'error' | 'ready' | 'processing'
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          description?: string | null
          file_path: string
          file_type: string
          file_size: number
          category_id?: string | null
          session_id?: string | null
          case_id?: string | null
          status: 'error' | 'ready' | 'processing'
          metadata: Json
        }
        Update: Partial<Database['public']['Tables']['documents']['Row']>
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          case_id: string | null
          title: string | null
          status: 'active' | 'archived' | 'deleted'
          started_at: string
          ended_at: string | null
          context: Json | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          case_id?: string | null
          title?: string | null
          status: 'active' | 'archived' | 'deleted'
          started_at: string
          ended_at?: string | null
          context?: Json | null
          metadata?: Json | null
        }
        Update: Partial<Database['public']['Tables']['chat_sessions']['Row']>
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          user_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['chat_messages']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['chat_messages']['Row']>
      }
      document_embeddings: {
        Row: {
          id: string
          document_id: string
          embedding: number[]
          content: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['document_embeddings']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['document_embeddings']['Row']>
      }
      case_assignments: {
        Row: {
          id: string
          case_id: string
          user_id: string
          role: 'owner' | 'member' | 'viewer'
          status: 'active' | 'inactive'
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          case_id: string
          user_id: string
          role: 'owner' | 'member' | 'viewer'
          status?: 'active' | 'inactive'
          metadata?: Json
        }
        Update: Partial<Database['public']['Tables']['case_assignments']['Row']>
      }
      document_shares: {
        Row: {
          id: string
          document_id: string
          owner_id: string
          user_id: string
          permissions: Json
          status: 'active' | 'revoked'
          created_at: string
          updated_at: string
        }
        Insert: {
          document_id: string
          owner_id: string
          user_id: string
          permissions: Json
          status?: 'active' | 'revoked'
        }
        Update: Partial<Database['public']['Tables']['document_shares']['Row']>
      }
      cases: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: 'active' | 'pending' | 'in_progress' | 'pending_review' | 'completed' | 'approved' | 'rejected' | 'archived'
          current_stage: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          title: string
          description?: string | null
          status?: 'active' | 'pending' | 'in_progress' | 'pending_review' | 'completed' | 'approved' | 'rejected' | 'archived'
          current_stage?: string
          metadata?: Json
        }
        Update: Partial<Database['public']['Tables']['cases']['Row']>
      }
      case_timeline: {
        Row: {
          id: string
          case_id: string
          event_type: string
          description: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          case_id: string
          event_type: string
          description: string
          metadata?: Json | null
        }
        Update: Partial<Database['public']['Tables']['case_timeline']['Row']>
      }
    }
    Views: Record<string, never>
    Functions: {
      match_documents: {
        Args: {
          query_embedding: number[]
          match_threshold: number
          match_count: number
        }
        Returns: Array<{
          id: string
          content: string
          similarity: number
        }>
      }
    }
    Enums: Record<string, never>
  }
} 