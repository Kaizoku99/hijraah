import { Database } from '@/types/supabase.ts';
import { createClient } from '@supabase/supabase-js';
import { RealtimeChannel } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface PresenceState {
  user_id: string;
  conversation_id: string;
  is_typing: boolean;
  last_seen: string;
}

export class PresenceManager {
  private channel: RealtimeChannel | null = null;
  private presenceStates = new Map<string, PresenceState>();

  async join(conversationId: string, userId: string) {
    if (this.channel) {
      await this.leave();
    }

    this.channel = supabase.channel(`presence:${conversationId}`, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    this.channel
      .on('presence', { event: 'sync' }, () => {
        const state = this.channel?.presenceState() ?? {};
        this.presenceStates = new Map(
          Object.entries(state).map(([key, value]) => [
            key,
            (value as any[])[0] as PresenceState,
          ]),
        );
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        const state = newPresences[0] as PresenceState;
        this.presenceStates.set(key, state);
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        this.presenceStates.delete(key);
      });

    await this.channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await this.channel?.track({
          user_id: userId,
          conversation_id: conversationId,
          is_typing: false,
          last_seen: new Date().toISOString(),
        });
      }
    });
  }

  async leave() {
    if (this.channel) {
      await this.channel.unsubscribe();
      this.channel = null;
      this.presenceStates.clear();
    }
  }

  async updateTypingStatus(isTyping: boolean) {
    if (this.channel) {
      await this.channel.track({
        ...this.getCurrentState(),
        is_typing: isTyping,
        last_seen: new Date().toISOString(),
      });
    }
  }

  getTypingUsers(): string[] {
    return Array.from(this.presenceStates.values())
      .filter((state) => state.is_typing)
      .map((state) => state.user_id);
  }

  getOnlineUsers(): string[] {
    return Array.from(this.presenceStates.values()).map(
      (state) => state.user_id,
    );
  }

  private getCurrentState(): PresenceState | null {
    if (!this.channel) return null;
    const state = this.channel.presenceState();
    const userId = this.channel.config?.presence?.key;
    if (!userId || !state[userId]) return null;
    return (state[userId] as any[])[0] as PresenceState;
  }
}