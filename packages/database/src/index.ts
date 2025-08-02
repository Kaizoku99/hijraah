/**
 * Database package main exports
 */

// Export all schema definitions and types
export * from "./schema.js";

// Export client utilities
export * from "./client.js";

// Export types
export * from "./types.js";

// Package metadata
export const packageInfo = {
  name: "@hijraah/database",
  version: "0.1.0",
  description: "Database schemas and utilities for Hijraah",
} as const;