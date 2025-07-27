import { defineConfig } from "@trigger.dev/sdk/v3";

export default defineConfig({
  project: process.env.TRIGGER_PROJECT_REF ?? "proj_roeroiktkaixenwgokvn", // Using the project ref from the init output
  // Automatically discovers tasks in the specified directories relative to the config file.
  dirs: ["./apps/web/src/lib/triggers"], // Use 'dirs' instead of 'triggerDirectories' and point to the correct folder
  maxDuration: 60, // Add the required maxDuration field (in seconds)
  // Optional: Set the log level for the Trigger.dev SDK during development.
  // logLevel: "debug",
  // Optional: Define default options for all tasks, which can be overridden per task.
  // defaultTaskOptions: {
  //   retry: {
  //     enabled: true,
  //     maxAttempts: 3,
  //     factor: 2,
  //     minTimeoutInMs: 1000,
  //     maxTimeoutInMs: 30000,
  //     randomize: true,
  //   },
  // },
});
