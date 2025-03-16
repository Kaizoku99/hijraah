import { AuthError as SupabaseAuthError } from '@supabase/supabase-js';

/**
 * Base class for all authentication errors
 */
export class AuthError extends Error {
  public code: string;
  public status?: number;
  public originalError?: Error;

  constructor(message: string, code: string, originalError?: Error, status?: number) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
    this.status = status;
    this.originalError = originalError;
  }

  /**
   * Create a JSON representation of the error
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status
    };
  }

  /**
   * Create error response for API routes
   */
  toResponse() {
    return new Response(
      JSON.stringify({
        error: {
          message: this.message,
          code: this.code
        }
      }),
      {
        status: this.status || 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

/**
 * Error thrown when user is not authenticated
 */
export class UnauthorizedError extends AuthError {
  constructor(message = 'Authentication required', originalError?: Error) {
    super(message, 'auth/unauthorized', originalError, 401);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Error thrown when user doesn't have sufficient permissions
 */
export class ForbiddenError extends AuthError {
  constructor(message = 'Insufficient permissions', originalError?: Error) {
    super(message, 'auth/forbidden', originalError, 403);
    this.name = 'ForbiddenError';
  }
}

/**
 * Error thrown when there's an issue with session management
 */
export class SessionError extends AuthError {
  constructor(message = 'Session error', originalError?: Error) {
    super(message, 'auth/session-error', originalError, 400);
    this.name = 'SessionError';
  }
}

/**
 * Error thrown when credentials are invalid
 */
export class InvalidCredentialsError extends AuthError {
  constructor(message = 'Invalid credentials', originalError?: Error) {
    super(message, 'auth/invalid-credentials', originalError, 401);
    this.name = 'InvalidCredentialsError';
  }
}

/**
 * Error thrown for user-related operations failures
 */
export class UserOperationError extends AuthError {
  constructor(message = 'User operation failed', originalError?: Error) {
    super(message, 'auth/user-operation-failed', originalError, 400);
    this.name = 'UserOperationError';
  }
}

/**
 * Error thrown for configuration issues
 */
export class ConfigurationError extends AuthError {
  constructor(message = 'Authentication configuration error', originalError?: Error) {
    super(message, 'auth/configuration-error', originalError, 500);
    this.name = 'ConfigurationError';
  }
}

// Interface for any error with status code
interface ErrorWithStatus extends Error {
  status?: number;
  code?: string | number;
}

/**
 * Converts Supabase errors to our custom error types
 */
export function handleSupabaseError(error: Error | SupabaseAuthError | ErrorWithStatus | null | undefined): AuthError {
  if (!error) {
    return new AuthError('Unknown error', 'auth/unknown');
  }

  // Errors with status property
  const errorWithStatus = error as ErrorWithStatus;
  if (errorWithStatus.status) {
    switch (errorWithStatus.status) {
      case 401:
        return new UnauthorizedError(error.message, error);
      case 403:
        return new ForbiddenError(error.message, error);
      case 400:
        if (error.message.includes('credentials')) {
          return new InvalidCredentialsError(error.message, error);
        }
        if (error.message.includes('session')) {
          return new SessionError(error.message, error);
        }
        return new UserOperationError(error.message, error);
      default:
        return new AuthError(
          error.message, 
          `auth/error-${errorWithStatus.status || 'unknown'}`, 
          error, 
          errorWithStatus.status
        );
    }
  }

  // Generic errors
  return new AuthError(error.message || 'Unknown error', 'auth/unknown-error', error);
}

/**
 * Helper to safely handle auth operations with consistent error handling
 */
export async function safeAuthOperation<T>(
  operation: () => Promise<T>,
  errorMessage = 'Authentication operation failed'
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    throw handleSupabaseError(error as Error);
  }
}

/**
 * Middleware for handling auth errors in API routes
 */
export function createAuthErrorHandler() {
  return (error: unknown) => {
    if (error instanceof AuthError) {
      return error.toResponse();
    }
    
    const authError = handleSupabaseError(error as Error);
    return authError.toResponse();
  };
} 