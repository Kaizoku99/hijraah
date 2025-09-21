/**
 * Stream Status Component
 * 
 * Shows the current status of resumable streams and provides controls
 * for managing interrupted streams.
 */

"use client";

import { useState, useEffect } from "react";
import { Play, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export interface StreamStatusProps {
  isStreaming: boolean;
  isResuming?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  onResume?: () => void;
  onRetry?: () => void;
  className?: string;
}

export function StreamStatus({
  isStreaming,
  isResuming = false,
  hasError = false,
  errorMessage,
  onResume,
  onRetry,
  className,
}: StreamStatusProps) {
  const { toast } = useToast();
  const [showResumeHint, setShowResumeHint] = useState(false);

  // Show resume hint after a delay if not streaming and no error
  useEffect(() => {
    if (!isStreaming && !hasError && onResume) {
      const timer = setTimeout(() => {
        setShowResumeHint(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowResumeHint(false);
    }
  }, [isStreaming, hasError, onResume]);

  if (!isStreaming && !hasError && !showResumeHint && !isResuming) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-between p-2 rounded-md border", className)}>
      <div className="flex items-center gap-2">
        {isStreaming && (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <span className="text-sm text-muted-foreground">Streaming response...</span>
          </>
        )}
        
        {isResuming && (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-green-500" />
            <span className="text-sm text-muted-foreground">Resuming stream...</span>
          </>
        )}
        
        {hasError && (
          <>
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-600">
              {errorMessage || "Stream interrupted"}
            </span>
          </>
        )}
        
        {showResumeHint && !hasError && (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">
              Stream may be resumable
            </span>
          </>
        )}
      </div>

      <div className="flex gap-1">
        {(hasError || showResumeHint) && onResume && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onResume();
              toast({
                title: "Resuming stream",
                description: "Attempting to resume interrupted response...",
              });
            }}
            className="h-7 px-2 text-xs"
          >
            <Play className="h-3 w-3 mr-1" />
            Resume
          </Button>
        )}
        
        {hasError && onRetry && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onRetry();
              toast({
                title: "Retrying",
                description: "Attempting to restart the response...",
              });
            }}
            className="h-7 px-2 text-xs"
          >
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}
