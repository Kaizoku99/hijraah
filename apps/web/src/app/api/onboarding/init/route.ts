import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Check for user ID from middleware headers (best approach)
  const userIdFromHeaders = request.headers.get("x-supabase-user-id");
  const isAuthenticated =
    request.headers.get("x-supabase-authenticated") === "true";

  if (!isAuthenticated || !userIdFromHeaders) {
    console.error(
      "Error checking admin_users table for user",
      userIdFromHeaders,
      ": Auth session missing!"
    );
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = userIdFromHeaders;

  // Create a Supabase client with service role for database operations
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Check for existing onboarding record
  const { data, error } = await supabase
    .from("user_onboarding")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    console.log("Creating new onboarding record for user:", userId);
    // Create new onboarding record
    const { error: insertError } = await supabase
      .from("user_onboarding")
      .insert({
        user_id: userId,
        current_step: "welcome",
        progress: 0,
        is_completed: false,
        is_active: true,
      });

    if (insertError) {
      console.error("Error creating onboarding record:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ initialized: true, isNew: true });
  }

  return NextResponse.json({ initialized: true, isNew: false, data });
}
