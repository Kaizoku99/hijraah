import { Context, Next } from "hono";

import { logger } from "./logger";
import { supabase } from "./supabase/client";
import { createServiceClient } from "./supabase/server-pages";

// Circuit breaker states
type State = "CLOSED" | "OPEN" | "HALF_OPEN";

// Error categories for more granular handling
type ErrorCategory = "TIMEOUT" | "NETWORK" | "SERVER" | "AUTH" | "UNKNOWN";

// Telemetry event types
interface TelemetryEvent extends Record<string, unknown> {
  timestamp: number;
  state: State;
  category?: ErrorCategory;
  error?: Error;
  duration?: number;
  attempts?: number;
}

// Configuration interface
interface CircuitBreakerOptions {
  maxFailures?: number;
  resetTimeout?: number;
  successThreshold?: number;
  baseRetryInterval?: number;
  maxRetryInterval?: number;
  maxRetries?: number;
  enableTelemetry?: boolean;
  telemetryCallback?: (event: TelemetryEvent) => void;
}

// Default configuration
const DEFAULT_OPTIONS: Required<CircuitBreakerOptions> = {
  maxFailures: 5,
  resetTimeout: 60000, // 1 minute
  successThreshold: 1,
  baseRetryInterval: 1000, // 1 second
  maxRetryInterval: 60000, // 1 minute
  maxRetries: 3,
  enableTelemetry: true,
  telemetryCallback: (event) => {
    logger.info("Circuit Breaker Telemetry:", event);
  },
};

// Error categorization
function categorizeError(error: Error): ErrorCategory {
  if (error.name === "TimeoutError" || error.message.includes("timeout")) {
    return "TIMEOUT";
  }
  if (error.name === "NetworkError" || error.message.includes("network")) {
    return "NETWORK";
  }
  if (error.name === "AuthError" || error.message.includes("auth")) {
    return "AUTH";
  }
  if (error.message.includes("server")) {
    return "SERVER";
  }
  return "UNKNOWN";
}

// Circuit breaker implementation
class CircuitBreaker<Args extends any[] = any[], R = any> {
  private state: State = "CLOSED";
  private failures = 0;
  private successes = 0;
  private lastFailureTime: number | null = null;
  private readonly options: Required<CircuitBreakerOptions>;
  private errorCounts: Record<ErrorCategory, number> = {
    TIMEOUT: 0,
    NETWORK: 0,
    SERVER: 0,
    AUTH: 0,
    UNKNOWN: 0,
  };

  constructor(options: CircuitBreakerOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  private emitTelemetry(
    event: Partial<TelemetryEvent> & Record<string, unknown>,
  ) {
    if (!this.options.enableTelemetry) return;

    const telemetryEvent: TelemetryEvent = {
      timestamp: Date.now(),
      state: this.state,
      ...event,
    };

    this.options.telemetryCallback(telemetryEvent);
  }

  private moveToState(newState: State, category?: ErrorCategory) {
    const oldState = this.state;
    this.state = newState;

    if (newState === "CLOSED") {
      this.failures = 0;
      this.successes = 0;
      this.errorCounts = {
        TIMEOUT: 0,
        NETWORK: 0,
        SERVER: 0,
        AUTH: 0,
        UNKNOWN: 0,
      };
    }

    this.emitTelemetry({
      state: newState,
      category,
    });

    logger.info(
      `Circuit breaker state changed from ${oldState} to ${newState}${
        category ? ` due to ${category}` : ""
      }`,
    );
  }

  private async executeWithRetry(
    action: (...args: Args) => Promise<R>,
    args: Args,
    attempt = 1,
  ): Promise<R> {
    try {
      const startTime = Date.now();
      const result = await action(...args);
      const duration = Date.now() - startTime;

      this.emitTelemetry({ duration });
      this.successes++;

      if (
        this.state === "HALF_OPEN" &&
        this.successes >= this.options.successThreshold
      ) {
        this.moveToState("CLOSED");
      }

      return result;
    } catch (error) {
      const category = categorizeError(error as Error);
      this.errorCounts[category]++;
      this.failures++;
      this.lastFailureTime = Date.now();

      this.emitTelemetry({
        category,
        error: error as Error,
        attempts: attempt,
      });

      // Check if we should trip the circuit
      if (this.failures >= this.options.maxFailures) {
        this.moveToState("OPEN", category);
        throw error;
      }

      // Calculate backoff delay
      const backoffDelay = Math.min(
        this.options.baseRetryInterval * Math.pow(2, attempt - 1),
        this.options.maxRetryInterval,
      );

      // Check if we should retry
      if (attempt < this.options.maxRetries) {
        logger.info(
          `Retrying after ${backoffDelay}ms (attempt ${attempt} of ${this.options.maxRetries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, backoffDelay));
        return this.executeWithRetry(action, args, attempt + 1);
      }

      throw error;
    }
  }

  async execute(
    action: (...args: Args) => Promise<R>,
    ...args: Args
  ): Promise<R> {
    if (this.state === "OPEN") {
      if (
        this.lastFailureTime &&
        Date.now() - this.lastFailureTime >= this.options.resetTimeout
      ) {
        this.moveToState("HALF_OPEN");
      } else {
        const error = new Error("Circuit breaker is OPEN");
        this.emitTelemetry({ error });
        throw error;
      }
    }

    return this.executeWithRetry(action, args);
  }

  // Public methods for monitoring
  getState(): State {
    return this.state;
  }

  getMetrics() {
    return {
      state: this.state,
      failures: this.failures,
      successes: this.successes,
      lastFailureTime: this.lastFailureTime,
      errorCounts: this.errorCounts,
    };
  }
}

// Circuit breaker instances map
const breakers = new Map<string, CircuitBreaker>();

// Wrapper function
export function withCircuitBreaker<Args extends any[], R>(
  key: string,
  fn: (...args: Args) => Promise<R>,
  options: CircuitBreakerOptions = {},
): (...args: Args) => Promise<R> {
  if (!breakers.has(key)) {
    breakers.set(key, new CircuitBreaker<Args, R>(options));
  }

  const breaker = breakers.get(key) as CircuitBreaker<Args, R>;
  return (...args: Args) => breaker.execute(fn, ...args);
}

// Hono middleware
export function circuitBreakerMiddleware(
  options: CircuitBreakerOptions = {},
): (c: Context, next: Next) => Promise<Response | undefined> {
  const breaker = new CircuitBreaker<[Next], void>(options);

  return async (c: Context, next: Next) => {
    try {
      await breaker.execute(async (next) => {
        await next();
      }, next);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Circuit breaker is OPEN"
      ) {
        c.status(503);
        c.header(
          "Retry-After",
          Math.ceil(options.resetTimeout! / 1000).toString(),
        );
        return c.json({
          error: "Service temporarily unavailable",
          metrics: breaker.getMetrics(),
        });
      }
      throw error;
    }
  };
}

// Supabase integration helper
export function withSupabaseCircuitBreaker<T>(
  key: string,
  fn: (client: ReturnType<typeof createServiceClient>) => Promise<T>,
  options: CircuitBreakerOptions = {},
): () => Promise<T> {
  return withCircuitBreaker(
    key,
    async () => {
      const client = createServiceClient();
      return fn(client);
    },
    options,
  );
}

// Remove the old getCircuitBreaker function since it's replaced by withCircuitBreaker
export { type CircuitBreakerOptions, type TelemetryEvent, type ErrorCategory };
