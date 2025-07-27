"use client";

import { ReactNode } from "react";
import {
  ClockRewind,
  Copy,
  MessageSquare,
  PenTool,
  Redo,
  Undo,
} from "lucide-react";
import { toast } from "sonner";
import { createTracedOperation } from "@/lib/observability/tracing";
import { DocumentSkeleton } from "../document-skeleton";
import { DiffView } from "../diff-view";
import { TextEditor } from "../editors/text-editor";

// Context7 - Data-as-Code: Text artifact metadata interface
interface TextArtifactMetadata {
  suggestions: Array<{
    id: string;
    content: string;
    documentId: string;
    createdAt: Date;
  }>;
}

// Context7 - Data-as-Code: Base artifact types (simplified for now)
type ArtifactKind = "text" | "code" | "image" | "sheet";
type ArtifactMode = "edit" | "diff";
type ArtifactStatus = "streaming" | "idle";

interface ArtifactContentProps<T = any> {
  title: string;
  content: string;
  mode: ArtifactMode;
  status: ArtifactStatus;
  currentVersionIndex: number;
  suggestions: any[];
  onSaveContent: (content: string, debounce: boolean) => void;
  isInline: boolean;
  isCurrentVersion: boolean;
  getDocumentContentById: (index: number) => string;
  isLoading: boolean;
  metadata: T;
  setMetadata: (metadata: T | ((prev: T) => T)) => void;
}

interface ArtifactAction<T = any> {
  icon: ReactNode;
  description: string;
  onClick: (context: any) => void;
  isDisabled?: (context: any) => boolean;
}

interface ArtifactToolbarAction {
  icon: ReactNode;
  description: string;
  onClick: (context: any) => void;
}

interface ArtifactDefinition<K extends ArtifactKind, T = any> {
  kind: K;
  description: string;
  content: (props: ArtifactContentProps<T>) => ReactNode;
  actions: ArtifactAction<T>[];
  toolbar: ArtifactToolbarAction[];
  initialize?: (context: {
    documentId: string;
    setMetadata: (metadata: T | ((prev: T) => T)) => void;
  }) => Promise<void>;
  onStreamPart?: (context: any) => void;
}

// Context7 - Modularity: Simple artifact base class
class Artifact<K extends ArtifactKind, T = any>
  implements ArtifactDefinition<K, T>
{
  public readonly kind: K;
  public readonly description: string;
  public readonly content: (props: ArtifactContentProps<T>) => ReactNode;
  public readonly actions: ArtifactAction<T>[];
  public readonly toolbar: ArtifactToolbarAction[];
  public readonly initialize?: (context: {
    documentId: string;
    setMetadata: (metadata: T | ((prev: T) => T)) => void;
  }) => Promise<void>;
  public readonly onStreamPart?: (context: any) => void;

  constructor(definition: ArtifactDefinition<K, T>) {
    this.kind = definition.kind;
    this.description = definition.description;
    this.content = definition.content;
    this.actions = definition.actions;
    this.toolbar = definition.toolbar;
    this.initialize = definition.initialize;
    this.onStreamPart = definition.onStreamPart;
  }
}

/**
 * Context7-compliant text artifact implementation
 * Observability: Enhanced tracing for text operations
 * Modularity: Clean separation of text editing concerns
 * Provider Isolation: Abstracted suggestion and content management
 */
