// TEMPORARY STUB: OpenTelemetry dependencies temporarily disabled for build completion
// TODO: Restore full OpenTelemetry functionality after migration cleanup

// Stub types and interfaces to maintain API compatibility
type MockSpan = {
  setAttributes: (attrs: any) => void;
  setStatus: (status: any) => void;
  recordException: (error: any) => void;
  end: () => void;
  spanContext: () => { traceId: string };
};

type MockTracer = {
  startSpan: (name: string, options?: any) => MockSpan;
};

type MockMeter = {
  createCounter: (
    name: string,
    options?: any,
  ) => { add: (value: number, attrs?: any) => void };
  createHistogram: (
    name: string,
    options?: any,
  ) => { record: (value: number, attrs?: any) => void };
};

// Stub SpanKind enum
export const SpanKind = {
  INTERNAL: 0,
  SERVER: 1,
  CLIENT: 2,
  PRODUCER: 3,
  CONSUMER: 4,
} as const;

export const SpanStatusCode = {
  OK: 1,
  ERROR: 2,
} as const;

// Context7 - Observability: Distributed tracing configuration
interface TracingConfig {
  serviceName: string;
  serviceVersion: string;
  environment: string;
  enableConsoleExporter: boolean;
  enableMetrics: boolean;
  sampleRate: number;
}

// Context7 - Data-as-Code: Environment-driven configuration
const tracingConfig: TracingConfig = {
  serviceName: process.env.OTEL_SERVICE_NAME || "hijraah-chat-api",
  serviceVersion: process.env.OTEL_SERVICE_VERSION || "1.0.0",
  environment: process.env.NODE_ENV || "development",
  enableConsoleExporter: process.env.OTEL_CONSOLE_EXPORTER === "true",
  enableMetrics: process.env.OTEL_METRICS_ENABLED !== "false",
  sampleRate: parseFloat(process.env.OTEL_SAMPLE_RATE || "1.0"),
};

// Mock implementations
let initialized = false;
let tracer: MockTracer;
let meter: MockMeter;

const createMockSpan = (): MockSpan => ({
  setAttributes: () => {},
  setStatus: () => {},
  recordException: () => {},
  end: () => {},
  spanContext: () => ({ traceId: `mock-trace-${Date.now()}` }),
});

const createMockTracer = (): MockTracer => ({
  startSpan: () => createMockSpan(),
});

const createMockMeter = (): MockMeter => ({
  createCounter: () => ({ add: () => {} }),
  createHistogram: () => ({ record: () => {} }),
});

/**
 * Initialize OpenTelemetry SDK with Context7 configuration (STUBBED)
 */
