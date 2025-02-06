-- Create eligibility_assessments table with enhanced tracking
CREATE TABLE eligibility_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    case_id UUID REFERENCES immigration_cases(id),
    assessment_type VARCHAR(50) NOT NULL,
    score INTEGER,
    results JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    valid_until DATE,
    status VARCHAR(20) DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_case 
        FOREIGN KEY(case_id) 
        REFERENCES immigration_cases(id) 
        ON DELETE CASCADE
);

-- Create tasks table with enhanced tracking
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES immigration_cases(id),
    assigned_to UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    status VARCHAR(20) DEFAULT 'pending',
    priority INTEGER DEFAULT 1,
    progress_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_case 
        FOREIGN KEY(case_id) 
        REFERENCES immigration_cases(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_assigned_to 
        FOREIGN KEY(assigned_to) 
        REFERENCES users(id) 
        ON DELETE SET NULL,
    CONSTRAINT check_progress 
        CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    CONSTRAINT check_priority 
        CHECK (priority >= 1 AND priority <= 5)
);

-- Create notifications table with enhanced features
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP WITH TIME ZONE,
    action_url VARCHAR(255),
    priority INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    CONSTRAINT check_priority 
        CHECK (priority >= 1 AND priority <= 5)
);

-- Create activity_logs table with enhanced tracking
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE
);

-- Create indexes for supporting features
CREATE INDEX idx_assessments_user ON eligibility_assessments(user_id);
CREATE INDEX idx_assessments_case ON eligibility_assessments(case_id);
CREATE INDEX idx_assessments_type ON eligibility_assessments(assessment_type);
CREATE INDEX idx_tasks_case ON tasks(case_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read ON notifications(read_at);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_timestamp ON activity_logs(timestamp);

-- Add updated_at triggers
CREATE TRIGGER update_assessments_updated_at
    BEFORE UPDATE ON eligibility_assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 