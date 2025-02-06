import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

let browserClient: ReturnType<typeof createBrowserClient<Database>> | undefined

export function getSupabaseClient() {
  if (browserClient) return browserClient
  
  browserClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  return browserClient
}

// Backwards compatibility exports
export const createClient = getSupabaseClient
export const supabaseClient = getSupabaseClient()