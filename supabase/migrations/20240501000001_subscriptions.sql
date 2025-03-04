-- Migration for subscription-related changes

-- Add subscription-related columns to user_profiles table
ALTER TABLE "public"."user_profiles"
ADD COLUMN "subscription_tier" text NOT NULL DEFAULT 'free',
ADD COLUMN "subscription_created_at" timestamptz,
ADD COLUMN "subscription_expires_at" timestamptz,
ADD COLUMN "subscription_status" text NOT NULL DEFAULT 'active',
ADD COLUMN "customer_id" text,
ADD COLUMN "subscription_id" text;

-- Create indexes for faster lookups
CREATE INDEX idx_user_profiles_subscription_tier ON "public"."user_profiles" ("subscription_tier");
CREATE INDEX idx_user_profiles_subscription_status ON "public"."user_profiles" ("subscription_status");
CREATE INDEX idx_user_profiles_customer_id ON "public"."user_profiles" ("customer_id");

-- Create a table to store subscription plans
CREATE TABLE "public"."subscription_plans" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "description" text,
  "price_monthly" integer NOT NULL,
  "price_yearly" integer NOT NULL,
  "features" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE "public"."subscription_plans" ENABLE ROW LEVEL SECURITY;

-- Everyone can read subscription plans
CREATE POLICY "Anyone can read subscription plans" 
ON "public"."subscription_plans" 
FOR SELECT USING (true);

-- Only admins can modify subscription plans
CREATE POLICY "Only admins can modify subscription plans" 
ON "public"."subscription_plans" 
FOR ALL 
USING (
  auth.jwt() ->> 'app_metadata'::text LIKE '%"role":"admin"%' OR 
  auth.jwt() ->> 'app_metadata'::text LIKE '%"admin":true%'
);

-- Create a table to store subscription usage
CREATE TABLE "public"."subscription_usage" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  "resource_type" text NOT NULL,
  "daily_usage" integer NOT NULL DEFAULT 0,
  "weekly_usage" integer NOT NULL DEFAULT 0,
  "monthly_usage" integer NOT NULL DEFAULT 0,
  "last_reset_daily" timestamptz NOT NULL DEFAULT now(),
  "last_reset_weekly" timestamptz NOT NULL DEFAULT now(),
  "last_reset_monthly" timestamptz NOT NULL DEFAULT now(),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  UNIQUE ("user_id", "resource_type")
);

-- Add RLS policies for subscription usage
ALTER TABLE "public"."subscription_usage" ENABLE ROW LEVEL SECURITY;

-- Users can read their own usage
CREATE POLICY "Users can read their own usage" 
ON "public"."subscription_usage" 
FOR SELECT 
USING (auth.uid() = user_id);

-- Admins can read all usage
CREATE POLICY "Admins can read all usage" 
ON "public"."subscription_usage" 
FOR SELECT 
USING (
  auth.jwt() ->> 'app_metadata'::text LIKE '%"role":"admin"%' OR 
  auth.jwt() ->> 'app_metadata'::text LIKE '%"admin":true%'
);

-- System can update usage (using service role)
CREATE POLICY "System can update usage" 
ON "public"."subscription_usage" 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Insert default subscription plans
INSERT INTO "public"."subscription_plans" 
  (id, name, description, price_monthly, price_yearly, features) 
VALUES
  (
    'free', 
    'Free', 
    'Free tier with limited access', 
    0, 
    0, 
    '{"apiRequestsPerDay": 5000, "scrapingRequestsPerDay": 50, "vectorSearchRequestsPerDay": 500, "researchSessionsPerDay": 20}'
  ),
  (
    'basic', 
    'Basic', 
    'Basic tier for individuals', 
    1900, 
    18240, 
    '{"apiRequestsPerDay": 10000, "scrapingRequestsPerDay": 500, "vectorSearchRequestsPerDay": 3000, "researchSessionsPerDay": 100, "dataStorage": "1GB"}'
  ),
  (
    'professional', 
    'Professional', 
    'Professional tier for small teams', 
    4900, 
    47040, 
    '{"apiRequestsPerDay": 50000, "scrapingRequestsPerDay": 5000, "vectorSearchRequestsPerDay": 10000, "researchSessionsPerDay": 1000, "dataStorage": "10GB", "customDomains": true}'
  ),
  (
    'enterprise', 
    'Enterprise', 
    'Enterprise tier for large organizations', 
    0, 
    0, 
    '{"apiRequestsPerDay": 200000, "scrapingRequestsPerDay": 20000, "vectorSearchRequestsPerDay": 50000, "researchSessionsPerDay": 10000, "dataStorage": "100GB+", "customDomains": true, "dedicatedSupport": true, "sla": true}'
  );

-- Create a function to reset daily usage at midnight UTC
CREATE OR REPLACE FUNCTION reset_daily_usage()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE "public"."subscription_usage"
  SET daily_usage = 0, 
      last_reset_daily = now()
  WHERE date_trunc('day', last_reset_daily) < date_trunc('day', now());
END;
$$; 