import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    client: "src/client.ts",
    schema: "src/schema.ts"
  },
  format: ["esm"],
  dts: {
    compilerOptions: {
      composite: false,
      incremental: false,
    },
  },
  clean: true,
  splitting: false,
  sourcemap: true,
  target: "es2022",
  minify: false,
  external: ["drizzle-orm", "postgres"],
});
