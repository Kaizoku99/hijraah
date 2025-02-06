import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SessionManagerProps {
  currentSessionId?: string;
  onSessionChange: (sessionId: string) => void;
  onNewSession: () => void;
}

interface ChatSession {
  id: string;
  title: string | null;
  created_at: string;
}

export function SessionManager({ currentSessionId, onSessionChange, onNewSession }: SessionManagerProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const { user } = useAuth();
  const supabase = getSupabaseClient();

  useEffect(() => {
    const loadSessions = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('chat_sessions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSessions(data || []);
      } catch (error) {
        toast.error('Failed to load sessions');
      }
    };

    loadSessions();
  }, [user?.id, supabase]);

  return (
    <div className="flex items-center space-x-2">
      <select
        value={currentSessionId || ''}
        onChange={(e) => onSessionChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Select a session</option>
        {sessions.map((session) => (
          <option key={session.id} value={session.id}>
            {session.title || new Date(session.created_at).toLocaleString()}
          </option>
        ))}
      </select>
      <Button onClick={onNewSession}>New Session</Button>
    </div>
  );
} 