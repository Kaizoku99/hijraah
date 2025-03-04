import { createClient } from '@supabase/supabase-js'
import { type Message, type Conversation, type Participant } from '@/types/chat'
import { Database } from '@/types/supabase'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const chatService = {
  // Conversation methods
  async createConversation(title: string, userId: string): Promise<Conversation> {
    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert({ title })
      .select()
      .single()

    if (error) throw error

    // Add creator as participant
    await supabase.from('participants').insert({
      conversation_id: conversation.id,
      user_id: userId,
      role: 'owner',
    })

    return {
      id: conversation.id,
      title: conversation.title,
      createdAt: new Date(conversation.created_at),
      updatedAt: new Date(conversation.updated_at),
      participants: [],
      metadata: conversation.metadata,
    }
  },

  async getConversations(userId: string): Promise<Conversation[]> {
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select(`
        *,
        participants (*),
        messages (
          *,
          attachments (*)
        )
      `)
      .order('updated_at', { ascending: false })

    if (error) throw error

    return conversations.map((conv) => ({
      id: conv.id,
      title: conv.title,
      createdAt: new Date(conv.created_at),
      updatedAt: new Date(conv.updated_at),
      participants: conv.participants as Participant[],
      lastMessage: conv.messages?.[0],
      metadata: conv.metadata,
    }))
  },

  // Message methods
  async sendMessage(message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        content: message.content,
        role: message.role,
        conversation_id: message.conversationId,
        user_id: message.userId,
        metadata: message.metadata,
      })
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      content: data.content,
      role: data.role,
      conversationId: data.conversation_id,
      userId: data.user_id,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      metadata: data.metadata,
    }
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    const { data: messages, error } = await supabase
      .from('messages')
      .select(`
        *,
        attachments (*)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) throw error

    return messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role,
      conversationId: msg.conversation_id,
      userId: msg.user_id,
      createdAt: new Date(msg.created_at),
      updatedAt: new Date(msg.updated_at),
      attachments: msg.attachments,
      metadata: msg.metadata,
    }))
  },

  // Realtime subscriptions
  subscribeToMessages(conversationId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const message = payload.new as any
          callback({
            id: message.id,
            content: message.content,
            role: message.role,
            conversationId: message.conversation_id,
            userId: message.user_id,
            createdAt: new Date(message.created_at),
            updatedAt: new Date(message.updated_at),
            metadata: message.metadata,
          })
        }
      )
      .subscribe()
  },

  // Attachment methods
  async uploadAttachment(file: File, messageId: string) {
    const fileName = `${messageId}/${file.name}`
    const { data, error } = await supabase.storage
      .from('attachments')
      .upload(fileName, file)

    if (error) throw error

    const { data: attachment } = await supabase
      .from('attachments')
      .insert({
        name: file.name,
        type: file.type,
        size: file.size,
        url: data.path,
        message_id: messageId,
      })
      .select()
      .single()

    return attachment
  },
}