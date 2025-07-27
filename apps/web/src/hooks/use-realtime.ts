import {
  RealtimeChannel,
  RealtimePresenceState,
  RealtimePresenceJoinPayload,
  RealtimePresenceLeavePayload,
} from "@supabase/supabase-js";
import * as React from "react";

// import { RealtimeService, PresenceState } from '@/lib/supabase/realtime'; // DEPRECATED
import { useAuth } from "@/lib/auth/hooks"; // CORRECTED PATH BASED ON CODE SEARCH
import { useSupabaseBrowser } from "@/lib/supabase/client"; // ADDED
import type { ChatMessage } from "@/types/chat";

import { useMessageStore, type MessageStore } from "./useMessageStore"; // REVERTED: REMOVED .ts EXTENSION -> CORRECTED CASING


// ADDED: Define a type for the presence state payload
interface CustomPresenceState {
  user_id: string;
  online_at: string;
  [key: string]: any; // For other potential properties
}

interface UseRealtimeOptions {
  channelName: string;
  sessionId?: string;
  onPresenceSync?: () => void;
  onPresenceJoin?: (
    payload: RealtimePresenceJoinPayload<CustomPresenceState>
  ) => void;
  onPresenceLeave?: (
    payload: RealtimePresenceLeavePayload<CustomPresenceState>
  ) => void;
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
  const supabase = useSupabaseBrowser(); // ADDED: Get Supabase client via hook
  const [mainChannel, setMainChannel] = React.useState<RealtimeChannel | null>(
    null
  ); // RENAMED for clarity
  const [chatMessageChannelState, setChatMessageChannelState] =
    React.useState<RealtimeChannel | null>(null); // ADDED for chat messages
  // UPDATED PresenceState generic type
  const [presenceState, setPresenceState] = React.useState<
    RealtimePresenceState<CustomPresenceState>
  >({});
  const [error, setError] = React.useState<Error | null>(null);
  // const realtimeService = React.useMemo(() => new RealtimeService(), []); // REMOVED

  // Message store integration
  const addMessage = useMessageStore((state: MessageStore) => state.addMessage);
  const updateMessage = useMessageStore(
    (state: MessageStore) => state.updateMessage
  );

