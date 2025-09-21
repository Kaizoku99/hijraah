import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a UUID v4
 */
export function generateUUID(): string {
  return uuidv4();
}

/**
 * Generate a dummy password for testing/guest users
 */
export function generateDummyPassword(): string {
  return `dummy_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`
}

/**
 * Convert a byte count into a human-readable size string.
 * Examples: 0 -> "0 Bytes", 1024 -> "1 KB", 1048576 -> "1 MB"
 */
export function bytesToSize(bytes: number, fractionDigits = 2): string {
  if (!bytes) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB"] as const
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    sizes.length - 1
  )
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(Math.max(0, fractionDigits)))
  return `${value} ${sizes[i]}`
}

/**
 * Basic fetcher for SWR usage. Returns parsed JSON.
 */
export async function fetcher<T = any>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || `Request failed with ${res.status}`)
  }
  return res.json() as Promise<T>
}

/**
 * Sanitize UI messages by removing potentially problematic properties
 * This is a stub implementation - replace with actual message sanitization logic
 */
export function sanitizeUIMessages(messages: any[]): any[] {
  // Stub implementation - just return the messages as-is for now
  // In a real implementation, you might filter out sensitive data,
  // validate message structure, etc.
  return messages || []
}
