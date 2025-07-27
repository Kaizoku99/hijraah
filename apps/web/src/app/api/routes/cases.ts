import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

// Adjust middleware imports based on the main app's structure
// We might need context (`c.get('db')`, `c.get('user')`) provided by main app middleware
// Or we apply middleware directly in the main app when mounting this router
// For now, assume main app provides user context via `c.get('user')`
// import { supabaseMiddleware, requireAuth } from '../middleware/supabase'; // Likely remove/replace
import type { AppEnv } from "@/app/api/[[...route]]/route";
import { subscriptionRateLimit } from "@/app/api/middleware/subscription-rate-limit"; // Import new middleware
import { CaseStatus, CaseType } from "@/core/immigration/entities/case"; // Corrected path
import { supabase } from "@/lib/supabase/client"; // Import the supabase client instance
import { CaseApplicationService } from "@/services/case-application-service"; // Corrected path

// Validation schemas (keep as is)
const createCaseSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(2000).optional(),
  caseType: z.nativeEnum(CaseType),
  clientId: z.string().uuid(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

const updateCaseSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().max(2000).optional().nullable(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

const statusChangeSchema = z.object({
  status: z.nativeEnum(CaseStatus),
  reason: z.string().max(500).optional(),
});

const assignUserSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["owner", "collaborator", "reviewer", "client"]),
});

