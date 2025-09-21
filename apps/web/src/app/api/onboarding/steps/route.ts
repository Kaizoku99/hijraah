import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Check for user ID from middleware headers (best approach)
  const userIdFromHeaders = request.headers.get("x-supabase-user-id");
  const isAuthenticated =
    request.headers.get("x-supabase-authenticated") === "true";

  if (!isAuthenticated || !userIdFromHeaders) {
    console.error(
      "Error fetching user in /onboarding/steps: Auth session missing!"
    );
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = userIdFromHeaders;

  // Create a Supabase client with service role for database operations
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get onboarding state
  const { data, error } = await supabase
    .from("user_onboarding")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No record found
      return NextResponse.json({
        initialized: false,
        shouldStartOnboarding: true,
      });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    initialized: true,
    currentStep: data.current_step,
    progress: data.progress,
    isCompleted: data.is_completed,
    shouldStartOnboarding: !data.is_completed,
  });
}
