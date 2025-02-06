import { RealtimeChannel, RealtimePresenceState } from '@supabase/supabase-js';
import { getSupabaseClient } from './client';

// Define proper presence types
export interface PresenceState {
  user_id: string;
  online_at: string;
  typing?: boolean;
  conversation_id?: string;
}

type SupabasePresence = {
  presence_ref: string;
} & Record<string, any>;

interface ChannelState {
  channel: RealtimeChannel;
  lastConnectionAttempt: number;
  retryCount: number;
  status: 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED' | 'ERROR';
}

export class RealtimeService {
  private channels: Map<string, ChannelState> = new Map();
  private readonly MAX_RETRY_ATTEMPTS = 5;
  private readonly INITIAL_RETRY_DELAY = 1000;
  
  private async getClient() {
    return getSupabaseClient();
  }

  private getBackoffDelay(retryCount: number): number {
    return Math.min(
      this.INITIAL_RETRY_DELAY * Math.pow(2, retryCount),
      30000 // Max 30 seconds
    );
  }

  async subscribeToPresence(channelName: string, callbacks: {
    onSync?: () => void;
    onJoin?: (presence: RealtimePresenceState<PresenceState>) => void;
    onLeave?: (presence: RealtimePresenceState<PresenceState>) => void;
    onError?: (error: Error) => void;
  } = {}) {
    try {
      const client = await this.getClient();
      
      // Get or create channel state
      let channelState = this.channels.get(channelName);
      if (!channelState) {
        const channel = client.channel(channelName, {
          config: {
            presence: {
              key: 'presence_state',
            },
          },
        });

        channelState = {
          channel,
          lastConnectionAttempt: Date.now(),
          retryCount: 0,
          status: 'CONNECTING',
        };
        this.channels.set(channelName, channelState);
      }

      const { channel } = channelState;

      // Subscribe to presence events with proper typing
      channel.on('presence', { event: 'sync' }, () => {
        channelState!.status = 'CONNECTED';
        channelState!.retryCount = 0;
        callbacks.onSync?.();
      });

      channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
        const presence: RealtimePresenceState<PresenceState> = {
          [key]: (newPresences as SupabasePresence[]).map(p => ({
            user_id: p.user_id,
            online_at: p.online_at,
            typing: p.typing,
            conversation_id: p.conversation_id,
            presence_ref: p.presence_ref,
          }))
        };
        callbacks.onJoin?.(presence);
      });

      channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        const presence: RealtimePresenceState<PresenceState> = {
          [key]: (leftPresences as SupabasePresence[]).map(p => ({
            user_id: p.user_id,
            online_at: p.online_at,
            typing: p.typing,
            conversation_id: p.conversation_id,
            presence_ref: p.presence_ref,
          }))
        };
        callbacks.onLeave?.(presence);
      });

      // Handle connection errors
      channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          channelState!.status = 'CONNECTED';
          return;
        }

        if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          channelState!.status = 'ERROR';
          
          // Implement exponential backoff for reconnection
          if (channelState!.retryCount < this.MAX_RETRY_ATTEMPTS) {
            const delay = this.getBackoffDelay(channelState!.retryCount);
            channelState!.retryCount++;
            channelState!.lastConnectionAttempt = Date.now();

            // Attempt reconnection
            setTimeout(async () => {
              try {
                await this.subscribeToPresence(channelName, callbacks);
              } catch (error) {
                callbacks.onError?.(error as Error);
              }
            }, delay);
          } else {
            callbacks.onError?.(new Error(`Failed to connect after ${this.MAX_RETRY_ATTEMPTS} attempts`));
          }
        }
      });

      return channel;
    } catch (error) {
      console.error('Error subscribing to presence:', error);
      callbacks.onError?.(error as Error);
      throw error;
    }
  }

  async updatePresence(channelName: string, presence: Partial<PresenceState>) {
    try {
      const channelState = this.channels.get(channelName);
      if (!channelState) {
        throw new Error('Channel not found');
      }

      if (channelState.status !== 'CONNECTED') {
        throw new Error('Channel not connected');
      }

      await channelState.channel.track(presence);
    } catch (error) {
      console.error('Error updating presence:', error);
      throw error;
    }
  }

  async getPresence(channelName: string): Promise<RealtimePresenceState<PresenceState>> {
    try {
      const channelState = this.channels.get(channelName);
      if (!channelState) {
        throw new Error('Channel not found');
      }

      return channelState.channel.presenceState() as RealtimePresenceState<PresenceState>;
    } catch (error) {
      console.error('Error getting presence:', error);
      throw error;
    }
  }

  async unsubscribeFromPresence(channelName: string) {
    try {
      const channelState = this.channels.get(channelName);
      if (channelState) {
        await channelState.channel.unsubscribe();
        this.channels.delete(channelName);
      }
    } catch (error) {
      console.error('Error unsubscribing from presence:', error);
      throw error;
    }
  }

  async subscribeToConversationUpdates(conversationId: string, onUpdate: (payload: any) => void) {
    try {
      const client = await this.getClient();
      const channel = client.channel(`conversation:${conversationId}`);

      channel
        .on('broadcast', { event: 'message' }, ({ payload }) => {
          onUpdate(payload);
        })
        .subscribe();

      return channel;
    } catch (error) {
      console.error('Error subscribing to conversation updates:', error);
      throw error;
    }
  }

  async broadcastToConversation(conversationId: string, message: any) {
    try {
      const client = await this.getClient();
      const channel = client.channel(`conversation:${conversationId}`);

      await channel.send({
        type: 'broadcast',
        event: 'message',
        payload: message,
      });
    } catch (error) {
      console.error('Error broadcasting to conversation:', error);
      throw error;
    }
  }
} 