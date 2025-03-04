export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat_sessions: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string | null
          is_archived: boolean
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title?: string | null
          is_archived?: boolean
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string | null
          is_archived?: boolean
          metadata?: Json | null
        }
      }
      chat_messages: {
        Row: {
          id: string
          created_at: string
          session_id: string
          role: 'user' | 'assistant'
          content: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          session_id: string
          role: 'user' | 'assistant'
          content: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          session_id?: string
          role?: 'user' | 'assistant'
          content?: string
          metadata?: Json | null
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          password_hash: string | null
          email_verified: boolean
          phone_number: string | null
          date_of_birth: string | null
          country: string | null
          language: string | null
          timezone: string | null
          created_at: string
          updated_at: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          password_hash?: string | null
          email_verified?: boolean
          phone_number?: string | null
          date_of_birth?: string | null
          country?: string | null
          language?: string | null
          timezone?: string | null
          created_at?: string
          updated_at?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          password_hash?: string | null
          email_verified?: boolean
          phone_number?: string | null
          date_of_birth?: string | null
          country?: string | null
          language?: string | null
          timezone?: string | null
          created_at?: string
          updated_at?: string
          metadata?: Json | null
        }
      }
      immigration_cases: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: string
          case_type: string
          current_stage: string
          requirements: Json
          created_at: string
          updated_at: string
          metadata: Json
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          status: string
          case_type: string
          current_stage?: string
          requirements?: Json
          created_at?: string
          updated_at?: string
          metadata?: Json
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: string
          case_type?: string
          current_stage?: string
          requirements?: Json
          created_at?: string
          updated_at?: string
          metadata?: Json
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          case_id: string | null
          title: string
          status: string
          created_at: string
          updated_at: string
          metadata: Json
        }
        Insert: {
          id?: string
          user_id: string
          case_id?: string | null
          title: string
          status?: string
          created_at?: string
          updated_at?: string
          metadata?: Json
        }
        Update: {
          id?: string
          user_id?: string
          case_id?: string | null
          title?: string
          status?: string
          created_at?: string
          updated_at?: string
          metadata?: Json
        }
      }
      participants: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          role: string
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          role: string
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          role?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          user_id: string | null
          role: string
          content: string
          metadata: Json
          created_at: string
          updated_at: string | null
          content_vector: unknown | null
          assistants_id: string | null
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id?: string | null
          role: string
          content: string
          metadata?: Json
          created_at?: string
          updated_at?: string | null
          content_vector?: unknown | null
          assistants_id?: string | null
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string | null
          role?: string
          content?: string
          metadata?: Json
          created_at?: string
          updated_at?: string | null
          content_vector?: unknown | null
          assistants_id?: string | null
        }
      }
      document_categories: {
        Row: {
          id: string
          name: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
        }
      }
      documents: {
        Row: {
          id: string
          case_id: string | null
          user_id: string
          category_id: string | null
          conversation_id: string | null
          title: string
          description: string | null
          file_path: string
          file_type: string
          file_size: number
          status: string
          is_template: boolean
          content: string | null
          content_vector: unknown | null
          created_at: string
          updated_at: string
          metadata: Json
        }
        Insert: {
          id?: string
          case_id?: string | null
          user_id: string
          category_id?: string | null
          conversation_id?: string | null
          title: string
          description?: string | null
          file_path: string
          file_type: string
          file_size: number
          status?: string
          is_template?: boolean
          content?: string | null
          content_vector?: unknown | null
          created_at?: string
          updated_at?: string
          metadata?: Json
        }
        Update: {
          id?: string
          case_id?: string | null
          user_id?: string
          category_id?: string | null
          conversation_id?: string | null
          title?: string
          description?: string | null
          file_path?: string
          file_type?: string
          file_size?: number
          status?: string
          is_template?: boolean
          content?: string | null
          content_vector?: unknown | null
          created_at?: string
          updated_at?: string
          metadata?: Json
        }
      }
      attachments: {
        Row: {
          id: string
          message_id: string
          file_path: string
          file_name: string
          file_type: string
          file_size: number
        }
        Insert: {
          id?: string
          message_id: string
          file_path: string
          file_name: string
          file_type: string
          file_size: number
        }
        Update: {
          id?: string
          message_id?: string
          file_path?: string
          file_name?: string
          file_type?: string
          file_size?: number
        }
      }
      research_sessions: {
        Row: {
          id: string
          user_id: string
          query: string
          status: string
          created_at: string
          completed_at: string | null
          metadata: Json
        }
        Insert: {
          id?: string
          user_id: string
          query: string
          status?: string
          created_at?: string
          completed_at?: string | null
          metadata?: Json
        }
        Update: {
          id?: string
          user_id?: string
          query?: string
          status?: string
          created_at?: string
          completed_at?: string | null
          metadata?: Json
        }
      }
      research_reports: {
        Row: {
          id: string
          title: string
          query: string
          summary: string
          created_at: string
          updated_at: string | null
          user_id: string | null
          metadata: Json
        }
        Insert: {
          id?: string
          title: string
          query: string
          summary: string
          created_at?: string
          updated_at?: string | null
          user_id?: string | null
          metadata?: Json
        }
        Update: {
          id?: string
          title?: string
          query?: string
          summary?: string
          created_at?: string
          updated_at?: string | null
          user_id?: string | null
          metadata?: Json
        }
      }
      research_sources: {
        Row: {
          id: string
          report_id: string
          url: string
          title: string | null
          relevance: number | null
          created_at: string
          description: string | null
        }
        Insert: {
          id?: string
          report_id: string
          url: string
          title?: string | null
          relevance?: number | null
          created_at?: string
          description?: string | null
        }
        Update: {
          id?: string
          report_id?: string
          url?: string
          title?: string | null
          relevance?: number | null
          created_at?: string
          description?: string | null
        }
      }
      research_findings: {
        Row: {
          id: string
          report_id: string
          content: string
          confidence: number | null
          source_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          content: string
          confidence?: number | null
          source_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          report_id?: string
          content?: string
          confidence?: number | null
          source_id?: string | null
          created_at?: string
        }
      }
      research_topics: {
        Row: {
          id: string
          name: string
          description: string | null
          embeddings: unknown | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          embeddings?: unknown | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          embeddings?: unknown | null
          created_at?: string
        }
      }
      research_analysis: {
        Row: {
          id: string
          report_id: string
          type: string
          content: string
          created_at: string
          metadata: Json
        }
        Insert: {
          id?: string
          report_id: string
          type: string
          content: string
          created_at?: string
          metadata?: Json
        }
        Update: {
          id?: string
          report_id?: string
          type?: string
          content?: string
          created_at?: string
          metadata?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_documents: {
        Args: {
          query_embedding: unknown
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          content: string
          similarity: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 