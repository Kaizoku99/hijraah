"use client";

import { useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/toast';
import { 
  artifactDefinitions, 
  ArtifactType,
  textArtifactSchema,
  codeArtifactSchema,
  sheetArtifactSchema,
  imageArtifactSchema,
} from '../artifact-definitions';

interface StreamingArtifactManager {
  startArtifact: (type: ArtifactType, initialData?: any) => void;
  updateArtifact: (type: ArtifactType, delta: any, progress?: number) => void;
  completeArtifact: (type: ArtifactType, finalData?: any) => void;
  errorArtifact: (type: ArtifactType, error: string) => void;
  resetArtifact: (type: ArtifactType) => void;
}

/**
 * Streaming Artifact Manager with AI SDK Tools integration
 * Handles real-time updates, progress tracking, and error states
 */
export function useStreamingArtifactManager(): StreamingArtifactManager {
  const { toast } = useToast();
  const progressTimeouts = useRef<Map<ArtifactType, NodeJS.Timeout>>(new Map());
  const currentProgress = useRef<Map<ArtifactType, number>>(new Map());

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      progressTimeouts.current.forEach(timeout => clearTimeout(timeout));
      progressTimeouts.current.clear();
    };
  }, []);

  const startArtifact = useCallback((type: ArtifactType, initialData?: any) => {
    console.log(`[StreamingManager] Starting ${type} artifact`, initialData);
    
    // Clear any existing progress timeout
    const existingTimeout = progressTimeouts.current.get(type);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Initialize progress
    currentProgress.current.set(type, 0);

    // Validate and set initial data
    const definition = artifactDefinitions[type];
    if (definition && initialData) {
      const validation = definition.schema.safeParse({
        ...initialData,
        status: 'loading',
      });
      
      if (!validation.success) {
        console.warn(`[StreamingManager] Invalid initial data for ${type}:`, validation.error);
      }
    }

    // Start progress simulation for better UX
    simulateProgress(type, 0, 0.1);
  }, []);

  const updateArtifact = useCallback((type: ArtifactType, delta: any, progress?: number) => {
    console.log(`[StreamingManager] Updating ${type} artifact`, { delta, progress });
    
    // Update progress if provided
    if (progress !== undefined) {
      currentProgress.current.set(type, Math.min(progress, 0.95)); // Never show 100% until complete
      
      // Clear existing timeout and set new one if still streaming
      const existingTimeout = progressTimeouts.current.get(type);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }
      
      if (progress < 0.95) {
        simulateProgress(type, progress, Math.min(progress + 0.1, 0.95));
      }
    }

    // Validate delta against schema
    const definition = artifactDefinitions[type];
    if (definition) {
      const currentData = getCurrentArtifactData(type);
      const updatedData = applyDelta(currentData, delta);
      
      const validation = definition.schema.safeParse({
        ...updatedData,
        status: 'streaming',
      });
      
      if (!validation.success) {
        console.warn(`[StreamingManager] Invalid delta for ${type}:`, validation.error);
      }
    }
  }, []);

  const completeArtifact = useCallback((type: ArtifactType, finalData?: any) => {
    console.log(`[StreamingManager] Completing ${type} artifact`, finalData);
    
    // Clear progress timeout
    const existingTimeout = progressTimeouts.current.get(type);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      progressTimeouts.current.delete(type);
    }
    
    // Set final progress
    currentProgress.current.set(type, 1);

    // Validate final data
    const definition = artifactDefinitions[type];
    if (definition && finalData) {
      const validation = definition.schema.safeParse({
        ...finalData,
        status: 'complete',
      });
      
      if (!validation.success) {
        console.warn(`[StreamingManager] Invalid final data for ${type}:`, validation.error);
      }
    }

    // Show completion toast
    toast({
      title: "Artifact Complete",
      description: `${type} artifact has been generated successfully.`,
    });
  }, [toast]);

  const errorArtifact = useCallback((type: ArtifactType, error: string) => {
    console.error(`[StreamingManager] Error in ${type} artifact:`, error);
    
    // Clear progress timeout
    const existingTimeout = progressTimeouts.current.get(type);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      progressTimeouts.current.delete(type);
    }
    
    // Reset progress
    currentProgress.current.delete(type);

    // Show error toast
    toast({
      title: "Artifact Error",
      description: error || `An error occurred while generating the ${type} artifact.`,
      variant: "destructive",
    });
  }, [toast]);

  const resetArtifact = useCallback((type: ArtifactType) => {
    console.log(`[StreamingManager] Resetting ${type} artifact`);
    
    // Clear progress timeout
    const existingTimeout = progressTimeouts.current.get(type);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      progressTimeouts.current.delete(type);
    }
    
    // Reset progress
    currentProgress.current.delete(type);
  }, []);

  // Helper function to simulate smooth progress
  const simulateProgress = useCallback((type: ArtifactType, start: number, target: number) => {
    const timeout = setTimeout(() => {
      const current = currentProgress.current.get(type) || start;
      if (current < target) {
        const increment = (target - start) * 0.1;
        const newProgress = Math.min(current + increment, target);
        currentProgress.current.set(type, newProgress);
        
        if (newProgress < target) {
          simulateProgress(type, newProgress, target);
        }
      }
    }, 100);
    
    progressTimeouts.current.set(type, timeout);
  }, []);

  return {
    startArtifact,
    updateArtifact,
    completeArtifact,
    errorArtifact,
    resetArtifact,
  };
}

