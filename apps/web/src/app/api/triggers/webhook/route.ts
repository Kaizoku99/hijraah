import { NextRequest, NextResponse } from "next/server";
import { tasks } from "@trigger.dev/sdk/v3";
import type {
  helloWorldTask,
  immigrationDocumentAnalysisTask,
  batchDocumentProcessingTask,
} from "@/trigger/example";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { taskType, ...taskPayload } = payload;

    let handle;

    switch (taskType) {
      case "hello-world":
        handle = await tasks.trigger<typeof helloWorldTask>(
          "hello-world",
          taskPayload,
        );
        break;

      case "immigration-document-analysis":
        handle = await tasks.trigger<typeof immigrationDocumentAnalysisTask>(
          "immigration-document-analysis",
          taskPayload,
        );
        break;

      case "batch-document-processing":
        handle = await tasks.trigger<typeof batchDocumentProcessingTask>(
          "batch-document-processing",
          taskPayload,
        );
        break;

      default:
        return NextResponse.json(
          { error: `Unknown task type: ${taskType}` },
          { status: 400 },
        );
    }

    return NextResponse.json({
      success: true,
      taskId: handle.id,
      publicAccessToken: handle.publicAccessToken,
      taskType,
    });
  } catch (error) {
    console.error("Webhook trigger error:", error);
    return NextResponse.json(
      {
        error: "Failed to trigger task",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
