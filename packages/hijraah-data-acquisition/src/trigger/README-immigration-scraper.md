# Comprehensive Immigration Data Scraper

This document describes the newly implemented comprehensive immigration data scraping system that integrates Firecrawl v2, Google AI (Vercel SDK), Supabase storage, and the existing RAG pipeline and knowledge graph.

## Overview

The immigration data scraper is a powerful Trigger.dev v4 task that automates the collection, processing, and integration of immigration-related data from multiple sources. It leverages the latest Firecrawl v2 features including change tracking and semantic crawling.

## Key Features

### 🔍 **Multi-Source Scraping**

- **Government Websites**: USCIS, USCIS, UK Home Office, Canada IRCC, Australia DHA
- **Immigration Forums**: Immigration.com, Trackitt, Reddit communities
- **Immigration Blogs**: Immigration Road, Boundless, Nolo's Immigration Law
- **Visa Processing Centers**: US embassies, Canadian VFS, consulates

### 📊 **Advanced Change Tracking**

- Uses Firecrawl v2's `changeTracking` format
- Supports git-diff and JSON comparison modes
- Custom schemas for structured policy change detection
- Automatic categorization of change types (new_policy, policy_update, clarification, removal)

### 🤖 **AI-Powered Data Processing**

- Google AI integration via Vercel SDK
- Intelligent data cleaning and structuring
- Entity extraction and relationship mapping
- Policy change impact analysis
- Confidence scoring and quality assessment

### 🗄️ **Supabase Integration**

- Automatic storage of scraping results
- Integration with existing RAG pipeline
- Knowledge graph updates with new entities
- Real-time data availability for the application

### ⏰ **Scheduled Monitoring**

- Configurable cron schedules (default: every 6 hours for high-priority sources)
- Priority-based source selection
- Comprehensive error handling and retries
- Performance monitoring and analytics

## Usage

### Triggering the Task

```typescript
import { tasks } from "@trigger.dev/sdk";
import { scrapeImmigrationDataTask } from "./immigration-data-scraper";

// Basic usage - scrape all sources
const handle = await tasks.trigger("scrape-immigration-data", {
  forceFullCrawl: false,
  includeChangeTracking: true,
  includeSemanticAnalysis: true,
  maxPagesPerSource: 20,
  aiProcessingEnabled: true,
});

// Custom source selection
const handle = await tasks.trigger("scrape-immigration-data", {
  sources: [
    {
      name: "USCIS Official Website",
      url: "https://www.uscis.gov",
      category: "government",
      country: "US",
      type: "official",
      priority: "critical",
      changeSensitivity: "high",
    },
  ],
  forceFullCrawl: true,
  includeChangeTracking: true,
  aiProcessingEnabled: true,
  webhookUrl: "https://your-webhook-url.com/notify",
});
```

### Scheduled Execution

```typescript
import { scheduledImmigrationScrapingTask } from "./immigration-data-scraper";

// The scheduled task runs automatically every 6 hours
// It focuses on high-priority sources (critical and high priority)
```

## Configuration Options

### ScrapingPayload Schema

```typescript
interface ScrapingPayload {
  sources?: ImmigrationSource[]; // Custom source list (default: all sources)
  forceFullCrawl?: boolean; // Force full crawl vs. change detection (default: false)
  includeChangeTracking?: boolean; // Enable Firecrawl change tracking (default: true)
  includeSemanticAnalysis?: boolean; // Enable semantic crawling features (default: true)
  maxPagesPerSource?: number; // Max pages per source (default: 20)
  aiProcessingEnabled?: boolean; // Enable AI processing (default: true)
  webhookUrl?: string; // Webhook URL for notifications
}
```

### ImmigrationSource Schema

```typescript
interface ImmigrationSource {
  name: string; // Source display name
  url: string; // Source URL
  category:
    | "government"
    | "community"
    | "blog"
    | "forum"
    | "resource"
    | "legal"
    | "embassy"
    | "visa_center";
  country: string; // Target country
  type: string; // Source type description
  priority: "critical" | "high" | "medium" | "low";
  changeSensitivity: "high" | "medium" | "low";
}
```

## Firecrawl v2 Features Used

### Change Tracking

- **Format**: `changeTracking` with git-diff and JSON modes
- **Comparison**: Automatic comparison with previous scrapes
- **Detection**: Identifies new, changed, same, or removed content
- **Schema**: Custom JSON schema for structured policy change detection

### Semantic Crawling

