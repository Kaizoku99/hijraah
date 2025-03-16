-- 20240950_1.22.0_consolidated_fixes.sql
-- A consolidated migration file that combines all previous fixes into one

BEGIN;

-- Register this migration
DO $$
DECLARE
    migration_id INTEGER;
BEGIN
    -- Register migration
    SELECT migration_meta.register_migration(
        1, 22, 0,
        'Consolidated fixes for various issues',
        '20240950_1.22.0_consolidated_fixes.sql'
    ) INTO migration_id;
    
    -- Log the start of the process
    PERFORM migration_meta.log_migration(
        migration_id, 
        'INFO', 
        'Starting consolidated fixes migration'
    );

    -- =====================================================
    -- Fix 1: Storage Policies Fix (from 1.12.0)
    -- =====================================================
    DO $STORAGE_POLICIES$
    BEGIN
        -- Check if storage schema exists
        IF EXISTS (
            SELECT 1 
            FROM information_schema.schemata 
            WHERE schema_name = 'storage'
        ) THEN
            -- Fix avatar bucket policy if it exists
            DROP POLICY IF EXISTS "Avatar access" ON storage.objects;
            
            -- Create proper policy for avatars
            CREATE POLICY "Avatar access" ON storage.objects FOR ALL
            USING (bucket_id = 'avatars' AND (
                -- Either the object belongs to the user
                (storage.foldername(name))[1] = auth.uid()::text OR
                -- Or the object is in a public folder
                (storage.foldername(name))[1] = 'public'
            ));
            
            -- Fix documents bucket policy if it exists
            DROP POLICY IF EXISTS "Documents access" ON storage.objects;
            
            -- Create proper policy for documents
            CREATE POLICY "Documents access" ON storage.objects FOR ALL
            USING (bucket_id = 'documents' AND (
                -- Either the object belongs to the user
                (storage.foldername(name))[1] = auth.uid()::text OR
                -- Or the user is an admin
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND is_admin = true
                )
            ));
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Fixed storage bucket policies'
            );
        ELSE
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Storage schema not found, skipping storage policy fixes'
            );
        END IF;
    EXCEPTION WHEN OTHERS THEN
        PERFORM migration_meta.log_migration(
            migration_id, 
            'ERROR', 
            'Error fixing storage policies: ' || SQLERRM
        );
    END $STORAGE_POLICIES$;

    -- =====================================================
    -- Fix 2: Policy Syntax Fix (from 1.13.0)
    -- =====================================================
    DO $POLICY_SYNTAX$
    BEGIN
        -- Fix any policy that might use incorrect syntax
        
        -- Fix cases table policies if needed
        DROP POLICY IF EXISTS "Cases viewable by owners" ON public.cases;
        CREATE POLICY "Cases viewable by owners" 
        ON public.cases FOR SELECT 
        USING (auth.uid() = user_id);
        
        -- Fix chat_sessions policies if needed
        DROP POLICY IF EXISTS "Chat sessions viewable by owners" ON public.chat_sessions;
        CREATE POLICY "Chat sessions viewable by owners" 
        ON public.chat_sessions FOR SELECT 
        USING (auth.uid() = user_id);
        
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Fixed policy syntax issues'
        );
    EXCEPTION WHEN OTHERS THEN
        PERFORM migration_meta.log_migration(
            migration_id, 
            'WARNING', 
            'Error fixing policy syntax: ' || SQLERRM
        );
    END $POLICY_SYNTAX$;

    -- =====================================================
    -- Fix 3: Admin Column References (from 1.14.0)
    -- =====================================================
    DO $ADMIN_REFS$
    BEGIN
        -- Update the is_admin column in the profiles table if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'is_admin'
        ) THEN
            ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Added is_admin column to profiles table'
            );
        END IF;
        
        -- Create the is_admin helper function
        CREATE OR REPLACE FUNCTION public.is_admin_user()
        RETURNS BOOLEAN AS $$
        DECLARE
            is_admin_result BOOLEAN;
        BEGIN
            -- Check if the current user has admin privileges
            SELECT is_admin INTO is_admin_result
            FROM public.profiles
            WHERE id = auth.uid();
            
            -- Return false if no profile found or not admin
            RETURN COALESCE(is_admin_result, false);
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        COMMENT ON FUNCTION public.is_admin_user() IS 'Checks if the current user has admin privileges by using the correct id column';
        
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Fixed admin column references and created helper function'
        );
    EXCEPTION WHEN OTHERS THEN
        PERFORM migration_meta.log_migration(
            migration_id, 
            'ERROR', 
            'Error fixing admin column references: ' || SQLERRM
        );
    END $ADMIN_REFS$;

    -- =====================================================
    -- Fix 4: Fine-tuning Policy Fix (from 1.15.0)
    -- =====================================================
    DO $FINE_TUNING$
    BEGIN
        -- Drop the problematic policy if it exists
        DROP POLICY IF EXISTS "Fine-tuning jobs viewable by admins" ON public.fine_tuning_jobs;
        
        IF EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'fine_tuning_jobs'
        ) THEN
            -- Create policy using the correct column reference (id instead of user_id)
            CREATE POLICY "Fine-tuning jobs viewable by admins" 
            ON public.fine_tuning_jobs FOR SELECT 
            TO authenticated 
            USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND is_admin = true
                )
            );
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Fixed Fine-tuning jobs policy to use id instead of user_id'
            );
        ELSE
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Table fine_tuning_jobs not found, skipping policy fix'
            );
        END IF;

        -- Fix policy issue in ai_feedback
        DROP POLICY IF EXISTS "AI feedback viewable by admins" ON public.ai_feedback;
        
        IF EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'ai_feedback'
        ) THEN
            -- Recreate with correct column reference
            CREATE POLICY "AI feedback viewable by admins" 
            ON public.ai_feedback FOR SELECT 
            TO authenticated 
            USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND is_admin = true
                )
            );
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Fixed AI feedback policy to use id instead of user_id'
            );
        END IF;

        -- Check and fix policies in llm_models table
        IF EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'llm_models'
        ) THEN
            DROP POLICY IF EXISTS "LLM models viewable by admins" ON public.llm_models;
            
            CREATE POLICY "LLM models viewable by admins" 
            ON public.llm_models FOR SELECT 
            TO authenticated 
            USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND is_admin = true
                )
            );
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Fixed LLM models policy'
            );
        END IF;
    EXCEPTION WHEN OTHERS THEN
        PERFORM migration_meta.log_migration(
            migration_id, 
            'ERROR', 
            'Error fixing fine-tuning policies: ' || SQLERRM
        );
    END $FINE_TUNING$;

    -- Log completion
    PERFORM migration_meta.log_migration(
        migration_id, 
        'INFO', 
        'Completed consolidated fixes migration'
    );
END $$;

COMMIT; 