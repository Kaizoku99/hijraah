"use client";

import { useArtifact as useAiSdkArtifact, useArtifacts } from '@ai-sdk-tools/artifacts/client';
import type { ArtifactStatus } from '@ai-sdk-tools/artifacts';
import { useCallback, useMemo } from 'react';
import { useToast } from '@/components/ui/toast';
import { 
  artifactDefinitions, 
  ArtifactType,
  ArtifactData,
  textArtifact,
  codeArtifact,
  sheetArtifact,
  imageArtifact,
  genericArtifact
} from './artifact-definitions';

/**
 * Enhanced useArtifact hook with AI SDK Tools integration
 * Provides streaming, progress tracking, and error handling
 */
export function useEnhancedArtifact(artifactType: ArtifactType) {
  const { toast } = useToast();
  
  const artifactDefinition = useMemo(() => {
    return artifactDefinitions[artifactType];
  }, [artifactType]);

  const {
    data,
    status,
    progress,
    error,
    isActive,
    hasData,
  } = useAiSdkArtifact(artifactDefinition, {
    onUpdate: (newData, prevData) => {
      console.log(`[${artifactType}] Artifact updated:`, { newData, prevData });
    },
    onComplete: (finalData) => {
      console.log(`[${artifactType}] Artifact completed:`, finalData);
      toast({
        title: "Artifact Complete",
        description: `${finalData.title || 'Untitled artifact'} has been generated successfully.`,
      });
    },
    onError: (errorMsg) => {
      console.error(`[${artifactType}] Artifact error:`, errorMsg);
      toast({
        title: "Artifact Error",
        description: errorMsg || 'An error occurred while processing the artifact.',
        variant: "destructive",
      });
    },
    onProgress: (progressValue) => {
      console.log(`[${artifactType}] Progress:`, Math.round(progressValue * 100) + '%');
    },
  });

  return {
    data,
    status,
    progress,
    error,
    isActive,
    hasData,
    // Computed properties
    progressPercent: progress ? Math.round(progress * 100) : 0,
    isLoading: status === 'loading',
    isStreaming: status === 'streaming',
    isComplete: status === 'complete',
    isError: status === 'error',
    isIdle: status === 'idle',
  };
}

/**
 * Enhanced hook to access all artifacts with type-safe switching and rich features
 * Leverages the new v0.4 useArtifacts capabilities
 */
export function useAllArtifacts() {
  const {
    byType,
    latest,
    artifacts,
    current,
  } = useArtifacts({
    onData: (artifactType, data) => {
      console.log(`New ${artifactType} artifact:`, data);
      
      // Enhanced logging with artifact details
      const artifactTypeName = artifactType.replace('-artifact', '');
      console.group(`🎯 ${artifactTypeName.toUpperCase()} Artifact Update`);
      console.log('Status:', data.status);
      console.log('Progress:', data.progress ? `${Math.round(data.progress * 100)}%` : 'N/A');
      console.log('Version:', data.version);
      console.log('Data:', data.payload);
      console.groupEnd();
    }
  });

  // Type-safe artifact getters with enhanced functionality
  const getLatestByType = useCallback((type: ArtifactType) => {
    return latest[`${type}-artifact`];
  }, [latest]);

  const getCurrentArtifactType = useMemo(() => {
    if (!current?.type) return null;
    
    // Extract type from artifact ID (e.g., 'text-artifact' -> 'text')
    const match = current.type.match(/^(\w+)-artifact$/);
    return match ? match[1] as ArtifactType : null;
  }, [current?.type]);

  // Enhanced getters for specific artifact types
  const getArtifactsByStatus = useCallback((status: ArtifactStatus) => {
    return artifacts.filter(artifact => artifact.status === status);
  }, [artifacts]);

  const getActiveArtifacts = useCallback(() => {
    return artifacts.filter(artifact => 
      artifact.status === 'streaming' || artifact.status === 'loading'
    );
  }, [artifacts]);

  const getCompletedArtifacts = useCallback(() => {
    return artifacts.filter(artifact => artifact.status === 'complete');
  }, [artifacts]);

  const getErroredArtifacts = useCallback(() => {
    return artifacts.filter(artifact => artifact.status === 'error');
  }, [artifacts]);

  // Stats and analytics
  const artifactStats = useMemo(() => {
    const stats = {
      total: artifacts.length,
      byStatus: {
        idle: 0,
        loading: 0,
        streaming: 0,
        complete: 0,
        error: 0,
      },
      byType: {} as Record<string, number>,
      averageProgress: 0,
    };

    let totalProgress = 0;
    let progressCount = 0;

    artifacts.forEach(artifact => {
      // Count by status
      stats.byStatus[artifact.status]++;
      
      // Count by type
      const type = artifact.type.replace('-artifact', '');
      stats.byType[type] = (stats.byType[type] || 0) + 1;
      
      // Calculate average progress
      if (artifact.progress !== undefined) {
        totalProgress += artifact.progress;
        progressCount++;
      }
    });

    stats.averageProgress = progressCount > 0 ? totalProgress / progressCount : 0;

    return stats;
  }, [artifacts]);

  return {
    // Original v0.4 data
    byType,
    latest,
    artifacts,
    current,
    
    // Enhanced type-safe getters
    getLatestByType,
    currentArtifactType: getCurrentArtifactType,
    
    // Status-based filters
    getArtifactsByStatus,
    getActiveArtifacts,
    getCompletedArtifacts,
    getErroredArtifacts,
    
    // Analytics and stats
    artifactStats,
    
    // Convenience computed properties
    hasActiveArtifacts: artifactStats.byStatus.streaming > 0 || artifactStats.byStatus.loading > 0,
    hasErrors: artifactStats.byStatus.error > 0,
    totalArtifacts: artifacts.length,
  };
}

