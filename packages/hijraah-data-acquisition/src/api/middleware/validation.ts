/**
 * Validation Middleware
 * 
 * Handles request and response validation using Zod schemas with AI SDK
 * structured validation and intelligent error reporting.
 */

import { z } from "zod";
import type { 
  ValidationMiddleware, 
  RequestContext, 
  ApiResponse 
} from "../types.js";

export class ValidationMiddlewareImpl implements ValidationMiddleware {
  name = "validation";
  priority = 80; // Runs after authentication and rate limiting

  constructor(
    private schemas: Map<string, {
      query?: z.ZodSchema;
      body?: z.ZodSchema;
      params?: z.ZodSchema;
      response?: z.ZodSchema;
    }>
  ) {}

  async execute(
    context: RequestContext, 
    next: () => Promise<ApiResponse>
  ): Promise<ApiResponse> {
    try {
      const endpoint = context.metadata.endpoint;
      const schema = this.schemas.get(endpoint);

      if (!schema) {
        // No validation schema defined, proceed
        return await next();
      }

      // Validate request
      const validationResult = await this.validateRequest(context.metadata, schema);
      if (!validationResult.success) {
        return this.createValidationErrorResponse(validationResult.errors, context);
      }

      // Update context with validated data
      context.metadata = {
        ...context.metadata,
        validated: validationResult.data,
      };

      // Execute the request
      const response = await next();

      // Validate response if schema is defined
      if (schema.response) {
        const responseValidation = await this.validateResponse(response, schema.response);
        if (!responseValidation.success) {
          console.error("Response validation failed:", responseValidation.errors);
          // Log but don't fail the request - this is a server-side issue
        }
      }

      return response;
    } catch (error) {
      console.error("Validation middleware error:", error);
      return this.createErrorResponse("VALIDATION_ERROR", "Validation failed", context);
    }
  }

  async validateRequest(
    request: any, 
    schema: {
      query?: z.ZodSchema;
      body?: z.ZodSchema;
      params?: z.ZodSchema;
    }
  ): Promise<{ success: true; data: any } | { success: false; errors: ValidationError[] }> {
    const errors: ValidationError[] = [];
    const validatedData: any = {};

    try {
      // Validate query parameters
      if (schema.query) {
        const queryResult = schema.query.safeParse(request.query || {});
        if (!queryResult.success) {
          errors.push(...this.formatZodErrors(queryResult.error, "query"));
        } else {
          validatedData.query = queryResult.data;
        }
      }

      // Validate request body
      if (schema.body) {
        const bodyResult = schema.body.safeParse(request.body || {});
        if (!bodyResult.success) {
          errors.push(...this.formatZodErrors(bodyResult.error, "body"));
        } else {
          validatedData.body = bodyResult.data;
        }
      }

      // Validate path parameters
      if (schema.params) {
        const paramsResult = schema.params.safeParse(request.params || {});
        if (!paramsResult.success) {
          errors.push(...this.formatZodErrors(paramsResult.error, "params"));
        } else {
          validatedData.params = paramsResult.data;
        }
      }

      if (errors.length > 0) {
        return { success: false, errors };
      }

      return { success: true, data: validatedData };
    } catch (error) {
      console.error("Request validation error:", error);
      return {
        success: false,
        errors: [{
          field: "unknown",
          location: "request",
          message: "Validation failed due to internal error",
          code: "VALIDATION_ERROR",
        }],
      };
    }
  }

  async validateResponse(
    response: any, 
    schema: z.ZodSchema
  ): Promise<{ success: true; data: any } | { success: false; errors: ValidationError[] }> {
    try {
      const result = schema.safeParse(response);
      
      if (!result.success) {
        return {
          success: false,
          errors: this.formatZodErrors(result.error, "response"),
        };
      }

      return { success: true, data: result.data };
    } catch (error) {
      console.error("Response validation error:", error);
      return {
        success: false,
        errors: [{
          field: "unknown",
          location: "response",
          message: "Response validation failed due to internal error",
          code: "VALIDATION_ERROR",
        }],
      };
    }
  }

  private formatZodErrors(error: z.ZodError, location: string): ValidationError[] {
    return error.errors.map(err => ({
      field: err.path.join("."),
      location,
      message: err.message,
      code: err.code,
      received: (err as any).received,
      expected: this.getExpectedType(err),
    }));
  }

  private getExpectedType(error: z.ZodIssue): string {
    switch (error.code) {
      case "invalid_type":
        return (error as z.ZodInvalidTypeIssue).expected;
      case "invalid_string":
        const stringError = error as z.ZodInvalidStringIssue;
        return `string (${stringError.validation})`;
      case "too_small":
        const smallError = error as z.ZodTooSmallIssue;
        return `${smallError.type} with minimum ${smallError.minimum}`;
      case "too_big":
        const bigError = error as z.ZodTooBigIssue;
        return `${bigError.type} with maximum ${bigError.maximum}`;
      case "invalid_enum_value":
        const enumError = error as z.ZodInvalidEnumValueIssue;
        return `one of: ${enumError.options.join(", ")}`;
      default:
        return "valid value";
    }
  }

  private createValidationErrorResponse(
    errors: ValidationError[], 
    context: RequestContext
  ): ApiResponse {
    return {
      success: false,
      error: "Validation failed",
      metadata: {
        timestamp: context.timestamp.toISOString(),
        requestId: context.requestId,
        version: "1.0.0",
        processingTime: Date.now() - context.timestamp.getTime(),
      },
      data: {
        error: {
          code: "VALIDATION_FAILED",
          message: "Request validation failed",
          details: errors,
          timestamp: context.timestamp.toISOString(),
          requestId: context.requestId,
        },
      },
    };
  }

  private createErrorResponse(
    code: string, 
    message: string, 
    context: RequestContext
  ): ApiResponse {
    return {
      success: false,
      error: message,
      metadata: {
        timestamp: context.timestamp.toISOString(),
        requestId: context.requestId,
        version: "1.0.0",
        processingTime: Date.now() - context.timestamp.getTime(),
      },
      data: {
        error: {
          code,
          message,
          timestamp: context.timestamp.toISOString(),
          requestId: context.requestId,
        },
      },
    };
  }
}

interface ValidationError {
  field: string;
  location: string;
  message: string;
  code: string;
  received?: any;
  expected?: string;
}

export function createValidationMiddleware(
  schemas: Map<string, {
    query?: z.ZodSchema;
    body?: z.ZodSchema;
    params?: z.ZodSchema;
    response?: z.ZodSchema;
  }>
): ValidationMiddleware {
  return new ValidationMiddlewareImpl(schemas);
}

// Common validation schemas
export const commonSchemas = {
  pagination: z.object({
    limit: z.coerce.number().min(1).max(100).default(20),
    offset: z.coerce.number().min(0).default(0),
  }),
  
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }).refine(data => new Date(data.from) <= new Date(data.to), {
    message: "From date must be before or equal to to date",
  }),
  
  uuid: z.string().uuid(),
  
  country: z.string().length(2).regex(/^[A-Z]{2}$/, "Must be a valid ISO 3166-1 alpha-2 country code"),
  
  url: z.string().url(),
  
  apiKey: z.string().min(32).max(128).regex(/^[a-zA-Z0-9_-]+$/, "Invalid API key format"),
};