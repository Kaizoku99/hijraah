// Deprecated route: Forward to unified chat API for single source of truth
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  // Forward the request body to the unified chat endpoint
  const url = new URL("/api/chat", req.url);
  return NextResponse.redirect(url, 307);
}
