import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { AuthError } from "./errors";
import { ExtendedUser } from "@/types/auth";
import { aiChatbotUser } from "@/../../packages/database/src/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { Client } from "pg";
import type { Database } from "@/types/database.types";

// Context7 - Provider Isolation: Guest user patterns
export const GUEST_EMAIL_PATTERN = /^guest_[a-f0-9]{16}@guest\.local$/;
export const GUEST_USER_PREFIX = "guest_";
export const GUEST_DOMAIN = "guest.local";

// Guest user type definition with Context7 observability
export interface GuestUser {
  id: string;
  email: string;
  type: "guest";
  isTemporary: boolean;
  createdAt: Date;
  expiresAt?: Date;
  metadata?: {
    sessionId?: string;
    userAgent?: string;
    ipAddress?: string;
  };
}

// Extended user type with guest support for Supabase Auth
export type UserWithGuest = ExtendedUser & {
  userType?: "guest" | "regular";
  isGuest?: boolean;
  guestSessionId?: string;
};

/**
 * Check if an email matches the guest pattern
 * Context7 - Data validation
 */
export function isGuestEmail(email: string): boolean {
  return GUEST_EMAIL_PATTERN.test(email);
}

/**
 * Check if a user is a guest user
 * Context7 - Type safety and validation
 */
export function isGuestUser(user: ExtendedUser | null): boolean {
  if (!user?.email) return false;
  return isGuestEmail(user.email);
}

/**
 * Generate a unique guest email
 * Context7 - Predictable and traceable ID generation
 */
export function generateGuestEmail(): string {
  const timestamp = Date.now().toString(16);
  const random = Math.random().toString(16).substring(2, 10);
  return `${GUEST_USER_PREFIX}${timestamp}${random}@${GUEST_DOMAIN}`;
}

/**
 * Create a guest user in the ai-chatbot compatibility table
 * Context7 - Data-as-Code: Consistent database operations
 * @server-only
 */
export async function createGuestUser(): Promise<{
  id: string;
  email: string;
}> {
  try {
    // Generate guest credentials
    const guestEmail = generateGuestEmail();

    // Get database connection
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new AuthError("Database connection not configured");
    }

    const client = postgres.default(connectionString);
    const db = drizzle(client);

    // Insert into ai-chatbot User table for compatibility
    const [guestUser] = await db
      .insert(aiChatbotUser)
      .values({
        email: guestEmail,
        password: null, // Guest users don't have passwords
      })
      .returning({ id: aiChatbotUser.id, email: aiChatbotUser.email });

    await client.end();

    if (!guestUser) {
      throw new AuthError("Failed to create guest user");
    }

    // Context7 - Observability: Log guest user creation
    console.log("Guest user created:", guestUser.id, guestUser.email);

    return {
      id: guestUser.id,
      email: guestUser.email,
    };
  } catch (error) {
    console.error("Failed to create guest user:", error);
    throw new AuthError("Failed to create guest user");
  }
}

/**
 * Get guest user by email from ai-chatbot table
 * Context7 - Data-as-Code: Consistent data access patterns
 * @server-only
 */
export async function getGuestUser(email: string): Promise<{
  id: string;
  email: string;
  password: string | null;
} | null> {
  try {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new AuthError("Database connection not configured");
    }

    const client = postgres(connectionString);
    const db = drizzle(client);

    const [user] = await db
      .select({
        id: aiChatbotUser.id,
        email: aiChatbotUser.email,
        password: aiChatbotUser.password,
      })
      .from(aiChatbotUser)
      .where(eq(aiChatbotUser.email, email))
      .limit(1);

    await client.end();

    return user || null;
  } catch (error) {
    console.error("Failed to get guest user:", error);
    return null;
  }
}

/**
 * Create a Supabase client for guest operations
 * Context7 - Provider Isolation: Dedicated client for guest operations
 */
function createGuestSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false, // Guests don't persist sessions in Supabase
        autoRefreshToken: false,
      },
    }
  );
}

/**
 * Create a server Supabase client for guest operations
 * Context7 - Provider Isolation: Server-side client configuration
 */
