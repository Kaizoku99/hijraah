import { Session } from '@supabase/supabase-js';

/**
 * Interface for storage providers
 */
export interface StorageProvider {
  /**
   * Get item from storage
   */
  getItem(key: string): string | null;
  
  /**
   * Set item in storage
   */
  setItem(key: string, value: string): void;
  
  /**
   * Remove item from storage
   */
  removeItem(key: string): void;
}

/**
 * Storage manager options
 */
export interface StorageManagerOptions {
  /**
   * Prefix for storage keys
   */
  keyPrefix?: string;

  /**
   * Options for cookie storage provider
   */
  cookieOptions?: CookieOptions;
}

/**
 * Cookie storage options
 */
export interface CookieOptions {
  /**
   * Cookie domain
   */
  domain?: string;

  /**
   * Cookie path
   */
  path?: string;

  /**
   * Whether cookie should be secure
   */
  secure?: boolean;

  /**
   * Same site cookie policy
   */
  sameSite?: 'strict' | 'lax' | 'none';

  /**
   * Max cookie age in seconds
   */
  maxAge?: number;
}

/**
 * Storage provider for in-memory storage
 * Data will be lost when the page is reloaded
 */
export class MemoryStorageProvider implements StorageProvider {
  private storage: Map<string, string> = new Map();
  
  getItem(key: string): string | null {
    return this.storage.get(key) || null;
  }
  
  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }
  
  removeItem(key: string): void {
    this.storage.delete(key);
  }
}

/**
 * Storage provider for local storage
 * Data will persist between page reloads and browser sessions
 */
export class LocalStorageProvider implements StorageProvider {
  getItem(key: string): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(key);
  }
  
  setItem(key: string, value: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, value);
  }
  
  removeItem(key: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(key);
  }
}

/**
 * Storage provider for session storage
 * Data will persist between page reloads but not when the browser is closed
 */
export class SessionStorageProvider implements StorageProvider {
  getItem(key: string): string | null {
    if (typeof sessionStorage === 'undefined') return null;
    return sessionStorage.getItem(key);
  }
  
  setItem(key: string, value: string): void {
    if (typeof sessionStorage === 'undefined') return;
    sessionStorage.setItem(key, value);
  }
  
  removeItem(key: string): void {
    if (typeof sessionStorage === 'undefined') return;
    sessionStorage.removeItem(key);
  }
}

/**
 * Storage provider for cookies
 * Useful for SSR and sending auth data with requests
 */
export class CookieStorageProvider implements StorageProvider {
  private options: CookieOptions;
  
  constructor(options: CookieOptions = {}) {
    this.options = {
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      ...options
    };
  }
  
  getItem(key: string): string | null {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === key) {
        return decodeURIComponent(value);
      }
    }
    
    return null;
  }
  
  setItem(key: string, value: string): void {
    if (typeof document === 'undefined') return;
    
    const { domain, path, secure, sameSite, maxAge } = this.options;
    
    let cookie = `${key}=${encodeURIComponent(value)}`;
    
    if (domain) cookie += `; Domain=${domain}`;
    if (path) cookie += `; Path=${path}`;
    if (secure) cookie += '; Secure';
    if (sameSite) cookie += `; SameSite=${sameSite}`;
    if (maxAge) cookie += `; Max-Age=${maxAge}`;
    
    document.cookie = cookie;
  }
  
  removeItem(key: string): void {
    if (typeof document === 'undefined') return;
    
    const { domain, path } = this.options;
    let cookie = `${key}=; Max-Age=0`;
    
    if (domain) cookie += `; Domain=${domain}`;
    if (path) cookie += `; Path=${path}`;
    
    document.cookie = cookie;
  }
}

/**
 * Default auth storage keys
 */
export const AUTH_STORAGE_KEYS = {
  SESSION: 'supabase.auth.session',
  USER: 'supabase.auth.user',
  TOKENS: 'supabase.auth.tokens',
  PROVIDER: 'supabase.auth.provider',
  REDIRECT: 'supabase.auth.redirect',
  IS_AUTHENTICATED: 'supabase.auth.isAuthenticated',
  REFRESH_TOKEN: 'supabase.auth.refreshToken',
};

/**
 * Auth Storage Manager for handling auth-related storage
 */
export class AuthStorageManager {
  private provider: StorageProvider;
  private keyPrefix: string;
  
  constructor(provider: StorageProvider, options: StorageManagerOptions = {}) {
    this.provider = provider;
    this.keyPrefix = options.keyPrefix || '';
  }
  
  /**
   * Get the full storage key with prefix
   */
  private getFullKey(key: string): string {
    return this.keyPrefix ? `${this.keyPrefix}:${key}` : key;
  }
  
  /**
   * Get a value from storage
   */
  get<T>(key: string, defaultValue?: T): T | null {
    const value = this.provider.getItem(this.getFullKey(key));
    
    if (!value) {
      return defaultValue || null;
    }
    
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Failed to parse value for key ${key}:`, error);
      return defaultValue || null;
    }
  }
  
  /**
   * Set a value in storage
   */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      this.provider.setItem(this.getFullKey(key), serialized);
    } catch (error) {
      console.error(`Failed to set value for key ${key}:`, error);
    }
  }
  
  /**
   * Remove a value from storage
   */
  remove(key: string): void {
    this.provider.removeItem(this.getFullKey(key));
  }
  
  /**
   * Store auth session
   */
  setSession(session: any): void {
    this.set(AUTH_STORAGE_KEYS.SESSION, session);
  }
  
  /**
   * Get stored auth session
   */
  getSession<T = any>(): T | null {
    return this.get<T>(AUTH_STORAGE_KEYS.SESSION);
  }
  
  /**
   * Store user data
   */
  setUser(user: any): void {
    this.set(AUTH_STORAGE_KEYS.USER, user);
  }
  
  /**
   * Get stored user data
   */
  getUser<T = any>(): T | null {
    return this.get<T>(AUTH_STORAGE_KEYS.USER);
  }
  
  /**
   * Store authentication state
   */
  setAuthState(state: { user: any; session: any; isAuthenticated: boolean }): void {
    this.setUser(state.user);
    this.setSession(state.session);
    this.set(AUTH_STORAGE_KEYS.IS_AUTHENTICATED, state.isAuthenticated);
  }
  
  /**
   * Get stored authentication state
   */
  getAuthState<U = any, S = any>(): { user: U | null; session: S | null; isAuthenticated: boolean } {
    return {
      user: this.getUser<U>(),
      session: this.getSession<S>(),
      isAuthenticated: this.get<boolean>(AUTH_STORAGE_KEYS.IS_AUTHENTICATED) || false,
    };
  }
  
  /**
   * Clear all authentication data
   */
  clearAuth(): void {
    this.remove(AUTH_STORAGE_KEYS.USER);
    this.remove(AUTH_STORAGE_KEYS.SESSION);
    this.remove(AUTH_STORAGE_KEYS.IS_AUTHENTICATED);
    this.remove(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  }
}

/**
 * Create a storage manager with specified provider
 */
export function createStorageManager(
  provider: StorageProvider,
  options?: StorageManagerOptions
): AuthStorageManager {
  return new AuthStorageManager(provider, options);
} 