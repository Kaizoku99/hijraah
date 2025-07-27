import { zValidator } from "@hono/zod-validator";
import { createClient } from "@supabase/supabase-js";
import { Hono } from "hono";
import { NextResponse } from "next/server";
import { z } from "zod";

import { Case } from "@/immigration/entities/case";
import {
  Roadmap,
  RoadmapPhase,
  RoadmapMilestone,
} from "@/immigration/entities/roadmap";
import { CaseService } from "@/immigration/services/case-service";
import { RoadmapService } from "@/immigration/services/roadmap-service";

// Initialize services
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);
const caseService = new CaseService();
const roadmapService = new RoadmapService(caseService);

const app = new Hono().basePath("/api/roadmap");

// Middleware for authentication
const authMiddleware = async (c: any, next: () => Promise<void>) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", user);
  await next();
};

// Schema for creating a roadmap
const createRoadmapSchema = z.object({
  caseId: z.string().uuid(),
  customizationParams: z
    .object({
      urgency: z.enum(["normal", "expedited"]).optional(),
      complexity: z.enum(["simple", "standard", "complex"]).optional(),
      priorityDocuments: z.array(z.string()).optional(),
    })
    .optional(),
});

// Schema for updating milestone status
const updateMilestoneSchema = z.object({
  roadmapId: z.string().uuid(),
  milestoneId: z.string().uuid(),
  status: z.enum([
    "not_started",
    "in_progress",
    "completed",
    "blocked",
    "overdue",
  ]),
  completionPercentage: z.number().min(0).max(100),
});

// Schema for updating roadmap
const updateRoadmapSchema = z.object({
  roadmapId: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

// Create a roadmap
app.post(
  "/",
  authMiddleware,
  zValidator("json", createRoadmapSchema),
  async (c) => {
    try {
      const user = c.get("user");
      if (!user) {
        return c.json(
          { error: "Unauthorized - User not found in context" },
          401,
        );
      }
      const { caseId, customizationParams } = c.req.valid("json");

      // Get the case
      const { data: caseData, error: caseError } = await supabase
        .from("cases")
        .select("*")
        .eq("id", caseId)
        .single();

      if (caseError || !caseData) {
        return c.json({ error: "Case not found" }, 404);
      }

      // Check if user has access to this case
      const isAssigned = caseData.assignments.some(
        (assignment: any) => assignment.userId === user.id,
      );

      if (!isAssigned && caseData.client_id !== user.id) {
        return c.json({ error: "Access denied to this case" }, 403);
      }

      // Create case entity using fromDatabase
      const caseEntity = Case.fromDatabase(caseData);

      // Generate roadmap
      const roadmap = roadmapService.generateRoadmap(
        caseEntity,
        user.id,
        customizationParams,
      );

      // Save to database
      const { data: roadmapData, error: roadmapError } = await supabase
        .from("roadmaps")
        .insert({
          id: roadmap.id,
          title: roadmap.title,
          description: roadmap.description,
          case_id: roadmap.caseId,
          case_type: roadmap.caseType,
          user_id: roadmap.userId,
          phases: roadmap.phases,
          start_date: roadmap.startDate.toISOString(),
          target_end_date: roadmap.targetEndDate.toISOString(),
          estimated_end_date: roadmap.estimatedEndDate.toISOString(),
          completion_percentage: roadmap.completionPercentage,
          last_updated: roadmap.lastUpdated.toISOString(),
          metadata: roadmap.metadata,
        })
        .select()
        .single();

      if (roadmapError) {
        return c.json(
          { error: `Failed to create roadmap: ${roadmapError.message}` },
          500,
        );
      }

      return c.json(roadmapData);
    } catch (error: any) {
      return c.json({ error: `Server error: ${error.message}` }, 500);
    }
  },
);

// Get a specific roadmap
app.get("/:id", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized - User not found in context" }, 401);
    }
    const id = c.req.param("id");

    // Get the roadmap
    const { data: roadmapData, error: roadmapError } = await supabase
      .from("roadmaps")
      .select("*, cases:case_id(*)")
      .eq("id", id)
      .single();

    if (roadmapError || !roadmapData) {
      return c.json({ error: "Roadmap not found" }, 404);
    }

    // Check if user has access to this roadmap
    if (
      roadmapData.user_id !== user.id &&
      !roadmapData.cases.assignments.some(
        (assignment: any) => assignment.userId === user.id,
      )
    ) {
      return c.json({ error: "Access denied to this roadmap" }, 403);
    }

    return c.json(roadmapData);
  } catch (error: any) {
    return c.json({ error: `Server error: ${error.message}` }, 500);
  }
});

// Get roadmaps for a case
app.get("/case/:caseId", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized - User not found in context" }, 401);
    }
    const caseId = c.req.param("caseId");

    // Check if user has access to this case
    const { data: caseData, error: caseError } = await supabase
      .from("cases")
      .select("*")
      .eq("id", caseId)
      .single();

    if (caseError || !caseData) {
      return c.json({ error: "Case not found" }, 404);
    }

    const isCaseAssigned = caseData.assignments.some(
      (assignment: any) => assignment.userId === user.id,
    );
    if (!isCaseAssigned && caseData.client_id !== user.id) {
      return c.json({ error: "Access denied to this case" }, 403);
    }

    // Get roadmaps for this case
    const { data: roadmapsData, error: roadmapsError } = await supabase
      .from("roadmaps")
      .select("*")
      .eq("case_id", caseId)
      .order("created_at", { ascending: false });

    if (roadmapsError) {
      return c.json(
        { error: `Failed to fetch roadmaps: ${roadmapsError.message}` },
        500,
      );
    }

    return c.json(roadmapsData);
  } catch (error: any) {
    return c.json({ error: `Server error: ${error.message}` }, 500);
  }
});

