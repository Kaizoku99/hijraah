import { NextRequest, NextResponse } from 'next/server';

// This file handles redirecting visitors of the old login path to the new auth/login path
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/auth/login', request.url));
}

export async function POST(request: NextRequest) {
  return NextResponse.redirect(new URL('/auth/login', request.url));
} 