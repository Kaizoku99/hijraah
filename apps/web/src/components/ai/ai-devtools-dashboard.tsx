"use client";

import React, { useState, useEffect } from "react";
import { 
  useAIDevtoolsEnhanced, 
  AIDevtoolsDebugInfo 
} from "@/components/ai/ai-devtools-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/**
 * Context7 - AI DevTools Dashboard Component
 * 
 * A comprehensive dashboard for managing and monitoring AI SDK DevTools
 * in your development environment. This component demonstrates all
 * the enhanced debugging capabilities integrated with Context7.
 */
export function AIDevtoolsDashboard() {
  const devtools = useAIDevtoolsEnhanced();
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto-refresh stats every 2 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // Trigger re-render to show updated stats
    }, 2000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const chatEvents = devtools.getChatEvents();
  const streamingEvents = devtools.getStreamingEvents();
  const errorEvents = devtools.getErrorEvents();
  const stats = devtools.getChatStats();

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md">
      <Card className="bg-black/90 text-white border-zinc-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-mono">
              AI DevTools Dashboard
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`text-xs h-6 px-2 ${
                  autoRefresh ? "bg-green-900/50 text-green-300" : "bg-gray-700/50"
                }`}
              >
                {autoRefresh ? "Live" : "Paused"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs h-6 px-2"
              >
                {isExpanded ? "Collapse" : "Expand"}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 text-xs font-mono">
          {/* Basic Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-zinc-400">Total Events</div>
              <div className="font-bold text-white">{devtools.events.length}</div>
            </div>
            <div>
              <div className="text-zinc-400">Chat Events</div>
              <div className="font-bold text-blue-300">{chatEvents.length}</div>
            </div>
            <div>
              <div className="text-zinc-400">Streaming</div>
              <div className="font-bold text-green-300">{streamingEvents.length}</div>
            </div>
            <div>
              <div className="text-zinc-400">Errors</div>
              <div className="font-bold text-red-300">{errorEvents.length}</div>
            </div>
          </div>

          <Separator className="bg-zinc-700" />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={devtools.clearEvents}
              className="h-6 px-2 text-xs border-zinc-600 text-zinc-300 hover:bg-zinc-700"
            >
              Clear Events
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={devtools.toggleCapturing}
              className="h-6 px-2 text-xs border-zinc-600 text-zinc-300 hover:bg-zinc-700"
            >
              Toggle Capture
            </Button>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <>
              <Separator className="bg-zinc-700" />
              
              {/* Tool Usage */}
              <div>
                <div className="text-zinc-400 mb-1">Active Tools</div>
                <div className="flex flex-wrap gap-1">
                  {devtools.getUniqueToolNames().map((toolName) => (
                    <Badge
                      key={toolName}
                      variant="outline"
                      className="text-xs py-0 px-1 border-zinc-600 text-zinc-300"
                    >
                      {toolName}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Events Preview */}
              <div>
                <div className="text-zinc-400 mb-1">Recent Events</div>
                <div className="max-h-24 overflow-y-auto space-y-1">
                  {devtools.events.slice(-5).reverse().map((event, index) => (
                    <div key={index} className="text-xs text-zinc-300 truncate">
                      <span className="text-zinc-500">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>{" "}
                      <span className="text-blue-300">{event.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              {stats.averageStreamingRate > 0 && (
                <div>
                  <div className="text-zinc-400 mb-1">Performance</div>
                  <div className="text-xs">
                    <div>Streaming Rate: {stats.averageStreamingRate.toFixed(1)} events/sec</div>
                    <div>Tool Calls: {stats.toolCallCount || 0}</div>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Debug Info Component */}
      <AIDevtoolsDebugInfo />
    </div>
  );
}

/**
 * Context7 - DevTools Event Monitor
 * 
 * A lightweight component that can be added to any component
 * to monitor AI SDK events for that specific component context
 */
export function DevToolsEventMonitor({ 
  componentName, 
  className = "" 
}: { 
  componentName: string;
  className?: string;
}) {
  const devtools = useAIDevtoolsEnhanced();
  const [recentEvent, setRecentEvent] = useState<any>(null);

  useEffect(() => {
    const events = devtools.events;
    if (events.length > 0) {
      setRecentEvent(events[events.length - 1]);
    }
  }, [devtools.events]);

  if (process.env.NODE_ENV !== "development" || !recentEvent) {
    return null;
  }

  return (
    <div className={`
      inline-flex items-center gap-2 px-2 py-1 rounded text-xs 
      bg-black/70 text-green-300 font-mono ${className}
    `}>
      <span className="text-zinc-400">[{componentName}]</span>
      <span className="text-blue-300">{recentEvent.type}</span>
      <span className="text-zinc-500">
        {new Date(recentEvent.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
}

/**
 * Example usage in components:
 * 
 * ```tsx
 * // Basic monitoring in any component
 * <DevToolsEventMonitor componentName="UnifiedChatContainer" />
 * 
 * // Full dashboard (add to development pages)
 * <AIDevtoolsDashboard />
 * ```
 */