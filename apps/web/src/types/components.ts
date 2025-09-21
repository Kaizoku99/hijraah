import { VariantProps } from "class-variance-authority";
import { ComponentType, Dispatch, SetStateAction } from "react";
import { FileWithPath } from "react-dropzone";

import { ArtifactKind, BaseArtifactData } from "@/artifacts";

/**
 * Basic suggestion interface for use in DataStreamDelta
 * A simplified version, actual DB structure is in supabase/schema.ts
 */
export interface Suggestion {
  id: string;
  documentId: string;
  originalText: string;
  suggestedText: string;
  description?: string;
  isResolved: boolean;
}

/**
 * Defines the structure of a data stream delta for handling streaming content
 */
export type DataStreamDelta = {
  type:
    | "text-delta"
    | "code-delta"
    | "sheet-delta"
    | "image-delta"
    | "title"
    | "id"
    | "suggestion"
    | "clear"
    | "finish"
    | "kind";
  content: string | Suggestion;
};

/**
 * Sidebar component props interface
 */
export interface SidebarProps extends React.ComponentProps<"div"> {
  // Add additional props here
}

/**
 * Document status type for UI components
 */
export type UIDocumentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

/**
 * Document card props interface
 */
export interface DocumentCardProps {
  id: string;
  title: string;
  description?: string;
  status: UIDocumentStatus;
  documentType?: string;
  dateSubmitted?: Date;
  expiryDate?: Date;
  requiresAction?: boolean;
  onView?: () => void;
  onDownload?: () => void;
  className?: string;
}

/**
 * Extended attachment interface for unified chat
 */
export interface ExtendedAttachment extends FileWithPath {
  id: string;
  name: string;
  type: string;
  url?: string;
  size: number;
  status: "uploading" | "uploaded" | "error";
  progress?: number;
}

/**
 * Artifact state type for unified chat
 */
export type ArtifactState = BaseArtifactData;

/**
 * Stream data point type for streaming content
 * @deprecated Use DataStreamDelta instead which has standardized field names
 */
export type StreamDataPoint = {
  type: string; // UI-specific event types like 'artifact_kind', 'artifact_title', etc.
  content: any; // Content associated with the type (renamed from 'value' to match DataStreamDelta)
};

/**
 * Navigation route keys
 */
export type RouteKey =
  | "home"
  | "documents"
  | "chat"
  | "requirements"
  | "calculator"
  | "notifications"
  | "profile"
  | "settings"
  | "countries"
  | "compare"
  | "explore";

/**
 * Roadmap type for roadmap visualization
 */
export interface RoadmapType {
  id: string;
  title: string;
  description: string;
  case_id: string;
  case_type: string;
  user_id: string;
  phases: PhaseType[];
  start_date: string;
  target_end_date: string;
  estimated_end_date: string;
  completion_percentage: number;
  last_updated: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * Phase type for roadmap
 */
export interface PhaseType {
  id: string;
  name: string;
  status: "pending" | "in_progress" | "completed";
  tasks: TaskType[];
  start_date?: string;
  end_date?: string;
  dependencies?: string[];
}

/**
 * Task type for roadmap phases
 */
export interface TaskType {
  id: string;
  name: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  assignee?: string;
  due_date?: string;
}

/**
 * Artifact configuration for create-artifact component
 */
export type ArtifactConfig<T extends string, M = any> = {
  kind: T;
  description: string;
  content: ComponentType<ArtifactContent<M>>;
  actions: Array<ArtifactAction<M>>;
  toolbar: ArtifactToolbarItem[];
  initialize?: (parameters: InitializeParameters<M>) => void;
  onStreamPart: (args: {
    setMetadata: Dispatch<SetStateAction<M>>;
    setArtifact: Dispatch<SetStateAction<UIArtifact>>;
    streamPart: DataStreamDelta;
  }) => void;
};

/**
 * Placeholder interfaces needed by ArtifactConfig
 */
export interface ArtifactContent<M> {
  metadata: M;
}

export interface ArtifactAction<M> {
  label: string;
  icon?: React.ReactNode;
  action: (metadata: M) => void;
}

export interface ArtifactToolbarItem {
  icon: React.ReactNode;
  action: () => void;
  tooltip: string;
}

export interface InitializeParameters<M> {
  setMetadata: Dispatch<SetStateAction<M>>;
}

export interface UIArtifact {
  id?: string;
  title: string;
  content: any;
}

/**
 * Toast action types
 */
export enum ActionType {
  ADD_TOAST = "ADD_TOAST",
  UPDATE_TOAST = "UPDATE_TOAST",
  DISMISS_TOAST = "DISMISS_TOAST",
  REMOVE_TOAST = "REMOVE_TOAST",
}

export type ToastAction =
  | { type: ActionType.ADD_TOAST; toast: ToasterToast }
  | { type: ActionType.UPDATE_TOAST; toast: Partial<ToasterToast> }
  | { type: ActionType.DISMISS_TOAST; toastId?: string }
  | { type: ActionType.REMOVE_TOAST; toastId?: string };

export interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  // Add other fields as needed
}
