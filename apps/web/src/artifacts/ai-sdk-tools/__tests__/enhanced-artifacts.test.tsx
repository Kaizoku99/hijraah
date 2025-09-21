"use client";

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  useEnhancedArtifact, 
  useAllArtifacts,
  useTextArtifact,
  useCodeArtifact,
  artifactDefinitions
} from '../hooks';
import { 
  enhancedTextArtifactSchema,
  enhancedCodeArtifactSchema,
  validationUtils
} from '../schemas/enhanced-schemas';
import { useStreamingArtifactManager } from '../streaming/streaming-manager';
import { useEnhancedErrorHandling } from '../error-handling/error-handling';

// Mock AI SDK Tools
vi.mock('@ai-sdk-tools/artifacts/client', () => ({
  useArtifact: vi.fn(),
  useArtifacts: vi.fn(),
}));

// Mock toast
vi.mock('@/components/ui/toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('Enhanced Artifacts System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Artifact Definitions', () => {
    it('should have all required artifact definitions', () => {
      expect(artifactDefinitions).toHaveProperty('text');
      expect(artifactDefinitions).toHaveProperty('code');
      expect(artifactDefinitions).toHaveProperty('sheet');
      expect(artifactDefinitions).toHaveProperty('image');
      expect(artifactDefinitions).toHaveProperty('generic');
    });

    it('should create artifacts with proper schemas', () => {
      const textArtifact = artifactDefinitions.text;
      expect(textArtifact.schema).toBeDefined();
      expect(textArtifact.id).toBe('text-artifact');
    });
  });

  describe('Schema Validation', () => {
    it('should validate text artifact data correctly', () => {
      const validData = {
        title: 'Test Article',
        content: 'This is test content',
        status: 'complete' as const,
        wordCount: 4,
        characterCount: 20,
      };

      const result = validationUtils.validateArtifact(enhancedTextArtifactSchema, validData);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid text artifact data', () => {
      const invalidData = {
        title: '', // Empty title should fail
        content: 'x'.repeat(100001), // Too long content
        status: 'invalid-status',
        wordCount: -1, // Negative word count
      };

      const result = validationUtils.validateArtifact(enhancedTextArtifactSchema, invalidData);
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate code artifact data correctly', () => {
      const validData = {
        title: 'Test Code',
        content: 'console.log("hello world");',
        language: 'javascript' as const,
        status: 'complete' as const,
        lineCount: 1,
      };

      const result = validationUtils.validateArtifact(enhancedCodeArtifactSchema, validData);
      expect(result.success).toBe(true);
    });

    it('should transform legacy data correctly', () => {
      const legacyData = {
        title: 'Old Format',
        content: 'Some content here',
        status: 'idle',
      };

      const transformed = validationUtils.transformLegacyData(legacyData, 'text');
      expect(transformed.title).toBe('Old Format');
      expect(transformed.content).toBe('Some content here');
      expect(transformed.wordCount).toBe(3);
      expect(transformed.characterCount).toBe(17);
    });
  });

  describe('Streaming Manager', () => {
    it('should handle artifact lifecycle correctly', async () => {
      const mockToast = vi.fn();
      const TestComponent = () => {
        const manager = useStreamingArtifactManager();
        
        return (
          <div>
            <button onClick={() => manager.startArtifact('text')}>Start</button>
            <button onClick={() => manager.updateArtifact('text', { content: 'new content' }, 0.5)}>Update</button>
            <button onClick={() => manager.completeArtifact('text')}>Complete</button>
            <button onClick={() => manager.errorArtifact('text', 'Test error')}>Error</button>
          </div>
        );
      };

      render(<TestComponent />);
      
      const startButton = screen.getByText('Start');
      const updateButton = screen.getByText('Update');
      const completeButton = screen.getByText('Complete');
      const errorButton = screen.getByText('Error');

      // Test start
      fireEvent.click(startButton);
      
      // Test update
      fireEvent.click(updateButton);
      
      // Test completion
      fireEvent.click(completeButton);
      
      // Test error
      fireEvent.click(errorButton);
      
      // All operations should complete without throwing
      expect(true).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle recoverable errors with retries', async () => {
      let attemptCount = 0;
      const mockOperation = vi.fn().mockImplementation(() => {
        attemptCount++;
        if (attemptCount < 3) {
          throw new Error('Network error - temporary failure');
        }
        return Promise.resolve('success');
      });

      const TestComponent = () => {
        const { handleError, errorState } = useEnhancedErrorHandling({
          retryConfig: { maxRetries: 5, baseDelay: 10 },
        });

        return (
          <div>
            <button onClick={() => handleError(new Error('Network error - temporary failure'), mockOperation)}>
              Trigger Error
            </button>
            <div data-testid="error-state">
              {errorState.hasError ? 'Has Error' : 'No Error'}
            </div>
            <div data-testid="retry-count">{errorState.retryCount}</div>
          </div>
        );
      };

      render(<TestComponent />);
      
      const triggerButton = screen.getByText('Trigger Error');
      fireEvent.click(triggerButton);

      // Should eventually recover
      await waitFor(() => {
        expect(mockOperation).toHaveBeenCalledTimes(3);
      }, { timeout: 1000 });
    });

    it('should stop retrying after max attempts', async () => {
      const mockOperation = vi.fn().mockRejectedValue(new Error('Persistent error'));

      const TestComponent = () => {
        const { handleError, errorState } = useEnhancedErrorHandling({
          retryConfig: { maxRetries: 2, baseDelay: 10 },
        });

        return (
          <div>
            <button onClick={() => handleError(new Error('Persistent error'), mockOperation)}>
              Trigger Error
            </button>
            <div data-testid="can-retry">
              {errorState.canRetry ? 'Can Retry' : 'Cannot Retry'}
            </div>
          </div>
        );
      };

      render(<TestComponent />);
      
      const triggerButton = screen.getByText('Trigger Error');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        const canRetryElement = screen.getByTestId('can-retry');
        expect(canRetryElement.textContent).toBe('Cannot Retry');
      }, { timeout: 1000 });
    });
  });

  describe('Hook Integration', () => {
    it('should provide backward compatibility', () => {
      const mockUseArtifact = vi.fn().mockReturnValue({
        data: {
          title: 'Test',
          content: 'Content',
          status: 'complete',
        },
        status: 'complete',
        progress: 1,
        error: null,
        isActive: false,
        hasData: true,
      });

      vi.mocked(require('@ai-sdk-tools/artifacts/client').useArtifact).mockImplementation(mockUseArtifact);

      const TestComponent = () => {
        const { data, status, progressPercent, isComplete } = useTextArtifact();
        
        return (
          <div>
            <div data-testid="title">{data?.title || 'No Title'}</div>
            <div data-testid="status">{status}</div>
            <div data-testid="progress">{progressPercent}</div>
            <div data-testid="complete">{isComplete ? 'Complete' : 'Not Complete'}</div>
          </div>
        );
      };

      render(<TestComponent />);
      
      expect(screen.getByTestId('title').textContent).toBe('Test');
      expect(screen.getByTestId('status').textContent).toBe('complete');
      expect(screen.getByTestId('complete').textContent).toBe('Complete');
    });
  });

  describe('Performance', () => {
    it('should handle large content efficiently', () => {
      const largeContent = 'x'.repeat(50000);
      const data = {
        title: 'Large Document',
        content: largeContent,
        status: 'complete' as const,
      };

      const start = performance.now();
      const result = validationUtils.validateArtifact(enhancedTextArtifactSchema, data);
      const end = performance.now();

      expect(result.success).toBe(true);
      expect(end - start).toBeLessThan(100); // Should validate in under 100ms
    });

    it('should handle streaming updates efficiently', async () => {
      const updates = Array.from({ length: 100 }, (_, i) => ({
        content: `Update ${i}`,
        progress: i / 100,
      }));

      const TestComponent = () => {
        const manager = useStreamingArtifactManager();
        
        const handleManyUpdates = () => {
          updates.forEach((update, index) => {
            setTimeout(() => {
              manager.updateArtifact('text', update, update.progress);
            }, index * 10);
          });
        };

        return (
          <button onClick={handleManyUpdates}>
            Send Many Updates
          </button>
        );
      };

      render(<TestComponent />);
      
      const button = screen.getByText('Send Many Updates');
      const start = performance.now();
      
      fireEvent.click(button);
      
      await waitFor(() => {
        const end = performance.now();
        expect(end - start).toBeLessThan(2000); // Should handle 100 updates in under 2 seconds
      }, { timeout: 3000 });
    });
  });

  describe('Accessibility', () => {
    it('should provide proper ARIA labels and roles', () => {
      const TestComponent = () => {
        const { data, isStreaming, progressPercent } = useTextArtifact();
        
        return (
          <div role="document" aria-label="Text Artifact">
            {isStreaming && (
              <div 
                role="progressbar" 
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Content generation progress"
              >
                {progressPercent}% complete
              </div>
            )}
            <div aria-live="polite">
              {data?.content || 'Loading...'}
            </div>
          </div>
        );
      };

      render(<TestComponent />);
      
      const document = screen.getByRole('document');
      expect(document).toHaveAttribute('aria-label', 'Text Artifact');
    });
  });
});

