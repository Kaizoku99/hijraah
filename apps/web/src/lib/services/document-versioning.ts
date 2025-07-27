import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { Redis } from "@upstash/redis";
import EventEmitter from "events";
import { diff_match_patch } from "diff-match-patch";

// Context7 Pattern: Type-safe versioning definitions
export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  title: string;
  content: string;
  contentHash: string;
  changes: DocumentChange[];
  metadata: DocumentVersionMetadata;
  createdAt: string;
  createdBy: string;
  size: number;
  tags: string[];
}

export interface DocumentChange {
  type: "insert" | "delete" | "equal" | "replace";
  position: number;
  length: number;
  oldText?: string;
  newText?: string;
  context: string;
}

export interface DocumentVersionMetadata {
  source: "manual" | "auto" | "import" | "ai_enhancement";
  reason?: string;
  parentVersion?: number;
  mergeFrom?: string[];
  conflictResolution?: string;
  processingTime?: number;
  quality: {
    score: number;
    issues: string[];
    improvements: string[];
  };
  rag: {
    chunkCount: number;
    embeddingUpdated: boolean;
    indexingComplete: boolean;
  };
}

export interface VersionComparison {
  fromVersion: number;
  toVersion: number;
  changes: DocumentChange[];
  summary: {
    insertions: number;
    deletions: number;
    modifications: number;
    similarity: number;
  };
  conflictMarkers?: ConflictMarker[];
}

export interface ConflictMarker {
  position: number;
  length: number;
  conflicts: Array<{
    version: number;
    text: string;
    author: string;
    timestamp: string;
  }>;
}

export interface VersionTree {
  documentId: string;
  versions: Array<{
    version: number;
    parentVersion?: number;
    branches: string[];
    merges: string[];
    isHead: boolean;
    timestamp: string;
  }>;
  branches: Map<string, number[]>;
  tags: Map<string, number>;
}

// Context7 Pattern: Event-driven versioning with typed events
export interface VersioningEvents {
  "version:created": (version: DocumentVersion) => void;
  "version:updated": (version: DocumentVersion) => void;
  "version:deleted": (versionId: string) => void;
  "conflict:detected": (conflict: ConflictMarker) => void;
  "merge:completed": (
    fromVersion: number,
    toVersion: number,
    result: DocumentVersion,
  ) => void;
  "rollback:executed": (fromVersion: number, toVersion: number) => void;
  "branch:created": (branchName: string, fromVersion: number) => void;
  "tag:created": (tagName: string, version: number) => void;
}

// Context7 Pattern: Resource pooling and connection management
export class DocumentVersioningService extends EventEmitter {
  private static instance: DocumentVersioningService;
  private supabase = createSupabaseClient("service");
  private redis?: Redis;
  private dmp = new diff_match_patch();
  private versionCache = new Map<string, DocumentVersion>();
  private readonly cacheTimeout = 10 * 60 * 1000; // 10 minutes

  static getInstance(): DocumentVersioningService {
    if (!DocumentVersioningService.instance) {
      DocumentVersioningService.instance = new DocumentVersioningService();
    }
    return DocumentVersioningService.instance;
  }

  constructor() {
    super();
    this.setupRedis();
    this.configureDiffMatchPatch();
  }

