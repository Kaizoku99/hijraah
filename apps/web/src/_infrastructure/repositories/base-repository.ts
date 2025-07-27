import { SupabaseClient } from "@supabase/supabase-js";

import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";
import { DomainMapper } from "@/types/domain-mappings";

export type RepositoryOptions = {
  useServiceRole?: boolean;
};

/**
 * Base Repository interface for data access operations
 * T represents the entity type
 * K represents the primary key type (usually string or number)
 */
export interface IRepository<T, K = string> {
  /**
   * Retrieve all records of this entity
   */
  getAll(options?: { limit?: number; offset?: number }): Promise<T[]>;

  /**
   * Retrieve a single record by its ID
   */
  getById(id: K): Promise<T | null>;

  /**
   * Create a new record
   */
  create(data: Partial<T>): Promise<T>;

  /**
   * Update an existing record
   */
  update(id: K, data: Partial<T>): Promise<T>;

  /**
   * Delete a record by its ID
   */
  delete(id: K): Promise<boolean>;
}

/**
 * Base Repository implementation using Supabase
 */
export abstract class BaseRepository<
  T,
  K = string,
  TableName extends
    keyof Database["public"]["Tables"] = keyof Database["public"]["Tables"],
> implements IRepository<T, K>
{
  protected tableName: TableName;
  private static clientInstance: SupabaseClient<Database> | null = null;

  constructor(tableName: TableName, options: RepositoryOptions = {}) {
    this.tableName = tableName;
  }

  protected async getClient(): Promise<SupabaseClient<Database>> {
    if (BaseRepository.clientInstance === null) {
      BaseRepository.clientInstance = createSupabaseServiceClient();
    }
    return BaseRepository.clientInstance;
  }

  /**
   * Retrieve all records of this entity
   */
  async getAll(
    options: { limit?: number; offset?: number } = {},
  ): Promise<T[]> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select("*")
      .range(
        options.offset || 0,
        (options.offset || 0) + (options.limit || 100) - 1,
      );

    if (error) throw error;
    return data as T[];
  }

  /**
   * Retrieve a single record by its ID
   */
  async getById(id: K): Promise<T | null> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select("*")
      .eq("id", id as any)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Record not found
      throw error;
    }
    return data as T;
  }

  /**
   * Create a new record
   */
  async create(data: Partial<T>): Promise<T> {
    const client = await this.getClient();

    // Log the data being sent to help debug the createdAt issue
    console.log(
      `[BaseRepository.create] Inserting into ${this.tableName}:`,
      JSON.stringify(data, null, 2),
    );

    const { data: createdData, error } = await client
      .from(this.tableName)
      .insert(data as any)
      .select()
      .single();

    if (error) {
      console.error(`[BaseRepository.create] Error:`, error);
      throw error;
    }
    return createdData as T;
  }

  /**
   * Update an existing record
   */
  async update(id: K, data: Partial<T>): Promise<T> {
    const client = await this.getClient();
    const { data: updatedData, error } = await client
      .from(this.tableName)
      .update(data as any)
      .eq("id", id as any)
      .select()
      .single();

    if (error) throw error;
    return updatedData as T;
  }

  /**
   * Delete a record by its ID
   */
  async delete(id: K): Promise<boolean> {
    const client = await this.getClient();
    const { error } = await client
      .from(this.tableName)
      .delete()
      .eq("id", id as any);

    if (error) throw error;
    return true;
  }

  // Abstract method to be implemented by subclasses
  abstract toDomainEntity(record: T): T;
  // Optional: abstract fromDomainEntity(entity: T): T;
}
