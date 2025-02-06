import { useChat } from 'ai';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';
import { getSupabaseClient } from '@/lib/supabase/client';
import { nanoid } from 'nanoid';
import { SessionManager } from './SessionManager';
import { DocumentContext } from './DocumentContext';
import { ChatMessage } from './ChatMessage';
import { MessageStatus } from './MessageStatus';
import { TypingIndicator } from './TypingIndicator';
import { ChatAnalytics } from './ChatAnalytics';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface Message {
  id: string;
  content: string;
  role: 'system' | 'user' | 'assistant';
}

interface EnhancedChatProps {
  initialMessages?: Message[];
}

export function EnhancedChat({ initialMessages }: EnhancedChatProps) {
  const { user, session } = useAuth();
  const supabase = getSupabaseClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [provider, setProvider] = useState<'openai' | 'deepseek'>('openai');
  const [currentSessionId, setCurrentSessionId] = useState<string>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages,
    api: '/api/chat',
    id: currentSessionId || nanoid(),
    body: {
      provider,
      userId: user?.id,
      sessionId: currentSessionId,
      documents: documents.map(d => d.url),
    },
    headers: {
      'Authorization': `Bearer ${session?.access_token}`,
    },
    onError: (error: Error) => {
      toast.error(error.message || 'An error occurred while sending your message');
      if (error.message.includes('unauthorized')) {
        window.location.href = '/login';
      }
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNewSession = async () => {
    try {
      if (!user?.id || !supabase) {
        throw new Error('User not authenticated');
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
    } catch (error) {
      toast.error('Failed to create new session');
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
      setDocuments(docs?.map(doc => ({
        id: doc.id,
        name: doc.name,
        type: doc.file_type,
        url: doc.file_path
      })) || []);
    } catch (error) {
      toast.error('Failed to load session');
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
      toast.error('Failed to add document');
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
      toast.error('Failed to remove document');
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <SessionManager
            currentSessionId={currentSessionId}
            onSessionChange={handleSessionChange}
            onNewSession={handleNewSession}
          />
          <select 
            value={provider}
            onChange={(e) => setProvider(e.target.value as 'openai' | 'deepseek')}
            className="p-2 border rounded"
          >
            <option value="openai">OpenAI</option>
            <option value="deepseek">DeepSeek</option>
          </select>
        </div>
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
                {isLoading && <TypingIndicator />}
                {error && (
                  <div className="p-4 rounded-lg bg-red-100 text-red-700">
                    {error.message || 'An error occurred'}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="container max-w-4xl">
                <input
                  className="w-full p-2 border border-gray-300 rounded shadow-xl"
                  value={input}
                  placeholder="Type your message..."
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </form>
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
  );
} 