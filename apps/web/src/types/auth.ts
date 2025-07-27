// This file is the single source of truth for Authentication and RBAC related types

import { Session, User, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";

// RBAC Types (from former rbac.ts)
export type Permission = string;

export interface Role {
  name: string;
  description?: string;
  permissions: Permission[];
  inherits?: string[];
}

export interface RBACOptions {
  roles?: Record<string, Role>;
  superAdminRole?: string;
  enableCache?: boolean;
  extractRoles?: (user: ExtendedUser) => string[];
}

// Auth Types (from former src/lib/auth/types.ts)
export interface UserSettings {
  theme: string;
  language: string;
  emailNotifications: boolean;
  documentReminders: boolean;
  applicationUpdates: boolean;
  twoFactorAuth: boolean;
}

export type ExtendedUser = User & {
  fullName: string;
  avatarUrl: string;
  role: Database["public"]["Enums"]["user_role"]; // Updated to use the enum from database
  isAdmin?: boolean; // Consider deriving from a hasPermission('admin.access') or similar
  settings?: UserSettings;
  hasTwoFactorAuth?: () => boolean;
  updateSettings?: (settings: Partial<UserSettings>) => ExtendedUser;
  toObject?: () => Record<string, any>;
};

export type AuthProvider = "google" | "github" | "email" | "phone" | "azure"; // Added azure from old types.ts

export interface AuthContextType {
  user: ExtendedUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: any | null; // Consider a more specific error type
  signIn: (provider: AuthProvider, options?: any) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  signUp: (options: {
    email: string;
    password: string;
    fullName?: string;
    redirectTo?: string;
  }) => Promise<any>; // Consider specific result type
  resetPassword: (email: string, redirectTo?: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
  hasPermission?: (permission: Permission) => boolean; // Added from old types.ts
}

export interface AuthMiddlewareContext {
  user: ExtendedUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  supabase: SupabaseClient<Database>; // Use SupabaseClient<Database> here
  hasPermission?: (permission: Permission) => boolean;
}

// Utility function (can live here or be moved to a helpers file if it grows)
export function createExtendedUser(user: User | null): ExtendedUser | null {
  if (!user) return null;

  const role = (user.user_metadata?.role ||
    "client") as Database["public"]["Enums"]["user_role"];
  const isAdmin = role === "admin"; // This isAdmin flag should be used cautiously, prefer RBAC checks

  const settings: UserSettings = {
    theme: user.user_metadata?.settings_theme || "system",
    language: user.user_metadata?.settings_language || "en",
    emailNotifications:
      user.user_metadata?.settings_emailNotifications || false,
    documentReminders: user.user_metadata?.settings_documentReminders || false,
    applicationUpdates:
      user.user_metadata?.settings_applicationUpdates || false,
    twoFactorAuth: user.user_metadata?.settings_twoFactorAuth || false,
  };

  const extendedUser: ExtendedUser = {
    ...user,
    fullName:
      user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
    avatarUrl: user.user_metadata?.avatar_url || "",
    role,
    isAdmin,
    settings,
    hasTwoFactorAuth: () => settings.twoFactorAuth,
    updateSettings: (newSettings: Partial<UserSettings>) => {
      const updatedSettings = { ...settings, ...newSettings };
      return createExtendedUser({
        ...user,
        user_metadata: {
          ...user.user_metadata,
          settings_theme: updatedSettings.theme,
          settings_language: updatedSettings.language,
          settings_emailNotifications: updatedSettings.emailNotifications,
          settings_documentReminders: updatedSettings.documentReminders,
          settings_applicationUpdates: updatedSettings.applicationUpdates,
          settings_twoFactorAuth: updatedSettings.twoFactorAuth,
        },
      }) as ExtendedUser;
    },
    toObject: () => ({
      id: user.id,
      email: user.email,
      fullName:
        user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
      avatarUrl: user.user_metadata?.avatar_url || "",
      role,
      settings,
    }),
  };

  return extendedUser;
}

// Types from the old src/types/types.ts that were not in src/lib/auth/types.ts
// (Excluding duplicates like ExtendedUser, AuthProvider which are merged above)

export interface AuthResult {
  session: Session | null;
  user: User | null; // Should this be ExtendedUser?
  error: Error | null;
}

export interface AuthState {
  user: ExtendedUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error?: Error | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
  metadata?: Record<string, any>;
}

export interface AuthOptions {
  redirectTo?: string;
  email?: string;
  metadata?: Record<string, any>;
  provider?: {
    id: string;
    scopes?: string;
  };
}

export type AuthChangeCallback = (
  session: Session | null,
  user: User | null, // Should this be ExtendedUser?
) => void | Promise<void>;

export interface InitOptions {
  refreshSession?: boolean;
  autoRecoverSession?: boolean;
  refreshOptions?: {
    enableAutoRefresh?: boolean;
    refreshThreshold?: number;
  };
}
