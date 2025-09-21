"use client";

import { useCallback, useMemo } from "react";
import useSWR from "swr";
import { create } from "zustand";

import {
  ArtifactKind,
  BaseArtifactData,
  initialArtifactData,
} from "@/artifacts";

// Import new AI SDK Tools system for enhanced capabilities
import { useAllArtifacts, useLegacyArtifact } from "@/artifacts/ai-sdk-tools";

interface ArtifactStore {
  artifact: BaseArtifactData;
  metadata: Record<string, any>;
  setArtifact: (updater: (prev: BaseArtifactData) => BaseArtifactData) => void;
  setMetadata: (
    updater: (prev: Record<string, any>) => Record<string, any>,
  ) => void;
  resetArtifact: () => void;
}

export const useArtifactStore = create<ArtifactStore>((set) => ({
  artifact: initialArtifactData,
  metadata: {},
  setArtifact: (updater) =>
    set((state) => ({ artifact: updater(state.artifact) })),
  setMetadata: (updater) =>
    set((state) => ({ metadata: updater(state.metadata) })),
  resetArtifact: () => set({ artifact: initialArtifactData, metadata: {} }),
}));

// Convenience hook selector
export const useSetArtifact = () =>
  useArtifactStore((state) => state.setArtifact);
export const useResetArtifact = () =>
  useArtifactStore((state) => state.resetArtifact);
export const useArtifactMetadata = () =>
  useArtifactStore((state) => state.metadata);
export const useSetArtifactMetadata = () =>
  useArtifactStore((state) => state.setMetadata);

// Define the Selector type
type Selector<Selected> = (artifact: BaseArtifactData) => Selected;

export function useArtifactSelector<Selected>(selector: Selector<Selected>) {
  const { data: localArtifact } = useSWR<BaseArtifactData>("artifact", null, {
    fallbackData: initialArtifactData,
  });

  const selectedValue = useMemo(() => {
    if (!localArtifact) return selector(initialArtifactData);
    return selector(localArtifact);
  }, [localArtifact, selector]);

  return selectedValue;
}

/**
 * Enhanced useArtifact with AI SDK Tools integration
 * Now uses AI SDK Tools directly without migration helpers
 */
export function useArtifact() {
  // Use the new AI SDK Tools system
  const allArtifacts = useAllArtifacts();
  const legacyCompat = useLegacyArtifact();
  
  // Keep the original SWR-based implementation as fallback for complete backward compatibility
  const { data: localArtifact, mutate: setLocalArtifact } =
    useSWR<BaseArtifactData>("artifact", null, {
      fallbackData: initialArtifactData,
    });

  const legacyArtifact = useMemo(() => {
    if (!localArtifact) return initialArtifactData;
    return localArtifact;
  }, [localArtifact]);

  const legacySetArtifact = useCallback(
    (
      updaterFn:
        | BaseArtifactData
        | ((currentArtifact: BaseArtifactData) => BaseArtifactData),
    ) => {
      setLocalArtifact((currentArtifact: BaseArtifactData | undefined) => {
        const artifactToUpdate = currentArtifact || initialArtifactData;

        if (typeof updaterFn === "function") {
          return updaterFn(artifactToUpdate);
        }

        return updaterFn;
      });
    },
    [setLocalArtifact],
  );

  const { data: localArtifactMetadata, mutate: setLocalArtifactMetadata } =
    useSWR<any>(
      () =>
        legacyArtifact.documentId ? `artifact-metadata-${legacyArtifact.documentId}` : null,
      null,
      {
        fallbackData: null,
      },
    );

  // Return enhanced version using AI SDK Tools directly
  return useMemo(() => {
    if (allArtifacts.current) {
      return {
        artifact: legacyCompat.artifact,
        setArtifact: legacyCompat.setArtifact,
        metadata: legacyCompat.metadata,
        setMetadata: legacyCompat.setMetadata,
        // Add enhanced AI SDK Tools features
        aiSdkTools: {
          allArtifacts,
          current: allArtifacts.current,
          byType: allArtifacts.byType,
        },
        migration: { isUsingNewSystem: true },
      };
    }
    
    // Fallback to legacy implementation
    return {
      artifact: legacyArtifact,
      setArtifact: legacySetArtifact,
      metadata: localArtifactMetadata,
      setMetadata: setLocalArtifactMetadata,
      // Provide empty AI SDK Tools for consistency
      aiSdkTools: null,
      migration: { isUsingNewSystem: false },
    };
  }, [
    allArtifacts, 
    legacyCompat,
    legacyArtifact, 
    legacySetArtifact, 
    localArtifactMetadata, 
    setLocalArtifactMetadata
  ]);
}
