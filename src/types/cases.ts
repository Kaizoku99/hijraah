import { Database, Json } from './database';

type CaseRow = Database['public']['Tables']['cases']['Row'];
type TimelineRow = Database['public']['Tables']['case_timeline']['Row'];

export interface Case extends CaseRow {
  case_type: CaseType;
  destination_country: string;
  target_date?: string;
  requirements?: Record<string, any>;
  notes?: string;
  documents?: CaseDocument[];
  timeline?: CaseTimeline[];
}

export type CaseEventType =
  | 'created'
  | 'status_change'
  | 'stage_change'
  | 'document_added'
  | 'document_removed'
  | 'document_updated'
  | 'note_added'
  | 'requirement_updated'
  | 'deadline_updated';

export interface CaseTimeline {
  id: string;
  case_id: string;
  event_type: CaseEventType;
  event_date: string;
  description: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface CaseDocument {
  id: string;
  case_id: string;
  document_id: string;
  name: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  metadata?: {
    expiry_date?: string;
    rejection_reason?: string;
    review_notes?: string;
    required?: boolean;
    [key: string]: any;
  };
  created_at: string;
  updated_at: string;
}

export interface CaseRequirement {
  id: string;
  case_id: string;
  name: string;
  description?: string;
  status: 'pending' | 'completed' | 'waived';
  due_date?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CaseNote {
  id: string;
  case_id: string;
  user_id: string;
  content: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export type CaseStatus = 
  | 'active'
  | 'pending'
  | 'in_progress'
  | 'pending_review'
  | 'completed'
  | 'approved'
  | 'rejected'
  | 'archived';

export type CaseStage =
  | 'document_collection'
  | 'review'
  | 'submission'
  | 'processing'
  | 'decision'
  | 'completed';

export type CaseType =
  | 'student_visa'
  | 'work_visa'
  | 'family_visa'
  | 'permanent_residence'
  | 'citizenship'
  | 'business_visa'
  | 'tourist_visa'
  | 'other';

export interface CaseStats {
  total: number;
  active: number;
  pending: number;
  approved: number;
  rejected: number;
  archived: number;
  by_type: Record<CaseType, number>;
  by_stage: Record<CaseStage, number>;
  documents_pending: number;
  documents_approved: number;
  documents_rejected: number;
}

export interface CaseListProps {
  cases: Case[];
  onCaseUpdated: () => Promise<void>;
}

export interface CaseFormProps {
  initialData?: Case;
  onSubmit: (data: Partial<Case>) => Promise<void>;
  onCancel: () => void;
}

export interface CaseTimelineProps {
  case: Case;
  timeline: CaseTimeline[];
}

export interface CaseAssignment {
  id: string;
  case_id: string;
  user_id: string;
  role: 'owner' | 'member' | 'viewer';
  status: 'active' | 'inactive';
  metadata: Json;
  created_at: string;
  updated_at: string;
} 