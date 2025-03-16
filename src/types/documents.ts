import { Json } from './database';
import type { Database } from './database';
import { z } from 'zod';

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

// Document Analysis types
export interface DocumentAnalysis {
  isValid: boolean;
  extractedData: Record<string, any>;
  formatErrors: Array<{
    type: 'critical' | 'warning';
    message: string;
    position?: { x: number, y: number };
    suggestion?: string;
  }>;
  contentErrors: Array<{
    type: 'critical' | 'warning';
    message: string;
    section: string;
    suggestion?: string;
  }>;
  completeness: number; // 0-1 score
  languageDetection: {
    primary: string;
    confidence: number;
    secondary?: string;
  };
}

// Validation result type
export interface ValidationResult {
  valid: boolean;
  errors: Array<{
    field: string;
    message: string;
    type: 'critical' | 'warning';
  }>;
  suggestions: Array<{
    field: string;
    suggestion: string;
  }>;
  completenessScore: number; // 0-1 score
}

// Document type enum
export enum DocumentType {
  PASSPORT = 'passport',
  VISA = 'visa',
  BIRTH_CERTIFICATE = 'birth_certificate',
  MARRIAGE_CERTIFICATE = 'marriage_certificate',
  EDUCATION_CREDENTIAL = 'education_credential',
  EMPLOYMENT_LETTER = 'employment_letter',
  FINANCIAL_STATEMENT = 'financial_statement',
  POLICE_CERTIFICATE = 'police_certificate',
  MEDICAL_EXAM = 'medical_exam',
  IMMIGRATION_FORM = 'immigration_form',
  OTHER = 'other'
}

// Document status enum
export enum DocumentStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  NEEDS_CORRECTION = 'needs_correction',
  EXPIRED = 'expired',
  UPLOADED = 'uploaded'
}

// Zod schema for document analysis request
export const DocumentAnalysisRequestSchema = z.object({
  documentType: z.string(),
  fileUrl: z.string().url(),
  userId: z.string().optional(),
  targetCountry: z.string().optional(),
  languageOverride: z.string().optional(),
});

export type DocumentAnalysisRequest = z.infer<typeof DocumentAnalysisRequestSchema>; 