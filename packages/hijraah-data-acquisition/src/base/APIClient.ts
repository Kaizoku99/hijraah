import { task } from "@trigger.dev/sdk";
import type {
  APIClient as IAPIClient,
  ApiConfig,
  ApiResponse,
  ApiRequest,
  HealthStatus,
  RateLimitStatus,
} from "../interfaces/index.js";
import { ApiConfigSchema } from "../types/index.js";
import pRetry from "p-retry";

/**
 * Base APIClient class implementing Context7 patterns
 * Provides foundation for API integrations with Trigger.dev support
 */
export abstract class BaseAPIClient implements IAPIClient {
  protected config: ApiConfig;
  protected rateLimitTracker: Map<string, { count: number; resetAt: Date }>;

  constructor(config: ApiConfig) {
    this.config = config;
    this.rateLimitTracker = new Map();
    this.validateConfig();
  }

  /**
   * Validate API configuration
   */
  private validateConfig(): void {
    try {
      ApiConfigSchema.parse(this.config);
    } catch (error) {
      throw new Error(
        `Invalid API configuration: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Abstract method for making HTTP requests
   */
  protected abstract makeRequest<T = any>(
    method: string,
    endpoint: string,
    data?: any,
    params?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<ApiResponse<T>>;

  /**
   * Check and enforce rate limits
   */
  protected async checkRateLimit(endpoint: string): Promise<void> {
    if (!this.config.rateLimits) return;

    const key = `${this.config.baseUrl}${endpoint}`;
    const tracker = this.rateLimitTracker.get(key);
    const now = new Date();

    if (tracker) {
      if (
        now < tracker.resetAt &&
        tracker.count >= this.config.rateLimits.requestsPerMinute
      ) {
        const waitTime = tracker.resetAt.getTime() - now.getTime();
        console.warn(
          `Rate limit reached for ${endpoint}. Waiting ${waitTime}ms`,
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }

      if (now >= tracker.resetAt) {
        // Reset the counter
        this.rateLimitTracker.set(key, {
          count: 1,
          resetAt: new Date(now.getTime() + 60000), // Reset after 1 minute
        });
      } else {
        tracker.count++;
      }
    } else {
      this.rateLimitTracker.set(key, {
        count: 1,
        resetAt: new Date(now.getTime() + 60000),
      });
    }
  }

  /**
   * Make a GET request with retry logic
   */
  async get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<ApiResponse<T>> {
    await this.checkRateLimit(endpoint);

    return pRetry(
      async () => {
        return await this.makeRequest<T>("GET", endpoint, undefined, params);
      },
      {
        retries: this.config.retryAttempts,
        factor: 2,
        minTimeout: this.config.retryDelay,
        maxTimeout: this.config.retryDelay * 10,
        onFailedAttempt: (error) => {
          console.warn(
            `GET ${endpoint} attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`,
          );
        },
      },
    );
  }

  /**
   * Make a POST request with retry logic
   */
  async post<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    await this.checkRateLimit(endpoint);

    return pRetry(
      async () => {
        return await this.makeRequest<T>("POST", endpoint, data);
      },
      {
        retries: this.config.retryAttempts,
        factor: 2,
        minTimeout: this.config.retryDelay,
        maxTimeout: this.config.retryDelay * 10,
        onFailedAttempt: (error) => {
          console.warn(
            `POST ${endpoint} attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`,
          );
        },
      },
    );
  }

  /**
   * Make a PUT request with retry logic
   */
  async put<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    await this.checkRateLimit(endpoint);

    return pRetry(
      async () => {
        return await this.makeRequest<T>("PUT", endpoint, data);
      },
      {
        retries: this.config.retryAttempts,
        factor: 2,
        minTimeout: this.config.retryDelay,
        maxTimeout: this.config.retryDelay * 10,
        onFailedAttempt: (error) => {
          console.warn(
            `PUT ${endpoint} attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`,
          );
        },
      },
    );
  }

  /**
   * Make a DELETE request with retry logic
   */
  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    await this.checkRateLimit(endpoint);

    return pRetry(
      async () => {
        return await this.makeRequest<T>("DELETE", endpoint);
      },
      {
        retries: this.config.retryAttempts,
        factor: 2,
        minTimeout: this.config.retryDelay,
        maxTimeout: this.config.retryDelay * 10,
        onFailedAttempt: (error) => {
          console.warn(
            `DELETE ${endpoint} attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`,
          );
        },
      },
    );
  }

  /**
   * Make a batch of requests with concurrency control
   */
  async batchRequest(requests: ApiRequest[]): Promise<ApiResponse[]> {
    const results: ApiResponse[] = [];
    const concurrency = 5; // Limit concurrent requests

    for (let i = 0; i < requests.length; i += concurrency) {
      const batch = requests.slice(i, i + concurrency);

      const batchPromises = batch.map(async (request) => {
        try {
          switch (request.method) {
            case "GET":
              return await this.get(request.endpoint, request.params);
            case "POST":
              return await this.post(request.endpoint, request.data);
            case "PUT":
              return await this.put(request.endpoint, request.data);
            case "DELETE":
              return await this.delete(request.endpoint);
            default:
              throw new Error(`Unsupported HTTP method: ${request.method}`);
          }
        } catch (error) {
          // Return error response instead of throwing
          return {
            success: false,
            data: null,
            status: 0,
            headers: {},
            metadata: {
              requestId: `batch-${i}-error`,
              timestamp: new Date(),
              processingTime: 0,
            },
          } as ApiResponse;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Add small delay between batches to respect rate limits
      if (i + concurrency < requests.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return results;
  }

  /**
   * Get API health status
   */
  async healthCheck(): Promise<HealthStatus> {
    const startTime = Date.now();

    try {
      // Try to make a simple request to check API health
      const response = await this.get("/health");
      const responseTime = Date.now() - startTime;

      return {
        status: response.success ? "healthy" : "degraded",
        checks: [
          {
            name: "api_connectivity",
            status: response.success ? "pass" : "fail",
            message: response.success
              ? "API is accessible"
              : "API request failed",
            responseTime,
          },
        ],
        timestamp: new Date(),
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;

      return {
        status: "unhealthy",
        checks: [
          {
            name: "api_connectivity",
            status: "fail",
            message: error instanceof Error ? error.message : "Unknown error",
            responseTime,
          },
        ],
        timestamp: new Date(),
      };
    }
  }

  /**
   * Get rate limit status
   */
  async getRateLimitStatus(): Promise<RateLimitStatus> {
    const key = this.config.baseUrl;
    const tracker = this.rateLimitTracker.get(key);
    const rateLimits = this.config.rateLimits;

    if (!rateLimits || !tracker) {
      return {
        remaining: rateLimits?.requestsPerMinute || 1000,
        limit: rateLimits?.requestsPerMinute || 1000,
        resetAt: new Date(Date.now() + 60000),
      };
    }

    return {
      remaining: Math.max(0, rateLimits.requestsPerMinute - tracker.count),
      limit: rateLimits.requestsPerMinute,
      resetAt: tracker.resetAt,
      retryAfter:
        tracker.count >= rateLimits.requestsPerMinute
          ? Math.ceil((tracker.resetAt.getTime() - Date.now()) / 1000)
          : undefined,
    };
  }

  /**
   * Create a Trigger.dev v4 task for API requests
   */
  static createApiTask(taskId: string, client: BaseAPIClient) {
    return task({
      id: taskId,
      machine: "small-1x",
      maxDuration: 120, // 2 minutes
      retry: {
        maxAttempts: client.config.retryAttempts,
        factor: 2,
        minTimeoutInMs: client.config.retryDelay,
        maxTimeoutInMs: client.config.retryDelay * 10,
        randomize: true,
      },
      run: async (payload: ApiRequest, { ctx }) => {
        console.log(
          `🌐 Making ${payload.method} request to ${payload.endpoint}`,
        );

        let result: ApiResponse;

        switch (payload.method) {
          case "GET":
            result = await client.get(payload.endpoint, payload.params);
            break;
          case "POST":
            result = await client.post(payload.endpoint, payload.data);
            break;
          case "PUT":
            result = await client.put(payload.endpoint, payload.data);
            break;
          case "DELETE":
            result = await client.delete(payload.endpoint);
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${payload.method}`);
        }

        console.log(
          `✅ API request completed - Status: ${result.status}, Success: ${result.success}`,
        );
        return result;
      },
    });
  }

  /**
   * Create a Trigger.dev v4 task for batch API requests
   */
  static createBatchApiTask(taskId: string, client: BaseAPIClient) {
    return task({
      id: taskId,
      machine: "small-2x", // More resources for batch operations
      maxDuration: 600, // 10 minutes for batch operations
      retry: {
        maxAttempts: 2,
        factor: 1.5,
        minTimeoutInMs: 2000,
        maxTimeoutInMs: 20000,
        randomize: true,
      },
      run: async (payload: { requests: ApiRequest[] }, { ctx }) => {
        console.log(
          `🔄 Processing batch of ${payload.requests.length} API requests`,
        );

        const results = await client.batchRequest(payload.requests);

        const successCount = results.filter((r) => r.success).length;
        console.log(
          `✅ Batch API requests completed: ${successCount}/${results.length} successful`,
        );

        return results;
      },
    });
  }

  /**
   * Create a Trigger.dev v4 scheduled task for health monitoring
   */
  static createHealthMonitoringTask(taskId: string, client: BaseAPIClient) {
    return task({
      id: taskId,
      machine: "micro",
      maxDuration: 60, // 1 minute
      retry: {
        maxAttempts: 1,
        factor: 1,
        minTimeoutInMs: 1000,
        maxTimeoutInMs: 5000,
        randomize: false,
      },
      run: async (payload: {}, { ctx }) => {
        console.log(`🏥 Performing health check for API`);

        const health = await client.healthCheck();
        const rateLimitStatus = await client.getRateLimitStatus();

        console.log(`📊 Health check completed - Status: ${health.status}`);

        return {
          health,
          rateLimitStatus,
          checkedAt: new Date(),
        };
      },
    });
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...updates };
    this.validateConfig();
  }

  /**
   * Get current configuration
   */
  getConfig(): ApiConfig {
    return { ...this.config };
  }

  /**
   * Clear rate limit tracking
   */
  clearRateLimitTracking(): void {
    this.rateLimitTracker.clear();
  }
}
