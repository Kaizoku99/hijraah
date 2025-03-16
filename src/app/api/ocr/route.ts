import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// API base URL with fallback to localhost for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Handle OCR processing via file upload
 */
export async function POST(request: NextRequest) {
  try {
    // Get the formData from the request
    const formData = await request.formData();

    // Get auth token from cookies if available
    const authCookie = cookies().get('sb-access-token')?.value || '';

    // Forward the request to the Hono API
    const response = await fetch(`${API_BASE_URL}/ocr/process-file`, {
      method: 'POST',
      headers: {
        'Authorization': authCookie ? `Bearer ${authCookie}` : '',
      },
      body: formData,
    });

    // Get the JSON response
    const data = await response.json();

    // Return the response
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error processing OCR request:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

/**
 * Handle URL-based OCR processing
 * This is a separate route using query parameters to distinguish it
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const preserveFormatting = searchParams.get('preserveFormatting') === 'true';
    const detectTables = searchParams.get('detectTables') === 'true';
    const language = searchParams.get('language') || undefined;
    const extractPlainText = searchParams.get('extractPlainText') === 'true';

    if (!url) {
      return NextResponse.json({
        success: false,
        error: 'URL parameter is required'
      }, { status: 400 });
    }

    // Get auth token from cookies if available
    const authCookie = cookies().get('sb-access-token')?.value || '';

    // Forward the request to the Hono API
    const response = await fetch(`${API_BASE_URL}/ocr/process-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authCookie ? `Bearer ${authCookie}` : '',
      },
      body: JSON.stringify({
        url,
        preserveFormatting,
        detectTables,
        language,
        extractPlainText
      }),
    });

    // Get the JSON response
    const data = await response.json();

    // Return the response
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error processing OCR request:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
} 