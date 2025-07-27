import { v4 as uuidv4 } from "uuid";

/**
 * Generates a unique ID (UUID v4)
 * @returns A random UUID v4 string
 */
export function generateId(): string {
  return uuidv4();
}

/**
 * Generates a human-readable ID with an optional prefix
 * Combines timestamp and random component for uniqueness
 *
 * @param prefix Optional prefix for the ID
 * @param length Length of the random component (default: 8)
 * @returns A human-readable ID string
 */
export function generateReadableId(
  prefix?: string,
  length: number = 8,
): string {
  const timestamp = Date.now().toString(36);
  const randomChars = Math.random()
    .toString(36)
    .substring(2, 2 + length);
  return prefix
    ? `${prefix}-${timestamp}-${randomChars}`
    : `${timestamp}-${randomChars}`;
}

/**
 * Generates a sequential ID with a specified prefix and padding
 *
 * @param prefix Prefix for the ID
 * @param counter The sequence number
 * @param padding Number of digits to pad to (default: 4)
 * @returns A sequential ID string
 */
export function generateSequentialId(
  prefix: string,
  counter: number,
  padding: number = 4,
): string {
  return `${prefix}-${counter.toString().padStart(padding, "0")}`;
}

/**
 * Generates a random string of specified length
 *
 * @param length Length of the random string (default: 10)
 * @returns A random alphanumeric string
 */
export function generateRandomString(length: number = 10): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
}

/**
 * Generates a numeric code of specified length
 *
 * @param length Length of the code (default: 6)
 * @returns A numeric code string
 */
export function generateCode(length: number = 6): string {
  const charset = "0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
}

/**
 * Converts a string to a URL-friendly slug
 *
 * @param input The string to convert
 * @returns A URL-friendly slug
 */
export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Trim whitespace from start and end
}

/**
 * Generates a hash code from a string
 *
 * @param input The string to hash
 * @returns A numeric hash code
 */
export function hashCode(input: string): number {
  let hash = 0;

  if (input.length === 0) return hash;

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}
