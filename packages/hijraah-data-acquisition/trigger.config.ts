import { defineConfig } from "@trigger.dev/sdk";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

export default defineConfig({
  // Project reference from environment
  project: process.env.TRIGGER_PROJECT_ID!,

  // Directories containing trigger tasks
  dirs: ["./src/trigger"],

  // Build configuration with external packages
  build: {
    // External packages that shouldn't be bundled
    external: ["firecrawl-mcp", "drizzle-orm", "@supabase/supabase-js", "ai"],
    // JSX configuration for any React components
    jsx: {
      automatic: true,
      factory: "React.createElement",
      fragment: "React.Fragment",
    },
    // Import conditions for better module resolution
    conditions: ["node"],
  },

  // Default machine configuration for resource-intensive tasks
  defaultMachine: "small-2x", // 1 vCPU, 1 GB RAM

  // Maximum task duration (10 minutes for data acquisition tasks)
  maxDuration: 600,

  // Log level for debugging
  logLevel: "info",

  // Default retry configuration
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },

  // Experimental features for performance optimization
  experimental_processKeepAlive: {
    enabled: true,
    maxExecutionsPerProcess: 20,
    devMaxPoolSize: 5,
  },

  // Telemetry configuration for monitoring
  telemetry: {
    // Export logs to external service if configured
    logExporters: process.env.AXIOM_API_TOKEN
      ? [
          new OTLPLogExporter({
            url: "https://api.axiom.co/v1/logs",
            headers: {
              Authorization: `Bearer ${process.env.AXIOM_API_TOKEN}`,
              "X-Axiom-Dataset":
                process.env.AXIOM_DATASET || "hijraah-data-acquisition",
            },
          }),
        ]
      : [],

    // Export traces to external service if configured
    exporters: process.env.AXIOM_API_TOKEN
      ? [
          new OTLPTraceExporter({
            url: "https://api.axiom.co/v1/traces",
            headers: {
              Authorization: `Bearer ${process.env.AXIOM_API_TOKEN}`,
              "X-Axiom-Dataset":
                process.env.AXIOM_DATASET || "hijraah-data-acquisition",
            },
          }),
        ]
      : [],
  },

  // Global lifecycle hooks
  onStart: async (payload, { ctx }) => {
    console.log(
      `🚀 [${ctx.task.id}] Task started at ${new Date().toISOString()}`,
    );
    console.log(
      `📊 [${ctx.task.id}] Run ID: ${ctx.run.id}, Attempt: ${ctx.attempt.number}`,
    );
  },

  onSuccess: async (payload, output, { ctx }) => {
    console.log(
      `✅ [${ctx.task.id}] Task completed successfully in ${ctx.run.durationMs}ms`,
    );
    console.log(
      `📈 [${ctx.task.id}] Output summary:`,
      typeof output === "object" && output !== null
        ? Object.keys(output)
        : typeof output,
    );
  },

  onFailure: async (payload, error, { ctx }) => {
    const err = error as Error;
    console.error(
      `❌ [${ctx.task.id}] Task failed after ${ctx.attempt.number} attempts:`,
      err.message,
    );
    console.error(`🔍 [${ctx.task.id}] Error stack:`, err.stack);
  },

  // Initialization function run before any task
  init: async (payload, { ctx }) => {
    // Global initialization logic
    console.log(`Initializing task environment for ${ctx.task.id}`);

    // Validate required environment variables
    const requiredEnvVars = [
      "SUPABASE_URL",
      "SUPABASE_SERVICE_ROLE_KEY",
      "FIRECRAWL_API_KEY",
      "OPENAI_API_KEY",
    ];

    const missingVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar],
    );
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(", ")}`,
      );
    }

    // Initialize global services
    const initData = {
      initialized: true,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      services: {
        supabase: !!process.env.SUPABASE_URL,
        firecrawl: !!process.env.FIRECRAWL_API_KEY,
        openai: !!process.env.OPENAI_API_KEY,
      },
    };

    console.log(`[${ctx.task.id}] Initialization complete:`, initData);
    return initData;
  },
});
