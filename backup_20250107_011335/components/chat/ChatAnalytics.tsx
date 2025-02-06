import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/auth';

interface ChatStats {
  totalMessages: number;
  averageResponseTime: number;
  totalSessions: number;
  documentsUsed: number;
}

export function ChatAnalytics() {
  const [stats, setStats] = useState<ChatStats>({
    totalMessages: 0,
    averageResponseTime: 0,
    totalSessions: 0,
    documentsUsed: 0,
  });
  const { user } = useAuth();
  const supabase = getSupabaseClient();

  useEffect(() => {
    const loadStats = async () => {
      if (!user?.id) return;

      try {
        // Get total messages
        const { count: totalMessages } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Get total sessions
        const { count: totalSessions } = await supabase
          .from('chat_sessions')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('status', 'active');

        // Get documents used
        const { count: documentsUsed } = await supabase
          .from('documents')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Calculate average response time (mock data for now)
        const averageResponseTime = 1.5; // seconds

        setStats({
          totalMessages: totalMessages || 0,
          averageResponseTime,
          totalSessions: totalSessions || 0,
          documentsUsed: documentsUsed || 0,
        });
      } catch (error) {
        console.error('Failed to load chat statistics:', error);
      }
    };

    loadStats();
  }, [user?.id, supabase]);

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Chat Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Total Messages</div>
          <div className="text-xl font-semibold">{stats.totalMessages}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Avg. Response Time</div>
          <div className="text-xl font-semibold">{stats.averageResponseTime}s</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Total Sessions</div>
          <div className="text-xl font-semibold">{stats.totalSessions}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Documents Used</div>
          <div className="text-xl font-semibold">{stats.documentsUsed}</div>
        </div>
      </div>
    </div>
  );
} 