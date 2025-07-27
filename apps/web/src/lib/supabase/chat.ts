import { withCircuitBreaker } from "../circuit-breaker";

import { getSupabaseClient } from "./client";

import type { Database } from "@/types/database.types";

export type ChatSession = Database["public"]["Tables"]["chat_sessions"]["Row"];
export type ChatMessage = Database["public"]["Tables"]["chat_messages"]["Row"];

export const createChatSession = withCircuitBreaker(
  "chat.createSession",
  async (userId: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("chat_sessions")
      .insert({ user_id: userId, title: "New Chat" })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

export const getChatSessions = withCircuitBreaker(
  "chat.getSessions",
  async (userId: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }
);

export const getChatMessages = withCircuitBreaker(
  "chat.getMessages",
  async (sessionId: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  }
);

export const sendChatMessage = withCircuitBreaker(
  "chat.sendMessage",
  async (sessionId: string, content: string, role: "user" | "assistant") => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        session_id: sessionId,
        content,
        role,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

export const subscribeToChatMessages = (
  sessionId: string,
  callback: (message: ChatMessage) => void
) => {
  const supabase = getSupabaseClient();
  return supabase
    .channel(`chat:${sessionId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_messages",
        filter: `session_id=eq.${sessionId}`,
      },
      (payload) => {
        callback(payload.new as ChatMessage);
      }
    )
    .subscribe();
};
