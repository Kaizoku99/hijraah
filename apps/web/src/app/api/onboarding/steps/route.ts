import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Use the token in the request header if it exists
  const authHeader = request.headers.get("Authorization");

  // Create a Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  // If authorization header exists, use it to set the session
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    await supabase.auth.setSession({
      access_token: token,
      refresh_token: "",
    });
  }

  // Get current user using the secure getUser method
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // Check for errors or if user is not found
  if (userError || !user) {
    if (userError) {
      console.error(
        "Error fetching user in /onboarding/steps:",
        userError.message,
      );
    }
    // If getUser fails or returns no user, they are unauthorized
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use the verified user ID from getUser
  const userId = user.id;

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
