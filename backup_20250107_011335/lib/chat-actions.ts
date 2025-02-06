'use server';
import 'server-only';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { ChatSession, ChatMessage } from '@/types/chat';
import type { Database } from '@/types/database';
import type { Json } from '@/types/database';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

type DbChatSession = Database['public']['Tables']['chat_sessions']['Row'] & {
  chat_messages?: Database['public']['Tables']['chat_messages']['Row'][];
};

const mapToSession = (dbSession: DbChatSession): ChatSession => ({
  ...dbSession,
  case_id: dbSession.case_id || undefined,
  title: dbSession.title || undefined,
  ended_at: dbSession.ended_at || undefined,
  context: (dbSession.context as ChatSession['context']) || undefined,
  metadata: dbSession.metadata as Record<string, any> || undefined
});

/**
 * Retrieves all chats for a specific user
 */
export async function getChats(userId?: string | null): Promise<ChatSession[]> {
  if (!userId) {
    return [];
  }
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore
    });
    
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .eq('user_id', userId)
      .eq('status', 'active');

    if (error) throw error;
    return (data?.map(mapToSession) ?? []);
  } catch (error) {
    console.error('Failed to get chats:', error);
    return [];
  }
}

/**
 * Retrieves a specific chat by ID
 */
export async function getChat(id: string): Promise<ChatSession | null> {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore
    });
    
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(`
        *,
        chat_messages(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data ? mapToSession(data) : null;
  } catch (error) {
    console.error('Failed to get chat:', error);
    return null;
  }
}

/**
 * Removes a specific chat
 */
export async function removeChat({ id, path }: { id: string; path: string }) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore
    });
    
    const { error } = await supabase
      .from('chat_sessions')
      .update({ status: 'deleted' })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/');
    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error('Failed to remove chat:', error);
    return {
      error: 'Unauthorized'
    };
  }
}

/**
 * Clears all chats for the current user
 */
export async function clearChats() {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore
    });
    
    const { error } = await supabase
      .from('chat_sessions')
      .update({ status: 'deleted' })
      .eq('status', 'active');

    if (error) throw error;

    revalidatePath('/');
    return redirect('/');
  } catch (error) {
    console.error('Failed to clear chats:', error);
    return {
      error: 'Unauthorized'
    };
  }
}

/**
 * Retrieves a shared chat by ID
 */
export async function getSharedChat(id: string): Promise<ChatSession | null> {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore
    });
    
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(`
        *,
        chat_messages(*)
      `)
      .eq('id', id)
      .eq('metadata->shared', true)
      .single();

    if (error) throw error;
    return data ? mapToSession(data) : null;
  } catch (error) {
    console.error('Failed to get shared chat:', error);
    return null;
  }
}

/**
 * Shares a chat by adding a sharePath
 */
export async function shareChat(chat: ChatSession): Promise<ChatSession> {
  try {
    const metadata: Json = {
      ...chat.metadata,
      shared: true,
      sharePath: `/share/${chat.id}`
    };

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore
    });
    
    const { data, error } = await supabase
      .from('chat_sessions')
      .update({ metadata })
      .eq('id', chat.id)
      .select()
      .single();

    if (error) throw error;
    return data ? mapToSession(data) : chat;
  } catch (error) {
    console.error('Failed to share chat:', error);
    throw error;
  }
}

export async function createChat(request: Request) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.headers.get(`cookie`)?.split(';').find(c => c.trim().startsWith(`${name}=`))?.split('=')[1]
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.delete({
            name,
            ...options,
          })
        },
      },
    }
  )

  // ... rest of the file remains the same ...
} 