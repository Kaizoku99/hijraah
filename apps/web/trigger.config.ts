import { defineConfig } from "@trigger.dev/sdk/v3";

export default defineConfig({
  project: process.env.TRIGGER_PROJECT_ID!,
  // Retry configuration
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
    },
  },
  // Directory where tasks are located
  dirs: ["./src/trigger"],
  // Runtime configuration
  runtime: "node",
  build: {
    external: [
      // Add any packages that should be externalized
      "@supabase/supabase-js",
    ],
  },
});
