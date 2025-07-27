import { Case, CaseStatus, CaseType, TimelineEvent } from '../entities/case';

/**
 * Case Service domain service
 * 
 * Handles case-related business logic that doesn't naturally
 * fit within the Case entity itself.
 */
export class CaseService {
  /**
   * Generate a unique case number based on case type and current date
   */
  generateCaseNumber(caseType: CaseType): string {
    // Get current date components
    const date = new Date();
    const year = date.getFullYear().toString().slice(2); // 2-digit year
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    // Create a timestamp-based unique identifier
    const timestamp = Date.now().toString().slice(-6);
    
    // Get prefix based on case type
    const prefix = this.getCaseTypePrefix(caseType);
    
    // Combine components: PREFIX-YYMMDD-XXXXXX
    return `${prefix}-${year}${month}${day}-${timestamp}`;
  }
  
  /**
   * Get a prefix for the case type
   */
  private getCaseTypePrefix(caseType: CaseType): string {
    switch (caseType) {
      case CaseType.ASYLUM:
        return 'ASY';
      case CaseType.VISA_APPLICATION:
        return 'VISA';
      case CaseType.WORK_PERMIT:
        return 'WORK';
      case CaseType.FAMILY_SPONSORSHIP:
        return 'FAM';
      case CaseType.CITIZENSHIP:
        return 'CIT';
      case CaseType.RESIDENCY:
        return 'RES';
      case CaseType.REFUGEE:
        return 'REF';
      case CaseType.OTHER:
        return 'OTH';
      default:
        return 'CASE';
    }
  }
  
  /**
   * Validate case status transition
   * Returns true if the transition is valid, false otherwise
   */
  isValidStatusTransition(currentStatus: CaseStatus, newStatus: CaseStatus): boolean {
    // Define valid transitions for each status
    const validTransitions: Record<CaseStatus, CaseStatus[]> = {
      [CaseStatus.DRAFT]: [
        CaseStatus.SUBMITTED,
        CaseStatus.CANCELLED
      ],
      [CaseStatus.SUBMITTED]: [
        CaseStatus.IN_REVIEW,
        CaseStatus.CANCELLED
      ],
      [CaseStatus.IN_REVIEW]: [
        CaseStatus.ADDITIONAL_INFO_REQUIRED,
        CaseStatus.APPROVED,
        CaseStatus.REJECTED,
        CaseStatus.CANCELLED
      ],
      [CaseStatus.ADDITIONAL_INFO_REQUIRED]: [
        CaseStatus.IN_REVIEW,
        CaseStatus.CANCELLED
      ],
      [CaseStatus.APPROVED]: [
        CaseStatus.COMPLETED,
        CaseStatus.CANCELLED
      ],
      [CaseStatus.REJECTED]: [
        CaseStatus.DRAFT, // Allow reopening rejected cases
        CaseStatus.CANCELLED
      ],
      [CaseStatus.COMPLETED]: [
        CaseStatus.CANCELLED
      ],
      [CaseStatus.CANCELLED]: [
        CaseStatus.DRAFT // Allow reopening cancelled cases
      ]
    };
    
    // Check if the transition is valid
    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }
  
  /**
   * Check if a user can perform an action on a case based on their role
   */
  canPerformAction(
    userRole: string | null,
    action: 'view' | 'edit' | 'delete' | 'assign' | 'change_status' | 'add_document' | 'add_comment'
  ): boolean {
    if (!userRole) return false;
    
    // Define permissions for each role
    const rolePermissions: Record<string, string[]> = {
      'owner': [
        'view', 'edit', 'delete', 'assign', 'change_status', 'add_document', 'add_comment'
      ],
      'collaborator': [
        'view', 'edit', 'assign', 'change_status', 'add_document', 'add_comment'
      ],
      'reviewer': [
        'view', 'change_status', 'add_comment'
      ],
      'client': [
        'view', 'add_document', 'add_comment'
      ]
    };
    
    // Check if the role has permission for the action
    return rolePermissions[userRole]?.includes(action) || false;
  }
  
