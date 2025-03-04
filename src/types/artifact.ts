export type ArtifactType = 'document' | 'spreadsheet' | 'code' | 'image' | 'mindmap';

export type ArtifactVisibility = 'private' | 'public' | 'team';

export interface Artifact {
  id: string;
  title: string;
  content: any;
  type: ArtifactType;
  created_at: string;
  updated_at: string;
  user_id: string;
  chat_id?: string;
  visibility: ArtifactVisibility;
}

export interface ArtifactMessage {
  id: string;
  artifact_id: string;
  message: string;
  role: 'user' | 'assistant' | 'system';
  created_at: string;
}

export interface DocumentContent {
  text: string;
  format?: 'markdown' | 'plain';
}

export interface CodeContent {
  code: string;
  language: string;
  fileName?: string;
}

export interface SpreadsheetContent {
  columns: Array<{
    id: string;
    name: string;
    type: 'text' | 'number' | 'date' | 'boolean';
  }>;
  rows: Record<string, any>[];
}

export interface ImageContent {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface MindMapContent {
  nodes: Array<{
    id: string;
    text: string;
    parentId?: string;
  }>;
}

export type ArtifactContent = 
  | { type: 'document'; content: DocumentContent }
  | { type: 'code'; content: CodeContent }
  | { type: 'spreadsheet'; content: SpreadsheetContent }
  | { type: 'image'; content: ImageContent }
  | { type: 'mindmap'; content: MindMapContent }; 