// Setup function
export function setupCaseRoutes(app: Hono<AppEnv>) {
  // Use AppContext if defined
  // Initialize application service within the setup function scope
  const caseService = new CaseApplicationService();

  // Create router instance - mount this under /api/cases in the main app
  const caseApi = new Hono<AppEnv>(); // Use AppContext if defined

  // Apply specific rate limits using string literals
  const caseManagementLimit = subscriptionRateLimit(
    "caseManagement",
    () => supabase,
  );
  const documentUploadLimit = subscriptionRateLimit(
    "documentUpload",
    () => supabase,
  );

  // Apply general case management limit to most routes
  caseApi.use("/*", caseManagementLimit);
  // Apply specific document upload limit (overrides general limit for this path)
  caseApi.use("/:id/documents/:documentId", documentUploadLimit);

  // --- Routes (logic remains largely the same, ensure context `c.get('user')` is available) ---

  caseApi.get("/", async (c) => {
    const user = c.get("user"); // Assumes user is set by middleware in main app
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const { includeAssigned, status, limit, offset } = c.req.query();
    try {
      const cases = await caseService.getCasesByUser(user.id, {
        includeAssigned: includeAssigned === "true",
        status: status ? status.split(",") : undefined,
        limit: limit ? parseInt(limit) : undefined,
        offset: offset ? parseInt(offset) : undefined,
      });
      return c.json({ success: true, data: cases });
    } catch (error: any) {
      console.error("Error fetching cases:", error);
      return c.json({ error: "Failed to fetch cases" }, 500);
    }
  });

  caseApi.get("/:id", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const caseId = c.req.param("id");
    try {
      const caseDetail = await caseService.getCaseById(caseId, user.id);
      if (!caseDetail) {
        return c.json({ error: "Case not found" }, 404);
      }
      return c.json({ success: true, data: caseDetail });
    } catch (error: any) {
      if (error.message === "Access denied") {
        return c.json({ error: "Access denied" }, 403);
      }
      console.error("Error fetching case:", error);
      return c.json({ error: "Failed to fetch case" }, 500);
    }
  });

  caseApi.get("/:id/details", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const caseId = c.req.param("id");
    try {
      const details = await caseService.getCaseWithDetails(caseId, user.id);
      return c.json({ success: true, data: details });
    } catch (error: any) {
      if (error.message === "Access denied") {
        return c.json({ error: "Access denied" }, 403);
      }
      if (error.message === "Case not found") {
        return c.json({ error: "Case not found" }, 404);
      }
      console.error("Error fetching case details:", error);
      return c.json({ error: "Failed to fetch case details" }, 500);
    }
  });

  caseApi.post("/", zValidator("json", createCaseSchema), async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const body = await c.req.json();
    try {
      let dueDate = null;
      if (body.dueDate) {
        dueDate = new Date(body.dueDate);
      }
      const newCase = await caseService.createCase({
        ...body,
        createdBy: user.id,
        dueDate,
      });
      return c.json({ success: true, data: newCase }, 201);
    } catch (error: any) {
      console.error("Error creating case:", error);
      return c.json({ error: "Failed to create case" }, 500);
    }
  });

  caseApi.patch("/:id", zValidator("json", updateCaseSchema), async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const caseId = c.req.param("id");
    const body = await c.req.json();
    try {
      let dueDate = undefined;
      if (body.dueDate !== undefined) {
        dueDate = body.dueDate ? new Date(body.dueDate) : null;
      }
      const updatedCase = await caseService.updateCase(caseId, user.id, {
        ...body,
        dueDate,
      });
      return c.json({ success: true, data: updatedCase });
    } catch (error: any) {
      if (error.message.includes("Permission denied")) {
        return c.json({ error: error.message }, 403);
      }
      if (error.message === "Case not found") {
        return c.json({ error: "Case not found" }, 404);
      }
      console.error("Error updating case:", error);
      return c.json({ error: "Failed to update case" }, 500);
    }
  });

  caseApi.patch(
    "/:id/status",
    zValidator("json", statusChangeSchema),
    async (c) => {
      const user = c.get("user");
      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const caseId = c.req.param("id");
      const { status, reason } = await c.req.json();
      try {
        const updatedCase = await caseService.changeStatus(
          caseId,
          user.id,
          status,
          reason,
        );
        return c.json({ success: true, data: updatedCase });
      } catch (error: any) {
        if (error.message.includes("Permission denied")) {
          return c.json({ error: error.message }, 403);
        }
        if (error.message === "Case not found") {
          return c.json({ error: "Case not found" }, 404);
        }
        if (error.message.includes("Invalid status transition")) {
          return c.json({ error: error.message }, 400);
        }
        console.error("Error changing case status:", error);
        return c.json({ error: "Failed to change case status" }, 500);
      }
    },
  );

  caseApi.post(
    "/:id/assign",
    zValidator("json", assignUserSchema),
    async (c) => {
      const user = c.get("user");
      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const caseId = c.req.param("id");
      const { userId, role } = await c.req.json();
      try {
        const updatedCase = await caseService.assignUser(
          caseId,
          userId,
          role,
          user.id,
        );
        return c.json({ success: true, data: updatedCase });
      } catch (error: any) {
        if (error.message.includes("Permission denied")) {
          return c.json({ error: error.message }, 403);
        }
        if (error.message === "Case not found") {
          return c.json({ error: "Case not found" }, 404);
        }
        console.error("Error assigning user to case:", error);
        return c.json({ error: "Failed to assign user to case" }, 500);
      }
    },
  );

  caseApi.delete("/:id/assign/:userId", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const caseId = c.req.param("id");
    const targetUserId = c.req.param("userId");
    const reason = c.req.query("reason");
    try {
      const updatedCase = await caseService.removeAssignment(
        caseId,
        targetUserId,
        user.id,
        reason,
      );
      return c.json({ success: true, data: updatedCase });
    } catch (error: any) {
      if (error.message.includes("Permission denied")) {
        return c.json({ error: error.message }, 403);
      }
      if (error.message === "Case not found") {
        return c.json({ error: "Case not found" }, 404);
      }
      console.error("Error removing user from case:", error);
      return c.json({ error: "Failed to remove user from case" }, 500);
    }
  });

  // This route might need adjustment depending on how documents are handled globally
  // It assumes a document ID is passed, likely created via a separate document upload API
  caseApi.post("/:id/documents/:documentId", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const caseId = c.req.param("id");
    const documentId = c.req.param("documentId");
    // Add specific rate limit for document linking/uploading here or in main app
    try {
      const updatedCase = await caseService.addDocument(
        caseId,
        documentId,
        user.id,
      );
      return c.json({ success: true, data: updatedCase });
    } catch (error: any) {
      if (error.message.includes("Permission denied")) {
        return c.json({ error: error.message }, 403);
      }
      if (
        error.message === "Case not found" ||
        error.message === "Document not found"
      ) {
        return c.json({ error: error.message }, 404);
      }
      console.error("Error adding document to case:", error);
      return c.json({ error: "Failed to add document to case" }, 500);
    }
  });

  caseApi.get("/:id/completion", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const caseId = c.req.param("id");
    try {
      const caseExists = await caseService.getCaseById(caseId, user.id); // Access check
      if (!caseExists) {
        return c.json({ error: "Case not found" }, 404);
      }
      const completionPercentage =
        await caseService.calculateCompletionPercentage(caseId);
      return c.json({ success: true, data: { completionPercentage } });
    } catch (error: any) {
      if (error.message === "Access denied") {
        return c.json({ error: "Access denied" }, 403);
      }
      if (error.message === "Case not found") {
        return c.json({ error: "Case not found" }, 404);
      }
      console.error("Error calculating case completion:", error);
      return c.json({ error: "Failed to calculate case completion" }, 500);
    }
  });

  caseApi.get("/types/:caseType/required-documents", async (c) => {
    // Changed path slightly for clarity
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const caseTypeParam = c.req.param("caseType");
    try {
      const caseType = caseTypeParam as CaseType;
      if (!Object.values(CaseType).includes(caseType)) {
        return c.json({ error: "Invalid case type" }, 400);
      }
      const requiredDocs = caseService.getRequiredDocuments(caseType);
      return c.json({
        success: true,
        data: { requiredDocuments: requiredDocs },
      });
    } catch (error: any) {
      console.error("Error getting required documents:", error);
      return c.json({ error: "Failed to get required documents" }, 500);
    }
  });

  caseApi.get("/types/:caseType/processing-time", async (c) => {
    // Changed path slightly for clarity
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const caseTypeParam = c.req.param("caseType");
    try {
      const caseType = caseTypeParam as CaseType;
      if (!Object.values(CaseType).includes(caseType)) {
        return c.json({ error: "Invalid case type" }, 400);
      }
      const processingTime = caseService.estimateProcessingTime(caseType);
      return c.json({ success: true, data: processingTime });
    } catch (error: any) {
      console.error("Error estimating processing time:", error);
      return c.json({ error: "Failed to estimate processing time" }, 500);
    }
  });

  // Mount the case routes onto the main app instance passed in
  app.route("/cases", caseApi);
}

// Note: Ensure CaseApplicationService path (@/services/case-application-service)
// and core types path (@/core/immigration/entities/case) are correct relative to this new file location.
// Also, define or import AppContext type if needed for Hono typings.
