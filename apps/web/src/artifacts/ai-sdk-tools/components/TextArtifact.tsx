"use client";

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { useTextArtifact } from '../hooks';
import { TextArtifactData } from '../artifact-definitions';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Type, Hash } from 'lucide-react';

interface EnhancedTextArtifactProps {
  className?: string;
  showMetrics?: boolean;
  readonly?: boolean;
}

/**
 * Enhanced Text Artifact Component with AI SDK Tools integration
 * Features: Real-time streaming, progress tracking, word count, character count
 */
export const EnhancedTextArtifact = memo(function EnhancedTextArtifact({
  className,
  showMetrics = true,
  readonly = false,
}: EnhancedTextArtifactProps) {
  const {
    data,
    status,
    progress,
    isStreaming,
    isComplete,
    isError,
    progressPercent,
  } = useTextArtifact();

  if (!data) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="text-center text-muted-foreground">
          <FileText className="mx-auto h-12 w-12 mb-4" />
          <p>No text artifact available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header with status and metrics */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <h2 className="font-semibold">{data.title || 'Untitled Text'}</h2>
          {isStreaming && (
            <Badge variant="secondary" className="animate-pulse">
              Streaming...
            </Badge>
          )}
          {isComplete && (
            <Badge variant="default">Complete</Badge>
          )}
          {isError && (
            <Badge variant="destructive">Error</Badge>
          )}
        </div>

        {showMetrics && (
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Type className="h-4 w-4" />
              <span>{data.wordCount} words</span>
            </div>
            <div className="flex items-center space-x-1">
              <Hash className="h-4 w-4" />
              <span>{data.characterCount} chars</span>
            </div>
            {data.lastModified && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{new Date(data.lastModified).toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress bar for streaming */}
      {isStreaming && progress !== undefined && (
        <div className="px-4 py-2">
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {progressPercent}% complete
          </p>
        </div>
      )}

      {/* Content area */}
      <div className="flex-1 p-4 overflow-auto">
        {readonly ? (
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap">{data.content}</div>
          </div>
        ) : (
          <textarea
            className="w-full h-full resize-none border-0 outline-0 bg-transparent"
            value={data.content}
            placeholder="Start typing or let AI generate content..."
            readOnly={isStreaming}
          />
        )}
      </div>

      {/* Footer with additional info */}
      <div className="px-4 py-2 border-t text-xs text-muted-foreground">
        Status: {status} {data.documentId && `• Document ID: ${data.documentId}`}
      </div>
    </div>
  );
});

/**
 * Simplified text artifact for inline display
 */
export const InlineTextArtifact = memo(function InlineTextArtifact({
  className,
}: {
  className?: string;
}) {
  const { data, isStreaming } = useTextArtifact();

  if (!data?.content) return null;

  return (
    <div className={cn("p-3 bg-muted rounded-lg", className)}>
      <div className="flex items-center space-x-2 mb-2">
        <FileText className="h-4 w-4" />
        <span className="text-sm font-medium">{data.title || 'Text'}</span>
        {isStreaming && (
          <Badge variant="secondary" size="sm">
            Updating...
          </Badge>
        )}
      </div>
      <div className="text-sm whitespace-pre-wrap line-clamp-3">
        {data.content}
      </div>
    </div>
  );
});

export { EnhancedTextArtifact as TextArtifact };