/**
 * Get current artifact data (placeholder - replace with actual implementation)
 */
function getCurrentArtifactData(type: ArtifactType): any {
  // This should integrate with your artifact storage system
  // For now, return a basic structure
  const defaults = {
    text: { title: '', content: '', status: 'idle' },
    code: { title: '', content: '', language: 'javascript', status: 'idle' },
    sheet: { title: '', columns: [], rows: [], status: 'idle' },
    image: { title: '', url: '', status: 'idle' },
    generic: { title: '', content: '', status: 'idle' },
  };
  
  return defaults[type] || defaults.generic;
}

/**
 * Apply streaming delta to current artifact data
 */
function applyDelta(currentData: any, delta: any): any {
  if (!currentData || !delta) return currentData;
  
  // Handle different types of deltas
  if (delta.content !== undefined) {
    return {
      ...currentData,
      content: (currentData.content || '') + delta.content,
    };
  }
  
  if (delta.title !== undefined) {
    return {
      ...currentData,
      title: delta.title,
    };
  }
  
  if (delta.metadata !== undefined) {
    return {
      ...currentData,
      ...delta.metadata,
    };
  }
  
  // Merge other properties
  return {
    ...currentData,
    ...delta,
  };
}

/**
 * Progress tracking utilities
 */
export const progressUtils = {
  /**
   * Calculate progress based on content length
   */
  calculateContentProgress: (current: string, estimated: number): number => {
    if (!estimated || estimated <= 0) return 0;
    return Math.min(current.length / estimated, 0.95);
  },

  /**
   * Calculate progress based on streaming chunks
   */
  calculateChunkProgress: (receivedChunks: number, totalChunks: number): number => {
    if (!totalChunks || totalChunks <= 0) return 0;
    return Math.min(receivedChunks / totalChunks, 0.95);
  },

  /**
   * Smooth progress interpolation
   */
  interpolateProgress: (current: number, target: number, factor: number = 0.1): number => {
    return current + (target - current) * factor;
  },

  /**
   * Format progress for display
   */
  formatProgress: (progress: number): string => {
    return Math.round(progress * 100) + '%';
  },
};

/**
 * Error handling utilities
 */
export const errorUtils = {
  /**
   * Categorize error types for better handling
   */
  categorizeError: (error: string | Error): 'network' | 'validation' | 'timeout' | 'unknown' => {
    const errorString = error.toString().toLowerCase();
    
    if (errorString.includes('network') || errorString.includes('fetch')) {
      return 'network';
    }
    if (errorString.includes('validation') || errorString.includes('schema')) {
      return 'validation';
    }
    if (errorString.includes('timeout') || errorString.includes('abort')) {
      return 'timeout';
    }
    
    return 'unknown';
  },

  /**
   * Get user-friendly error messages
   */
  getFriendlyMessage: (error: string | Error): string => {
    const category = errorUtils.categorizeError(error);
    
    switch (category) {
      case 'network':
        return 'Network error. Please check your connection and try again.';
      case 'validation':
        return 'Invalid data format. Please try regenerating the artifact.';
      case 'timeout':
        return 'Request timed out. Please try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  },

  /**
   * Determine if error is recoverable
   */
  isRecoverable: (error: string | Error): boolean => {
    const category = errorUtils.categorizeError(error);
    return ['network', 'timeout'].includes(category);
  },
};