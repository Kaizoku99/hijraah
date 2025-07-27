/**
 * Utility functions for the application
 */

import { generateId as generateIdFromAI } from "ai"; // Renaming import to avoid conflict
import { genSaltSync, hashSync } from "bcrypt-ts";
import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx conditionals
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique ID of a specified length
 * @param length - Length of the ID to generate (default is 16)
 * @returns Generated ID
 */
export function generateId(length: number = 16) {
  return customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )();
}

/**
 * Generates a UUID
 * @returns Generated UUID
 */
export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments where crypto.randomUUID is not available (e.g., older Node.js versions in certain contexts)
  // This is a simple v4 UUID implementation, not cryptographically secure for all uses but sufficient for unique IDs.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Formats a date into a readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Truncates a string to a specified length
 * @param str - The string to truncate
 * @param length - Max length
 * @returns Truncated string with ellipsis if needed
 */
export function truncate(str: string, length: number): string {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

// Function to convert bytes to a readable format (KB, MB, GB)
export function bytesToSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Application specific error structure for fetcher
 */
interface ApplicationError extends Error {
  info: string;
  status: number;
}

/**
 * Fetches data from a URL and handles errors.
 * @param url - The URL to fetch.
 * @returns The JSON response.
 * @throws ApplicationError if the fetch fails.
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as ApplicationError;
    // Attempt to parse error info, but don't fail if it's not JSON
    try {
      error.info = await res.json();
    } catch (e) {
      error.info = res.statusText; // Fallback to status text
    }
    error.status = res.status;
    throw error;
  }
  return res.json();
};

/**
 * Retrieves an item from localStorage.
 * @param key - The key of the item to retrieve.
 * @returns The parsed JSON object or an empty array if not found or in a non-browser environment.
 */
export function getLocalStorage(key: string): any[] | Record<string, any> {
  if (typeof window !== "undefined" && window.localStorage) {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : []; // Default to empty array if null, or parse
    } catch (error) {
      console.error(
        `Error parsing localStorage item with key "${key}":`,
        error
      );
      return []; // Return empty array on parsing error
    }
  }
  return []; // Return empty array if not in browser or localStorage not available
}

/**
 * Sanitizes text by removing specific placeholder strings.
 * Currently removes "<has_function_call>".
 * @param text - The input string to sanitize.
 * @returns The sanitized string.
 */
export function sanitizeText(text: string): string {
  if (typeof text !== "string") return "";
  return text.replace(/<has_function_call>/g, "");
}

/**
 * Sanitizes UI messages by cleaning their content.
 * Used to process messages before displaying them in the UI.
 * @param messages - Array of UI/Chat messages to sanitize
 * @returns The sanitized messages array
 */
export function sanitizeUIMessages<T extends { content: string }>(
  messages: T[]
): T[] {
  return messages.map((message) => ({
    ...message,
    content: sanitizeText(message.content),
  }));
}

export function generateHashedPassword(password: string): string {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  return hash;
}

export function generateDummyPassword(): string {
  const password = generateIdFromAI(12); // Using the renamed import
  const hashedPassword = generateHashedPassword(password);

  return hashedPassword;
}
