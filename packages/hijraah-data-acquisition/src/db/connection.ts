/**
 * Database Connection Configuration
 * 
 * Drizzle ORM connection setup for Supabase PostgreSQL database
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Environment variables for database connection
const DATABASE_URL = process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL or SUPABASE_DATABASE_URL environment variable is required");
}

// Create postgres connection
const client = postgres(DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create Drizzle database instance
export const db = drizzle(client, { 
  schema,
  logger: process.env.NODE_ENV === "development"
});

// Export client for direct access if needed
export { client };

// Connection health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await client`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

// Graceful shutdown
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await client.end();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
}