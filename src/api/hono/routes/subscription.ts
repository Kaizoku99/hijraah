import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { ResourceType, SubscriptionTier, getUserRateUsage, getUserRateLimits } from '../middleware/subscription-rate-limit';
import { requireAuth } from '../middleware/auth';

// Define the subscription routes
const app = new Hono();

// Require authentication for all subscription routes
app.use('*', requireAuth);

// Schema for updating subscription plan
const updatePlanSchema = z.object({
  plan: z.enum([
    SubscriptionTier.FREE,
    SubscriptionTier.BASIC,
    SubscriptionTier.PROFESSIONAL,
    SubscriptionTier.ENTERPRISE,
  ]),
});

// Schema for creating checkout session
const checkoutSessionSchema = z.object({
  plan: z.enum([
    SubscriptionTier.BASIC,
    SubscriptionTier.PROFESSIONAL,
    SubscriptionTier.ENTERPRISE,
  ]),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

/**
 * Get current user's subscription plan
 */
app.get('/current', async (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({
      success: false,
      error: 'User not found',
    }, 404);
  }
  
  // Get plan from user metadata
  const metadata = user.app_metadata || user.user_metadata || {};
  const plan = metadata.subscription_tier || SubscriptionTier.FREE;
  
  // Get subscription expiration from metadata if available
  const subscriptionExpires = metadata.subscription_expires ? new Date(metadata.subscription_expires) : null;
  
  return c.json({
    success: true,
    data: {
      plan,
      isActive: true,
      subscriptionExpires,
      createdAt: metadata.subscription_created || null,
    },
  });
});

/**
 * Get current usage for all resource types
 */
app.get('/usage', async (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({
      success: false,
      error: 'User not found',
    }, 404);
  }
  
  // Get user's subscription tier
  const metadata = user.app_metadata || user.user_metadata || {};
  const plan = metadata.subscription_tier || SubscriptionTier.FREE;
  
  // Get usage for each resource type
  const apiUsage = await getUserRateUsage(user.id, ResourceType.API);
  const scrapingUsage = await getUserRateUsage(user.id, ResourceType.SCRAPING);
  const vectorUsage = await getUserRateUsage(user.id, ResourceType.VECTOR);
  const researchUsage = await getUserRateUsage(user.id, ResourceType.RESEARCH);
  
  // Get limits for the user's subscription tier
  const limits = await getUserRateLimits(user.id, plan as SubscriptionTier);
  
  return c.json({
    success: true,
    data: {
      plan,
      api: {
        used: apiUsage.day,
        limit: limits[ResourceType.API].requestsPerDay,
      },
      scraping: {
        used: scrapingUsage.day,
        limit: limits[ResourceType.SCRAPING].requestsPerDay,
      },
      vector: {
        used: vectorUsage.day,
        limit: limits[ResourceType.VECTOR].requestsPerDay,
      },
      research: {
        used: researchUsage.day,
        limit: limits[ResourceType.RESEARCH].requestsPerDay,
      },
    },
  });
});

/**
 * Update subscription plan
 * Only allows downgrading to FREE plan directly
 * Paid plans must use the checkout endpoint
 */
app.put('/plan', zValidator('json', updatePlanSchema), async (c) => {
  const user = c.get('user');
  const supabase = c.get('supabase');
  const { plan } = await c.req.json();
  
  // Only allow free plan to be set directly
  if (plan !== SubscriptionTier.FREE) {
    return c.json({
      success: false,
      error: 'Upgrading to paid plans must be done through the checkout process',
    }, 400);
  }
  
  try {
    // Update user metadata
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      app_metadata: {
        ...user.app_metadata,
        subscription_tier: plan,
        subscription_updated: new Date().toISOString(),
      },
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return c.json({
      success: true,
      data: {
        plan,
        message: 'Subscription plan updated successfully',
      },
    });
  } catch (error: any) {
    console.error('Error updating subscription plan:', error);
    
    return c.json({
      success: false,
      error: error.message || 'Failed to update subscription plan',
    }, 500);
  }
});

/**
 * Create checkout session for paid plans
 * This is a placeholder implementation - in production this would integrate with Stripe, Paddle, etc.
 */
