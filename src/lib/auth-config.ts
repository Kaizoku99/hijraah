import { createClient } from "@supabase/supabase-js";
import { getRBACManager, type Role } from "./auth/rbac";
import { ExtendedUser } from "@/types/auth";
import { Database } from "@/types/supabase";

import { AuthError } from "./auth/errors";
import {
  hasPermission,
  createPermission,
  enforcePermission,
} from "./auth/rbac";

// Re-export hooks
export { useAuth, useUser, useIsAuthenticated, useHasRole } from "./auth/hooks";

// Re-export key RBAC functions
export { hasPermission, createPermission, enforcePermission };

// Environment variables for Supabase
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Define the base URL for the application
const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000");

type UserRole = Database["public"]["Enums"]["user_role"];

// Define roles for the application
const roles: Record<string, Role> = {
  // Anonymous users with minimal permissions
  GUEST: {
    name: "guest",
    permissions: ["content:read", "auth:login", "auth:register"],
  },
  // Basic authenticated users
  USER: {
    name: "user",
    permissions: [
      "profile:read",
      "profile:update",
      "auth:logout",
      "applications:create",
      "applications:read",
      "documents:upload",
      "documents:read",
      "support:create",
      "notifications:read",
    ],
    inherits: ["GUEST"],
  },
  // Users with paid subscriptions
  PREMIUM_USER: {
    name: "premium_user",
    permissions: [
      "ai:chat",
      "services:access",
      "support:priority",
      "documents:advanced",
    ],
    inherits: ["USER"],
  },
  // Customer support staff
  SUPPORT: {
    name: "support",
    permissions: [
      "tickets:manage",
      "users:view",
      "applications:view",
      "documents:view",
      "support:respond",
    ],
    inherits: ["USER"],
  },
  // Application reviewers/processors
  PROCESSOR: {
    name: "processor",
    permissions: [
      "applications:process",
      "applications:approve",
      "applications:reject",
      "applications:request-info",
      "documents:verify",
    ],
    inherits: ["USER"],
  },
  // Administrative staff
  ADMIN: {
    name: "admin",
    permissions: [
      "users:manage",
      "applications:manage",
      "system:settings",
      "reports:view",
    ],
    inherits: ["PROCESSOR", "SUPPORT"],
  },
  // Top-level system administrators
  SUPER_ADMIN: {
    name: "super_admin",
    permissions: [
      "system:full-access",
      "users:all",
      "billing:manage",
      "logs:view",
    ],
    inherits: ["ADMIN"],
  },
};

// Initialize RBAC
const rbacManager = getRBACManager({
  roles,
  superAdminRole: "SUPER_ADMIN",
  enableCache: true,
  // Extract roles from user metadata or claims
  extractRoles: (user: ExtendedUser) => {
    // Primary role from user metadata
    const primaryRole = user?.user_metadata?.role || "client";

    // Additional roles from user claims
    const additionalRoles = user?.app_metadata?.roles || [];

    return [primaryRole, ...additionalRoles];
  },
});

// Create Supabase client
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Authentication configuration
export const authConfig = {
  callbackUrl: `${BASE_URL}/auth/callback`,
  loginRedirectUrl: "/dashboard",
  logoutRedirectUrl: "/login",
  storageType: typeof window !== "undefined" ? "local" : "memory",
  keyPrefix: "hijraah_auth_",
  rbacManager,
};

/**
 * Check if the user has a specific role
 */
export function hasRole(user: any, roleName: string): boolean {
  return rbacManager.hasRole(user, roleName);
}

// Export the rbacManager for direct access
export { rbacManager };

// Assign the main exports to a named variable
const AuthLib = {
  supabaseClient,
  authConfig,
  rbacManager,
  hasRole,
  hasPermission,
  createPermission,
  enforcePermission,
};

// Export the named variable as default
export default AuthLib;
