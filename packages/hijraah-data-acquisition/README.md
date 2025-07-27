# @hijraah/data-acquisition

Comprehensive data acquisition and competitive differentiation system for Hijraah, built with Trigger.dev v4, Supabase, and AI SDK integration.

## 🚀 Features

- **Government Website Scraping**: Automated scraping of immigration policy websites using Firecrawl
- **Policy Change Detection**: Real-time monitoring and intelligent change detection
- **Knowledge Graph Construction**: Entity extraction and relationship mapping
- **Community Data Validation**: Peer review and quality assurance systems
- **Predictive Analytics**: ML-powered success probability and timeline estimation
- **Trigger.dev v4 Integration**: Advanced task orchestration and scheduling
- **Supabase Integration**: Real-time database and authentication
- **AI SDK Integration**: Structured data extraction and analysis

## 📦 Installation

```bash
npm install @hijraah/data-acquisition
```

## 🔧 Configuration

### Environment Variables

```bash
# Trigger.dev
TRIGGER_PROJECT_ID=your_project_id
TRIGGER_SECRET_KEY=your_secret_key

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DATABASE_URL=your_database_url

# External APIs
FIRECRAWL_API_KEY=your_firecrawl_key
OPENAI_API_KEY=your_openai_key

# Optional: Telemetry
AXIOM_API_TOKEN=your_axiom_token
AXIOM_DATASET=hijraah-data-acquisition
```

### Trigger.dev Configuration

The package includes a pre-configured `trigger.config.ts` with:

- Latest v4 patterns and best practices
- External package configuration for optimal bundling
- Telemetry integration with Axiom
- Global lifecycle hooks for monitoring
- Process keep-alive for performance optimization

## 🏗️ Architecture

### Core Components

1. **Base Classes**

   - `BaseWebScraper`: Foundation for web scraping implementations
   - `BaseAPIClient`: HTTP client with rate limiting and retry logic

2. **Interfaces**

   - `DataAcquisitionOrchestrator`: Main orchestration interface
   - `WebScraper`: Web scraping contract
   - `APIClient`: API client contract
   - `PolicyChangeDetector`: Change detection interface
   - `KnowledgeGraphBuilder`: Graph construction interface

3. **Database Schema**
   - Drizzle ORM schema with PostgreSQL support
   - Optimized indexes for performance
   - Relationship definitions for data integrity

### Task Categories

- **Scraping Tasks**: Government website data collection
- **Policy Detection**: Change monitoring and classification
- **Orchestration**: Multi-country coordination
- **Knowledge Graph**: Entity and relationship processing
- **Community Data**: Validation and quality assurance
- **Machine Learning**: Predictive analytics and modeling

## 🚀 Usage

### Basic Setup

```typescript
import {
  createDataAcquisitionConfig,
  BaseWebScraper,
  BaseAPIClient,
} from "@hijraah/data-acquisition";

// Create configuration
const config = createDataAcquisitionConfig({
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
  openaiApiKey: process.env.OPENAI_API_KEY!,
});
```

### Creating Trigger.dev Tasks

```typescript
import { BaseWebScraper } from "@hijraah/data-acquisition";

class GovernmentScraper extends BaseWebScraper {
  protected async performScrape(
    config: ScrapingConfig,
  ): Promise<ScrapingResult> {
    // Implementation specific to government websites
    // ...
  }
}

const scraper = new GovernmentScraper();

// Create Trigger.dev task
const scrapingTask = BaseWebScraper.createScrapingTask(
  "scrape-immigration-policies",
  scraper,
);
```

### Database Operations

```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "@hijraah/data-acquisition";

const db = drizzle(connectionString, { schema });

// Query data sources
const activeSources = await db.query.dataSources.findMany({
  where: eq(schema.dataSources.isActive, true),
});

// Insert collection result
await db.insert(schema.collectionResults).values({
  sourceId: "source-uuid",
  status: "success",
  data: {
    /* scraped data */
  },
  metadata: { itemsCollected: 100, processingTimeMs: 5000 },
});
```

## 🔄 Development Workflow

### Database Management

```bash
# Generate migrations
npm run db:generate

# Apply migrations
npm run db:migrate

# Push schema changes
npm run db:push

# Open Drizzle Studio
npm run db:studio
```

### Trigger.dev Development

```bash
# Start development server
npm run trigger:dev

# Deploy tasks
npm run trigger:deploy
```

### Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📊 Monitoring and Observability

The package includes comprehensive monitoring:

- **Task Execution Tracking**: All task runs are logged to the database
- **Performance Metrics**: Processing times and success rates
- **Error Tracking**: Detailed error logging and categorization
- **Telemetry Integration**: Optional Axiom integration for advanced analytics

## 🔮 Roadmap

### Phase 1: Foundation (Current)

- ✅ Package structure and configuration
- ✅ Base classes and interfaces
- ✅ Database schema
- ✅ Trigger.dev v4 integration

### Phase 2: Core Implementation

- 🔄 Government website scraping tasks
- 🔄 Policy change detection engine
- 🔄 Multi-country orchestration

### Phase 3: Advanced Features

- ⏳ Knowledge graph construction
- ⏳ Community data validation
- ⏳ Predictive analytics

### Phase 4: Intelligence & Optimization

- ⏳ Competitive intelligence monitoring
- ⏳ Advanced document processing
- ⏳ Multi-language support

## 🤝 Contributing

1. Follow the established patterns and interfaces
2. Add comprehensive tests for new functionality
3. Update documentation for API changes
4. Ensure database migrations are backward compatible

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Related Packages

- `@hijraah/mas`: Multi-agent system for immigration analysis
- `@hijraah/core`: Core Hijraah functionality
- `@hijraah/ui`: User interface components

---

Built with ❤️ for the Hijraah immigration platform
