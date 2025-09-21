import { defineConfig } from "@trigger.dev/sdk";

export default defineConfig({
  // Your project reference from the Trigger.dev dashboard
  project: process.env.TRIGGER_PROJECT_REF ?? "proj_roeroiktkaixenwgokvn",
  
  // Directories containing your tasks
  dirs: ["./apps/web/src/lib/triggers"],
  
  // Runtime environment - v4 supports "node", "node-22", or "bun"
  runtime: "node-22",
  
  // Log level for development
  logLevel: "info",
  
  // Maximum duration for tasks (in seconds)
  maxDuration: 3600, // 1 hour for RAG processing tasks
  
  // Retry configuration
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 30000,
      factor: 2,
      randomize: true,
    },
  },

  // Build configuration
  build: {
    autoDetectExternal: true,
    keepNames: true,
    minify: false,
    // External packages that shouldn't be bundled
    external: ["@supabase/supabase-js", "openai"],
  },

  // Global lifecycle hooks for monitoring
  onStart: async ({ payload, ctx }) => {
    console.log(`🚀 Task started: ${ctx.task.id}`, { runId: ctx.run.id });
  },
  onSuccess: async ({ payload, output, ctx }) => {
    console.log(`✅ Task succeeded: ${ctx.task.id}`, { 
      runId: ctx.run.id,
      taskId: ctx.task.id
    });
  },
  onFailure: async ({ payload, error, ctx }) => {
    console.error(`❌ Task failed: ${ctx.task.id}`, { 
      runId: ctx.run.id,
      error: error instanceof Error ? error.message : String(error)
    });
  },

  // Enable process keep alive for better performance
  processKeepAlive: {
    enabled: true,
    maxExecutionsPerProcess: 50,
    devMaxPoolSize: 25,
  },
});
