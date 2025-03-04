import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../types/supabase'

export const createServiceClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Convert Headers to Record<string, string>
const headersToRecord = (headers: Headers): Record<string, string> => {
  const record: Record<string, string> = {}
  headers.forEach((value, key) => {
    record[key] = value
  })
  return record
}

// For middleware and server-side operations in pages directory
export const createServerClient = (context?: {
  headers: Headers | Record<string, string>
}) => {
  const headers = context?.headers instanceof Headers 
    ? headersToRecord(context.headers)
    : context?.headers

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        headers
      }
    }
  )
} 