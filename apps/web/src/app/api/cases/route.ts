import { NextRequest, NextResponse } from "next/server";

import { casesService } from "@/lib/services/cases";

// GET /api/cases - Get all cases or filtered by query params
export async function GET(request: NextRequest) {
  try {
    // Check for user ID from middleware headers (best approach)
    const userIdFromHeaders = request.headers.get("x-supabase-user-id");
    const isAuthenticated =
      request.headers.get("x-supabase-authenticated") === "true";

    if (!isAuthenticated || !userIdFromHeaders) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    // Get cases - if userId is provided, filter by user
    const cases = await casesService.getCases();

    // Filter cases by user_id if provided
    const filteredCases = userId
      ? cases.filter((c) => c.user_id === userId)
      : cases;

    return NextResponse.json(filteredCases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    );
  }
}

// POST /api/cases - Create a new case
export async function POST(request: NextRequest) {
  try {
    // Check for user ID from middleware headers (best approach)
    const userIdFromHeaders = request.headers.get("x-supabase-user-id");
    const isAuthenticated =
      request.headers.get("x-supabase-authenticated") === "true";

    if (!isAuthenticated || !userIdFromHeaders) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Ensure user_id is set to the authenticated user
    const newCase = {
      ...body,
      user_id: body.user_id || userIdFromHeaders,
    };

    // Create the case
    const createdCase = await casesService.createCase(newCase);

    return NextResponse.json(createdCase, { status: 201 });
  } catch (error) {
    console.error("Error creating case:", error);
    return NextResponse.json(
      { error: "Failed to create case" },
      { status: 500 }
    );
  }
}