function createGuestServerClient(cookieStore?: any) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieStore
        ? {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: any) {
              cookieStore.set(name, value, options);
            },
            remove(name: string, options: any) {
              cookieStore.set(name, "", { ...options, maxAge: 0 });
            },
          }
        : undefined,
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

/**
 * Create a guest session using Supabase Auth custom JWT
 * Context7 - Resumability: Stateless guest sessions
 */
export async function createGuestSession(metadata?: {
  userAgent?: string;
  ipAddress?: string;
}): Promise<UserWithGuest> {
  try {
    // Create guest user in the database first
    const guestUser = await createGuestUser();

    // Generate a custom session ID for tracking
    const sessionId = `guest_session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Create extended user object for guest
    const extendedGuestUser: UserWithGuest = {
      id: guestUser.id,
      email: guestUser.email,
      fullName: "Guest User",
      avatarUrl: "",
      role: "client",
      userType: "guest",
      isGuest: true,
      guestSessionId: sessionId,
      user_metadata: {
        full_name: "Guest User",
        role: "client",
        is_guest: true,
        session_id: sessionId,
        ...metadata,
      },
      app_metadata: {
        provider: "guest",
        providers: ["guest"],
      },
      aud: "authenticated",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Context7 - Observability: Log guest session creation
    console.log(`Guest session created: ${sessionId} for user ${guestUser.id}`);

    return extendedGuestUser;
  } catch (error) {
    console.error("Failed to create guest session:", error);
    throw new AuthError("Failed to create guest session");
  }
}

/**
 * Store guest session in cookies (server-side)
 * Context7 - Provider Isolation: Secure cookie management
 */
export function setGuestSessionCookies(
  guestUser: UserWithGuest,
  cookieStore: any,
  maxAge: number = 24 * 60 * 60 // 24 hours
): void {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge,
      path: "/",
    };

    // Set guest session data
    cookieStore.set("guest_user_id", guestUser.id, cookieOptions);
    cookieStore.set(
      "guest_session_id",
      guestUser.guestSessionId || "",
      cookieOptions
    );
    cookieStore.set("is_guest_user", "true", {
      ...cookieOptions,
      httpOnly: false, // Allow client-side access
    });

    // Store minimal guest data for client access
    const clientGuestData = {
      id: guestUser.id,
      email: guestUser.email,
      fullName: guestUser.fullName,
      isGuest: true,
      sessionId: guestUser.guestSessionId,
    };

    cookieStore.set("guest_data", JSON.stringify(clientGuestData), {
      ...cookieOptions,
      httpOnly: false, // Allow client-side access
    });
  } catch (error) {
    console.error("Failed to set guest session cookies:", error);
  }
}

/**
 * Get guest session from cookies (server-side)
 * Context7 - Resumability: Retrieve stateless sessions
 */
export function getGuestSessionFromCookies(
  cookieStore: any
): UserWithGuest | null {
  try {
    const isGuest = cookieStore.get("is_guest_user")?.value === "true";
    const guestUserId = cookieStore.get("guest_user_id")?.value;
    const guestSessionId = cookieStore.get("guest_session_id")?.value;
    const guestDataStr = cookieStore.get("guest_data")?.value;

    if (!isGuest || !guestUserId || !guestDataStr) {
      return null;
    }

    const guestData = JSON.parse(guestDataStr);

    const guestUser: UserWithGuest = {
      id: guestUserId,
      email: guestData.email,
      fullName: guestData.fullName || "Guest User",
      avatarUrl: "",
      role: "client",
      userType: "guest",
      isGuest: true,
      guestSessionId: guestSessionId,
      user_metadata: {
        full_name: guestData.fullName || "Guest User",
        role: "client",
        is_guest: true,
        session_id: guestSessionId,
      },
      app_metadata: {
        provider: "guest",
        providers: ["guest"],
      },
      aud: "authenticated",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return guestUser;
  } catch (error) {
    console.error("Failed to get guest session from cookies:", error);
    return null;
  }
}

/**
 * Clear guest session cookies
 * Context7 - Data lifecycle management
 */
export function clearGuestSessionCookies(cookieStore: any): void {
  try {
    const cookieOptions = {
      path: "/",
      maxAge: 0,
    };

    cookieStore.set("guest_user_id", "", cookieOptions);
    cookieStore.set("guest_session_id", "", cookieOptions);
    cookieStore.set("is_guest_user", "", cookieOptions);
    cookieStore.set("guest_data", "", cookieOptions);
  } catch (error) {
    console.error("Failed to clear guest session cookies:", error);
  }
}

/**
 * Convert guest user to regular user using Supabase Auth
 * Context7 - Data transformation with observability
 */
export async function convertGuestToRegular(
  guestUserId: string,
  email: string,
  password: string,
  fullName?: string
): Promise<UserWithGuest> {
  try {
    const supabase = createGuestSupabaseClient();

    // Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || "User",
          converted_from_guest: true,
          original_guest_id: guestUserId,
        },
      },
    });

    if (error) {
      throw new AuthError(
        `Failed to convert guest to regular user: ${error.message}`
      );
    }

    if (!data.user) {
      throw new AuthError("No user data returned after conversion");
    }

    // Create extended user
    const extendedUser: UserWithGuest = {
      ...data.user,
      fullName: fullName || data.user.user_metadata?.full_name || "User",
      avatarUrl: data.user.user_metadata?.avatar_url || "",
      role: data.user.user_metadata?.role || "client",
      userType: "regular",
      isGuest: false,
    };

    // Context7 - Observability: Log conversion
    console.log(
      `Guest user ${guestUserId} converted to regular user ${data.user.id}`
    );

    return extendedUser;
  } catch (error) {
    console.error("Failed to convert guest to regular user:", error);
    throw error instanceof AuthError
      ? error
      : new AuthError("Conversion failed");
  }
}

/**
 * Server-side function to check authentication with guest support
 * Context7 - Unified authentication flow
 * @server-only
 */
export async function checkAuthWithGuest(request?: any): Promise<{
  user: UserWithGuest | null;
  session: any | null;
  isAuthenticated: boolean;
  isGuest: boolean;
}> {
  try {
    const cookieStore = request
      ? {
          get: (name: string) => request.cookies.get(name),
          set: () => {}, // No-op for read operations
        }
      : cookies();

    // First check for guest session
    const guestUser = getGuestSessionFromCookies(cookieStore);
    if (guestUser) {
      return {
        user: guestUser,
        session: null, // Guests don't have Supabase sessions
        isAuthenticated: true,
        isGuest: true,
      };
    }

    // Then try regular Supabase authentication
    const supabase = createGuestServerClient(cookieStore);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!error && user) {
      // Regular authenticated user
      const extendedUser: UserWithGuest = {
        ...user,
        fullName:
          user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
        avatarUrl: user.user_metadata?.avatar_url || "",
        role: user.user_metadata?.role || "client",
        userType: "regular",
        isGuest: false,
      };

      const {
        data: { session },
      } = await supabase.auth.getSession();

      return {
        user: extendedUser,
        session,
        isAuthenticated: true,
        isGuest: false,
      };
    }

    // No authentication found
    return {
      user: null,
      session: null,
      isAuthenticated: false,
      isGuest: false,
    };
  } catch (error) {
    console.error("Authentication check failed:", error);
    return {
      user: null,
      session: null,
      isAuthenticated: false,
      isGuest: false,
    };
  }
}

// Context7 - Modular exports for clean dependency management
export const supabaseGuestAuth = {
  isGuestEmail,
  isGuestUser,
  generateGuestEmail,
  createGuestUser,
  getGuestUser,
  createGuestSession,
  setGuestSessionCookies,
  getGuestSessionFromCookies,
  clearGuestSessionCookies,
  convertGuestToRegular,
  checkAuthWithGuest,
  createGuestSupabaseClient,
  createGuestServerClient,
  GUEST_EMAIL_PATTERN,
  GUEST_USER_PREFIX,
  GUEST_DOMAIN,
};
