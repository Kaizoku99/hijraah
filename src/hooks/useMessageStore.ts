import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import type { ChatMessage } from '@/types/chat';

interface MessageState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: Error | null;
}

interface MessageActions {
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

type MessageStore = MessageState & MessageActions;

export const useMessageStore = create<MessageStore>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      error: null,
      addMessage: (message) => 
        set((state) => ({ messages: [...state.messages, message] })),
      updateMessage: (id, updates) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, ...updates } : msg
          ),
        })),
      setMessages: (messages) => set({ messages }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error })
    }),
    {
      name: 'chat-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 