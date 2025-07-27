/**
 * Document Storage and Caching System
 *
 * Provides functions to store, retrieve, and cache document processing results
 * for improved performance and reduced API costs.
 */

import { createClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";

import {
  processMistralOCR,
  processMistralOCRWithFileUpload,
  processMistralOCRWithImage,
} from "@/lib/ai/mistral-ocr";
import {
  uploadFile,
  getFile,
  createPresignedUrl,
  deleteFile,
  getPublicUrl,
} from "@/lib/supabase/storage";

// Initialize Upstash Redis client for caching
const redis = Redis.fromEnv();

// Initialize Supabase client for database operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Cache TTL in seconds (default: 7 days)
const DEFAULT_CACHE_TTL = 7 * 24 * 60 * 60;

// Document storage bucket
const DOCUMENT_BUCKET = "documents";

/**
 * Document metadata interface
 */
export interface DocumentMetadata {
  id: string;
  filename: string;
  fileType: string;
  filePath: string;
  fileSize: number;
  processingStatus: "pending" | "processing" | "completed" | "failed";
  processingProgress?: number;
  processingError?: string;
  ocrStatus?: "pending" | "completed" | "failed";
  textExtractionStatus?: "pending" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  userId?: string;
  tags?: string[];
  customMetadata?: Record<string, any>;
}

/**
 * Store a document and its metadata
 *
 * @param file Document file buffer
 * @param filename Original filename
 * @param userId Optional user ID
 * @param tags Optional tags for categorization
 * @param customMetadata Optional custom metadata
 * @returns Document metadata
 */
export async function storeDocument(
  file: Buffer,
  filename: string,
  userId?: string,
  tags?: string[],
  customMetadata?: Record<string, any>,
): Promise<DocumentMetadata> {
  try {
    // Upload file to Supabase Storage
    const filePath = await uploadFile(file, filename, DOCUMENT_BUCKET);

    // Create document metadata
    const documentData: Omit<DocumentMetadata, "id"> = {
      filename,
      fileType: getFileType(filename),
      filePath,
      fileSize: file.length,
      processingStatus: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId,
      tags,
      customMetadata,
    };

    // Store metadata in Supabase database
    const { data, error } = await supabase
      .from("documents")
      .insert(documentData)
      .select()
      .single();

    if (error) {
      console.error("Error storing document metadata:", error);
      throw new Error(`Failed to store document metadata: ${error.message}`);
    }

    return data as DocumentMetadata;
  } catch (error) {
    console.error("Document storage error:", error);
    throw new Error(
      `Document storage failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Get document metadata by ID
 *
 * @param documentId Document ID
 * @returns Document metadata
 */
export async function getDocumentMetadata(
  documentId: string,
): Promise<DocumentMetadata> {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", documentId)
      .single();

    if (error) {
      console.error("Error retrieving document metadata:", error);
      throw new Error(`Failed to retrieve document metadata: ${error.message}`);
    }

    return data as DocumentMetadata;
  } catch (error) {
    console.error("Document metadata retrieval error:", error);
    throw new Error(
      `Document metadata retrieval failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Update document processing status
 *
 * @param documentId Document ID
 * @param status Processing status
 * @param progress Optional processing progress (0-100)
 * @param error Optional error message
 * @returns Updated document metadata
 */
export async function updateDocumentStatus(
  documentId: string,
  status: "pending" | "processing" | "completed" | "failed",
  progress?: number,
  error?: string,
): Promise<DocumentMetadata> {
  try {
    const updateData: Partial<DocumentMetadata> = {
      processingStatus: status,
      updatedAt: new Date().toISOString(),
    };

    if (progress !== undefined) {
      updateData.processingProgress = progress;
    }

    if (error) {
      updateData.processingError = error;
    }

    const { data, error: dbError } = await supabase
      .from("documents")
      .update(updateData)
      .eq("id", documentId)
      .select()
      .single();

    if (dbError) {
      console.error("Error updating document status:", dbError);
      throw new Error(`Failed to update document status: ${dbError.message}`);
    }

    return data as DocumentMetadata;
  } catch (error) {
    console.error("Document status update error:", error);
    throw new Error(
      `Document status update failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Get document by ID
 *
 * @param documentId Document ID
 * @returns Document buffer and metadata
 */
export async function getDocument(
  documentId: string,
): Promise<{ buffer: Buffer; metadata: DocumentMetadata }> {
  try {
    // Get document metadata
    const metadata = await getDocumentMetadata(documentId);

    // Get document file
    const buffer = await getFile(metadata.filePath, DOCUMENT_BUCKET);

    return { buffer, metadata };
  } catch (error) {
    console.error("Document retrieval error:", error);
    throw new Error(
      `Document retrieval failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Delete document by ID
 *
 * @param documentId Document ID
 * @returns Success status
 */
export async function deleteDocument(documentId: string): Promise<boolean> {
  try {
    // Get document metadata
    const metadata = await getDocumentMetadata(documentId);

    // Delete file from storage
    await deleteFile(metadata.filePath, DOCUMENT_BUCKET);

    // Delete metadata from database
    const { error } = await supabase
      .from("documents")
      .delete()
      .eq("id", documentId);

    if (error) {
      console.error("Error deleting document metadata:", error);
      throw new Error(`Failed to delete document metadata: ${error.message}`);
    }

    // Clear cache
    const cacheKeys = [
      `ocr:${documentId}`,
      `text:${documentId}`,
      `qa:${documentId}:*`,
    ];

    await Promise.all(
      cacheKeys.map((key) =>
        redis
          .del(key)
          .catch((err) =>
            console.error(`Error clearing cache for ${key}:`, err),
          ),
      ),
    );

    return true;
  } catch (error) {
    console.error("Document deletion error:", error);
    throw new Error(
      `Document deletion failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Get OCR results for a document
 *
 * @param documentId Document ID
 * @param forceRefresh Force refresh from API, ignoring cache
 * @param progressCallback Optional callback for progress updates
 * @returns OCR results
 */
export async function getDocumentOCR(
  documentId: string,
  forceRefresh: boolean = false,
  progressCallback?: (progress: number) => void,
): Promise<any> {
  try {
    const cacheKey = `ocr:${documentId}`;

    // Check cache if not forcing refresh
    if (!forceRefresh) {
      const cachedResult = await redis.get(cacheKey);
      if (cachedResult) {
        console.log(`Cache hit for OCR results: ${documentId}`);
        return cachedResult;
      }
    }

    // Get document metadata
    const metadata = await getDocumentMetadata(documentId);

    // Update status to processing
    await updateDocumentStatus(documentId, "processing", 10);

    // Report progress
    progressCallback?.(10);

    // Create a presigned URL for the document
    const presignedUrl = await createPresignedUrl(
      metadata.filePath,
      DOCUMENT_BUCKET,
    );

    // Report progress
    progressCallback?.(25);

    // Process with Mistral OCR
    const ocrResponse = await processMistralOCR(presignedUrl, {
      includeImageBase64: false,
    });

    // Report progress
    progressCallback?.(90);

    // Cache the result
    await redis.set(cacheKey, ocrResponse, { ex: DEFAULT_CACHE_TTL });

    // Update status to completed
    await updateDocumentStatus(documentId, "completed", 100);

    // Report progress
    progressCallback?.(100);

    return ocrResponse;
  } catch (error) {
    console.error("OCR processing error:", error);

    // Update status to failed
    await updateDocumentStatus(
      documentId,
      "failed",
      undefined,
      error instanceof Error ? error.message : "Unknown error",
    );

    throw new Error(
      `OCR processing failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Ask a question about a document
 *
 * @param documentId Document ID
 * @param question Question about the document
 * @param forceRefresh Force refresh from API, ignoring cache
 * @returns Answer to the question
 */
export async function askDocumentQuestion(
  documentId: string,
  question: string,
  forceRefresh: boolean = false,
): Promise<string> {
  try {
    const cacheKey = `qa:${documentId}:${hashString(question)}`;

    // Check cache if not forcing refresh
    if (!forceRefresh) {
      const cachedResult = await redis.get(cacheKey);
      if (cachedResult) {
        console.log(
          `Cache hit for QA results: ${documentId}, question: ${question}`,
        );
        return cachedResult as string;
      }
    }

    // Get document metadata
    const metadata = await getDocumentMetadata(documentId);

    // Create a presigned URL for the document
    const presignedUrl = await createPresignedUrl(
      metadata.filePath,
      DOCUMENT_BUCKET,
    );

    // Ask question about the document using Mistral AI
    const answer = await processMistralDocumentQA(presignedUrl, question);

    // Cache the result
    await redis.set(cacheKey, answer, { ex: DEFAULT_CACHE_TTL });

    return answer;
  } catch (error) {
    console.error("Document QA error:", error);
    throw new Error(
      `Document QA failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Process a document question using Mistral AI
 *
 * @param documentUrl Document URL
 * @param question Question about the document
 * @returns Answer to the question
 */
async function processMistralDocumentQA(
  documentUrl: string,
  question: string,
): Promise<string> {
  // This is a placeholder; implement the actual QA logic using Mistral AI
  return `This is a placeholder answer for the question: "${question}" about the document at ${documentUrl}`;
}

/**
 * Process a batch of documents
 *
 * @param documentIds Array of document IDs to process
 * @param options Batch processing options
 * @returns Array of processing results
 */
export async function processBatch(
  documentIds: string[],
  options: {
    concurrency?: number;
    progressCallback?: (documentId: string, progress: number) => void;
  } = {},
): Promise<
  Array<{ documentId: string; success: boolean; result?: any; error?: string }>
> {
  const concurrency = options.concurrency || 3; // Default to 3 concurrent operations
  const results: Array<{
    documentId: string;
    success: boolean;
    result?: any;
    error?: string;
  }> = [];

  // Process in batches to respect concurrency limits
  for (let i = 0; i < documentIds.length; i += concurrency) {
    const batch = documentIds.slice(i, i + concurrency);

    const batchPromises = batch.map(async (documentId) => {
      try {
        const result = await getDocumentOCR(documentId, false, (progress) =>
          options.progressCallback?.(documentId, progress),
        );

        return { documentId, success: true, result };
      } catch (error) {
        return {
          documentId,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  return results;
}

/**
 * Hash a string for cache keys
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36); // Convert to base36 for shorter strings
}

/**
 * Get file type from filename
 */
function getFileType(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return "pdf";
    case "png":
    case "jpg":
    case "jpeg":
    case "tiff":
    case "tif":
      return "image";
    case "doc":
    case "docx":
      return "word";
    case "xls":
    case "xlsx":
      return "excel";
    case "ppt":
    case "pptx":
      return "powerpoint";
    default:
      return "other";
  }
}
