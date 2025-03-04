import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '../../types/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient<Database> | null = null

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient()
  }
  return supabaseInstance
}

// For direct usage when singleton pattern isn't needed
export const supabase = createClient()
