import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

// Error severity levels
export enum ErrorSeverity {
  LOW = 'warning',
  MEDIUM = 'error',
  HIGH = 'error',
  CRITICAL = 'fatal',
}

// Base error class with enhanced features
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    public details?: Record<string, any>,
    public retry?: boolean,
    public userMessage?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      severity: this.severity,
      details: this.details,
      retry: this.retry,
      userMessage: this.userMessage,
    };
  }
}

// Common error types
export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(
      message,
      'VALIDATION_ERROR',
      400,
      ErrorSeverity.LOW,
      details,
      true,
      'Please check your input and try again.',
    );
    this.name = 'ValidationError';
  }
}

export class AuthError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(
      message,
      'AUTH_ERROR',
      401,
      ErrorSeverity.HIGH,
      details,
      true,
      'Authentication failed. Please sign in again.',
    );
    this.name = 'AuthError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(
      message,
      'NOT_FOUND',
      404,
      ErrorSeverity.LOW,
      details,
      false,
      'The requested resource was not found.',
    );
    this.name = 'NotFoundError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(
      message,
      'NETWORK_ERROR',
      503,
      ErrorSeverity.HIGH,
      details,
      true,
      'Network connection issue. Please check your connection and try again.',
    );
    this.name = 'NetworkError';
  }
}

// Enhanced error handling with logging
export function handleError(error: unknown, context?: Record<string, any>) {
  console.error('Error:', error);

  // Log error details
  if (error instanceof AppError) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error({
        error: error.toJSON(),
        context,
      });
    }

    toast.error(`${error.name}: ${error.userMessage || error.message}`);
  } else if (error instanceof Error) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error({
        name: error.name,
        message: error.message,
        stack: error.stack,
        context,
      });
    }

    toast.error(`Error: ${error.message}`);
  } else {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error({
        error,
        context,
      });
    }

    toast.error('An unexpected error occurred');
  }
}

// Enhanced error handling wrapper with retry logic
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  options?: {
    onError?: (error: unknown) => void;
    rethrow?: boolean;
    context?: Record<string, any>;
    retry?: boolean;
    maxRetries?: number;
    retryDelay?: number;
  },
): Promise<T | undefined> {
  const maxRetries = options?.maxRetries ?? 3;
  const retryDelay = options?.retryDelay ?? 1000;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      attempts++;

      if (options?.onError) {
        options.onError(error);
      } else {
        handleError(error, options?.context);
      }

      if (error instanceof AppError && !error.retry) {
        break;
      }

      if (attempts < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * attempts),
        );
        continue;
      }

      if (options?.rethrow) {
        throw error;
      }
    }
  }
}

// Type guards and utility functions
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function createErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.userMessage || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

// Error boundary context
export const ErrorContext = {
  getDisplayMessage(error: unknown): string {
    if (error instanceof AppError) {
      return error.userMessage || error.message;
    }
    return 'An unexpected error occurred. Please try again later.';
  },

  shouldRetry(error: unknown): boolean {
    if (error instanceof AppError) {
      return error.retry ?? false;
    }
    return false;
  },

  getSeverity(error: unknown): ErrorSeverity {
    if (error instanceof AppError) {
      return error.severity;
    }
    return ErrorSeverity.MEDIUM;
  },
};
