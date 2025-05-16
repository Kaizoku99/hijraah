import { NextResponse } from 'next/server';

// Redirect to the new AI chat endpoint
export async function POST(request: Request) {
  const body = await request.json();
  
  // Forward the request to the new endpoint
  const response = await fetch(new URL('/api/ai/chat', request.url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  
  const data = await response.json();
  return NextResponse.json(data);
}

// Deprecated: Redirect delete operations
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 });
  }
  
  // Redirect to the new endpoint
  const response = await fetch(new URL(`/api/chat/${id}`, request.url), {
    method: 'DELETE',
  });
  
  if (response.ok) {
    return NextResponse.json({ success: true });
  } else {
    const error = await response.json();
    return NextResponse.json(error, { status: response.status });
  }
} 