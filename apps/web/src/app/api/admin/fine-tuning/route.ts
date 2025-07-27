import { NextResponse } from "next/server";
import { z } from "zod";

import { createFineTuningJob } from "@/lib/ai/fine-tuning/fine-tuning-service-node";
import {
  checkFineTuningJobStatus,
  listFineTuningJobs,
  cancelFineTuningJob,
  listFineTunedModels,
} from "@/lib/ai/fine-tuning/fine-tuning-service-shared";
import { loadFineTunedModels } from "@/lib/ai/models";
import { getAuthenticatedUser } from "@/lib/auth/nextjs";

// Export configuration
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Input validation schema for creating a job
const CreateJobSchema = z.object({
  category: z.string().optional(),
});

// Input validation schema for checking job status
const JobIdSchema = z.object({
  jobId: z.string(),
});

/**
 * GET handler - list all fine-tuning jobs
 */
export async function GET(request: Request) {
  try {
    // Perform admin authorization check
    const user = await getAuthenticatedUser(request);
    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get jobs
    const jobs = await listFineTuningJobs();
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error listing fine-tuning jobs:", error);
    return NextResponse.json(
      { error: "Failed to list fine-tuning jobs" },
      { status: 500 },
    );
  }
}

/**
 * POST handler - create a new fine-tuning job
 */
export async function POST(request: Request) {
  try {
    // Perform admin authorization check
    const user = await getAuthenticatedUser(request);
    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Parse and validate request
    const body = await request.json();
    const { category } = CreateJobSchema.parse(body);

    // Create job
    const result = await createFineTuningJob(category);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.format() },
        { status: 400 },
      );
    }

    console.error("Error creating fine-tuning job:", error);
    return NextResponse.json(
      { error: "Failed to create fine-tuning job" },
      { status: 500 },
    );
  }
}

/**
 * PATCH handler - check or update job status
 */
export async function PATCH(request: Request) {
  try {
    // Perform admin authorization check
    const user = await getAuthenticatedUser(request);
    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Parse and validate request
    const body = await request.json();
    const { jobId } = JobIdSchema.parse(body);

    // Check job status
    const status = await checkFineTuningJobStatus(jobId);
    return NextResponse.json(status);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.format() },
        { status: 400 },
      );
    }

    console.error("Error checking fine-tuning job status:", error);
    return NextResponse.json(
      { error: "Failed to check fine-tuning job status" },
      { status: 500 },
    );
  }
}

/**
 * DELETE handler - cancel a fine-tuning job
 */
export async function DELETE(request: Request) {
  try {
    // Perform admin authorization check
    const user = await getAuthenticatedUser(request);
    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Parse URL to get job ID
    const url = new URL(request.url);
    const jobId = url.searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        { error: "Missing jobId parameter" },
        { status: 400 },
      );
    }

    // Cancel job
    const result = await cancelFineTuningJob(jobId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error canceling fine-tuning job:", error);
    return NextResponse.json(
      { error: "Failed to cancel fine-tuning job" },
      { status: 500 },
    );
  }
}
