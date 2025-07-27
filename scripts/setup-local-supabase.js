/**
 * Script to set up the local Supabase environment for the Hijraah immigration platform.
 * This script creates the necessary database schema, seeds initial data, and sets up edge functions.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Color coding for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

// Helper function to print colorful messages
function print(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Helper function to run shell commands
function runCommand(command, errorMessage = "Command failed") {
  try {
    print(`Running: ${command}`, colors.cyan);
    execSync(command, { stdio: "inherit" });
    return true;
  } catch (error) {
    print(`${errorMessage}: ${error.message}`, colors.red);
    return false;
  }
}

// Create .env.local.dev file if it doesn't exist
function createLocalEnvFile() {
  const envFilePath = path.join(process.cwd(), ".env.local.dev");

  if (!fs.existsSync(envFilePath)) {
    print("Creating .env.local.dev file...", colors.yellow);

    const envContent = `# Local Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTl9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5OX0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
OPENAI_API_KEY=your-openai-api-key-here

# Development settings
NODE_ENV=development
NEXT_PUBLIC_ENVIRONMENT=development
`;

    fs.writeFileSync(envFilePath, envContent);
    print(".env.local.dev file created successfully!", colors.green);
    print(
      "IMPORTANT: Update the OPENAI_API_KEY in .env.local.dev with your actual key.",
      colors.yellow,
    );
  } else {
    print(".env.local.dev already exists, skipping creation.", colors.yellow);
  }

  return true;
}

// Main function to set up Supabase local environment
async function setupLocalSupabase() {
  print("===== Setting up local Supabase environment =====", colors.magenta);

  // Step 1: Check if Supabase is initialized
  if (!fs.existsSync(path.join(process.cwd(), "supabase", "config.toml"))) {
    print(
      "Supabase is not initialized. Running supabase init...",
      colors.yellow,
    );
    if (!runCommand("npx supabase init", "Failed to initialize Supabase")) {
      return;
    }
  }

  // Step 2: Create local environment file
  if (!createLocalEnvFile()) {
    return;
  }

  // Step 3: Start Supabase if it's not already running
  print("Starting Supabase local services...", colors.blue);
  runCommand("npx supabase start", "Failed to start Supabase");

  // Step 4: Create database schema
  print("Setting up database schema...", colors.blue);

  // Create SQL directory if it doesn't exist
  const sqlDir = path.join(process.cwd(), "supabase", "migrations");
  if (!fs.existsSync(sqlDir)) {
    fs.mkdirSync(sqlDir, { recursive: true });
  }

  // Create initial schema file
  const schemaFile = path.join(sqlDir, "00001_initial_schema.sql");
  if (!fs.existsSync(schemaFile)) {
    print("Creating initial schema file...", colors.yellow);

    const schemaContent = `-- Create tables for the Hijraah immigration platform

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  password_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Immigration cases
CREATE TABLE IF NOT EXISTS public.immigration_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  case_id UUID REFERENCES public.immigration_cases(id),
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages in conversations
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) NOT NULL,
  user_id UUID REFERENCES public.users(id),
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attachments to messages
CREATE TABLE IF NOT EXISTS public.attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(id) NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Document categories
CREATE TABLE IF NOT EXISTS public.document_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES public.immigration_cases(id) NOT NULL,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  category_id UUID REFERENCES public.document_categories(id),
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research sessions
CREATE TABLE IF NOT EXISTS public.research_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  query TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research findings
CREATE TABLE IF NOT EXISTS public.research_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.research_sessions(id) NOT NULL,
  source_url TEXT,
  source_title TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research reports
CREATE TABLE IF NOT EXISTS public.research_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.research_sessions(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.immigration_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_reports ENABLE ROW LEVEL SECURITY;

-- Users can see their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Cases are viewable by their owners
CREATE POLICY "Cases are viewable by owners" ON public.immigration_cases
  FOR SELECT USING (auth.uid() = user_id);

-- Cases can be created by authenticated users
CREATE POLICY "Cases can be created by authenticated users" ON public.immigration_cases
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Cases can be updated by their owners
CREATE POLICY "Cases can be updated by owners" ON public.immigration_cases
  FOR UPDATE USING (auth.uid() = user_id);

-- Document categories are viewable by all authenticated users
CREATE POLICY "Document categories viewable by authenticated users" ON public.document_categories
  FOR SELECT USING (auth.role() = 'authenticated');

-- Seed initial document categories
INSERT INTO public.document_categories (name, description)
VALUES 
  ('Identification', 'Personal identification documents like passports, birth certificates'),
  ('Financial', 'Financial documents like bank statements, tax returns'),
  ('Legal', 'Legal documents like court orders, legal notices'),
  ('Immigration', 'Immigration-specific documents like visas, immigration forms'),
  ('Employment', 'Employment documents like offer letters, employment contracts')
ON CONFLICT DO NOTHING;
`;

    fs.writeFileSync(schemaFile, schemaContent);
    print("Initial schema file created!", colors.green);
  }

  // Step 5: Apply migrations
  print("Applying database migrations...", colors.blue);
  runCommand("npx supabase db reset", "Failed to apply migrations");

  // Step 6: Generate TypeScript types
  print("Generating TypeScript types...", colors.blue);
  runCommand(
    "npx supabase gen types typescript --local > apps/web/src/types/supabase-gen.ts",
    "Failed to generate TypeScript types",
  );

  print("===== Local Supabase setup completed! =====", colors.green);
  print("");
  print("Next steps:", colors.magenta);
  print("1. Run your Next.js app with: npm run dev:local", colors.yellow);
  print("2. Access Supabase Studio at: http://localhost:54323", colors.yellow);
  print("3. Default login: admin@example.com / admin", colors.yellow);
  print("");
  print("For Edge Functions:", colors.magenta);
  print("- Run: supabase functions serve", colors.yellow);
}

// Run the setup
setupLocalSupabase().catch((err) => {
  print(`Setup failed: ${err.message}`, colors.red);
  process.exit(1);
});
