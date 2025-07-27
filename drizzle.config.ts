import type { Config } from "drizzle-kit";

export default {
  schema: "./supabase/schema.ts",
  out: "./supabase/migrations_drizzle_generated",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:54322/postgres",
  },
  verbose: true,
  strict: true,
} satisfies Config;
