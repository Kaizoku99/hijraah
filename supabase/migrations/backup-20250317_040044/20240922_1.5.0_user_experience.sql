-- Migration: 20240922_1.5.0_user_experience.sql
-- Description: Implements user onboarding and experience features

-- Register this migration with versioning system
DO $$ 
BEGIN
  -- Only run if the migration_meta schema exists
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'migration_meta') THEN
    PERFORM migration_meta.register_migration(
      1, 5, 0,
      'User experience features including onboarding',
      '20240922_1.5.0_user_experience.sql'
    );
  END IF;
END $$;

-- Create user_onboarding table to track onboarding progress
CREATE TABLE IF NOT EXISTS user_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_step TEXT NOT NULL DEFAULT 'welcome',
  progress SMALLINT NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  hide_for_session BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add comments for documentation
COMMENT ON TABLE user_onboarding IS 'Tracks user progress through the onboarding flow';
COMMENT ON COLUMN user_onboarding.id IS 'Primary key for the onboarding record';
COMMENT ON COLUMN user_onboarding.user_id IS 'Foreign key reference to the auth.users table';
COMMENT ON COLUMN user_onboarding.current_step IS 'Current step in the onboarding flow (e.g., welcome, profile, preferences)';
COMMENT ON COLUMN user_onboarding.progress IS 'Percentage of onboarding completion (0-100)';
COMMENT ON COLUMN user_onboarding.is_completed IS 'Flag indicating if onboarding is fully completed';
COMMENT ON COLUMN user_onboarding.is_active IS 'Flag indicating if onboarding is active for this user';
COMMENT ON COLUMN user_onboarding.hide_for_session IS 'Flag to temporarily hide onboarding for the current session';
COMMENT ON COLUMN user_onboarding.created_at IS 'Timestamp when the onboarding process was started';
COMMENT ON COLUMN user_onboarding.updated_at IS 'Timestamp when the onboarding record was last updated';

-- Create onboarding_actions table to track individual completed actions
CREATE TABLE IF NOT EXISTS onboarding_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_key TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, action_key)
);

-- Add comments for documentation
COMMENT ON TABLE onboarding_actions IS 'Tracks specific onboarding actions completed by users';
COMMENT ON COLUMN onboarding_actions.id IS 'Primary key for the onboarding action record';
COMMENT ON COLUMN onboarding_actions.user_id IS 'Foreign key reference to the auth.users table';
COMMENT ON COLUMN onboarding_actions.action_key IS 'Unique identifier for the completed action (e.g., profile_completed, preferences_set)';
COMMENT ON COLUMN onboarding_actions.completed_at IS 'Timestamp when the action was completed';

-- Create function to mark onboarding actions as completed
CREATE OR REPLACE FUNCTION mark_onboarding_action_completed(action_key TEXT)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
  v_onboarding_exists BOOLEAN;
  v_action_count INTEGER;
  v_total_actions INTEGER := 5; -- Set this to the total number of possible onboarding actions
  v_progress INTEGER;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if user has an onboarding record
  SELECT EXISTS (
    SELECT 1 FROM user_onboarding WHERE user_id = v_user_id
  ) INTO v_onboarding_exists;
  
  -- Create onboarding record if it doesn't exist
  IF NOT v_onboarding_exists THEN
    INSERT INTO user_onboarding (user_id)
    VALUES (v_user_id);
  END IF;
  
  -- Insert or update the action record
  INSERT INTO onboarding_actions (user_id, action_key)
  VALUES (v_user_id, action_key)
  ON CONFLICT (user_id, action_key)
  DO UPDATE SET completed_at = NOW();
  
  -- Count completed actions for this user
  SELECT COUNT(*) INTO v_action_count
  FROM onboarding_actions
  WHERE user_id = v_user_id;
  
  -- Calculate progress percentage
  v_progress := LEAST(100, (v_action_count * 100) / v_total_actions);
  
  -- Update the onboarding progress
  UPDATE user_onboarding
  SET 
    progress = v_progress,
    updated_at = NOW(),
    is_completed = (v_progress = 100)
  WHERE user_id = v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION mark_onboarding_action_completed IS 'Marks a specific onboarding action as completed for the current user';

