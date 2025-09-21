# Intelligent Onboarding Implementation

This document describes the implementation of the intelligent onboarding feature for the Hijraah immigration platform. This feature automatically analyzes a user's company domain during email confirmation and provides personalized immigration recommendations.

## Overview

When someone signs up to Hijraah, the system:

1. **Captures their email domain** during registration
2. **Scrapes their company website** using Firecrawl while they confirm their email
3. **Analyzes company data** using LLM (GPT-4) to understand industry, size, and business model
4. **Generates personalized content** including:
   - Relevant visa types for their industry
   - Priority destination countries
   - Suggested documents to prepare
   - Industry-specific immigration insights
   - Customized demo project settings
   - Personalized keywords for content filtering

## Architecture

### Database Schema

The system uses three main tables:

```sql
-- Stores company analysis results from Firecrawl + LLM
company_analyses (
  id, domain, company_name, industry, company_size,
  description, country, website_content, analysis_result,
  status, processed_at, created_at, updated_at
)

-- Stores user-specific personalized recommendations
personalized_onboarding (
  id, user_id, company_analysis_id, keywords, demo_settings,
  configuration, recommended_visa_types, priority_countries,
  suggested_documents, industry_insights, confidence_score,
  status, generated_at, created_at, updated_at
)

-- Tracks async processing jobs
onboarding_jobs (
  id, user_id, email, email_domain, status, current_step,
  steps_completed, company_analysis_id, error_message,
  started_at, completed_at, created_at, updated_at
)
```

### API Endpoints

#### `POST /api/onboarding/analyze`

Triggers the intelligent analysis process:

- Extracts email domain
- Scrapes company website with Firecrawl
- Analyzes content with OpenAI GPT-4
- Generates personalized recommendations
- Stores results in database

#### `GET /api/onboarding/personalized`

Retrieves personalized onboarding data for authenticated user:

- Returns completed analysis results
- Shows pending job status if still processing
- Includes company information and recommendations

#### `PUT /api/onboarding/personalized`

Updates user preferences based on recommendations.

### Edge Function

`supabase/functions/intelligent-onboarding-trigger/index.ts`

This Supabase Edge Function:

- Triggers on user email confirmation webhooks
- Skips generic email providers (Gmail, Yahoo, etc.)
- Creates onboarding jobs for company domains
- Makes async calls to the analysis API

## Usage

### 1. Triggering Analysis

The analysis is automatically triggered during the email confirmation process in `apps/web/src/app/[locale]/auth/callback/page.tsx`:

```typescript
// After successful email verification
const response = await fetch("/api/onboarding/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: data.user.email,
    userId: data.user.id,
  }),
});
```

### 2. Using Personalized Data

#### React Hooks

```typescript
import {
  usePersonalizedOnboarding,
  useCompanyInfo,
  useImmigrationRecommendations
} from '@/lib/hooks/use-personalized-onboarding';

function MyComponent() {
  const { data, isLoading, isPending } = usePersonalizedOnboarding();
  const { company, industry } = useCompanyInfo();
  const { recommendedVisaTypes, priorityCountries } = useImmigrationRecommendations();

  // Use the data to personalize UI
  return (
    <div>
      {isPending && <p>Analyzing your company...</p>}
      {company?.industry && <p>Industry: {company.industry}</p>}
      {recommendedVisaTypes.map(visa => <Badge>{visa}</Badge>)}
    </div>
  );
}
```

#### Components

```typescript
import { PersonalizedWelcome } from '@/components/onboarding/personalized-welcome';
import { PersonalizedDashboardWidget } from '@/components/dashboard/personalized-dashboard-widget';

// Display personalized welcome message
<PersonalizedWelcome />

// Show personalized dashboard widget
<PersonalizedDashboardWidget />
```

### 3. Customizing Analysis

The LLM analysis can be customized by modifying the prompt in `analyzeCompanyWithAI()` function in `/api/onboarding/analyze/route.ts`.

Current analysis includes:

- Industry classification
- Company size estimation
- Business model identification
- Immigration relevance assessment
- Visa type recommendations
- Priority country suggestions
- Document requirements
- Industry-specific insights

