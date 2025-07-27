/**
 * Document domain entity
 * 
 * This entity represents a document in the domain model.
 */

/**
 * Document entity representing files and attachments within the system
 */

export enum DocumentType {
  PASSPORT = 'passport',
  VISA = 'visa',
  BIRTH_CERTIFICATE = 'birth_certificate',
  MARRIAGE_CERTIFICATE = 'marriage_certificate',
  ACADEMIC_RECORD = 'academic_record',
  EMPLOYMENT_RECORD = 'employment_record',
  FINANCIAL_RECORD = 'financial_record',
  MEDICAL_RECORD = 'medical_record',
  LEGAL_DOCUMENT = 'legal_document',
  TRAVEL_DOCUMENT = 'travel_document',
  IDENTIFICATION = 'identification',
  SUPPORTING_DOCUMENT = 'supporting_document',
  OTHER = 'other'
}

export enum DocumentStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  REVOKED = 'revoked'
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  storageKey: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  createdBy: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface DocumentAccess {
  id: string;
  documentId: string;
  userId: string;
  permission: 'view' | 'edit' | 'delete' | 'admin';
  grantedBy: string;
  grantedAt: Date;
  expiresAt?: Date;
}

/**
 * Document entity
 */
export class Document {
  id: string;
  name: string;
  description: string | null;
  type: DocumentType;
  status: DocumentStatus;
  ownerId: string;
  versions: DocumentVersion[];
  access: DocumentAccess[];
  caseIds: string[];
  expiryDate: Date | null;
  issuedBy: string | null;
  issuedDate: Date | null;
  documentNumber: string | null;
  tags: string[];
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    name: string;
    description: string | null;
    type: DocumentType;
    status: DocumentStatus;
    ownerId: string;
    versions?: DocumentVersion[];
    access?: DocumentAccess[];
    caseIds?: string[];
    expiryDate?: Date | null;
    issuedBy?: string | null;
    issuedDate?: Date | null;
    documentNumber?: string | null;
    tags?: string[];
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.status = data.status;
    this.ownerId = data.ownerId;
    this.versions = data.versions || [];
    this.access = data.access || [];
    this.caseIds = data.caseIds || [];
    this.expiryDate = data.expiryDate || null;
    this.issuedBy = data.issuedBy || null;
    this.issuedDate = data.issuedDate || null;
    this.documentNumber = data.documentNumber || null;
    this.tags = data.tags || [];
    this.metadata = data.metadata || {};
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Check if a user has specific access to the document
   */
  hasAccess(userId: string, permission: 'view' | 'edit' | 'delete' | 'admin'): boolean {
    // Owner always has full access
    if (this.ownerId === userId) {
      return true;
    }

    // Check access records
    const userAccess = this.access.find(access => 
      access.userId === userId && 
      (!access.expiresAt || access.expiresAt > new Date())
    );

    if (!userAccess) {
      return false;
    }

    // Admin permission grants all access
    if (userAccess.permission === 'admin') {
      return true;
    }

    // Match specific permission
    if (permission === 'view') {
      // Any permission level grants view access
      return true;
    } else if (permission === 'edit') {
      // Edit or admin permission grants edit access
      return ['edit', 'admin'].includes(userAccess.permission);
    } else if (permission === 'delete') {
      // Only delete or admin permission grants delete access
      return ['delete', 'admin'].includes(userAccess.permission);
    }

    return false;
  }

  /**
   * Add a new version to the document
   */
  addVersion(version: Omit<DocumentVersion, 'documentId'>): Document {
    const newVersion: DocumentVersion = {
      ...version,
      documentId: this.id
    };

    this.versions.push(newVersion);
    this.updatedAt = new Date();
    
    return this;
  }

  /**
   * Get the latest version of the document
   */
  getLatestVersion(): DocumentVersion | null {
    if (this.versions.length === 0) {
      return null;
    }

    // Sort versions by creation date (newest first)
    const sortedVersions = [...this.versions].sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );

