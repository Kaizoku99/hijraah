import { snakeCase, camelCase } from "lodash";

/**
 * Converts an object's keys from camelCase to snake_case recursively
 * @param obj The object to convert
 * @returns The converted object with snake_case keys
 */
export function toSnakeCase<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v)) as any;
  }
  if (obj instanceof Date) {
    return obj as any;
  }
  if (typeof obj === "object" && obj !== null) {
    const result = Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: toSnakeCase(obj[key]),
      }),
      {} as T
    );
    return result;
  }
  return obj;
}

/**
 * Converts an object's keys from snake_case to camelCase recursively
 * @param obj The object to convert
 * @returns The converted object with camelCase keys
 */
export function toCamelCase<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v)) as any;
  }
  if (obj instanceof Date) {
    return obj as any;
  }
  if (typeof obj === "object" && obj !== null) {
    const result = Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: toCamelCase(obj[key]),
      }),
      {} as T
    );
    return result;
  }
  return obj;
}

/**
 * Type-safe conversion utilities for database <-> domain entity mapping
 */
export const CaseConverter = {
  toSnakeCase,
  toCamelCase,
} as const;
