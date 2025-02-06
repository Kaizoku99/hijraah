import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import type { Context, Next } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import type { ApiError } from './types'
import { authMiddleware } from './middleware/auth'
import { rateLimitMiddleware } from './middleware/rate-limit'
import users from './routes/users'

// Create the main Hono app
const app = new Hono()

// Global middleware
app.use('*', logger())
app.use('*', cors())
app.use('*', prettyJSON())
app.use('*', rateLimitMiddleware)

// Error handling
app.onError((err: Error | ApiError, c: Context) => {
  console.error(`${err}`)
  const error = err instanceof Error 
    ? { message: err.message, status: 500 as ContentfulStatusCode }
    : { message: err.message || 'Internal Server Error', status: (err.status || 500) as ContentfulStatusCode }
  
  return c.json({ error }, error.status)
})

// Public routes
app.get('/api/health', (c: Context) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

// Protected routes
app.use('/api/users/*', authMiddleware)
app.route('/api/users', users)

// Export the handler
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)

// Export the app instance for use in other files
export default app 