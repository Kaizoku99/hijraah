"use client";

import { nanoid } from "nanoid";
import { useState, useCallback, useRef } from "react";

// Update import path to match our implementation
import { useDeepResearch as useDeepResearchContext } from "@/lib/contexts/deep-research-context";

interface StartResearchOptions {
  query: string;
  maxDepth?: number;
}

export function useDeepResearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    state,
    addActivity,
    addSource,
    setDepth,
    initProgress,
    updateProgress,
    clearState,
  } = useDeepResearchContext();

  const startResearch = useCallback(
    async (options: StartResearchOptions) => {
      const { query, maxDepth = 3 } = options;

      try {
        setIsLoading(true);
        setError(null);

        // Clear previous research state
        clearState();

        // Set up initial state
        initProgress(maxDepth, maxDepth * 5); // 5 steps per depth level
        setDepth(1, maxDepth);

        // Add initial activity
        addActivity({
          type: "search",
          status: "pending",
          message: `Starting research: "${query}"`,
          timestamp: new Date().toISOString(),
          depth: 1,
        });

        // Call the API to start research - this will use Firecrawl with fallback
        const response = await fetch("/api/deep-research", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            maxDepth,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to start research");
        }

        const data = await response.json();

        // Research is now in progress
        addActivity({
          type: "search",
          status: "complete",
          message: "Research session started successfully",
          timestamp: new Date().toISOString(),
          depth: 1,
        });

        // Start polling for updates
        void pollForUpdates(data.sessionId);

        return {
          success: true,
          sessionId: data.sessionId,
        };
      } catch (err: any) {
        setError(err.message || "Failed to start research");

        // Add error activity
        addActivity({
          type: "error",
          status: "error",
          message: `Error: ${err.message || "Failed to start research"}`,
          timestamp: new Date().toISOString(),
        });

        return {
          success: false,
          error: err.message,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [addActivity, clearState, initProgress, setDepth]
  );

  const pollForUpdatesRef = useRef<
    ((sessionId: string) => Promise<void>) | null
  >(null);

  const pollForUpdates = useCallback(
    async (sessionId: string) => {
      try {
        const response = await fetch(
          `/api/deep-research?sessionId=${sessionId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch research updates");
        }

        const data = await response.json();

        if (data.success) {
          // Update progress
          const { session, sources, findings } = data;

          if (session && session.metadata) {
            const { progress, current_depth, max_depth } = session.metadata;

            if (typeof progress === "number") {
              updateProgress(progress, 100);
            }

            if (
              typeof current_depth === "number" &&
              typeof max_depth === "number"
            ) {
              setDepth(current_depth, max_depth);
            }
          }

          // Add any new sources
          if (sources && Array.isArray(sources)) {
            sources.forEach((source) => {
              addSource({
                url: source.url,
                title: source.title,
                relevance: source.relevance,
              });
            });
          }

          // Add any new findings
          if (findings && Array.isArray(findings)) {
            findings.forEach((finding) => {
              addActivity({
                type:
                  finding.type === "error"
                    ? "error"
                    : finding.type === "search_queries"
                      ? "search"
                      : finding.type === "content_extraction"
                        ? "extract"
                        : finding.type === "synthesis"
                          ? "synthesis"
                          : finding.type === "final_answer"
                            ? "reasoning"
                            : "analyze",
                status: finding.type === "error" ? "error" : "complete",
                message: finding.content,
                timestamp: finding.created_at,
                depth: finding.depth,
              });
            });
          }

          // If the research is still in progress, poll again after a delay
          if (session && session.status === "in_progress") {
            setTimeout(() => {
              if (pollForUpdatesRef.current) {
                void pollForUpdatesRef.current(sessionId);
              }
            }, 3000); // Poll every 3 seconds
          }
        }
      } catch (err) {
        console.error("Error polling for updates:", err);
      }
    },
    [addActivity, addSource, setDepth, updateProgress]
  );

  // Update the ref when pollForUpdates changes
  pollForUpdatesRef.current = pollForUpdates;

  return {
    startResearch,
    isLoading,
    error,
    state,
  };
}
