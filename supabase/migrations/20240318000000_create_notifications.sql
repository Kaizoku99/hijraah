-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION moddatetime();

-- Create index for faster queries
CREATE INDEX notifications_user_id_idx ON notifications(user_id);
CREATE INDEX notifications_created_at_idx ON notifications(created_at DESC);
CREATE INDEX notifications_read_idx ON notifications(read);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Only allow system to insert notifications
CREATE POLICY "System can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Create function to create a notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id UUID,
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info'
)
RETURNS notifications
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    INSERT INTO notifications (user_id, title, message, type)
    VALUES (p_user_id, p_title, p_message, p_type)
    RETURNING *
  );
END;
$$; 