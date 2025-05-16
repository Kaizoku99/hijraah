// This will be the single source of truth for API response structures, pagination, etc.

// Unified API types

// Common response structure, similar to src/app/api/types.ts
export interface ApiResponse<T = unknown> {
  success: boolean; // Standardized to 'success' boolean
  data?: T;
  error?: {
    message: string;
    status: number;
    code?: string; // Added optional error code
  };
}

// Pagination types from src/app/api/types.ts
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

// Generic API Error type from src/app/api/types.ts
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// It seems the old src/types/api.ts had more specific response types
// (e.g., SignInResponse, ResearchSessionResponse).
// If that content can be recovered, those should be merged here.
// For now, this file contains the essentials from src/app/api/types.ts

// Placeholder for User type if it becomes API specific,
// otherwise it should come from @/types/auth
// export type ApiUser = { id: string, name: string, ... };

export {}; // Ensures this is treated as a module if no other exports are present initially
