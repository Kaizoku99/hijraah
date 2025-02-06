-- Insert initial document categories
INSERT INTO document_categories (name, description) VALUES
    ('Identification', 'Personal identification documents like passport, ID cards'),
    ('Education', 'Educational certificates and transcripts'),
    ('Employment', 'Employment-related documents and contracts'),
    ('Financial', 'Financial statements and proof of funds'),
    ('Immigration', 'Immigration forms and previous visas'),
    ('Medical', 'Medical certificates and vaccination records'),
    ('Reference', 'Reference letters and recommendations'),
    ('Other', 'Other supporting documents')
ON CONFLICT (name) DO NOTHING;

-- Insert some test data for development
DO $$
DECLARE
    test_user_id UUID;
    test_case_id UUID;
BEGIN
    -- Create a test user
    INSERT INTO users (
        email,
        password_hash,
        first_name,
        last_name,
        country_of_residence,
        email_verified
    ) VALUES (
        'test@example.com',
        crypt('test123', gen_salt('bf')),
        'Test',
        'User',
        'United States',
        true
    ) RETURNING id INTO test_user_id;

    -- Create a test immigration case
    INSERT INTO immigration_cases (
        user_id,
        case_type,
        destination_country,
        current_stage,
        progress_percentage,
        requirements
    ) VALUES (
        test_user_id,
        'Student Visa',
        'Canada',
        'Document Collection',
        25,
        '{"documents_required": ["passport", "transcripts", "bank_statements"]}'::jsonb
    ) RETURNING id INTO test_case_id;

    -- Create some test tasks
    INSERT INTO tasks (case_id, assigned_to, title, description, due_date, priority) VALUES
        (test_case_id, test_user_id, 'Submit Application', 'Complete and submit visa application form', CURRENT_DATE + INTERVAL '30 days', 1),
        (test_case_id, test_user_id, 'Prepare Documents', 'Gather and organize required documents', CURRENT_DATE + INTERVAL '15 days', 2);

    -- Create a test notification
    INSERT INTO notifications (user_id, type, title, message, priority) VALUES
        (test_user_id, 'reminder', 'Document Submission', 'Remember to submit your documents before the deadline', 2);
END
$$; 