  private setupRedis(): void {
    if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN) {
      this.redis = new Redis({
        url: process.env.UPSTASH_REDIS_URL,
        token: process.env.UPSTASH_REDIS_TOKEN,
      });
    }
  }

  private configureDiffMatchPatch(): void {
    this.dmp.Diff_Timeout = 1.0;
    this.dmp.Diff_EditCost = 4;
    this.dmp.Match_Threshold = 0.8;
    this.dmp.Match_Distance = 1000;
  }

  // Context7 Pattern: Factory method for version creation
  async createVersion(
    documentId: string,
    title: string,
    content: string,
    metadata: Partial<DocumentVersionMetadata> = {},
    userId: string,
  ): Promise<DocumentVersion> {
    try {
      // Get the latest version for comparison
      const latestVersion = await this.getLatestVersion(documentId);
      const newVersionNumber = (latestVersion?.version || 0) + 1;

      // Generate content hash for deduplication
      const contentHash = await this.generateContentHash(content);

      // Check if content actually changed
      if (latestVersion && latestVersion.contentHash === contentHash) {
        throw new Error("No changes detected - version not created");
      }

      // Calculate changes from previous version
      const changes = latestVersion
        ? this.calculateChanges(latestVersion.content, content)
        : [];

      // Analyze content quality
      const quality = await this.analyzeContentQuality(content, changes);

      const version: DocumentVersion = {
        id: crypto.randomUUID(),
        documentId,
        version: newVersionNumber,
        title,
        content,
        contentHash,
        changes,
        metadata: {
          source: "manual",
          quality,
          rag: {
            chunkCount: 0,
            embeddingUpdated: false,
            indexingComplete: false,
          },
          ...metadata,
        },
        createdAt: new Date().toISOString(),
        createdBy: userId,
        size: content.length,
        tags: [],
      };

      // Store in database
      const { data, error } = await this.supabase
        .from("document_versions")
        .insert({
          id: version.id,
          document_id: version.documentId,
          version: version.version,
          title: version.title,
          content: version.content,
          content_hash: version.contentHash,
          changes: version.changes,
          metadata: version.metadata,
          created_by: version.createdBy,
          size: version.size,
          tags: version.tags,
        })
        .select()
        .single();

      if (error) throw error;

      // Cache the version
      this.versionCache.set(version.id, version);

      // Cache in Redis for quick access
      if (this.redis) {
        await this.redis.setex(
          `version:${version.id}`,
          this.cacheTimeout / 1000,
          JSON.stringify(version),
        );
      }

      // Trigger RAG processing if needed
      if (newVersionNumber === 1 || this.hasSignificantChanges(changes)) {
        await this.triggerRAGProcessing(version);
      }

      this.emit("version:created", version);
      return version;
    } catch (error) {
      console.error("Failed to create version:", error);
      throw error;
    }
  }

  // Context7 Pattern: Version retrieval with caching
  async getVersion(versionId: string): Promise<DocumentVersion | null> {
    try {
      // Check cache first
      const cached = this.versionCache.get(versionId);
      if (cached) return cached;

      // Check Redis cache
      if (this.redis) {
        const redisData = await this.redis.get(`version:${versionId}`);
        if (redisData) {
          const version = JSON.parse(redisData as string);
          this.versionCache.set(versionId, version);
          return version;
        }
      }

      // Fetch from database
      const { data, error } = await this.supabase
        .from("document_versions")
        .select("*")
        .eq("id", versionId)
        .single();

      if (error) return null;

      const version: DocumentVersion = {
        id: data.id,
        documentId: data.document_id,
        version: data.version,
        title: data.title,
        content: data.content,
        contentHash: data.content_hash,
        changes: data.changes || [],
        metadata: data.metadata || {},
        createdAt: data.created_at,
        createdBy: data.created_by,
        size: data.size,
        tags: data.tags || [],
      };

      // Cache the result
      this.versionCache.set(versionId, version);

      return version;
    } catch (error) {
      console.error("Failed to get version:", error);
      return null;
    }
  }

  // Context7 Pattern: Version history with pagination
  async getVersionHistory(
    documentId: string,
    options: {
      limit?: number;
      offset?: number;
      branch?: string;
      fromVersion?: number;
      toVersion?: number;
    } = {},
  ): Promise<DocumentVersion[]> {
    try {
      let query = this.supabase
        .from("document_versions")
        .select("*")
        .eq("document_id", documentId)
        .order("version", { ascending: false });

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(
          options.offset,
          options.offset + (options.limit || 50) - 1,
        );
      }

      if (options.fromVersion) {
        query = query.gte("version", options.fromVersion);
      }

      if (options.toVersion) {
        query = query.lte("version", options.toVersion);
      }

      const { data, error } = await query;
      if (error) throw error;

      return (data || []).map((row) => ({
        id: row.id,
        documentId: row.document_id,
        version: row.version,
        title: row.title,
        content: row.content,
        contentHash: row.content_hash,
        changes: row.changes || [],
        metadata: row.metadata || {},
        createdAt: row.created_at,
        createdBy: row.created_by,
        size: row.size,
        tags: row.tags || [],
      }));
    } catch (error) {
      console.error("Failed to get version history:", error);
      return [];
    }
  }

  // Context7 Pattern: Version comparison with diff analysis
  async compareVersions(
    documentId: string,
    fromVersion: number,
    toVersion: number,
  ): Promise<VersionComparison> {
    try {
      const [fromVer, toVer] = await Promise.all([
        this.getVersionByNumber(documentId, fromVersion),
        this.getVersionByNumber(documentId, toVersion),
      ]);

      if (!fromVer || !toVer) {
        throw new Error("One or both versions not found");
      }

      const changes = this.calculateChanges(fromVer.content, toVer.content);
      const summary = this.summarizeChanges(changes);

      return {
        fromVersion,
        toVersion,
        changes,
        summary,
      };
    } catch (error) {
      console.error("Failed to compare versions:", error);
      throw error;
    }
  }

  // Context7 Pattern: Version rollback with conflict detection
  async rollbackToVersion(
    documentId: string,
    targetVersion: number,
    userId: string,
    reason?: string,
  ): Promise<DocumentVersion> {
    try {
      const targetVer = await this.getVersionByNumber(
        documentId,
        targetVersion,
      );
      if (!targetVer) {
        throw new Error("Target version not found");
      }

      const latestVersion = await this.getLatestVersion(documentId);
      if (!latestVersion) {
        throw new Error("No current version found");
      }

      // Create new version with content from target version
      const rolledBackVersion = await this.createVersion(
        documentId,
        `${targetVer.title} (Rollback)`,
        targetVer.content,
        {
          source: "manual",
          reason: reason || `Rollback to version ${targetVersion}`,
          parentVersion: latestVersion.version,
        },
        userId,
      );

      this.emit("rollback:executed", latestVersion.version, targetVersion);
      return rolledBackVersion;
    } catch (error) {
      console.error("Failed to rollback version:", error);
      throw error;
    }
  }

  // Context7 Pattern: Branch management
  async createBranch(
    documentId: string,
    branchName: string,
    fromVersion: number,
    userId: string,
  ): Promise<void> {
    try {
      const { error } = await this.supabase.from("document_branches").insert({
        document_id: documentId,
        branch_name: branchName,
        from_version: fromVersion,
        created_by: userId,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      this.emit("branch:created", branchName, fromVersion);
    } catch (error) {
      console.error("Failed to create branch:", error);
      throw error;
    }
  }

  // Context7 Pattern: Tag management
  async createTag(
    documentId: string,
    version: number,
    tagName: string,
    description?: string,
    userId?: string,
  ): Promise<void> {
    try {
      const { error } = await this.supabase.from("document_tags").insert({
        document_id: documentId,
        version,
        tag_name: tagName,
        description,
        created_by: userId,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      this.emit("tag:created", tagName, version);
    } catch (error) {
      console.error("Failed to create tag:", error);
      throw error;
    }
  }

  // Context7 Pattern: Version tree visualization
  async getVersionTree(documentId: string): Promise<VersionTree> {
    try {
      const [versions, branches, tags] = await Promise.all([
        this.getVersionHistory(documentId, { limit: 1000 }),
        this.getBranches(documentId),
        this.getTags(documentId),
      ]);

      const versionMap = new Map<
        number,
        {
          version: number;
          parentVersion?: number;
          branches: string[];
          merges: string[];
          isHead: boolean;
          timestamp: string;
        }
      >();

      // Build version tree structure
      versions.forEach((v) => {
        versionMap.set(v.version, {
          version: v.version,
          parentVersion: v.metadata.parentVersion,
          branches: [],
          merges: v.metadata.mergeFrom || [],
          isHead: false,
          timestamp: v.createdAt,
        });
      });

      // Mark head versions
      const latestVersion = Math.max(...versions.map((v) => v.version));
      const headVersion = versionMap.get(latestVersion);
      if (headVersion) {
        headVersion.isHead = true;
      }

      const branchMap = new Map<string, number[]>();
      branches.forEach((branch) => {
        branchMap.set(branch.name, branch.versions);
      });

      const tagMap = new Map<string, number>();
      tags.forEach((tag) => {
        tagMap.set(tag.name, tag.version);
      });

      return {
        documentId,
        versions: Array.from(versionMap.values()),
        branches: branchMap,
        tags: tagMap,
      };
    } catch (error) {
      console.error("Failed to get version tree:", error);
      throw error;
    }
  }

  // Context7 Pattern: Helper methods for internal operations
  private async getLatestVersion(
    documentId: string,
  ): Promise<DocumentVersion | null> {
    const history = await this.getVersionHistory(documentId, { limit: 1 });
    return history.length > 0 ? history[0] : null;
  }

  private async getVersionByNumber(
    documentId: string,
    version: number,
  ): Promise<DocumentVersion | null> {
    const { data, error } = await this.supabase
      .from("document_versions")
      .select("*")
      .eq("document_id", documentId)
      .eq("version", version)
      .single();

    if (error) return null;

    return {
      id: data.id,
      documentId: data.document_id,
      version: data.version,
      title: data.title,
      content: data.content,
      contentHash: data.content_hash,
      changes: data.changes || [],
      metadata: data.metadata || {},
      createdAt: data.created_at,
      createdBy: data.created_by,
      size: data.size,
      tags: data.tags || [],
    };
  }

  private async generateContentHash(content: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  private calculateChanges(
    oldContent: string,
    newContent: string,
  ): DocumentChange[] {
    const diffs = this.dmp.diff_main(oldContent, newContent);
    this.dmp.diff_cleanupSemantic(diffs);

    const changes: DocumentChange[] = [];
    let position = 0;

    diffs.forEach(([operation, text]) => {
      const contextStart = Math.max(0, position - 50);
      const contextEnd = Math.min(
        oldContent.length,
        position + text.length + 50,
      );
      const context = oldContent.slice(contextStart, contextEnd);

      switch (operation) {
        case 1: // Insert
          changes.push({
            type: "insert",
            position,
            length: text.length,
            newText: text,
            context,
          });
          break;
        case -1: // Delete
          changes.push({
            type: "delete",
            position,
            length: text.length,
            oldText: text,
            context,
          });
          position += text.length;
          break;
        case 0: // Equal
          position += text.length;
          break;
      }
    });

    return changes;
  }

  private summarizeChanges(changes: DocumentChange[]) {
    const insertions = changes.filter((c) => c.type === "insert").length;
    const deletions = changes.filter((c) => c.type === "delete").length;
    const modifications = changes.filter((c) => c.type === "replace").length;

    const totalChanges = insertions + deletions + modifications;
    const similarity = totalChanges > 0 ? 1 - totalChanges / 100 : 1; // Simplified calculation

    return {
      insertions,
      deletions,
      modifications,
      similarity: Math.max(0, Math.min(1, similarity)),
    };
  }

  private async analyzeContentQuality(
    content: string,
    changes: DocumentChange[],
  ): Promise<DocumentVersionMetadata["quality"]> {
    const issues: string[] = [];
    const improvements: string[] = [];

    // Basic quality checks
    if (content.length < 100) {
      issues.push("Content is very short");
    }

    if (changes.length > 50) {
      issues.push("Many changes detected - review carefully");
    }

    const score = Math.max(0, Math.min(1, 1 - issues.length * 0.2));

    return { score, issues, improvements };
  }

  private hasSignificantChanges(changes: DocumentChange[]): boolean {
    const significantChangeCount = changes.filter(
      (c) => c.type !== "equal" && c.length > 10,
    ).length;

    return significantChangeCount > 5;
  }

  private async triggerRAGProcessing(version: DocumentVersion): Promise<void> {
    try {
      // Update RAG metadata to indicate processing started
      await this.supabase
        .from("document_versions")
        .update({
          metadata: {
            ...version.metadata,
            rag: {
              ...version.metadata.rag,
              embeddingUpdated: false,
              indexingComplete: false,
            },
          },
        })
        .eq("id", version.id);

      // Trigger RAG pipeline (would be integrated with your existing RAG system)
      // This is a placeholder for the actual implementation
      console.log(`Triggered RAG processing for version ${version.id}`);
    } catch (error) {
      console.error("Failed to trigger RAG processing:", error);
    }
  }

  private async getBranches(
    documentId: string,
  ): Promise<Array<{ name: string; versions: number[] }>> {
    const { data, error } = await this.supabase
      .from("document_branches")
      .select("*")
      .eq("document_id", documentId);

    if (error) return [];

    return data.map((branch) => ({
      name: branch.branch_name,
      versions: [branch.from_version], // Simplified - would need actual branch tracking
    }));
  }

  private async getTags(
    documentId: string,
  ): Promise<Array<{ name: string; version: number }>> {
    const { data, error } = await this.supabase
      .from("document_tags")
      .select("*")
      .eq("document_id", documentId);

    if (error) return [];

    return data.map((tag) => ({
      name: tag.tag_name,
      version: tag.version,
    }));
  }

  // Context7 Pattern: Resource cleanup
  cleanup(): void {
    this.versionCache.clear();
    this.removeAllListeners();
  }
}
