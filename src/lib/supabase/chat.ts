import { Message } from 'ai';
import { getSupabaseClient } from './client';
import { Database } from '@/types/supabase';

export type ChatConversation = Database['public']['Tables']['chat_conversations']['Row'];
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row'];

interface CreateConversationOptions {
  title?: string;
  filters?: {
    country?: string;
    category?: string;
    language?: string;
  };
  metadata?: Record<string, unknown>;
}

interface AddMessageOptions {
  conversationId: string;
  message: Message;
  metadata?: Record<string, unknown>;
}

export class ChatService {
  private async getClient() {
    return getSupabaseClient();
  }

  async createConversation(options: CreateConversationOptions = {}) {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({
        title: options.title,
        filters: options.filters,
        metadata: options.metadata,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getConversation(id: string) {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from('chat_conversations')
      .select(`
        *,
        messages:chat_messages(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async listConversations(options: {
    limit?: number;
    offset?: number;
    archived?: boolean;
  } = {}) {
    const supabase = await this.getClient();
    const { limit = 10, offset = 0, archived = false } = options;

    const { data, error } = await supabase
      .from('chat_conversations')
      .select(`
        *,
        messages:chat_messages(*)
      `)
      .eq('is_archived', archived)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  }

  async addMessage({ conversationId, message, metadata }: AddMessageOptions) {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        role: message.role,
        content: message.content,
        metadata,
      })
      .select()
      .single();

    if (error) throw error;

    // Update conversation's updated_at timestamp
    await supabase
      .from('chat_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return data;
  }

  async updateConversation(
    id: string,
    updates: Partial<Omit<ChatConversation, 'id' | 'user_id' | 'created_at'>>
  ) {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from('chat_conversations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async archiveConversation(id: string) {
    return this.updateConversation(id, { is_archived: true });
  }

  async deleteConversation(id: string) {
    const supabase = await this.getClient();

    const { error } = await supabase
      .from('chat_conversations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getConversationMessages(
    conversationId: string,
    options: {
      limit?: number;
      offset?: number;
    } = {}
  ) {
    const supabase = await this.getClient();
    const { limit = 50, offset = 0 } = options;

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  }
}
