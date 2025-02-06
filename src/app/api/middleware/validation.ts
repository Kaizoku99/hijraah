import { Context, Next } from 'hono'
import { z } from 'zod'

export interface ValidationConfig {
  body?: z.ZodType
  query?: z.ZodType
  params?: z.ZodType
}

export function validateRequest(config: ValidationConfig) {
  return async (c: Context, next: Next) => {
    try {
      // Validate request body if schema provided
      if (config.body) {
        const body = await c.req.json()
        config.body.parse(body)
      }

      // Validate query parameters if schema provided
      if (config.query) {
        const query = Object.fromEntries(new URL(c.req.url).searchParams)
        config.query.parse(query)
      }

      // Validate URL parameters if schema provided
      if (config.params) {
        config.params.parse(c.req.param())
      }

      // Continue to next middleware if validation passes
      await next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({
          error: {
            message: 'Validation Error',
            details: error.errors,
            status: 400
          }
        }, 400)
      }
      throw error
    }
  }
} 