## Configuration

### Environment Variables

```env
# Required for Firecrawl web scraping
FIRECRAWL_API_KEY=your_firecrawl_api_key

# Required for LLM analysis
OPENAI_API_KEY=your_openai_api_key

# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# For Edge Function API calls
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Supabase Setup

1. **Run the migration:**

```bash
supabase migration up
```

2. **Deploy the Edge Function:**

```bash
supabase functions deploy intelligent-onboarding-trigger
```

3. **Configure Auth Webhooks:**
   In Supabase Dashboard → Authentication → Webhooks, add:

- URL: `https://your-project.supabase.co/functions/v1/intelligent-onboarding-trigger`
- Events: `user.confirmed`

## Monitoring and Debugging

### Database Queries

```sql
-- Check analysis status for a user
SELECT
  p.user_id,
  ca.domain,
  ca.industry,
  ca.status as analysis_status,
  p.status as personalization_status,
  p.confidence_score,
  oj.current_step,
  oj.error_message
FROM personalized_onboarding p
LEFT JOIN company_analyses ca ON p.company_analysis_id = ca.id
LEFT JOIN onboarding_jobs oj ON p.user_id = oj.user_id
WHERE p.user_id = 'user-uuid';

-- Check recent onboarding jobs
SELECT * FROM onboarding_jobs
ORDER BY created_at DESC
LIMIT 10;

-- View analysis results
SELECT domain, industry, company_size, status, error_message
FROM company_analyses
ORDER BY created_at DESC;
```

### Logs

- API logs: Check `/api/onboarding/analyze` route logs
- Edge Function logs: View in Supabase Dashboard → Functions
- Client logs: Check browser console for analysis triggers

## Error Handling

The system gracefully handles various error scenarios:

1. **Generic Email Providers**: Skips analysis for Gmail, Yahoo, etc.
2. **Website Scraping Failures**: Logs errors but doesn't break the flow
3. **LLM Analysis Failures**: Retries with circuit breaker pattern
4. **Network Issues**: Uses background processing with job tracking

### Common Issues

**Analysis not triggering:**

- Check auth webhook configuration
- Verify environment variables
- Check Edge Function logs

**Analysis failing:**

- Verify Firecrawl API key and credits
- Check OpenAI API key and rate limits
- Review website accessibility (robots.txt, etc.)

**Incomplete results:**

- Check confidence score (should be > 0.7)
- Verify LLM prompt is generating valid JSON
- Check for parsing errors in analysis

## Performance Considerations

- **Caching**: Company analyses are cached by domain to avoid duplicate processing
- **Async Processing**: Analysis runs in background, doesn't block user flow
- **Circuit Breaker**: Prevents cascade failures from external API issues
- **Rate Limiting**: Respects Firecrawl and OpenAI rate limits
- **Polling**: Client polls for completion with 5-second intervals

## Security

- **Row Level Security**: All tables have RLS policies
- **Service Role Access**: Analysis APIs use Supabase service role
- **Data Validation**: All inputs validated with Zod schemas
- **Error Sanitization**: Sensitive errors not exposed to client

## Future Enhancements

Potential improvements to consider:

1. **Multi-language Support**: Analyze websites in different languages
2. **Industry Templates**: Pre-built templates for common industries
3. **User Feedback**: Allow users to rate and improve recommendations
4. **A/B Testing**: Test different analysis approaches
5. **Real-time Updates**: WebSocket updates for analysis progress
6. **Social Proof**: Show similar companies' immigration patterns

## Testing

### Unit Tests

```bash
npm run test -- --testPathPattern=onboarding
```

### Integration Tests

```bash
npm run test:integration -- --grep "intelligent onboarding"
```

### Manual Testing

1. Sign up with a company email (not Gmail/Yahoo)
2. Confirm email and check for "Personalizing your experience" toast
3. Navigate to dashboard to see personalized widget
4. Check `/api/onboarding/personalized` for results

---

This intelligent onboarding system provides a seamless, personalized experience that runs automatically during the user confirmation process, leveraging modern AI capabilities to enhance the immigration journey from day one.
