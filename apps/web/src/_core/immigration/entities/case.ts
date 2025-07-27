/**
 * Case domain entity
 * 
 * This entity represents an immigration case in the domain model.
 */

/**
 * Case Status enum
 */
export enum CaseStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  IN_REVIEW = 'in_review',
  ADDITIONAL_INFO_REQUIRED = 'additional_info_required',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

/**
 * Case Type enum
 */
export enum CaseType {
  ASYLUM = 'asylum',
  VISA_APPLICATION = 'visa_application',
  WORK_PERMIT = 'work_permit',
  FAMILY_SPONSORSHIP = 'family_sponsorship',
  CITIZENSHIP = 'citizenship',
  RESIDENCY = 'residency',
  REFUGEE = 'refugee',
  OTHER = 'other'
}

/**
 * Timeline Event interface
 */
export interface TimelineEvent {
  id: string;
  eventType: string;
  title: string;
  description: string;
  createdBy: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

/**
 * Assignment interface
 */
export interface CaseAssignment {
  userId: string;
  role: 'owner' | 'collaborator' | 'reviewer' | 'client';
  assignedAt: Date;
  assignedBy: string;
}

/**
 * Case entity
 */
export class Case {
  readonly id: string;
  readonly caseNumber: string;
  readonly title: string;
  readonly description: string | null;
  readonly status: CaseStatus;
  readonly caseType: CaseType;
  readonly clientId: string;
  readonly timeline: TimelineEvent[];
  readonly assignments: CaseAssignment[];
  readonly priority: 'low' | 'medium' | 'high' | 'urgent';
  readonly dueDate: Date | null;
  readonly tags: string[];
  readonly metadata: Record<string, any>;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: {
    id: string;
    caseNumber: string;
    title: string;
    description?: string | null;
    status?: CaseStatus;
    caseType: CaseType;
    clientId: string;
    timeline?: TimelineEvent[];
    assignments?: CaseAssignment[];
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    dueDate?: Date | string | null;
    tags?: string[];
    metadata?: Record<string, any>;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  }) {
    this.id = props.id;
    this.caseNumber = props.caseNumber;
    this.title = props.title;
    this.description = props.description ?? null;
    this.status = props.status ?? CaseStatus.DRAFT;
    this.caseType = props.caseType;
    this.clientId = props.clientId;
    this.timeline = props.timeline ?? [];
    this.assignments = props.assignments ?? [];
    this.priority = props.priority ?? 'medium';
    this.dueDate = props.dueDate ? new Date(props.dueDate) : null;
    this.tags = props.tags ?? [];
    this.metadata = props.metadata ?? {};
    this.createdAt = props.createdAt ? new Date(props.createdAt) : new Date();
    this.updatedAt = props.updatedAt ? new Date(props.updatedAt) : new Date();
  }
  
  /**
   * Check if a user is assigned to this case
   */
  isUserAssigned(userId: string): boolean {
    return this.assignments.some(assignment => assignment.userId === userId);
  }
  
  /**
   * Get a user's role in this case
   */
  getUserRole(userId: string): string | null {
    const assignment = this.assignments.find(a => a.userId === userId);
    return assignment ? assignment.role : null;
  }
  
  /**
   * Check if a user has a specific role in this case
   */
  userHasRole(userId: string, role: string | string[]): boolean {
    const userRole = this.getUserRole(userId);
    if (!userRole) return false;
    
    if (Array.isArray(role)) {
      return role.includes(userRole);
    }
    
    return userRole === role;
  }
  
  /**
   * Change the status of the case
   */
  changeStatus(newStatus: CaseStatus, userId: string, reason?: string): Case {
    // Create a timeline event for the status change
    const event: TimelineEvent = {
      id: crypto.randomUUID(),
      eventType: 'status_change',
      title: `Status changed to ${newStatus}`,
      description: reason || `Case status was changed from ${this.status} to ${newStatus}`,
      createdBy: userId,
      timestamp: new Date(),
      metadata: {
        previousStatus: this.status,
        newStatus: newStatus
      }
    };
    
    return new Case({
      ...this,
      status: newStatus,
      timeline: [...this.timeline, event],
      updatedAt: new Date()
    });
  }
  
