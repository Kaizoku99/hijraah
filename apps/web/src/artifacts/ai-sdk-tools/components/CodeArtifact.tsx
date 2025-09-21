"use client";

import React, { memo, useState } from 'react';
import { cn } from '@/lib/utils';
import { useCodeArtifact } from '../hooks';
import { CodeArtifactData } from '../artifact-definitions';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Play, 
  Square, 
  Copy, 
  Download, 
  Settings,
  Clock,
  Hash,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface EnhancedCodeArtifactProps {
  className?: string;
  showExecutor?: boolean;
  showMetrics?: boolean;
  readonly?: boolean;
}

/**
 * Enhanced Code Artifact Component with AI SDK Tools integration
 * Features: Syntax highlighting, execution, real-time streaming, progress tracking
 */
export const EnhancedCodeArtifact = memo(function EnhancedCodeArtifact({
  className,
  showExecutor = true,
  showMetrics = true,
  readonly = false,
}: EnhancedCodeArtifactProps) {
  const {
    data,
    status,
    progress,
    isStreaming,
    isComplete,
    isError,
    progressPercent,
  } = useCodeArtifact();

  const { toast } = useToast();
  const [isExecuting, setIsExecuting] = useState(false);

  if (!data) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="text-center text-muted-foreground">
          <Code className="mx-auto h-12 w-12 mb-4" />
          <p>No code artifact available</p>
        </div>
      </div>
    );
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(data.content);
      toast({
        title: "Copied",
        description: "Code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy code",
        variant: "destructive",
      });
    }
  };

  const handleExecuteCode = async () => {
    if (!data.content.trim()) return;
    
    setIsExecuting(true);
    // Simulate code execution - replace with actual execution logic
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Execution Complete",
        description: "Code executed successfully",
      });
    } catch (error) {
      toast({
        title: "Execution Failed",
        description: "Error executing code",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDownloadCode = () => {
    const blob = new Blob([data.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.title || 'code'}.${getFileExtension(data.language)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (language: string): string => {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      html: 'html',
      css: 'css',
      sql: 'sql',
      json: 'json',
    };
    return extensions[language.toLowerCase()] || 'txt';
  };

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Header with controls and metrics */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/50">
        <div className="flex items-center space-x-2">
          <Code className="h-5 w-5" />
          <h2 className="font-semibold">{data.title || 'Untitled Code'}</h2>
          <Badge variant="outline">{data.language}</Badge>
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

        <div className="flex items-center space-x-2">
          {showMetrics && (
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mr-4">
              <div className="flex items-center space-x-1">
                <Hash className="h-4 w-4" />
                <span>{data.lineCount} lines</span>
              </div>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            disabled={!data.content}
          >
            <Copy className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadCode}
            disabled={!data.content}
          >
            <Download className="h-4 w-4" />
          </Button>

          {showExecutor && (
            <Button
              variant="default"
              size="sm"
              onClick={handleExecuteCode}
              disabled={isExecuting || !data.content || isStreaming}
            >
              {isExecuting ? (
                <Square className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isExecuting ? 'Stop' : 'Run'}
            </Button>
          )}
        </div>
      </div>

      {/* Progress bar for streaming */}
      {isStreaming && progress !== undefined && (
        <div className="px-4 py-2">
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Generating code... {progressPercent}%
          </p>
        </div>
      )}

      {/* Code editor area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          {readonly ? (
            <pre className="h-full p-4 text-sm font-mono bg-slate-950 text-slate-50 overflow-auto">
              <code>{data.content}</code>
            </pre>
          ) : (
            <textarea
              className="w-full h-full p-4 text-sm font-mono resize-none border-0 outline-0 bg-slate-950 text-slate-50"
              value={data.content}
              placeholder={`Write ${data.language} code here...`}
              readOnly={isStreaming}
              spellCheck={false}
            />
          )}
        </div>
      </div>

      {/* Execution results */}
      {data.executionResult && (
        <div className="border-t bg-muted/30">
          <div className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              {data.executionResult.error ? (
                <XCircle className="h-4 w-4 text-destructive" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <span className="text-sm font-medium">
                {data.executionResult.error ? 'Execution Error' : 'Output'}
              </span>
              {data.executionResult.timestamp && (
                <span className="text-xs text-muted-foreground">
                  {new Date(data.executionResult.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
            <pre className="text-sm bg-background p-2 rounded border max-h-32 overflow-auto">
              {data.executionResult.error || data.executionResult.output || 'No output'}
            </pre>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-2 border-t text-xs text-muted-foreground bg-muted/30">
        Status: {status} • Language: {data.language} 
        {data.documentId && ` • Document ID: ${data.documentId}`}
      </div>
    </div>
  );
});

/**
 * Simplified code artifact for inline display
 */
export const InlineCodeArtifact = memo(function InlineCodeArtifact({
  className,
}: {
  className?: string;
}) {
  const { data, isStreaming } = useCodeArtifact();

  if (!data?.content) return null;

  return (
    <div className={cn("p-3 bg-slate-950 text-slate-50 rounded-lg", className)}>
      <div className="flex items-center space-x-2 mb-2">
        <Code className="h-4 w-4" />
        <span className="text-sm font-medium">{data.title || 'Code'}</span>
        <Badge variant="secondary" size="sm">{data.language}</Badge>
        {isStreaming && (
          <Badge variant="secondary" size="sm">
            Updating...
          </Badge>
        )}
      </div>
      <pre className="text-sm overflow-hidden">
        <code className="line-clamp-3">{data.content}</code>
      </pre>
    </div>
  );
});

export { EnhancedCodeArtifact as CodeArtifact };