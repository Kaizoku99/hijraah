import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { logger } from '@/lib/logger';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  logger.info('Initializing Stripe within webhook POST handler...');
  logger.info(`STRIPE_SECRET_KEY availability: ${!!process.env.STRIPE_SECRET_KEY}`);
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    logger.error('Stripe environment variables (STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET) are missing!');
    return NextResponse.json({ error: 'Stripe configuration error' }, { status: 500 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia',
  });
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  logger.info('Stripe initialized successfully within webhook POST handler.');

  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (userId) {
          const { error } = await supabase.auth.admin.updateUserById(userId, {
            user_metadata: {
              subscription_status: 'active',
              stripe_customer_id: session.customer as string,
              subscription_plan: session.metadata?.plan,
            }
          });

          if (error) throw error;
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by stripe customer ID and update
        const { data: { users }, error: findError } = await supabase.auth.admin.listUsers();
        const user = users.find(u => u.user_metadata?.stripe_customer_id === customerId);

        if (user && !findError) {
          const { error } = await supabase.auth.admin.updateUserById(user.id, {
            user_metadata: {
              subscription_status: 'inactive',
              subscription_plan: null,
            }
          });

          if (error) throw error;
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Error handling Stripe webhook:', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    return NextResponse.json(
      { error: 'Error handling webhook' },
      { status: 400 }
    );
  }
}