import { zValidator } from "@hono/zod-validator";
import { Hono, Context } from "hono";
import { z } from "zod";

import type { AppEnv } from "@/app/api/[[...route]]/route"; // Import AppEnv
import { supabase } from "@/lib/supabase/client"; // Use main supabase client (check if admin needed)
// Placeholder/Example Tier enum - Adjust based on actual core types
// Might need to import from @/infrastructure/rate-limit/config or core types
enum SubscriptionTier {
  FREE = "free",
  BASIC = "basic",
  PROFESSIONAL = "professional",
  ENTERPRISE = "enterprise",
}

// Define the subscription setup function
export function setupSubscriptionRoutes(app: Hono<AppEnv>) {
  const subApi = new Hono<AppEnv>();

  // Auth should be applied in the main app to /subscription/*

  // Schemas
  const updatePlanSchema = z.object({
    plan: z.nativeEnum(SubscriptionTier),
  });

  const checkoutSessionSchema = z.object({
    plan: z
      .nativeEnum(SubscriptionTier)
      .refine((p) => p !== SubscriptionTier.FREE), // Exclude FREE
    successUrl: z.string().url().optional(),
    cancelUrl: z.string().url().optional(),
  });

  /**
   * Get current user's subscription plan
   */
  subApi.get("/current", async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    // Get plan from user metadata (app_metadata is preferred for admin-set data)
    const metadata = user.app_metadata || {};
    const plan = metadata.subscription_tier || SubscriptionTier.FREE;
    const expires = metadata.subscription_expires
      ? new Date(metadata.subscription_expires)
      : null;
    const created = metadata.subscription_created || null;

    // Determine isActive based on expiration
    const isActive = !expires || expires > new Date();

    return c.json({
      success: true,
      data: {
        plan,
        isActive,
        subscriptionExpires: expires?.toISOString() ?? null,
        createdAt: created,
      },
    });
  });

  // /**
  //  * GET /usage - Temporarily removed due to missing helper functions
  //  * Needs re-implementation based on RateLimitService or other tracking mechanism.
  //  */
  // subApi.get('/usage', async (c: Context<AppEnv>) => {
  //   // ... implementation needed ...
  // });

  /**
   * Update subscription plan (Downgrade to FREE only)
   */
  subApi.put(
    "/plan",
    zValidator("json", updatePlanSchema),
    async (c: Context<AppEnv>) => {
      const user = c.get("user");
      if (!user) return c.json({ error: "Unauthorized" }, 401);

      const { plan } = c.req.valid("json") as z.infer<typeof updatePlanSchema>;

      if (plan !== SubscriptionTier.FREE) {
        return c.json({ error: "Upgrades require checkout" }, 400);
      }

      try {
        // IMPORTANT: Updating app_metadata requires Supabase Admin privileges.
        // The imported `supabase` client might need to be the service_role client.
        // Or this needs to be called from a trusted server environment / edge function.
        // Assuming `supabase` has necessary privileges for now.
        const { error } = await supabase.auth.admin.updateUserById(user.id, {
          app_metadata: {
            ...user.app_metadata,
            subscription_tier: plan,
            subscription_expires: null, // Clear expiration for free tier
            subscription_updated: new Date().toISOString(),
          },
        });
        if (error) throw error;

        return c.json({ success: true, data: { plan } });
      } catch (error: any) {
        console.error("Error updating subscription plan:", error);
        return c.json({ error: error.message || "Failed to update plan" }, 500);
      }
    },
  );

  /**
   * Create checkout session (Placeholder)
   */
  subApi.post(
    "/checkout",
    zValidator("json", checkoutSessionSchema),
    async (c: Context<AppEnv>) => {
      const user = c.get("user");
      if (!user) return c.json({ error: "Unauthorized" }, 401);

      const { plan, successUrl, cancelUrl } = c.req.valid("json") as z.infer<
        typeof checkoutSessionSchema
      >;

      try {
        // Placeholder: Generate mock checkout URL
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const checkoutId = Date.now().toString(36);
        const checkoutUrl = `${baseUrl}/mock-checkout?id=${checkoutId}&plan=${plan}&user=${user.id}`;
        // In reality, call Stripe API here

        console.log(
          `Mock Checkout URL for user ${user.id}, plan ${plan}: ${checkoutUrl}`,
        );

        return c.json({ success: true, data: { checkoutUrl, plan } });
      } catch (error: any) {
        console.error("Error creating checkout session:", error);
        return c.json(
          { error: error.message || "Failed to create checkout" },
          500,
        );
      }
    },
  );

  /**
   * List available plans
   */
  subApi.get("/plans", async (c) => {
    // Ideally, plan details (features, limits) should come from a central config
    // Possibly related to `@/infrastructure/rate-limit/config.ts`
    // Returning hardcoded data for now
    return c.json({
      success: true,
      data: {
        plans: [
          {
            id: "free",
            name: "Free",
            price: 0,
            features: ["Basic API Access"],
          },
          {
            id: "basic",
            name: "Basic",
            price: 19,
            features: ["Increased Limits"],
          },
          {
            id: "professional",
            name: "Professional",
            price: 49,
            features: ["Higher Limits", "Team Features"],
          },
          {
            id: "enterprise",
            name: "Enterprise",
            price: null,
            features: ["Custom Limits", "Support"],
          },
        ],
      },
    });
  });

  /**
   * Webhook Handler (Placeholder)
   */
  subApi.post("/webhook", async (c: Context<AppEnv>) => {
    // No auth needed for webhook typically (signature verification instead)
    try {
      const rawBody = await c.req.text(); // Need raw body for signature verification
      const signature = c.req.header("Stripe-Signature");
      // TODO: Implement signature verification (e.g., using stripe.webhooks.constructEvent)
      const event = JSON.parse(rawBody); // Parse after verification

      console.log("Received webhook event:", event.type);

      // IMPORTANT: Use Admin client for user updates triggered by webhook
      // const adminSupabase = createSupabaseAdminClient(); // Need admin client

      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object;
          const userId = session.client_reference_id;
          const plan = session.metadata?.plan as SubscriptionTier | undefined;
          const customerId = session.customer;
          const subscriptionId = session.subscription;

          if (userId && plan && customerId && subscriptionId) {
            console.log(`Updating user ${userId} to plan ${plan}`);
            // await adminSupabase.auth.admin.updateUserById(userId, { ... });
          } else {
            console.error("Webhook missing data for checkout completion", {
              userId,
              plan,
              customerId,
              subscriptionId,
            });
          }
          break;
        // Add other cases: invoice.paid, customer.subscription.deleted, etc.
      }

      return c.json({ received: true });
    } catch (error: any) {
      console.error("Webhook processing error:", error);
      return c.json({ error: "Webhook processing failed" }, 400);
    }
  });

  // Mount under /subscription
  app.route("/subscription", subApi);
}
