/**
 * Database client configuration
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema.js";
import { DatabaseConfig } from "./types.js";

// Create database client
export function createDatabaseClient(config?: DatabaseConfig) {
  const connectionString =
    config?.connectionString ||
    process.env.DATABASE_URL ||
    process.env.SUPABASE_DB_URL ||
    "postgresql://localhost:5432/hijraah";

  const sql = postgres(connectionString, {
    ssl:
      config?.ssl || process.env.NODE_ENV === "production" ? "require" : false,
    max: 20,
  });

  return drizzle(sql, { schema });
}

// Default client instance
let _client: ReturnType<typeof createDatabaseClient> | null = null;

export function getDatabaseClient(config?: DatabaseConfig) {
  if (!_client) {
    _client = createDatabaseClient(config);
  }
  return _client;
}

// Client type for exports
export type DatabaseClient = ReturnType<typeof createDatabaseClient>;

// Export schema for convenience
export { schema };

// Default database instance for convenience
export const db = getDatabaseClient();
