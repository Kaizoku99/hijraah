/// <reference lib="deno.ns" />

import { randomBytes } from "node:crypto";

import { createClient } from "npm:@supabase/supabase-js@2.43.4";

import {
  ValidationResult,
  QueryAnalysis,
  ImmigrationUpdate,
  UserProfile,
  RateLimitResult,
  CacheOptions,
} from "./types";

// Initialize Supabase client
export const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? "",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: fetch,
    },
  },
);

// In-memory KV store for functions that don't have access to Deno.openKv
const kvStore = new Map<string, any>();
const memoryCache = new Map<string, { value: any; expiresAt?: number }>();

// Define types for queue management
interface QueueEntry {
  userId: string;
  priority: number;
  timestamp: number;
}

interface UserState {
  lastAccess: number;
  totalRequests: number;
}

// Cache utilities
export const cacheKey = (namespace: string, key: string): string => {
  return `${namespace}:${key}`;
};

export const getFromCache = async <T>(
  namespace: string,
  key: string,
  options: CacheOptions = {},
): Promise<T | null> => {
  const fullKey = cacheKey(namespace, key);
  const now = Date.now();

  // Check in-memory cache first (fastest)
  if (options.useMemory !== false) {
    const cachedItem = memoryCache.get(fullKey);
    if (cachedItem && (!cachedItem.expiresAt || cachedItem.expiresAt > now)) {
      return cachedItem.value as T;
    } else if (
      cachedItem &&
      cachedItem.expiresAt &&
      cachedItem.expiresAt <= now
    ) {
      // Clean up expired item
      memoryCache.delete(fullKey);
    }
  }

  // Then check database cache if enabled
  if (options.useDb !== false) {
    try {
      const { data } = await supabase.rpc("cache.get", {
        p_cache_key: namespace,
        p_data_key: key,
      });

      if (data) {
        // Update memory cache if enabled
        if (options.useMemory !== false) {
          const ttl = options.ttl || 60; // Default 60 seconds for memory cache
          memoryCache.set(fullKey, {
            value: data,
            expiresAt: ttl ? now + ttl * 1000 : undefined,
          });
        }

        return data as T;
      }
    } catch (error) {
      console.error("Database cache error:", error);
    }
  }

  // Check KV store
  if (options.useKv !== false) {
    const kvItem = kvStore.get(fullKey);
    if (kvItem && (!kvItem.expiresAt || kvItem.expiresAt > now)) {
      return kvItem.value as T;
    } else if (kvItem && kvItem.expiresAt && kvItem.expiresAt <= now) {
      // Clean up expired item
      kvStore.delete(fullKey);
    }
  }

  return null;
};

export const setInCache = async <T>(
  namespace: string,
  key: string,
  value: T,
  options: CacheOptions = {},
): Promise<void> => {
  const fullKey = cacheKey(namespace, key);
  const now = Date.now();
  const ttl = options.ttl;

  // Set in memory cache
  if (options.useMemory !== false) {
    memoryCache.set(fullKey, {
      value,
      expiresAt: ttl ? now + ttl * 1000 : undefined,
    });
  }

  // Set in database cache
  if (options.useDb !== false) {
    try {
      await supabase.rpc("cache.set", {
        p_cache_key: namespace,
        p_data_key: key,
        p_data_value: value,
        p_ttl_seconds: ttl,
      });
    } catch (error) {
      console.error("Database cache error:", error);
    }
  }

  // Set in KV store
  if (options.useKv !== false) {
    kvStore.set(fullKey, {
      value,
      expiresAt: ttl ? now + ttl * 1000 : undefined,
    });
  }
};

