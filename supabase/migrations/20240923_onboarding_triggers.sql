-- Migration: 20240923_onboarding_triggers.sql
-- Description: Creates a trigger to automatically initialize onboarding for new users

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_onboarding (
    user_id, 
    current_step, 
    progress, 
    is_completed, 
    is_active
  )
  VALUES (
    NEW.id, 
    'welcome', 
    0, 
    false, 
    true
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add a comment to explain the trigger
COMMENT ON TRIGGER on_auth_user_created ON auth.users 
  IS 'Automatically creates an onboarding record for new users'; 