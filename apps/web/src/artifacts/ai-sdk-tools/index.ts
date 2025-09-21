"use client";

// Export artifact definitions and schemas
export * from './artifact-definitions';

// Export enhanced hooks
export * from './hooks';

// Export streaming and error handling
export * from './streaming/streaming-manager';
export * from './error-handling/error-handling';

// Export components
export * from './components/TextArtifact';
export * from './components/CodeArtifact';
export * from './components/UnifiedArtifactRenderer';

// Re-export AI SDK Tools for convenience
export { useArtifact, useArtifacts } from '@ai-sdk-tools/artifacts/client';
export { artifact } from '@ai-sdk-tools/artifacts';
export type { ArtifactData, ArtifactStatus, ArtifactCallbacks } from '@ai-sdk-tools/artifacts';

/**
 * Enhanced Artifacts System with AI SDK Tools
 * 
 * This module provides an improved artifacts system built on top of the AI SDK Tools library.
 * 
 * Key Features:
 * - ✅ Type safety with Zod schemas
 * - ✅ Real-time streaming updates
 * - ✅ Progress tracking (0-1)
 * - ✅ Enhanced error handling with retries
 * - ✅ Built-in callbacks (onUpdate, onComplete, onError, onProgress)
 * - ✅ Rich status states (idle, loading, streaming, complete, error)
 * - ✅ Backward compatibility with existing code
 * 
 * Usage:
 * 
 * ```tsx
 * import { useTextArtifact, TextArtifact } from '@/artifacts/ai-sdk-tools';
 * 
 * function MyComponent() {
 *   const { data, status, progress, isStreaming } = useTextArtifact();
 *   
 *   return (
 *     <div>
 *       {isStreaming && <div>Progress: {Math.round(progress * 100)}%</div>}
 *       <TextArtifact />
 *     </div>
 *   );
 * }
 * ```
 * 
 * Or use the unified renderer:
 * 
 * ```tsx
 * import { UnifiedArtifactRenderer } from '@/artifacts/ai-sdk-tools';
 * 
 * function ArtifactDisplay() {
 *   return <UnifiedArtifactRenderer onClose={() => {}} />;
 * }
 * ```
 */