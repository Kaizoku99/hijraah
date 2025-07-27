export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null;
          id: string;
          is_admin: boolean | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_admin?: boolean | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_admin?: boolean | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      api_config: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          is_active: boolean | null;
          path: string;
          target_table: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          is_active?: boolean | null;
          path: string;
          target_table: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          is_active?: boolean | null;
          path?: string;
          target_table?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      cases: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          metadata: Json | null;
          status: Database["public"]["Enums"]["case_status"];
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          metadata?: Json | null;
          status?: Database["public"]["Enums"]["case_status"];
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          metadata?: Json | null;
          status?: Database["public"]["Enums"]["case_status"];
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      Chat: {
        Row: {
          createdAt: string;
          id: string;
          title: string;
          userId: string;
          visibility: string;
        };
        Insert: {
          createdAt: string;
          id?: string;
          title: string;
          userId: string;
          visibility?: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          title?: string;
          userId?: string;
          visibility?: string;
        };
        Relationships: [];
      };
      chat_attachments: {
        Row: {
          chat_id: string;
          created_at: string;
          file_name: string;
          file_path: string;
          file_size: number;
          file_type: string;
          id: string;
          message_id: string;
          user_id: string;
        };
        Insert: {
          chat_id: string;
          created_at?: string;
          file_name: string;
          file_path: string;
          file_size: number;
          file_type: string;
          id?: string;
          message_id: string;
          user_id: string;
        };
        Update: {
          chat_id?: string;
          created_at?: string;
          file_name?: string;
          file_path?: string;
          file_size?: number;
          file_type?: string;
          id?: string;
          message_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_attachments_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chat_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_attachments_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chat_sessions_camel";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_attachments_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_attachments_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "chat_messages_camel";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_message_votes: {
        Row: {
          created_at: string | null;
          createdAt: string | null;
          is_upvoted: boolean;
          isUpvoted: boolean | null;
          message_id: string;
          messageId: string | null;
          user_id: string;
          userId: string | null;
        };
        Insert: {
          created_at?: string | null;
          createdAt?: string | null;
          is_upvoted?: boolean;
          isUpvoted?: boolean | null;
          message_id: string;
          messageId?: string | null;
          user_id: string;
          userId?: string | null;
        };
        Update: {
          created_at?: string | null;
          createdAt?: string | null;
          is_upvoted?: boolean;
          isUpvoted?: boolean | null;
          message_id?: string;
          messageId?: string | null;
          user_id?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chat_message_votes_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_message_votes_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "chat_messages_camel";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_messages: {
        Row: {
          content: string;
          created_at: string;
          createdAt: string | null;
          id: string;
          metadata: Json | null;
          role: string;
          session_id: string;
          sessionId: string | null;
          sources: Json | null;
          tokens: number | null;
          tool_calls: Json | null;
          toolCalls: Json | null;
          updated_at: string;
          updatedAt: string | null;
          user_id: string | null;
          userId: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          createdAt?: string | null;
          id?: string;
          metadata?: Json | null;
          role: string;
          session_id: string;
          sessionId?: string | null;
          sources?: Json | null;
          tokens?: number | null;
          tool_calls?: Json | null;
          toolCalls?: Json | null;
          updated_at?: string;
          updatedAt?: string | null;
          user_id?: string | null;
          userId?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          createdAt?: string | null;
          id?: string;
          metadata?: Json | null;
          role?: string;
          session_id?: string;
          sessionId?: string | null;
          sources?: Json | null;
          tokens?: number | null;
          tool_calls?: Json | null;
          toolCalls?: Json | null;
          updated_at?: string;
          updatedAt?: string | null;
          user_id?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "chat_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_messages_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "chat_sessions_camel";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_sessions: {
        Row: {
          agent_config: Json | null;
          agentConfig: Json | null;
          case_id: string | null;
          caseId: string | null;
          context: string | null;
          created_at: string | null;
          createdAt: string | null;
          id: string;
          last_message_at: string | null;
          lastMessageAt: string | null;
          metadata: Json | null;
          model: string | null;
          prompt: string | null;
          system_prompt: string | null;
          systemPrompt: string | null;
          title: string | null;
          updated_at: string | null;
          updatedAt: string | null;
          user_id: string;
          userId: string | null;
          visibility: string;
        };
        Insert: {
          agent_config?: Json | null;
          agentConfig?: Json | null;
          case_id?: string | null;
          caseId?: string | null;
          context?: string | null;
          created_at?: string | null;
          createdAt?: string | null;
          id?: string;
          last_message_at?: string | null;
          lastMessageAt?: string | null;
          metadata?: Json | null;
          model?: string | null;
          prompt?: string | null;
          system_prompt?: string | null;
          systemPrompt?: string | null;
          title?: string | null;
          updated_at?: string | null;
          updatedAt?: string | null;
          user_id: string;
          userId?: string | null;
          visibility?: string;
        };
        Update: {
          agent_config?: Json | null;
          agentConfig?: Json | null;
          case_id?: string | null;
          caseId?: string | null;
          context?: string | null;
          created_at?: string | null;
          createdAt?: string | null;
          id?: string;
          last_message_at?: string | null;
          lastMessageAt?: string | null;
          metadata?: Json | null;
          model?: string | null;
          prompt?: string | null;
          system_prompt?: string | null;
          systemPrompt?: string | null;
          title?: string | null;
          updated_at?: string | null;
          updatedAt?: string | null;
          user_id?: string;
          userId?: string | null;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_sessions_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
        ];
      };
      deep_research_findings: {
        Row: {
          content: string;
          created_at: string | null;
          depth: number | null;
          id: string;
          metadata: Json | null;
          session_id: string;
          type: string;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          depth?: number | null;
          id?: string;
          metadata?: Json | null;
          session_id: string;
          type: string;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          depth?: number | null;
          id?: string;
          metadata?: Json | null;
          session_id?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "deep_research_findings_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "deep_research_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      deep_research_sessions: {
        Row: {
          created_at: string | null;
          id: string;
          metadata: Json | null;
          query: string;
          status: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          query: string;
          status?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          query?: string;
          status?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      deep_research_sources: {
        Row: {
          created_at: string | null;
          id: string;
          metadata: Json | null;
          relevance: number | null;
          session_id: string;
          title: string;
          url: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          relevance?: number | null;
          session_id: string;
          title: string;
          url: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          relevance?: number | null;
          session_id?: string;
          title?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "deep_research_sources_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "deep_research_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      document_categories: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      document_chat_session_links: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          document_id: string;
          id: string;
          session_id: string;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          document_id: string;
          id?: string;
          session_id: string;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          document_id?: string;
          id?: string;
          session_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "document_chat_session_links_document_id_fkey";
            columns: ["document_id"];
            isOneToOne: false;
            referencedRelation: "documents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "document_chat_session_links_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "chat_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "document_chat_session_links_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "chat_sessions_camel";
            referencedColumns: ["id"];
          },
        ];
      };
      document_chunks: {
        Row: {
          chunk_index: number;
          created_at: string | null;
          document_id: string;
          embedding: string | null;
          id: string;
          text_content: string;
          token_count: number | null;
        };
        Insert: {
          chunk_index: number;
          created_at?: string | null;
          document_id: string;
          embedding?: string | null;
          id?: string;
          text_content: string;
          token_count?: number | null;
        };
        Update: {
          chunk_index?: number;
          created_at?: string | null;
          document_id?: string;
          embedding?: string | null;
          id?: string;
          text_content?: string;
          token_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "document_chunks_document_id_fkey";
            columns: ["document_id"];
            isOneToOne: false;
            referencedRelation: "documents";
            referencedColumns: ["id"];
          },
        ];
      };
      document_chunks_enhanced: {
        Row: {
          chunk_index: number;
          chunk_metadata: Json | null;
          created_at: string | null;
          document_id: string;
          embedding: string | null;
          entities: Json | null;
          id: string;
          key_phrases: Json | null;
          language: string | null;
          text_content: string;
          token_count: number | null;
        };
        Insert: {
          chunk_index: number;
          chunk_metadata?: Json | null;
          created_at?: string | null;
          document_id: string;
          embedding?: string | null;
          entities?: Json | null;
          id?: string;
          key_phrases?: Json | null;
          language?: string | null;
          text_content: string;
          token_count?: number | null;
        };
        Update: {
          chunk_index?: number;
          chunk_metadata?: Json | null;
          created_at?: string | null;
          document_id?: string;
          embedding?: string | null;
          entities?: Json | null;
          id?: string;
          key_phrases?: Json | null;
          language?: string | null;
          text_content?: string;
          token_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "document_chunks_enhanced_document_id_fkey";
            columns: ["document_id"];
            isOneToOne: false;
            referencedRelation: "documents";
            referencedColumns: ["id"];
          },
        ];
      };
      documents: {
        Row: {
          classification: Json | null;
          content: string | null;
          created_at: string | null;
          file_path: string;
          file_size: number | null;
          file_type: string | null;
          filename: string;
          id: string;
          metadata: Json | null;
          status: string;
          text: string;
          title: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          classification?: Json | null;
          content?: string | null;
          created_at?: string | null;
          file_path: string;
          file_size?: number | null;
          file_type?: string | null;
          filename: string;
          id?: string;
          metadata?: Json | null;
          status?: string;
          text?: string;
          title: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          classification?: Json | null;
          content?: string | null;
          created_at?: string | null;
          file_path?: string;
          file_size?: number | null;
          file_type?: string | null;
          filename?: string;
          id?: string;
          metadata?: Json | null;
          status?: string;
          text?: string;
          title?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      feedback: {
        Row: {
          chat_id: string | null;
          comment: string | null;
          created_at: string | null;
          id: string;
          metadata: Json | null;
          rating: number | null;
          user_id: string | null;
        };
        Insert: {
          chat_id?: string | null;
          comment?: string | null;
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          rating?: number | null;
          user_id?: string | null;
        };
        Update: {
          chat_id?: string | null;
          comment?: string | null;
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          rating?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chat_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "feedback_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chat_sessions_camel";
            referencedColumns: ["id"];
          },
        ];
      };
      image_embeddings: {
        Row: {
          created_at: string | null;
          embedding: string | null;
          id: string;
          image_url: string;
          metadata: Json | null;
        };
        Insert: {
          created_at?: string | null;
          embedding?: string | null;
          id?: string;
          image_url: string;
          metadata?: Json | null;
        };
        Update: {
          created_at?: string | null;
          embedding?: string | null;
          id?: string;
          image_url?: string;
          metadata?: Json | null;
        };
        Relationships: [];
      };
      kg_entities: {
        Row: {
          confidence_score: number | null;
          created_at: string | null;
          display_name: string | null;
          embedding: string | null;
          entity_name: string;
          entity_type: string;
          id: string;
          is_active: boolean | null;
          properties: Json | null;
          source_references: Json | null;
          updated_at: string | null;
        };
        Insert: {
          confidence_score?: number | null;
          created_at?: string | null;
          display_name?: string | null;
          embedding?: string | null;
          entity_name: string;
          entity_type: string;
          id?: string;
          is_active?: boolean | null;
          properties?: Json | null;
          source_references?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          confidence_score?: number | null;
          created_at?: string | null;
          display_name?: string | null;
          embedding?: string | null;
          entity_name?: string;
          entity_type?: string;
          id?: string;
          is_active?: boolean | null;
          properties?: Json | null;
          source_references?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      kg_relationships: {
        Row: {
          created_at: string | null;
          id: string;
          properties: Json | null;
          relationship_type: string;
          source_entity_id: string;
          source_references: Json | null;
          strength: number | null;
          target_entity_id: string;
          temporal_validity: Json | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          properties?: Json | null;
          relationship_type: string;
          source_entity_id: string;
          source_references?: Json | null;
          strength?: number | null;
          target_entity_id: string;
          temporal_validity?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          properties?: Json | null;
          relationship_type?: string;
          source_entity_id?: string;
          source_references?: Json | null;
          strength?: number | null;
          target_entity_id?: string;
          temporal_validity?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "kg_relationships_source_entity_id_fkey";
            columns: ["source_entity_id"];
            isOneToOne: false;
            referencedRelation: "kg_entities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kg_relationships_target_entity_id_fkey";
            columns: ["target_entity_id"];
            isOneToOne: false;
            referencedRelation: "kg_entities";
            referencedColumns: ["id"];
          },
        ];
      };
      Message: {
        Row: {
          attachments: Json;
          chatId: string;
          createdAt: string;
          id: string;
          parts: Json;
          role: string;
        };
        Insert: {
          attachments: Json;
          chatId: string;
          createdAt: string;
          id?: string;
          parts: Json;
          role: string;
        };
        Update: {
          attachments?: Json;
          chatId?: string;
          createdAt?: string;
          id?: string;
          parts?: Json;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Message_chatId_fkey";
            columns: ["chatId"];
            isOneToOne: false;
            referencedRelation: "Chat";
            referencedColumns: ["id"];
          },
        ];
      };
      Message_v2: {
        Row: {
          attachments: Json;
          chatId: string;
          createdAt: string;
          id: string;
          parts: Json;
          role: string;
        };
        Insert: {
          attachments: Json;
          chatId: string;
          createdAt: string;
          id?: string;
          parts: Json;
          role: string;
        };
        Update: {
          attachments?: Json;
          chatId?: string;
          createdAt?: string;
          id?: string;
          parts?: Json;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Message_v2_chatId_fkey";
            columns: ["chatId"];
            isOneToOne: false;
            referencedRelation: "Chat";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          created_at: string;
          id: string;
          is_read: boolean;
          link_url: string | null;
          message: string;
          metadata: Json | null;
          notification_type:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          link_url?: string | null;
          message: string;
          metadata?: Json | null;
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          link_url?: string | null;
          message?: string;
          metadata?: Json | null;
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          user_id?: string;
        };
        Relationships: [];
      };
      onboarding_actions: {
        Row: {
          action_key: string;
          completed_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          action_key: string;
          completed_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          action_key?: string;
          completed_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      policy_timeline: {
        Row: {
          changes: Json | null;
          country_code: string | null;
          created_at: string | null;
          description: string | null;
          effective_date: string;
          entity_id: string | null;
          expiry_date: string | null;
          id: string;
          policy_type: string;
          scraped_at: string | null;
          source_url: string | null;
        };
        Insert: {
          changes?: Json | null;
          country_code?: string | null;
          created_at?: string | null;
          description?: string | null;
          effective_date: string;
          entity_id?: string | null;
          expiry_date?: string | null;
          id?: string;
          policy_type: string;
          scraped_at?: string | null;
          source_url?: string | null;
        };
        Update: {
          changes?: Json | null;
          country_code?: string | null;
          created_at?: string | null;
          description?: string | null;
          effective_date?: string;
          entity_id?: string | null;
          expiry_date?: string | null;
          id?: string;
          policy_type?: string;
          scraped_at?: string | null;
          source_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "policy_timeline_entity_id_fkey";
            columns: ["entity_id"];
            isOneToOne: false;
            referencedRelation: "kg_entities";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          country_of_interest: string | null;
          country_of_residence: string | null;
          created_at: string | null;
          first_name: string | null;
          id: string;
          immigration_goals: string | null;
          is_admin: boolean | null;
          language: string | null;
          last_name: string | null;
          role: Database["public"]["Enums"]["user_role"] | null;
          timezone: string | null;
          updated_at: string | null;
          visa_type: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          country_of_interest?: string | null;
          country_of_residence?: string | null;
          created_at?: string | null;
          first_name?: string | null;
          id: string;
          immigration_goals?: string | null;
          is_admin?: boolean | null;
          language?: string | null;
          last_name?: string | null;
          role?: Database["public"]["Enums"]["user_role"] | null;
          timezone?: string | null;
          updated_at?: string | null;
          visa_type?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          country_of_interest?: string | null;
          country_of_residence?: string | null;
          created_at?: string | null;
          first_name?: string | null;
          id?: string;
          immigration_goals?: string | null;
          is_admin?: boolean | null;
          language?: string | null;
          last_name?: string | null;
          role?: Database["public"]["Enums"]["user_role"] | null;
          timezone?: string | null;
          updated_at?: string | null;
          visa_type?: string | null;
        };
        Relationships: [];
      };
      rag_cache_meta: {
        Row: {
          id: string;
          last_purged_at: string | null;
        };
        Insert: {
          id: string;
          last_purged_at?: string | null;
        };
        Update: {
          id?: string;
          last_purged_at?: string | null;
        };
        Relationships: [];
      };
      rag_query_cache: {
        Row: {
          created_at: string | null;
          expires_at: string | null;
          hit_count: number | null;
          id: string;
          kg_entities: Json;
          query_embedding: string | null;
          query_hash: string;
          query_text: string;
          response_metadata: Json | null;
          retrieved_chunks: Json;
        };
        Insert: {
          created_at?: string | null;
          expires_at?: string | null;
          hit_count?: number | null;
          id?: string;
          kg_entities: Json;
          query_embedding?: string | null;
          query_hash: string;
          query_text: string;
          response_metadata?: Json | null;
          retrieved_chunks: Json;
        };
        Update: {
          created_at?: string | null;
          expires_at?: string | null;
          hit_count?: number | null;
          id?: string;
          kg_entities?: Json;
          query_embedding?: string | null;
          query_hash?: string;
          query_text?: string;
          response_metadata?: Json | null;
          retrieved_chunks?: Json;
        };
        Relationships: [];
      };
      research_findings: {
        Row: {
          category: string | null;
          confidence: number | null;
          content: string;
          created_at: string | null;
          id: string;
          metadata: Json | null;
          session_id: string;
          source_id: string | null;
        };
        Insert: {
          category?: string | null;
          confidence?: number | null;
          content: string;
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          session_id: string;
          source_id?: string | null;
        };
        Update: {
          category?: string | null;
          confidence?: number | null;
          content?: string;
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          session_id?: string;
          source_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "research_findings_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "recent_research_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "research_findings_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "research_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "research_findings_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: false;
            referencedRelation: "research_sources";
            referencedColumns: ["id"];
          },
        ];
      };
      research_reports: {
        Row: {
          content: string | null;
          created_at: string | null;
          id: string;
          metadata: Json | null;
          session_id: string;
          summary: string | null;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          session_id: string;
          summary?: string | null;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          session_id?: string;
          summary?: string | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "research_reports_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "recent_research_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "research_reports_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "research_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      research_sessions: {
        Row: {
          created_at: string | null;
          id: string;
          metadata: Json | null;
          query: string;
          status: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          query: string;
          status?: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          query?: string;
          status?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      research_sources: {
        Row: {
          content: string | null;
          created_at: string | null;
          credibility_score: number | null;
          description: string | null;
          id: string;
          metadata: Json | null;
          relevance: number | null;
          session_id: string;
          title: string | null;
          url: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          credibility_score?: number | null;
          description?: string | null;
          id?: string;
          metadata?: Json | null;
          relevance?: number | null;
          session_id: string;
          title?: string | null;
          url: string;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          credibility_score?: number | null;
          description?: string | null;
          id?: string;
          metadata?: Json | null;
          relevance?: number | null;
          session_id?: string;
          title?: string | null;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "research_sources_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "recent_research_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "research_sources_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "research_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      scrape_configurations: {
        Row: {
          base_url: string;
          country_code: string | null;
          created_at: string | null;
          extraction_schema: Json | null;
          firecrawl_params: Json | null;
          id: string;
          is_active: boolean | null;
          name: string;
          schedule: string | null;
          source_type: string;
          updated_at: string | null;
        };
        Insert: {
          base_url: string;
          country_code?: string | null;
          created_at?: string | null;
          extraction_schema?: Json | null;
          firecrawl_params?: Json | null;
          id?: string;
          is_active?: boolean | null;
          name: string;
          schedule?: string | null;
          source_type: string;
          updated_at?: string | null;
        };
        Update: {
          base_url?: string;
          country_code?: string | null;
          created_at?: string | null;
          extraction_schema?: Json | null;
          firecrawl_params?: Json | null;
          id?: string;
          is_active?: boolean | null;
          name?: string;
          schedule?: string | null;
          source_type?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      scrape_history: {
        Row: {
          config_id: string | null;
          created_at: string | null;
          duration_ms: number | null;
          error_message: string | null;
          firecrawl_job_id: string | null;
          id: string;
          items_scraped: number | null;
          log_details: Json | null;
          scraped_at: string | null;
          source_id: string | null;
          status: string;
        };
        Insert: {
          config_id?: string | null;
          created_at?: string | null;
          duration_ms?: number | null;
          error_message?: string | null;
          firecrawl_job_id?: string | null;
          id?: string;
          items_scraped?: number | null;
          log_details?: Json | null;
          scraped_at?: string | null;
          source_id?: string | null;
          status: string;
        };
        Update: {
          config_id?: string | null;
          created_at?: string | null;
          duration_ms?: number | null;
          error_message?: string | null;
          firecrawl_job_id?: string | null;
          id?: string;
          items_scraped?: number | null;
          log_details?: Json | null;
          scraped_at?: string | null;
          source_id?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "scrape_history_config_id_fkey";
            columns: ["config_id"];
            isOneToOne: false;
            referencedRelation: "scrape_configurations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "scrape_history_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: false;
            referencedRelation: "scraping_sources";
            referencedColumns: ["id"];
          },
        ];
      };
      scraped_sources: {
        Row: {
          autorag_indexed: boolean | null;
          content_hash: string | null;
          country_code: string | null;
          created_at: string | null;
          extracted_data: Json | null;
          firecrawl_job_id: string | null;
          html_content: string | null;
          id: string;
          last_scraped_at: string | null;
          markdown_content: string | null;
          metadata: Json | null;
          page_status_code: number | null;
          r2_object_key: string | null;
          raw_content: string | null;
          source_type: string;
          title: string | null;
          updated_at: string | null;
          url: string;
        };
        Insert: {
          autorag_indexed?: boolean | null;
          content_hash?: string | null;
          country_code?: string | null;
          created_at?: string | null;
          extracted_data?: Json | null;
          firecrawl_job_id?: string | null;
          html_content?: string | null;
          id?: string;
          last_scraped_at?: string | null;
          markdown_content?: string | null;
          metadata?: Json | null;
          page_status_code?: number | null;
          r2_object_key?: string | null;
          raw_content?: string | null;
          source_type: string;
          title?: string | null;
          updated_at?: string | null;
          url: string;
        };
        Update: {
          autorag_indexed?: boolean | null;
          content_hash?: string | null;
          country_code?: string | null;
          created_at?: string | null;
          extracted_data?: Json | null;
          firecrawl_job_id?: string | null;
          html_content?: string | null;
          id?: string;
          last_scraped_at?: string | null;
          markdown_content?: string | null;
          metadata?: Json | null;
          page_status_code?: number | null;
          r2_object_key?: string | null;
          raw_content?: string | null;
          source_type?: string;
          title?: string | null;
          updated_at?: string | null;
          url?: string;
        };
        Relationships: [];
      };
      scraping_logs: {
        Row: {
          created_at: string;
          id: string;
          message: string | null;
          status_code: number | null;
          triggered_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message?: string | null;
          status_code?: number | null;
          triggered_at: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string | null;
          status_code?: number | null;
          triggered_at?: string;
        };
        Relationships: [];
      };
      scraping_sources: {
        Row: {
          category: Database["public"]["Enums"]["source_category"];
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          id: string;
          is_active: boolean | null;
          last_scraped: string | null;
          name: string;
          scrape_frequency: unknown | null;
          trust_score: number;
          updated_at: string | null;
          url: string;
        };
        Insert: {
          category?: Database["public"]["Enums"]["source_category"];
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_scraped?: string | null;
          name: string;
          scrape_frequency?: unknown | null;
          trust_score?: number;
          updated_at?: string | null;
          url: string;
        };
        Update: {
          category?: Database["public"]["Enums"]["source_category"];
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_scraped?: string | null;
          name?: string;
          scrape_frequency?: unknown | null;
          trust_score?: number;
          updated_at?: string | null;
          url?: string;
        };
        Relationships: [];
      };
      source_validations: {
        Row: {
          created_at: string | null;
          id: string;
          is_valid: boolean;
          source_id: string;
          updated_at: string | null;
          validated_at: string | null;
          validated_by: string | null;
          validation_notes: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_valid: boolean;
          source_id: string;
          updated_at?: string | null;
          validated_at?: string | null;
          validated_by?: string | null;
          validation_notes?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_valid?: boolean;
          source_id?: string;
          updated_at?: string | null;
          validated_at?: string | null;
          validated_by?: string | null;
          validation_notes?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "source_validations_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: false;
            referencedRelation: "scraping_sources";
            referencedColumns: ["id"];
          },
        ];
      };
      Stream: {
        Row: {
          chatId: string;
          createdAt: string;
          id: string;
        };
        Insert: {
          chatId: string;
          createdAt: string;
          id?: string;
        };
        Update: {
          chatId?: string;
          createdAt?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Stream_chatId_fkey";
            columns: ["chatId"];
            isOneToOne: false;
            referencedRelation: "chat_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Stream_chatId_fkey";
            columns: ["chatId"];
            isOneToOne: false;
            referencedRelation: "chat_sessions_camel";
            referencedColumns: ["id"];
          },
        ];
      };
      user_onboarding: {
        Row: {
          created_at: string;
          current_step: string;
          hide_for_session: boolean;
          id: string;
          is_active: boolean;
          is_completed: boolean;
          progress: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          current_step?: string;
          hide_for_session?: boolean;
          id?: string;
          is_active?: boolean;
          is_completed?: boolean;
          progress?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          current_step?: string;
          hide_for_session?: boolean;
          id?: string;
          is_active?: boolean;
          is_completed?: boolean;
          progress?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_preferences: {
        Row: {
          created_at: string;
          email_frequency: string;
          font_size: string;
          notifications_enabled: boolean;
          sidebar_collapsed: boolean;
          theme: string;
          timezone: string | null;
          ui_density: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          email_frequency?: string;
          font_size?: string;
          notifications_enabled?: boolean;
          sidebar_collapsed?: boolean;
          theme?: string;
          timezone?: string | null;
          ui_density?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          email_frequency?: string;
          font_size?: string;
          notifications_enabled?: boolean;
          sidebar_collapsed?: boolean;
          theme?: string;
          timezone?: string | null;
          ui_density?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      Vote: {
        Row: {
          chatId: string;
          isUpvoted: boolean;
          messageId: string;
        };
        Insert: {
          chatId: string;
          isUpvoted: boolean;
          messageId: string;
        };
        Update: {
          chatId?: string;
          isUpvoted?: boolean;
          messageId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Vote_chatId_fkey";
            columns: ["chatId"];
            isOneToOne: false;
            referencedRelation: "Chat";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Vote_messageId_fkey";
            columns: ["messageId"];
            isOneToOne: false;
            referencedRelation: "Message";
            referencedColumns: ["id"];
          },
        ];
      };
      Vote_v2: {
        Row: {
          chatId: string;
          isUpvoted: boolean;
          messageId: string;
        };
        Insert: {
          chatId: string;
          isUpvoted: boolean;
          messageId: string;
        };
        Update: {
          chatId?: string;
          isUpvoted?: boolean;
          messageId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Vote_v2_chatId_fkey";
            columns: ["chatId"];
            isOneToOne: false;
            referencedRelation: "Chat";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Vote_v2_messageId_fkey";
            columns: ["messageId"];
            isOneToOne: false;
            referencedRelation: "Message_v2";
            referencedColumns: ["id"];
          },
        ];
      };
      user_query_history: {
        Row: {
          created_at: string | null;
          feedback_score: number | null;
          feedback_text: string | null;
          id: string;
          query_embedding: string | null;
          query_metadata: Json | null;
          query_text: string;
          response: string | null;
          sources_used: Json | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          feedback_score?: number | null;
          feedback_text?: string | null;
          id?: string;
          query_embedding?: string | null;
          query_metadata?: Json | null;
          query_text: string;
          response?: string | null;
          sources_used?: Json | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          feedback_score?: number | null;
          feedback_text?: string | null;
          id?: string;
          query_embedding?: string | null;
          query_metadata?: Json | null;
          query_text?: string;
          response?: string | null;
          sources_used?: Json | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      chat_message_votes_camel: {
        Row: {
          createdAt: string | null;
          isUpvoted: boolean | null;
          messageId: string | null;
          userId: string | null;
        };
        Insert: {
          createdAt?: string | null;
          isUpvoted?: boolean | null;
          messageId?: string | null;
          userId?: string | null;
        };
        Update: {
          createdAt?: string | null;
          isUpvoted?: boolean | null;
          messageId?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chat_message_votes_message_id_fkey";
            columns: ["messageId"];
            isOneToOne: false;
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_message_votes_message_id_fkey";
            columns: ["messageId"];
            isOneToOne: false;
            referencedRelation: "chat_messages_camel";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_messages_camel: {
        Row: {
          content: string | null;
          createdAt: string | null;
          id: string | null;
          metadata: Json | null;
          role: string | null;
          sessionId: string | null;
          sources: Json | null;
          tokens: number | null;
          toolCalls: Json | null;
          updatedAt: string | null;
          userId: string | null;
        };
        Insert: {
          content?: string | null;
          createdAt?: string | null;
          id?: string | null;
          metadata?: Json | null;
          role?: string | null;
          sessionId?: string | null;
          sources?: Json | null;
          tokens?: number | null;
          toolCalls?: Json | null;
          updatedAt?: string | null;
          userId?: string | null;
        };
        Update: {
          content?: string | null;
          createdAt?: string | null;
          id?: string | null;
          metadata?: Json | null;
          role?: string | null;
          sessionId?: string | null;
          sources?: Json | null;
          tokens?: number | null;
          toolCalls?: Json | null;
          updatedAt?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey";
            columns: ["sessionId"];
            isOneToOne: false;
            referencedRelation: "chat_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_messages_session_id_fkey";
            columns: ["sessionId"];
            isOneToOne: false;
            referencedRelation: "chat_sessions_camel";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_sessions_camel: {
        Row: {
          agentConfig: Json | null;
          caseId: string | null;
          context: string | null;
          createdAt: string | null;
          id: string | null;
          lastMessageAt: string | null;
          metadata: Json | null;
          model: string | null;
          prompt: string | null;
          systemPrompt: string | null;
          title: string | null;
          updatedAt: string | null;
          userId: string | null;
          visibility: string | null;
        };
        Insert: {
          agentConfig?: Json | null;
          caseId?: string | null;
          context?: string | null;
          createdAt?: string | null;
          id?: string | null;
          lastMessageAt?: string | null;
          metadata?: Json | null;
          model?: string | null;
          prompt?: string | null;
          systemPrompt?: string | null;
          title?: string | null;
          updatedAt?: string | null;
          userId?: string | null;
          visibility?: string | null;
        };
        Update: {
          agentConfig?: Json | null;
          caseId?: string | null;
          context?: string | null;
          createdAt?: string | null;
          id?: string | null;
          lastMessageAt?: string | null;
          metadata?: Json | null;
          model?: string | null;
          prompt?: string | null;
          systemPrompt?: string | null;
          title?: string | null;
          updatedAt?: string | null;
          userId?: string | null;
          visibility?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chat_sessions_case_id_fkey";
            columns: ["caseId"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
        ];
      };
      recent_research_sessions: {
        Row: {
          created_at: string | null;
          id: string | null;
          metadata: Json | null;
          query: string | null;
          status: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      mark_onboarding_action_completed: {
        Args: { action_key: string };
        Returns: undefined;
      };
      match_document_chunks: {
        Args: {
          query_embedding: string;
          match_threshold?: number;
          match_count?: number;
          p_user_id?: string;
        };
        Returns: {
          id: string;
          document_id: string;
          text_content: string;
          similarity: number;
        }[];
      };
    };
    Enums: {
      case_status:
        | "draft"
        | "submitted"
        | "in_review"
        | "approved"
        | "rejected"
        | "completed";
      document_status: "pending" | "verified" | "rejected";
      notification_type:
        | "system"
        | "case_update"
        | "document_request"
        | "message";
      session_status: "active" | "completed" | "archived";
      session_type: "chat" | "research" | "case";
      source_category:
        | "government"
        | "legal"
        | "news"
        | "blog"
        | "forum"
        | "other";
      user_role: "user" | "admin" | "client";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
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
} as const;
