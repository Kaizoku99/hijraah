"use client";

import { useEffect, useRef, useState } from 'react';
import { useChat } from 'ai/react';
import { useAuth } from '@/contexts/auth';
import { getSupabaseClient } from '@/lib/supabase/client';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { useToast } from '@/components/ui/use-toast';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { MessageStatus } from '@/components/chat/MessageStatus';
import { SessionManager } from '@/components/chat/SessionManager';
import { DocumentContext } from '@/components/chat/DocumentContext';
import { ChatAnalytics } from '@/components/chat/ChatAnalytics';
import { nanoid } from 'nanoid';
import { logger } from '@/lib/logger';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
}

export default function ChatPage() {
  const { user, session, loading } = useAuth();
  const { toast } = useToast();
  const supabase = getSupabaseClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading: chatLoading } = useChat({
    api: '/api/chat',
    id: nanoid(),
    body: {
      userId: user?.id,
      sessionId: currentSessionId || nanoid(),
      documents: documents.map(d => d.url),
    },
    onResponse(response) {
      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: response.status === 401 ? 'Please sign in again' : 'Failed to send message',
        });
        
        if (response.status === 401) {
          // Optionally refresh the session or redirect to login
          window.location.href = '/auth/login';
        }
      }
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`,
    },
    credentials: 'include',
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNewSession = async () => {
    try {
      if (!user?.id || !supabase) {
        throw new Error('User not authenticated or client not initialized');
      }

      const sessionId = nanoid();
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          id: sessionId,
          user_id: user.id,
          status: 'active',
          started_at: new Date().toISOString(),
          ended_at: null,
          title: null,
          case_id: null,
          context: null,
          metadata: null
        })
        .select()
        .single();

      if (error || !data) throw error || new Error('Failed to create session');

      setCurrentSessionId(data.id);
      setDocuments([]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create new session',
      });
    }
  };

  const handleSessionChange = async (sessionId: string) => {
    try {
      if (!supabase) return;
      
      const { data: docs, error } = await supabase
        .from('documents')
        .select('*')
        .eq('session_id', sessionId);

      if (error) throw error;

      setCurrentSessionId(sessionId);
      setDocuments((docs || []).map(doc => ({
        ...doc,
        type: doc.file_type,
        url: doc.file_path
      })));
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load session',
      });
    }
  };

  const handleDocumentAdd = async (document: Document) => {
    if (!currentSessionId || !supabase) return;

    try {
      await supabase
        .from('documents')
        .update({ session_id: currentSessionId })
        .eq('id', document.id);

      setDocuments([...documents, document]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add document',
      });
    }
  };

  const handleDocumentRemove = async (documentId: string) => {
    if (!currentSessionId || !supabase) return;

    try {
      await supabase
        .from('documents')
        .update({ session_id: null })
        .eq('id', documentId);

      setDocuments(documents.filter(d => d.id !== documentId));
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to remove document',
      });
    }
  };

  useEffect(() => {
    const initChat = async () => {
      try {
        setIsLoading(true);
        // Chat initialization code...
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize chat');
        logger.error('Chat initialization failed:', {
          error: error.message,
          timestamp: new Date().toISOString(),
        });
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, []);

  useEffect(() => {
    console.log('Auth State:', { user, session, loading });
    
    // Check if we have a session cookie
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('Session Check:', { session, error });
    };
    
    checkSession();
  }, [user, session, loading, supabase.auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold mb-4">Please log in to access chat</h2>
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (isLoading || chatLoading) {
    return <div>Loading chat...</div>;
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please refresh the page.</div>}>
      <div className="flex h-screen flex-col">
        <div className="border-b p-4">
          <SessionManager
            currentSessionId={currentSessionId}
            onSessionChange={handleSessionChange}
            onNewSession={handleNewSession}
          />
        </div>

        <div className="flex flex-1">
          <div className="flex-1 overflow-hidden">
            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-y-auto">
                <div className="container max-w-4xl py-4">
                  {messages.map((message) => (
                    <div key={message.id} className="mb-4">
                      <ChatMessage
                        message={message}
                        userAvatar={user?.user_metadata?.avatar_url}
                      />
                      <div className="mt-1">
                        <MessageStatus
                          status={message.role === 'assistant' ? 'sent' : 'sending'}
                        />
                      </div>
                    </div>
                  ))}
                  {chatLoading && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="border-t">
                <div className="container max-w-4xl">
                  <ChatInput
                    onSubmit={async (message) => {
                      await handleSubmit({ preventDefault: () => {}, currentTarget: { message } } as any);
                    }}
                    isLoading={chatLoading}
                    placeholder="Type your message..."
                    showAttachments={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-80 border-l">
            <DocumentContext
              documents={documents}
              onDocumentAdd={handleDocumentAdd}
              onDocumentRemove={handleDocumentRemove}
            />
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="w-full border-t p-4 text-left text-sm font-medium hover:bg-muted"
            >
              {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
            </button>
            {showAnalytics && (
              <div className="border-t p-4">
                <ChatAnalytics />
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}