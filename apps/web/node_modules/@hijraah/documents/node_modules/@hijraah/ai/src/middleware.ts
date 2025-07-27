import { Redis } from "@upstash/redis";
import {
  type LanguageModelV1Middleware,
  type LanguageModelV1StreamPart,
  simulateReadableStream,
} from "ai";

// Cache middleware with Redis using Context7 patterns
export function cacheMiddleware(options?: {
  redis?: Redis;
  ttl?: number;
  prefix?: string;
}): LanguageModelV1Middleware {
  const redis =
    options?.redis ||
    (process.env.UPSTASH_REDIS_REST_URL
      ? new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL!,
          token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        })
      : null);

  const ttl = options?.ttl || 3600; // 1 hour default
  const prefix = options?.prefix || "hijraah:ai:cache";

  return {
    wrapGenerate: async ({ doGenerate, params }) => {
      if (!redis) return doGenerate();

      const cacheKey = `${prefix}:generate:${JSON.stringify(params)}`;

      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          console.log("Cache hit for generate request");
          return typeof cached === "string" ? JSON.parse(cached) : cached;
        }
      } catch (error) {
        console.warn("Cache read error:", error);
      }

      const result = await doGenerate();

      try {
        await redis.setex(cacheKey, ttl, JSON.stringify(result));
      } catch (error) {
        console.warn("Cache write error:", error);
      }

      return result;
    },

    wrapStream: async ({ doStream, params }) => {
      if (!redis) return doStream();

      const cacheKey = `${prefix}:stream:${JSON.stringify(params)}`;

      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          console.log("Cache hit for stream request");
          const chunks = Array.isArray(cached)
            ? cached
            : JSON.parse(cached as string);

          return {
            stream: simulateReadableStream({
              initialDelayInMs: 0,
              chunkDelayInMs: 10,
              chunks: chunks.map((chunk: any) => ({
                ...chunk,
                timestamp: chunk.timestamp
                  ? new Date(chunk.timestamp)
                  : undefined,
              })),
            }),
            rawCall: { rawPrompt: null, rawSettings: {} },
          };
        }
      } catch (error) {
        console.warn("Cache read error:", error);
      }

      const { stream, ...rest } = await doStream();
      const fullResponse: LanguageModelV1StreamPart[] = [];

      const transformStream = new TransformStream<
        LanguageModelV1StreamPart,
        LanguageModelV1StreamPart
      >({
        transform(chunk, controller) {
          fullResponse.push(chunk);
          controller.enqueue(chunk);
        },
        flush() {
          try {
            redis.setex(cacheKey, ttl, JSON.stringify(fullResponse));
          } catch (error) {
            console.warn("Cache write error:", error);
          }
        },
      });

      return {
        stream: stream.pipeThrough(transformStream),
        ...rest,
      };
    },
  };
}

// Rate limiting middleware
export function rateLimitMiddleware(options: {
  redis?: Redis;
  requestsPerMinute: number;
  tokensPerMinute?: number;
  keyGenerator?: (params: any) => string;
}): LanguageModelV1Middleware {
  const redis =
    options.redis ||
    (process.env.UPSTASH_REDIS_REST_URL
      ? new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL!,
          token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        })
      : null);

  const generateKey =
    options.keyGenerator ||
    ((params: any) =>
      `hijraah:ai:ratelimit:${JSON.stringify(params).slice(0, 100)}`);

  const checkRateLimit = async (key: string, limit: number) => {
    if (!redis) return true; // Skip if no Redis

    try {
      const current = await redis.incr(key);
      if (current === 1) {
        await redis.expire(key, 60); // 1 minute window
      }
      return current <= limit;
    } catch (error) {
      console.warn("Rate limit check error:", error);
      return true; // Allow on error
    }
  };

  return {
    wrapGenerate: async ({ doGenerate, params }) => {
      const key = generateKey(params);
      const allowed = await checkRateLimit(key, options.requestsPerMinute);

      if (!allowed) {
        throw new Error("Rate limit exceeded");
      }

      return doGenerate();
    },

    wrapStream: async ({ doStream, params }) => {
      const key = generateKey(params);
      const allowed = await checkRateLimit(key, options.requestsPerMinute);

      if (!allowed) {
        throw new Error("Rate limit exceeded");
      }

      return doStream();
    },
  };
}

