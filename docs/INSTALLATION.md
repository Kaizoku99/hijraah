# Installation & Setup Guide

Complete guide to set up Hijraah AI Immigration Assistant for development and production.

## 🔧 **Prerequisites**

### **System Requirements**
- **Node.js:** 18.0.0 or higher
- **pnpm:** 8.0.0 or higher (recommended package manager)
- **PostgreSQL:** 14.0 or higher
- **Redis:** 6.0 or higher

### **Development Tools**
- **Git:** Latest version
- **VS Code:** Recommended IDE with extensions:
  - TypeScript and JavaScript
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter

## 📦 **Quick Installation**

### **1. Clone Repository**
```bash
git clone https://github.com/Kaizoku99/hijraah.git
cd hijraah
```

### **2. Install Dependencies**
```bash
# Install all packages using pnpm workspace
pnpm install

# Alternative: Use npm if pnpm not available
npm install
```

### **3. Environment Setup**
```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables
nano .env.local  # or use your preferred editor
```

### **4. Database Setup**
```bash
# Initialize Supabase local development
pnpm run supabase:setup

# Run database migrations
pnpm run supabase:db:reset

# Generate TypeScript types
pnpm run supabase:types
```

### **5. Start Development Server**
```bash
# Start Next.js development server
pnpm dev

# Start Trigger.dev development (separate terminal)
pnpm run trigger:dev
```

**🎉 Your application should now be running at `http://localhost:3000`**

---

## 🔐 **Environment Configuration**

### **Required Environment Variables**

Create a `.env.local` file in the root directory with the following configuration:

```bash
# ===========================================
# AI PROVIDERS (Required for core functionality)
# ===========================================

# OpenAI API
OPENAI_API_KEY=sk-your_openai_api_key_here

# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-your_anthropic_key_here

# Google AI (Gemini)
GOOGLE_API_KEY=your_google_ai_api_key

# Additional AI Providers (Optional but recommended)
DEEPSEEK_API_KEY=your_deepseek_key
FIREWORKS_API_KEY=your_fireworks_key  
MISTRAL_API_KEY=your_mistral_key

# ===========================================
# DATABASE & STORAGE
# ===========================================

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database URL (for migrations and direct access)
DATABASE_URL=postgresql://postgres:password@localhost:54322/postgres

# ===========================================
# CACHING & VECTOR STORAGE
# ===========================================

# Upstash Redis (for caching)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Upstash Vector (for embeddings)
UPSTASH_VECTOR_REST_URL=https://your-vector.upstash.io  
UPSTASH_VECTOR_REST_TOKEN=your_vector_token

# ===========================================
# BACKGROUND JOBS
# ===========================================

# Trigger.dev Configuration
TRIGGER_PROJECT_ID=your_trigger_project_id
TRIGGER_SECRET_KEY=tr_dev_your_secret_key

# ===========================================
# DOCUMENT PROCESSING
# ===========================================

# Firecrawl (for web scraping)
FIRECRAWL_API_KEY=fc-your_firecrawl_key

# ===========================================
# MONITORING & ANALYTICS
# ===========================================

# Sentry (Error tracking)
SENTRY_DSN=your_sentry_dsn

# Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# ===========================================
# DEVELOPMENT & SECURITY
# ===========================================

# NextAuth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your_nextauth_secret_here

# Application URL
NEXTAUTH_URL=http://localhost:3000

# Admin email for notifications
ADMIN_EMAIL=admin@your-domain.com
```

### **Environment Variable Setup Guide**