  /**
   * Assign a user to this case
   */
  assignUser(userId: string, role: 'owner' | 'collaborator' | 'reviewer' | 'client', assignedBy: string): Case {
    // Check if user is already assigned with this role
    const existingAssignment = this.assignments.find(
      a => a.userId === userId && a.role === role
    );
    
    if (existingAssignment) {
      return this; // No change needed
    }
    
    // Create new assignment
    const newAssignment: CaseAssignment = {
      userId,
      role,
      assignedAt: new Date(),
      assignedBy
    };
    
    // Create a timeline event for the assignment
    const event: TimelineEvent = {
      id: crypto.randomUUID(),
      eventType: 'user_assigned',
      title: `User assigned as ${role}`,
      description: `User ${userId} was assigned to the case as ${role}`,
      createdBy: assignedBy,
      timestamp: new Date(),
      metadata: {
        userId,
        role
      }
    };
    
    return new Case({
      ...this,
      assignments: [...this.assignments, newAssignment],
      timeline: [...this.timeline, event],
      updatedAt: new Date()
    });
  }
  
  /**
   * Remove a user assignment from this case
   */
  removeAssignment(userId: string, removedBy: string, reason?: string): Case {
    // Check if user is assigned
    const assignment = this.assignments.find(a => a.userId === userId);
    
    if (!assignment) {
      return this; // No change needed
    }
    
    // Create a timeline event for the removal
    const event: TimelineEvent = {
      id: crypto.randomUUID(),
      eventType: 'user_unassigned',
      title: `User unassigned`,
      description: reason || `User ${userId} was removed from the case`,
      createdBy: removedBy,
      timestamp: new Date(),
      metadata: {
        userId,
        previousRole: assignment.role
      }
    };
    
    return new Case({
      ...this,
      assignments: this.assignments.filter(a => a.userId !== userId),
      timeline: [...this.timeline, event],
      updatedAt: new Date()
    });
  }
  
  /**
   * Add a timeline event to the case
   */
  addTimelineEvent(event: Omit<TimelineEvent, 'id' | 'timestamp'>): Case {
    const newEvent: TimelineEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };
    
    return new Case({
      ...this,
      timeline: [...this.timeline, newEvent],
      updatedAt: new Date()
    });
  }
  
  /**
   * Update case details
   */
  update(data: {
    title?: string;
    description?: string | null;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    dueDate?: Date | null;
    tags?: string[];
    metadata?: Record<string, any>;
  }, updatedBy: string): Case {
    // Create a timeline event for the update
    const event: TimelineEvent = {
      id: crypto.randomUUID(),
      eventType: 'case_updated',
      title: 'Case details updated',
      description: 'Case details were updated',
      createdBy: updatedBy,
      timestamp: new Date(),
      metadata: {
        updatedFields: Object.keys(data)
      }
    };
    
    return new Case({
      ...this,
      ...data,
      timeline: [...this.timeline, event],
      updatedAt: new Date()
    });
  }
  
  /**
   * Convert to a plain object representation
   */
  toObject() {
    return {
      id: this.id,
      caseNumber: this.caseNumber,
      title: this.title,
      description: this.description,
      status: this.status,
      caseType: this.caseType,
      clientId: this.clientId,
      timeline: this.timeline.map(event => ({
        ...event,
        timestamp: event.timestamp.toISOString()
      })),
      assignments: this.assignments.map(assignment => ({
        ...assignment,
        assignedAt: assignment.assignedAt.toISOString()
      })),
      priority: this.priority,
      dueDate: this.dueDate?.toISOString() || null,
      tags: this.tags,
      metadata: this.metadata,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
  
  /**
   * Factory method to create a Case from database record
   */
  static fromDatabase(data: {
    id: string;
    case_number: string;
    title: string;
    description: string | null;
    status: string;
    case_type: string;
    client_id: string;
    timeline: any[];
    assignments: any[];
    priority: string;
    due_date: string | null;
    tags: string[];
    metadata: Record<string, any>;
    created_at: string;
    updated_at: string;
  }): Case {
    return new Case({
      id: data.id,
      caseNumber: data.case_number,
      title: data.title,
      description: data.description,
      status: data.status as CaseStatus,
      caseType: data.case_type as CaseType,
      clientId: data.client_id,
      timeline: data.timeline.map(event => ({
        ...event,
        timestamp: new Date(event.timestamp)
      })),
      assignments: data.assignments.map(assignment => ({
        ...assignment,
        assignedAt: new Date(assignment.assigned_at)
      })),
      priority: data.priority as 'low' | 'medium' | 'high' | 'urgent',
      dueDate: data.due_date,
      tags: data.tags,
      metadata: data.metadata,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    });
  }
} 