import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: number
          email: string
          created_at: string
          source?: string
          metadata?: any
        }
        Insert: {
          email: string
          source?: string
          metadata?: any
        }
        Update: {
          email?: string
          source?: string
          metadata?: any
        }
      }
    }
  }
}