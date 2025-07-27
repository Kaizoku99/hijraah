import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config({ path: ".env" });

export default {
  // Database configuration
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",

  // Database credentials from environment
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  // Migration configuration (Context7 Best Practice)
  migrations: {
    table: "__drizzle_migrations",
    schema: "drizzle",
  },

  // Enhanced filters for better schema management
  schemaFilter: ["public", "auth"],
  tablesFilter: ["*"],
  extensionsFilters: ["uuid-ossp", "citext", "pg_trgm", "btree_gin"],

  // Development configuration
  verbose: process.env.NODE_ENV === "development",
  strict: true,

  // Introspection configuration
  introspect: {
    casing: "snake_case",
  },

  // Push configuration for development
  push: {
    // Only allow push in development
    strict: process.env.NODE_ENV === "production",
  },
} satisfies Config;
