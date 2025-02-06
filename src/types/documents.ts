import { Json } from './database';
import type { Database } from './database';

export type Document = Database['public']['Tables']['documents']['Row'];

export interface DocumentCategory {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface DocumentShare {
  id: string;
  document_id: string;
  owner_id: string;
  user_id: string;
  permissions: Json;
  status: 'active' | 'revoked';
  created_at: string;
  updated_at: string;
}

export interface DocumentVersion {
  id: string;
  document_id: string;
  version_number: number;
  file_path: string;
  file_size: number;
  changes_description?: string;
  created_by: string;
  created_at: string;
}

export type DocumentPermissions = {
  canView: boolean;
  canEdit: boolean;
  canShare: boolean;
  canDelete: boolean;
  isOwner: boolean;
};

export interface DocumentListProps {
  documents: Document[];
  onDocumentUpdated: () => Promise<void>;
  showCaseColumn?: boolean;
}

export interface DocumentUpload {
  name: string;
  description?: string;
  case_id?: string;
  user_id: string;
  file: File;
  metadata?: Record<string, any>;
}

export interface DocumentFormProps {
  caseId?: string;
  userId: string;
  initialData?: Document;
  onSubmit: (data: DocumentUpload) => Promise<void>;
  onCancel: () => void;
}

export interface DocumentShareProps {
  document: Document;
  onShare: (shareData: Partial<DocumentShare>) => Promise<void>;
} 