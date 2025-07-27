import { createSupabaseServiceClient } from "@/lib/supabase/server";
import type { Document } from "@/types/domain/documents";
import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  DomainMapper,
  DBDocumentRow,
  DocumentDomain,
} from "@/types/domain-mappings";

/**
 * Database record structure directly from Supabase
 */
export type DocumentRecord = DBDocumentRow; // Alias for compatibility
export type DocumentInsert =
  Database["public"]["Tables"]["documents"]["Insert"];
export type DocumentUpdate =
  Database["public"]["Tables"]["documents"]["Update"];

/**
 * Document access record structure
 */
export interface DocumentAccess {
  userId: string;
  permission: string;
  grantedBy: string;
  expiresAt?: Date;
}

/**
 * Document version record structure
 */
export interface DocumentVersion {
  documentId: string;
  version: number;
  filePath: string;
  fileSize: number;
  fileType: string;
  createdAt: string;
  createdBy: string;
  metadata?: Record<string, any>;
}

/**
 * Structure for document access records from DB
 */
interface DocumentAccessRecord {
  id: string;
  document_id: string;
  user_id: string;
  permission: string;
  granted_by: string;
  granted_at: string;
  expires_at: string | null;
}

/**
 * Structure for document version records from DB
 */
interface DocumentVersionRecord {
  id: string;
  document_id: string;
  version: number;
  file_path: string;
  file_size: number;
  file_type: string;
  created_at: string;
  created_by: string;
  metadata: Record<string, any> | null;
}

/**
 * Configuration options for the document repository
 */
export type DocumentRepositoryOptions = {
  useServiceRole?: boolean;
};

/**
 * Execute SQL statement dynamically
 * This is a helper for tables not in the Database type definition
 */
type SqlExecutor = <T>(query: string, values?: any[]) => Promise<T[]>;

/**
 * DocumentRepository provides data access operations for documents
 *
 * Standalone implementation that doesn't rely on BaseRepository to avoid
 * type compatibility issues with tables not in the Supabase schema
 */
export class DocumentRepository {
  private supabase: SupabaseClient<Database> | null = null;
  private readonly tableName = "documents";
  private readonly options: DocumentRepositoryOptions;

  /**
   * Constructor
   */
  constructor(options: DocumentRepositoryOptions = {}) {
    this.options = options;
  }

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
   * Get all documents
   */
  async getAll(
    options: { limit?: number; offset?: number } = {}
  ): Promise<DocumentRecord[]> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select("*")
      .range(
        options.offset || 0,
        (options.offset || 0) + (options.limit || 100) - 1
      );

