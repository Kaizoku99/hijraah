import { Session, User } from "@supabase/supabase-js";

import { ExtendedUser } from "./types";

/**
 * Create a mock authenticated user
 */
export function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: "mock-user-id",
    app_metadata: {},
    user_metadata: {
      full_name: "Mock User",
      avatar_url: "https://example.com/avatar.png",
      role: "user",
    },
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email: "mock@example.com",
    phone: "",
    role: "", // Base Supabase User type might not have a top-level role
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Create a mock extended user based on our application's needs
 */
export function createMockExtendedUser(
  overrides: Partial<ExtendedUser> = {},
): ExtendedUser {
  const user = createMockUser(overrides); // Utilize the base mock user

  return {
    ...user,
    fullName: user.user_metadata?.full_name || "Mock User",
    avatarUrl:
      user.user_metadata?.avatar_url || "https://example.com/avatar.png",
    // Prefer role from metadata, default to 'user' if not present
    role: user.user_metadata?.role || "user",
    // Allow overriding calculated fields if needed
    ...overrides,
  } as ExtendedUser; // Added 'as ExtendedUser' for type safety if overrides could re-add isAdmin
}

/**
 * Create a mock session
 */
export function createMockSession(user: User = createMockUser()): Session {
  return {
    access_token: "mock-access-token",
    refresh_token: "mock-refresh-token",
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: "bearer",
    user,
  };
}
