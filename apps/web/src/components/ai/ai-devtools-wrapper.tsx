"use client";

import { AIDevtools, useAIDevtools } from "@ai-sdk-tools/devtools";
import { useEffect, useState } from "react";

/**
 * Context7 - AI SDK DevTools Wrapper Component
 * 
 * A comprehensive wrapper for AI SDK DevTools that provides:
 * - Environment-based rendering (dev only)
 * - Optimal configuration for chat applications
 * - Context7-aligned debugging capabilities
 * - Performance-optimized event handling
 */

interface AIDevtoolsWrapperProps {
  /** Enable/disable the devtools (default: auto-detect development) */
  enabled?: boolean;
  /** Maximum number of events to store (default: 1000) */
  maxEvents?: number;
  /** Model ID for context insights (optional) */
  modelId?: string;
  /** Position of the devtools panel */
  position?: "bottom" | "right" | "overlay";
  /** Height of the devtools panel when positioned at bottom */
  height?: number;
  /** Enable debug logging */
  debug?: boolean;
  /** Custom stream capture endpoint */
  streamEndpoint?: string;
}

/**
 * Main DevTools wrapper component
 */
export function AIDevtoolsWrapper({
  enabled,
  maxEvents = 1000,
  modelId = "gpt-4o",
  position = "bottom",
  height = 400,
  debug = false,
  streamEndpoint = "/api/chat",
}: AIDevtoolsWrapperProps = {}) {
  const [isClient, setIsClient] = useState(false);
  
  // Only render on client side and in development
  const shouldRender = enabled ?? (process.env.NODE_ENV === "development");

  useEffect(() => {
    setIsClient(true);
    
    // Set global debug flag if enabled
    if (debug && typeof window !== "undefined") {
      window.__AI_DEVTOOLS_DEBUG = true;
    }
  }, [debug]);

  // Don't render during SSR or in production (unless explicitly enabled)
  if (!isClient || !shouldRender) {
    return null;
  }

  return (
    <AIDevtools
      enabled={shouldRender}
      maxEvents={maxEvents}
      modelId={modelId}
      debug={debug}
      config={{
        enabled: shouldRender,
        maxEvents,
        position: position === "bottom" ? "bottom" : position,
        theme: "dark",
      }}
    />
  );
}

/**
 * Hook for manual DevTools integration in components
 * Provides enhanced debugging capabilities for specific components
 */
export function useAIDevtoolsEnhanced() {
  const devtools = useAIDevtools();

  // Optional: Log events for additional debugging
  if (process.env.NODE_ENV === "development" && devtools.events) {
    console.debug("[AI DevTools] Total Events:", devtools.events.length);
  }

  /**
   * Filter events by type with Context7-specific patterns
   */
  const getEventsByType = (types: string[]) => {
    return devtools.events?.filter(event => types.includes(event.type)) || [];
  };

  /**
   * Get chat-specific events (useful for UnifiedChatContainer debugging)
   */
  const getChatEvents = () => {
    return getEventsByType([
      "text-delta",
      "text-done",
      "tool-call-start",
      "tool-call-result",
      "tool-call-done",
      "error",
      "finish",
    ]);
  };

  /**
   * Get streaming events only
   */
  const getStreamingEvents = () => {
    return getEventsByType([
      "text-delta",
      "tool-call-delta",
      "data-stream-part",
    ]);
  };

  /**
   * Get error events with enhanced context
   */
  const getErrorEvents = () => {
    const errors = getEventsByType(["error"]);
    return errors.map(event => ({
      ...event,
      context: "chat-streaming", // Add Context7 context
    }));
  };

  /**
   * Get statistics optimized for chat applications
   */
  const getChatStats = () => {
    const chatEvents = getChatEvents();
    const streamingEvents = getStreamingEvents();
    const errorEvents = getErrorEvents();
    
    return {
      totalEvents: devtools.events?.length || 0,
      chatEventsCount: chatEvents.length,
      streamingEventsCount: streamingEvents.length,
      errorCount: errorEvents.length,
      toolCallCount: getEventsByType(["tool-call-start"]).length,
      averageStreamingRate: streamingEvents.length > 0 
        ? (streamingEvents.length / (Date.now() - streamingEvents[0]?.timestamp || 1)) * 1000
        : 0,
    };
  };

  /**
   * Simple event stats for backward compatibility
   */
  const getEventStats = () => {
    return getChatStats();
  };

  return {
    ...devtools,
    // Enhanced methods for Context7 integration
    getEventsByType,
    getChatEvents,
    getStreamingEvents,
    getErrorEvents,
    getChatStats,
    getEventStats, // For backward compatibility
  };
}

/**
 * Debug component for development - shows DevTools status and basic stats
 */
export function AIDevtoolsDebugInfo() {
  const { events, getEventStats } = useAIDevtoolsEnhanced();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const updateStats = () => {
      setStats(getEventStats());
    };
    
    updateStats();
    const interval = setInterval(updateStats, 1000);
    
    return () => clearInterval(interval);
  }, [getEventStats]);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>AI DevTools Status: Active</div>
      <div>Events: {events?.length || 0}</div>
      {stats && (
        <>
          <div>Tool Calls: {stats.toolCallCount || 0}</div>
          <div>Errors: {stats.errorCount || 0}</div>
        </>
      )}
    </div>
  );
}

// Export type for external usage
export type { AIDevtoolsWrapperProps };

// Global window type extension for debug flag
declare global {
  interface Window {
    __AI_DEVTOOLS_DEBUG?: boolean;
  }
}