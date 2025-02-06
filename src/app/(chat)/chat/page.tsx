"use client";

import { useEffect, useRef, useState } from 'react';
import { useChat, Message } from 'ai/react';
import { useAuth } from '@/contexts/auth';
import { getSupabaseClient } from '@/lib/supabase/client';
import { ChatMessage } from '@/components/ui/chat/chat-message';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { useToast } from '@/hooks/use-toast';
import { TypingIndicator } from '@/components/ui/chat/TypingIndicator';
import { MessageStatus } from '@/components/ui/chat/MessageStatus';
import { SessionManager } from '@/components/ui/chat/SessionManager';
import { DocumentContext } from '@/components/ui/chat/DocumentContext';
import { ChatAnalytics } from '@/components/ui/chat/ChatAnalytics';
import { nanoid } from 'nanoid';
import { logger } from '@/lib/logger';
import { ErrorBoundary } from '@/components/error-boundary';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: chatLoading,
    reload,
    stop,
    setMessages
  } = useChat({
    api: '/api/chat',
    id: currentSessionId || nanoid(),
    body: {
      userId: user?.id,
      sessionId: currentSessionId,
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
          window.location.href = '/auth/login';
        }
      }
    },
    onFinish(message) {
      if (currentSessionId && supabase) {
        supabase
          .from('chat_messages')
          .insert({
            session_id: currentSessionId,
            role: 'user',
            content: message.content,
            created_at: new Date().toISOString(),
          })
          .then(({ error }) => {
            if (error) {
              logger.error('Failed to save message:', error);
            }
          });
      }
    },
    onError(error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Something went wrong',
      });
      logger.error('Chat error:', error);
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`,
    },
    credentials: 'include',
  });

  // Auto scroll to bottom
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    scrollToBottom();
    
    // Add a small delay to ensure content is rendered
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  // Load initial messages for session
  useEffect(() => {
    const loadMessages = async () => {
      if (!currentSessionId || !supabase) return;

      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('session_id', currentSessionId)
          .order('created_at', { ascending: true });

        if (error) throw error;

        if (data) {
          const formattedMessages: Message[] = data.map(msg => ({
            id: msg.id,
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        logger.error('Failed to load messages:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load chat history',
        });
      }
    };

    loadMessages();
  }, [currentSessionId, supabase, setMessages, toast]);

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
        })
        .select()
        .single();

      if (error || !data) throw error || new Error('Failed to create session');

      setCurrentSessionId(data.id);
      setDocuments([]);
      setMessages([]);
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <h1 className="mb-4 text-2xl font-bold">Sign in Required</h1>
          <p className="mb-6 text-muted-foreground">
            Please sign in to access the chat feature.
          </p>
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto flex min-h-screen flex-col p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Immigration Assistant</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
            </Button>
            <Button variant="outline" onClick={handleNewSession}>
              New Chat
            </Button>
          </div>
        </div>

        <div className="grid flex-1 gap-4 md:grid-cols-[300px_1fr]">
          <aside className="hidden space-y-4 md:block">
            <SessionManager
              currentSessionId={currentSessionId}
              onSessionChange={handleSessionChange}
            />
            <DocumentContext
              documents={documents}
              onAdd={handleDocumentAdd}
              onRemove={handleDocumentRemove}
            />
            {showAnalytics && <ChatAnalytics sessionId={currentSessionId} />}
          </aside>

          <main className="flex flex-col rounded-lg border bg-card">
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, i) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLastMessage={i === messages.length - 1}
                />
              ))}
              {chatLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
              <ChatInput
                input={input}
                isLoading={chatLoading}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                onStop={stop}
                onRegenerate={reload}
              />
              <MessageStatus
                messageCount={messages.length}
                isLoading={chatLoading}
              />
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
} 