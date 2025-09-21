import { NextRequest, NextResponse } from "next/server";

import { documentsService } from "@/lib/services/documents";

// GET /api/documents - Get all documents or filtered by query params
export async function GET(request: NextRequest) {
  try {
    // Check for user ID from middleware headers (best approach)
    const userIdFromHeaders = request.headers.get("x-supabase-user-id");
    const isAuthenticated = request.headers.get("x-supabase-authenticated") === "true";

    if (!isAuthenticated || !userIdFromHeaders) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const caseId = searchParams.get("case_id");

    // Get documents
    const documents = await documentsService.getDocuments(caseId || undefined);

    // Filter documents by user_id if provided
    const filteredDocuments = userId
      ? documents.filter((d) => d.user_id === userId)
      : documents;

    return NextResponse.json(filteredDocuments);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 },
    );
  }
}

// POST /api/documents - Upload a new document
export async function POST(request: NextRequest) {
  try {
    // Check for user ID from middleware headers (best approach)
    const userIdFromHeaders = request.headers.get("x-supabase-user-id");
    const isAuthenticated = request.headers.get("x-supabase-authenticated") === "true";

    if (!isAuthenticated || !userIdFromHeaders) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Use FormData for file uploads
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const caseId = formData.get("case_id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!file || !caseId) {
      return NextResponse.json(
        { error: "File and case_id are required" },
        { status: 400 },
      );
    }

    // Upload the document
    const document = await documentsService.uploadDocument(file, caseId);

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 },
    );
  }
}
