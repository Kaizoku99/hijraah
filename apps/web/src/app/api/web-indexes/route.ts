import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@/lib/auth";
import { webIndexes, crawlJobs } from "@hijraah/database/schema";
import { db } from "@hijraah/database/client";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

// Validation schemas
const createWebIndexSchema = z.object({
  url: z.string().url("Invalid URL format"),
  namespace: z.string().min(1, "Namespace is required").max(255),
  title: z.string().optional(),
  description: z.string().optional(),
  isPublic: z.boolean().default(false),
  crawlConfig: z
    .object({
      maxPages: z.number().min(1).max(1000).default(100),
      includePatterns: z.array(z.string()).default([]),
      excludePatterns: z.array(z.string()).default([]),
      respectRobotsTxt: z.boolean().default(true),
      delay: z.number().min(0).max(10000).default(1000),
    })
    .optional(),
});

const updateWebIndexSchema = createWebIndexSchema.partial();

// GET /api/web-indexes - List user's web indexes
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const includePublic = searchParams.get("includePublic") === "true";

    let query = db
      .select({
        id: webIndexes.id,
        url: webIndexes.url,
        namespace: webIndexes.namespace,
        title: webIndexes.title,
        description: webIndexes.description,
        pagesCrawled: webIndexes.pagesCrawled,
        totalPages: webIndexes.totalPages,
        isActive: webIndexes.isActive,
        isPublic: webIndexes.isPublic,
        createdAt: webIndexes.createdAt,
        updatedAt: webIndexes.updatedAt,
        lastCrawledAt: webIndexes.lastCrawledAt,
        lastCrawlDuration: webIndexes.lastCrawlDuration,
      })
      .from(webIndexes);

    if (includePublic) {
      query = query.where(eq(webIndexes.userId, session.user.id));
    } else {
      query = query.where(
        and(
          eq(webIndexes.userId, session.user.id),
          eq(webIndexes.isActive, true),
        ),
      );
    }

    const indexes = await query.orderBy(webIndexes.createdAt);

    return NextResponse.json({ indexes });
  } catch (error) {
    console.error("Error fetching web indexes:", error);
    return NextResponse.json(
      { error: "Failed to fetch web indexes" },
      { status: 500 },
    );
  }
}

// POST /api/web-indexes - Create new web index
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createWebIndexSchema.parse(body);

    // Check if namespace already exists for this user
    const existingIndex = await db
      .select({ id: webIndexes.id })
      .from(webIndexes)
      .where(
        and(
          eq(webIndexes.userId, session.user.id),
          eq(webIndexes.namespace, validatedData.namespace),
        ),
      )
      .limit(1);

    if (existingIndex.length > 0) {
      return NextResponse.json(
        { error: "Namespace already exists" },
        { status: 409 },
      );
    }

    // Create new web index
    const [newIndex] = await db
      .insert(webIndexes)
      .values({
        userId: session.user.id,
        url: validatedData.url,
        namespace: validatedData.namespace,
        title: validatedData.title,
        description: validatedData.description,
        isPublic: validatedData.isPublic,
        crawlConfig: validatedData.crawlConfig || {},
      })
      .returning();

    // Create initial crawl job
    await db.insert(crawlJobs).values({
      webIndexId: newIndex.id,
      status: "pending",
      metadata: {
        initialCrawl: true,
        maxPages: validatedData.crawlConfig?.maxPages || 100,
      },
    });

    return NextResponse.json({ index: newIndex }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    console.error("Error creating web index:", error);
    return NextResponse.json(
      { error: "Failed to create web index" },
      { status: 500 },
    );
  }
}

// PUT /api/web-indexes/:id - Update web index
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const indexId = searchParams.get("id");

    if (!indexId) {
      return NextResponse.json(
        { error: "Index ID is required" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const validatedData = updateWebIndexSchema.parse(body);

    // Check if index exists and belongs to user
    const existingIndex = await db
      .select({ id: webIndexes.id })
      .from(webIndexes)
      .where(
        and(eq(webIndexes.id, indexId), eq(webIndexes.userId, session.user.id)),
      )
      .limit(1);

    if (existingIndex.length === 0) {
      return NextResponse.json(
        { error: "Web index not found" },
        { status: 404 },
      );
    }

    // Update web index
    const [updatedIndex] = await db
      .update(webIndexes)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(webIndexes.id, indexId))
      .returning();

    return NextResponse.json({ index: updatedIndex });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    console.error("Error updating web index:", error);
    return NextResponse.json(
      { error: "Failed to update web index" },
      { status: 500 },
    );
  }
}

// DELETE /api/web-indexes/:id - Delete web index
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const indexId = searchParams.get("id");

    if (!indexId) {
      return NextResponse.json(
        { error: "Index ID is required" },
        { status: 400 },
      );
    }

    // Check if index exists and belongs to user
    const existingIndex = await db
      .select({ id: webIndexes.id })
      .from(webIndexes)
      .where(
        and(eq(webIndexes.id, indexId), eq(webIndexes.userId, session.user.id)),
      )
      .limit(1);

    if (existingIndex.length === 0) {
      return NextResponse.json(
        { error: "Web index not found" },
        { status: 404 },
      );
    }

    // Soft delete by setting isActive to false
    await db
      .update(webIndexes)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(webIndexes.id, indexId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting web index:", error);
    return NextResponse.json(
      { error: "Failed to delete web index" },
      { status: 500 },
    );
  }
}
