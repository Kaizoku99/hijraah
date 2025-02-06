// Common response types
export type ApiResponse<T = unknown> = {
  data?: T
  error?: {
    message: string
    status: number
  }
}

// User related types
export type User = {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateUserInput = Partial<CreateUserInput>

// Pagination types
export type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    hasMore: boolean
  }
}

// Error types
export type ApiError = {
  message: string
  status: number
  code?: string
} 