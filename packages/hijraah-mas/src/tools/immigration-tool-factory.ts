import { tool } from 'ai'
import { z } from 'zod'
import { logToolExecution, logToolError } from '../utils'

/**
 * Factory function to create immigration-specific tools with consistent logging and error handling
 */
export const createImmigrationTool = (
  name: string, 
  description: string, 
  schema: z.ZodSchema, 
  execute: Function
) => {
  return tool({
    description: `${description} - Immigration context aware`,
    parameters: schema,
    execute: async (params) => {
      try {
        const result = await execute(params)
        
        // Log for audit trail
        await logToolExecution(name, params, result)
        
        return result
      } catch (error) {
        // Log error
        await logToolError(name, params, error as Error)
        
        // Re-throw to maintain error handling chain
        throw error
      }
    },
  })
}