    if (error) throw error;
    return data || [];
  }

  /**
   * Get a document by ID
   */
  async getById(id: string): Promise<DocumentRecord | null> {
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

    return data;
  }

  /**
   * Create a new document
   */
  async create(data: DocumentInsert): Promise<DocumentRecord> {
    const client = await this.getClient();
    const { data: createdData, error } = await client
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return createdData;
  }

  /**
   * Update a document
   */
  async update(id: string, data: DocumentUpdate): Promise<DocumentRecord> {
    const client = await this.getClient();
    const { data: updatedData, error } = await client
      .from(this.tableName)
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return updatedData;
  }

  /**
   * Delete a document
   */
  async delete(id: string): Promise<boolean> {
    const client = await this.getClient();
    const { error } = await client.from(this.tableName).delete().eq("id", id);

    if (error) throw error;
    return true;
  }

  /**
   * Execute a raw SQL query safely
   * Used for accessing tables that aren't in the Database type
   */
  private async executeSql<T>(sql: string, values?: any[]): Promise<T[]> {
    const client = await this.getClient();
    // Using any type assertion here since we're working with tables outside the schema
    try {
      const { data, error } = await (client as any).rpc("execute_sql", {
        query: sql,
        params: values || [],
      });

      if (error) throw error;
      return (data || []) as T[];
    } catch (error) {
      console.error("Error executing SQL:", error);
      return [];
    }
  }

  /**
   * Get all documents for a user with various filtering options
   */
  async getByUserId(
    userId: string,
    options?: {
      type?: string[];
      status?: string[];
      shared?: boolean;
      limit?: number;
      offset?: number;
      orderBy?: string;
      searchQuery?: string;
    }
  ): Promise<DocumentRecord[]> {
    const client = await this.getClient();
    let query = client
      .from(this.tableName)
      .select("*")
      .or(`user_id.eq.${userId},access->:userId->permission.not.is.null`);

    // Apply filters
    if (options?.type && options.type.length > 0) {
      query = query.in("file_type", options.type);
    }

    if (options?.status && options.status.length > 0) {
      query = query.in("status", options.status);
    }

    // Only get documents owned by the user (exclude shared)
    if (options?.shared === false) {
      query = query.eq("user_id", userId);
    }

    // Only get documents shared with the user (exclude owned)
    if (options?.shared === true) {
      query = query.neq("user_id", userId);
    }

    // Search by name or filename
    if (options?.searchQuery) {
      query = query.or(`filename.ilike.%${options.searchQuery}%`);
    }

    // Apply ordering
    if (options?.orderBy) {
      const [field, direction] = options.orderBy.split(":");

      // Map camelCase field names to snake_case database column names
      const fieldMapping: Record<string, string> = {
        createdAt: "created_at",
        updatedAt: "updated_at",
        userId: "user_id",
        fileName: "filename",
        filePath: "file_path",
        fileSize: "file_size",
        fileType: "file_type",
      };

      const dbField = fieldMapping[field] || field;
      query = query.order(dbField, { ascending: direction !== "desc" });
    } else {
      query = query.order("updated_at", { ascending: false });
    }

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(
        options.offset,
        options.offset + (options.limit || 10) - 1
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching documents by user ID:", error);
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get a document with its versions and access records
   */
  async getWithDetails(documentId: string): Promise<{
    document: DocumentRecord;
    versions: DocumentVersionRecord[];
    access: DocumentAccessRecord[];
  } | null> {
    const client = await this.getClient();

    // Fetch document
    const { data: document, error: documentError } = await client
      .from(this.tableName)
      .select("*")
      .eq("id", documentId)
      .single();

    if (documentError || !document) {
      console.error("Error fetching document:", documentError);
      return null;
    }

    // Fetch versions using SQL
    let versions: DocumentVersionRecord[] = [];
    try {
      const versionsSql = `
        SELECT * FROM document_versions 
        WHERE document_id = $1
        ORDER BY created_at DESC
      `;
      versions = await this.executeSql<DocumentVersionRecord>(versionsSql, [
        documentId,
      ]);
    } catch (error) {
      console.error("Error fetching document versions:", error);
    }

    // Fetch access records using SQL
    let access: DocumentAccessRecord[] = [];
    try {
      const accessSql = `
        SELECT * FROM document_access
        WHERE document_id = $1
      `;
      access = await this.executeSql<DocumentAccessRecord>(accessSql, [
        documentId,
      ]);
    } catch (error) {
      console.error("Error fetching document access records:", error);
    }

    return {
      document,
      versions,
      access,
    };
  }

  /**
   * Add a new version to a document
   */
  async addVersion(
    documentId: string,
    version: Omit<DocumentVersion, "documentId">
  ): Promise<DocumentVersionRecord | { document_id: string }> {
    const client = await this.getClient();

    try {
      // Execute SQL to insert version
      const versionSql = `
        INSERT INTO document_versions (
          document_id, version, file_path, file_size, 
          file_type, created_by, created_at, metadata
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        )
        RETURNING *
      `;

      const createdAt = new Date().toISOString();
      const results = await this.executeSql<DocumentVersionRecord>(versionSql, [
        documentId,
        version.version,
        version.filePath,
        version.fileSize,
        version.fileType,
        version.createdBy,
        createdAt,
        JSON.stringify(version.metadata || {}),
      ]);

      // Update the document's updated_at timestamp
      await client
        .from(this.tableName)
        .update({ updated_at: createdAt })
        .eq("id", documentId);

      return results[0] || { document_id: documentId };
    } catch (error) {
      console.error("Error adding document version:", error);

      // Update the document's updated_at timestamp anyway
      await client
        .from(this.tableName)
        .update({ updated_at: new Date().toISOString() })
        .eq("id", documentId);

      // Return a minimal object with the document_id
      return { document_id: documentId };
    }
  }

  /**
   * Grant access to a document
   */
  async grantAccess(
    documentId: string,
    access: Omit<DocumentAccess, "documentId">
  ): Promise<
    | DocumentAccessRecord
    | { document_id: string; user_id: string; permission: string }
  > {
    const client = await this.getClient();

    try {
      // Check if access record exists
      const checkSql = `
        SELECT id FROM document_access
        WHERE document_id = $1 AND user_id = $2
      `;

      const existingRecords = await this.executeSql<{ id: string }>(checkSql, [
        documentId,
        access.userId,
      ]);

      let result: DocumentAccessRecord | null = null;
      const now = new Date().toISOString();

      if (existingRecords.length > 0) {
        // Update existing record
        const updateSql = `
          UPDATE document_access
          SET 
            permission = $3,
            granted_by = $4,
            granted_at = $5,
            expires_at = $6
          WHERE id = $7
          RETURNING *
        `;

        const updateResults = await this.executeSql<DocumentAccessRecord>(
          updateSql,
          [
            access.permission,
            access.grantedBy,
            now,
            access.expiresAt ? access.expiresAt.toISOString() : null,
            existingRecords[0].id,
          ]
        );

        if (updateResults.length > 0) {
          result = updateResults[0];
        }
      } else {
        // Insert new record
        const insertSql = `
          INSERT INTO document_access (
            document_id, user_id, permission, 
            granted_by, granted_at, expires_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6
          )
          RETURNING *
        `;

        const insertResults = await this.executeSql<DocumentAccessRecord>(
          insertSql,
          [
            documentId,
            access.userId,
            access.permission,
            access.grantedBy,
            now,
            access.expiresAt ? access.expiresAt.toISOString() : null,
          ]
        );

        if (insertResults.length > 0) {
          result = insertResults[0];
        }
      }

      // Update the document's updated_at timestamp
      await client
        .from(this.tableName)
        .update({ updated_at: now })
        .eq("id", documentId);

      return (
        result || {
          document_id: documentId,
          user_id: access.userId,
          permission: access.permission,
        }
      );
    } catch (error) {
      console.error("Error granting document access:", error);

      // Update the document's updated_at timestamp anyway
      await client
        .from(this.tableName)
        .update({ updated_at: new Date().toISOString() })
        .eq("id", documentId);

      // Return minimal information
      return {
        document_id: documentId,
        user_id: access.userId,
        permission: access.permission,
      };
    }
  }

  /**
   * Revoke access to a document
   */
  async revokeAccess(documentId: string, userId: string): Promise<void> {
    const client = await this.getClient();

    try {
      const deleteSql = `
        DELETE FROM document_access
        WHERE document_id = $1 AND user_id = $2
      `;

      await this.executeSql(deleteSql, [documentId, userId]);
    } catch (error) {
      console.error("Error revoking document access:", error);
    }

    // Always update the document's updated_at timestamp
    await client
      .from(this.tableName)
      .update({ updated_at: new Date().toISOString() })
      .eq("id", documentId);
  }

  /**
   * Add document to a case
   */
  async addToCase(documentId: string, caseId: string): Promise<void> {
    const client = await this.getClient();
    // Get current case IDs from metadata
    const { data: document, error: fetchError } = await client
      .from(this.tableName)
      .select("metadata")
      .eq("id", documentId)
      .single();

    if (fetchError) {
      console.error("Error fetching document metadata:", fetchError);
      throw new Error(
        `Failed to fetch document metadata: ${fetchError.message}`
      );
    }

    // Add case ID if not already present
    const metadata = (document.metadata as Record<string, any>) || {};
    const caseIds = (metadata.case_ids as string[]) || [];
    if (!caseIds.includes(caseId)) {
      caseIds.push(caseId);

      // Update metadata
      const updatedMetadata = {
        ...metadata,
        case_ids: caseIds,
      };

      const { error: updateError } = await client
        .from(this.tableName)
        .update({
          metadata: updatedMetadata,
          updated_at: new Date().toISOString(),
        })
        .eq("id", documentId);

      if (updateError) {
        console.error("Error adding document to case:", updateError);
        throw new Error(
          `Failed to add document to case: ${updateError.message}`
        );
      }

      // Add to case_documents junction table
      try {
        const insertSql = `
          INSERT INTO case_documents (
            case_id, document_id, added_at
          ) VALUES (
            $1, $2, $3
          )
        `;

        await this.executeSql(insertSql, [
          caseId,
          documentId,
          new Date().toISOString(),
        ]);
      } catch (error) {
        console.error("Error updating case_documents:", error);
        // We don't throw here because the main update already succeeded
      }
    }
  }

  /**
   * Remove document from a case
   */
  async removeFromCase(documentId: string, caseId: string): Promise<void> {
    const client = await this.getClient();
    // Get current case IDs from metadata
    const { data: document, error: fetchError } = await client
      .from(this.tableName)
      .select("metadata")
      .eq("id", documentId)
      .single();

    if (fetchError) {
      console.error("Error fetching document metadata:", fetchError);
      throw new Error(
        `Failed to fetch document metadata: ${fetchError.message}`
      );
    }

    // Remove case ID if present
    const metadata = (document.metadata as Record<string, any>) || {};
    const caseIds = (metadata.case_ids as string[]) || [];
    const updatedCaseIds = caseIds.filter((id) => id !== caseId);

    if (caseIds.length !== updatedCaseIds.length) {
      // Update metadata
      const updatedMetadata = {
        ...metadata,
        case_ids: updatedCaseIds,
      };

      const { error: updateError } = await client
        .from(this.tableName)
        .update({
          metadata: updatedMetadata,
          updated_at: new Date().toISOString(),
        })
        .eq("id", documentId);

      if (updateError) {
        console.error("Error removing document from case:", updateError);
        throw new Error(
          `Failed to remove document from case: ${updateError.message}`
        );
      }

      // Remove from case_documents junction table
      try {
        const deleteSql = `
          DELETE FROM case_documents
          WHERE case_id = $1 AND document_id = $2
        `;

        await this.executeSql(deleteSql, [caseId, documentId]);
      } catch (error) {
        console.error("Error updating case_documents:", error);
        // We don't throw here because the main update already succeeded
      }
    }
  }

  /**
   * Check if a user has access to a document
   */
  async userHasAccess(
    documentId: string,
    userId: string,
    permission: "view" | "edit" | "delete" | "admin" = "view"
  ): Promise<boolean> {
    const client = await this.getClient();

    // First check if user is the owner
    const { data: document, error: documentError } = await client
      .from(this.tableName)
      .select("user_id")
      .eq("id", documentId)
      .single();

    if (documentError) {
      console.error("Error checking document ownership:", documentError);
      return false;
    }

    // Owner has all permissions
    if (document.user_id === userId) {
      return true;
    }

    try {
      // Check access records
      const accessSql = `
        SELECT permission, expires_at
        FROM document_access
        WHERE document_id = $1 AND user_id = $2
      `;

      const accessRecords = await this.executeSql<{
        permission: string;
        expires_at: string | null;
      }>(accessSql, [documentId, userId]);

      // No access records
      if (!accessRecords || accessRecords.length === 0) {
        return false;
      }

      // Check if any access record gives the required permission
      const now = new Date();
      return accessRecords.some((record) => {
        // Check if access has expired
        if (record.expires_at && new Date(record.expires_at) < now) {
          return false;
        }

        // Admin permission grants all access
        if (record.permission === "admin") {
          return true;
        }

        // Match specific permission
        if (permission === "view") {
          // Any permission level grants view access
          return true;
        } else if (permission === "edit") {
          // Edit or admin permission grants edit access
          return ["edit", "admin"].includes(record.permission);
        } else if (permission === "delete") {
          // Only delete or admin permission grants delete access
          return ["delete", "admin"].includes(record.permission);
        }

        return false;
      });
    } catch (error) {
      console.error("Error checking document access:", error);
      // If we can't check access, default to false
      return false;
    }
  }

  /**
   * Convert database record to domain entity
   */
  toDomainEntity(record: DocumentRecord): Document {
    // We need to adapt the Supabase DocumentRecord to our Domain Document
    // This is a mapping function that bridges the database schema with our domain model
    return {
      id: record.id,
      title: record.filename,
      content: record.file_path,
      url: record.file_path,
      country: (record.metadata as any)?.country || "",
      category: record.file_type || "",
      lastUpdated: record.updated_at || undefined,
      metadata: (record.metadata as Record<string, any>) || {},
      createdAt: record.created_at || new Date().toISOString(),
      updatedAt: record.updated_at || new Date().toISOString(),
    };
  }

  /**
   * Find documents by their content hash
   * Can be used to find duplicate documents
   */
  async findByContentHash(contentHash: string): Promise<DocumentRecord[]> {
    const client = await this.getClient();

    try {
      // Find document IDs with matching content hash
      const contentHashSql = `
        SELECT document_id
        FROM document_versions
        WHERE metadata->>'contentHash' = $1
      `;

      const versionData = await this.executeSql<{ document_id: string }>(
        contentHashSql,
        [contentHash]
      );

      if (!versionData || versionData.length === 0) {
        return [];
      }

      // Get the actual documents
      const documentIds = versionData.map((v) => v.document_id);
      const { data: documents, error: documentsError } = await client
        .from(this.tableName)
        .select("*")
        .in("id", documentIds);

      if (documentsError) {
        console.error("Error fetching documents by IDs:", documentsError);
        throw new Error(
          `Failed to fetch documents by IDs: ${documentsError.message}`
        );
      }

      return documents || [];
    } catch (error) {
      // Handle case where document_versions table might not exist
      console.error("Error finding documents by content hash:", error);
      return [];
    }
  }
}
