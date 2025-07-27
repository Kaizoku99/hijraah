import { Document } from "@/core/documents/entities/document";
import {
  Case,
  CaseStatus,
  CaseType,
  TimelineEvent,
} from "@/core/immigration/entities/case";
import { CaseService } from "@/core/immigration/services/case-service";
import {
  caseRepository,
  documentRepository,
} from "@/infrastructure/repositories";

/**
 * Case Application Service
 *
 * Orchestrates domain and infrastructure layers for case operations.
 * This service acts as a facade for the application layer.
 */
export class CaseApplicationService {
  private caseService: CaseService;

  constructor() {
    this.caseService = new CaseService();
  }

  /**
   * Get a case by ID
   */
  async getCaseById(caseId: string, userId?: string): Promise<Case | null> {
    // If userId is provided, check access
    if (userId) {
      const hasAccess = await caseRepository.userHasAccess(caseId, userId);
      if (!hasAccess) {
        throw new Error("Access denied");
      }
    }

    const caseData = await caseRepository.getById(caseId);
    if (!caseData) {
      return null;
    }

    return caseRepository.toDomainEntity(caseData);
  }

  /**
   * Get cases for a user
   */
  async getCasesByUser(
    userId: string,
    options?: {
      includeAssigned?: boolean;
      status?: string[];
      limit?: number;
      offset?: number;
    }
  ): Promise<Case[]> {
    const casesData = await caseRepository.getByUserId(userId, options);

    return casesData.map((caseData) => caseRepository.toDomainEntity(caseData));
  }

  /**
   * Create a new case
   */
  async createCase(data: {
    title: string;
    description?: string;
    caseType: CaseType;
    clientId: string;
    createdBy: string;
    priority?: "low" | "medium" | "high" | "urgent";
    dueDate?: Date | null;
    tags?: string[];
    metadata?: Record<string, any>;
  }): Promise<Case> {
    // Generate a unique case number
    const caseNumber = this.caseService.generateCaseNumber(data.caseType);

    // Create initial timeline event
    const creationEvent: TimelineEvent = {
      id: crypto.randomUUID(),
      eventType: "case_created",
      title: "Case created",
      description: `Case was created by ${data.createdBy}`,
      createdBy: data.createdBy,
      timestamp: new Date(),
      metadata: {
        caseType: data.caseType,
      },
    };

    // Initial assignments - make creator the owner
    const initialAssignment = {
      userId: data.createdBy,
      role: "owner",
      assignedAt: new Date(),
      assignedBy: "system",
    };

    // Create the case record
    const caseRecord = await caseRepository.create({
      case_number: caseNumber,
      title: data.title,
      description: data.description || null,
      status: CaseStatus.DRAFT,
      case_type: data.caseType,
      client_id: data.clientId,
      timeline: [creationEvent],
      assignments: [initialAssignment],
      priority: data.priority || "medium",
      due_date: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      tags: data.tags || [],
      metadata: data.metadata || {},
    });

    // Return as domain entity
    return caseRepository.toDomainEntity(caseRecord);
  }

  /**
   * Update case details
   */
  async updateCase(
    caseId: string,
    userId: string,
    data: {
      title?: string;
      description?: string | null;
      priority?: "low" | "medium" | "high" | "urgent";
      dueDate?: Date | null;
      tags?: string[];
      metadata?: Record<string, any>;
    }
  ): Promise<Case> {
    // Get the case and check access
    const caseInstance = await this.getCaseById(caseId, userId);

    if (!caseInstance) {
      throw new Error("Case not found");
    }

    // Verify this user has permission to edit
    const userRole = caseInstance.getUserRole(userId);

    if (!this.caseService.canPerformAction(userRole, "edit")) {
      throw new Error("Permission denied: User cannot edit this case");
    }

    // Apply the update using domain entity logic
    const updatedCase = caseInstance.update(data, userId);

    // Save the updated case
    const updatedRecord = await caseRepository.update(caseId, {
      title: updatedCase.title,
      description: updatedCase.description,
      priority: updatedCase.priority,
      due_date: updatedCase.dueDate?.toISOString() || null,
      tags: updatedCase.tags,
      metadata: updatedCase.metadata,
      timeline: updatedCase.timeline.map((event) => ({
        ...event,
        timestamp: event.timestamp.toISOString(),
      })),
    });

    return caseRepository.toDomainEntity(updatedRecord);
  }

  /**
   * Change case status
   */
  async changeStatus(
    caseId: string,
    userId: string,
    newStatus: CaseStatus,
    reason?: string
  ): Promise<Case> {
    // Get the case and check access
    const caseInstance = await this.getCaseById(caseId, userId);

    if (!caseInstance) {
      throw new Error("Case not found");
    }

    // Verify this user has permission to change status
    const userRole = caseInstance.getUserRole(userId);

    if (!this.caseService.canPerformAction(userRole, "change_status")) {
      throw new Error(
        "Permission denied: User cannot change the status of this case"
      );
    }

    // Verify status transition is valid
    if (
      !this.caseService.isValidStatusTransition(caseInstance.status, newStatus)
    ) {
      throw new Error(
        `Invalid status transition from ${caseInstance.status} to ${newStatus}`
      );
    }

    // Apply the status change using domain entity logic
    const updatedCase = caseInstance.changeStatus(newStatus, userId, reason);

    // Save the updated case
    const updatedRecord = await caseRepository.update(caseId, {
      status: newStatus,
      timeline: updatedCase.timeline.map((event) => ({
        ...event,
        timestamp: event.timestamp.toISOString(),
      })),
    });

    return caseRepository.toDomainEntity(updatedRecord);
  }

