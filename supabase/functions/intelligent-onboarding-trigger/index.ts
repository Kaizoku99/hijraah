/**
 * Intelligent Onboarding Trigger Edge Function
 *
 * This function is triggered when a user confirms their email address.
 * It automatically starts the intelligent onboarding process by analyzing
 * the user's company domain while they're completing email verification.
 *
 * Trigger: Supabase Auth webhook on user email confirmation
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for preflight requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface SupabaseAuthWebhookPayload {
  type: "user.created" | "user.confirmed" | "user.updated";
  table: string;
  record: {
    id: string;
    email: string;
    email_confirmed_at?: string;
    created_at: string;
    updated_at: string;
    user_metadata?: Record<string, any>;
    app_metadata?: Record<string, any>;
  };
  schema: string;
  old_record?: any;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 200 });
  }

  try {
    // Validate request method
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse webhook payload
    const payload: SupabaseAuthWebhookPayload = await req.json();

    console.log("Received auth webhook:", {
      type: payload.type,
      userId: payload.record.id,
      email: payload.record.email,
      confirmed: payload.record.email_confirmed_at,
    });

    // Only process email confirmation events
    if (
      payload.type !== "user.confirmed" ||
      !payload.record.email_confirmed_at
    ) {
      console.log("Ignoring non-confirmation event");
      return new Response(
        JSON.stringify({ message: "Event ignored - not a confirmation" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const userId = payload.record.id;
    const email = payload.record.email;

    if (!email || !userId) {
      console.error("Missing required data in webhook payload");
      return new Response(
        JSON.stringify({ error: "Missing email or user ID" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Supabase client with service role
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Extract email domain
    const emailDomain = email.split("@")[1]?.toLowerCase();
    if (!emailDomain) {
      console.error("Invalid email format:", email);
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Skip analysis for common generic email providers
    const genericProviders = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "icloud.com",
      "protonmail.com",
      "zoho.com",
      "mail.com",
      "yandex.com",
    ];

    if (genericProviders.includes(emailDomain)) {
      console.log(
        `Skipping analysis for generic email provider: ${emailDomain}`
      );

      // Update user profile with domain but no analysis
      await supabase
        .from("profiles")
        .update({
          email_domain: emailDomain,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      return new Response(
        JSON.stringify({
          message: "Generic email provider - analysis skipped",
          domain: emailDomain,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(
      `Starting intelligent onboarding for user ${userId} with domain: ${emailDomain}`
    );

    // Check if analysis already exists for this domain
    const { data: existingAnalysis } = await supabase
      .from("company_analyses")
      .select("id, status")
      .eq("domain", emailDomain)
      .single();

    if (existingAnalysis && existingAnalysis.status === "completed") {
      console.log(`Using existing analysis for domain: ${emailDomain}`);

      // Link existing analysis to user profile
      await supabase
        .from("profiles")
        .update({
          email_domain: emailDomain,
          company_analysis_id: existingAnalysis.id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      // Check if personalized onboarding already exists
      const { data: existingOnboarding } = await supabase
        .from("personalized_onboarding")
        .select("id, status")
        .eq("user_id", userId)
        .single();

      if (!existingOnboarding) {
        // Create personalized onboarding record linked to existing analysis
        await supabase.from("personalized_onboarding").insert({
          user_id: userId,
          company_analysis_id: existingAnalysis.id,
          status: "completed",
        });
      }

      return new Response(
        JSON.stringify({
          message: "Linked to existing company analysis",
          domain: emailDomain,
          analysisId: existingAnalysis.id,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create onboarding job for async processing
    const { data: job, error: jobError } = await supabase
      .from("onboarding_jobs")
      .insert({
        user_id: userId,
        email: email,
        email_domain: emailDomain,
        job_type: "intelligent_onboarding",
        status: "pending",
        current_step: "queued",
        steps_completed: [],
        total_steps: 4,
      })
      .select("id")
      .single();

    if (jobError || !job) {
      console.error("Failed to create onboarding job:", jobError);
      return new Response(
        JSON.stringify({ error: "Failed to create onboarding job" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Make async call to the analysis API endpoint
    try {
      const analysisUrl = `${Deno.env.get("NEXT_PUBLIC_SITE_URL")}/api/onboarding/analyze`;

      // Make the API call without awaiting to allow async processing
      fetch(analysisUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-supabase-user-id": userId,
          "x-supabase-authenticated": "true",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
        body: JSON.stringify({
          email,
          userId,
        }),
      })
        .then((response) => {
          console.log(
            `Analysis API call initiated for user ${userId}, status: ${response.status}`
          );
          return response.json();
        })
        .then((data) => {
          console.log(`Analysis completed for user ${userId}:`, data);
        })
        .catch((error) => {
          console.error(`Analysis failed for user ${userId}:`, error);

          // Update job status to failed
          supabase
            .from("onboarding_jobs")
            .update({
              status: "failed",
              error_message: error.message || "Analysis API call failed",
              updated_at: new Date().toISOString(),
            })
            .eq("id", job.id)
            .then(() => {
              console.log(`Updated job ${job.id} status to failed`);
            });
        });

      console.log(
        `Intelligent onboarding job ${job.id} queued for user ${userId}`
      );

      return new Response(
        JSON.stringify({
          message: "Intelligent onboarding initiated",
          jobId: job.id,
          userId,
          domain: emailDomain,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error initiating analysis:", error);

      // Update job status to failed
      await supabase
        .from("onboarding_jobs")
        .update({
          status: "failed",
          error_message:
            error instanceof Error ? error.message : "Unknown error",
          updated_at: new Date().toISOString(),
        })
        .eq("id", job.id);

      return new Response(
        JSON.stringify({
          error: "Failed to initiate analysis",
          details: error instanceof Error ? error.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error in intelligent onboarding trigger:", error);

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
