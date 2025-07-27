import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

import { supabase } from "@/lib/supabase/client";

// Types
export type ApiHono = Hono;

// Validation schemas
const profileSchema = z.object({
  username: z.string().min(3).max(50),
  full_name: z.string().min(1).max(100),
  avatar_url: z.string().url().optional(),
  website: z.string().url().optional(),
  bio: z.string().max(500).optional(),
});

// Protected route middleware
export const auth = async (c: any, next: () => Promise<any>) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new HTTPException(401, { message: "Invalid token" });
    }

    c.set("user", user);
    return next();
  } catch (error) {
    throw new HTTPException(401, { message: "Authentication failed" });
  }
};

// API Routes
export const createApiRoutes = (app: ApiHono) => {
  // Public routes
  app.get("/", (c) => {
    return c.json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  });

  // Protected routes
  app.use("/protected/*", auth);

  // User routes
  app.get("/protected/user", async (c) => {
    const user = c.get("user");
    return c.json({ user });
  });

  // Profile routes
  app
    .get("/protected/profile", async (c) => {
      const user = c.get("user");
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        throw new HTTPException(500, { message: error.message });
      }

      return c.json({ profile: data });
    })
    .put("/protected/profile", zValidator("json", profileSchema), async (c) => {
      const user = c.get("user");
      const profile = c.req.valid("json");

      const { data, error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        throw new HTTPException(500, { message: error.message });
      }

      return c.json({ profile: data });
    });

  return app;
};
