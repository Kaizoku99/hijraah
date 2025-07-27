import { Document, DocumentType, DocumentStatus, DocumentVersion } from '../entities/document';

/**
 * Document Service handles domain logic for document operations
 */
export class DocumentService {
  /**
   * Validates if the document data is correct
   */
  validateDocument(document: Document): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic validation
    if (!document.name || document.name.trim().length === 0) {
      errors.push('Document name is required');
    }

    if (!document.type || !Object.values(DocumentType).includes(document.type)) {
      errors.push('Valid document type is required');
    }

    if (!document.status || !Object.values(DocumentStatus).includes(document.status)) {
      errors.push('Valid document status is required');
    }

    // Validate dates
    if (document.expiryDate && document.expiryDate < new Date()) {
      errors.push('Expiry date cannot be in the past');
    }

    if (document.issuedDate && document.issuedDate > new Date()) {
      errors.push('Issue date cannot be in the future');
    }

    // Validate specific document types
    if (document.type === DocumentType.PASSPORT && !document.documentNumber) {
      errors.push('Passport requires a document number');
    }

    if (document.type === DocumentType.VISA && 
        (!document.expiryDate || !document.issuedDate || !document.documentNumber)) {
      errors.push('Visa requires expiry date, issue date, and document number');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Sanitizes the document file name
   */
  sanitizeFileName(fileName: string): string {
    // Remove path traversal attempts and illegal characters
    const sanitized = fileName
      .replace(/[/\\?%*:|"<>]/g, '_') // Replace illegal chars with underscores
      .replace(/^\.+/, '') // Remove leading dots
      .trim();

    return sanitized || 'unnamed_document';
  }

  /**
   * Validates document mime type
   */
  isValidMimeType(mimeType: string): boolean {
    const allowedMimeTypes = [
      // PDF
      'application/pdf',
      // Images
      'image/jpeg', 'image/png', 'image/gif', 'image/tiff', 'image/bmp', 'image/webp',
      // Documents
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain', 'text/csv',
      // Archives (may be needed for bundles of documents)
      'application/zip', 'application/x-rar-compressed',
    ];

    return allowedMimeTypes.includes(mimeType);
  }

  /**
   * Validates file size
   */
  isValidFileSize(sizeInBytes: number): boolean {
    const maxSizeInBytes = 20 * 1024 * 1024; // 20MB
    return sizeInBytes > 0 && sizeInBytes <= maxSizeInBytes;
  }

  /**
   * Checks if the document is expired
   */
  isExpired(document: Document): boolean {
    if (!document.expiryDate) {
      return false; // No expiry date means not expired
    }

    return document.expiryDate < new Date();
  }

  /**
   * Checks if document needs renewal based on expiry date
   */
  needsRenewal(document: Document, warningDays: number = 30): boolean {
    if (!document.expiryDate) {
      return false;
    }

    const today = new Date();
    const warningDate = new Date(today);
    warningDate.setDate(today.getDate() + warningDays);

    return document.expiryDate <= warningDate;
  }

  /**
   * Generates a structured file path for storage
   */
  generateStoragePath(userId: string, documentType: DocumentType, fileName: string): string {
    const timestamp = new Date().getTime();
    const sanitizedFileName = this.sanitizeFileName(fileName);
    
    return `documents/${userId}/${documentType}/${timestamp}_${sanitizedFileName}`;
  }

  /**
   * Extracts metadata from file if possible
   */
  async extractMetadata(file: File | Blob, fileName: string): Promise<Record<string, any>> {
    const metadata: Record<string, any> = {
      originalName: fileName,
      fileSize: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString()
    };

    // Here we could add more sophisticated metadata extraction
    // like getting PDF metadata, image EXIF data, etc.
    // This would typically be done using specialized libraries

    return metadata;
  }

  /**
   * Creates a timeline event for document operations
   */
  createDocumentEvent(
    eventType: 'created' | 'updated' | 'shared' | 'revoked' | 'deleted',
    documentId: string,
    documentName: string,
    performedBy: string,
    details?: Record<string, any>
  ): any {
    return {
      id: crypto.randomUUID(),
      eventType: `document_${eventType}`,
      title: `Document ${eventType}`,
      description: `Document "${documentName}" was ${eventType}`,
      createdBy: performedBy,
      timestamp: new Date(),
      metadata: {
        documentId,
        documentName,
        ...details
      }
    };
  }

  /**
   * Determines if a document can be shared with a specific user
   */
  canShareWith(document: Document, userId: string): boolean {
    // Don't share with the owner (they already have access)
    if (document.ownerId === userId) {
      return false;
    }
    
    // Don't share if already shared
    const existingAccess = document.access.find(a => a.userId === userId);
    if (existingAccess && (!existingAccess.expiresAt || existingAccess.expiresAt > new Date())) {
      return false;
    }
    
    return true;
  }

  /**
   * Validates status transition
   */
  isValidStatusTransition(currentStatus: DocumentStatus, newStatus: DocumentStatus): boolean {
    // Define allowed transitions
    const allowedTransitions: Record<DocumentStatus, DocumentStatus[]> = {
      [DocumentStatus.DRAFT]: [
        DocumentStatus.PENDING_REVIEW,
        DocumentStatus.APPROVED,
        DocumentStatus.REJECTED
      ],
      [DocumentStatus.PENDING_REVIEW]: [
        DocumentStatus.APPROVED,
        DocumentStatus.REJECTED
      ],
      [DocumentStatus.APPROVED]: [
        DocumentStatus.EXPIRED,
        DocumentStatus.REVOKED
      ],
      [DocumentStatus.REJECTED]: [
        DocumentStatus.DRAFT,
        DocumentStatus.PENDING_REVIEW
      ],
      [DocumentStatus.EXPIRED]: [
        DocumentStatus.DRAFT
      ],
      [DocumentStatus.REVOKED]: [
        DocumentStatus.DRAFT
      ]
    };
    
    // Check if transition is allowed
    return allowedTransitions[currentStatus]?.includes(newStatus) || false;
  }

  /**
   * Calculates SHA-256 hash for document content
   * This can be used for version comparisons and duplicate checking
   */
  async calculateFileHash(file: Blob): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (error) {
      console.error('Error calculating file hash:', error);
      return '';
    }
  }
} 