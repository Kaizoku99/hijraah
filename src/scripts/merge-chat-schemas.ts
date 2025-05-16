/**
 * Migration script to merge existing chat tables with AI chat tables
 * 
 * This script:
 * 1. Renames ai_conversations to chats if needed
 * 2. Renames ai_messages to chat_messages if needed
 * 3. Ensures all required columns exist in both tables
 * 
 * Run with: npx tsx src/scripts/merge-chat-schemas.ts
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  console.log('Starting chat schema migration...')

  try {
    // Check if tables exist
    const { data: tables } = await supabase.rpc('list_tables')
    
    const hasChats = tables.includes('chats')
    const hasAiConversations = tables.includes('ai_conversations')
    const hasChatMessages = tables.includes('chat_messages')
    const hasAiMessages = tables.includes('ai_messages')

    // 1. Handle chats/ai_conversations tables
    if (hasChats && hasAiConversations) {
      console.log('Both chats and ai_conversations tables exist. Merging data...')
      
      // Get all AI conversations
      const { data: aiConversations, error: aiError } = await supabase
        .from('ai_conversations')
        .select('*')
      
      if (aiError) {
        throw new Error(`Error fetching AI conversations: ${aiError.message}`)
      }
      
      // Insert AI conversations into chats table
      if (aiConversations && aiConversations.length > 0) {
        console.log(`Found ${aiConversations.length} AI conversations to migrate`)
        
        for (const conversation of aiConversations) {
          // Check if chat with same ID already exists
          const { data: existingChat } = await supabase
            .from('chats')
            .select('id')
            .eq('id', conversation.id)
            .single()
          
          if (!existingChat) {
            // Insert conversation into chats
            const { error: insertError } = await supabase
              .from('chats')
              .insert({
                id: conversation.id,
                user_id: conversation.user_id,
                title: conversation.title,
                model: conversation.model || 'gpt-4o',
                visibility: conversation.visibility || 'private',
                created_at: conversation.created_at || new Date().toISOString(),
              })
            
            if (insertError) {
              console.error(`Error inserting chat ${conversation.id}: ${insertError.message}`)
            }
          }
        }
      }
    } else if (hasAiConversations && !hasChats) {
      console.log('Only ai_conversations table exists. Renaming to chats...')
      // Rename ai_conversations to chats
      await supabase.rpc('rename_table', { old_name: 'ai_conversations', new_name: 'chats' })
    } else if (!hasChats) {
      console.log('Creating chats table...')
      // Create chats table
      await supabase.query(`
        CREATE TABLE chats (
          id UUID PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          model TEXT NOT NULL DEFAULT 'gpt-4o',
          visibility TEXT NOT NULL DEFAULT 'private',
          created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE
        )
      `)
    }

    // 2. Handle chat_messages/ai_messages tables
    if (hasChatMessages && hasAiMessages) {
      console.log('Both chat_messages and ai_messages tables exist. Merging data...')
      
      // Get all AI messages
      const { data: aiMessages, error: aiError } = await supabase
        .from('ai_messages')
        .select('*')
      
      if (aiError) {
        throw new Error(`Error fetching AI messages: ${aiError.message}`)
      }
      
      // Insert AI messages into chat_messages table
      if (aiMessages && aiMessages.length > 0) {
        console.log(`Found ${aiMessages.length} AI messages to migrate`)
        
        for (const message of aiMessages) {
          // Check if message with same ID already exists
          const { data: existingMessage } = await supabase
            .from('chat_messages')
            .select('id')
            .eq('id', message.id)
            .single()
          
          if (!existingMessage) {
            // Insert message into chat_messages
            const { error: insertError } = await supabase
              .from('chat_messages')
              .insert({
                id: message.id,
                chat_id: message.conversation_id,
                user_id: message.user_id,
                role: message.role,
                content: message.content,
                created_at: message.created_at || new Date().toISOString(),
              })
            
            if (insertError) {
              console.error(`Error inserting message ${message.id}: ${insertError.message}`)
            }
          }
        }
      }
    } else if (hasAiMessages && !hasChatMessages) {
      console.log('Only ai_messages table exists. Renaming to chat_messages...')
      // Rename ai_messages to chat_messages
      await supabase.rpc('rename_table', { old_name: 'ai_messages', new_name: 'chat_messages' })
      
      // Rename conversation_id column to chat_id
      await supabase.query(`
        ALTER TABLE chat_messages RENAME COLUMN conversation_id TO chat_id
      `)
    } else if (!hasChatMessages) {
      console.log('Creating chat_messages table...')
      // Create chat_messages table
      await supabase.query(`
        CREATE TABLE chat_messages (
          id UUID PRIMARY KEY,
          chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          role TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
        )
      `)
    }

    console.log('Chat schema migration completed successfully!')
  } catch (error) {
    console.error('Error in migration:', error)
    process.exit(1)
  }
}

main() 