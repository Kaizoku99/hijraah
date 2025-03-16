import { NextRequest, NextResponse } from 'next/server';

/**
 * Handle GET requests to /dashboard/cases by redirecting them to /api/cases
 */
export async function GET(request: NextRequest) {
  // Create a new request to the API route, preserving query parameters
  const apiUrl = new URL('/api/cases', request.url);
  
  // Copy over all query parameters
  request.nextUrl.searchParams.forEach((value, key) => {
    apiUrl.searchParams.set(key, value);
  });
  
  try {
    // Forward the request to the API route
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: request.headers,
    });
    
    // Return the API response
    return new Response(await response.text(), {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Error forwarding request to API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

/**
 * Handle POST requests to /dashboard/cases by redirecting them to /api/cases
 * This is needed because the form might be submitting to the current URL
 */
export async function POST(request: NextRequest) {
  // Clone the request to preserve the body
  const clonedRequest = request.clone();
  
  // Create a new request to the API route
  const apiUrl = new URL('/api/cases', request.url);
  
  try {
    // Forward the request to the API route
    const response = await fetch(apiUrl.toString(), {
      method: 'POST',
      headers: request.headers,
      body: await clonedRequest.text(),
    });
    
    // Return the API response
    return new Response(await response.text(), {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Error forwarding request to API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 