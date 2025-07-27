/**
 * Roadmap domain entity
 * 
 * This entity represents a personalized immigration roadmap in the domain model.
 */
import { CaseType } from './case';

/**
 * RoadmapMilestone interface
 */
export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'overdue';
  completionPercentage: number;
  requiredDocuments: string[];
  dependsOn: string[];
  isCritical: boolean;
  notes?: string;
  metadata?: Record<string, any>;
}

/**
 * RoadmapPhase interface
 */
export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'overdue';
  completionPercentage: number;
  milestones: RoadmapMilestone[];
  metadata?: Record<string, any>;
}

/**
 * Roadmap entity
 */
export class Roadmap {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly caseId: string;
  readonly caseType: CaseType;
  readonly userId: string;
  readonly phases: RoadmapPhase[];
  readonly startDate: Date;
  readonly targetEndDate: Date;
  readonly estimatedEndDate: Date;
  readonly completionPercentage: number;
  readonly lastUpdated: Date;
  readonly metadata: Record<string, any>;

  constructor(props: {
    id: string;
    title: string;
    description: string;
    caseId: string;
    caseType: CaseType;
    userId: string;
    phases?: RoadmapPhase[];
    startDate?: Date | string;
    targetEndDate?: Date | string;
    estimatedEndDate?: Date | string;
    completionPercentage?: number;
    lastUpdated?: Date | string;
    metadata?: Record<string, any>;
  }) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.caseId = props.caseId;
    this.caseType = props.caseType;
    this.userId = props.userId;
    this.phases = props.phases || [];
    this.startDate = props.startDate ? new Date(props.startDate) : new Date();
    this.targetEndDate = props.targetEndDate ? new Date(props.targetEndDate) : new Date();
    this.estimatedEndDate = props.estimatedEndDate ? new Date(props.estimatedEndDate) : new Date();
    this.completionPercentage = props.completionPercentage || 0;
    this.lastUpdated = props.lastUpdated ? new Date(props.lastUpdated) : new Date();
    this.metadata = props.metadata || {};
  }

  /**
   * Calculate the overall completion percentage based on phase completion
   */
  calculateCompletionPercentage(): number {
    if (this.phases.length === 0) return 0;
    
    const totalPercentage = this.phases.reduce(
      (sum, phase) => sum + phase.completionPercentage,
      0
    );
    
    return Math.round(totalPercentage / this.phases.length);
  }

  /**
   * Get the current active phase of the roadmap
   */
  getCurrentPhase(): RoadmapPhase | null {
    const inProgressPhases = this.phases.filter(
      phase => phase.status === 'in_progress'
    );
    
    if (inProgressPhases.length > 0) {
      return inProgressPhases[0];
    }
    
    const notStartedPhases = this.phases.filter(
      phase => phase.status === 'not_started'
    ).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    
    return notStartedPhases[0] || null;
  }

  /**
   * Get the current active milestone
   */
  getCurrentMilestone(): RoadmapMilestone | null {
    const currentPhase = this.getCurrentPhase();
    if (!currentPhase) return null;
    
    const inProgressMilestones = currentPhase.milestones.filter(
      milestone => milestone.status === 'in_progress'
    );
    
    if (inProgressMilestones.length > 0) {
      return inProgressMilestones[0];
    }
    
    const notStartedMilestones = currentPhase.milestones.filter(
      milestone => milestone.status === 'not_started'
    ).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    
    return notStartedMilestones[0] || null;
  }

  /**
   * Check if the roadmap has any overdue milestones
   */
  hasOverdueMilestones(): boolean {
    return this.phases.some(phase =>
      phase.milestones.some(milestone => milestone.status === 'overdue')
    );
  }

  /**
   * Get all milestones across all phases
   */
  getAllMilestones(): RoadmapMilestone[] {
    return this.phases.flatMap(phase => phase.milestones);
  }

  /**
   * Update the completion status of a specific milestone
   */
  updateMilestoneStatus(
    milestoneId: string,
    status: 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'overdue',
    completionPercentage: number
  ): Roadmap {
    const updatedPhases = this.phases.map(phase => {
      const milestoneIndex = phase.milestones.findIndex(m => m.id === milestoneId);
      
      if (milestoneIndex !== -1) {
        // Update the specific milestone
        const updatedMilestones = [...phase.milestones];
        updatedMilestones[milestoneIndex] = {
          ...updatedMilestones[milestoneIndex],
          status,
          completionPercentage
        };
        
        // Recalculate phase completion percentage
        const phaseCompletionPercentage = updatedMilestones.reduce(
          (sum, milestone) => sum + milestone.completionPercentage,
          0
        ) / updatedMilestones.length;
        
        // Update the phase status based on milestones
        let phaseStatus = phase.status;
        const allCompleted = updatedMilestones.every(m => m.status === 'completed');
        const anyInProgress = updatedMilestones.some(m => m.status === 'in_progress');
        const anyBlocked = updatedMilestones.some(m => m.status === 'blocked');
        const anyOverdue = updatedMilestones.some(m => m.status === 'overdue');
        
        if (allCompleted) {
          phaseStatus = 'completed';
        } else if (anyBlocked) {
          phaseStatus = 'blocked';
        } else if (anyOverdue) {
          phaseStatus = 'overdue';
        } else if (anyInProgress) {
          phaseStatus = 'in_progress';
        }
        
        return {
          ...phase,
          milestones: updatedMilestones,
          completionPercentage: Math.round(phaseCompletionPercentage),
          status: phaseStatus
        };
      }
      
      return phase;
    });
    
    return new Roadmap({
      ...this,
      phases: updatedPhases,
      lastUpdated: new Date(),
      completionPercentage: this.calculateCompletionPercentage()
    });
  }

  /**
   * Convert the Roadmap entity to a plain object
   */
  toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      caseId: this.caseId,
      caseType: this.caseType,
      userId: this.userId,
      phases: this.phases.map(phase => ({
        ...phase,
        startDate: phase.startDate.toISOString(),
        endDate: phase.endDate.toISOString(),
        milestones: phase.milestones.map(milestone => ({
          ...milestone,
          startDate: milestone.startDate.toISOString(),
          endDate: milestone.endDate.toISOString()
        }))
      })),
      startDate: this.startDate.toISOString(),
      targetEndDate: this.targetEndDate.toISOString(),
      estimatedEndDate: this.estimatedEndDate.toISOString(),
      completionPercentage: this.completionPercentage,
      lastUpdated: this.lastUpdated.toISOString(),
      metadata: this.metadata
    };
  }

  /**
   * Create a Roadmap entity from database data
   */
  static fromDatabase(data: any): Roadmap {
    return new Roadmap({
      id: data.id,
      title: data.title,
      description: data.description,
      caseId: data.case_id,
      caseType: data.case_type,
      userId: data.user_id,
      phases: Array.isArray(data.phases) ? data.phases.map((phase: any) => ({
        ...phase,
        startDate: new Date(phase.start_date),
        endDate: new Date(phase.end_date),
        milestones: Array.isArray(phase.milestones) ? phase.milestones.map((milestone: any) => ({
          ...milestone,
          startDate: new Date(milestone.start_date),
          endDate: new Date(milestone.end_date)
        })) : []
      })) : [],
      startDate: data.start_date,
      targetEndDate: data.target_end_date,
      estimatedEndDate: data.estimated_end_date,
      completionPercentage: data.completion_percentage,
      lastUpdated: data.last_updated,
      metadata: data.metadata || {}
    });
  }
} 