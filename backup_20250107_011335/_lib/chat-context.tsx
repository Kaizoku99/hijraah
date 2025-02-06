"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Message } from 'ai';

interface ChatState {
  messages: Message[];
  documents: { url: string; name: string }[];
  isProcessing: boolean;
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'ADD_DOCUMENT'; payload: { url: string; name: string } }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'CLEAR_CHAT' };

const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | null>(null);

const initialState: ChatState = {
  messages: [],
  documents: [],
  isProcessing: false,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [...state.documents, action.payload],
      };
    case 'SET_PROCESSING':
      return {
        ...state,
        isProcessing: action.payload,
      };
    case 'CLEAR_CHAT':
      return initialState;
    default:
      return state;
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}