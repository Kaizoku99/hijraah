import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from "@opentelemetry/sdk-metrics";
import {
  trace,
  context,
  SpanKind,
  SpanStatusCode,
  metrics,
} from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

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

// Context7 - Provider Isolation: Tracer instances
let initialized = false;
let tracer: ReturnType<typeof trace.getTracer>;
let meter: ReturnType<typeof metrics.getMeter>;

/**
 * Initialize OpenTelemetry SDK with Context7 configuration
 * Context7 - Modularity: Centralized tracing setup
 */
export function initializeTracing(): void {
  if (initialized) return;

  const sdk = new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: tracingConfig.serviceName,
      [SemanticResourceAttributes.SERVICE_VERSION]:
        tracingConfig.serviceVersion,
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
        tracingConfig.environment,
    }),
    traceExporter: tracingConfig.enableConsoleExporter
      ? new ConsoleSpanExporter()
      : undefined,
    metricReader: tracingConfig.enableMetrics
      ? new PeriodicExportingMetricReader({
          exporter: new ConsoleMetricExporter(),
          exportIntervalMillis: 30000,
        })
      : undefined,
    instrumentations: [
      getNodeAutoInstrumentations({
        // Context7 - Provider Isolation: Selective instrumentation
        "@opentelemetry/instrumentation-fs": { enabled: false },
        "@opentelemetry/instrumentation-http": { enabled: true },
        "@opentelemetry/instrumentation-express": { enabled: true },
        "@opentelemetry/instrumentation-net": { enabled: false },
      }),
    ],
  });

  sdk.start();

  // Initialize tracer and meter instances
  tracer = trace.getTracer(
    tracingConfig.serviceName,
    tracingConfig.serviceVersion
  );
  meter = metrics.getMeter(
    tracingConfig.serviceName,
    tracingConfig.serviceVersion
  );

  initialized = true;
  console.log(`OpenTelemetry initialized for ${tracingConfig.serviceName}`);
}

/**
 * Get tracer instance
 * Context7 - Provider Isolation: Singleton tracer access
 */
export function getTracer() {
  if (!initialized) {
    initializeTracing();
  }
  return tracer;
}

/**
 * Get meter instance for metrics
 * Context7 - Observability: Metrics collection
 */
export function getMeter() {
  if (!initialized) {
    initializeTracing();
  }
  return meter;
}

// Context7 - Observability: Custom metrics
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
  kind?: SpanKind;
  attributes?: Record<string, string | number | boolean>;
  userId?: string;
  sessionId?: string;
  chatId?: string;
  isGuest?: boolean;
}

/**
 * Create a traced operation with Context7 compliance
 * Context7 - Tracing: Standardized span creation and context propagation
 */
export async function createTracedOperation<T>(
  options: SpanOptions,
  operation: (span: ReturnType<typeof tracer.startSpan>) => Promise<T>
): Promise<T> {
  const span = getTracer().startSpan(options.name, {
    kind: options.kind || SpanKind.INTERNAL,
    attributes: {
      "service.name": tracingConfig.serviceName,
      "service.version": tracingConfig.serviceVersion,
      environment: tracingConfig.environment,
      ...options.attributes,
      ...(options.userId && { "user.id": options.userId }),
      ...(options.sessionId && { "session.id": options.sessionId }),
      ...(options.chatId && { "chat.id": options.chatId }),
      ...(options.isGuest !== undefined && {
        "user.is_guest": options.isGuest,
      }),
    },
  });

  try {
    const result = await context.with(
      trace.setSpan(context.active(), span),
      async () => {
        return await operation(span);
      }
    );

    span.setStatus({ code: SpanStatusCode.OK });
    return result;
  } catch (error) {
    span.recordException(
      error instanceof Error ? error : new Error(String(error))
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
 * Context7 - Tracing: HTTP request tracing middleware
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

          // Add response attributes
          span.setAttributes({
            "http.status_code": response.status || 200,
            "http.response_size": response.headers?.get("content-length") || 0,
            "http.duration_ms": duration,
          });

          // Record metrics
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
      }
    );
  };
}

/**
 * Context7 - Tracing: Authentication tracing utilities
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
      }
    ),

  tracePermissionCheck: (
    permission: string,
    userId: string,
    allowed: boolean
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
      }
    ),
};

/**
 * Context7 - Tracing: Chat operation tracing utilities
 */
export const chatTracing = {
  traceChatCompletion: (
    chatId: string,
    userId: string,
    model: string,
    isGuest?: boolean
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
      }
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
    userId: string
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
      }
    ),
};

/**
 * Context7 - Tracing: Database operation tracing
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
      }
    ),
};

/**
 * Context7 - Observability: Correlation ID utilities
 */
export function generateCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
}

export function getCorrelationId(): string | undefined {
  const span = trace.getActiveSpan();
  return span?.spanContext().traceId;
}

/**
 * Context7 - Provider Isolation: External service tracing
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
      }
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
