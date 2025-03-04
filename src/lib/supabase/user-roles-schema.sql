-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Add role column to auth.users if it doesn't exist
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'user';

-- Create index on role for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON auth.users(role);

-- Create RLS policy to allow users to read their own role
CREATE POLICY "Users can read their own role"
  ON auth.users
  FOR SELECT
  USING (auth.uid() = id);

-- Create RLS policy to allow admins to read all roles
CREATE POLICY "Admins can read all roles"
  ON auth.users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 