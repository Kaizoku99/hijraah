"use client";

import { X, Maximize2, Minimize2 } from "lucide-react";
import React, { useState, useCallback } from "react";

import { cn } from "@/lib/utils";
import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactDescription,
  ArtifactActions,
  ArtifactAction,
  ArtifactClose,
  ArtifactContent,
} from "./ai-elements";

// Enhanced AI SDK Tools imports
import { 
  useAllArtifacts,
  UnifiedArtifactRenderer,
  useStreamingArtifactManager,
  useEnhancedErrorHandling
} from "@/artifacts/ai-sdk-tools";

// Legacy compatibility import
import { useResetArtifact } from "@/hooks/use-artifact";

export function UnifiedArtifact() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Enhanced AI SDK Tools hooks
  const { current, currentArtifactType } = useAllArtifacts();
  const streamingManager = useStreamingArtifactManager();
  const errorHandling = useEnhancedErrorHandling();
  
  // Legacy compatibility
  const resetArtifact = useResetArtifact();

  const handleClose = useCallback(() => {
    // Reset both new and legacy artifact states
    if (current) {
      streamingManager.resetArtifact(currentArtifactType!);
    }
    resetArtifact();
  }, [current, currentArtifactType, streamingManager, resetArtifact]);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  // Don't render if no artifacts are available
  if (!current && !currentArtifactType) {
    return null;
  }

  const artifactTitle = current?.data?.title || 
                      (currentArtifactType ? `${currentArtifactType} Artifact` : 'Artifact');
  
  const isStreaming = current?.status === 'streaming';
  const hasError = current?.status === 'error' || errorHandling.errorState.hasError;
  const progress = current?.progress;

  return (
    <div
      className={cn(
        "z-10 shadow-lg transition-all duration-300 ease-in-out",
        isFullscreen 
          ? "fixed inset-0 z-50" 
          : "absolute right-0 top-0 bottom-0 w-full md:w-[30vw] h-[calc(100vh-4rem)] mt-16"
      )}
    >
      <Artifact className="h-full">
        <ArtifactHeader>
          <div className="flex items-center gap-2 flex-1">
            <ArtifactTitle className="flex-1">
              {artifactTitle}
            </ArtifactTitle>
            
            {/* Enhanced status indicators */}
            {isStreaming && (
              <ArtifactDescription className="animate-pulse">
                {progress !== undefined 
                  ? `Streaming... ${Math.round(progress * 100)}%`
                  : 'Streaming...'
                }
              </ArtifactDescription>
            )}
            
            {hasError && (
              <ArtifactDescription className="text-destructive">
                Error occurred
              </ArtifactDescription>
            )}
            
            {current?.status === 'complete' && (
              <ArtifactDescription className="text-green-600">
                Complete
              </ArtifactDescription>
            )}
          </div>
          
          <ArtifactActions>
            <ArtifactAction 
              onClick={handleToggleFullscreen}
              className="p-2 hover:bg-muted rounded-sm"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </ArtifactAction>
            <ArtifactClose onClick={handleClose} />
          </ArtifactActions>
        </ArtifactHeader>

        <ArtifactContent>
          <UnifiedArtifactRenderer 
            onClose={handleClose}
            fullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            readonly={false}
            className="h-full"
          />
        </ArtifactContent>
      </Artifact>
    </div>
  );
}