#### **1. OpenAI API Key**
1. Visit [OpenAI API Dashboard](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to `OPENAI_API_KEY` in your `.env.local`

#### **2. Anthropic Claude API**
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Generate API key
3. Add to `ANTHROPIC_API_KEY`

#### **3. Supabase Setup**
1. Create project at [Supabase Dashboard](https://app.supabase.com/)
2. Go to Settings → API
3. Copy URL and anon key to respective variables
4. Copy service role key for server-side operations

#### **4. Upstash Redis & Vector**
1. Create account at [Upstash](https://upstash.com/)
2. Create Redis database for caching
3. Create Vector database for embeddings
4. Copy connection URLs and tokens

#### **5. Trigger.dev Setup**
1. Sign up at [Trigger.dev](https://trigger.dev/)
2. Create new project
3. Copy project ID and secret key

---

## 🗄️ **Database Setup**

### **Local Development with Supabase**

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Start local Supabase stack
supabase start

# Run migrations
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > types/supabase.ts
```

### **Database Schema Overview**

The system uses several key tables:

```sql
-- Core Tables
- document_chunks_enhanced     -- RAG document storage with vectors
- kg_entities                 -- Knowledge graph entities
- kg_relationships            -- Entity relationships  
- user_query_history         -- Query tracking and analytics
- rag_query_cache            -- Response caching

-- Authentication & Users
- profiles                   -- User profiles and preferences
- chat_sessions             -- Chat conversation sessions
- chat_messages             -- Individual chat messages

-- Background Jobs
- job_queue                 -- Trigger.dev job tracking
- analytics_events          -- System analytics and monitoring
```

---

## 🧪 **Testing Setup**

### **Run Test Suite**
```bash
# Run all tests
pnpm test

# Run specific test environments
pnpm test:api        # API endpoint tests
pnpm test:core       # Core business logic
pnpm test:security   # Security and vulnerability tests
pnpm test:load       # Load and performance tests

# Run tests with coverage
pnpm test:coverage
```

### **Test Configuration**

The project uses Jest with multiple test environments:

```javascript
// jest.config.cjs
module.exports = {
  projects: [
    {
      displayName: "api",
      testMatch: ["<rootDir>/__tests__/api/**/*.js"],
      testEnvironment: "node"
    },
    {
      displayName: "core", 
      testMatch: ["<rootDir>/__tests__/lib/**/*.ts"],
      testEnvironment: "node"
    },
    {
      displayName: "security",
      testMatch: ["<rootDir>/__tests__/security/**/*.js"], 
      testEnvironment: "node"
    },
    {
      displayName: "load",
      testMatch: ["<rootDir>/__tests__/load/**/*.{js,json}"],
      testEnvironment: "node"
    }
  ]
};
```

---

## 🔧 **Development Workflow**

### **Available Scripts**

```bash
# Development
pnpm dev                    # Start development server
pnpm dev:turbo             # Start with Turbo optimization
pnpm dev:debug             # Start with Node.js debugging

# Building
pnpm build                 # Production build
pnpm build:analyze         # Build with bundle analysis
pnpm start                 # Start production server

# Code Quality
pnpm lint                  # ESLint checking
pnpm lint:fix              # Auto-fix ESLint issues
pnpm type-check            # TypeScript type checking
pnpm format                # Prettier formatting

# Database
pnpm supabase:start        # Start local Supabase
pnpm supabase:stop         # Stop local Supabase
pnpm supabase:types        # Generate TypeScript types
pnpm db:migrate            # Run database migrations

# Background Jobs
pnpm trigger:dev           # Start Trigger.dev development
pnpm trigger:deploy        # Deploy Trigger.dev jobs

# AI & Documentation
pnpm codegen              # GraphQL code generation
pnpm i18n:extract         # Extract translation strings
pnpm docs:generate        # Generate API documentation
```

### **Development Best Practices**

1. **Code Organization**
   - Use absolute imports with `@/` prefix
   - Follow the established folder structure
   - Keep components small and focused

2. **Type Safety**
   - Always use TypeScript
   - Generate types from schemas when possible
   - Use strict mode settings

3. **Testing**
   - Write tests for all new features
   - Use AI-generated test cases for edge cases
   - Maintain >95% code coverage

4. **Performance**
   - Use React Server Components where possible
   - Implement proper caching strategies
   - Monitor bundle size and performance metrics

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Port Already in Use**
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

#### **Database Connection Issues**
```bash
# Reset local Supabase
supabase stop
supabase start

# Check database status
supabase status
```

#### **Environment Variable Issues**
```bash
# Verify environment variables are loaded
node -e "console.log(process.env.OPENAI_API_KEY?.substring(0, 10))"

# Check for common typos in .env.local
cat .env.local | grep -E "API_KEY|URL|TOKEN"
```

#### **Dependency Issues**
```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Next.js cache
rm -rf .next
pnpm dev
```

### **Performance Issues**

1. **Slow API Responses**
   - Check Redis connection and cache hit rates
   - Verify AI provider API quotas
   - Monitor database query performance

2. **High Memory Usage**
   - Check for memory leaks in vector operations
   - Monitor background job processing
   - Review caching strategies

3. **Build Issues**
   - Ensure all environment variables are set
   - Check TypeScript compilation
   - Verify all dependencies are compatible

---

## 📞 **Support & Resources**

### **Documentation**
- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Documentation](docs/API_DOCUMENTATION.md)  
- [Deployment Guide](docs/DEPLOYMENT.md)
- [AI Integration Guide](docs/AI_INTEGRATION.md)

### **Community & Support**
- [GitHub Issues](https://github.com/Kaizoku99/hijraah/issues)
- [GitHub Discussions](https://github.com/Kaizoku99/hijraah/discussions)
- [Contributing Guidelines](CONTRIBUTING.md)

### **External Resources**
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/)

---

**🎉 You're ready to start developing with Hijraah! For any issues, please check the troubleshooting section or create a GitHub issue.**