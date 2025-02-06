import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { supabase, getRateLimit, addToQueue } from '../_shared/utils.ts'
import { ApiError } from '../_shared/types.ts'

serve(async (req) => {
  try {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession()
    const user_id = session?.user?.id

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check rate limits
    const rateLimit = await getRateLimit(user_id)
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Queue management
    const queuePosition = await addToQueue(user_id)
    if (queuePosition > 0) {
      return new Response(
        JSON.stringify({ queuePosition }),
        { status: 202, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Forward the request to the chat service
    const response = await fetch(Deno.env.get('CHAT_SERVICE_URL') ?? '', {
      method: req.method,
      headers: req.headers,
      body: req.body
    })

    return response
  } catch (error: unknown) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    }
    return new Response(
      JSON.stringify({ error: apiError.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}) 