export const invalidateCache = async (
  namespace: string,
  key?: string,
  options: CacheOptions = {},
): Promise<void> => {
  // If key is provided, delete specific item
  if (key) {
    const fullKey = cacheKey(namespace, key);

    // Delete from memory cache
    if (options.useMemory !== false) {
      memoryCache.delete(fullKey);
    }

    // Delete from database cache
    if (options.useDb !== false) {
      try {
        await supabase.rpc("cache.delete", {
          p_cache_key: namespace,
          p_data_key: key,
        });
      } catch (error) {
        console.error("Database cache error:", error);
      }
    }

    // Delete from KV store
    if (options.useKv !== false) {
      kvStore.delete(fullKey);
    }
  } else {
    // Delete all items in namespace

    // Delete from memory cache
    if (options.useMemory !== false) {
      const keysToDelete = [];
      for (const cachedKey of memoryCache.keys()) {
        if (cachedKey.startsWith(`${namespace}:`)) {
          keysToDelete.push(cachedKey);
        }
      }
      for (const keyToDelete of keysToDelete) {
        memoryCache.delete(keyToDelete);
      }
    }

    // Delete from database cache
    if (options.useDb !== false) {
      try {
        await supabase.rpc("cache.delete", {
          p_cache_key: namespace,
          p_data_key: null,
        });
      } catch (error) {
        console.error("Database cache error:", error);
      }
    }

    // Delete from KV store
    if (options.useKv !== false) {
      const keysToDelete = [];
      for (const cachedKey of kvStore.keys()) {
        if (cachedKey.startsWith(`${namespace}:`)) {
          keysToDelete.push(cachedKey);
        }
      }
      for (const keyToDelete of keysToDelete) {
        kvStore.delete(keyToDelete);
      }
    }
  }
};

// Cache wrapper function for functions with expensive operations
export const cachedFunction = async <T, A extends any[]>(
  namespace: string,
  key: string,
  fn: (...args: A) => Promise<T>,
  args: A,
  options: CacheOptions = {},
): Promise<T> => {
  // Try to get from cache first
  const cachedResult = await getFromCache<T>(namespace, key, options);
  if (cachedResult !== null) {
    return cachedResult;
  }

  // Execute the function if not in cache
  const result = await fn(...args);

  // Store the result in cache
  await setInCache(namespace, key, result, options);

  return result;
};

// Observability utilities
export const logEvent = async (
  level: "debug" | "info" | "warn" | "error",
  message: string,
  component?: string,
  context?: Record<string, any>,
  traceId?: string,
  userId?: string,
  sessionId?: string,
  requestId?: string,
): Promise<void> => {
  try {
    await supabase.rpc("observability.log", {
      p_level: level,
      p_message: message,
      p_component: component,
      p_context: context ? JSON.stringify(context) : null,
      p_trace_id: traceId,
      p_user_id: userId,
      p_session_id: sessionId,
      p_request_id: requestId,
    });
  } catch (error) {
    console.error("Failed to log event:", error);
  }
};

export const recordMetric = async (
  name: string,
  value: number,
  labels?: Record<string, any>,
): Promise<void> => {
  try {
    await supabase.rpc("observability.record_metric", {
      p_name: name,
      p_value: value,
      p_labels: labels ? JSON.stringify(labels) : null,
    });
  } catch (error) {
    console.error("Failed to record metric:", error);
  }
};

export const recordPerformance = async (
  operation: string,
  durationMs: number,
  resourceType: string,
  resourceId?: string,
  userId?: string,
  sessionId?: string,
  requestId?: string,
  metadata?: Record<string, any>,
): Promise<void> => {
  try {
    await supabase.rpc("observability.record_performance", {
      p_operation: operation,
      p_duration_ms: durationMs,
      p_resource_type: resourceType,
      p_resource_id: resourceId,
      p_user_id: userId,
      p_session_id: sessionId,
      p_request_id: requestId,
      p_metadata: metadata ? JSON.stringify(metadata) : null,
    });
  } catch (error) {
    console.error("Failed to record performance:", error);
  }
};

