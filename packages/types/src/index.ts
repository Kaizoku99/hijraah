// Re-export all types
export * from "./chat";
export * from "./firestarter";
export * from "./supabase";

// Base types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  locale?: string;
  timezone?: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Common enums
export type Visibility = "private" | "public" | "shared";
export type Role = "system" | "user" | "assistant" | "tool";
export type VoteType = "up" | "down";
export type Status = "pending" | "processing" | "completed" | "failed";