// Get user's roadmaps
app.get("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");

    // Get roadmaps for this user (either as owner or assigned to their cases)
    const { data: roadmapsData, error: roadmapsError } = await supabase
      .from("roadmaps")
      .select("*")
      .eq("user_id", user.id)
      .order("last_updated", { ascending: false });

    if (roadmapsError) {
      return c.json(
        { error: `Failed to fetch roadmaps: ${roadmapsError.message}` },
        500,
      );
    }

    return c.json(roadmapsData);
  } catch (error: any) {
    return c.json({ error: `Server error: ${error.message}` }, 500);
  }
});

// Update milestone status
app.patch(
  "/milestone",
  authMiddleware,
  zValidator("json", updateMilestoneSchema),
  async (c) => {
    try {
      const user = c.get("user");
      if (!user) {
        return c.json(
          { error: "Unauthorized - User not found in context" },
          401,
        );
      }
      const { roadmapId, milestoneId, status, completionPercentage } =
        c.req.valid("json");

      // Get the roadmap
      const { data: roadmapData, error: roadmapError } = await supabase
        .from("roadmaps")
        .select("*")
        .eq("id", roadmapId)
        .single();

      if (roadmapError || !roadmapData) {
        return c.json({ error: "Roadmap not found" }, 404);
      }

      // Check if user has access to this roadmap
      if (roadmapData.user_id !== user.id) {
        // Check if user is assigned to the case
        const { data: caseData, error: caseError } = await supabase
          .from("cases")
          .select("assignments")
          .eq("id", roadmapData.case_id)
          .single();

        if (caseError || !caseData) {
          return c.json({ error: "Access denied to this roadmap" }, 403);
        }

        const isAssigned = caseData.assignments.some(
          (assignment: any) => assignment.userId === user.id,
        );

        if (!isAssigned) {
          return c.json({ error: "Access denied to this roadmap" }, 403);
        }
      }

      // Create Roadmap entity
      const roadmap = Roadmap.fromDatabase(roadmapData);

      // Update milestone status
      const updatedRoadmap = roadmap.updateMilestoneStatus(
        milestoneId,
        status,
        completionPercentage,
      );

      // Save the updated roadmap
      const { data: updatedData, error: updateError } = await supabase
        .from("roadmaps")
        .update({
          phases: updatedRoadmap.phases,
          completion_percentage: updatedRoadmap.completionPercentage,
          last_updated: updatedRoadmap.lastUpdated.toISOString(),
        })
        .eq("id", roadmapId)
        .select()
        .single();

      if (updateError) {
        return c.json(
          { error: `Failed to update milestone: ${updateError.message}` },
          500,
        );
      }

      return c.json(updatedData);
    } catch (error: any) {
      return c.json({ error: `Server error: ${error.message}` }, 500);
    }
  },
);

// Update roadmap
app.patch(
  "/:id",
  authMiddleware,
  zValidator("json", updateRoadmapSchema),
  async (c) => {
    try {
      const user = c.get("user");
      if (!user) {
        return c.json(
          { error: "Unauthorized - User not found in context" },
          401,
        );
      }
      const id = c.req.param("id");
      const { title, description, metadata } = c.req.valid("json");

      // Get the roadmap
      const { data: roadmapData, error: roadmapError } = await supabase
        .from("roadmaps")
        .select("*")
        .eq("id", id)
        .single();

      if (roadmapError || !roadmapData) {
        return c.json({ error: "Roadmap not found" }, 404);
      }

      // Check if user has access to this roadmap
      if (roadmapData.user_id !== user.id) {
        return c.json({ error: "Access denied to this roadmap" }, 403);
      }

      // Prepare update data
      const updateData: Record<string, any> = {
        last_updated: new Date().toISOString(),
      };

      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (metadata)
        updateData.metadata = {
          ...roadmapData.metadata,
          ...metadata,
        };

      // Update the roadmap
      const { data: updatedData, error: updateError } = await supabase
        .from("roadmaps")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        return c.json(
          { error: `Failed to update roadmap: ${updateError.message}` },
          500,
        );
      }

      return c.json(updatedData);
    } catch (error: any) {
      return c.json({ error: `Server error: ${error.message}` }, 500);
    }
  },
);

// Delete a roadmap
app.delete("/:id", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const id = c.req.param("id");

    // Get the roadmap
    const { data: roadmapData, error: roadmapError } = await supabase
      .from("roadmaps")
      .select("*")
      .eq("id", id)
      .single();

    if (roadmapError || !roadmapData) {
      return c.json({ error: "Roadmap not found" }, 404);
    }

    // Check if user has access to this roadmap
    if (roadmapData.user_id !== user.id) {
      return c.json({ error: "Access denied to this roadmap" }, 403);
    }

    // Delete the roadmap
    const { error: deleteError } = await supabase
      .from("roadmaps")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return c.json(
        { error: `Failed to delete roadmap: ${deleteError.message}` },
        500,
      );
    }

    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: `Server error: ${error.message}` }, 500);
  }
});

// Export for Next.js API route
export const GET = async (req: Request) => {
  return app.fetch(req);
};

export const POST = async (req: Request) => {
  return app.fetch(req);
};

export const PATCH = async (req: Request) => {
  return app.fetch(req);
};

export const DELETE = async (req: Request) => {
  return app.fetch(req);
};