// Performance tracking helper for timing function execution
export const measurePerformance = async <T>(
  operation: string,
  resourceType: string,
  fn: () => Promise<T>,
  metadata?: Record<string, any>,
  userId?: string,
): Promise<T> => {
  const startTime = performance.now();
  try {
    const result = await fn();
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    // Record performance asynchronously
    recordPerformance(
      operation,
      duration,
      resourceType,
      undefined,
      userId,
      undefined,
      undefined,
      metadata,
    ).catch(console.error);

    return result;
  } catch (error) {
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    // Record performance for failed operations too
    recordPerformance(
      `${operation}_error`,
      duration,
      resourceType,
      undefined,
      userId,
      undefined,
      undefined,
      {
        ...metadata,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    ).catch(console.error);

    throw error;
  }
};

// Enhanced Rate limiting utilities using database-backed rate limiting
export const getRateLimit = async (
  userId: string,
  resourceType: string,
): Promise<RateLimitResult> => {
  try {
    // Check rate limits in the database
    const { data, error } = await supabase.rpc(
      "rate_limiting.check_rate_limit",
      {
        p_user_id: userId,
        p_resource_type: resourceType,
      },
    );

    if (error) {
      console.error("Error checking rate limit:", error);
      // Allow the request if there's an error checking rate limits
      return {
        allowed: true,
        limit: "unknown",
        current: 0,
        maximum: 0,
        resetAfter: 0,
      };
    }

    // Record this request if allowed
    if (data[0].allowed) {
      await supabase.rpc("rate_limiting.record_request", {
        p_user_id: userId,
        p_resource_type: resourceType,
      });
    }

    return {
      allowed: data[0].allowed,
      limit: data[0].limit_name,
      current: data[0].current_usage,
      maximum: data[0].max_requests,
      resetAfter: data[0].reset_after_seconds,
    };
  } catch (error) {
    console.error("Unexpected error in rate limiting:", error);
    // Allow the request if there's an unexpected error
    return {
      allowed: true,
      limit: "error",
      current: 0,
      maximum: 0,
      resetAfter: 0,
    };
  }
};

// Queue management utilities
export const addToQueue = async (
  userId: string,
  priority: number = 1,
): Promise<number> => {
  const key = "request_queue";
  const queue = (kvStore.get(key) || []) as QueueEntry[];

  // Check if user is already in queue
  const userIndex = queue.findIndex(
    (entry: QueueEntry) => entry.userId === userId,
  );

  if (userIndex >= 0) {
    // User already in queue, return position
    return userIndex + 1;
  }

  // Add user to queue
  queue.push({
    userId,
    priority,
    timestamp: Date.now(),
  });

  // Sort queue by priority (higher first) then by timestamp (older first)
  queue.sort((a: QueueEntry, b: QueueEntry) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority; // Higher priority first
    }
    return a.timestamp - b.timestamp; // Older requests first
  });

  // Store updated queue
  kvStore.set(key, queue);

  // Return position in queue (0 means user is at the front of the queue)
  const newPosition = queue.findIndex(
    (entry: QueueEntry) => entry.userId === userId,
  );
  return newPosition;
};

// Enhanced document validation with metadata extraction
export const validateDocument = (file: {
  fileType: string;
  fileSize: number;
  fileName: string;
}): ValidationResult => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
  const MAX_FILENAME_LENGTH = 255;
  const RESTRICTED_CHARS = /[<>:"/\\|?*]/g;
  const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];

  // Size validation
  if (file.fileSize > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    };
  }

  // Type validation
  if (!ALLOWED_TYPES.includes(file.fileType)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}`,
    };
  }

  // Filename validation
  if (file.fileName.length > MAX_FILENAME_LENGTH) {
    return {
      valid: false,
      error: "Filename is too long",
    };
  }

  if (RESTRICTED_CHARS.test(file.fileName)) {
    return {
      valid: false,
      error: "Filename contains invalid characters",
    };
  }

  const extension = "." + file.fileName.split(".").pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Invalid file extension. Allowed extensions: ${ALLOWED_EXTENSIONS.join(", ")}`,
    };
  }

  return { valid: true };
};