    return sortedVersions[0];
  }

  /**
   * Grant access to a user
   */
  grantAccess(access: Omit<DocumentAccess, 'documentId'>): Document {
    // Check if access already exists
    const existingAccessIndex = this.access.findIndex(a => a.userId === access.userId);
    
    const newAccess: DocumentAccess = {
      ...access,
      documentId: this.id
    };

    if (existingAccessIndex >= 0) {
      // Update existing access
      this.access[existingAccessIndex] = newAccess;
    } else {
      // Add new access
      this.access.push(newAccess);
    }

    this.updatedAt = new Date();
    
    return this;
  }

  /**
   * Revoke access from a user
   */
  revokeAccess(userId: string): Document {
    this.access = this.access.filter(access => access.userId !== userId);
    this.updatedAt = new Date();
    
    return this;
  }

  /**
   * Associate document with a case
   */
  addToCase(caseId: string): Document {
    if (!this.caseIds.includes(caseId)) {
      this.caseIds.push(caseId);
      this.updatedAt = new Date();
    }
    
    return this;
  }

  /**
   * Remove document from a case
   */
  removeFromCase(caseId: string): Document {
    this.caseIds = this.caseIds.filter(id => id !== caseId);
    this.updatedAt = new Date();
    
    return this;
  }

  /**
   * Update document metadata
   */
  updateMetadata(metadata: Record<string, any>): Document {
    this.metadata = {
      ...this.metadata,
      ...metadata
    };
    this.updatedAt = new Date();
    
    return this;
  }

  /**
   * Change document status
   */
  changeStatus(status: DocumentStatus, userId: string): Document {
    // Could add validation here if needed
    this.status = status;
    this.updatedAt = new Date();
    
    // Add audit info to metadata
    this.metadata.statusHistory = this.metadata.statusHistory || [];
    this.metadata.statusHistory.push({
      from: this.status,
      to: status,
      changedBy: userId,
      changedAt: new Date()
    });
    
    return this;
  }

  /**
   * Update document basic information
   */
  update(data: {
    name?: string;
    description?: string | null;
    type?: DocumentType;
    expiryDate?: Date | null;
    issuedBy?: string | null;
    issuedDate?: Date | null;
    documentNumber?: string | null;
    tags?: string[];
  }): Document {
    if (data.name !== undefined) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.type !== undefined) this.type = data.type;
    if (data.expiryDate !== undefined) this.expiryDate = data.expiryDate;
    if (data.issuedBy !== undefined) this.issuedBy = data.issuedBy;
    if (data.issuedDate !== undefined) this.issuedDate = data.issuedDate;
    if (data.documentNumber !== undefined) this.documentNumber = data.documentNumber;
    if (data.tags !== undefined) this.tags = data.tags;
    
    this.updatedAt = new Date();
    
    return this;
  }

  /**
   * Convert the document to a plain object
   */
  toObject(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      status: this.status,
      ownerId: this.ownerId,
      versions: this.versions,
      access: this.access,
      caseIds: this.caseIds,
      expiryDate: this.expiryDate,
      issuedBy: this.issuedBy,
      issuedDate: this.issuedDate,
      documentNumber: this.documentNumber,
      tags: this.tags,
      metadata: this.metadata,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      latestVersion: this.getLatestVersion()
    };
  }

  /**
   * Create a Document instance from database record
   */
  static fromDatabase(data: any): Document {
    // Parse dates from ISO strings if they're strings
    const parseDate = (dateStr: string | Date | null | undefined) => {
      if (!dateStr) return null;
      return dateStr instanceof Date ? dateStr : new Date(dateStr);
    };

    // Parse versions
    const versions = Array.isArray(data.versions) 
      ? data.versions.map((v: any) => ({
          ...v,
          createdAt: parseDate(v.createdAt) || new Date()
        }))
      : [];

    // Parse access records
    const access = Array.isArray(data.access)
      ? data.access.map((a: any) => ({
          ...a,
          grantedAt: parseDate(a.grantedAt) || new Date(),
          expiresAt: parseDate(a.expiresAt)
        }))
      : [];

    return new Document({
      id: data.id,
      name: data.name,
      description: data.description,
      type: data.type as DocumentType,
      status: data.status as DocumentStatus,
      ownerId: data.owner_id || data.ownerId,
      versions,
      access,
      caseIds: data.case_ids || data.caseIds || [],
      expiryDate: parseDate(data.expiry_date || data.expiryDate),
      issuedBy: data.issued_by || data.issuedBy,
      issuedDate: parseDate(data.issued_date || data.issuedDate),
      documentNumber: data.document_number || data.documentNumber,
      tags: data.tags || [],
      metadata: data.metadata || {},
      createdAt: parseDate(data.created_at || data.createdAt) || new Date(),
      updatedAt: parseDate(data.updated_at || data.updatedAt) || new Date()
    });
  }
} 