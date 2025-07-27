import { createRoute, z, OpenAPIHono } from "@hono/zod-openapi";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { getAuthUser } from "@/lib/auth/index";
import { Database } from "@/types/database.types";

// Onboarding API Schema
const OnboardingSchema = z.object({
  currentStep: z.enum([
    "welcome",
    "profile-setup",
    "feature-tour",
    "first-task",
    "resources",
    "completed",
  ]),
  progress: z.number().min(0).max(100),
  isCompleted: z.boolean(),
});

const OnboardingActionSchema = z.object({
  actionKey: z.string().min(1),
  isCompleted: z.boolean(),
});

// Create authenticated middleware
const authMiddleware = createMiddleware(async (c, next) => {
  const { user } = await getAuthUser();
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("user", user);
  await next();
});

// Create Hono app
const onboarding = new OpenAPIHono();
onboarding.use("*", authMiddleware);

// GET /api/onboarding - Get user's onboarding state
onboarding.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Onboarding"],
    summary: "Get user onboarding state",
    description:
      "Retrieves the current onboarding state for the authenticated user",
    responses: {
      200: {
        description: "User onboarding state",
        content: {
          "application/json": {
            schema: OnboardingSchema,
          },
        },
      },
      401: {
        description: "Unauthorized",
      },
    },
  }),
  async (c: Context) => {
    const user = c.get("user")!;
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (key) => {
            return getCookie(c, key);
          },
          set: (key, value, options) => {
            setCookie(c, key, value, options);
          },
          remove: (key, options) => {
            deleteCookie(c, key, options);
          },
        },
      },
    );

    const { data, error } = await supabase
      .from("user_onboarding")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error || !data) {
      // Initialize new onboarding state
      const newOnboardingState = {
        currentStep: "welcome",
        progress: 0,
        isCompleted: false,
      };

      // Insert new record
      await supabase.from("user_onboarding").insert({
        user_id: user.id,
        current_step: newOnboardingState.currentStep,
        progress: newOnboardingState.progress,
        is_completed: newOnboardingState.isCompleted,
      });

      return c.json(newOnboardingState);
    }

    return c.json({
      currentStep: data.current_step,
      progress: data.progress,
      isCompleted: data.is_completed,
    });
  },
);

// PATCH /api/onboarding - Update onboarding state
onboarding.openapi(
  createRoute({
    method: "patch",
    path: "/",
    tags: ["Onboarding"],
    summary: "Update onboarding state",
    description: "Updates the onboarding state for the authenticated user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: OnboardingSchema.partial(),
          },
        },
      },
    },
    responses: {
      200: {
        description: "Onboarding state updated",
        content: {
          "application/json": {
            schema: OnboardingSchema,
          },
        },
      },
      401: {
        description: "Unauthorized",
      },
    },
  }),
  async (c: Context) => {
    const user = c.get("user")!;
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (key) => {
            return getCookie(c, key);
          },
          set: (key, value, options) => {
            setCookie(c, key, value, options);
          },
          remove: (key, options) => {
            deleteCookie(c, key, options);
          },
        },
      },
    );
    const body = await c.req.json();

    // Validate the input
    const input = OnboardingSchema.partial().parse(body);

    // Prepare the update
    const update: Record<string, any> = {};
    if (input.currentStep !== undefined)
      update.current_step = input.currentStep;
    if (input.progress !== undefined) update.progress = input.progress;
    if (input.isCompleted !== undefined)
      update.is_completed = input.isCompleted;
    update.updated_at = new Date().toISOString();

    // Update the record
    const { data, error } = await supabase
      .from("user_onboarding")
      .upsert({
        user_id: user.id,
        ...update,
      })
      .select()
      .single();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      currentStep: data.current_step,
      progress: data.progress,
      isCompleted: data.is_completed,
    });
  },
);

// POST /api/onboarding/actions - Mark onboarding action as completed
onboarding.openapi(
  createRoute({
    method: "post",
    path: "/actions",
    tags: ["Onboarding"],
    summary: "Mark onboarding action",
    description: "Marks a specific onboarding action as completed",
    request: {
      body: {
        content: {
          "application/json": {
            schema: OnboardingActionSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Action marked",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
            }),
          },
        },
      },
      401: {
        description: "Unauthorized",
      },
    },
  }),
  async (c: Context) => {
    const user = c.get("user")!;
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (key) => {
            return getCookie(c, key);
          },
          set: (key, value, options) => {
            setCookie(c, key, value, options);
          },
          remove: (key, options) => {
            deleteCookie(c, key, options);
          },
        },
      },
    );
    const body = await c.req.json();

    // Validate the input
    const input = OnboardingActionSchema.parse(body);

    const { error } = await supabase.rpc("mark_onboarding_action_completed", {
      action_key: input.actionKey,
    });

    if (error) {
      return c.json({ success: false, error: error.message }, 500);
    }

    return c.json({ success: true });
  },
);

// GET /api/onboarding/actions - Get all completed onboarding actions
onboarding.openapi(
  createRoute({
    method: "get",
    path: "/actions",
    tags: ["Onboarding"],
    summary: "Get completed actions",
    description: "Get all completed onboarding actions for the user",
    responses: {
      200: {
        description: "List of completed actions",
        content: {
          "application/json": {
            schema: z.array(OnboardingActionSchema),
          },
        },
      },
      401: {
        description: "Unauthorized",
      },
    },
  }),
  async (c: Context) => {
    const user = c.get("user")!;
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (key) => {
            return getCookie(c, key);
          },
          set: (key, value, options) => {
            setCookie(c, key, value, options);
          },
          remove: (key, options) => {
            deleteCookie(c, key, options);
          },
        },
      },
    );

    const { data, error } = await supabase
      .from("onboarding_actions")
      .select("action_key, is_completed")
      .eq("user_id", user.id)
      .eq("is_completed", true);

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json(
      data.map((action) => ({
        actionKey: action.action_key,
        isCompleted: action.is_completed,
      })),
    );
  },
);

// Reset /api/onboarding/reset - Reset onboarding state
onboarding.openapi(
  createRoute({
    method: "post",
    path: "/reset",
    tags: ["Onboarding"],
    summary: "Reset onboarding",
    description: "Resets the onboarding process for the user",
    responses: {
      200: {
        description: "Onboarding reset",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
            }),
          },
        },
      },
      401: {
        description: "Unauthorized",
      },
    },
  }),
  async (c: Context) => {
    const user = c.get("user")!;
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (key) => {
            return getCookie(c, key);
          },
          set: (key, value, options) => {
            setCookie(c, key, value, options);
          },
          remove: (key, options) => {
            deleteCookie(c, key, options);
          },
        },
      },
    );

    // Reset onboarding state
    const { error: stateError } = await supabase
      .from("user_onboarding")
      .upsert({
        user_id: user.id,
        current_step: "welcome",
        progress: 0,
        is_completed: false,
        updated_at: new Date().toISOString(),
      });

    if (stateError) {
      return c.json({ success: false, error: stateError.message }, 500);
    }

    // Reset all actions
    const { error: actionsError } = await supabase
      .from("onboarding_actions")
      .delete()
      .eq("user_id", user.id);

    if (actionsError) {
      return c.json({ success: false, error: actionsError.message }, 500);
    }

    return c.json({ success: true });
  },
);

export const GET = onboarding.fetch;
export const PATCH = onboarding.fetch;
export const POST = onboarding.fetch;
