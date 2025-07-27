import { Context, Next } from "hono";
import { z } from "zod";

/**
 * Types of request data validation
 */
export type ValidationType = "body" | "query" | "params";

/**
 * Error response format
 */
export interface ValidationError {
  success: false;
  error: string;
  issues: z.ZodIssue[];
}

/**
 * Validate request data with a Zod schema
 */
export function validate<T extends z.ZodTypeAny>(
  schema: T,
  type: ValidationType = "body",
) {
  return async (c: Context, next: Next) => {
    try {
      let data: unknown;

      // Extract the data based on the validation type
      switch (type) {
        case "body":
          data = await c.req.json();
          break;
        case "query":
          data = c.req.query();
          break;
        case "params":
          data = c.req.param();
          break;
      }

      // Validate the data
      const result = schema.safeParse(data);

      if (!result.success) {
        // If validation fails, return error response
        return c.json(
          {
            success: false,
            error: "Validation error",
            issues: result.error.issues,
          } as ValidationError,
          400,
        );
      }

      // Store the validated data on the context
      c.set(`validated-${type}`, result.data);

      await next();
    } catch (error) {
      // Handle JSON parsing errors
      if (error instanceof Error && error.message.includes("JSON")) {
        // Create a proper ZodIssue with custom code
        const customIssue: z.ZodIssue = {
          code: z.ZodIssueCode.custom,
          path: [],
          message: "Request body is not valid JSON",
        };

        return c.json(
          {
            success: false,
            error: "Invalid JSON",
            issues: [customIssue],
          } as ValidationError,
          400,
        );
      }

      // Other errors
      return c.json(
        {
          success: false,
          error: "Internal Server Error",
          message: error instanceof Error ? error.message : "Unknown error",
        },
        500,
      );
    }
  };
}

/**
 * Get validated data from context
 */
export function getValidatedData<T>(
  c: Context,
  type: ValidationType = "body",
): T {
  return c.get(`validated-${type}`) as T;
}

/**
 * Helper to create a validator for a specific validation type
 */
export function createValidator<T extends z.ZodTypeAny>(
  schema: T,
  type: ValidationType = "body",
) {
  return {
    middleware: validate(schema, type),
    schema,
  };
}