  /**
   * Get required documents for a case type
   */
  getRequiredDocuments(caseType: CaseType): string[] {
    // Define required documents for each case type
    const requiredDocuments: Record<CaseType, string[]> = {
      [CaseType.ASYLUM]: [
        'Asylum Application (Form I-589)',
        'Identity Documents',
        'Evidence of Persecution',
        'Country Conditions Reports'
      ],
      [CaseType.VISA_APPLICATION]: [
        'Visa Application Form',
        'Passport',
        'Photographs',
        'Financial Documents',
        'Invitation Letter'
      ],
      [CaseType.WORK_PERMIT]: [
        'Employment Authorization (Form I-765)',
        'Identity Documents',
        'Evidence of Eligibility'
      ],
      [CaseType.FAMILY_SPONSORSHIP]: [
        'Petition for Relative (Form I-130)',
        'Birth Certificates',
        'Marriage Certificate',
        'Financial Support Evidence'
      ],
      [CaseType.CITIZENSHIP]: [
        'Naturalization Application (Form N-400)',
        'Permanent Resident Card',
        'Tax Returns',
        'Travel History'
      ],
      [CaseType.RESIDENCY]: [
        'Green Card Application (Form I-485)',
        'Medical Examination',
        'Birth Certificate',
        'Financial Support Evidence'
      ],
      [CaseType.REFUGEE]: [
        'Refugee Application',
        'Identity Documents',
        'Evidence of Refugee Status'
      ],
      [CaseType.OTHER]: []
    };
    
    return requiredDocuments[caseType] || [];
  }
  
  /**
   * Calculate case completion percentage based on required documents and status
   */
  calculateCompletionPercentage(caseInstance: Case, uploadedDocuments: string[]): number {
    // Define status weights for completion calculation
    const statusWeight: Record<CaseStatus, number> = {
      [CaseStatus.DRAFT]: 0.2,
      [CaseStatus.SUBMITTED]: 0.4,
      [CaseStatus.IN_REVIEW]: 0.6,
      [CaseStatus.ADDITIONAL_INFO_REQUIRED]: 0.7,
      [CaseStatus.APPROVED]: 0.9,
      [CaseStatus.REJECTED]: 1.0,
      [CaseStatus.COMPLETED]: 1.0,
      [CaseStatus.CANCELLED]: 0.0
    };
    
    // Calculate document completion
    const requiredDocuments = this.getRequiredDocuments(caseInstance.caseType);
    const documentPercentage = requiredDocuments.length > 0
      ? (uploadedDocuments.length / requiredDocuments.length) * 0.5
      : 0.5; // If no required documents, assume 50% completion
    
    // Calculate status-based completion
    const statusPercentage = statusWeight[caseInstance.status] * 0.5;
    
    // Combine document and status percentages
    return Math.min(Math.round((documentPercentage + statusPercentage) * 100), 100);
  }
  
  /**
   * Create a standard timeline event for document upload
   */
  createDocumentEvent(documentId: string, documentName: string, uploadedBy: string): TimelineEvent {
    return {
      id: crypto.randomUUID(),
      eventType: 'document_uploaded',
      title: 'Document uploaded',
      description: `Document "${documentName}" was uploaded`,
      createdBy: uploadedBy,
      timestamp: new Date(),
      metadata: {
        documentId,
        documentName
      }
    };
  }
  
  /**
   * Estimate case processing time based on case type and current data
   */
  estimateProcessingTime(caseType: CaseType): {
    minDays: number;
    maxDays: number;
    averageDays: number;
  } {
    // Define processing time estimates (in days) for each case type
    const processingTimeEstimates: Record<CaseType, {
      minDays: number;
      maxDays: number;
      averageDays: number;
    }> = {
      [CaseType.ASYLUM]: {
        minDays: 180,
        maxDays: 730,
        averageDays: 365
      },
      [CaseType.VISA_APPLICATION]: {
        minDays: 30,
        maxDays: 180,
        averageDays: 90
      },
      [CaseType.WORK_PERMIT]: {
        minDays: 90,
        maxDays: 180,
        averageDays: 120
      },
      [CaseType.FAMILY_SPONSORSHIP]: {
        minDays: 180,
        maxDays: 730,
        averageDays: 365
      },
      [CaseType.CITIZENSHIP]: {
        minDays: 180,
        maxDays: 365,
        averageDays: 240
      },
      [CaseType.RESIDENCY]: {
        minDays: 180,
        maxDays: 730,
        averageDays: 365
      },
      [CaseType.REFUGEE]: {
        minDays: 180,
        maxDays: 730,
        averageDays: 365
      },
      [CaseType.OTHER]: {
        minDays: 90,
        maxDays: 365,
        averageDays: 180
      }
    };
    
    return processingTimeEstimates[caseType];
  }
} 