/**
 * Specialized hooks for each artifact type
 */
export const useTextArtifact = () => useEnhancedArtifact('text');
export const useCodeArtifact = () => useEnhancedArtifact('code');
export const useSheetArtifact = () => useEnhancedArtifact('sheet');
export const useImageArtifact = () => useEnhancedArtifact('image');
export const useGenericArtifact = () => useEnhancedArtifact('generic');

/**
 * Legacy compatibility hook
 * Provides backward compatibility with existing code
 */
export function useLegacyArtifact() {
  const { current, getLatestByType } = useAllArtifacts();
  
  // Simulate the old artifact structure for backward compatibility
  const artifact = useMemo(() => {
    if (!current?.data) {
      return {
        kind: null,
        status: 'idle' as const,
        title: '',
        content: null,
        documentId: undefined,
        isVisible: false,
        boundingBox: {
          top: 0,
          left: 0,
          width: 0,
          height: 0,
        },
      };
    }

    const type = current.type?.replace('-artifact', '') as ArtifactType;
    return {
      kind: type || null,
      status: current.status || 'idle',
      title: current.data.title || '',
      content: (current.data as any).content || null,
      documentId: current.data.documentId,
      isVisible: true,
      boundingBox: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
    };
  }, [current]);

  const setArtifact = useCallback((updater: any) => {
    console.warn('setArtifact is deprecated. Use the new AI SDK Tools artifacts instead.');
    // This is a no-op for backward compatibility
  }, []);

  const metadata = useMemo(() => {
    return current?.data || {};
  }, [current?.data]);

  const setMetadata = useCallback((updater: any) => {
    console.warn('setMetadata is deprecated. Use the new AI SDK Tools artifacts instead.');
    // This is a no-op for backward compatibility
  }, []);

  return {
    artifact,
    setArtifact,
    metadata,
    setMetadata,
  };
}

/**
 * Utility functions for artifact management
 */
export const artifactUtils = {
  /**
   * Get artifact definition by type
   */
  getDefinition: (type: ArtifactType) => artifactDefinitions[type],

  /**
   * Validate artifact data against schema
   */
  validateData: (type: ArtifactType, data: unknown) => {
    const definition = artifactDefinitions[type];
    return definition.schema.safeParse(data);
  },

  /**
   * Create default data for artifact type
   */
  createDefaultData: (type: ArtifactType) => {
    const definition = artifactDefinitions[type];
    return definition.schema.parse({});
  },

  /**
   * Check if data matches artifact type schema
   */
  isValidArtifactData: (type: ArtifactType, data: unknown): data is ArtifactData => {
    const result = artifactUtils.validateData(type, data);
    return result.success;
  },
};

/**
 * ===============================================
 * NEW v0.4 ENHANCED HOOKS
 * ===============================================
 */

/**
 * Hook to monitor specific artifact types
 * Uses the v0.4 useArtifacts to watch for specific artifact types
 */
export function useArtifactTypeMonitor(types: ArtifactType[]) {
  const artifactIds = types.map(type => `${type}-artifact`);
  
  const { byType, artifacts } = useArtifacts({
    onData: (artifactType, data) => {
      if (artifactIds.includes(artifactType)) {
        console.log(`📦 Monitored artifact updated: ${artifactType}`, data);
      }
    }
  });

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter(artifact => artifactIds.includes(artifact.type));
  }, [artifacts, artifactIds]);

  const getArtifactsByMonitoredType = useCallback((type: ArtifactType) => {
    return byType[`${type}-artifact`] || [];
  }, [byType]);

  return {
    artifacts: filteredArtifacts,
    byType: Object.fromEntries(
      artifactIds.map(id => [id, byType[id] || []])
    ),
    getArtifactsByMonitoredType,
    count: filteredArtifacts.length,
  };
}

/**
 * Hook for artifact lifecycle management
 * Provides callbacks and utilities for different artifact states
 */
