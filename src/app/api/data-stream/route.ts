import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase/client';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/**
 * Data Stream API route
 * Implements server-sent events (SSE) for real-time streaming of AI-generated content
 */
export async function GET(request: NextRequest) {
  // Get the chat ID from the request
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 });
  }
  
  // Create response headers for SSE
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
  };
  
  // Create a new ReadableStream
  const stream = new ReadableStream({
    start: async (controller) => {
      // Helper function to send data through the stream
      function sendEvent(data: any) {
        const event = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(event));
      }
      
      // Send initial message
      sendEvent({
        type: 'connected',
        content: {
          chatId: id,
          timestamp: new Date().toISOString(),
        },
      });
      
      try {
        // Set up Supabase realtime subscription
        const supabase = getSupabaseClient();
        
        // Subscribe to the chat_stream_data table
        const subscription = supabase
          .channel(`stream_data:${id}`)
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_stream_data',
            filter: `chat_id=eq.${id}`
          }, (payload: any) => {
            // Parse and forward the payload data
            const streamData = payload.new;
            
            // Send the data through the SSE stream
            sendEvent({
              type: streamData.type,
              content: streamData.content,
              timestamp: streamData.created_at,
            });
            
            // If the stream has completed, close the connection
            if (streamData.type === 'finish') {
              controller.close();
            }
          })
          .subscribe();
        
        // Keep the connection alive with a heartbeat
        const heartbeatInterval = setInterval(() => {
          sendEvent({
            type: 'heartbeat',
            content: {
              timestamp: new Date().toISOString(),
            },
          });
        }, 30000); // Send heartbeat every 30 seconds
        
        // Clean up when the client disconnects
        request.signal.addEventListener('abort', () => {
          subscription.unsubscribe();
          clearInterval(heartbeatInterval);
          controller.close();
        });
      } catch (error) {
        console.error('Error setting up data stream:', error);
        
        // Send error message
        sendEvent({
          type: 'error',
          content: {
            error: 'Failed to set up data stream',
            details: error instanceof Error ? error.message : 'Unknown error',
          },
        });
        
        // Close the stream
        controller.close();
      }
    },
  });
  
  // Return the stream as a response
  return new Response(stream, {
    headers,
  });
} 