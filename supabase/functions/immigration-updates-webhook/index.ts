import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import {
  validateWebhookSignature,
  processImmigrationUpdate,
  findAffectedUsers,
  notifyUsers,
  supabase
} from '../_shared/utils.ts'
import { ImmigrationUpdate, ApiError } from '../_shared/types.ts'

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate webhook signature
    if (!validateWebhookSignature(req)) {
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const update: ImmigrationUpdate = await req.json()

    // Process and categorize the update
    const processedUpdate = await processImmigrationUpdate(update)

    // Find affected users
    const affectedUsers = await findAffectedUsers(processedUpdate)

    // Notify users if there are any affected
    if (affectedUsers.length > 0) {
      await notifyUsers(affectedUsers, processedUpdate)
    }

    // Store the update in the database
    const { error } = await supabase
      .from('immigration_updates')
      .insert([processedUpdate])

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        message: 'Update processed successfully',
        affectedUsers: affectedUsers.length
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
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