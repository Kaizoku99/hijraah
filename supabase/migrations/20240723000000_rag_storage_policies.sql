-- Migration: RAG storage policies adjustment
-- Description: Create storage_admin role and policies for documents & chat-attachments buckets

-- 1. Create role
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_roles WHERE rolname = 'storage_admin'
  ) THEN
    CREATE ROLE storage_admin;
  END IF;
END$$;

-- 2. Grant storage_admin privileges on storage schema
GRANT USAGE ON SCHEMA storage TO storage_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON storage.objects TO storage_admin;

-- 3. Ensure service_role can SET ROLE to storage_admin in edge functions
GRANT storage_admin TO service_role;

-- 4. RLS policies to allow authenticated users read their own files, service/storage_admin full access
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_read_own_docs" ON storage.objects
  FOR SELECT USING (
    bucket_id IN ('documents','chat-attachments') AND owner = auth.uid()
  );

CREATE POLICY "storage_admin_full" ON storage.objects
  FOR ALL USING (
    current_role = 'service_role' OR current_role = 'storage_admin'
  ) WITH CHECK (true);

-- 5. Comment
COMMENT ON POLICY authenticated_read_own_docs ON storage.objects IS 'Allow authenticated users to read objects they own in documents and chat-attachments buckets.';
COMMENT ON POLICY storage_admin_full ON storage.objects IS 'Service and storage_admin roles bypass RLS for storage objects.'; 