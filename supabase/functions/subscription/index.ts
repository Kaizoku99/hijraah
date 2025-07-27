/// <reference lib="deno.ns" />

import { createClient } from "npm:@supabase/supabase-js@2.43.4";
// Skipping database typing for edge functions
// import type { Database } from '../../types/database';

interface User {
  id: string;
  email: string;
}

interface SubscriptionRequest {
  planId: string;
  user: User;
}

interface WebhookPayload {
  type: string;
  data: Record<string, any>;
}

// Simple environment function to work in both Node and Deno
function getEnv(key: string): string {
  // Try to access via Deno if available
  // @ts-ignore - Ignoring Deno type issues
  if (typeof Deno !== "undefined" && Deno?.env?.get) {
    // @ts-ignore - Ignoring Deno type issues
    return Deno.env.get(key) || "";
  }

  // Fall back to Node.js process.env
  return process.env[key] || "";
}

// Edge Function handler
export async function handler(req: Request) {
  // CORS headers
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  // Create a Supabase client with the Auth context of the logged in user
  const supabaseUrl =
    getEnv("SUPABASE_URL") || getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseKey =
    getEnv("SUPABASE_ANON_KEY") || getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  const supabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: { Authorization: req.headers.get("Authorization")! },
    },
  });

  // Get the current logged in user
  const {
    data: { user },
    error: authError,
  } = await supabaseClient.auth.getUser();

  if (authError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      headers: { "Content-Type": "application/json" },
      status: 401,
    });
  }

  // Parse URL to get endpoint
  const url = new URL(req.url);
  const endpoint = url.pathname.split("/").pop();

  try {
    switch (endpoint) {
      case "get-subscription":
        return await getSubscription(supabaseClient, user.id);

      case "create-checkout":
        if (req.method !== "POST") {
          return methodNotAllowed();
        }

        const { planId } = (await req.json()) as SubscriptionRequest;
        return await createCheckout(supabaseClient, user, planId);

      case "webhook":
        if (req.method !== "POST") {
          return methodNotAllowed();
        }

        // Verify webhook signature in a real implementation
        const payload = (await req.json()) as WebhookPayload;
        return await handleWebhook(supabaseClient, payload);

      case "cancel":
        if (req.method !== "POST") {
          return methodNotAllowed();
        }

        return await cancelSubscription(supabaseClient, user.id);

      default:
        return new Response(JSON.stringify({ error: "Endpoint not found" }), {
          headers: { "Content-Type": "application/json" },
          status: 404,
        });
    }
  } catch (error: any) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

// Deno entry point
// @ts-ignore - Deno specific
if (typeof Deno !== "undefined") {
  // @ts-ignore - Deno specific
  Deno.serve(handler);
}

async function getSubscription(supabaseClient: any, userId: string) {
  const { data, error } = await supabaseClient
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return new Response(JSON.stringify({ subscription: data }), {
    headers: { "Content-Type": "application/json" },
  });
}

async function createCheckout(supabaseClient: any, user: any, planId: string) {
  // In a real implementation, this would create a checkout session with Stripe
  // For simplicity, we're just recording the subscription directly

  // First check if user already has a subscription
  const { data: existingSub } = await supabaseClient
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const now = new Date();
  const endDate = new Date();
  endDate.setMonth(now.getMonth() + 1); // One month from now

  // Mock pricing data - in a real implementation would come from a prices table
  const planPrices: Record<string, number> = {
    free: 0,
    pro: 15,
    business: 49,
  };

  if (existingSub) {
    // Update existing subscription
    const { data, error } = await supabaseClient
      .from("subscriptions")
      .update({
        plan_id: planId,
        amount: planPrices[planId] || 0,
        current_period_start: now.toISOString(),
        current_period_end: endDate.toISOString(),
        status: "active",
        updated_at: now.toISOString(),
      })
      .eq("id", existingSub.id)
      .select();

    if (error) throw error;

    return new Response(
      JSON.stringify({
        message: "Subscription updated successfully",
        subscription: data?.[0],
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } else {
    // Create new subscription
    const { data, error } = await supabaseClient
      .from("subscriptions")
      .insert({
        user_id: user.id,
        plan_id: planId,
        amount: planPrices[planId] || 0,
        current_period_start: now.toISOString(),
        current_period_end: endDate.toISOString(),
        status: "active",
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .select();

    if (error) throw error;

    return new Response(
      JSON.stringify({
        message: "Subscription created successfully",
        subscription: data?.[0],
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

async function cancelSubscription(supabaseClient: any, userId: string) {
  const { data, error } = await supabaseClient
    .from("subscriptions")
    .update({
      status: "canceled",
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select();

  if (error) throw error;

  return new Response(
    JSON.stringify({
      message: "Subscription canceled successfully",
      subscription: data?.[0],
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}

async function handleWebhook(supabaseClient: any, payload: WebhookPayload) {
  // In a real implementation, this would handle webhook events from Stripe
  // For example, updating subscription status when payments succeed or fail

  console.log("Received webhook:", payload.type);

  // Implement webhook handling logic here
  // Example for subscription updated event:
  if (payload.type === "customer.subscription.updated") {
    const subscriptionData = payload.data;

    // Update subscription in database
    // const { error } = await supabaseClient
    //   .from('subscriptions')
    //   .update({
    //     status: subscriptionData.status,
    //     current_period_end: new Date(subscriptionData.current_period_end * 1000).toISOString(),
    //     updated_at: new Date().toISOString()
    //   })
    //   .eq('subscription_id', subscriptionData.id);

    // if (error) throw error;
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

function methodNotAllowed() {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    headers: { "Content-Type": "application/json" },
    status: 405,
  });
}
