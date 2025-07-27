"use client";

import { useCallback, useMemo } from "react";
import useSWR from "swr";
import { create } from "zustand";

import {
  ArtifactKind,
  BaseArtifactData,
  initialArtifactData,
} from "@/artifacts";

interface ArtifactStore {
  artifact: BaseArtifactData;
  metadata: Record<string, any>;
  setArtifact: (updater: (prev: BaseArtifactData) => BaseArtifactData) => void;
  setMetadata: (
    updater: (prev: Record<string, any>) => Record<string, any>
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

export function useArtifact() {
  const { data: localArtifact, mutate: setLocalArtifact } =
    useSWR<BaseArtifactData>("artifact", null, {
      fallbackData: initialArtifactData,
    });

  const artifact = useMemo(() => {
    if (!localArtifact) return initialArtifactData;
    return localArtifact;
  }, [localArtifact]);

  const setArtifact = useCallback(
    (
      updaterFn:
        | BaseArtifactData
        | ((currentArtifact: BaseArtifactData) => BaseArtifactData)
    ) => {
      setLocalArtifact((currentArtifact: BaseArtifactData | undefined) => {
        const artifactToUpdate = currentArtifact || initialArtifactData;

        if (typeof updaterFn === "function") {
          return updaterFn(artifactToUpdate);
        }

        return updaterFn;
      });
    },
    [setLocalArtifact]
  );

  const { data: localArtifactMetadata, mutate: setLocalArtifactMetadata } =
    useSWR<any>(
      () =>
        artifact.documentId ? `artifact-metadata-${artifact.documentId}` : null,
      null,
      {
        fallbackData: null,
      }
    );

  return useMemo(
    () => ({
      artifact,
      setArtifact,
      metadata: localArtifactMetadata,
      setMetadata: setLocalArtifactMetadata,
    }),
    [artifact, setArtifact, localArtifactMetadata, setLocalArtifactMetadata]
  );
}
