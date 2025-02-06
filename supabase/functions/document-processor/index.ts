import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { supabase, validateDocument } from '../_shared/utils.ts'
import { ApiError } from '../_shared/types.ts'

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: 'No valid file provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate document
    const validationResult = await validateDocument({
      fileType: file.type,
      fileSize: file.size,
      fileName: file.name
    })

    if (!validationResult.valid) {
      return new Response(
        JSON.stringify({ error: validationResult.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Process the file (convert to buffer)
    const buffer = await file.arrayBuffer()
    const fileBuffer = new Uint8Array(buffer)

    // Generate unique filename
    const timestamp = new Date().getTime()
    const filename = `${timestamp}-${file.name}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(filename, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600'
      })

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ data }),
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