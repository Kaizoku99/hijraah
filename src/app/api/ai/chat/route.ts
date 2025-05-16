import { openai } from '@ai-sdk/openai'
import { streamText, createDataStreamResponse, Message } from 'ai'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'
import { auth } from '@/lib/auth'

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { messages, id = nanoid(), selectedChatModel = 'gpt-4o', userId, visibility = 'private', attachments = [] } = await request.json()

    // Get user from session if userId isn't provided
    let authenticatedUserId = userId
    if (!authenticatedUserId) {
      const session = await auth()
      authenticatedUserId = session?.user?.id
    }

    // Initialize context variables
    const systemPrompt = `You are an AI assistant specialized in immigration matters, helping users navigate the complex immigration processes around the world. 
Provide helpful, accurate, and concise information about visa applications, residency permits, citizenship processes, etc.
Follow these guidelines:
- Be specific with information about immigration processes
- Cite relevant regulations or sources when helpful
- Be honest when you don't know something
- Format your responses with markdown for readability
- For complex cases, suggest consulting a licensed immigration lawyer
- Answer only in the language the user is using`

    // Format messages for the API
    const apiMessages = messages.map((message: any) => ({
      role: message.role,
      content: message.content
    }))
    
    // Add system prompt if not present
    if (!apiMessages.some((message: any) => message.role === 'system')) {
      apiMessages.unshift({
        role: 'system',
        content: systemPrompt
      })
    }

    // Store conversation in DB if user is authenticated
    if (authenticatedUserId) {
      try {
        // Check if conversation exists
        const { data: existingChat } = await supabase
          .from('chats')
          .select('id')
          .eq('id', id)
          .maybeSingle()
        
        if (!existingChat) {
          // Create new conversation
          await supabase.from('chats').insert({
            id,
            user_id: authenticatedUserId,
            title: messages[0]?.content.substring(0, 100) || 'New conversation',
            model: selectedChatModel,
            visibility,
            created_at: new Date().toISOString(),
          })
        }
        
        // Store user message
        const userMessage = messages.findLast((m: any) => m.role === 'user')
        if (userMessage) {
          await supabase.from('chat_messages').insert({
            id: userMessage.id || nanoid(),
            chat_id: id,
            user_id: authenticatedUserId,
            role: 'user',
            content: userMessage.content,
            created_at: new Date().toISOString(),
          })
        }

        // Store any attachments
        if (attachments && attachments.length > 0) {
          for (const attachment of attachments) {
            await supabase.from('chat_attachments').insert({
              id: attachment.id || nanoid(),
              chat_id: id,
              message_id: userMessage?.id || null,
              file_name: attachment.name,
              file_type: attachment.type,
              file_size: attachment.size || 0,
              file_path: attachment.url
            })
          }
        }
      } catch (dbError) {
        console.error('Database error:', dbError)
        // Continue with API call even if DB operations fail
      }
    }
    
    return createDataStreamResponse({
      execute: async (dataStream) => {
        try {
          // Create the streaming response using Vercel AI SDK 4.1
          const result = streamText({
            model: openai(selectedChatModel),
            messages: apiMessages as Message[],
            temperature: 0.7,
            maxTokens: 4000,
          })

          // Set up handler for when the stream completes
          result.text.then(async (textResponse) => {
            // Save assistant message to DB if user is authenticated
            if (authenticatedUserId && textResponse) {
              const messageId = nanoid()
              await supabase.from('chat_messages').insert({
                id: messageId,
                chat_id: id,
                role: 'assistant',
                content: textResponse,
                created_at: new Date().toISOString(),
              })
              
              // Update conversation title if it's the first exchange
              const { data: messageCount } = await supabase
                .from('chat_messages')
                .select('id', { count: 'exact' })
                .eq('chat_id', id)
              
              if (messageCount?.length === 2) {
                // Generate a title using OpenAI directly
                const openaiClient = new (await import('openai')).OpenAI({
                  apiKey: process.env.OPENAI_API_KEY,
                })
                
                const titleResponse = await openaiClient.chat.completions.create({
                  model: 'gpt-3.5-turbo',
                  messages: [
                    {
                      role: 'system',
                      content: 'Generate a short, concise title (5-7 words) for this conversation. Return only the title text.'
                    },
                    ...apiMessages.slice(0, 2)
                  ],
                  temperature: 0.7,
                  max_tokens: 50
                })
                
                const title = titleResponse.choices[0]?.message?.content?.trim() || 'New conversation'
                
                await supabase
                  .from('chats')
                  .update({ title })
                  .eq('id', id)
              }
            }
          })

          // Merge the stream into the data stream
          result.mergeIntoDataStream(dataStream)
        } catch (error) {
          console.error('Error in AI chat response:', error)
          dataStream.writeData({
            type: 'error',
            value: { message: 'Failed to process chat request' }
          })
        }
      }
    })
    
  } catch (error) {
    console.error('Error processing chat request:', error)
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 })
  }
} 