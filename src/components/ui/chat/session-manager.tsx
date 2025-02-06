'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatService } from '@/lib/supabase/chat';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { ChatConversation } from '@/lib/supabase/chat';

interface SessionManagerProps {
  currentSessionId?: string;
  onSessionChange: (sessionId: string) => void;
  className?: string;
}

export function SessionManager({ 
  currentSessionId, 
  onSessionChange,
  className 
}: SessionManagerProps) {
  const [sessions, setSessions] = React.useState<ChatConversation[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const chatService = React.useMemo(() => new ChatService(), []);

  const loadSessions = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await chatService.listConversations();
      setSessions(data);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast.error('Failed to load sessions');
    } finally {
      setIsLoading(false);
    }
  }, [chatService]);

  React.useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleNewSession = async () => {
    try {
      const session = await chatService.createConversation();
      onSessionChange(session.id);
      await loadSessions();
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('Failed to create new session');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sessions</h2>
        <Button onClick={handleNewSession} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Session
        </Button>
      </div>
      <ScrollArea className="h-[300px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground">No active sessions</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sessions.map((session) => (
              <Button
                key={session.id}
                variant={currentSessionId === session.id ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => onSessionChange(session.id)}
              >
                <span className="truncate">
                  {session.title || `Session ${session.id.slice(0, 8)}`}
                </span>
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
} 