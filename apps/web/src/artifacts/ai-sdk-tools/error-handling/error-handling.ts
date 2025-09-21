"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/toast';
import { ArtifactType } from '../artifact-definitions';

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

interface ErrorHandlingOptions {
  retryConfig?: Partial<RetryConfig>;
  onRetry?: (attempt: number, error: Error) => void;
  onMaxRetriesReached?: (error: Error) => void;
  onRecovery?: (attempt: number) => void;
  fallbackData?: any;
}

interface ErrorState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
  isRetrying: boolean;
  canRetry: boolean;
  lastAttempt: Date | null;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
};

/**
 * Enhanced Error Handling Hook with Retry Logic
 * Provides resilient error handling with exponential backoff and recovery mechanisms
 */
export function useEnhancedErrorHandling(options: ErrorHandlingOptions = {}) {
  const { toast } = useToast();
  const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...options.retryConfig };
  
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    retryCount: 0,
    isRetrying: false,
    canRetry: true,
    lastAttempt: null,
  });

  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const calculateDelay = useCallback((attempt: number): number => {
    const delay = retryConfig.baseDelay * Math.pow(retryConfig.backoffMultiplier, attempt);
    return Math.min(delay, retryConfig.maxDelay);
  }, [retryConfig]);

  const isRecoverableError = useCallback((error: Error): boolean => {
    const errorMessage = error.message.toLowerCase();
    
    // Network errors are usually recoverable
    if (errorMessage.includes('network') || 
        errorMessage.includes('fetch') ||
        errorMessage.includes('timeout') ||
        error.name === 'AbortError') {
      return true;
    }

    // HTTP 5xx errors are recoverable
    if (errorMessage.includes('500') ||
        errorMessage.includes('502') ||
        errorMessage.includes('503') ||
        errorMessage.includes('504')) {
      return true;
    }

    // Rate limiting is recoverable
    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      return true;
    }

    return false;
  }, []);

  const handleError = useCallback(async (error: Error, operation: () => Promise<any>) => {
    console.error('[ErrorHandler] Error occurred:', error);
    
    setErrorState(prev => ({
      ...prev,
      hasError: true,
      error,
      lastAttempt: new Date(),
      canRetry: isRecoverableError(error) && prev.retryCount < retryConfig.maxRetries,
    }));

    // Show error toast
    toast({
      title: "Error Occurred",
      description: getErrorMessage(error),
      variant: "destructive",
    });

    // Attempt retry if error is recoverable and we haven't exceeded max retries
    if (isRecoverableError(error) && errorState.retryCount < retryConfig.maxRetries) {
      const nextAttempt = errorState.retryCount + 1;
      const delay = calculateDelay(nextAttempt);
      
      setErrorState(prev => ({
        ...prev,
        isRetrying: true,
        retryCount: nextAttempt,
      }));

      // Call retry callback
      options.onRetry?.(nextAttempt, error);

      // Show retry toast
      toast({
        title: "Retrying...",
        description: `Attempting retry ${nextAttempt} of ${retryConfig.maxRetries} in ${delay / 1000}s`,
      });

      // Set up retry with exponential backoff
      retryTimeoutRef.current = setTimeout(async () => {
        try {
          await operation();
          
          // Success - reset error state
          setErrorState({
            hasError: false,
            error: null,
            retryCount: 0,
            isRetrying: false,
            canRetry: true,
            lastAttempt: null,
          });

          // Call recovery callback
          options.onRecovery?.(nextAttempt);

          // Show recovery toast
          toast({
            title: "Recovered",
            description: `Successfully recovered after ${nextAttempt} ${nextAttempt === 1 ? 'attempt' : 'attempts'}`,
          });

        } catch (retryError) {
          // Retry failed, handle recursively
          await handleError(retryError as Error, operation);
        } finally {
          setErrorState(prev => ({ ...prev, isRetrying: false }));
        }
      }, delay);
    } else {
      // Max retries reached or non-recoverable error
      setErrorState(prev => ({
        ...prev,
        canRetry: false,
      }));

      options.onMaxRetriesReached?.(error);

      toast({
        title: "Max Retries Reached",
        description: "Unable to complete the operation. Please try again later.",
        variant: "destructive",
      });
    }
  }, [errorState.retryCount, retryConfig, isRecoverableError, calculateDelay, options, toast]);

  const retry = useCallback(async (operation: () => Promise<any>) => {
    if (!errorState.canRetry || errorState.isRetrying) return;

    try {
      setErrorState(prev => ({ ...prev, isRetrying: true }));
      await operation();
      
      // Reset on success
      setErrorState({
        hasError: false,
        error: null,
        retryCount: 0,
        isRetrying: false,
        canRetry: true,
        lastAttempt: null,
      });
    } catch (error) {
      await handleError(error as Error, operation);
    }
  }, [errorState.canRetry, errorState.isRetrying, handleError]);

  const reset = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
    
    setErrorState({
      hasError: false,
      error: null,
      retryCount: 0,
      isRetrying: false,
      canRetry: true,
      lastAttempt: null,
    });
  }, []);

  const createAbortableOperation = useCallback(<T,>(
    operation: (signal: AbortSignal) => Promise<T>
  ) => {
    return async (): Promise<T> => {
      // Cancel previous operation
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      
      try {
        return await operation(abortControllerRef.current.signal);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('[ErrorHandler] Operation aborted');
          throw error;
        }
        throw error;
      }
    };
  }, []);

  return {
    errorState,
    handleError,
    retry,
    reset,
    createAbortableOperation,
    utils: {
      isRecoverableError,
      calculateDelay,
      getNextRetryTime: () => {
        if (!errorState.lastAttempt || !errorState.canRetry) return null;
        const delay = calculateDelay(errorState.retryCount);
        return new Date(errorState.lastAttempt.getTime() + delay);
      },
    },
  };
}