app.post('/checkout', zValidator('json', checkoutSessionSchema), async (c) => {
  const user = c.get('user');
  const { plan, successUrl, cancelUrl } = await c.req.json();
  
  try {
    // In a real implementation, this would create a checkout session with a payment provider
    // For now, we'll just return a mock checkout URL
    
    // Create a dummy checkout URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const checkoutId = Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
    
    const checkoutUrl = `${baseUrl}/api/mock-checkout?` + new URLSearchParams({
      plan,
      userId: user.id,
      checkoutId,
      success: successUrl || `${baseUrl}/settings/subscription?success=true`,
      cancel: cancelUrl || `${baseUrl}/settings/subscription?canceled=true`,
    }).toString();
    
    return c.json({
      success: true,
      data: {
        checkoutUrl,
        plan,
      },
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    
    return c.json({
      success: false,
      error: error.message || 'Failed to create checkout session',
    }, 500);
  }
});

/**
 * List available subscription plans
 */
app.get('/plans', async (c) => {
  return c.json({
    success: true,
    data: {
      plans: [
        {
          id: SubscriptionTier.FREE,
          name: 'Free',
          description: 'Free tier with limited access',
          price: 0,
          features: {
            apiRequestsPerDay: 5000,
            scrapingRequestsPerDay: 50,
            vectorSearchRequestsPerDay: 500,
            researchSessionsPerDay: 20,
          },
        },
        {
          id: SubscriptionTier.BASIC,
          name: 'Basic',
          description: 'Basic tier for individuals',
          price: 19,
          features: {
            apiRequestsPerDay: 10000,
            scrapingRequestsPerDay: 500,
            vectorSearchRequestsPerDay: 3000,
            researchSessionsPerDay: 100,
          },
        },
        {
          id: SubscriptionTier.PROFESSIONAL,
          name: 'Professional',
          description: 'Professional tier for small teams',
          price: 49,
          features: {
            apiRequestsPerDay: 50000,
            scrapingRequestsPerDay: 5000,
            vectorSearchRequestsPerDay: 10000,
            researchSessionsPerDay: 1000,
          },
        },
        {
          id: SubscriptionTier.ENTERPRISE,
          name: 'Enterprise',
          description: 'Enterprise tier for large organizations',
          price: null, // Custom pricing
          features: {
            apiRequestsPerDay: 200000,
            scrapingRequestsPerDay: 20000,
            vectorSearchRequestsPerDay: 50000,
            researchSessionsPerDay: 10000,
          },
        },
      ],
    },
  });
});

// Function to handle webhook events from payment providers
// This is a placeholder and would be implemented in production
app.post('/webhook', async (c) => {
  const supabase = c.get('supabase');
  
  // Example implementation - verify signature, parse event
  try {
    const body = await c.req.json();
    const signature = c.req.header('Stripe-Signature') || '';
    
    // In production, verify the signature using crypto
    // const isValid = verifyStripeSignature(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    const isValid = true; // Placeholder
    
    if (!isValid) {
      return c.json({
        success: false,
        error: 'Invalid signature',
      }, 400);
    }
    
    // Process the event
    const event = body;
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        // Update user's subscription
        const userId = event.data.object.client_reference_id;
        const plan = event.data.object.metadata.plan;
        
        if (userId && plan) {
          // Update user metadata in Supabase
          await supabase.auth.admin.updateUserById(userId, {
            app_metadata: {
              subscription_tier: plan,
              subscription_created: new Date().toISOString(),
              subscription_expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
              customer_id: event.data.object.customer,
              subscription_id: event.data.object.subscription,
            },
          });
        }
        break;
        
      case 'customer.subscription.updated':
        // Handle subscription updates
        break;
        
      case 'customer.subscription.deleted':
        // Handle subscription cancellations
        const customerId = event.data.object.customer;
        
        // Find user by customer ID and downgrade to free
        const { data: users } = await supabase
          .from('users')
          .select('id, app_metadata')
          .eq('app_metadata->customer_id', customerId)
          .single();
          
        if (users?.id) {
          await supabase.auth.admin.updateUserById(users.id, {
            app_metadata: {
              ...users.app_metadata,
              subscription_tier: SubscriptionTier.FREE,
              subscription_expires: new Date().toISOString(),
            },
          });
        }
        break;
    }
    
    return c.json({
      success: true,
      message: 'Webhook received',
    });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    
    return c.json({
      success: false,
      error: error.message || 'Failed to process webhook',
    }, 500);
  }
});

export const subscriptionRoutes = app; 