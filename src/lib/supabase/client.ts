import { createBrowserClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../types/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient<Database> | null = null
let serviceClientInstance: SupabaseClient<Database> | null = null

/**
 * Creates a regular Supabase client with the anonymous key
 */
export const createClient = () => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase URL or Anon Key is missing')
      throw new Error('Supabase configuration is incomplete')
    }
    
    return createBrowserClient<Database>(supabaseUrl, supabaseKey)
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    throw error
  }
}

/**
 * Creates a Supabase client with the service role key for admin operations
 * This should only be used in server-side code with proper authorization checks
 */
export const createServiceClient = () => {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/**
 * Returns a singleton instance of the regular Supabase client
 */
export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient()
    } catch (error) {
      console.error('Failed to initialize Supabase client singleton:', error)
      throw error
    }
  }
  return supabaseInstance
}

/**
 * Returns a singleton instance of the Supabase service client
 * This should only be used in server-side code with proper authorization checks
 */
export const getServiceClient = () => {
  if (!serviceClientInstance) {
    serviceClientInstance = createServiceClient()
  }
  return serviceClientInstance
}

// For direct usage when singleton pattern isn't needed
export const supabase = createClient()