// Monitoring middleware for usage tracking
export function monitoringMiddleware(options?: {
  redis?: Redis;
  onUsage?: (usage: any) => void;
  prefix?: string;
}): LanguageModelV1Middleware {
  const redis =
    options?.redis ||
    (process.env.UPSTASH_REDIS_REST_URL
      ? new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL!,
          token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        })
      : null);

  const prefix = options?.prefix || "hijraah:ai:metrics";

  const logUsage = async (usage: any, type: "generate" | "stream") => {
    const timestamp = new Date().toISOString();
    const usageData = {
      ...usage,
      type,
      timestamp,
    };

    // Call custom usage handler
    options?.onUsage?.(usageData);

    // Store in Redis for analytics
    if (redis) {
      try {
        const day = timestamp.slice(0, 10); // YYYY-MM-DD
        const key = `${prefix}:${day}`;
        await redis.lpush(key, JSON.stringify(usageData));
        await redis.expire(key, 86400 * 30); // Keep for 30 days
      } catch (error) {
        console.warn("Usage logging error:", error);
      }
    }
  };

  return {
    wrapGenerate: async ({ doGenerate, params }) => {
      const startTime = Date.now();

      try {
        const result = await doGenerate();
        const endTime = Date.now();

        await logUsage(
          {
            ...result.usage,
            latency: endTime - startTime,
            model: params.model,
          },
          "generate"
        );

        return result;
      } catch (error) {
        const endTime = Date.now();

        await logUsage(
          {
            error: error.message,
            latency: endTime - startTime,
            model: params.model,
          },
          "generate"
        );

        throw error;
      }
    },

    wrapStream: async ({ doStream, params }) => {
      const startTime = Date.now();

      try {
        const { stream, ...rest } = await doStream();
        let usage: any = null;

        const transformStream = new TransformStream<
          LanguageModelV1StreamPart,
          LanguageModelV1StreamPart
        >({
          transform(chunk, controller) {
            if (chunk.type === "finish") {
              usage = chunk.usage;
            }
            controller.enqueue(chunk);
          },
          flush() {
            const endTime = Date.now();
            logUsage(
              {
                ...usage,
                latency: endTime - startTime,
                model: params.model,
              },
              "stream"
            );
          },
        });

        return {
          stream: stream.pipeThrough(transformStream),
          ...rest,
        };
      } catch (error) {
        const endTime = Date.now();

        await logUsage(
          {
            error: error.message,
            latency: endTime - startTime,
            model: params.model,
          },
          "stream"
        );

        throw error;
      }
    },
  };
}

// Error handling middleware with retry logic
export function errorHandlingMiddleware(options?: {
  maxRetries?: number;
  retryDelay?: number;
  retryableErrors?: string[];
}): LanguageModelV1Middleware {
  const maxRetries = options?.maxRetries || 3;
  const retryDelay = options?.retryDelay || 1000;
  const retryableErrors = options?.retryableErrors || [
    "rate_limit_exceeded",
    "timeout",
    "service_unavailable",
    "internal_server_error",
  ];

  const isRetryable = (error: any): boolean => {
    const errorMessage = error.message?.toLowerCase() || "";
    return retryableErrors.some((retryableError) =>
      errorMessage.includes(retryableError)
    );
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return {
    wrapGenerate: async ({ doGenerate, params }) => {
      let lastError: any;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          return await doGenerate();
        } catch (error) {
          lastError = error;

          if (attempt === maxRetries || !isRetryable(error)) {
            throw error;
          }

          console.warn(
            `Attempt ${attempt + 1} failed, retrying in ${retryDelay}ms:`,
            error.message
          );
          await delay(retryDelay * Math.pow(2, attempt)); // Exponential backoff
        }
      }

      throw lastError;
    },

    wrapStream: async ({ doStream, params }) => {
      let lastError: any;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          return await doStream();
        } catch (error) {
          lastError = error;

          if (attempt === maxRetries || !isRetryable(error)) {
            throw error;
          }

          console.warn(
            `Stream attempt ${attempt + 1} failed, retrying in ${retryDelay}ms:`,
            error.message
          );
          await delay(retryDelay * Math.pow(2, attempt));
        }
      }

      throw lastError;
    },
  };
}

// Combined middleware factory for common use cases
export function createStandardMiddleware(options?: {
  redis?: Redis;
  enableCaching?: boolean;
  enableRateLimit?: boolean;
  enableMonitoring?: boolean;
  enableErrorHandling?: boolean;
  rateLimitRequests?: number;
  cacheTTL?: number;
}) {
  const middlewares: LanguageModelV1Middleware[] = [];

  if (options?.enableErrorHandling !== false) {
    middlewares.push(errorHandlingMiddleware());
  }

  if (options?.enableRateLimit) {
    middlewares.push(
      rateLimitMiddleware({
        redis: options.redis,
        requestsPerMinute: options.rateLimitRequests || 100,
      })
    );
  }

  if (options?.enableCaching !== false) {
    middlewares.push(
      cacheMiddleware({
        redis: options.redis,
        ttl: options.cacheTTL,
      })
    );
  }

  if (options?.enableMonitoring !== false) {
    middlewares.push(
      monitoringMiddleware({
        redis: options.redis,
      })
    );
  }

  // Combine all middlewares
  return middlewares.reduce((combined, middleware) => ({
    wrapGenerate: async (args) => {
      return middleware.wrapGenerate
        ? middleware.wrapGenerate(args)
        : args.doGenerate();
    },
    wrapStream: async (args) => {
      return middleware.wrapStream
        ? middleware.wrapStream(args)
        : args.doStream();
    },
  }));
}
