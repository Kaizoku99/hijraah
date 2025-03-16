import { SupabaseClient, User, Session } from '@supabase/supabase-js';
import { Database } from '@/types/database'; // Assuming this exists in your project
import { Permission } from './rbac';

/**
 * Defines available auth providers for account linking
 */
export type AuthProvider = 'google' | 'github' | 'azure' | 'email';

/**
 * Extended user type with additional user metadata
 */
export interface ExtendedUser extends User {
  fullName: string;
  avatarUrl: string;
  role: string;
  isAdmin: boolean;
}

/**
 * Auth context type
 */
export interface AuthContextType {
  user: ExtendedUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (provider: AuthProvider, options?: any) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

/**
 * Typed supabase client
 */
export type TypedSupabaseClient = SupabaseClient<Database>;

/**
 * Auth middleware context extension
 */
export interface AuthMiddlewareContext {
  user: ExtendedUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  supabase: TypedSupabaseClient;
  hasPermission?: (permission: Permission) => boolean;
}

/**
 * Auth result from login or session check
 */
export interface AuthResult {
  session: Session | null;
  user: User | null;
  error: Error | null;
}

/**
 * Auth state for React context
 */
export interface AuthState {
  user: ExtendedUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error?: Error | null;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Sign up data
 */
export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
  metadata?: Record<string, any>;
}

/**
 * Basic authentication options
 */
export interface AuthOptions {
  /**
   * Redirect URL after successful authentication
   */
  redirectTo?: string;
  
  /**
   * Email to pre-fill in the login form
   */
  email?: string;
  
  /**
   * User metadata to include in the sign-up
   */
  metadata?: Record<string, any>;
  
  /**
   * Extra options for OAuth providers
   */
  provider?: {
    /**
     * OAuth provider to use (e.g., 'google', 'github')
     */
    id: string;
    
    /**
     * OAuth scopes to request
     */
    scopes?: string;
  };
}

/**
 * Auth listener callback function type
 */
export type AuthChangeCallback = (session: Session | null, user: User | null) => void | Promise<void>;

/**
 * Auth module initialization options
 */
export interface InitOptions {
  /**
   * Force refresh of session on initialization
   */
  refreshSession?: boolean;
  
  /**
   * Auto recover session from storage
   */
  autoRecoverSession?: boolean;
  
  /**
   * Options for token refreshing
   */
  refreshOptions?: {
    /**
     * Enable auto refresh for token
     */
    enableAutoRefresh?: boolean;
    
    /**
     * Threshold in seconds before expiry when token should be refreshed
     */
    refreshThreshold?: number;
  };
} 