import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";
import { ExtendedUser } from "@/types/auth";
import {
  UserWithGuest,
  isGuestEmail,
  getGuestSessionFromCookies,
} from "./auth/guest";

// Context7 - Provider Isolation: Supabase Auth configuration
export interface AuthConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceKey?: string;
  redirectUrl?: string;
  guestSessionEnabled: boolean;
  sessionTimeout: number;
}

// Context7 - Data-as-Code: Configuration with environment variables
export const authConfig: AuthConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  redirectUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  guestSessionEnabled: process.env.NEXT_PUBLIC_GUEST_AUTH_ENABLED === "true",
  sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || "3600", 10), // 1 hour default
};

// Context7 - Provider Isolation: Supabase client factory
export function createSupabaseClient() {
  return createClient<Database>(
    authConfig.supabaseUrl,
    authConfig.supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    },
  );
}

// Context7 - Provider Isolation: Server-side Supabase client factory
export function createSupabaseServerClient(cookieStore?: any) {
  return createServerClient<Database>(
    authConfig.supabaseUrl,
    authConfig.supabaseAnonKey,
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
        : {
            get(name: string) {
              return cookies().get(name)?.value;
            },
            set(name: string, value: string, options: any) {
              cookies().set(name, value, options);
            },
            remove(name: string, options: any) {
              cookies().set(name, "", { ...options, maxAge: 0 });
            },
          },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  );
}

// Context7 - Provider Isolation: Admin client for server operations
export function createSupabaseServiceClient() {
  if (!authConfig.supabaseServiceKey) {
    throw new Error("Supabase service key not configured");
  }

  return createClient<Database>(
    authConfig.supabaseUrl,
    authConfig.supabaseServiceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

// Role-based permissions for Context7 compliance
export type UserRole = "client" | "admin" | "moderator";

// Context7 - Data-as-Code: Permission matrix
export const permissions = {
  client: [
    "chat:create",
    "chat:read",
    "chat:update:own",
    "chat:delete:own",
    "artifacts:create",
    "artifacts:read",
    "artifacts:update:own",
    "artifacts:delete:own",
    "profile:read:own",
    "profile:update:own",
  ],
  guest: [
    "chat:create",
    "chat:read:own",
    "artifacts:create",
    "artifacts:read:own",
    "session:temporary",
  ],
  moderator: [
    "chat:read:all",
    "chat:moderate",
    "artifacts:read:all",
    "artifacts:moderate",
    "users:read",
    "reports:create",
    "reports:read",
  ],
  admin: [
    "chat:read:all",
    "chat:update:all",
    "chat:delete:all",
    "artifacts:read:all",
    "artifacts:update:all",
    "artifacts:delete:all",
    "users:read:all",
    "users:update:all",
    "users:delete:all",
    "system:admin",
    "reports:read:all",
    "reports:resolve",
  ],
} as const;

/**
 * Check if user has specific permission
 * Context7 - Observability: Permission checking with logging
 */
export function hasPermission(
  user: ExtendedUser | UserWithGuest | null,
  permission: string,
): boolean {
  if (!user) return false;

  // Handle guest users
  if ("isGuest" in user && user.isGuest) {
    return permissions.guest.includes(permission as any);
  }

  const userRole = user.role as UserRole;
  if (!userRole || !permissions[userRole]) {
    console.warn("Unknown user role:", userRole);
    return false;
  }

  return permissions[userRole].includes(permission as any);
}

/**
 * Get user permissions list
 * Context7 - Data-as-Code: Predictable permission resolution
 */
export function getUserPermissions(
  user: ExtendedUser | UserWithGuest | null,
): string[] {
  if (!user) return [];

  // Handle guest users
  if ("isGuest" in user && user.isGuest) {
    return [...permissions.guest];
  }

  const userRole = user.role as UserRole;
  if (!userRole || !permissions[userRole]) {
    return [];
  }

  return [...permissions[userRole]];
}

/**
 * Enhanced authentication check with guest support
 * Context7 - Unified authentication flow with observability
 */
export async function getAuthenticatedUser(request?: any): Promise<{
  user: UserWithGuest | null;
  session: any | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  permissions: string[];
}> {
  try {
    const cookieStore = request
      ? {
          get: (name: string) => request.cookies.get(name),
          set: () => {}, // No-op for read operations
        }
      : cookies();

    // Context7 - Provider Isolation: Check guest session first if enabled
    if (authConfig.guestSessionEnabled) {
      const guestUser = getGuestSessionFromCookies(cookieStore);
      if (guestUser) {
        return {
          user: guestUser,
          session: null, // Guests don't have Supabase sessions
          isAuthenticated: true,
          isGuest: true,
          permissions: getUserPermissions(guestUser),
        };
      }
    }

    // Check regular Supabase authentication
    const supabase = createSupabaseServerClient(cookieStore);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!error && user) {
      // Convert Supabase user to ExtendedUser
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
        permissions: getUserPermissions(extendedUser),
      };
    }

    // No authentication found
    return {
      user: null,
      session: null,
      isAuthenticated: false,
      isGuest: false,
      permissions: [],
    };
  } catch (error) {
    console.error("Authentication check failed:", error);
    return {
      user: null,
      session: null,
      isAuthenticated: false,
      isGuest: false,
      permissions: [],
    };
  }
}

/**
 * Require authentication middleware
 * Context7 - Modularity: Reusable auth guard
 */
export function requireAuth(requiredPermission?: string) {
  return async (request?: any) => {
    const auth = await getAuthenticatedUser(request);

    if (!auth.isAuthenticated) {
      throw new Error("Authentication required");
    }

    if (requiredPermission && !hasPermission(auth.user, requiredPermission)) {
      throw new Error(`Permission required: ${requiredPermission}`);
    }

    return auth;
  };
}

/**
 * Convert ExtendedUser to UserWithGuest
 * Context7 - Data transformation utility
 */
export function extendUserWithGuest(user: ExtendedUser): UserWithGuest {
  return {
    ...user,
    userType: isGuestEmail(user.email || "") ? "guest" : "regular",
    isGuest: isGuestEmail(user.email || ""),
  };
}

// Context7 - Modular exports for clean dependency management
export const supabaseAuth = {
  config: authConfig,
  createClient: createSupabaseClient,
  createServerClient: createSupabaseServerClient,
  createServiceClient: createSupabaseServiceClient,
  getAuthenticatedUser,
  requireAuth,
  hasPermission,
  getUserPermissions,
  extendUserWithGuest,
  permissions,
};

// Export for backward compatibility
export default supabaseAuth;