- **Entity Recognition**: Automatic identification of immigration-related entities
- **Content Classification**: Categorization by content type and relevance
- **Relationship Mapping**: Understanding connections between policy elements

### Advanced Configuration

- **Custom Schemas**: Structured data extraction for specific immigration data
- **Tag-based Tracking**: Separate change histories by source category
- **Webhook Integration**: Real-time notifications for policy changes

## AI Processing Pipeline

### 1. Data Cleaning

- Remove navigation, footers, and irrelevant content
- Normalize formatting and structure
- Language detection and processing

### 2. Entity Extraction

- Identify key immigration concepts
- Extract visa types, requirements, timelines
- Map relationships between entities

### 3. Policy Change Analysis

- Compare current content with previous versions
- Categorize change types and impact levels
- Generate actionable recommendations

### 4. Quality Assessment

- Confidence scoring for extracted data
- Validation against known patterns
- Cross-reference checking

## Supabase Storage Integration

### Data Structure

```sql
-- Immigration scraping results
CREATE TABLE immigration_scraping_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id TEXT NOT NULL,
  total_sources INTEGER NOT NULL,
  successful_sources INTEGER NOT NULL,
  failed_sources INTEGER NOT NULL,
  total_changes_detected INTEGER NOT NULL,
  processing_time INTEGER NOT NULL,
  results JSONB NOT NULL,
  metadata JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Immigration entities for knowledge graph
CREATE TABLE immigration_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_value TEXT NOT NULL,
  confidence DECIMAL(3,2) NOT NULL,
  context TEXT,
  metadata JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### RAG Pipeline Integration

- Automatic document chunking and embedding
- Vector storage in Supabase
- Knowledge graph entity relationship updates
- Real-time search index updates

## Monitoring and Analytics

### Performance Metrics

- Processing time per source
- Success/failure rates
- Change detection accuracy
- AI processing efficiency

### Error Handling

- Comprehensive retry logic with exponential backoff
- Graceful degradation when AI processing fails
- Detailed error logging and reporting
- Automatic recovery mechanisms

### Webhook Notifications

- Real-time alerts for policy changes
- Batch completion notifications
- Error and failure alerts
- Customizable notification channels

## Environment Variables Required

```bash
# Firecrawl Configuration
FIRECRAWL_API_KEY=your_firecrawl_api_key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Configuration
OPENAI_API_KEY=your_openai_api_key

# Optional: Webhook Configuration
WEBHOOK_SECRET=your_webhook_secret
```

## Best Practices

### Source Selection

- Start with high-priority government sources
- Gradually expand to community forums and blogs
- Monitor change frequency and adjust scraping intervals

### Change Tracking Optimization

- Use appropriate sensitivity levels for different source types
- Configure custom schemas for structured data extraction
- Implement proper tagging for separate change histories

### AI Processing

- Enable AI processing for high-value sources
- Monitor token usage and processing costs
- Implement fallback processing when AI fails

### Performance Monitoring

- Track processing times and success rates
- Monitor change detection accuracy
- Set up alerts for failures and performance degradation

## Troubleshooting

### Common Issues

1. **Firecrawl API Errors**
   - Check API key validity and credits
   - Verify source URLs are accessible
   - Review rate limits and retry logic

2. **AI Processing Failures**
   - Check OpenAI API key and quota
   - Monitor token usage
   - Implement fallback processing

3. **Supabase Connection Issues**
   - Verify connection credentials
   - Check database permissions
   - Monitor storage quotas

4. **Change Tracking Inconsistencies**
   - Ensure consistent URL formats
   - Avoid changing include/exclude paths between runs
   - Use appropriate tagging for different change histories

### Debugging

- Enable detailed logging in development
- Use Trigger.dev dashboard for task monitoring
- Check Supabase logs for database operations
- Monitor Firecrawl API usage and errors

## Future Enhancements

### Planned Features

- Multi-language content processing
- Advanced ML-based change classification
- Predictive policy change detection
- Automated source discovery
- Enhanced entity relationship mapping

### Integration Opportunities

- Real-time policy change alerts
- Personalized user notifications
- Advanced analytics dashboard
- Mobile application integration
- Third-party API integrations

## Conclusion

This comprehensive immigration data scraper provides a robust, scalable solution for monitoring immigration policies and requirements across multiple sources. By leveraging Firecrawl v2's advanced features and integrating with AI processing and knowledge graph systems, it enables real-time awareness of policy changes and maintains up-to-date, structured immigration information for users.

The system is designed to be highly configurable, reliable, and extensible, making it suitable for production use in immigration assistance applications.
