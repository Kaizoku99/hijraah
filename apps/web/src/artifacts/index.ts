import { FileText, Code, Table } from "lucide-react"; // Import icons and Table icon
import React from "react"; // Import React

import { DataStreamDelta, StreamDataPoint } from "@/types"; // Import data point type

import { CodeArtifact } from "./code/CodeArtifact";
import { SheetArtifact } from "./sheet/SheetArtifact"; // Import SheetArtifact
import { TextArtifact } from "./text/TextArtifact";

// Define Artifact Kinds (add more as needed)
export enum ArtifactKind {
  Text = "text",
  Code = "code",
  Sheet = "sheet",
  Image = "image",
}

// Placeholder for Artifact Data Structure (adapt based on specific needs)
export interface BaseArtifactData {
  kind: ArtifactKind | null;
  status: "idle" | "streaming" | "error";
  title: string;
  content: any; // Type based on kind (string, object, etc.)
  documentId?: string;
  metadata?: Record<string, any>; // For additional info
}

// Placeholder initial data
export const initialArtifactData: BaseArtifactData = {
  kind: null,
  status: "idle",
  title: "",
  content: null, // Initialize content as null or specific empty state
};

// Define the structure for an artifact definition
export interface ArtifactDefinition {
  kind: ArtifactKind;
  icon: React.ComponentType<{ className?: string }>; // Example: Lucide icon
  component: React.ComponentType<{ artifact: BaseArtifactData }>; // Component to render the artifact
  onStreamPart?: (params: {
    streamPart: DataStreamDelta; // Updated to use centralized type
    setArtifact: (
      updater: (prev: BaseArtifactData) => BaseArtifactData,
    ) => void; // Updated type
    setMetadata?: (
      updater: (prev: Record<string, any>) => Record<string, any>,
    ) => void; // Updated type
  }) => void; // Handler for specific stream deltas
}

// Placeholder definitions array (Populate with actual definitions)
// TODO: Import icons and components
// import { FileText, Code, Sheet, Image } from 'lucide-react';
// import { TextArtifact } from './text/TextArtifact';
// ... import other artifact components

export const artifactDefinitions: ArtifactDefinition[] = [
  {
    kind: ArtifactKind.Text,
    icon: FileText,
    component: TextArtifact,
    onStreamPart: ({ streamPart, setArtifact }) => {
      // Handle text-specific deltas
      if (streamPart.type === "text-delta") {
        setArtifact((draft) => ({
          ...draft,
          // Ensure content is initialized as string
          content:
            (typeof draft.content === "string" ? draft.content : "") +
            streamPart.content,
          status: "streaming",
        }));
      }
      // TODO: Add handlers for common deltas like title, finish if needed here
      // Or handle them centrally in UnifiedChatContainer effect
    },
  },
  {
    kind: ArtifactKind.Code,
    icon: Code,
    component: CodeArtifact,
    onStreamPart: ({ streamPart, setArtifact }) => {
      // Handle code-specific deltas
      if (streamPart.type === "code-delta") {
        setArtifact((draft) => ({
          ...draft,
          // Ensure content is initialized as string before appending
          content:
            (typeof draft.content === "string" ? draft.content : "") +
            streamPart.content,
          status: "streaming",
        }));
      }
      // Handle metadata through custom handlers or from separate metadata object
      // since 'code-metadata' is not in the allowed DataStreamDelta types
    },
  },
  {
    kind: ArtifactKind.Sheet,
    icon: Table, // Use Table icon
    component: SheetArtifact,
    onStreamPart: ({ streamPart, setArtifact }) => {
      setArtifact((draft) => {
        // Initialize content for sheet if it's the first relevant delta
        let currentContent = draft.content;
        if (
          draft.kind === ArtifactKind.Sheet &&
          (currentContent === null ||
            typeof currentContent !== "object" ||
            !currentContent.rows ||
            !currentContent.columns)
        ) {
          currentContent = { columns: [], rows: [] };
        }

        if (streamPart.type === "sheet-delta") {
          // Handle the sheet delta content appropriately
          // For example, if it's column data:
          if (
            typeof streamPart.content === "object" &&
            Array.isArray(streamPart.content)
          ) {
            return {
              ...draft,
              content: {
                ...currentContent,
                rows: [...(currentContent.rows || []), ...streamPart.content],
              },
              status: "streaming",
            };
          }
          return draft;
        }
        return draft; // Return unchanged draft if delta type doesn't match
      });
    },
  },
  // TODO: Add definitions for Image...
];
