import { ReactNode, Dispatch, SetStateAction } from "react";
import { createTracedOperation } from "@/lib/observability/tracing";

// Context7 - Data-as-Code: Base artifact interfaces
export type ArtifactKind = "text" | "code" | "image" | "sheet";
export type ArtifactMode = "edit" | "diff";
export type ArtifactStatus = "streaming" | "idle";

// Context7 - Provider Isolation: Artifact action interface
export interface ArtifactAction<T = any> {
  icon: ReactNode;
  description: string;
  onClick: (context: ArtifactActionContext<T>) => void;
  isDisabled?: (context: ArtifactActionContext<T>) => boolean;
}

// Context7 - Provider Isolation: Toolbar action interface
export interface ArtifactToolbarAction {
  icon: ReactNode;
  description: string;
  onClick: (context: ArtifactToolbarContext) => void;
}

// Context7 - Data-as-Code: Action context interfaces
export interface ArtifactActionContext<T = any> {
  content: string;
  handleVersionChange: (type: "next" | "prev" | "toggle" | "latest") => void;
  currentVersionIndex: number;
  isCurrentVersion: boolean;
  metadata: T;
  setMetadata: Dispatch<SetStateAction<T>>;
}

export interface ArtifactToolbarContext {
  sendMessage: (message: any) => void;
  status: string;
  stop: () => void;
  setMessages: Dispatch<SetStateAction<any[]>>;
}

// Context7 - Data-as-Code: Content component props
export interface ArtifactContentProps<T = any> {
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
  setMetadata: Dispatch<SetStateAction<T>>;
}

// Context7 - Data-as-Code: Stream part interfaces
export interface TextDeltaStreamPart {
  type: "data-textDelta";
  data: string;
}

export interface CodeDeltaStreamPart {
  type: "data-codeDelta";
  data: string;
}

export interface SuggestionStreamPart {
  type: "data-suggestion";
  data: any;
}

export type ArtifactStreamPart =
  | TextDeltaStreamPart
  | CodeDeltaStreamPart
  | SuggestionStreamPart;

// Context7 - Data-as-Code: Stream handling context
export interface StreamHandlingContext<T = any> {
  streamPart: ArtifactStreamPart;
  setMetadata: Dispatch<SetStateAction<T>>;
  setArtifact: Dispatch<SetStateAction<any>>;
}

// Context7 - Data-as-Code: Initialization context
export interface ArtifactInitContext<T = any> {
  documentId: string;
  setMetadata: Dispatch<SetStateAction<T>>;
}

// Context7 - Modularity: Base artifact definition interface
export interface ArtifactDefinition<K extends ArtifactKind, T = any> {
  kind: K;
  description: string;
  content: (props: ArtifactContentProps<T>) => ReactNode;
  actions: ArtifactAction<T>[];
  toolbar: ArtifactToolbarAction[];
  initialize?: (context: ArtifactInitContext<T>) => Promise<void>;
  onStreamPart?: (context: StreamHandlingContext<T>) => void;
}

/**
 * Context7-compliant base Artifact class
 * Modularity: Provides common functionality for all artifact types
 * Observability: Built-in tracing for artifact operations
 * Provider Isolation: Clean abstraction for different artifact types
 */