export const textArtifact = new Artifact<"text", TextArtifactMetadata>({
  kind: "text",
  description: "Useful for text content, like drafting essays and emails.",

  // Context7 - Provider Isolation: Initialization with tracing
  initialize: async ({ documentId, setMetadata }) => {
    return createTracedOperation(
      {
        name: "artifact.text.initialize",
        attributes: {
          "artifact.document_id": documentId,
          "artifact.kind": "text",
        },
      },
      async (span) => {
        try {
          // Context7 - Provider Isolation: Fetch suggestions
          const response = await fetch(
            `/api/suggestions?documentId=${documentId}`,
          );
          const suggestions = response.ok ? await response.json() : [];

          setMetadata({
            suggestions,
          });

          span.setAttributes({
            "artifact.suggestions_count": suggestions.length,
            "artifact.initialize_success": true,
          });
        } catch (error) {
          span.setAttributes({
            "artifact.initialize_success": false,
            "artifact.error":
              error instanceof Error ? error.message : String(error),
          });

          // Fallback to empty suggestions
          setMetadata({
            suggestions: [],
          });
        }
      },
    );
  },

  // Context7 - Observability: Stream handling with tracing
  onStreamPart: ({ streamPart, setMetadata, setArtifact }) => {
    createTracedOperation(
      {
        name: "artifact.text.stream_part",
        attributes: {
          "artifact.stream_part_type": streamPart.type,
        },
      },
      async (span) => {
        if (streamPart.type === "data-suggestion") {
          setMetadata((metadata: TextArtifactMetadata) => {
            const updatedMetadata = {
              suggestions: [...metadata.suggestions, streamPart.data],
            };

            span.setAttributes({
              "artifact.suggestions_count": updatedMetadata.suggestions.length,
            });

            return updatedMetadata;
          });
        }

        if (streamPart.type === "data-textDelta") {
          setArtifact((draftArtifact: any) => {
            const updatedContent = draftArtifact.content + streamPart.data;

            span.setAttributes({
              "artifact.content_length": updatedContent.length,
              "artifact.delta_length": streamPart.data.length,
            });

            return {
              ...draftArtifact,
              content: updatedContent,
              isVisible:
                draftArtifact.status === "streaming" &&
                updatedContent.length > 400 &&
                updatedContent.length < 450
                  ? true
                  : draftArtifact.isVisible,
              status: "streaming",
            };
          });
        }
      },
    );
  },

  // Context7 - Modularity: Content rendering component
  content: ({
    mode,
    status,
    content,
    isCurrentVersion,
    currentVersionIndex,
    onSaveContent,
    getDocumentContentById,
    isLoading,
    metadata,
  }) => {
    if (isLoading) {
      return <DocumentSkeleton artifactKind="text" />;
    }

    if (mode === "diff") {
      const oldContent = getDocumentContentById(currentVersionIndex - 1);
      const newContent = getDocumentContentById(currentVersionIndex);

      return <DiffView oldContent={oldContent} newContent={newContent} />;
    }

    return (
      <div className="flex flex-row py-8 md:p-20 px-4">
        <TextEditor
          content={content}
          suggestions={metadata ? metadata.suggestions : []}
          isCurrentVersion={isCurrentVersion}
          currentVersionIndex={currentVersionIndex}
          status={status}
          onSaveContent={onSaveContent}
        />

        {metadata?.suggestions && metadata.suggestions.length > 0 ? (
          <div className="md:hidden h-dvh w-12 shrink-0" />
        ) : null}
      </div>
    );
  },

  // Context7 - Modularity: Text-specific actions with observability
  actions: [
    {
      icon: <ClockRewind size={18} />,
      description: "View changes",
      onClick: ({ handleVersionChange }) => {
        createTracedOperation(
          {
            name: "artifact.text.action.view_changes",
            attributes: {
              "artifact.action": "view_changes",
            },
          },
          async (span) => {
            handleVersionChange("toggle");
            span.setAttributes({
              "artifact.action_success": true,
            });
          },
        );
      },
      isDisabled: ({ currentVersionIndex }) => {
        return currentVersionIndex === 0;
      },
    },
    {
      icon: <Undo size={18} />,
      description: "View Previous version",
      onClick: ({ handleVersionChange }) => {
        createTracedOperation(
          {
            name: "artifact.text.action.previous_version",
            attributes: {
              "artifact.action": "previous_version",
            },
          },
          async (span) => {
            handleVersionChange("prev");
            span.setAttributes({
              "artifact.action_success": true,
            });
          },
        );
      },
      isDisabled: ({ currentVersionIndex }) => {
        return currentVersionIndex === 0;
      },
    },
    {
      icon: <Redo size={18} />,
      description: "View Next version",
      onClick: ({ handleVersionChange }) => {
        createTracedOperation(
          {
            name: "artifact.text.action.next_version",
            attributes: {
              "artifact.action": "next_version",
            },
          },
          async (span) => {
            handleVersionChange("next");
            span.setAttributes({
              "artifact.action_success": true,
            });
          },
        );
      },
      isDisabled: ({ isCurrentVersion }) => {
        return isCurrentVersion;
      },
    },
    {
      icon: <Copy size={18} />,
      description: "Copy to clipboard",
      onClick: ({ content }) => {
        createTracedOperation(
          {
            name: "artifact.text.action.copy_clipboard",
            attributes: {
              "artifact.action": "copy_clipboard",
              "artifact.content_length": content.length,
            },
          },
          async (span) => {
            try {
              await navigator.clipboard.writeText(content);
              toast.success("Copied to clipboard!");
              span.setAttributes({
                "artifact.action_success": true,
              });
            } catch (error) {
              toast.error("Failed to copy to clipboard");
              span.setAttributes({
                "artifact.action_success": false,
                "artifact.error":
                  error instanceof Error ? error.message : String(error),
              });
            }
          },
        );
      },
    },
  ],

  // Context7 - Modularity: Text-specific toolbar actions
  toolbar: [
    {
      icon: <PenTool size={16} />,
      description: "Add final polish",
      onClick: ({ sendMessage }) => {
        createTracedOperation(
          {
            name: "artifact.text.toolbar.final_polish",
            attributes: {
              "artifact.toolbar_action": "final_polish",
            },
          },
          async (span) => {
            sendMessage({
              role: "user",
              parts: [
                {
                  type: "text",
                  text: "Please add final polish and check for grammar, add section titles for better structure, and ensure everything reads smoothly.",
                },
              ],
            });

            span.setAttributes({
              "artifact.toolbar_action_success": true,
            });
          },
        );
      },
    },
    {
      icon: <MessageSquare size={16} />,
      description: "Request suggestions",
      onClick: ({ sendMessage }) => {
        createTracedOperation(
          {
            name: "artifact.text.toolbar.request_suggestions",
            attributes: {
              "artifact.toolbar_action": "request_suggestions",
            },
          },
          async (span) => {
            sendMessage({
              role: "user",
              parts: [
                {
                  type: "text",
                  text: "Please add suggestions you have that could improve the writing.",
                },
              ],
            });

            span.setAttributes({
              "artifact.toolbar_action_success": true,
            });
          },
        );
      },
    },
  ],
});

// Context7 - Modular exports
export type { TextArtifactMetadata };
export { Artifact };
