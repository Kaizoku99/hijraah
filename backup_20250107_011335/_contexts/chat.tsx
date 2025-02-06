'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';
import { useAuth } from '@/contexts/auth';
import { createClient } from '@/lib/supabase/client';
import { ChatContextValue, ChatMessage, ChatSession, ChatMetadata } from '@/types/chat';

type ChatState = {
  messages: ChatMessage[];
  session: ChatSession | null;
  isLoading: boolean;
  error: Error | null;
};

type ChatAction =
  | { type: 'SET_MESSAGES'; payload: ChatMessage[] }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_SESSION'; payload: ChatSession }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error | null }
  | { type: 'CLEAR_SESSION' };

const initialState: ChatState = {
  messages: [],
  session: null,
  isLoading: false,
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id ? action.payload : msg
        ),
      };
    case 'SET_SESSION':
      return { ...state, session: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_SESSION':
      return initialState;
    default:
      return state;
  }
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    if (state.session?.id) {
      const channel = supabase.channel(`chat:${state.session.id}`);
      channel.on('broadcast', { event: 'message' }, ({ payload }) => {
        if (payload.type === 'message.new') {
          dispatch({ type: 'ADD_MESSAGE', payload: payload.message });
        } else if (payload.type === 'message.update') {
          dispatch({ type: 'UPDATE_MESSAGE', payload: payload.message });
        }
      });
      channel.subscribe();
    }
  }, [state.session?.id, supabase]);

  const loadMessages = async (sessionId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Transform database messages to ChatMessage type
      const transformedMessages: ChatMessage[] = messages.map(msg => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        metadata: msg.metadata as ChatMetadata | undefined,
        createdAt: new Date(msg.created_at)
      }));
      
      dispatch({ type: 'SET_MESSAGES', payload: transformedMessages });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error as Error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const sendMessage = async (content: string, attachments?: any[]) => {
    if (!state.session?.id || !user) return;

    try {
      const dbMessage = {
        session_id: state.session.id,
        user_id: user.id,
        role: 'user' as const,
        content,
        metadata: {}
      };

      const { data, error } = await supabase
        .from('chat_messages')
        .insert(dbMessage)
        .select()
        .single();

      if (error) throw error;

      const transformedMessage: ChatMessage = {
        id: data.id,
        role: data.role,
        content: data.content,
        metadata: data.metadata as ChatMetadata | undefined,
        createdAt: new Date(data.created_at)
      };

      dispatch({ type: 'ADD_MESSAGE', payload: transformedMessage });

      // Broadcast the message to other clients
      await supabase
        .channel(`chat:${state.session.id}`)
        .send({
          type: 'broadcast',
          event: 'message',
          payload: { type: 'message.new', message: data },
        });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error as Error });
    }
  };

  const startNewSession = async () => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { data: session, error } = await supabase
        .from('chat_sessions')
        .insert({
          user_id: user.id,
          status: 'active',
          started_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      const transformedSession: ChatSession = {
        id: session.id,
        user_id: session.user_id,
        status: session.status,
        started_at: session.started_at,
        created_at: session.created_at,
        updated_at: session.updated_at,
        case_id: session.case_id || undefined,
        title: session.title || undefined,
        ended_at: session.ended_at || undefined,
        context: (session.context as ChatSession['context']) || undefined,
        metadata: (session.metadata as Record<string, any>) || undefined
      };

      dispatch({ type: 'SET_SESSION', payload: transformedSession });
      await loadMessages(session.id);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error as Error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadSession = async (sessionId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { data: session, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;

      const transformedSession: ChatSession = {
        id: session.id,
        user_id: session.user_id,
        status: session.status,
        started_at: session.started_at,
        created_at: session.created_at,
        updated_at: session.updated_at,
        case_id: session.case_id || undefined,
        title: session.title || undefined,
        ended_at: session.ended_at || undefined,
        context: (session.context as ChatSession['context']) || undefined,
        metadata: (session.metadata as Record<string, any>) || undefined
      };

      dispatch({ type: 'SET_SESSION', payload: transformedSession });
      await loadMessages(sessionId);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error as Error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearSession = () => {
    dispatch({ type: 'CLEAR_SESSION' });
  };

  const value: ChatContextValue = {
    messages: state.messages,
    session: state.session,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    startNewSession,
    loadSession,
    clearSession,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 