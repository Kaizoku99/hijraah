import {
  Document,
  DocumentAccess,
  DocumentStatus,
  DocumentType,
  DocumentVersion,
} from "@/core/documents/entities/document";
import { DocumentService as DomainDocumentService } from "@/core/documents/entities/document-service";
import { RepositoryFactory } from "@/_infrastructure/repositories";
import { DocumentRepository } from "@/_infrastructure/repositories/document-repository";
import { StorageService } from "@/infrastructure/services/storage-service";
import { generateId } from "@/shared/utils/id-generator";

/**
 * Document application service - coordinates between domain and infrastructure layers
 */
export class DocumentApplicationService {
  private repository: DocumentRepository;
  private domainService: DomainDocumentService;
  private storageService: StorageService;

  constructor(
    repositoryFactory: RepositoryFactory,
    domainService: DomainDocumentService,
    storageService: StorageService,
  ) {
    this.repository = repositoryFactory.getDocumentRepository();
    this.domainService = domainService;
    this.storageService = storageService;
  }

  /**
   * Create a new document with file upload
   */
  async createDocument(
    data: {
      name: string;
      description?: string;
      type: DocumentType;
      ownerId: string;
      expiryDate?: Date;
      issuedBy?: string;
      issuedDate?: Date;
      documentNumber?: string;
      tags?: string[];
    },
    file?: {
      content: Buffer | Blob;
      filename: string;
      contentType: string;
      size: number;
    },
  ): Promise<Document> {
    // Validate document data
    const validation = this.domainService.validateDocument(data);
    if (!validation.isValid) {
      throw new Error(`Invalid document data: ${validation.errors.join(", ")}`);
    }

    // Create document entity
    const document = new Document({
      id: generateId(),
      name: data.name,
      description: data.description || null,
      type: data.type,
      status: DocumentStatus.PENDING,
      ownerId: data.ownerId,
      versions: [],
      access: {},
      caseIds: [],
      expiryDate: data.expiryDate,
      issuedBy: data.issuedBy,
      issuedDate: data.issuedDate,
      documentNumber: data.documentNumber,
      tags: data.tags || [],
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create document in database first
    await this.repository.create(document);

    // If file is provided, upload it
    if (file) {
      await this.uploadFile(document.id, file, data.ownerId);
    }

    return document;
  }

  /**
   * Upload a file to an existing document
   */
  async uploadFile(
    documentId: string,
    file: {
      content: Buffer | Blob;
      filename: string;
      contentType: string;
      size: number;
    },
    uploadedBy: string,
  ): Promise<DocumentVersion> {
    // Validate the file
    if (!this.domainService.isValidMimeType(file.contentType)) {
      throw new Error(
        "Invalid file type. Only documents, images, and PDFs are allowed.",
      );
    }

    if (!this.domainService.isValidFileSize(file.size)) {
      throw new Error("File size exceeds the maximum limit of 20MB.");
    }

    // Get the document
    const document = await this.getDocumentById(documentId);
    if (!document) {
      throw new Error(`Document with ID ${documentId} not found.`);
    }

    // Check if the user has permission to upload
    if (document.ownerId !== uploadedBy) {
      const hasAccess = await this.repository.userHasAccess(
        documentId,
        uploadedBy,
        "edit",
      );
      if (!hasAccess) {
        throw new Error(
          "You do not have permission to upload files to this document.",
        );
      }
    }

    // Generate storage path
    const filename = this.domainService.sanitizeFileName(file.filename);
    const storagePath = this.domainService.generateStoragePath(
      document.ownerId,
      document.type,
      filename,
    );

    // Calculate file hash for duplicate detection
    const contentHash = await this.domainService.calculateFileHash(
      file.content,
    );

    // Check for duplicates
    const duplicates = await this.repository.findByContentHash(contentHash);
    if (duplicates.length > 0) {
      // We don't prevent the upload, but we add metadata about duplicates
      document.metadata.hasDuplicates = true;
      document.metadata.duplicateDocuments = duplicates.map((d) => ({
        id: d.id,
        name: d.name,
      }));
    }

    // Upload file to storage
    const storageResult = await this.storageService.uploadFile({
      path: storagePath,
      content: file.content,
      contentType: file.contentType,
      metadata: {
        documentId,
        uploadedBy,
        originalName: file.filename,
        contentType: file.contentType,
        contentHash,
      },
    });

    // Extract metadata from the file
    const metadata = this.domainService.extractMetadata({
      originalName: file.filename,
      size: file.size,
      contentType: file.contentType,
      contentHash,
      storagePath,
      storageUrl: storageResult.url,
    });

    // Create a new version
    const version: DocumentVersion = {
      id: generateId(),
      documentId,
      storagePath,
      storageUrl: storageResult.url,
      uploadedBy,
      fileSize: file.size,
      fileType: file.contentType,
      originalFilename: file.filename,
      metadata,
      createdAt: new Date(),
    };

    // Add version to document
    document.addVersion(version);

    // Change document status to ACTIVE
    document.changeStatus(DocumentStatus.ACTIVE);

    // Create a timeline event for document upload
    const timelineEvent = this.domainService.createDocumentEvent(
      documentId,
      file.filename,
      uploadedBy,
    );

    // Add version to the repository
    await this.repository.addVersion(documentId, version);

    // Update document status
    await this.repository.update(document);

    return version;
  }

  /**
   * Get document by ID
   */
  async getDocumentById(documentId: string): Promise<Document | null> {
    try {
      const result = await this.repository.getWithDetails(documentId);
      if (!result) return null;

      const { document, versions, access } = result;

      // Convert to domain entity
      const domainDocument = this.repository.toDomainEntity(document);

      // Add versions and access from the detailed query
      if (versions) {
        versions.forEach((version) => {
          domainDocument.addVersion({
            id: version.id,
            documentId: version.document_id,
            storagePath: version.storage_path,
            storageUrl: version.storage_url,
            uploadedBy: version.uploaded_by,
            fileSize: version.file_size,
            fileType: version.file_type,
            originalFilename: version.original_filename,
            metadata: version.metadata || {},
            createdAt: new Date(version.created_at),
          });
        });
      }

      // Add access records
      if (access) {
        access.forEach((record) => {
          domainDocument.grantAccess({
            documentId: record.document_id,
            userId: record.user_id,
            permission: record.permission,
            grantedBy: record.granted_by,
            grantedAt: new Date(record.granted_at),
            expiresAt: record.expires_at
              ? new Date(record.expires_at)
              : undefined,
          });
        });
      }

      return domainDocument;
    } catch (error) {
      console.error("Error retrieving document:", error);
      return null;
    }
  }

  /**
   * Get all documents for a user
   */
  async getUserDocuments(
    userId: string,
    options?: {
      type?: DocumentType[];
      status?: DocumentStatus[];
      shared?: boolean;
      limit?: number;
      offset?: number;
      orderBy?: string;
      searchQuery?: string;
    },
  ): Promise<Document[]> {
    try {
      const records = await this.repository.getByUserId(userId, {
        type: options?.type?.map((t) => t.toString()),
        status: options?.status?.map((s) => s.toString()),
        shared: options?.shared,
        limit: options?.limit,
        offset: options?.offset,
        orderBy: options?.orderBy,
        searchQuery: options?.searchQuery,
      });

      return records.map((record) => this.repository.toDomainEntity(record));
    } catch (error) {
      console.error("Error retrieving user documents:", error);
      return [];
    }
  }

  /**
   * Update document details
   */
  async updateDocument(
    documentId: string,
    userId: string,
    updates: {
      name?: string;
      description?: string;
      expiryDate?: Date | null;
      issuedBy?: string | null;
      issuedDate?: Date | null;
      documentNumber?: string | null;
      tags?: string[];
      status?: DocumentStatus;
    },
  ): Promise<Document | null> {
    // Get the document
    const document = await this.getDocumentById(documentId);
    if (!document) {
      throw new Error(`Document with ID ${documentId} not found.`);
    }

    // Check permissions
    if (document.ownerId !== userId) {
      const hasAccess = await this.repository.userHasAccess(
        documentId,
        userId,
        "edit",
      );
      if (!hasAccess) {
        throw new Error("You do not have permission to update this document.");
      }
    }

    // Apply updates
    if (updates.name) document.name = updates.name;
    if (updates.description !== undefined)
      document.description = updates.description;
    if (updates.expiryDate !== undefined)
      document.expiryDate = updates.expiryDate;
    if (updates.issuedBy !== undefined) document.issuedBy = updates.issuedBy;
    if (updates.issuedDate !== undefined)
      document.issuedDate = updates.issuedDate;
    if (updates.documentNumber !== undefined)
      document.documentNumber = updates.documentNumber;
    if (updates.tags) document.tags = updates.tags;

    // Validate status transition if provided
    if (updates.status && updates.status !== document.status) {
      if (
        !this.domainService.isValidStatusTransition(
          document.status,
          updates.status,
        )
      ) {
        throw new Error(
          `Invalid status transition from ${document.status} to ${updates.status}`,
        );
      }
      document.changeStatus(updates.status);
    }

    // Update document
    await this.repository.update(document);
    return document;
  }

  /**
   * Grant access to a document
   */
  async grantAccess(
    documentId: string,
    granterId: string,
    access: {
      userId: string;
      permission: "view" | "edit" | "delete" | "admin";
      expiresAt?: Date;
    },
  ): Promise<void> {
    // Get the document
    const document = await this.getDocumentById(documentId);
    if (!document) {
      throw new Error(`Document with ID ${documentId} not found.`);
    }

    // Check if granter has permission to share
    if (document.ownerId !== granterId) {
      const hasAccess = await this.repository.userHasAccess(
        documentId,
        granterId,
        "admin",
      );
      if (!hasAccess) {
        throw new Error("You do not have permission to share this document.");
      }
    }

    // Check if document can be shared with user
    if (!this.domainService.canShareWith(document, access.userId)) {
      throw new Error(
        "This document cannot be shared with the specified user.",
      );
    }

    // Grant access in domain
    document.grantAccess({
      documentId,
      userId: access.userId,
      permission: access.permission,
      grantedBy: granterId,
      grantedAt: new Date(),
      expiresAt: access.expiresAt,
    });

    // Persist changes
    await this.repository.grantAccess(documentId, {
      userId: access.userId,
      permission: access.permission,
      grantedBy: granterId,
      grantedAt: new Date(),
      expiresAt: access.expiresAt,
    });
  }

  /**
   * Revoke access to a document
   */
  async revokeAccess(
    documentId: string,
    revokerId: string,
    userId: string,
  ): Promise<void> {
    // Get the document
    const document = await this.getDocumentById(documentId);
    if (!document) {
      throw new Error(`Document with ID ${documentId} not found.`);
    }

    // Check permissions
    if (document.ownerId !== revokerId) {
      const hasAccess = await this.repository.userHasAccess(
        documentId,
        revokerId,
        "admin",
      );
      if (!hasAccess) {
        throw new Error(
          "You do not have permission to revoke access to this document.",
        );
      }
    }

    // Revoke access in domain
    document.revokeAccess(userId);

    // Persist changes
    await this.repository.revokeAccess(documentId, userId);
  }

  /**
   * Check if document is expired
   */
  isExpired(document: Document): boolean {
    return this.domainService.isExpired(document);
  }

  /**
   * Check if document needs renewal
   */
  needsRenewal(document: Document, warningDays = 30): boolean {
    return this.domainService.needsRenewal(document, warningDays);
  }

  /**
   * Delete a document and all associated files
   */
  async deleteDocument(documentId: string, userId: string): Promise<boolean> {
    // Get the document
    const document = await this.getDocumentById(documentId);
    if (!document) {
      // Document doesn't exist, consider it "deleted"
      return true;
    }

    // Check permissions
    if (document.ownerId !== userId) {
      const hasAccess = await this.repository.userHasAccess(
        documentId,
        userId,
        "delete",
      );
      if (!hasAccess) {
        throw new Error("You do not have permission to delete this document.");
      }
    }

    // Delete all versions from storage
    for (const version of document.versions) {
      await this.storageService.deleteFile(version.storagePath);
    }

    // Delete document from database
    await this.repository.delete(documentId);

    return true;
  }

  /**
   * Link a document to a case
   */
  async addDocumentToCase(
    documentId: string,
    caseId: string,
    userId: string,
  ): Promise<void> {
    // Get the document
    const document = await this.getDocumentById(documentId);
    if (!document) {
      throw new Error(`Document with ID ${documentId} not found.`);
    }

    // Check permissions
    if (document.ownerId !== userId) {
      const hasAccess = await this.repository.userHasAccess(
        documentId,
        userId,
        "edit",
      );
      if (!hasAccess) {
        throw new Error(
          "You do not have permission to link this document to a case.",
        );
      }
    }

    // Add to case in domain
    document.addToCase(caseId);

    // Persist changes
    await this.repository.addToCase(documentId, caseId);
  }

  /**
   * Remove a document from a case
   */
  async removeDocumentFromCase(
    documentId: string,
    caseId: string,
    userId: string,
  ): Promise<void> {
    // Get the document
    const document = await this.getDocumentById(documentId);
    if (!document) {
      throw new Error(`Document with ID ${documentId} not found.`);
    }

    // Check permissions
    if (document.ownerId !== userId) {
      const hasAccess = await this.repository.userHasAccess(
        documentId,
        userId,
        "edit",
      );
      if (!hasAccess) {
        throw new Error(
          "You do not have permission to remove this document from a case.",
        );
      }
    }

    // Remove from case in domain
    document.removeFromCase(caseId);

    // Persist changes
    await this.repository.removeFromCase(documentId, caseId);
  }
}