// Enhanced query analysis with NLP-like patterns
export const analyzeQuery = (query: string): QueryAnalysis => {
  const lowerQuery = query.toLowerCase();

  // Legal expertise patterns
  const legalPatterns = [
    "legal",
    "law",
    "regulation",
    "compliance",
    "statute",
    "visa",
    "permit",
    "immigration",
    "policy",
    "requirement",
  ];

  // Document patterns
  const documentPatterns = [
    "document",
    "file",
    "form",
    "certificate",
    "passport",
    "id",
    "identification",
    "proof",
    "evidence",
    "upload",
  ];

  // Complexity indicators
  const complexityIndicators = {
    high: ["compare", "difference", "eligibility", "requirements", "process"],
    medium: ["how", "what", "when", "where", "which"],
    low: ["is", "can", "will", "do", "does"],
  };

  // Calculate scores
  const legalScore = legalPatterns.reduce(
    (score, pattern) => score + (lowerQuery.includes(pattern) ? 1 : 0),
    0,
  );

  const documentScore = documentPatterns.reduce(
    (score, pattern) => score + (lowerQuery.includes(pattern) ? 1 : 0),
    0,
  );

  const complexityScore = {
    high: complexityIndicators.high.reduce(
      (score, word) => score + (lowerQuery.includes(word) ? 2 : 0),
      0,
    ),
    medium: complexityIndicators.medium.reduce(
      (score, word) => score + (lowerQuery.includes(word) ? 1 : 0),
      0,
    ),
    low: complexityIndicators.low.reduce(
      (score, word) => score + (lowerQuery.includes(word) ? 0.5 : 0),
      0,
    ),
  };

  // Determine complexity level
  let complexity: "low" | "medium" | "high" = "low";
  const totalComplexity =
    complexityScore.high + complexityScore.medium + complexityScore.low;

  if (totalComplexity >= 4) {
    complexity = "high";
  } else if (totalComplexity >= 2) {
    complexity = "medium";
  }

  return {
    requiresLegalExpertise: legalScore >= 2,
    isDocumentRelated: documentScore >= 2,
    complexity,
  };
};

// For webhook signature validation
export const validateWebhookSignature = async (
  req: Request,
): Promise<boolean> => {
  const signature = req.headers.get("x-webhook-signature");
  const secret = Deno.env.get("WEBHOOK_SECRET");
  const timestamp = req.headers.get("x-webhook-timestamp");

  if (!signature || !secret || !timestamp) {
    return false;
  }

  // Check timestamp freshness (within 5 minutes)
  const timestampMs = parseInt(timestamp);
  if (isNaN(timestampMs) || Date.now() - timestampMs > 300000) {
    return false;
  }

  // Timing-safe string comparison
  const compare = (a: string, b: string): boolean => {
    if (a.length !== b.length) return false;
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  };

  // Generate expected signature
  const payload = req.headers.get("content-type")?.includes("application/json")
    ? JSON.stringify(req.body)
    : "";

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(payload + timestamp + secret),
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const expectedSignature = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return compare(signature, expectedSignature);
};

// Enhanced immigration update processing with validation and enrichment
export const processImmigrationUpdate = (
  update: ImmigrationUpdate,
): ImmigrationUpdate => {
  // Normalize and validate visa types
  const normalizedVisaTypes = update.affectedVisaTypes.map((type) => {
    const normalized = type.toUpperCase().trim();
    if (!/^[A-Z0-9\-]+$/.test(normalized)) {
      throw new Error(`Invalid visa type format: ${type}`);
    }
    return normalized;
  });

  // Validate and format dates
  const effectiveDate = update.effectiveDate
    ? new Date(update.effectiveDate)
    : new Date();

  if (isNaN(effectiveDate.getTime())) {
    throw new Error("Invalid effective date");
  }

  // Validate country code
  const countryCode = update.country.toUpperCase().trim();
  if (!/^[A-Z]{2,3}$/.test(countryCode)) {
    throw new Error("Invalid country code format");
  }

  // Enrich update with additional metadata
  return {
    ...update,
    id: update.id || crypto.randomUUID(),
    type: update.type.toLowerCase(),
    content: update.content.trim(),
    affectedVisaTypes: normalizedVisaTypes,
    effectiveDate: effectiveDate.toISOString(),
    country: countryCode,
  };
};

