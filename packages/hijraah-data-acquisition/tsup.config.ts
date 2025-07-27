import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "trigger/index": "src/trigger/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  minify: false,
  external: [
    "@trigger.dev/sdk",
    "@supabase/supabase-js",
    "drizzle-orm",
    "ai",
    "firecrawl-py",
  ],
  esbuildOptions(options) {
    options.conditions = ["module"];
  },
});
