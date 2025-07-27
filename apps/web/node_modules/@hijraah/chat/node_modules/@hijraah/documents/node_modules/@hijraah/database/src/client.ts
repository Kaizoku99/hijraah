import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Environment variable setup
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create the connection
const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create the Drizzle database instance
export const db = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV === "development",
});

// Export types for use in applications
export type Database = typeof db;

// Export the client for manual queries if needed
export { client as pgClient };

// Export all schemas
export * from "./schema";
