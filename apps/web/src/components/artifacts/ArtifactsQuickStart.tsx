"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  useAllArtifacts, 
  useArtifactAnalytics,
  useArtifactTypeMonitor,
  useTextArtifact,
  useCodeArtifact,
  textArtifact,
  codeArtifact
} from '@/artifacts/ai-sdk-tools';
import { 
  FileText, 
  Code, 
  Activity, 
  BarChart3,
  Play,
  Pause,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

/**
 * Quick Start Example for AI SDK Tools v0.4 useArtifacts
 * This component demonstrates the key new features and capabilities
 */
export function ArtifactsQuickStart() {
  // 1. Enhanced All Artifacts Hook with v0.4 features
  const {
    current,
    artifacts,
    artifactStats,
    hasActiveArtifacts,
    getLatestByType,
    getActiveArtifacts,
    getCompletedArtifacts
  } = useAllArtifacts();

  // 2. Real-time Analytics
  const analytics = useArtifactAnalytics();

  // 3. Type-specific Monitoring
  const textCodeMonitor = useArtifactTypeMonitor(['text', 'code']);

  // 4. Individual artifact hooks (enhanced with v0.4)
  const textArtifactData = useTextArtifact();
  const codeArtifactData = useCodeArtifact();

  // Demo functions to create artifacts
  const createTextArtifact = async () => {
    const stream = textArtifact.stream({
      title: "Sample Text Document",
      content: "This is a sample text artifact created with AI SDK Tools v0.4",
      status: "loading"
    });
    
    // Simulate progress
    setTimeout(() => stream.update({ status: "streaming" }), 500);
    setTimeout(() => stream.complete({ 
      title: "Completed Text Document",
      content: "This text artifact has been successfully generated!",
      status: "complete",
      wordCount: 8,
      characterCount: 52
    }), 2000);
  };

  const createCodeArtifact = async () => {
    const stream = codeArtifact.stream({
      title: "Sample React Component",
      content: "function HelloWorld() {\n  return <h1>Hello, World!</h1>;\n}",
      language: "javascript",
      status: "loading"
    });
    
    // Simulate streaming progress
    for (let i = 0; i <= 100; i += 20) {
      setTimeout(() => {
        stream.progress = i / 100;
        stream.update({ status: i === 100 ? "complete" : "streaming" });
      }, i * 30);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">AI SDK Tools v0.4 - useArtifacts Demo</h1>
        <p className="text-muted-foreground">
          Enhanced artifact management with real-time monitoring and analytics
        </p>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Try creating artifacts to see the v0.4 features in action
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button onClick={createTextArtifact} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Create Text Artifact
          </Button>
          <Button onClick={createCodeArtifact} variant="outline" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Create Code Artifact
          </Button>
        </CardContent>
      </Card>

      {/* Real-time Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Total Artifacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.recent.last24Hours} created today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(analytics.performance.completionRate * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.byStatus.complete} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {hasActiveArtifacts ? (
                <Activity className="h-4 w-4 text-blue-500" />
              ) : (
                <Pause className="h-4 w-4 text-gray-500" />
              )}
              Active Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.byStatus.streaming + analytics.byStatus.loading}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {hasActiveArtifacts ? 'Processing...' : 'All idle'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Artifact Display */}
      {current && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {current.type.includes('text') && <FileText className="h-4 w-4" />}
              {current.type.includes('code') && <Code className="h-4 w-4" />}
              Current Artifact
            </CardTitle>
            <CardDescription>
              {current.type} • Version {current.version}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {current.status === 'complete' && <CheckCircle className="h-4 w-4 text-green-500" />}
                {current.status === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                {(current.status === 'streaming' || current.status === 'loading') && (
                  <Activity className="h-4 w-4 text-blue-500" />
                )}
                <span className="capitalize font-medium">{current.status}</span>
              </div>
              <Badge variant="outline">
                {current.type.replace('-artifact', '')}
              </Badge>
            </div>
            
            {current.progress !== undefined && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{Math.round(current.progress * 100)}%</span>
                </div>
                <Progress value={current.progress * 100} className="w-full" />
              </div>
            )}

            <div className="text-sm">
              <strong>Title:</strong> {(current.payload as any)?.title || 'Untitled'}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Type Monitor Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Type Monitor (Text & Code)
          </CardTitle>
          <CardDescription>
            Monitoring specific artifact types with useArtifactTypeMonitor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4" />
                Text Artifacts ({textCodeMonitor.byType['text-artifact']?.length || 0})
              </h4>
              <div className="text-sm text-muted-foreground">
                Latest status: {textArtifactData.status}
                {textArtifactData.progressPercent > 0 && (
                  <span> • {textArtifactData.progressPercent}% complete</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Code className="h-4 w-4" />
                Code Artifacts ({textCodeMonitor.byType['code-artifact']?.length || 0})
              </h4>
              <div className="text-sm text-muted-foreground">
                Latest status: {codeArtifactData.status}
                {codeArtifactData.progressPercent > 0 && (
                  <span> • {codeArtifactData.progressPercent}% complete</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Type Distribution</CardTitle>
          <CardDescription>
            Real-time breakdown of artifact types
          </CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(analytics.byType).length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No artifacts created yet. Try the quick actions above!
            </p>
          ) : (
            <div className="space-y-3">
              {Object.entries(analytics.byType).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {type === 'text' && <FileText className="h-4 w-4" />}
                    {type === 'code' && <Code className="h-4 w-4" />}
                    <span className="capitalize font-medium">{type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono">{count}</span>
                    <Progress 
                      value={(count / analytics.total) * 100} 
                      className="w-20 h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feature Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 v0.4 Feature Highlights</CardTitle>
          <CardDescription>
            New capabilities demonstrated in this component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Enhanced useAllArtifacts()</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Real-time artifact statistics</li>
                <li>• Status-based filtering</li>
                <li>• Progress tracking</li>
                <li>• Type-safe getters</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">New Specialized Hooks</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• useArtifactAnalytics()</li>
                <li>• useArtifactTypeMonitor()</li>
                <li>• useArtifactLifecycle()</li>
                <li>• useArtifactSearch()</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ArtifactsQuickStart;