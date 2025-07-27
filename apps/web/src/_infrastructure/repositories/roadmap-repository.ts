import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { Roadmap, RoadmapPhase } from "@/core/immigration/entities/roadmap";
import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  DomainMapper,
  DBRoadmapRow,
  RoadmapDomain,
} from "@/types/domain-mappings";

/**
 * Database record type for roadmaps
 */
export type RoadmapRecord = DBRoadmapRow; // Use domain mapping type
export type RoadmapInsert = Database["public"]["Tables"]["roadmaps"]["Insert"];

/**
 * Roadmap Repository
 *
 * Handles data access for roadmaps
 */
export class RoadmapRepository {
  private supabase: SupabaseClient<Database> | null = null;
  private readonly tableName = "roadmaps";

  /**
   * Get the Supabase client
   */
  private async getClient(): Promise<SupabaseClient<Database>> {
    if (this.supabase === null) {
      this.supabase = createSupabaseServiceClient();
    }
    return this.supabase;
  }

  /**
   * Get all roadmaps
   */
  async getAll(
    options: { limit?: number; offset?: number } = {},
  ): Promise<Roadmap[]> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select("*")
      .range(
        options.offset || 0,
        (options.offset || 0) + (options.limit || 100) - 1,
      );

    if (error) throw error;
    return (data || []).map((record) =>
      this.toDomainEntity(record as RoadmapRecord),
    );
  }

  /**
   * Get roadmaps by case ID
   */
  async getByCaseId(caseId: string): Promise<Roadmap[]> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select("*")
      .eq("case_id", caseId)
      .order("created_at", { ascending: false });

    if (error)
      throw new Error(`Failed to get roadmaps by case ID: ${error.message}`);

    return (data || []).map((record) =>
      this.toDomainEntity(record as RoadmapRecord),
    );
  }

  /**
   * Get roadmaps by user ID
   */
  async getByUserId(userId: string): Promise<Roadmap[]> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select("*")
      .eq("user_id", userId)
      .order("last_updated", { ascending: false });

    if (error)
      throw new Error(`Failed to get roadmaps by user ID: ${error.message}`);

    return (data || []).map((record) =>
      this.toDomainEntity(record as RoadmapRecord),
    );
  }

  /**
   * Get a roadmap by ID
   */
  async getById(id: string): Promise<Roadmap | null> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Record not found
      throw error;
    }
    return data ? this.toDomainEntity(data as RoadmapRecord) : null;
  }

  /**
   * Create a new roadmap
   */
  async create(roadmap: Roadmap): Promise<Roadmap> {
    const client = await this.getClient();
    const data = this.fromDomainEntity(roadmap);

    // Ensure required fields are present
    if (!data.case_id) {
      throw new Error("Case ID is required for roadmap creation");
    }

    if (!data.user_id) {
      throw new Error("User ID is required for roadmap creation");
    }

    const { data: createdData, error } = await client
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return this.toDomainEntity(createdData as RoadmapRecord);
  }

  /**
   * Update a roadmap
   */
  async update(roadmap: Roadmap): Promise<Roadmap> {
    const client = await this.getClient();
    const data = this.fromDomainEntity(roadmap);

    // Remove id from update data
    const { id, ...updateData } = data;

    const { data: updatedData, error } = await client
      .from(this.tableName)
      .update(updateData)
      .eq("id", roadmap.id)
      .select()
      .single();

    if (error) throw error;
    return this.toDomainEntity(updatedData as RoadmapRecord);
  }

  /**
   * Delete a roadmap
   */
  async delete(id: string): Promise<boolean> {
    const client = await this.getClient();
    const { error } = await client.from(this.tableName).delete().eq("id", id);

    if (error) throw error;
    return true;
  }

  /**
   * Update milestone status
   */
  async updateMilestoneStatus(
    roadmapId: string,
    milestoneId: string,
    status: "not_started" | "in_progress" | "completed" | "blocked" | "overdue",
    completionPercentage: number,
  ): Promise<Roadmap> {
    // First get the current roadmap
    const roadmap = await this.getById(roadmapId);
    if (!roadmap) throw new Error(`Roadmap not found: ${roadmapId}`);

    // Update the milestone status
    const updatedRoadmap = roadmap.updateMilestoneStatus(
      milestoneId,
      status,
      completionPercentage,
    );

    // Update in the database
    return this.update(updatedRoadmap);
  }

  /**
   * Convert database record to domain entity
   */
  private toDomainEntity(record: RoadmapRecord): Roadmap {
    return Roadmap.fromDatabase({
      ...record,
      // Ensure phases are properly parsed from Json
      phases: (record.phases as unknown as RoadmapPhase[]) || [],
    });
  }

  /**
   * Convert database record to domain mapping format
   */
  toRoadmapDomain(record: RoadmapRecord): RoadmapDomain {
    return DomainMapper.toRoadmapDomain(record);
  }

  /**
   * Prepare roadmap domain entity for database storage
   */
  fromRoadmapDomain(domain: RoadmapDomain): Partial<RoadmapRecord> {
    return DomainMapper.fromRoadmapDomain(domain);
  }

  /**
   * Prepare domain entity for database storage
   */
  private fromDomainEntity(entity: Roadmap): RoadmapInsert {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      case_id: entity.caseId,
      user_id: entity.userId,
      // Convert phases to Json format
      phases:
        entity.phases as unknown as Database["public"]["Tables"]["roadmaps"]["Row"]["phases"],
      start_date: entity.startDate?.toISOString() || null,
      target_end_date: entity.targetEndDate?.toISOString() || null,
      estimated_end_date: entity.estimatedEndDate?.toISOString() || null,
      completion_percentage: entity.completionPercentage,
      last_updated: new Date().toISOString(),
      metadata: entity.metadata,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }
}
