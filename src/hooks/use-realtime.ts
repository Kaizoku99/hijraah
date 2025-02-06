import * as React from 'react';
import { RealtimeChannel, RealtimePresenceState } from '@supabase/supabase-js';
import { RealtimeService, PresenceState } from '@/lib/supabase/realtime';
import { useAuth } from '@/contexts/auth';
import { useMessageStore } from './use-message-store';
import type { ChatMessage } from '@/types/chat';

interface UseRealtimeOptions {
  channelName: string;
  sessionId?: string;
  onPresenceSync?: () => void;
  onPresenceJoin?: (presence: RealtimePresenceState<PresenceState>) => void;
  onPresenceLeave?: (presence: RealtimePresenceState<PresenceState>) => void;
  onMessage?: (payload: any) => void;
}

export function useRealtime({
  channelName,
  sessionId,
  onPresenceSync,
  onPresenceJoin,
  onPresenceLeave,
  onMessage,
}: UseRealtimeOptions) {
  const { user } = useAuth();
  const [channel, setChannel] = React.useState<RealtimeChannel | null>(null);
  const [presenceState, setPresenceState] = React.useState<RealtimePresenceState<PresenceState>>({});
  const [error, setError] = React.useState<Error | null>(null);
  const realtimeService = React.useMemo(() => new RealtimeService(), []);

  // Message store integration
  const addMessage = useMessageStore((state) => state.addMessage);
  const updateMessage = useMessageStore((state) => state.updateMessage);

  // Subscribe to presence channel
  React.useEffect(() => {
    if (!user) return;

    const subscribeToPresence = async () => {
      try {
        const newChannel = await realtimeService.subscribeToPresence(channelName, {
          onSync: () => {
            onPresenceSync?.();
            realtimeService.getPresence(channelName).then(setPresenceState);
          },
          onJoin: (presence) => {
            onPresenceJoin?.(presence);
            setPresenceState((prev) => ({ ...prev, ...presence }));
          },
          onLeave: (presence) => {
            onPresenceLeave?.(presence);
            setPresenceState((prev) => {
              const next = { ...prev };
              Object.keys(presence).forEach((key) => {
                delete next[key];
              });
              return next;
            });
          },
        });

        setChannel(newChannel);

        // Set initial presence
        await realtimeService.updatePresence(channelName, {
          user_id: user.id,
          online_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Error subscribing to presence:', err);
        setError(err as Error);
      }
    };

    subscribeToPresence();

    return () => {
      realtimeService.unsubscribeFromPresence(channelName);
    };
  }, [channelName, onPresenceSync, onPresenceJoin, onPresenceLeave, realtimeService, user]);

  // Subscribe to messages
  React.useEffect(() => {
    if (!user || (!onMessage && !sessionId)) return;

    const subscribeToMessages = async () => {
      try {
        if (sessionId) {
          // Subscribe to chat messages with store integration
          await realtimeService.subscribeToConversationUpdates(sessionId, (message: ChatMessage) => {
            if (message.id) {
              updateMessage(message.id, message);
            } else {
              addMessage(message);
            }
          });
        } else if (onMessage) {
          // Subscribe to general messages
          await realtimeService.subscribeToConversationUpdates(channelName, onMessage);
        }
      } catch (err) {
        console.error('Error subscribing to messages:', err);
        setError(err as Error);
      }
    };

    subscribeToMessages();

    return () => {
      if (sessionId) {
        realtimeService.unsubscribeFromConversation(sessionId);
      } else {
        realtimeService.unsubscribeFromConversation(channelName);
      }
    };
  }, [channelName, sessionId, onMessage, realtimeService, user, addMessage, updateMessage]);

  const updatePresence = React.useCallback(
    async (presence: Partial<PresenceState>) => {
      if (!user) return;

      try {
        await realtimeService.updatePresence(channelName, {
          ...presence,
          user_id: user.id,
        });
      } catch (err) {
        console.error('Error updating presence:', err);
        setError(err as Error);
      }
    },
    [channelName, realtimeService, user]
  );

  const broadcast = React.useCallback(
    async (message: any) => {
      if (!user) return;

      try {
        await realtimeService.broadcastToConversation(channelName, message);
      } catch (err) {
        console.error('Error broadcasting message:', err);
        setError(err as Error);
      }
    },
    [channelName, realtimeService, user]
  );

  return {
    channel,
    presenceState,
    error,
    updatePresence,
    broadcast,
  };
} 