export function initializeTracing(): void {
  if (initialized) return;

  tracer = createMockTracer();
  meter = createMockMeter();
  initialized = true;

  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[STUB] OpenTelemetry tracing disabled for ${tracingConfig.serviceName}`,
    );
  }
}

/**
 * Get tracer instance (STUBBED)
 */
export function getTracer() {
  if (!initialized) {
    initializeTracing();
  }
  return tracer;
}

/**
 * Get meter instance for metrics (STUBBED)
 */
export function getMeter() {
  if (!initialized) {
    initializeTracing();
  }
  return meter;
}

// Context7 - Observability: Custom metrics (STUBBED)
export const chatMetrics = {
  requestCounter: getMeter().createCounter("chat_requests_total", {
    description: "Total number of chat API requests",
  }),
  requestDuration: getMeter().createHistogram("chat_request_duration_ms", {
    description: "Duration of chat API requests in milliseconds",
  }),
  tokenUsage: getMeter().createHistogram("chat_tokens_used", {
    description: "Number of tokens used in chat completions",
  }),
  authCounter: getMeter().createCounter("auth_attempts_total", {
    description: "Total number of authentication attempts",
  }),
  guestSessionCounter: getMeter().createCounter("guest_sessions_total", {
    description: "Total number of guest sessions created",
  }),
  errorCounter: getMeter().createCounter("errors_total", {
    description: "Total number of errors by type",
  }),
};

/**
 * Context7 - Tracing: Enhanced span creation with standardized attributes
 */
export interface SpanOptions {
  name: string;
  kind?: (typeof SpanKind)[keyof typeof SpanKind];
  attributes?: Record<string, string | number | boolean>;
  userId?: string;
  sessionId?: string;
  chatId?: string;
  isGuest?: boolean;
}

/**
 * Create a traced operation with Context7 compliance (STUBBED)
 */
export async function createTracedOperation<T>(
  options: SpanOptions,
  operation: (span: MockSpan) => Promise<T>,
): Promise<T> {
  const span = createMockSpan();

  try {
    const result = await operation(span);
    span.setStatus({ code: SpanStatusCode.OK });
    return result;
  } catch (error) {
    span.recordException(
      error instanceof Error ? error : new Error(String(error)),
    );
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  } finally {
    span.end();
  }
}

/**
 * Context7 - Tracing: HTTP request tracing middleware (STUBBED)
 */
export function createHttpTraceMiddleware() {
  return async (request: any, context: any, next: () => Promise<any>) => {
    const pathname = new URL(request.url).pathname;

    return createTracedOperation(
      {
        name: `HTTP ${request.method} ${pathname}`,
        kind: SpanKind.SERVER,
        attributes: {
          "http.method": request.method,
          "http.url": request.url,
          "http.route": pathname,
          "http.user_agent": request.headers.get("user-agent") || "",
          "http.client_ip":
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "",
        },
      },
      async (span) => {
        const startTime = Date.now();

        try {
          const response = await next();
          const duration = Date.now() - startTime;

          // Mock metrics recording
          chatMetrics.requestCounter.add(1, {
            method: request.method,
            route: pathname,
            status: String(response.status || 200),
          });

          chatMetrics.requestDuration.record(duration, {
            method: request.method,
            route: pathname,
          });

          return response;
        } catch (error) {
          chatMetrics.errorCounter.add(1, {
            error_type: error instanceof Error ? error.name : "unknown",
            route: pathname,
          });
          throw error;
        }
      },
    );
  };
}

/**
 * Context7 - Tracing: Authentication tracing utilities (STUBBED)
 */
export const authTracing = {
  traceAuthAttempt: (method: string, userId?: string, isGuest?: boolean) =>
    createTracedOperation(
      {
        name: `auth.${method}`,
        kind: SpanKind.INTERNAL,
        userId,
        isGuest,
        attributes: {
          "auth.method": method,
        },
      },
      async (span) => {
        chatMetrics.authCounter.add(1, {
          method,
          is_guest: String(isGuest || false),
        });

        if (isGuest) {
          chatMetrics.guestSessionCounter.add(1);
        }
      },
    ),

  tracePermissionCheck: (
    permission: string,
    userId: string,
    allowed: boolean,
  ) =>
    createTracedOperation(
      {
        name: "auth.permission_check",
        kind: SpanKind.INTERNAL,
        userId,
        attributes: {
          "auth.permission": permission,
          "auth.allowed": allowed,
        },
      },
      async (span) => {
        // Just for tracing, no additional logic needed
      },
    ),
};

/**
 * Context7 - Tracing: Chat operation tracing utilities (STUBBED)
 */
export const chatTracing = {
  traceChatCompletion: (
    chatId: string,
    userId: string,
    model: string,
    isGuest?: boolean,
  ) =>
    createTracedOperation(
      {
        name: "chat.completion",
        kind: SpanKind.INTERNAL,
        chatId,
        userId,
        isGuest,
        attributes: {
          "ai.model": model,
          "chat.operation": "completion",
        },
      },
      async (span) => {
        // Span setup for chat completion
      },
    ),

  traceTokenUsage: (tokens: number, model: string, operation: string) => {
    chatMetrics.tokenUsage.record(tokens, {
      model,
      operation,
    });
  },

  traceRAGRetrieval: (
    queryType: string,
    documentsFound: number,
    userId: string,
  ) =>
    createTracedOperation(
      {
        name: "rag.retrieval",
        kind: SpanKind.INTERNAL,
        userId,
        attributes: {
          "rag.query_type": queryType,
          "rag.documents_found": documentsFound,
        },
      },
      async (span) => {
        // RAG retrieval tracing
      },
    ),
};

/**
 * Context7 - Tracing: Database operation tracing (STUBBED)
 */
export const dbTracing = {
  traceQuery: (operation: string, table: string, userId?: string) =>
    createTracedOperation(
      {
        name: `db.${operation}`,
        kind: SpanKind.CLIENT,
        userId,
        attributes: {
          "db.operation": operation,
          "db.table": table,
          "db.system": "postgresql",
        },
      },
      async (span) => {
        // Database operation tracing
      },
    ),
};

/**
 * Context7 - Observability: Correlation ID utilities (STUBBED)
 */
export function generateCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
}

export function getCorrelationId(): string | undefined {
  return `mock-trace-${Date.now()}`;
}

/**
 * Context7 - Provider Isolation: External service tracing (STUBBED)
 */
export const externalTracing = {
  traceApiCall: (service: string, operation: string, url?: string) =>
    createTracedOperation(
      {
        name: `external.${service}.${operation}`,
        kind: SpanKind.CLIENT,
        attributes: {
          "external.service": service,
          "external.operation": operation,
          ...(url && { "external.url": url }),
        },
      },
      async (span) => {
        // External API call tracing
      },
    ),
};

// Context7 - Modular exports for clean dependency management
export const hijraahTracing = {
  initialize: initializeTracing,
  getTracer,
  getMeter,
  createTracedOperation,
  createHttpTraceMiddleware,
  authTracing,
  chatTracing,
  dbTracing,
  externalTracing,
  metrics: chatMetrics,
  generateCorrelationId,
  getCorrelationId,
  config: tracingConfig,
};

// Auto-initialize in production
if (process.env.NODE_ENV === "production" && !initialized) {
  initializeTracing();
}

export default hijraahTracing;