// Enhanced affected users search with advanced filtering
export const findAffectedUsers = async (
  update: ImmigrationUpdate,
): Promise<UserProfile[]> => {
  // Query users with current or intended visa types
  const { data: directlyAffected } = await supabase
    .from("profiles")
    .select("*")
    .or(
      `currentVisaType.in.(${update.affectedVisaTypes.join(",")}),` +
        `intendedVisaType.in.(${update.affectedVisaTypes.join(",")})`,
    )
    .eq("country", update.country);

  // Query users in related visa categories
  const relatedVisaTypes = update.affectedVisaTypes.flatMap((type) => {
    const [category] = type.split("-");
    return [`${category}-A`, `${category}-B`, `${category}-C`];
  });

  const { data: indirectlyAffected } = await supabase
    .from("profiles")
    .select("*")
    .or(
      `currentVisaType.in.(${relatedVisaTypes.join(",")}),` +
        `intendedVisaType.in.(${relatedVisaTypes.join(",")})`,
    )
    .eq("country", update.country);

  // Combine and deduplicate results
  const allAffected = [
    ...(directlyAffected || []),
    ...(indirectlyAffected || []),
  ];
  const uniqueUsers = Array.from(
    new Map(allAffected.map((user) => [user.id, user])).values(),
  );

  return uniqueUsers as UserProfile[];
};

// Enhanced user notification with prioritization and batching
export const notifyUsers = async (
  users: UserProfile[],
  update: ImmigrationUpdate,
): Promise<boolean> => {
  // Prioritize users based on visa type match
  const prioritizedUsers = users.sort((a, b) => {
    const aDirectMatch = update.affectedVisaTypes.includes(
      a.currentVisaType || "",
    );
    const bDirectMatch = update.affectedVisaTypes.includes(
      b.currentVisaType || "",
    );
    return (bDirectMatch ? 1 : 0) - (aDirectMatch ? 1 : 0);
  });

  // Prepare notifications with personalized content
  const notifications = prioritizedUsers.map((user) => {
    const isDirectlyAffected = update.affectedVisaTypes.includes(
      user.currentVisaType || "",
    );
    const content = isDirectlyAffected
      ? `Important immigration update affecting your ${user.currentVisaType} visa: ${update.content}`
      : `Immigration update for visa types ${update.affectedVisaTypes.join(", ")}: ${update.content}`;

    return {
      user_id: user.id,
      type: "immigration_update",
      priority: isDirectlyAffected ? "high" : "medium",
      content,
      metadata: {
        update_id: update.id,
        affected_visa_types: update.affectedVisaTypes,
        effective_date: update.effectiveDate,
      },
      created_at: new Date().toISOString(),
      read: false,
    };
  });

  // Batch insert notifications
  const batchSize = 100;
  const batches = [];

  for (let i = 0; i < notifications.length; i += batchSize) {
    const batch = notifications.slice(i, i + batchSize);
    batches.push(supabase.from("notifications").insert(batch));
  }

  try {
    await Promise.all(batches);
    return true;
  } catch (error) {
    console.error("Failed to send notifications:", error);
    return false;
  }
};

// Secure random token generation
export const generateToken = (length: number = 32): string => {
  return randomBytes(length).toString("hex");
};

// For functions that relied on Deno.env.get
export const getEnvVariable = (key: string): string => {
  return Deno.env.get(key) || "";
};
