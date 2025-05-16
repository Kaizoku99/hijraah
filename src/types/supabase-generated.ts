export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          is_admin: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      agent_executions: {
        Row: {
          agent_id: string
          completed_at: string | null
          created_at: string | null
          error: string | null
          id: string
          input: Json
          metadata: Json | null
          output: Json | null
          started_at: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          agent_id: string
          completed_at?: string | null
          created_at?: string | null
          error?: string | null
          id?: string
          input: Json
          metadata?: Json | null
          output?: Json | null
          started_at?: string | null
          status: string
          user_id?: string | null
        }
        Update: {
          agent_id?: string
          completed_at?: string | null
          created_at?: string | null
          error?: string | null
          id?: string
          input?: Json
          metadata?: Json | null
          output?: Json | null
          started_at?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_executions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_feedback: {
        Row: {
          created_at: string | null
          execution_id: string
          feedback: string | null
          id: string
          rating: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          execution_id: string
          feedback?: string | null
          id?: string
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          execution_id?: string
          feedback?: string | null
          id?: string
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_feedback_execution_id_fkey"
            columns: ["execution_id"]
            isOneToOne: false
            referencedRelation: "agent_executions"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_memory: {
        Row: {
          agent_id: string
          created_at: string | null
          execution_id: string | null
          id: string
          key: string
          ttl: string | null
          value: Json
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          execution_id?: string | null
          id?: string
          key: string
          ttl?: string | null
          value: Json
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          execution_id?: string | null
          id?: string
          key?: string
          ttl?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "agent_memory_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_memory_execution_id_fkey"
            columns: ["execution_id"]
            isOneToOne: false
            referencedRelation: "agent_executions"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          capabilities: Json | null
          configuration: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          capabilities?: Json | null
          configuration?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          capabilities?: Json | null
          configuration?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_feedback: {
        Row: {
          category: string | null
          completion: string
          created_at: string | null
          id: string
          improvement_suggestion: string | null
          metadata: Json | null
          prompt: string
          rating: number | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          completion: string
          created_at?: string | null
          id?: string
          improvement_suggestion?: string | null
          metadata?: Json | null
          prompt: string
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          completion?: string
          created_at?: string | null
          id?: string
          improvement_suggestion?: string | null
          metadata?: Json | null
          prompt?: string
          rating?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      analysis_cache: {
        Row: {
          cache_key: string
          created_at: string
          expires_at: string
          id: number
          result: Json
        }
        Insert: {
          cache_key: string
          created_at?: string
          expires_at: string
          id?: number
          result: Json
        }
        Update: {
          cache_key?: string
          created_at?: string
          expires_at?: string
          id?: number
          result?: Json
        }
        Relationships: []
      }
      artifact_messages: {
        Row: {
          artifact_id: string
          created_at: string | null
          id: string
          message: string
          user_id: string
        }
        Insert: {
          artifact_id: string
          created_at?: string | null
          id?: string
          message: string
          user_id: string
        }
        Update: {
          artifact_id?: string
          created_at?: string | null
          id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "artifact_messages_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
        ]
      }
      artifacts: {
        Row: {
          content: Json
          created_at: string | null
          description: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          needs_embedding: boolean | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
          visibility: string
        }
        Insert: {
          content?: Json
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          needs_embedding?: boolean | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
          visibility?: string
        }
        Update: {
          content?: Json
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          needs_embedding?: boolean | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
          visibility?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cases: {
        Row: {
          assignments: Json | null
          case_type: string | null
          created_at: string | null
          id: string
          status: Database["public"]["Enums"]["case_status"] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assignments?: Json | null
          case_type?: string | null
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["case_status"] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assignments?: Json | null
          case_type?: string | null
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["case_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chat_attachments: {
        Row: {
          chat_id: string
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          chat_id: string
          created_at?: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          chat_id?: string
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_attachments_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          created_at: string
          filters: Json | null
          id: string
          is_archived: boolean | null
          metadata: Json | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          filters?: Json | null
          id?: string
          is_archived?: boolean | null
          metadata?: Json | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          filters?: Json | null
          id?: string
          is_archived?: boolean | null
          metadata?: Json | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          role: string
          session_id: string
          sources: Json | null
          tokens: number | null
          tool_calls: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          role: string
          session_id: string
          sources?: Json | null
          tokens?: number | null
          tool_calls?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
          session_id?: string
          sources?: Json | null
          tokens?: number | null
          tool_calls?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          agent_config: Json | null
          context: string | null
          id: string
          last_message_at: string | null
          model: string | null
          prompt: string | null
          system_prompt: string | null
          user_id: string
          visibility: string
        }
        Insert: {
          agent_config?: Json | null
          context?: string | null
          id: string
          last_message_at?: string | null
          model?: string | null
          prompt?: string | null
          system_prompt?: string | null
          user_id: string
          visibility?: string
        }
        Update: {
          agent_config?: Json | null
          context?: string | null
          id?: string
          last_message_at?: string | null
          model?: string | null
          prompt?: string | null
          system_prompt?: string | null
          user_id?: string
          visibility?: string
        }
        Relationships: []
      }
      deep_research_findings: {
        Row: {
          content: string
          created_at: string | null
          depth: number | null
          id: string
          metadata: Json | null
          session_id: string
          type: string
        }
        Insert: {
          content: string
          created_at?: string | null
          depth?: number | null
          id?: string
          metadata?: Json | null
          session_id: string
          type: string
        }
        Update: {
          content?: string
          created_at?: string | null
          depth?: number | null
          id?: string
          metadata?: Json | null
          session_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "deep_research_findings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "deep_research_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deep_research_findings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "recent_deep_research_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      deep_research_sessions: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          query: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          query: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          query?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      deep_research_sources: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          relevance: number | null
          session_id: string
          title: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          relevance?: number | null
          session_id: string
          title: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          relevance?: number | null
          session_id?: string
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "deep_research_sources_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "deep_research_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deep_research_sources_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "recent_deep_research_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      document_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      document_chunks: {
        Row: {
          chunk_index: number
          created_at: string | null
          document_id: string
          embedding: string | null
          id: string
          text_content: string
          token_count: number | null
        }
        Insert: {
          chunk_index: number
          created_at?: string | null
          document_id: string
          embedding?: string | null
          id?: string
          text_content: string
          token_count?: number | null
        }
        Update: {
          chunk_index?: number
          created_at?: string | null
          document_id?: string
          embedding?: string | null
          id?: string
          text_content?: string
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "document_chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          classification: Json | null
          created_at: string | null
          file_path: string
          file_size: number | null
          file_type: string | null
          filename: string
          id: string
          metadata: Json | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          classification?: Json | null
          created_at?: string | null
          file_path: string
          file_size?: number | null
          file_type?: string | null
          filename: string
          id?: string
          metadata?: Json | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          classification?: Json | null
          created_at?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          filename?: string
          id?: string
          metadata?: Json | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          chat_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          chat_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          chat_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      fine_tuning_jobs: {
        Row: {
          base_model: string
          created_at: string | null
          created_by: string | null
          error_message: string | null
          finished_at: string | null
          hyper_parameters: Json | null
          id: string
          model_name: string
          result: Json | null
          status: string
          training_file_id: string | null
          updated_at: string | null
          validation_file_id: string | null
        }
        Insert: {
          base_model: string
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          finished_at?: string | null
          hyper_parameters?: Json | null
          id?: string
          model_name: string
          result?: Json | null
          status: string
          training_file_id?: string | null
          updated_at?: string | null
          validation_file_id?: string | null
        }
        Update: {
          base_model?: string
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          finished_at?: string | null
          hyper_parameters?: Json | null
          id?: string
          model_name?: string
          result?: Json | null
          status?: string
          training_file_id?: string | null
          updated_at?: string | null
          validation_file_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link_url: string | null
          message: string
          metadata: Json | null
          notification_type:
            | Database["public"]["Enums"]["notification_type"]
            | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link_url?: string | null
          message: string
          metadata?: Json | null
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link_url?: string | null
          message?: string
          metadata?: Json | null
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null
          user_id?: string
        }
        Relationships: []
      }
      onboarding_actions: {
        Row: {
          action_key: string
          completed_at: string
          id: string
          user_id: string
        }
        Insert: {
          action_key: string
          completed_at?: string
          id?: string
          user_id: string
        }
        Update: {
          action_key?: string
          completed_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country_of_interest: string | null
          country_of_residence: string | null
          created_at: string | null
          first_name: string | null
          id: string
          immigration_goals: string | null
          is_admin: boolean | null
          language: string | null
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          timezone: string | null
          updated_at: string | null
          visa_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country_of_interest?: string | null
          country_of_residence?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          immigration_goals?: string | null
          is_admin?: boolean | null
          language?: string | null
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          timezone?: string | null
          updated_at?: string | null
          visa_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country_of_interest?: string | null
          country_of_residence?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          immigration_goals?: string | null
          is_admin?: boolean | null
          language?: string | null
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          timezone?: string | null
          updated_at?: string | null
          visa_type?: string | null
        }
        Relationships: []
      }
      rate_limit_rules: {
        Row: {
          description: string | null
          enabled: boolean | null
          id: string
          key: string
          max_requests: number
          window_seconds: number
        }
        Insert: {
          description?: string | null
          enabled?: boolean | null
          id?: string
          key: string
          max_requests: number
          window_seconds: number
        }
        Update: {
          description?: string | null
          enabled?: boolean | null
          id?: string
          key?: string
          max_requests?: number
          window_seconds?: number
        }
        Relationships: []
      }
      rate_limit_tracker: {
        Row: {
          id: number
          identifier: string
          rule_key: string
          timestamp: string
        }
        Insert: {
          id?: number
          identifier: string
          rule_key: string
          timestamp?: string
        }
        Update: {
          id?: number
          identifier?: string
          rule_key?: string
          timestamp?: string
        }
        Relationships: []
      }
      research_analysis: {
        Row: {
          created_at: string | null
          gaps: Json | null
          id: string
          key_findings: Json | null
          metadata: Json | null
          next_steps: Json | null
          session_id: string
          summary: string
        }
        Insert: {
          created_at?: string | null
          gaps?: Json | null
          id?: string
          key_findings?: Json | null
          metadata?: Json | null
          next_steps?: Json | null
          session_id: string
          summary: string
        }
        Update: {
          created_at?: string | null
          gaps?: Json | null
          id?: string
          key_findings?: Json | null
          metadata?: Json | null
          next_steps?: Json | null
          session_id?: string
          summary?: string
        }
        Relationships: [
          {
            foreignKeyName: "research_analysis_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "research_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      research_findings: {
        Row: {
          category: string | null
          confidence: number | null
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          session_id: string
          source_id: string | null
        }
        Insert: {
          category?: string | null
          confidence?: number | null
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          session_id: string
          source_id?: string | null
        }
        Update: {
          category?: string | null
          confidence?: number | null
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          session_id?: string
          source_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "research_findings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "research_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "research_findings_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "research_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      research_reports: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          session_id: string
          summary: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          session_id: string
          summary?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          session_id?: string
          summary?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "research_reports_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "research_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      research_sessions: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          query: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          query: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          query?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      research_sources: {
        Row: {
          content: string | null
          created_at: string | null
          credibility_score: number | null
          description: string | null
          id: string
          metadata: Json | null
          relevance: number | null
          session_id: string
          title: string | null
          url: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          credibility_score?: number | null
          description?: string | null
          id?: string
          metadata?: Json | null
          relevance?: number | null
          session_id: string
          title?: string | null
          url: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          credibility_score?: number | null
          description?: string | null
          id?: string
          metadata?: Json | null
          relevance?: number | null
          session_id?: string
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "research_sources_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "research_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      research_topics: {
        Row: {
          created_at: string | null
          findings: Json | null
          id: string
          metadata: Json | null
          name: string
          relevance: number | null
          session_id: string
        }
        Insert: {
          created_at?: string | null
          findings?: Json | null
          id?: string
          metadata?: Json | null
          name: string
          relevance?: number | null
          session_id: string
        }
        Update: {
          created_at?: string | null
          findings?: Json | null
          id?: string
          metadata?: Json | null
          name?: string
          relevance?: number | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "research_topics_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "research_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmaps: {
        Row: {
          case_id: string
          completion_percentage: number
          created_at: string
          description: string | null
          estimated_end_date: string | null
          id: string
          last_updated: string
          metadata: Json | null
          phases: Json
          start_date: string | null
          target_end_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          case_id: string
          completion_percentage?: number
          created_at?: string
          description?: string | null
          estimated_end_date?: string | null
          id?: string
          last_updated?: string
          metadata?: Json | null
          phases?: Json
          start_date?: string | null
          target_end_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          case_id?: string
          completion_percentage?: number
          created_at?: string
          description?: string | null
          estimated_end_date?: string | null
          id?: string
          last_updated?: string
          metadata?: Json | null
          phases?: Json
          start_date?: string | null
          target_end_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roadmaps_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      scrape_configurations: {
        Row: {
          base_url: string
          country_code: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          schedule: string | null
          selectors: Json
          source_type: string
          updated_at: string | null
        }
        Insert: {
          base_url: string
          country_code?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          schedule?: string | null
          selectors: Json
          source_type: string
          updated_at?: string | null
        }
        Update: {
          base_url?: string
          country_code?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          schedule?: string | null
          selectors?: Json
          source_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      scrape_history: {
        Row: {
          artifact_id: string | null
          change_summary: string | null
          content_hash: string | null
          error_message: string | null
          has_changes: boolean | null
          id: string
          scraped_at: string | null
          source_id: string
          status: string
        }
        Insert: {
          artifact_id?: string | null
          change_summary?: string | null
          content_hash?: string | null
          error_message?: string | null
          has_changes?: boolean | null
          id?: string
          scraped_at?: string | null
          source_id: string
          status: string
        }
        Update: {
          artifact_id?: string | null
          change_summary?: string | null
          content_hash?: string | null
          error_message?: string | null
          has_changes?: boolean | null
          id?: string
          scraped_at?: string | null
          source_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "scrape_history_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scrape_history_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "scraping_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      scraped_sources: {
        Row: {
          autorag_indexed: boolean | null
          content_hash: string | null
          country_code: string | null
          created_at: string | null
          id: string
          last_scraped_at: string | null
          metadata: Json | null
          r2_object_key: string | null
          source_type: string
          title: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          autorag_indexed?: boolean | null
          content_hash?: string | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          last_scraped_at?: string | null
          metadata?: Json | null
          r2_object_key?: string | null
          source_type: string
          title?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          autorag_indexed?: boolean | null
          content_hash?: string | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          last_scraped_at?: string | null
          metadata?: Json | null
          r2_object_key?: string | null
          source_type?: string
          title?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      scraping_logs: {
        Row: {
          created_at: string
          id: string
          message: string | null
          status_code: number | null
          triggered_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          status_code?: number | null
          triggered_at: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          status_code?: number | null
          triggered_at?: string
        }
        Relationships: []
      }
      scraping_sources: {
        Row: {
          category: Database["public"]["Enums"]["source_category"]
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          last_scraped: string | null
          name: string
          scrape_frequency: unknown | null
          trust_score: number
          updated_at: string | null
          url: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["source_category"]
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_scraped?: string | null
          name: string
          scrape_frequency?: unknown | null
          trust_score?: number
          updated_at?: string | null
          url: string
        }
        Update: {
          category?: Database["public"]["Enums"]["source_category"]
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_scraped?: string | null
          name?: string
          scrape_frequency?: unknown | null
          trust_score?: number
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      source_validations: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          score: number
          source_id: string
          validator_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          score: number
          source_id: string
          validator_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          score?: number
          source_id?: string
          validator_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "source_validations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "scraping_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      system_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          level: string
          message: string | null
          metadata: Json | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          level?: string
          message?: string | null
          metadata?: Json | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          level?: string
          message?: string | null
          metadata?: Json | null
        }
        Relationships: []
      }
      user_activity_log: {
        Row: {
          activity_type: string
          created_at: string | null
          id: number
          metadata: Json | null
          resource_id: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          id?: number
          metadata?: Json | null
          resource_id?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          id?: number
          metadata?: Json | null
          resource_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_interests: {
        Row: {
          interest_tag: string
          last_updated: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          interest_tag: string
          last_updated?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          interest_tag?: string
          last_updated?: string | null
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_onboarding: {
        Row: {
          created_at: string
          current_step: string
          hide_for_session: boolean
          id: string
          is_active: boolean
          is_completed: boolean
          progress: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_step?: string
          hide_for_session?: boolean
          id?: string
          is_active?: boolean
          is_completed?: boolean
          progress?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_step?: string
          hide_for_session?: boolean
          id?: string
          is_active?: boolean
          is_completed?: boolean
          progress?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          email_frequency: string
          font_size: string
          notifications_enabled: boolean
          sidebar_collapsed: boolean
          theme: string
          timezone: string | null
          ui_density: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_frequency?: string
          font_size?: string
          notifications_enabled?: boolean
          sidebar_collapsed?: boolean
          theme?: string
          timezone?: string | null
          ui_density?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_frequency?: string
          font_size?: string
          notifications_enabled?: boolean
          sidebar_collapsed?: boolean
          theme?: string
          timezone?: string | null
          ui_density?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      recent_deep_research_sessions: {
        Row: {
          created_at: string | null
          finding_count: number | null
          id: string | null
          query: string | null
          source_count: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          finding_count?: never
          id?: string | null
          query?: string | null
          source_count?: never
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          finding_count?: never
          id?: string | null
          query?: string | null
          source_count?: never
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_rate_limit: {
        Args: { p_rule_key: string; p_identifier: string }
        Returns: boolean
      }
      complete_deep_research_session: {
        Args: { p_session_id: string; p_final_answer: string }
        Returns: undefined
      }
      complete_research_session: {
        Args: {
          p_session_id: string
          p_summary?: string
          p_key_findings?: Json
          p_gaps?: Json
          p_next_steps?: Json
        }
        Returns: undefined
      }
      create_admin_users_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      fail_deep_research_session: {
        Args: { p_session_id: string; p_error_message: string }
        Returns: undefined
      }
      fail_research_session: {
        Args: { p_session_id: string; p_error_message: string }
        Returns: undefined
      }
      get_user_shard: {
        Args: { p_user_id: string }
        Returns: number
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_action: {
        Args: {
          p_action: string
          p_details?: Json
          p_resource_type?: string
          p_resource_id?: string
        }
        Returns: undefined
      }
      log_user_activity: {
        Args: {
          p_activity_type: string
          p_resource_id?: string
          p_metadata?: Json
        }
        Returns: undefined
      }
      mark_onboarding_action_completed: {
        Args: { action_key: string }
        Returns: undefined
      }
      match_artifacts: {
        Args: {
          query_embedding: string
          match_threshold?: number
          match_count?: number
          filter_visibility?: string
        }
        Returns: {
          id: string
          title: string
          content: Json
          type: string
          visibility: string
          similarity: number
        }[]
      }
      match_document_chunks: {
        Args: {
          query_embedding: string
          match_threshold?: number
          match_count?: number
          p_user_id?: string
        }
        Returns: {
          id: string
          document_id: string
          text_content: string
          similarity: number
        }[]
      }
      reset_user_onboarding: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      skip_user_onboarding: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      start_research_session: {
        Args: { p_user_id: string; p_query: string }
        Returns: string
      }
      trigger_scraping: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      trigger_scraping_if_sources_exist: {
        Args: { frequency_filter: string }
        Returns: undefined
      }
    }
    Enums: {
      case_status:
        | "draft"
        | "submitted"
        | "in_review"
        | "approved"
        | "rejected"
        | "completed"
      document_status: "pending" | "verified" | "rejected"
      notification_type:
        | "system"
        | "case_update"
        | "document_request"
        | "message"
      session_status: "active" | "completed" | "archived"
      session_type: "chat" | "research" | "case"
      source_category:
        | "government"
        | "legal"
        | "news"
        | "blog"
        | "forum"
        | "other"
      user_role: "user" | "admin" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      case_status: [
        "draft",
        "submitted",
        "in_review",
        "approved",
        "rejected",
        "completed",
      ],
      document_status: ["pending", "verified", "rejected"],
      notification_type: [
        "system",
        "case_update",
        "document_request",
        "message",
      ],
      session_status: ["active", "completed", "archived"],
      session_type: ["chat", "research", "case"],
      source_category: [
        "government",
        "legal",
        "news",
        "blog",
        "forum",
        "other",
      ],
      user_role: ["user", "admin", "client"],
    },
  },
} as const

