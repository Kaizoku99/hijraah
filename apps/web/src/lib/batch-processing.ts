/**
 * Batch Processing Utilities
 *
 * Consolidates functions for batch document processing, integrating
 * document storage, caching, rate limiting, and progress tracking.
 */

// Re-export the necessary functions from other modules
export {
  storeDocument,
  getDocumentMetadata,
  updateDocumentStatus,
  getDocumentOCR,
  processBatch,
} from "./document/document-store";

// Import from the new centralized rate limiting system
import { RateLimitService } from "@/services/rate-limit-service";

// Re-export with deprecation warnings for backward compatibility
export const checkRateLimit = RateLimitService.isAllowed;
export const getUserTier = async (userId: string) => {
  console.warn(
    "getUserTier from batch-processing is deprecated. Use user service instead.",
  );
  return "standard" as const;
};

// Updated batch processing check using new service
export async function canProcessBatch(userId: string, documentCount: number) {
  const result = await RateLimitService.isAllowed(
    userId,
    "batchProcessing",
    "standard",
  );

  const maxBatchSizes = {
    standard: 10,
    premium: 50,
    enterprise: 200,
  };

  const maxBatchSize = maxBatchSizes.standard; // TODO: Get actual user tier

  return {
    allowed: result.success && documentCount <= maxBatchSize,
    maxBatchSize,
    tier: "standard" as const,
    reason: !result.success
      ? "Rate limit exceeded"
      : documentCount > maxBatchSize
        ? `Batch size exceeds limit (${maxBatchSize})`
        : undefined,
  };
}

// Additional batch processing utilities

/**
 * Process documents in parallel with concurrency control
 *
 * @param processingFn Function to process a single document
 * @param items Items to process
 * @param concurrency Maximum number of concurrent operations
 * @returns Results of processing all items
 */
export async function processInParallel<T, R>(
  processingFn: (item: T) => Promise<R>,
  items: T[],
  concurrency: number = 3,
): Promise<R[]> {
  const results: R[] = [];

  // Process in batches to respect concurrency limits
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchPromises = batch.map((item) => processingFn(item));
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  return results;
}

/**
 * Get batch processing status
 *
 * @param batchId Batch processing ID
 * @returns Batch processing status
 */
export async function getBatchStatus(batchId: string): Promise<{
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  total: number;
  completed: number;
  failed: number;
  documentIds: string[];
  results: Array<{
    documentId: string;
    status: string;
    progress: number;
    error?: string;
  }>;
}> {
  // This is a placeholder function
  // In a real implementation, this would fetch the batch status from a database
  return {
    id: batchId,
    status: "processing",
    progress: 50,
    total: 10,
    completed: 5,
    failed: 0,
    documentIds: [],
    results: [],
  };
}

/**
 * Check if a user is allowed to upload documents
 *
 * @param userId User ID
 * @param fileSize Size of the file in bytes
 * @returns Whether the upload is allowed and usage information
 */
export async function checkUploadQuota(
  userId: string,
  fileSize: number,
): Promise<{
  allowed: boolean;
  reason?: string;
  quota: {
    total: number;
    used: number;
    remaining: number;
  };
}> {
  try {
    // Get user tier
    const tier = await getUserTier(userId);

    // Define storage quota based on tier (in bytes)
    const quotas = {
      standard: 1024 * 1024 * 100, // 100 MB
      premium: 1024 * 1024 * 1024, // 1 GB
      enterprise: 1024 * 1024 * 1024 * 10, // 10 GB
    };

    // Calculate used storage (placeholder)
    // In a real implementation, this would query the database
    const usedStorage = 1024 * 1024 * 10; // 10 MB

    const totalQuota = quotas[tier];
    const remainingQuota = totalQuota - usedStorage;

    // Check if upload is allowed
    if (fileSize > remainingQuota) {
      return {
        allowed: false,
        reason: `File size (${formatFileSize(fileSize)}) exceeds remaining quota (${formatFileSize(remainingQuota)})`,
        quota: {
          total: totalQuota,
          used: usedStorage,
          remaining: remainingQuota,
        },
      };
    }

    return {
      allowed: true,
      quota: {
        total: totalQuota,
        used: usedStorage,
        remaining: remainingQuota,
      },
    };
  } catch (error) {
    console.error("Upload quota check error:", error);
    return {
      allowed: false,
      reason: "Error checking upload quota",
      quota: {
        total: 0,
        used: 0,
        remaining: 0,
      },
    };
  }
}

/**
 * Format file size for display
 *
 * @param bytes Size in bytes
 * @returns Formatted size string
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
