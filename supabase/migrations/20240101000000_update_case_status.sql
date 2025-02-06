-- Update case status type
ALTER TABLE cases DROP CONSTRAINT IF EXISTS cases_status_check;
ALTER TABLE cases ADD CONSTRAINT cases_status_check 
  CHECK (status IN ('active', 'pending', 'in_progress', 'pending_review', 'completed', 'approved', 'rejected', 'archived')); 