export function useArtifactLifecycle() {
  const { toast } = useToast();
  
  return useArtifacts({
    onData: (artifactType, data) => {
      const typeName = artifactType.replace('-artifact', '');
      
      switch (data.status) {
        case 'loading':
          console.log(`🔄 ${typeName} artifact started loading...`);
          break;
        case 'streaming':
          console.log(`📡 ${typeName} artifact streaming... (${Math.round((data.progress || 0) * 100)}%)`);
          break;
        case 'complete':
          console.log(`✅ ${typeName} artifact completed!`);
          toast({
            title: "Artifact Complete",
            description: `${typeName} artifact has been generated successfully.`,
          });
          break;
        case 'error':
          console.error(`❌ ${typeName} artifact failed:`, data.error);
          toast({
            title: "Artifact Error",
            description: `Failed to generate ${typeName} artifact: ${data.error}`,
            variant: "destructive",
          });
          break;
      }
    }
  });
}

/**
 * Hook for real-time artifact statistics
 * Provides detailed analytics on artifact usage and performance
 */
export function useArtifactAnalytics() {
  const { artifacts } = useArtifacts();

  return useMemo(() => {
    const now = Date.now();
    const last24Hours = now - (24 * 60 * 60 * 1000);
    const lastHour = now - (60 * 60 * 1000);

    const analytics = {
      total: artifacts.length,
      recent: {
        last24Hours: artifacts.filter(a => a.createdAt > last24Hours).length,
        lastHour: artifacts.filter(a => a.createdAt > lastHour).length,
      },
      byStatus: {
        idle: artifacts.filter(a => a.status === 'idle').length,
        loading: artifacts.filter(a => a.status === 'loading').length,
        streaming: artifacts.filter(a => a.status === 'streaming').length,
        complete: artifacts.filter(a => a.status === 'complete').length,
        error: artifacts.filter(a => a.status === 'error').length,
      },
      byType: {} as Record<string, number>,
      performance: {
        averageProgress: 0,
        completionRate: 0,
        errorRate: 0,
      },
    };

    // Calculate type distribution
    artifacts.forEach(artifact => {
      const type = artifact.type.replace('-artifact', '');
      analytics.byType[type] = (analytics.byType[type] || 0) + 1;
    });

    // Calculate performance metrics
    const completedArtifacts = artifacts.filter(a => a.status === 'complete');
    const erroredArtifacts = artifacts.filter(a => a.status === 'error');
    
    analytics.performance.completionRate = artifacts.length > 0 
      ? completedArtifacts.length / artifacts.length 
      : 0;
    
    analytics.performance.errorRate = artifacts.length > 0 
      ? erroredArtifacts.length / artifacts.length 
      : 0;

    // Calculate average progress for active artifacts
    const activeArtifacts = artifacts.filter(a => 
      a.progress !== undefined && (a.status === 'streaming' || a.status === 'loading')
    );
    
    if (activeArtifacts.length > 0) {
      analytics.performance.averageProgress = activeArtifacts
        .reduce((sum, a) => sum + (a.progress || 0), 0) / activeArtifacts.length;
    }

    return analytics;
  }, [artifacts]);
}

/**
 * Hook for artifact search and filtering
 * Provides advanced search capabilities across all artifacts
 */
export function useArtifactSearch() {
  const { artifacts } = useArtifacts();

  const searchArtifacts = useCallback((query: string, filters?: {
    types?: ArtifactType[];
    statuses?: ArtifactStatus[];
    dateRange?: { start: number; end: number };
  }) => {
    let filtered = [...artifacts];

    // Text search in artifact data
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(artifact => {
        const payload = artifact.payload as any;
        return (
          artifact.type.toLowerCase().includes(lowerQuery) ||
          (payload?.title && payload.title.toLowerCase().includes(lowerQuery)) ||
          (payload?.content && payload.content.toLowerCase().includes(lowerQuery)) ||
          JSON.stringify(payload).toLowerCase().includes(lowerQuery)
        );
      });
    }

    // Filter by types
    if (filters?.types?.length) {
      const typeIds = filters.types.map(type => `${type}-artifact`);
      filtered = filtered.filter(artifact => typeIds.includes(artifact.type));
    }

    // Filter by statuses
    if (filters?.statuses?.length) {
      filtered = filtered.filter(artifact => filters.statuses!.includes(artifact.status));
    }

    // Filter by date range
    if (filters?.dateRange) {
      const { start, end } = filters.dateRange;
      filtered = filtered.filter(artifact => 
        artifact.createdAt >= start && artifact.createdAt <= end
      );
    }

    return filtered;
  }, [artifacts]);

  const getRecentArtifacts = useCallback((limit = 10) => {
    return [...artifacts]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  }, [artifacts]);

  const getMostActiveType = useCallback(() => {
    const typeCounts: Record<string, number> = {};
    artifacts.forEach(artifact => {
      const type = artifact.type.replace('-artifact', '');
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    return Object.entries(typeCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] as ArtifactType;
  }, [artifacts]);

  return {
    searchArtifacts,
    getRecentArtifacts,
    getMostActiveType,
    totalCount: artifacts.length,
  };
}