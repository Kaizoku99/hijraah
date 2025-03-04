'use client';

import { useState, useCallback } from 'react';
import { useHijraahApi } from './useHijarahApi';
import { useDeepResearch as useDeepResearchContext } from '@/lib/deep-research-context';
import { nanoid } from 'nanoid';

interface StartResearchOptions {
  query: string;
  maxDepth?: number;
}

export function useDeepResearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { research } = useHijraahApi();
  const {
    state,
    toggleActive,
    setActive,
    addActivity,
    addSource,
    setDepth,
    initProgress,
    updateProgress,
    setSessionId,
    clearState
  } = useDeepResearchContext();

  const startResearch = useCallback(async (options: StartResearchOptions) => {
    const { query, maxDepth = 3 } = options;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Clear previous research state
      clearState();
      
      // Set up initial state
      setActive(true);
      initProgress(maxDepth, maxDepth * 5); // 5 steps per depth level
      setDepth(1, maxDepth);
      
      // Create a unique session ID if not provided
      const sessionId = nanoid();
      setSessionId(sessionId);
      
      // Add initial activity
      addActivity({
        type: 'search',
        status: 'pending',
        message: `Starting research: "${query}"`,
        timestamp: new Date().toISOString(),
        depth: 1,
        completedSteps: 0,
        totalSteps: maxDepth * 5
      });
      
      // Call the API to start research
      const { data, error } = await research.start(query, maxDepth);
      
      if (error) {
        throw new Error(error);
      }
      
      // Update the session ID with the one from the server
      if (data?.sessionId) {
        setSessionId(data.sessionId);
      }
      
      // Research is now in progress
      addActivity({
        type: 'search',
        status: 'complete',
        message: 'Research session started successfully',
        timestamp: new Date().toISOString(),
        depth: 1,
        completedSteps: 1,
        totalSteps: maxDepth * 5
      });
      
      // The actual processing will happen on the server
      // We'll poll for updates or use webhooks/SSE to get progress
      
      return {
        success: true,
        sessionId: data?.sessionId || sessionId
      };
      
    } catch (err: any) {
      setError(err.message || 'Failed to start research');
      
      // Add error activity
      addActivity({
        type: 'search',
        status: 'error',
        message: `Error: ${err.message || 'Failed to start research'}`,
        timestamp: new Date().toISOString()
      });
      
      return {
        success: false,
        error: err.message
      };
    } finally {
      setIsLoading(false);
    }
  }, [
    research,
    setActive,
    initProgress,
    setDepth,
    setSessionId,
    addActivity,
    clearState
  ]);
  
  const addSampleData = useCallback((query: string) => {
    // For demonstration purposes - add sample data to show UI
    setActive(true);
    initProgress(3, 15);
    setDepth(1, 3);
    
    // Sample session ID
    const sessionId = nanoid();
    setSessionId(sessionId);
    
    // Add sample activities
    addActivity({
      type: 'search',
      status: 'complete',
      message: `Starting research: "${query}"`,
      timestamp: new Date().toISOString(),
      depth: 1,
      completedSteps: 1,
      totalSteps: 15
    });
    
    addActivity({
      type: 'extract',
      status: 'complete',
      message: 'Extracting information from initial sources',
      timestamp: new Date().toISOString(),
      depth: 1,
      completedSteps: 2,
      totalSteps: 15
    });
    
    // Add sample sources
    addSource({
      url: 'https://example.com/immigration',
      title: 'Immigration Policies Overview',
      relevance: 0.95
    });
    
    addSource({
      url: 'https://example.org/visas',
      title: 'Visa Requirements & Types',
      relevance: 0.87
    });
    
    addSource({
      url: 'https://example.gov/citizenship',
      title: 'Citizenship Application Process',
      relevance: 0.81
    });
    
  }, [
    setActive,
    initProgress,
    setDepth,
    setSessionId,
    addActivity,
    addSource
  ]);
  
  const getResearchSession = useCallback(async (sessionId: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await research.getSession(sessionId);
      
      if (error) {
        throw new Error(error);
      }
      
      if (data) {
        // Update sources and findings
        if (data.sources) {
          data.sources.forEach((source: any) => {
            addSource({
              url: source.url || source.source_url,
              title: source.title || 'Untitled Source',
              relevance: source.relevance || 0.5
            });
          });
        }
        
        // Add activities based on findings
        if (data.findings) {
          data.findings.forEach((finding: any) => {
            addActivity({
              type: 'reasoning',
              status: 'complete',
              message: finding.content,
              timestamp: finding.created_at || new Date().toISOString(),
              depth: finding.depth || 1
            });
          });
        }
        
        // Update progress
        if (data.session) {
          const depth = data.session.metadata?.depth || 3;
          const currentDepth = data.session.metadata?.current_depth || 1;
          const progress = data.session.metadata?.progress || 0;
          
          setDepth(currentDepth, depth);
          updateProgress(progress, depth * 5);
        }
      }
      
      return { success: true, data };
    } catch (err: any) {
      setError(err.message || 'Failed to get research session');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [research, addSource, addActivity, setDepth, updateProgress]);
  
  return {
    startResearch,
    getResearchSession,
    addSampleData,
    isLoading,
    error,
    state
  };
} 