export class Artifact<K extends ArtifactKind, T = any>
  implements ArtifactDefinition<K, T>
{
  public readonly kind: K;
  public readonly description: string;
  public readonly content: (props: ArtifactContentProps<T>) => ReactNode;
  public readonly actions: ArtifactAction<T>[];
  public readonly toolbar: ArtifactToolbarAction[];
  public readonly initialize?: (
    context: ArtifactInitContext<T>,
  ) => Promise<void>;
  public readonly onStreamPart?: (context: StreamHandlingContext<T>) => void;

  constructor(definition: ArtifactDefinition<K, T>) {
    this.kind = definition.kind;
    this.description = definition.description;
    this.content = definition.content;
    this.actions = definition.actions;
    this.toolbar = definition.toolbar;
    this.initialize = definition.initialize
      ? this.wrapInitialize(definition.initialize)
      : undefined;
    this.onStreamPart = definition.onStreamPart
      ? this.wrapStreamHandler(definition.onStreamPart)
      : undefined;
  }

  /**
   * Context7 - Observability: Wrap initialization with tracing
   */
  private wrapInitialize(
    originalInitialize: (context: ArtifactInitContext<T>) => Promise<void>,
  ) {
    return async (context: ArtifactInitContext<T>) => {
      return createTracedOperation(
        {
          name: `artifact.${this.kind}.initialize`,
          attributes: {
            "artifact.kind": this.kind,
            "artifact.document_id": context.documentId,
          },
        },
        async (span) => {
          await originalInitialize(context);
          span.setAttributes({
            "artifact.initialize_success": true,
          });
        },
      );
    };
  }

  /**
   * Context7 - Observability: Wrap stream handling with tracing
   */
  private wrapStreamHandler(
    originalHandler: (context: StreamHandlingContext<T>) => void,
  ) {
    return (context: StreamHandlingContext<T>) => {
      createTracedOperation(
        {
          name: `artifact.${this.kind}.stream_part`,
          attributes: {
            "artifact.kind": this.kind,
            "artifact.stream_part_type": context.streamPart.type,
          },
        },
        async (span) => {
          originalHandler(context);
          span.setAttributes({
            "artifact.stream_handled": true,
          });
        },
      );
    };
  }

  /**
   * Context7 - Modularity: Create traced action wrapper
   */
  protected createTracedAction<ActionT = T>(
    action: ArtifactAction<ActionT>,
  ): ArtifactAction<ActionT> {
    return {
      ...action,
      onClick: (context: ArtifactActionContext<ActionT>) => {
        createTracedOperation(
          {
            name: `artifact.${this.kind}.action`,
            attributes: {
              "artifact.kind": this.kind,
              "artifact.action": action.description,
              "artifact.current_version": context.currentVersionIndex,
            },
          },
          async (span) => {
            action.onClick(context);
            span.setAttributes({
              "artifact.action_success": true,
            });
          },
        );
      },
    };
  }

  /**
   * Context7 - Modularity: Create traced toolbar action wrapper
   */
  protected createTracedToolbarAction(
    action: ArtifactToolbarAction,
  ): ArtifactToolbarAction {
    return {
      ...action,
      onClick: (context: ArtifactToolbarContext) => {
        createTracedOperation(
          {
            name: `artifact.${this.kind}.toolbar_action`,
            attributes: {
              "artifact.kind": this.kind,
              "artifact.toolbar_action": action.description,
            },
          },
          async (span) => {
            action.onClick(context);
            span.setAttributes({
              "artifact.toolbar_action_success": true,
            });
          },
        );
      },
    };
  }

  /**
   * Context7 - Data-as-Code: Validate artifact configuration
   */
  public validate(): boolean {
    const hasRequiredFields = !!(
      this.kind &&
      this.description &&
      this.content &&
      this.actions &&
      this.toolbar
    );

    const hasValidKind = ["text", "code", "image", "sheet"].includes(this.kind);

    return hasRequiredFields && hasValidKind;
  }

  /**
   * Context7 - Provider Isolation: Get artifact metadata
   */
  public getMetadata() {
    return {
      kind: this.kind,
      description: this.description,
      actionsCount: this.actions.length,
      toolbarCount: this.toolbar.length,
      hasInitialize: !!this.initialize,
      hasStreamHandler: !!this.onStreamPart,
    };
  }
}

// Context7 - Modularity: Helper function to create artifact instances
export function createArtifact<K extends ArtifactKind, T = any>(
  definition: ArtifactDefinition<K, T>,
): Artifact<K, T> {
  const artifact = new Artifact(definition);

  if (!artifact.validate()) {
    throw new Error(`Invalid artifact definition for kind: ${definition.kind}`);
  }

  return artifact;
}

// Context7 - Data-as-Code: Common artifact utilities
export const artifactUtils = {
  /**
   * Get artifact kind from content
   */
  detectArtifactKind(content: string): ArtifactKind {
    // Simple heuristics for content detection
    if (
      content.includes("```") ||
      content.includes("function") ||
      content.includes("class")
    ) {
      return "code";
    }
    if (content.includes("|") && content.includes("-")) {
      return "sheet"; // Basic table detection
    }
    if (content.includes("![") || content.includes("<img")) {
      return "image";
    }
    return "text"; // Default fallback
  },

  /**
   * Validate content for artifact type
   */
  validateContent(content: string, kind: ArtifactKind): boolean {
    if (!content || content.trim().length === 0) {
      return false;
    }

    switch (kind) {
      case "text":
        return content.length > 0;
      case "code":
        return (
          content.includes("{") ||
          content.includes("function") ||
          content.includes("class")
        );
      case "image":
        return content.includes("data:image") || content.includes("http");
      case "sheet":
        return content.includes("|") || content.includes(",");
      default:
        return false;
    }
  },

  /**
   * Extract title from content
   */
  extractTitle(content: string, kind: ArtifactKind): string {
    const lines = content.split("\n");
    const firstLine = lines[0]?.trim() || "";

    switch (kind) {
      case "text":
        // Look for markdown headers
        if (firstLine.startsWith("#")) {
          return firstLine.replace(/^#+\s*/, "");
        }
        return (
          firstLine.substring(0, 50) + (firstLine.length > 50 ? "..." : "")
        );

      case "code":
        // Look for function/class names
        const funcMatch = content.match(
          /(?:function|class|const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)/,
        );
        if (funcMatch) {
          return funcMatch[1];
        }
        return "Code Snippet";

      case "image":
        return "Image";

      case "sheet":
        return "Data Sheet";

      default:
        return "Artifact";
    }
  },
};

// Context7 - Modular exports
export type {
  ArtifactDefinition,
  ArtifactContentProps,
  ArtifactAction,
  ArtifactToolbarAction,
  ArtifactActionContext,
  ArtifactToolbarContext,
  StreamHandlingContext,
  ArtifactInitContext,
};
