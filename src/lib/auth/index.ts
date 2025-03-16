import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { 
  AuthError, 
  UnauthorizedError, 
  ForbiddenError, 
  SessionError,
  InvalidCredentialsError,
  UserOperationError,
  ConfigurationError,
  handleSupabaseError 
} from './errors';
import { TokenManager, createTokenManager, TokenManagerOptions } from './token';
import { 
  StorageProvider,
  MemoryStorageProvider,
  LocalStorageProvider,
  SessionStorageProvider,
  CookieStorageProvider,
  AUTH_STORAGE_KEYS,
  AuthStorageManager,
  createStorageManager,
  StorageManagerOptions
} from './storage';
import { 
  Permission,
  Role,
  RBACOptions,
  RBACManager,
  getRBACManager,
  hasPermission,
  createPermission,
  enforcePermission
} from './rbac';
import { TypedSupabaseClient, AuthOptions, ExtendedUser } from './types';
import { BASE_URL, safeServerRedirect } from './utils';

// Re-export enhanced modules
export * from './errors';
export * from './token';
export * from './storage';
export * from './rbac';
export * from './testing';
export * from './types';
export * from './utils';

/**
 * Configuration for the authentication module
 */
export interface AuthConfig {
  /**
   * Supabase project URL
   */
  supabaseUrl: string;
  
  /**
   * Supabase anonymous key
   */
  supabaseKey: string;
  
  /**
   * OAuth callback URL
   * @default `${BASE_URL}/auth/callback`
   */
  callbackUrl?: string;
  
  /**
   * URL to redirect after logout
   * @default `/login`
   */
  logoutRedirectUrl?: string;
  
  /**
   * URL to redirect after login
   * @default `/dashboard`
   */
  loginRedirectUrl?: string;
  
  /**
   * Options for the token manager
   */
  tokenOptions?: Omit<TokenManagerOptions, 'supabase'>;
  
  /**
   * Storage provider to use for authentication state
   * @default 'local'
   */
  storageType?: 'memory' | 'local' | 'session' | 'cookie';
  
  /**
   * Options for the storage manager
   */
  storageOptions?: StorageManagerOptions;
  
  /**
   * Role-based access control options
   */
  rbacOptions?: RBACOptions;
}

/**
 * Default authentication configuration
 */
export const defaultAuthConfig: AuthConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  callbackUrl: `${BASE_URL}/auth/callback`,
  logoutRedirectUrl: '/login',
  loginRedirectUrl: '/dashboard',
  storageType: 'local',
};

// Initialize auth configuration
let globalAuthConfig: AuthConfig = { ...defaultAuthConfig };

/**
 * Set the global authentication configuration
 */
export function setAuthConfig(config: Partial<AuthConfig>) {
  globalAuthConfig = {
    ...globalAuthConfig,
    ...config,
  };
}

/**
 * Get the current authentication configuration
 */
export function getAuthConfig(): AuthConfig {
  return globalAuthConfig;
}

// Singleton instances of sub-managers
let tokenManager: TokenManager | null = null;
let storageManager: AuthStorageManager | null = null;

/**
 * Browser-side Supabase client for authentication
 */
export function createBrowserClient(): TypedSupabaseClient {
  try {
    return createClient(
      globalAuthConfig.supabaseUrl,
      globalAuthConfig.supabaseKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      }
    ) as TypedSupabaseClient;
  } catch (error) {
    console.error('Failed to create Supabase browser client:', error);
    throw new ConfigurationError('Failed to create Supabase browser client');
  }
}

/**
 * Get token manager instance, creating it if it doesn't exist
 */
export function getTokenManager(): TokenManager {
  if (!tokenManager) {
    const supabase = createBrowserClient();
    tokenManager = createTokenManager({
      supabase,
      ...(globalAuthConfig.tokenOptions || {})
    });
  }
  return tokenManager;
}

/**
 * Get storage manager instance, creating it if it doesn't exist
 */
export function getStorageManager(): AuthStorageManager {
  if (!storageManager) {
    let provider: StorageProvider;
    
    switch (globalAuthConfig.storageType) {
      case 'memory':
        provider = new MemoryStorageProvider();
        break;
      case 'session':
        provider = new SessionStorageProvider();
        break;
      case 'cookie':
        provider = new CookieStorageProvider(globalAuthConfig.storageOptions?.cookieOptions);
        break;
      case 'local':
      default:
        provider = new LocalStorageProvider();
        break;
    }
    
    storageManager = createStorageManager(provider, globalAuthConfig.storageOptions);
  }
  
  return storageManager;
}

/**
 * Server-side Supabase client for authentication
 */
