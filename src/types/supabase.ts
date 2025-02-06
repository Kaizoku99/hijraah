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
      immigration_data: {
        Row: {
          id: string;
          url: string;
          title: string;
          content: string;
          category: string;
          country: string;
          language: string;
          last_updated: Date | null;
          metadata: Record<string, unknown>;
          created_at: Date;
          updated_at: Date;
        };
        Insert: Omit<
          Database['public']['Tables']['immigration_data']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<
          Database['public']['Tables']['immigration_data']['Row']
        >;
      };
      immigration_updates: {
        Row: {
          id: string;
          data_id: string;
          change_type: string;
          previous_content: string | null;
          new_content: string;
          detected_at: Date;
        };
        Insert: Omit<
          Database['public']['Tables']['immigration_updates']['Row'],
          'id' | 'detected_at'
        >;
        Update: Partial<
          Database['public']['Tables']['immigration_updates']['Insert']
        >;
      };
      chat_conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          created_at: Date;
          updated_at: Date;
          filters: Json;
          metadata: Json;
          is_archived: boolean;
        };
        Insert: Omit<
          Database['public']['Tables']['chat_conversations']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<
          Database['public']['Tables']['chat_conversations']['Row']
        >;
      };
      chat_messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at: Date;
          metadata: Json;
        };
        Insert: Omit<
          Database['public']['Tables']['chat_messages']['Row'],
          'id' | 'created_at'
        >;
        Update: Partial<
          Database['public']['Tables']['chat_messages']['Row']
        >;
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {
      [key: string]: string[];
    };
  };
} 