/**
 * Artifact-specific error handling hook
 */
export function useArtifactErrorHandling(artifactType: ArtifactType) {
  const errorHandling = useEnhancedErrorHandling({
    retryConfig: {
      maxRetries: 5, // More retries for artifacts
      baseDelay: 2000, // Longer base delay
    },
    onRetry: (attempt, error) => {
      console.log(`[${artifactType}] Retry attempt ${attempt}:`, error.message);
    },
    onRecovery: (attempt) => {
      console.log(`[${artifactType}] Recovered after ${attempt} attempts`);
    },
  });

  const handleArtifactError = useCallback(async (
    error: Error, 
    operation: () => Promise<any>,
    context?: string
  ) => {
    console.error(`[${artifactType}] ${context || 'Operation'} failed:`, error);
    return errorHandling.handleError(error, operation);
  }, [artifactType, errorHandling.handleError]);

  return {
    ...errorHandling,
    handleArtifactError,
  };
}

/**
 * Graceful degradation utilities
 */
export const gracefulDegradation = {
  /**
   * Provide fallback data when artifact fails to load
   */
  getFallbackArtifact: (type: ArtifactType, error?: Error) => {
    const fallbacks = {
      text: {
        title: 'Error Loading Text',
        content: error ? `Error: ${error.message}` : 'Failed to load text content',
        status: 'error' as const,
      },
      code: {
        title: 'Error Loading Code',
        content: error ? `// Error: ${error.message}` : '// Failed to load code',
        language: 'javascript',
        status: 'error' as const,
      },
      sheet: {
        title: 'Error Loading Sheet',
        columns: [],
        rows: [],
        status: 'error' as const,
      },
      image: {
        title: 'Error Loading Image',
        url: '',
        status: 'error' as const,
      },
      generic: {
        title: 'Error Loading Artifact',
        content: error ? error.message : 'Failed to load artifact',
        status: 'error' as const,
      },
    };

    return fallbacks[type] || fallbacks.generic;
  },

  /**
   * Progressive loading states
   */
  getLoadingState: (progress?: number) => ({
    title: 'Loading...',
    content: progress !== undefined 
      ? `Loading... ${Math.round(progress * 100)}%`
      : 'Loading...',
    status: 'loading' as const,
  }),

  /**
   * Offline state handling
   */
  getOfflineState: () => ({
    title: 'Offline',
    content: 'This artifact is not available offline. Please check your connection.',
    status: 'error' as const,
  }),
};

/**
 * Get user-friendly error message
 */
function getErrorMessage(error: Error): string {
  if (error.message.includes('fetch')) {
    return 'Network error. Please check your connection.';
  }
  if (error.message.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }
  if (error.message.includes('429')) {
    return 'Rate limit exceeded. Please wait before trying again.';
  }
  if (error.message.includes('500')) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || 'An unexpected error occurred.';
}