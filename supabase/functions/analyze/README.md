# Analyze Edge Function

A powerful OpenAI-powered content analysis Edge Function for the Hijraah platform.

## Features

This Edge Function provides a robust API for analyzing content with OpenAI:

- **Content Analysis**: Extract summaries, key findings, and credibility scores from text content
- **Caching**: Reduces API costs by caching identical queries for 1 hour
- **Rate Limiting**: Prevents abuse with client IP-based rate limiting (10 requests per minute)
- **Input Sanitization**: Uses Zod for validation and sanitizes inputs to prevent injection attacks
- **Metrics Collection**: Tracks usage patterns, error rates, and performance data
- **Background Processing**: Uses EdgeRuntime.waitUntil for non-blocking operations

## Usage

### Analyze Content

```bash
curl -X POST "https://your-project.supabase.co/functions/v1/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your content to analyze goes here...",
    "query": "What is this content about?",
    "depth": 3
  }'
```

#### Request Parameters

| Parameter | Type    | Required | Description                                       |
| --------- | ------- | -------- | ------------------------------------------------- |
| content   | string  | Yes      | The content to analyze (limited to 100,000 chars) |
| query     | string  | Yes      | The question or analysis focus (3-500 chars)      |
| depth     | number  | No       | Analysis depth level (1-5, default: 1)            |
| skipCache | boolean | No       | Whether to skip the cache check (default: false)  |
| cacheKey  | string  | No       | Custom cache key for efficient caching            |

#### Response Format

```json
{
  "success": true,
  "summary": "A concise summary of the content...",
  "findings": ["Key finding 1", "Key finding 2", "..."],
  "relevance": 8,
  "credibility": 7,
  "requestId": "unique-request-id",
  "processingTimeMs": 2500,
  "cached": false
}
```

### Metrics Endpoint

Access performance metrics with an admin token:

```bash
curl -X POST "https://your-project.supabase.co/functions/v1/analyze/metrics" \
  -H "Authorization: Bearer your-admin-token"
```

## Caching

The function uses a PostgreSQL table (`analysis_cache`) to store analysis results with a 1-hour TTL. Caching is based on:

1. A hash of the content and query
2. An optional custom cache key

To skip the cache for fresh analysis, set `skipCache: true` in the request.

## Rate Limiting

To prevent abuse, rate limiting is IP-based with 10 requests per minute allowed per client. Rate limit information is stored in memory and resets when the Edge Function restarts.

## Metrics

The function tracks the following metrics:

- Request count
- Error count
- Cache hits and misses
- Rate limit hits
- Average processing latency
- OpenAI tokens used

Access metrics through the `/analyze/metrics` endpoint with proper authorization.

## Development

### Prerequisites

- Supabase project with Edge Functions enabled
- OpenAI API key set as `OPENAI_API_KEY` in your Supabase secrets
- Admin token set as `ADMIN_API_TOKEN` for metrics access

### Deployment

```bash
supabase functions deploy analyze --no-verify-jwt
supabase db push  # to create the analysis_cache table
```

### Environment Variables

Set the required environment variables:

```bash
supabase secrets set OPENAI_API_KEY=your-openai-api-key
supabase secrets set ADMIN_API_TOKEN=your-admin-token
```

The other variables (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, etc.) are automatically populated by Supabase.