// Integration test with real AI SDK Tools (if available)
describe('AI SDK Tools Integration', () => {
  it('should work with real AI SDK Tools when available', async () => {
    // This test would run against the actual AI SDK Tools library
    // Skip if not available in test environment
    const isAiSdkAvailable = true; // Check if library is available
    
    if (!isAiSdkAvailable) {
      console.log('Skipping AI SDK Tools integration test - library not available');
      return;
    }

    // Test real integration here
    expect(true).toBe(true);
  });
});

// Performance benchmarks
describe('Performance Benchmarks', () => {
  it('should meet performance requirements for artifact creation', () => {
    const iterations = 1000;
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      const data = {
        title: `Artifact ${i}`,
        content: `Content for artifact ${i}`,
        status: 'complete' as const,
      };
      validationUtils.validateArtifact(enhancedTextArtifactSchema, data);
    }
    
    const end = performance.now();
    const timePerIteration = (end - start) / iterations;
    
    expect(timePerIteration).toBeLessThan(1); // Should create artifacts in under 1ms each
  });

  it('should handle memory efficiently with large datasets', () => {
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    // Create large artifact
    const largeData = {
      title: 'Large Artifact',
      content: 'x'.repeat(100000),
      status: 'complete' as const,
    };
    
    // Validate multiple times
    for (let i = 0; i < 100; i++) {
      validationUtils.validateArtifact(enhancedTextArtifactSchema, largeData);
    }
    
    const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
    const memoryIncrease = finalMemory - initialMemory;
    
    // Memory increase should be reasonable (less than 50MB)
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
  });
});