  // Subscribe to presence channel
  React.useEffect(() => {
    if (!user || !supabase) return;

    // Use channelName for presence as in original logic
    const presenceChannel = supabase.channel(`presence:${channelName}`, {
      // More specific channel topic for presence
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    presenceChannel
      .on("presence", { event: "sync" }, () => {
        onPresenceSync?.();
        setPresenceState(
          presenceChannel.presenceState() as RealtimePresenceState<CustomPresenceState>
        );
      })
      .on("presence", { event: "join" }, (payload) => {
        onPresenceJoin?.(
          payload as RealtimePresenceJoinPayload<CustomPresenceState>
        );
        setPresenceState(
          presenceChannel.presenceState() as RealtimePresenceState<CustomPresenceState>
        );
      })
      .on("presence", { event: "leave" }, (payload) => {
        onPresenceLeave?.(
          payload as RealtimePresenceLeavePayload<CustomPresenceState>
        );
        setPresenceState(
          presenceChannel.presenceState() as RealtimePresenceState<CustomPresenceState>
        );
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          try {
            await presenceChannel.track({
              user_id: user.id,
              online_at: new Date().toISOString(),
            });
          } catch (err) {
            console.error("Error tracking initial presence:", err);
            setError(err as Error);
          }
        } else if (
          status === "CHANNEL_ERROR" ||
          status === "TIMED_OUT" ||
          status === "CLOSED"
        ) {
          console.error(`Presence channel error/closed: ${status}`);
          setError(new Error(`Presence channel issue: ${status}`));
        }
      });

    setMainChannel(presenceChannel); // Store the main channel used for presence and potentially general broadcast

    return () => {
      if (presenceChannel) {
        presenceChannel.untrack();
        supabase.removeChannel(presenceChannel);
      }
    };
  }, [
    channelName,
    onPresenceSync,
    onPresenceJoin,
    onPresenceLeave,
    supabase,
    user,
  ]);

  // Subscribe to messages
  React.useEffect(() => {
    if (!user || !supabase || (!onMessage && !sessionId)) return;

    let generalMessageCleanup: (() => void) | null = null;
    let chatMessageCleanup: (() => void) | null = null;

    // Handle general messages (broadcast on mainChannel or a dedicated one)
    if (onMessage && mainChannel) {
      // Using mainChannel for general broadcast for now
      const messageEventHandler = (eventPayload: {
        type: string;
        event: string;
        payload: any;
      }) => {
        if (eventPayload.event === "message") {
          // Assuming a specific event name for broadcast
          onMessage(eventPayload.payload);
        }
      };
      mainChannel.on("broadcast", { event: "message" }, messageEventHandler);
      // Note: subscribe() was called on mainChannel already for presence.
      // If it wasn't, we'd need to call it here or ensure it's subscribed.

      generalMessageCleanup = () => {
        // mainChannel.off('broadcast', { event: 'message' }, messageEventHandler); // This API might not exist, usually unsubscription is by channel.
        // Cleanup handled by mainChannel's effect cleanup if it's the same channel.
        // If a separate channel were used for messages, it would need its own removeChannel.
      };
    }

    // Handle session-specific chat messages (Postgres changes)
    if (sessionId) {
      const chatChannelName = `chat:${sessionId}`; // Specific channel for chat messages
      const newChatMessageChannel = supabase.channel(chatChannelName);
      newChatMessageChannel
        .on(
          "postgres_changes",
          {
            event: "INSERT", // Assuming we only care about new messages
            schema: "public",
            table: "chat_messages", // ASSUMPTION: Table name
            filter: `session_id=eq.${sessionId}`, // ASSUMPTION: Column name for session ID
          },
          (payload) => {
            const message = payload.new as ChatMessage;
            if (message.id) {
              // Check if message has an id (for potential updates, though we listen for INSERT)
              updateMessage(message.id, message);
            } else {
              addMessage(message);
            }
          }
        )
        .subscribe((status, err) => {
          if (
            status === "CHANNEL_ERROR" ||
            status === "TIMED_OUT" ||
            status === "CLOSED"
          ) {
            console.error(
              `Chat message channel (${chatChannelName}) error/closed: ${status}`,
              err
            );
            setError(err || new Error(`Chat message channel issue: ${status}`));
          }
        });
      setChatMessageChannelState(newChatMessageChannel);

      chatMessageCleanup = () => {
        if (newChatMessageChannel) {
          supabase.removeChannel(newChatMessageChannel);
        }
        setChatMessageChannelState(null);
      };
    }

    return () => {
      generalMessageCleanup?.();
      chatMessageCleanup?.();
    };
  }, [
    mainChannel,
    channelName,
    sessionId,
    onMessage,
    supabase,
    user,
    addMessage,
    updateMessage,
  ]);

  const updatePresence = React.useCallback(
    async (presenceUpdate: Partial<CustomPresenceState>) => {
      if (!user || !mainChannel) return;

      try {
        await mainChannel.track({
          ...presenceUpdate,
          user_id: user.id, // Ensure user_id is always part of the tracked presence
        });
      } catch (err) {
        console.error("Error updating presence:", err);
        setError(err as Error);
      }
    },
    [mainChannel, user]
  );

  const broadcast = React.useCallback(
    async (message: any) => {
      if (!user || !mainChannel) return;

      try {
        // Assuming a general 'message' event for broadcast, adjust if needed
        await mainChannel.send({
          type: "broadcast",
          event: "message",
          payload: message,
        });
      } catch (err) {
        console.error("Error broadcasting message:", err);
        setError(err as Error);
      }
    },
    [mainChannel, user]
  );

  return {
    channel: mainChannel, // EXPOSING mainChannel, might need to expose chatMessageChannel too if needed
    presenceState,
    error,
    updatePresence,
    broadcast,
  };
}
