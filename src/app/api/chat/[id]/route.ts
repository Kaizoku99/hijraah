import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@/lib/auth';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: Fetch a specific chat and its messages
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const chatId = params.id;
    
    // Get user from session
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch chat details
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .select('id, title, model, visibility, created_at, updated_at')
      .eq('id', chatId)
      .or(`user_id.eq.${userId},visibility.eq.public,visibility.eq.team`)
      .single();

    if (chatError || !chat) {
      return NextResponse.json({ error: 'Chat not found or access denied' }, { status: 404 });
    }

    // Fetch chat messages
    const { data: messages, error: messagesError } = await supabase
      .from('chat_messages')
      .select('id, role, content, created_at')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error('Error fetching chat messages:', messagesError);
      return NextResponse.json({ error: 'Failed to fetch chat messages' }, { status: 500 });
    }

    // Fetch chat attachments
    const { data: attachments, error: attachmentsError } = await supabase
      .from('chat_attachments')
      .select('id, message_id, file_name, file_type, file_size, file_path, created_at')
      .eq('chat_id', chatId);

    if (attachmentsError) {
      console.error('Error fetching chat attachments:', attachmentsError);
      return NextResponse.json({ error: 'Failed to fetch chat attachments' }, { status: 500 });
    }

    // Format messages for the client
    const formattedMessages = messages.map(message => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.created_at,
      attachments: attachments
        .filter(attachment => attachment.message_id === message.id)
        .map(attachment => ({
          id: attachment.id,
          name: attachment.file_name,
          type: attachment.file_type,
          size: attachment.file_size,
          url: attachment.file_path
        }))
    }));

    return NextResponse.json({
      ...chat,
      messages: formattedMessages
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

// DELETE: Delete a specific chat
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const chatId = params.id;
    
    // Get user from session
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Check if chat exists and belongs to user
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .select('id')
      .eq('id', chatId)
      .eq('user_id', userId)
      .single();

    if (chatError || !chat) {
      return NextResponse.json({ error: 'Chat not found or access denied' }, { status: 404 });
    }

    // Delete chat (cascade will delete messages and attachments)
    const { error: deleteError } = await supabase
      .from('chats')
      .delete()
      .eq('id', chatId);

    if (deleteError) {
      console.error('Error deleting chat:', deleteError);
      return NextResponse.json({ error: 'Failed to delete chat' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

// PATCH: Update a specific chat
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const chatId = params.id;
    
    // Get user from session
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { title } = await request.json();

    // Check if chat exists and belongs to user
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .select('id')
      .eq('id', chatId)
      .eq('user_id', userId)
      .single();

    if (chatError || !chat) {
      return NextResponse.json({ error: 'Chat not found or access denied' }, { status: 404 });
    }

    // Update chat title
    const { data: updatedChat, error: updateError } = await supabase
      .from('chats')
      .update({ title })
      .eq('id', chatId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating chat:', updateError);
      return NextResponse.json({ error: 'Failed to update chat' }, { status: 500 });
    }

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 