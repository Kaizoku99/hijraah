import { renderHook, act } from "@testing-library/react";

import { useAuth } from "@/contexts/auth";
import { ChatProvider, useChat } from "@/contexts/chat";
import { createClient } from "@/lib/supabase/client";

// Mock dependencies
jest.mock("@/lib/supabase/client");
jest.mock("@/contexts/auth");

const mockSupabase = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        order: jest.fn(() => ({
          data: [],
          error: null,
        })),
      })),
    })),
    insert: jest.fn(() => ({
      select: jest.fn(() => ({
        single: jest.fn(() => ({
          data: { id: "session-1", user_id: "user-1", status: "active" },
          error: null,
        })),
      })),
    })),
  })),
  channel: jest.fn(() => ({
    on: jest.fn(() => ({
      subscribe: jest.fn(),
    })),
  })),
  removeChannel: jest.fn(),
};

const mockUser = {
  id: "user-1",
  email: "test@example.com",
};

describe("ChatContext", () => {
  beforeEach(() => {
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
  });

  it("provides initial state", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ChatProvider>{children}</ChatProvider>
    );

    const { result } = renderHook(() => useChat(), { wrapper });

    expect(result.current.messages).toEqual([]);
    expect(result.current.session).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();
  });

  it("starts a new session", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ChatProvider>{children}</ChatProvider>
    );

    const { result } = renderHook(() => useChat(), { wrapper });

    await act(async () => {
      await result.current.startNewSession();
    });

    expect(result.current.session).toEqual({
      id: "session-1",
      user_id: "user-1",
      status: "active",
    });
    expect(result.current.messages).toEqual([]);
  });

  it("sends a message", async () => {
    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve({
          content: "AI response",
          model: "gpt-4",
          tokens: 10,
        }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ChatProvider>{children}</ChatProvider>
    );

    const { result } = renderHook(() => useChat(), { wrapper });

    // Start a session first
    await act(async () => {
      await result.current.startNewSession();
    });

    // Send a message
    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.messages).toHaveLength(2); // User message + AI response
    expect(result.current.messages[0].content).toBe("Hello");
    expect(result.current.messages[1].content).toBe("AI response");
  });

  it("handles errors gracefully", async () => {
    mockSupabase.from.mockImplementationOnce(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({
            data: null,
            error: new Error("Database error"),
          })),
        })),
      })),
    }));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ChatProvider>{children}</ChatProvider>
    );

    const { result } = renderHook(() => useChat(), { wrapper });

    await act(async () => {
      await result.current.startNewSession();
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.message).toBe("Database error");
  });

  it("loads an existing session", async () => {
    mockSupabase.from.mockImplementationOnce(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: {
              id: "session-1",
              user_id: "user-1",
              status: "active",
            },
            error: null,
          })),
        })),
      })),
    }));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ChatProvider>{children}</ChatProvider>
    );

    const { result } = renderHook(() => useChat(), { wrapper });

    await act(async () => {
      await result.current.loadSession("session-1");
    });

    expect(result.current.session).toBeTruthy();
    expect(result.current.session?.id).toBe("session-1");
  });

  it("clears the session", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ChatProvider>{children}</ChatProvider>
    );

    const { result } = renderHook(() => useChat(), { wrapper });

    // Start a session
    await act(async () => {
      await result.current.startNewSession();
    });

    expect(result.current.session).toBeTruthy();

    // Clear the session
    act(() => {
      result.current.clearSession();
    });

    expect(result.current.session).toBeNull();
    expect(result.current.messages).toEqual([]);
  });
});
