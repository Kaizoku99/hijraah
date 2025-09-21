/**
 * Context7 - Resumable Chat Component
 * 
 * A React component that demonstrates resumable streaming chat using the AI SDK v5
 * with Context7 architecture principles. This component automatically resumes
 * interrupted streams and provides a seamless user experience.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MessageSquare, Pause, Play, RotateCcw } from 'lucide-react';
import { useResumableChat } from '@/hooks/use-resumable-chat';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';
import type { UIMessage } from '@ai-sdk-tools/store';

export interface ResumableChatProps {
  chatId: string;
  initialMessages?: UIMessage[];
  autoResume?: boolean;
  onChatUpdate?: (messages: UIMessage[]) => void;
  className?: string;
}

/**
 * Context7 - Resumable Chat Component
 * 
 * Provides a complete chat interface with resumable streaming support,
 * following Context7 UI/UX principles and accessibility standards.
 */
export function ResumableChat({
  chatId,
  initialMessages = [],
  autoResume = true,
  onChatUpdate,
  className,
}: ResumableChatProps) {
  const [isResuming, setIsResuming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Context7 - Use our custom resumable chat hook
  const {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    error,
    resume,
    stop,
    reload,
  } = useResumableChat({
    id: chatId,
    initialMessages,
    autoResume,
    onError: (error) => {
      logger.error('Chat error occurred', new Error(error.message));
      toast.error('Chat Error', {
        description: error.message,
      });
    },
    onFinish: (message, allMessages) => {
      logger.info('Chat message completed', { messageId: message.id });
      onChatUpdate?.(allMessages);
      toast.success('Message completed');
    },
  });

  // Context7 - Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Context7 - Manual resume handler with user feedback
  const handleResume = async () => {
    setIsResuming(true);
    try {
      await resume();
      toast.success('Stream resumed successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to resume stream';
      toast.error('Resume failed', { description: message });
    } finally {
      setIsResuming(false);
    }
  };

  // Context7 - Handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
    }
  };

  // Context7 - Render message with proper styling
  const renderMessage = (message: UIMessage, index: number) => {
    const isUser = message.role === 'user';
    
    return (
      <div
        key={message.id || index}
        className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-[80%] rounded-lg px-4 py-2 ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900 border'
          }`}
        >
          <div className="text-sm">
            {/* AI SDK v5 - Handle UIMessage parts array */}
            {message.parts?.map((part, partIndex) => {
              if (part.type === 'text') {
                return part.text;
              }
              return null;
            }).join('') || ''}
          </div>
          <div className="text-xs opacity-70 mt-1">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className={`flex flex-col h-[600px] ${className}`}>
      {/* Context7 - Header with status indicators */}
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span>Resumable Chat</span>
            {isLoading && <Badge variant="secondary">Streaming...</Badge>}
            {error && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Error
              </Badge>
            )}
          </div>
          
          {/* Context7 - Control buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResume}
              disabled={isResuming || isLoading}
            >
              {isResuming ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Resume
            </Button>
            
            {isLoading && (
              <Button variant="outline" size="sm" onClick={stop}>
                <Pause className="h-4 w-4" />
                Stop
              </Button>
            )}
            
            <Button variant="outline" size="sm" onClick={reload}>
              <RotateCcw className="h-4 w-4" />
              Reload
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      {/* Context7 - Messages area */}
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="py-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Start a conversation...</p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => renderMessage(message, index))
            )}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 border rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
                    <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 animation-delay-200" />
                    <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 animation-delay-400" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Context7 - Input area */}
        <div className="border-t p-4">
          {error && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Error occurred</span>
              </div>
              <p className="text-red-700 text-sm mt-1">{error.message}</p>
            </div>
          )}
          
          <form onSubmit={onSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message... (supports resumable streaming)"
              disabled={isLoading}
              className="flex-1"
              autoFocus
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              size="default"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                'Send'
              )}
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 mt-2">
            This chat supports resumable streaming. If interrupted, streams will automatically resume.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
