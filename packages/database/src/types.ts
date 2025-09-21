/**
 * Database type definitions and utilities
 */

// Re-export schema types
export * from './schema.js';

// Database connection configuration
export interface DatabaseConfig {
  url?: string;
  connectionString?: string;
  apiKey?: string;
  schema?: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  ssl?: boolean;
}

// Query result types
export interface QueryResult<T = unknown> {
  data: T[];
  count?: number;
  error?: string;
}

// Database operation types
export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  where?: Record<string, unknown>;
}

export interface CreateOptions {
  returning?: boolean;
}

export interface UpdateOptions extends CreateOptions {
  where: Record<string, unknown>;
}

export interface DeleteOptions {
  where: Record<string, unknown>;
  returning?: boolean;
}

// Common database error types
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class NotFoundError extends DatabaseError {
  constructor(resource: string, id?: string | number) {
    const message = id 
      ? `${resource} with id ${id} not found`
      : `${resource} not found`;
    super(message, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends DatabaseError {
  constructor(
    message: string,
    public field?: string,
    public value?: unknown,
  ) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

// Utility types for working with database results
export type DatabaseResult<T> = {
  data: T;
  error: null;
} | {
  data: null;
  error: DatabaseError;
};

export type PaginatedResult<T> = {
  data: T[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

// Add other database-related types here
export type DatabaseRecord = Record<string, unknown>;
