import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// eslint-disable-next-line import/no-relative-parent-imports
import { createClient } from "@/lib/supabase/server";

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

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("user_onboarding")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    const newOnboardingState = {
      currentStep: "welcome",
      progress: 0,
      isCompleted: false,
    };

  await supabase.from("user_onboarding").insert({
      user_id: user.id,
      current_step: newOnboardingState.currentStep,
      progress: newOnboardingState.progress,
      is_completed: newOnboardingState.isCompleted,
    });

    return NextResponse.json(newOnboardingState);
  }

  return NextResponse.json({
    currentStep: data.current_step,
    progress: data.progress,
    isCompleted: data.is_completed,
  });
}

// PATCH /api/onboarding - Update onboarding state
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();

  const input = OnboardingSchema.partial().parse(body);

  const update: Record<string, any> = {};
  if (input.currentStep !== undefined) update.current_step = input.currentStep;
  if (input.progress !== undefined) update.progress = input.progress;
  if (input.isCompleted !== undefined) update.is_completed = input.isCompleted;
  update.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("user_onboarding")
    .upsert({
      user_id: user.id,
      ...update,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    currentStep: data.current_step,
    progress: data.progress,
    isCompleted: data.is_completed,
  });
}

// POST /api/onboarding/actions - Mark onboarding action as completed
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();

  const input = OnboardingActionSchema.parse(body);

  const { error } = await supabase.rpc("mark_onboarding_action_completed", {
    action_key: input.actionKey,
  });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

// GET /api/onboarding/actions - Get all completed onboarding actions
export async function GET_actions() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("onboarding_actions")
    .select("action_key, completed_at")
    .eq("user_id", user.id)
    .not("completed_at", "is", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    data.map((action) => ({
      actionKey: (action as any).action_key,
      isCompleted: Boolean((action as any).completed_at),
      completedAt: (action as any).completed_at,
    })),
  );
}

// Reset /api/onboarding/reset - Reset onboarding state
export async function POST_reset() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
    return NextResponse.json(
      { success: false, error: stateError.message },
      { status: 500 },
    );
  }

  const { error: actionsError } = await supabase
    .from("onboarding_actions")
    .delete()
    .eq("user_id", user.id);

  if (actionsError) {
    return NextResponse.json(
      { success: false, error: actionsError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
