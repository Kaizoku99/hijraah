-- Test Script for Database Verification

-- 1. Check Document Categories
SELECT COUNT(*) as category_count 
FROM document_categories;

-- 2. Check Test User
SELECT email, first_name, last_name, country_of_residence, email_verified 
FROM users 
WHERE email = 'test@example.com';

-- 3. Check Immigration Case
SELECT c.case_type, c.destination_country, c.current_stage, c.progress_percentage,
       u.email as user_email
FROM immigration_cases c
JOIN users u ON c.user_id = u.id;

-- 4. Check Tasks
SELECT t.title, t.description, t.status, t.priority,
       u.email as assigned_to_email,
       c.case_type as case_type
FROM tasks t
JOIN users u ON t.assigned_to = u.id
JOIN immigration_cases c ON t.case_id = c.id;

-- 5. Check Notifications
SELECT n.type, n.title, n.message, n.priority,
       u.email as user_email
FROM notifications n
JOIN users u ON n.user_id = u.id;

-- 6. Verify Indexes
SELECT schemaname, tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 7. Check Foreign Key Constraints
SELECT
    tc.table_schema, 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_schema = 'public'
ORDER BY tc.table_name; 