export function createServerClient(): TypedSupabaseClient {
  try {
    const cookieStore = cookies();
    
    // Create basic client options
    const options: any = {
      auth: {
        persistSession: true
      },
      global: {
        headers: {
          'X-Client-Info': 'hijraah-auth-helper'
        }
      }
    };
    
    // Supabase expects a synchronous cookie interface
    // Next.js 13+ uses an asynchronous cookies() API
    // So we need to handle this carefully
    options.cookies = {
      get(name: string) {
        try {
          // @ts-ignore - Next.js cookies() can be used synchronously in some environments
          return cookieStore.get(name)?.value;
        } catch (error) {
          console.warn('Error accessing cookie synchronously:', error);
          return undefined;
        }
      },
      set(name: string, value: string, cookieOptions: any) {
        try {
          // @ts-ignore - Next.js cookies() can be used synchronously in some environments
          cookieStore.set(name, value, cookieOptions);
        } catch (error) {
          console.warn('Error setting cookie synchronously:', error);
        }
      },
      remove(name: string, cookieOptions: any) {
        try {
          // @ts-ignore - Next.js cookies() can be used synchronously in some environments
          cookieStore.set(name, '', { ...cookieOptions, maxAge: 0 });
        } catch (error) {
          console.warn('Error removing cookie synchronously:', error);
        }
      },
    };
    
    return createClient(
      globalAuthConfig.supabaseUrl,
      globalAuthConfig.supabaseKey,
      options
    ) as TypedSupabaseClient;
  } catch (error) {
    console.error('Failed to create Supabase server client:', error);
    throw new ConfigurationError('Failed to create Supabase server client');
  }
}

/**
 * Check if the user is authenticated
 * @server-only
 */
export async function checkAuth() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw handleSupabaseError(error);
    }
    
    if (!data?.session) {
      throw new UnauthorizedError('No active session found');
    }
    
    return {
      session: data.session,
      user: data.session.user,
    };
  } catch (error) {
    console.error('Authentication check failed:', error);
    if (error instanceof AuthError) {
      throw error;
    }
    throw new UnauthorizedError('Failed to authenticate user');
  }
}

/**
 * Get the authenticated user with server components
 * @server-only
 */
export const getAuthUser = cache(async () => {
  try {
    const { session, user } = await checkAuth();
    
    if (!user) {
      throw new UnauthorizedError('No user found in session');
    }
    
    // Create extended user with additional properties
    const extendedUser: ExtendedUser = {
      ...user,
      fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      avatarUrl: user.user_metadata?.avatar_url || '',
      role: user.user_metadata?.role || 'user',
      isAdmin: user.user_metadata?.role === 'admin',
    };
    
    return {
      session,
      user: extendedUser,
      isAuthenticated: true,
    };
  } catch (error) {
    console.error('Failed to get authenticated user:', error);
    return {
      session: null,
      user: null,
      isAuthenticated: false,
    };
  }
});

/**
 * Get the authenticated user or redirect to login
 * @server-only
 */
export async function getAuthUserOrRedirect(redirectTo?: string) {
  const { user, session, isAuthenticated } = await getAuthUser();
  
  if (!isAuthenticated) {
    safeServerRedirect(redirectTo || globalAuthConfig.logoutRedirectUrl || '/login');
  }
  
  return { user, session, isAuthenticated };
}

/**
 * Require the user to have a specific permission, or redirect
 * @server-only
 */
export async function requirePermission(permission: Permission, redirectTo = '/unauthorized') {
  const { user } = await getAuthUserOrRedirect();
  
  try {
    const rbacManager = getRBACManager();
    const hasAccess = rbacManager.hasPermission(user, permission);
    
    if (!hasAccess) {
      throw new ForbiddenError(`User does not have required permission: ${permission}`);
    }
    
    return { user };
  } catch (error) {
    console.error('Permission check failed:', error);
    safeServerRedirect(redirectTo);
    // This return is just to satisfy TypeScript, the redirect will end execution
    return { user: null as unknown as ExtendedUser };
  }
}

/**
 * Sign out the user
 * @server-only
 */
export async function signOut(redirectTo?: string) {
  try {
    const supabase = createServerClient();
    await supabase.auth.signOut();
    
    const storage = getStorageManager();
    // Clear all auth data
    storage.clearAuth();
    
    // Clean up token manager
    if (tokenManager) {
      tokenManager.destroy();
      tokenManager = null;
    }
  } catch (error) {
    console.error('Sign out failed:', error);
  }
  
  // Redirect to login page
  safeServerRedirect(redirectTo || globalAuthConfig.logoutRedirectUrl || '/login');
}

/**
 * Initialize auth helpers in the application
 */
export function initializeAuth(config: Partial<AuthConfig> = {}) {
  // Set global configuration
  setAuthConfig(config);
  
  // Initialize Supabase clients
  const browserClient = createBrowserClient();
  
  // Initialize all managers
  if (!tokenManager) {
    tokenManager = createTokenManager({
      supabase: browserClient,
      ...(config.tokenOptions || {})
    });
  }
  
  if (!storageManager) {
    getStorageManager();
  }
  
  // Initialize RBAC
  const rbac = getRBACManager(config.rbacOptions);
  
  return {
    config: getAuthConfig(),
    tokenManager,
    storageManager: getStorageManager(),
    rbacManager: rbac,
    createServerClient,
    createBrowserClient,
  };
}

// Default auth helpers instance for direct use
export const auth = {
  tokenManager: getTokenManager,
  storageManager: getStorageManager,
  rbacManager: getRBACManager,
  createServerClient,
  createBrowserClient,
  getAuthUser,
  getAuthUserOrRedirect,
  requirePermission,
  signOut,
  config: getAuthConfig,
  initialize: initializeAuth,
}; 