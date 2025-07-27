import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { logger } from "@/lib/logger";

// REMOVE Stripe initialization from module scope
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//  apiVersion: '2024-11-20.acacia',
// });

export async function POST(req: Request) {
  // Initialize Stripe inside the handler
  logger.info("Initializing Stripe within POST handler...");
  logger.info(
    `STRIPE_SECRET_KEY availability: ${!!process.env.STRIPE_SECRET_KEY}`,
  );
  if (!process.env.STRIPE_SECRET_KEY) {
    logger.error("STRIPE_SECRET_KEY is missing!");
    return NextResponse.json(
      { error: "Stripe configuration error" },
      { status: 500 },
    );
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia", // Keep original or update if needed
  });
  logger.info("Stripe initialized successfully within POST handler.");

  try {
    const { priceId, userId } = await req.json();
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      },
    );

    // Get user's email from auth
    // Get user's email from Supabase
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(userId);

    if (userError || !user?.email)
      throw userError || new Error("User email not found");

    // Create Stripe checkout session (uses the locally initialized 'stripe' instance)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      customer_email: user.email,
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    logger.error("Error creating Stripe session:", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 },
    );
  }
}
