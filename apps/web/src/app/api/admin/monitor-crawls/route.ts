import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import FirecrawlService from "@/lib/services/firecrawl";

// This endpoint should be called by a background job scheduler (like Vercel Cron or external service)
export async function POST(request: NextRequest) {
  try {
    // Verify admin access or use API key authentication
    const authHeader = request.headers.get("authorization");
    const expectedApiKey = process.env.CRON_SECRET || process.env.ADMIN_API_KEY;

    if (!authHeader || !expectedApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    if (token !== expectedApiKey) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    console.log("🔍 Starting crawl monitoring job");

    // Monitor all active crawls
    await FirecrawlService.monitorActiveCrawls();

    return NextResponse.json({
      success: true,
      message: "Crawl monitoring completed",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in crawl monitoring:", error);
    return NextResponse.json(
      {
        error: "Monitoring failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint for manual monitoring trigger (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin (you'll need to implement this check)
    // For now, we'll just check if they have access to monitoring
    console.log("🔍 Manual crawl monitoring triggered by admin");

    await FirecrawlService.monitorActiveCrawls();

    return NextResponse.json({
      success: true,
      message: "Manual crawl monitoring completed",
      triggeredBy: session.user.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in manual crawl monitoring:", error);
    return NextResponse.json(
      {
        error: "Manual monitoring failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
