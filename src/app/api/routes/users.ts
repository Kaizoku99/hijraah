import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createServerClient } from '@supabase/ssr'
import type { Context } from 'hono'
import type { ApiResponse, User, PaginatedResponse, CreateUserInput, UpdateUserInput } from '../types'
import { rateLimit } from '@/app/api/middleware/rate-limit'
import { z } from 'zod'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

// Create a router instance
const users = new Hono()

// Validation schemas
const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email()
})

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional()
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided"
})

const querySchema = z.object({
  page: z.string().optional().transform(val => parseInt(val || '1')),
  limit: z.string().optional().transform(val => parseInt(val || '10')),
  search: z.string().optional()
})

type ValidatedRequest = z.infer<typeof createUserSchema>
type ValidatedUpdateRequest = z.infer<typeof updateUserSchema>

// Helper to create Supabase client
const getSupabase = (c: Context) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return getCookie(c, name)
        },
        set(name: string, value: string, options: any) {
          setCookie(c, name, value, options)
        },
        remove(name: string, options: any) {
          deleteCookie(c, name, options)
        }
      }
    }
  )
}

// Error handler helper
const handleError = (error: any, defaultMessage: string): { message: string; status: ContentfulStatusCode } => {
  console.error(`Error: ${defaultMessage}:`, error)
  if (error?.code === 'PGRST116') {
    return { message: 'Resource not found', status: 404 }
  }
  if (error?.code === '23505') {
    return { message: 'Resource already exists', status: 409 }
  }
  return { message: defaultMessage, status: 500 }
}

// Routes
users.get('/', rateLimit(), async (c: Context) => {
  try {
    const { page, limit, search } = querySchema.parse(c.req.query())
    const offset = (page - 1) * limit

    const supabase = getSupabase(c)
    let query = supabase.from('users').select('*', { count: 'exact' })

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    const { data, count, error } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    if (error) throw error

    const response: ApiResponse<PaginatedResponse<User>> = {
      data: {
        data: data || [],
        pagination: {
          total: count || 0,
          page,
          limit,
          hasMore: (count || 0) > offset + limit
        }
      }
    }
    
    return c.json(response)
  } catch (error) {
    const { message, status } = handleError(error, 'Error fetching users')
    return c.json({ error: { message, status } }, status)
  }
})

users.post('/', rateLimit(), zValidator('json', createUserSchema), async (c: Context) => {
  try {
    const data = await c.req.valid('json') as ValidatedRequest
    const supabase = getSupabase(c)
    
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', data.email)
      .single()

    if (existingUser) {
      return c.json({
        error: {
          message: 'User with this email already exists',
          status: 409
        }
      }, 409)
    }

    // Create new user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        name: data.name,
        email: data.email,
      })
      .select()
      .single()

    if (error) throw error

    const response: ApiResponse<User> = {
      data: newUser as User
    }
    
    return c.json(response, 201)
  } catch (error) {
    const { message, status } = handleError(error, 'Error creating user')
    return c.json({ error: { message, status } }, status)
  }
})

users.get('/:id', rateLimit(), async (c: Context) => {
  try {
    const id = c.req.param('id')
    const supabase = getSupabase(c)
    
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    const response: ApiResponse<User> = {
      data: user as User
    }
    
    return c.json(response)
  } catch (error) {
    const { message, status } = handleError(error, 'Error fetching user')
    return c.json({ error: { message, status } }, status)
  }
})

users.patch('/:id', rateLimit(), zValidator('json', updateUserSchema), async (c: Context) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.valid('json') as ValidatedUpdateRequest
    const supabase = getSupabase(c)

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError
    if (!existingUser) {
      return c.json({
        error: {
          message: 'User not found',
          status: 404
        }
      }, 404)
    }

    // If updating email, check if new email already exists
    if (data.email) {
      const { data: emailExists } = await supabase
        .from('users')
        .select('id')
        .eq('email', data.email)
        .neq('id', id)
        .single()

      if (emailExists) {
        return c.json({
          error: {
            message: 'Email already in use',
            status: 409
          }
        }, 409)
      }
    }

    // Update user
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    const response: ApiResponse<User> = {
      data: updatedUser as User
    }
    
    return c.json(response)
  } catch (error) {
    const { message, status } = handleError(error, 'Error updating user')
    return c.json({ error: { message, status } }, status)
  }
})

users.delete('/:id', rateLimit(), async (c: Context) => {
  try {
    const id = c.req.param('id')
    const supabase = getSupabase(c)

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError
    if (!existingUser) {
      return c.json({
        error: {
          message: 'User not found',
          status: 404
        }
      }, 404)
    }

    // Delete user
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) throw error

    return c.body(null, 204)
  } catch (error) {
    const { message, status } = handleError(error, 'Error deleting user')
    return c.json({ error: { message, status } }, status)
  }
})

export default users 