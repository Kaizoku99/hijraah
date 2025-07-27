import { SupabaseClient } from "@supabase/supabase-js";

import { Case } from "@/types/cases";
import { Database } from "@/types/database.types";
import { DomainMapper, DBCaseRow, CaseDomain } from "@/types/domain-mappings";

import { BaseRepository } from "./base-repository";

// Define the database record type for Cases
export type CaseRecord = DBCaseRow; // Use domain mapping type

// Define missing types that aren't in the Database definition
export interface CaseMessage {
  id: string;
  case_id: string;
  user_id: string;
  content: string;
  is_system_message: boolean;
  created_at: string;
  metadata?: Record<string, any>;
}

// Augment document type with missing fields
export type DocumentWithCaseId =
  Database["public"]["Tables"]["documents"]["Row"] & {
    case_id?: string | null;
  };

/**
 * Repository for Case entities
 */
export class CaseRepository extends BaseRepository<CaseRecord, string> {
  constructor() {
    super("cases");
  }

  /**
   * Get all cases for a specific user (as client or assigned)
   */
  async getByUserId(
    userId: string,
    options: {
      includeAssigned?: boolean;
      status?: string[];
      limit?: number;
      offset?: number;
    } = {},
  ): Promise<CaseRecord[]> {
    const client = await this.getClient();

    let query = client.from(this.tableName).select("*");

    if (options.includeAssigned) {
      // Include cases where user is client or is assigned to the case
      query = query.or(
        `client_id.eq.${userId},assignments->contain->${userId}`,
      );
    } else {
      // Only include cases where user is the client
      query = query.eq("client_id", userId);
    }

    // Filter by status if provided
    if (options.status && options.status.length > 0) {
      query = query.in("status", options.status);
    }

    // Add pagination
    query = query.range(
      options.offset || 0,
      (options.offset || 0) + (options.limit || 10) - 1,
    );

    // Order by updated_at descending (most recent first)
    query = query.order("updated_at", { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return data as CaseRecord[];
  }

  /**
   * Get a case with all related data (documents, messages, etc.)
   */
  async getWithDetails(id: string): Promise<{
    case: CaseRecord;
    documents: DocumentWithCaseId[];
    messages: CaseMessage[];
  } | null> {
    const client = await this.getClient();

    // Get the case
    const { data: caseData, error: caseError } = await client
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (caseError) {
      if (caseError.code === "PGRST116") return null; // Record not found
      throw caseError;
    }

    // Get related documents
    const { data: documents, error: documentsError } = await client
      .from("documents")
      .select("*")
      .eq("case_id", id)
      .order("created_at", { ascending: false });

    if (documentsError) throw documentsError;

    // Get case messages/comments
    // Using 'as any' to bypass type checking for table that doesn't exist in type definition
    const { data: messages, error: messagesError } = await (client
      .from("case_messages" as any)
      .select("*")
      .eq("case_id", id)
      .order("created_at", { ascending: false }) as any);

    if (messagesError) throw messagesError;

    return {
      case: caseData as CaseRecord,
      documents: (documents || []) as DocumentWithCaseId[],
      messages: (messages || []) as CaseMessage[],
    };
  }

  /**
   * Add a document to a case
   */
  async addDocument(caseId: string, documentId: string): Promise<void> {
    const client = await this.getClient();

    // Update the document to link it to the case
    // Using 'as any' to bypass type checking for fields that don't exist in type definition
    const { error } = await client
      .from("documents")
      .update({ case_id: caseId } as any)
      .eq("id", documentId);

    if (error) throw error;
  }

  /**
   * Remove a document from a case
   */
  async removeDocument(documentId: string): Promise<void> {
    const client = await this.getClient();

    // Update the document to unlink it from the case
    // Using 'as any' to bypass type checking for fields that don't exist in type definition
    const { error } = await client
      .from("documents")
      .update({ case_id: null } as any)
      .eq("id", documentId);

    if (error) throw error;
  }

  /**
   * Add a message to a case
   */
  async addMessage(message: {
    case_id: string;
    user_id: string;
    content: string;
    is_system_message?: boolean;
    metadata?: Record<string, any>;
  }): Promise<CaseMessage> {
    const client = await this.getClient();

    // Using 'as any' to bypass type checking for table that doesn't exist in type definition
    const { data, error } = await (client
      .from("case_messages" as any)
      .insert({
        ...message,
        is_system_message: message.is_system_message || false,
        created_at: new Date().toISOString(),
      })
      .select()
      .single() as any);

    if (error) throw error;
    return data as CaseMessage;
  }

  /**
   * Update a case's timeline
   */
  async updateTimeline(id: string, timeline: any[]): Promise<void> {
    const client = await this.getClient();

    // Using 'as any' to bypass type checking for fields that don't exist in type definition
    const { error } = await client
      .from(this.tableName)
      .update({ timeline } as any)
      .eq("id", id);

    if (error) throw error;
  }

  /**
   * Assign a user to a case
   */
  async assignUser(
    caseId: string,
    userId: string,
    role: string,
  ): Promise<void> {
    const client = await this.getClient();

    // First, get the current case to access its assignments
    const { data: caseData, error: caseError } = await client
      .from(this.tableName)
      .select("assignments")
      .eq("id", caseId)
      .single();

    if (caseError) throw caseError;

    // Update assignments - use type assertion to work with the data
    const currentAssignments = (caseData as any).assignments || [];

    // Check if user is already assigned with this role
    const existingAssignmentIndex = currentAssignments.findIndex(
      (a: any) => a.userId === userId && a.role === role,
    );

    if (existingAssignmentIndex >= 0) {
      // User already has this assignment, no update needed
      return;
    }

    // Remove any existing assignment for this user (to prevent duplicates)
    const filteredAssignments = currentAssignments.filter(
      (a: any) => a.userId !== userId,
    );

    // Add the new assignment
    const newAssignments = [
      ...filteredAssignments,
      {
        userId,
        role,
        assignedAt: new Date().toISOString(),
        assignedBy: "system", // This should be parameterized in a real implementation
      },
    ];

    // Update the case
    const { error: updateError } = await client
      .from(this.tableName)
      .update({ assignments: newAssignments } as any)
      .eq("id", caseId);

    if (updateError) throw updateError;
  }

  /**
   * Remove a user assignment from a case
   */
  async removeAssignment(caseId: string, userId: string): Promise<void> {
    const client = await this.getClient();

    // First, get the current case to access its assignments
    const { data: caseData, error: caseError } = await client
      .from(this.tableName)
      .select("assignments")
      .eq("id", caseId)
      .single();

    if (caseError) throw caseError;

    // Update assignments - use type assertion to work with the data
    const currentAssignments = (caseData as any).assignments || [];

    // Remove assignment for this user
    const newAssignments = currentAssignments.filter(
      (a: any) => a.userId !== userId,
    );

    // If no change, return early
    if (newAssignments.length === currentAssignments.length) {
      return;
    }

    // Update the case
    const { error: updateError } = await client
      .from(this.tableName)
      .update({ assignments: newAssignments } as any)
      .eq("id", caseId);

    if (updateError) throw updateError;
  }

  /**
   * Check if a user has access to a case
   */
  async userHasAccess(
    caseId: string,
    userId: string,
    roles?: string[],
  ): Promise<boolean> {
    const client = await this.getClient();

    // Get the case
    const { data: caseData, error } = await client
      .from(this.tableName)
      .select("client_id, assignments")
      .eq("id", caseId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return false; // Case not found
      throw error;
    }

    // Use type assertion to work with the fields
    const typedCaseData = caseData as any;

    // Check if user is the client
    if (typedCaseData.client_id === userId) {
      // If roles are specified, check if 'client' is included
      return !roles || roles.includes("client");
    }

    // Check if user has an assignment
    const assignments = typedCaseData.assignments || [];
    const userAssignment = assignments.find((a: any) => a.userId === userId);

    if (!userAssignment) {
      return false;
    }

    // If roles are specified, check if user's role is included
    if (roles && !roles.includes(userAssignment.role)) {
      return false;
    }

    return true;
  }

  /**
   * Get cases by status
   */
  async getByStatus(
    status: string | string[],
    options: {
      limit?: number;
      offset?: number;
    } = {},
  ): Promise<CaseRecord[]> {
    const client = await this.getClient();

    let query = client.from(this.tableName).select("*");

    // Filter by status
    if (Array.isArray(status)) {
      query = query.in("status", status);
    } else {
      query = query.eq("status", status);
    }

    // Add pagination
    query = query.range(
      options.offset || 0,
      (options.offset || 0) + (options.limit || 10) - 1,
    );

    // Order by updated_at descending
    query = query.order("updated_at", { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return data as CaseRecord[];
  }

  /**
   * Convert database record to domain entity
   */
  toDomainEntity(record: CaseRecord): Case {
    // CaseRow (aliașed as CaseRecord) is extended by the Case interface.
    // A direct cast should be safe if all additional Case props are optional or handled by consumers.
    return record as Case;
  }

  /**
   * Convert database record to domain mapping format
   */
  toCaseDomain(record: CaseRecord): CaseDomain {
    return DomainMapper.toCaseDomain(record);
  }

  /**
   * Prepare case domain entity for database storage
   */
  fromCaseDomain(domain: CaseDomain): Partial<CaseRecord> {
    return DomainMapper.fromCaseDomain(domain);
  }
}