  /**
   * Assign a user to a case
   */
  async assignUser(
    caseId: string,
    assignedUserId: string,
    role: "owner" | "collaborator" | "reviewer" | "client",
    assignedByUserId: string
  ): Promise<Case> {
    // Get the case and check access
    const caseInstance = await this.getCaseById(caseId, assignedByUserId);

    if (!caseInstance) {
      throw new Error("Case not found");
    }

    // Verify this user has permission to assign others
    const userRole = caseInstance.getUserRole(assignedByUserId);

    if (!this.caseService.canPerformAction(userRole, "assign")) {
      throw new Error(
        "Permission denied: User cannot assign others to this case"
      );
    }

    // Apply the assignment using domain entity logic
    const updatedCase = caseInstance.assignUser(
      assignedUserId,
      role,
      assignedByUserId
    );

    // Save the updated case
    await caseRepository.assignUser(caseId, assignedUserId, role);

    // Refresh the case data
    return this.getCaseById(caseId);
  }

  /**
   * Remove a user assignment from a case
   */
  async removeAssignment(
    caseId: string,
    targetUserId: string,
    removedByUserId: string,
    reason?: string
  ): Promise<Case> {
    // Get the case and check access
    const caseInstance = await this.getCaseById(caseId, removedByUserId);

    if (!caseInstance) {
      throw new Error("Case not found");
    }

    // Verify this user has permission to remove assignments
    const userRole = caseInstance.getUserRole(removedByUserId);

    if (!this.caseService.canPerformAction(userRole, "assign")) {
      throw new Error(
        "Permission denied: User cannot remove assignments from this case"
      );
    }

    // Apply the removal using domain entity logic
    const updatedCase = caseInstance.removeAssignment(
      targetUserId,
      removedByUserId,
      reason
    );

    // Save the updated case
    await caseRepository.removeAssignment(caseId, targetUserId);

    // Update the timeline
    await caseRepository.updateTimeline(
      caseId,
      updatedCase.timeline.map((event) => ({
        ...event,
        timestamp: event.timestamp.toISOString(),
      }))
    );

    // Refresh the case data
    return this.getCaseById(caseId);
  }

  /**
   * Add a document to a case
   */
  async addDocument(
    caseId: string,
    documentId: string,
    userId: string
  ): Promise<Case> {
    // Get the case and document
    const [caseInstance, document] = await Promise.all([
      this.getCaseById(caseId, userId),
      documentRepository.getById(documentId),
    ]);

    if (!caseInstance) {
      throw new Error("Case not found");
    }

    if (!document) {
      throw new Error("Document not found");
    }

    // Verify this user has permission to add documents
    const userRole = caseInstance.getUserRole(userId);

    if (!this.caseService.canPerformAction(userRole, "add_document")) {
      throw new Error(
        "Permission denied: User cannot add documents to this case"
      );
    }

    // Create a timeline event for the document addition
    const documentEvent = this.caseService.createDocumentEvent(
      documentId,
      document.name,
      userId
    );

    // Add the event to the case timeline
    const updatedCase = caseInstance.addTimelineEvent(documentEvent);

    // Update the document to link it to the case
    await caseRepository.addDocument(caseId, documentId);

    // Update the case timeline
    await caseRepository.updateTimeline(
      caseId,
      updatedCase.timeline.map((event) => ({
        ...event,
        timestamp: event.timestamp.toISOString(),
      }))
    );

    // Refresh the case data
    return this.getCaseById(caseId);
  }

  /**
   * Get case with all related data
   */
  async getCaseWithDetails(
    caseId: string,
    userId?: string
  ): Promise<{
    case: Case;
    documents: Document[];
    messages: any[];
  }> {
    // If userId is provided, check access
    if (userId) {
      const hasAccess = await caseRepository.userHasAccess(caseId, userId);
      if (!hasAccess) {
        throw new Error("Access denied");
      }
    }

    // Get case with details
    const details = await caseRepository.getWithDetails(caseId);

    if (!details) {
      throw new Error("Case not found");
    }

    // Convert to domain entities
    const caseEntity = caseRepository.toDomainEntity(details.case);

    // Convert documents to domain entities
    const documents = details.documents.map((doc) =>
      Document.fromDatabase(doc)
    );

    return {
      case: caseEntity,
      documents,
      messages: details.messages,
    };
  }

  /**
   * Calculate case completion percentage
   */
  async calculateCompletionPercentage(caseId: string): Promise<number> {
    // Get case with documents
    const details = await caseRepository.getWithDetails(caseId);

    if (!details) {
      throw new Error("Case not found");
    }

    // Convert to domain entity
    const caseEntity = caseRepository.toDomainEntity(details.case);

    // Get document names for completion calculation
    const documentNames = details.documents.map((doc) => doc.name);

    // Calculate completion percentage
    return this.caseService.calculateCompletionPercentage(
      caseEntity,
      documentNames
    );
  }

  /**
   * Get required documents for a case
   */
  getRequiredDocuments(caseType: CaseType): string[] {
    return this.caseService.getRequiredDocuments(caseType);
  }

  /**
   * Estimate processing time for a case
   */
  estimateProcessingTime(caseType: CaseType): {
    minDays: number;
    maxDays: number;
    averageDays: number;
  } {
    return this.caseService.estimateProcessingTime(caseType);
  }
}
