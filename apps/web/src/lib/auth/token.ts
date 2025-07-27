import { Session } from "@supabase/supabase-js";

import { safeAuthOperation } from "./errors";
import { TypedSupabaseClient } from "./types";

/**
 * Options for token manager
 */
export interface TokenManagerOptions {
  /**
   * Supabase client instance
   */
  supabase: TypedSupabaseClient;

  /**
   * Whether to enable automatic token refreshing
   * @default true
   */
  autoRefresh?: boolean;

  /**
   * Threshold in seconds before token expiry to trigger refresh
   * @default 300 (5 minutes)
   */
  refreshThreshold?: number;

  /**
   * Callback when refresh succeeds
   */
  onRefreshSuccess?: (session: Session) => void;

  /**
   * Callback when refresh fails
   */
  onRefreshError?: (error: Error) => void;
}

/**
 * Manages authentication token refreshing
 */
export class TokenManager {
  private supabase: TypedSupabaseClient;
  private autoRefresh: boolean;
  private refreshThreshold: number;
  private onRefreshSuccess?: (session: Session) => void;
  private onRefreshError?: (error: Error) => void;
  private refreshTimeout: NodeJS.Timeout | null = null;
  private refreshing: boolean = false;

  constructor(options: TokenManagerOptions) {
    this.supabase = options.supabase;
    this.autoRefresh = options.autoRefresh ?? true;
    this.refreshThreshold = options.refreshThreshold ?? 300; // 5 minutes
    this.onRefreshSuccess = options.onRefreshSuccess;
    this.onRefreshError = options.onRefreshError;

    // Start refresh scheduler if auto-refresh is enabled
    if (this.autoRefresh) {
      this.startRefreshScheduler();
    }
  }

  /**
   * Start the refresh scheduler
   */
  async startRefreshScheduler(): Promise<void> {
    // Clear any existing timeout
    this.stopRefreshScheduler();

    try {
      // Get current session
      const { data, error } = await this.supabase.auth.getSession();

      if (error) {
        throw error;
      }

      if (data.session) {
        this.scheduleNextRefresh(data.session);
      }
    } catch (error) {
      console.error("Failed to start refresh scheduler:", error);
      if (this.onRefreshError) {
        this.onRefreshError(error as Error);
      }
    }
  }

  /**
   * Stop the refresh scheduler
   */
  stopRefreshScheduler(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }

  /**
   * Calculate the time until next refresh in milliseconds
   */
  private calculateNextRefreshTime(session: Session): number {
    if (!session?.expires_at) {
      return 0;
    }

    const expiryTime = session.expires_at * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const timeUntilExpiry = expiryTime - currentTime;

    // Refresh the token 'refreshThreshold' seconds before it expires
    const refreshTime = timeUntilExpiry - this.refreshThreshold * 1000;

    // If token is already near expiry or expired, refresh immediately
    return Math.max(0, refreshTime);
  }

  /**
   * Schedule the next token refresh
   */
  private scheduleNextRefresh(session: Session): void {
    if (!session) return;

    const nextRefreshTime = this.calculateNextRefreshTime(session);

    // If token is already expired or very close to expiring, refresh immediately
    if (nextRefreshTime <= 0) {
      this.refreshSession();
      return;
    }

    // Schedule next refresh
    this.refreshTimeout = setTimeout(() => {
      this.refreshSession();
    }, nextRefreshTime);
  }

  /**
   * Refresh the session
   */
  async refreshSession(): Promise<Session | null> {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshing) {
      return null;
    }

    this.refreshing = true;

    try {
      const { data, error } = await this.supabase.auth.refreshSession();

      if (error) {
        throw error;
      }

      if (data.session) {
        if (this.onRefreshSuccess) {
          this.onRefreshSuccess(data.session);
        }

        // Schedule the next refresh if auto-refresh is enabled
        if (this.autoRefresh) {
          this.scheduleNextRefresh(data.session);
        }

        return data.session;
      }

      return null;
    } catch (error) {
      console.error("Session refresh failed:", error);
      if (this.onRefreshError) {
        this.onRefreshError(error as Error);
      }
      return null;
    } finally {
      this.refreshing = false;
    }
  }

  /**
   * Get the current session, refreshing if it's expired or close to expiry
   */
  async getSession(): Promise<Session | null> {
    try {
      // Get current session
      const { data, error } = await this.supabase.auth.getSession();

      if (error) {
        throw error;
      }

      const session = data.session;

      // If no session, return null
      if (!session) {
        return null;
      }

      // Check if session is close to expiry
      const expiryTime = (session.expires_at || 0) * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expiryTime - currentTime;

      // If session is close to expiry, refresh it
      if (timeUntilExpiry < this.refreshThreshold * 1000) {
        return this.refreshSession();
      }

      return session;
    } catch (error) {
      console.error("Failed to get session:", error);
      return null;
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stopRefreshScheduler();
  }
}

/**
 * Create a token manager
 */
export function createTokenManager(options: TokenManagerOptions): TokenManager {
  return new TokenManager(options);
}
