// Test file to verify Supabase connection
import { createClient } from '@/utils/supabase/server'

export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    console.log('Supabase URL:', url ? 'Present' : 'Missing')
    console.log('Supabase Anon Key:', key ? 'Present' : 'Missing')
    
    if (!url || !key) {
      throw new Error('Missing Supabase environment variables')
    }
    
    // Test client creation
    const supabase = await createClient()
    console.log('Supabase client created successfully')
    
    // Test a simple query (this should work even without authentication)
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error) {
      console.log('Query error (expected for unauthenticated):', error.message)
    } else {
      console.log('Query successful:', data)
    }
    
    return { success: true, message: 'Supabase connection test completed' }
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}