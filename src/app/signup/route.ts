import { NextRequest, NextResponse } from 'next/server';

// This file handles redirecting visitors of the old signup path to the new auth/register path
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/auth/register', request.url));
}

export async function POST(request: NextRequest) {
  return NextResponse.redirect(new URL('/auth/register', request.url));
} 