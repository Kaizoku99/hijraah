# Hijraah - Feature Prioritization and Database Design

## 1. MoSCoW Feature Analysis

### Must-haves (MVP Requirements)

#### Core AI Chat System

- Basic chat interface with AI assistant
- Immigration process guidance
- Document requirement information
- Basic eligibility checking
- Error handling and fallbacks
- Chat history persistence

#### User Management

- User registration and authentication
- Basic profile management
- Session handling
- Password reset functionality
- Email verification

#### Document Management

- Secure document upload
- Basic document categorization
- Document storage
- Basic search functionality
- Document deletion

#### Case Management

- Basic case creation
- Status tracking
- Timeline view
- Document checklist
- Basic progress tracking

#### Security Features

- Data encryption
- Secure authentication
- Basic access control
- Privacy compliance
- Secure file storage

### Should-haves (High Priority)

#### Enhanced AI Features

- Multi-turn conversation context
- Personalized recommendations
- Multiple language support
- Response accuracy improvements
- Integration with external immigration data

#### Document Features

- Document validation
- Version control
- Document sharing
- Advanced search
- Document expiry tracking

#### Assessment Tools

- Detailed eligibility calculator
- Points calculator
- Requirements checker
- Cost calculator
- Timeline estimator

#### User Experience

- Dashboard customization
- Progress visualization
- Notification system
- Mobile responsiveness
- Saved preferences

### Could-haves (Desired)

#### Advanced Features

- Document translation
- OCR functionality
- Professional network
- Resource library
- Community forum

#### Integration Features

- Calendar integration
- Payment processing
- Email notifications
- SMS alerts
- Third-party API integrations

#### Analytics

- Usage tracking
- Performance metrics
- User feedback analysis
- Success rate tracking
- ROI calculator

#### Administration

- Admin dashboard
- User management
- Content management
- Analytics dashboard
- System monitoring

### Won't-haves (Out of Scope)

#### Features

- Legal representation
- Direct visa application submission
- Immigration authority integration
- Physical document storage
- In-person consultations

#### Services

- Travel arrangements
- Housing assistance
- Job placement
- Bank account setup
- Insurance services

## 2. Database Design

### Core Tables

#### users

Purpose: Store user account information and profiles

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    country_of_residence VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'active',
    email_verified BOOLEAN DEFAULT false,
    profile_data JSONB
);
```

#### immigration_cases

Purpose: Track individual immigration cases and their progress

```sql
CREATE TABLE immigration_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    case_type VARCHAR(50) NOT NULL,
    destination_country VARCHAR(100) NOT NULL,
    current_stage VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    target_date DATE,
    requirements JSONB,
    notes TEXT,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

#### documents

Purpose: Manage uploaded documents and their metadata

```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES immigration_cases(id),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    storage_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at DATE,
    metadata JSONB,
    version INTEGER DEFAULT 1,
    CONSTRAINT fk_case
        FOREIGN KEY(case_id)
        REFERENCES immigration_cases(id)
        ON DELETE CASCADE
);
```

#### chat_sessions

Purpose: Store AI chat interactions and context

```sql
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    case_id UUID REFERENCES immigration_cases(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    context JSONB,
    metadata JSONB,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

#### chat_messages

Purpose: Store individual chat messages

```sql
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES chat_sessions(id),
    role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB,
    CONSTRAINT fk_session
        FOREIGN KEY(session_id)
        REFERENCES chat_sessions(id)
        ON DELETE CASCADE
);
```

### Supporting Tables

#### eligibility_assessments

Purpose: Store user eligibility assessments and results

```sql
CREATE TABLE eligibility_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    case_id UUID REFERENCES immigration_cases(id),
    assessment_type VARCHAR(50) NOT NULL,
    score INTEGER,
    results JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    valid_until DATE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

#### tasks

Purpose: Track immigration process tasks and deadlines

```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES immigration_cases(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    status VARCHAR(20) DEFAULT 'pending',
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_case
        FOREIGN KEY(case_id)
        REFERENCES immigration_cases(id)
        ON DELETE CASCADE
);
```

#### notifications

Purpose: Manage system notifications and alerts

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP WITH TIME ZONE,
    action_url VARCHAR(255),
    priority INTEGER DEFAULT 1,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

### Audit Tables

#### activity_logs

Purpose: Track user activities and system events

```sql
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB
);
```

### Relationships Overview

1. One-to-Many Relationships:

   - User → Immigration Cases
   - User → Documents
   - User → Chat Sessions
   - Immigration Case → Documents
   - Immigration Case → Tasks
   - Chat Session → Chat Messages

2. Many-to-One Relationships:

   - Documents → Immigration Case
   - Tasks → Immigration Case
   - Chat Messages → Chat Session
   - Notifications → User

3. Optional Relationships:
   - Documents can be associated with either a case or user directly
   - Chat sessions can be associated with a specific case or be general inquiries

### Indexes

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);

-- Immigration Cases
CREATE INDEX idx_cases_user ON immigration_cases(user_id);
CREATE INDEX idx_cases_status ON immigration_cases(status);
CREATE INDEX idx_cases_type ON immigration_cases(case_type);

-- Documents
CREATE INDEX idx_documents_case ON documents(case_id);
CREATE INDEX idx_documents_user ON documents(user_id);
CREATE INDEX idx_documents_type ON documents(type);

-- Chat Sessions
CREATE INDEX idx_chat_sessions_user ON chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_case ON chat_sessions(case_id);

-- Chat Messages
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_timestamp ON chat_messages(timestamp);

-- Tasks
CREATE INDEX idx_tasks_case ON tasks(case_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read_at);
```
