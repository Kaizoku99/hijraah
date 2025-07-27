import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

  // Securely get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user.id;

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
