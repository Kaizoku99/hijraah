import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@/lib/auth';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST: Update chat visibility
export async function POST(
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
    const { visibility } = await request.json();

    // Validate visibility
    if (!['private', 'public', 'team'].includes(visibility)) {
      return NextResponse.json({ error: 'Invalid visibility option' }, { status: 400 });
    }

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

    // Update chat visibility
    const { data: updatedChat, error: updateError } = await supabase
      .from('chats')
      .update({ visibility })
      .eq('id', chatId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating chat visibility:', updateError);
      return NextResponse.json({ error: 'Failed to update chat visibility' }, { status: 500 });
    }

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 