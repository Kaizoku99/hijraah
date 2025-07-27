import { Session, User } from "@supabase/supabase-js";

import {
  createMockUser,
  createMockSession,
  createMockExtendedUser,
} from "./mock"; // Import from the new mock file
import { ExtendedUser, TypedSupabaseClient } from "./types";

/**
 * Create a mock Supabase client for testing
 */
export function createMockSupabaseClient(
  options: {
    user?: User | null;
    session?: Session | null;
    error?: Error | null;
    returnValues?: Record<string, any>;
  } = {},
): jest.Mocked<TypedSupabaseClient> {
  const user = options.user ?? createMockUser();
  const session = options.session ?? (user ? createMockSession(user) : null);

  // Create a base mock client
  const mockClient = {
    auth: {
      getSession: jest.fn().mockResolvedValue({
        data: { session },
        error: options.error || null,
      }),
      getUser: jest.fn().mockResolvedValue({
        data: { user },
        error: options.error || null,
      }),
      signInWithPassword: jest.fn().mockResolvedValue({
        data: { user, session },
        error: options.error || null,
      }),
      signInWithOAuth: jest.fn().mockResolvedValue({
        data: { provider: "google", url: "https://example.com/oauth/google" },
        error: options.error || null,
      }),
      signOut: jest.fn().mockResolvedValue({
        error: options.error || null,
      }),
      onAuthStateChange: jest.fn().mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
      }),
      refreshSession: jest.fn().mockResolvedValue({
        data: { session },
        error: options.error || null,
      }),
      setSession: jest.fn().mockResolvedValue({
        data: { session },
        error: options.error || null,
      }),
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: options.returnValues?.data || [],
          error: options.error || null,
        }),
        single: jest.fn().mockResolvedValue({
          data: options.returnValues?.singleData || null,
          error: options.error || null,
        }),
      }),
      insert: jest.fn().mockResolvedValue({
        data: options.returnValues?.insertData || null,
        error: options.error || null,
      }),
      update: jest.fn().mockResolvedValue({
        data: options.returnValues?.updateData || null,
        error: options.error || null,
      }),
      delete: jest.fn().mockResolvedValue({
        data: options.returnValues?.deleteData || null,
        error: options.error || null,
      }),
    }),
  } as unknown as jest.Mocked<TypedSupabaseClient>;

  return mockClient;
}

/**
 * Mock Next.js hooks for testing
 */
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  reload: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
};

/**
 * Mock React Context Provider for testing
 */
export function createMockAuthProvider(
  options: {
    user?: ExtendedUser | null;
    session?: Session | null;
    isLoading?: boolean;
    isAuthenticated?: boolean;
  } = {},
) {
  const user = options.user ?? createMockExtendedUser();
  const session = options.session ?? (user ? createMockSession(user) : null);
  const isLoading = options.isLoading ?? false;
  const isAuthenticated = options.isAuthenticated ?? !!session;

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    signIn: jest.fn().mockResolvedValue(undefined),
    signOut: jest.fn().mockResolvedValue(undefined),
    refreshSession: jest.fn().mockResolvedValue(undefined),
  };
}

/**
 * Setup mock middleware context
 */
export function setupMockMiddlewareContext(
  options: {
    user?: ExtendedUser | null;
    session?: Session | null;
    isAuthenticated?: boolean;
  } = {},
) {
  const user = options.user ?? createMockExtendedUser();
  const session = options.session ?? (user ? createMockSession(user) : null);
  const isAuthenticated = options.isAuthenticated ?? !!session;

  return {
    user,
    session,
    isAuthenticated,
    supabase: createMockSupabaseClient({ user, session }),
  };
}

/**
 * Testing hook to override the auth context for tests
 */
export function mockUseAuth(
  options: {
    user?: ExtendedUser | null;
    session?: Session | null;
    isLoading?: boolean;
    isAuthenticated?: boolean;
  } = {},
) {
  const mockAuthContext = createMockAuthProvider(options);

  // Mock the useAuth hook to return our mock context
  jest.mock("./hooks", () => ({
    useAuth: () => mockAuthContext,
  }));

  return mockAuthContext;
}

/**
 * Create test server action context
 */
export function createServerActionContext(
  options: {
    user?: User | null;
    session?: Session | null;
    error?: Error | null;
  } = {},
) {
  const user = options.user ?? createMockUser();
  const session = options.session ?? (user ? createMockSession(user) : null);

  return {
    user,
    session,
    mockSupabase: createMockSupabaseClient({
      user,
      session,
      error: options.error,
    }),
    mockRedirect: jest.fn(),
    mockRevalidatePath: jest.fn(),
  };
}

/**
 * Setup for testing React components that use auth
 */
export function setupAuthComponentTest(
  options: {
    user?: ExtendedUser | null;
    session?: Session | null;
    isLoading?: boolean;
    isAuthenticated?: boolean;
  } = {},
) {
  // Mock the auth context
  const mockAuth = mockUseAuth(options);

  // Mock window.location for redirect testing
  const originalLocation = window.location;
  // Instead of using delete, use a safer approach
  const mockLocation = { ...originalLocation, assign: jest.fn() };
  Object.defineProperty(window, "location", {
    value: mockLocation,
    writable: true,
  });

  return {
    mockAuth,
    cleanup: () => {
      jest.restoreAllMocks();
      Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true,
      });
    },
  };
}