-- Create function to reset onboarding
CREATE OR REPLACE FUNCTION reset_user_onboarding()
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Delete existing actions
  DELETE FROM onboarding_actions
  WHERE user_id = v_user_id;
  
  -- Reset onboarding state
  UPDATE user_onboarding
  SET 
    current_step = 'welcome',
    progress = 0,
    is_completed = FALSE,
    is_active = TRUE,
    hide_for_session = FALSE,
    updated_at = NOW()
  WHERE user_id = v_user_id;
  
  -- Create record if it doesn't exist
  IF NOT FOUND THEN
    INSERT INTO user_onboarding (user_id)
    VALUES (v_user_id);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION reset_user_onboarding IS 'Resets onboarding progress for the current user';

-- Create function to skip onboarding
CREATE OR REPLACE FUNCTION skip_user_onboarding()
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
  v_onboarding_exists BOOLEAN;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if user has an onboarding record
  SELECT EXISTS (
    SELECT 1 FROM user_onboarding WHERE user_id = v_user_id
  ) INTO v_onboarding_exists;
  
  -- Update existing record
  IF v_onboarding_exists THEN
    UPDATE user_onboarding
    SET 
      is_completed = TRUE,
      progress = 100,
      updated_at = NOW()
    WHERE user_id = v_user_id;
  ELSE
    -- Create a completed record
    INSERT INTO user_onboarding (
      user_id,
      is_completed,
      progress
    )
    VALUES (
      v_user_id,
      TRUE,
      100
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION skip_user_onboarding IS 'Marks onboarding as completed for the current user';

-- Create indices for better performance
CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id ON user_onboarding(user_id);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_is_completed ON user_onboarding(is_completed);
CREATE INDEX IF NOT EXISTS idx_onboarding_actions_user_id ON onboarding_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_actions_action_key ON onboarding_actions(action_key);

-- Add trigger for updated_at timestamp
CREATE TRIGGER update_user_onboarding_updated_at
BEFORE UPDATE ON user_onboarding
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_actions ENABLE ROW LEVEL SECURITY;

-- User Onboarding RLS
CREATE POLICY "Users can view their own onboarding process"
ON user_onboarding
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding process"
ON user_onboarding
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding process"
ON user_onboarding
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Onboarding Actions RLS
CREATE POLICY "Users can view their own onboarding actions"
ON onboarding_actions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding actions"
ON onboarding_actions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create user_preferences table to store user settings
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT NOT NULL DEFAULT 'light',
  font_size TEXT NOT NULL DEFAULT 'medium',
  notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  email_frequency TEXT NOT NULL DEFAULT 'daily' CHECK (email_frequency IN ('never', 'daily', 'weekly', 'monthly')),
  ui_density TEXT NOT NULL DEFAULT 'comfortable' CHECK (ui_density IN ('compact', 'comfortable', 'spacious')),
  sidebar_collapsed BOOLEAN NOT NULL DEFAULT FALSE,
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add comments for documentation
COMMENT ON TABLE user_preferences IS 'Stores user interface and experience preferences';
COMMENT ON COLUMN user_preferences.user_id IS 'Foreign key reference to the auth.users table';
COMMENT ON COLUMN user_preferences.theme IS 'UI theme preference (light, dark, system, etc.)';
COMMENT ON COLUMN user_preferences.font_size IS 'Preferred font size (small, medium, large, etc.)';
COMMENT ON COLUMN user_preferences.notifications_enabled IS 'Whether notifications are enabled';
COMMENT ON COLUMN user_preferences.email_frequency IS 'How often to send email updates';
COMMENT ON COLUMN user_preferences.ui_density IS 'UI density preference';
COMMENT ON COLUMN user_preferences.sidebar_collapsed IS 'Whether the sidebar should be collapsed by default';
COMMENT ON COLUMN user_preferences.timezone IS 'User timezone preference';
COMMENT ON COLUMN user_preferences.created_at IS 'When the preferences were created';
COMMENT ON COLUMN user_preferences.updated_at IS 'When the preferences were last updated';

-- Add trigger for updated_at timestamp
CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON user_preferences
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- User Preferences RLS
CREATE POLICY "Users can view their own preferences"
ON user_preferences
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
ON user_preferences
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
ON user_preferences
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Trigger function to create default preferences for new users
CREATE OR REPLACE FUNCTION create_default_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create default preferences when a user is created
DROP TRIGGER IF EXISTS on_auth_user_created_preferences ON auth.users;
CREATE TRIGGER on_auth_user_created_preferences
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_default_user_preferences(); 