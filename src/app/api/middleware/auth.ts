import type { Context, Next } from 'hono'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { getCookie } from 'hono/cookie'
import type { Session } from '@supabase/supabase-js'

declare module 'hono' {
  interface ContextVariableMap {
    session: Session
    user: Session['user']
  }
}

export async function authMiddleware(c: Context, next: Next) {
  try {
    // Get the auth cookie
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return getCookie(c, name)
          },
          set(name: string, value: string, options: CookieOptions) {
            c.cookie(name, value, options)
          },
          remove(name: string, options: CookieOptions) {
            c.cookie(name, '', { ...options, maxAge: 0 })
          },
        },
      }
    )

    // Get the session
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error || !session) {
      return c.json({
        error: {
          message: 'Unauthorized',
          status: 401
        }
      }, 401)
    }

    // Add the session to the context
    c.set('session', session)
    c.set('user', session.user)

    // Continue to the next middleware/route handler
    await next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return c.json({
      error: {
        message: 'Internal Server Error',
        status: 500
      }
    }, 500)
  }
} 