import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

// Create server-side Supabase client with service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Service role bypasses RLS and allows full database access for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const emailSchema = z.object({
  email: z.string().email('Invalid email format'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate email
    const validation = emailSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Check if email already exists in Supabase
    const { data: existingUser, error: checkError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 200 }
      )
    }

    // Add email to waitlist in Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          source: 'landing_page',
          metadata: {
            user_agent: request.headers.get('user-agent'),
            referrer: request.headers.get('referer'),
            timestamp: new Date().toISOString()
          }
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add to waitlist' },
        { status: 500 }
      )
    }

    // Get total waitlist count
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    console.log(`New waitlist signup: ${email} (Total: ${count})`)

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist',
        position: count || 1,
        id: data?.[0]?.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Supabase count error:', error)
      return NextResponse.json(
        { error: 'Failed to get waitlist count' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      count: count || 0,
      message: 'Waitlist status'
    })
  } catch (error) {
    console.error('Waitlist status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}