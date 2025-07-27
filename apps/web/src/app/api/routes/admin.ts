import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase/client";

/**
 * Admin routes for platform administration
 * All routes here should be behind the adminOnly middleware
 */
export function setupAdminRoutes(app: Hono) {
  // Validation schemas
  const userUpdateSchema = z.object({
    userId: z.string().uuid(),
    role: z.enum(["user", "admin", "moderator"]).optional(),
    isActive: z.boolean().optional(),
    subscriptionTier: z
      .enum(["free", "basic", "premium", "enterprise"])
      .optional(),
  });

  const bulkUserSchema = z.object({
    userIds: z.array(z.string().uuid()).min(1),
    action: z.enum(["activate", "deactivate", "delete"]),
  });

  // Get all users with pagination
  app.get("/admin/users", async (c) => {
    const page = Number(c.req.query("page") || "1");
    const limit = Number(c.req.query("limit") || "50");
    const offset = (page - 1) * limit;

    try {
      const supabase = createServiceClient();

      // Get users with count
      const { data, error, count } = await supabase
        .from("users")
        .select("*, profiles(*)", { count: "exact" })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return c.json({
        success: true,
        users: data,
        pagination: {
          total: count || 0,
          page,
          limit,
          totalPages: count ? Math.ceil(count / limit) : 0,
        },
      });
    } catch (error: any) {
      console.error("Admin users fetch error:", error);
      throw new HTTPException(500, { message: "Failed to fetch users" });
    }
  });

  // Get a specific user by ID
  app.get("/admin/users/:id", async (c) => {
    const id = c.req.param("id");
    try {
      const supabase = createServiceClient();
      const { data: user, error } = await supabase
        .from("users")
        .select("*, profiles(*)")
        .eq("id", id)
        .single();

      if (error?.code === "PGRST116" || !user) {
        throw new HTTPException(404, { message: "User not found" });
      }
      if (error) throw error;

      return c.json({ success: true, user });
    } catch (error: any) {
      console.error(`Admin user fetch error (ID: ${id}):`, error);
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "Failed to fetch user" });
    }
  });

  // Update a specific user (more granular than the existing PATCH /admin/users)
  app.patch(
    "/admin/users/:id",
    zValidator(
      "json",
      z
        .object({
          name: z.string().min(2).optional(),
          email: z.string().email().optional(),
        })
        .refine((data) => Object.keys(data).length > 0, {
          message: "At least one field must be provided",
        }),
    ),
    async (c) => {
      const id = c.req.param("id");
      const data = c.req.valid("json");
      try {
        const supabase = createServiceClient();

        const { error: checkError } = await supabase
          .from("users")
          .select("id")
          .eq("id", id)
          .single();
        if (checkError)
          throw new HTTPException(404, { message: "User not found" });

        if (data.email) {
          const { data: emailExists, error: emailCheckError } = await supabase
            .from("users")
            .select("id")
            .eq("email", data.email)
            .neq("id", id)
            .maybeSingle();

          if (emailCheckError) throw emailCheckError;
          if (emailExists)
            throw new HTTPException(409, {
              message: "Email already in use by another user",
            });
        }

        const { data: updatedUser, error: updateError } = await supabase
          .from("users")
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select("*, profiles(*)")
          .single();

        if (updateError) throw updateError;

        return c.json({ success: true, user: updatedUser });
      } catch (error: any) {
        console.error(`Admin user update error (ID: ${id}):`, error);
        if (error instanceof HTTPException) throw error;
        throw new HTTPException(500, { message: "Failed to update user" });
      }
    },
  );

  // Delete a specific user (consider soft vs hard delete)
  app.delete("/admin/users/:id", async (c) => {
    const id = c.req.param("id");
    try {
      const supabase = createServiceClient();

      const { error: checkError } = await supabase
        .from("users")
        .select("id")
        .eq("id", id)
        .single();
      if (checkError)
        throw new HTTPException(404, { message: "User not found" });

      const { error: deleteError } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      return c.body(null, 204);
    } catch (error: any) {
      console.error(`Admin user delete error (ID: ${id}):`, error);
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "Failed to delete user" });
    }
  });

  // Update a user
  app.patch("/admin/users", zValidator("json", userUpdateSchema), async (c) => {
    const { userId, role, isActive, subscriptionTier } = c.req.valid("json");

    try {
      const supabase = createServiceClient();

      // Update user roles if provided
      if (role) {
        const { error: roleError } = await supabase.from("user_roles").upsert({
          user_id: userId,
          role,
          updated_at: new Date().toISOString(),
        });

        if (roleError) throw roleError;
      }

      // Update user status if provided
      if (isActive !== undefined) {
        const { error: statusError } = await supabase
          .from("users")
          .update({
            is_active: isActive,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (statusError) throw statusError;
      }

      // Update subscription tier if provided
      if (subscriptionTier) {
        const { error: subscriptionError } = await supabase
          .from("subscriptions")
          .upsert({
            user_id: userId,
            tier: subscriptionTier,
            updated_at: new Date().toISOString(),
          });

        if (subscriptionError) throw subscriptionError;
      }

      return c.json({
        success: true,
        message: "User updated successfully",
      });
    } catch (error: any) {
      console.error("Admin user update error:", error);
      throw new HTTPException(500, { message: "Failed to update user" });
    }
  });

  // Bulk user actions
  app.post(
    "/admin/users/bulk",
    zValidator("json", bulkUserSchema),
    async (c) => {
      const { userIds, action } = c.req.valid("json");

      try {
        const supabase = createServiceClient();

        if (action === "activate" || action === "deactivate") {
          const { error } = await supabase
            .from("users")
            .update({
              is_active: action === "activate",
              updated_at: new Date().toISOString(),
            })
            .in("id", userIds);

          if (error) throw error;
        } else if (action === "delete") {
          // Soft delete users
          const { error } = await supabase
            .from("users")
            .update({
              deleted_at: new Date().toISOString(),
              is_active: false,
            })
            .in("id", userIds);

          if (error) throw error;
        }

        return c.json({
          success: true,
          message: `Bulk action '${action}' completed successfully`,
          affected: userIds.length,
        });
      } catch (error: any) {
        console.error("Admin bulk action error:", error);
        throw new HTTPException(500, {
          message: "Failed to perform bulk action",
        });
      }
    },
  );

  // Get system stats
  app.get("/admin/stats", async (c) => {
    try {
      const supabase = createServiceClient();

      // Get user count
      const { count: userCount, error: userError } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      // Get document count
      const { count: documentCount, error: documentError } = await supabase
        .from("documents")
        .select("*", { count: "exact", head: true });

      // Get active subscriptions count
      const { count: subscriptionCount, error: subscriptionError } =
        await supabase
          .from("subscriptions")
          .select("*", { count: "exact", head: true })
          .eq("status", "active");

      if (userError || documentError || subscriptionError) {
        throw userError || documentError || subscriptionError;
      }

      return c.json({
        success: true,
        stats: {
          users: userCount || 0,
          documents: documentCount || 0,
          activeSubscriptions: subscriptionCount || 0,
        },
      });
    } catch (error: any) {
      console.error("Admin stats error:", error);
      throw new HTTPException(500, { message: "Failed to fetch admin stats" });
    }
  });

  return app;
}
