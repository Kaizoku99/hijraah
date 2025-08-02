# @hijraah/mas

Multi-Agent System using AI SDK v5 for immigration processing workflows.

## Overview

This package provides a comprehensive multi-agent system built with Vercel AI SDK v5, specifically designed for immigration case processing. It follows the orchestrator-worker, parallel processing, and evaluator-optimizer patterns established in the Hijraah platform's steering documents.

## Architecture

### Core Components

- **Orchestrators**: High-level coordinators that manage complex workflows
- **Teams**: Specialized agent groups for specific domains (documents, policy, decisions)
- **Tools**: Immigration-specific tools with built-in logging and error handling
- **Types**: Comprehensive TypeScript types for all immigration entities
- **Utils**: Integration utilities for Supabase, Redis, Trigger.dev, and monitoring

### Agent Patterns

1. **Orchestrator-Worker Pattern**: Complex workflows with specialized task execution
2. **Parallel Processing Pattern**: Independent tasks running concurrently
3. **Evaluator-Optimizer Pattern**: Quality assurance and iterative improvement

## Quick Start

```typescript
import { ImmigrationOrchestrator } from '@hijraah/mas'

const orchestrator = new ImmigrationOrchestrator()

const result = await orchestrator.processCase({
  id: 'case-123',
  applicantId: 'applicant-456',
  caseType: 'visa',
  country: 'US',
  documents: [
    { id: 'doc-1', type: 'passport', url: 'https://...' }
  ],
  timeline: {
    submitted: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  }
})
```

## Agent Teams

### Document Processing Team

Handles document analysis, authentication, and compliance checking:

```typescript
import { DocumentProcessingTeam } from '@hijraah/mas'

const team = new DocumentProcessingTeam()
const result = await team.processDocuments(documents, caseContext)
```

### Policy Compliance Team

Checks applications against current immigration policies:

```typescript
import { PolicyComplianceTeam } from '@hijraah/mas'

const team = new PolicyComplianceTeam()
const result = await team.checkCompliance(application, policies)
```

### Case Decision Team

Makes immigration case decisions with precedent analysis:

```typescript
import { CaseDecisionTeam } from '@hijraah/mas'

const team = new CaseDecisionTeam()
const result = await team.makeDecision(processedCaseData)
```

## Tools

All tools are built with the immigration tool factory for consistent logging and error handling:

```typescript
import { createImmigrationTool } from '@hijraah/mas'
import { z } from 'zod'

const myTool = createImmigrationTool(
  'toolName',
  'Tool description',
  z.object({ param: z.string() }),
  async ({ param }) => {
    // Tool implementation
    return { result: 'success' }
  }
)
```

### Available Tools

- `documentAnalysisTool`: Analyze document completeness and authenticity
- `policyQueryTool`: Query immigration policy database
- `textExtractionTool`: Extract text from documents using OCR
- `authenticationTool`: Verify document authenticity
- `complianceTool`: Check regulatory compliance
- `precedentTool`: Consult case precedents
- `riskAssessmentTool`: Calculate risk scores
- `recommendationTool`: Generate actionable recommendations
- `requirementCheckTool`: Check specific requirements
- `eligibilityTool`: Validate eligibility criteria

## Integration

### Supabase Integration

Automatic logging of agent executions and tool usage:

```typescript
import { logAgentExecution, getCaseProcessingHistory } from '@hijraah/mas'

// Executions are automatically logged
const history = await getCaseProcessingHistory('case-123')
```

### Redis Caching

Built-in caching for improved performance:

```typescript
import { cacheAgentResult, getCachedAgentResult } from '@hijraah/mas'

// Results are automatically cached
const cached = await getCachedAgentResult('cache-key')
```

### Trigger.dev Background Jobs

Predefined jobs for background processing:

```typescript
import { 
  processImmigrationCaseJob,
  processDocumentsJob,
  checkPolicyComplianceJob 
} from '@hijraah/mas'

// Jobs are automatically registered with Trigger.dev
```

### Monitoring

Comprehensive monitoring and error tracking:

```typescript
import { trackAgentExecution, trackError } from '@hijraah/mas'

// Metrics are automatically tracked
```

## Configuration

### Environment Variables

```bash
# AI SDK Configuration
AI_SDK_TELEMETRY_DISABLED=false
AI_SDK_LOG_LEVEL=info

# AI Providers
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Infrastructure
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
TRIGGER_SECRET_KEY=your_trigger_key
```

## Error Handling

All agents and tools include comprehensive error handling:

```typescript
import { withAgentErrorHandling } from '@hijraah/mas'

const safeFunction = withAgentErrorHandling(
  async () => {
    // Your agent logic
  },
  async () => {
    // Optional fallback function
  }
)
```

## Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Type checking
pnpm type-check
```

## Development

```bash
# Build the package
pnpm build

# Watch mode for development
pnpm dev

# Lint code
pnpm lint
```

## Best Practices

1. **Always use structured outputs** with Zod schemas for predictable results
2. **Implement proper error handling** with fallback strategies
3. **Log all agent executions** for audit trails and debugging
4. **Use appropriate model sizes** - GPT-4o for complex reasoning, GPT-4o-mini for simple tasks
5. **Cache results** for similar cases to improve performance
6. **Monitor token usage** and implement cost controls
7. **Test agent behavior** with comprehensive unit and integration tests

## Migration from Agno

This package replaces the previous Agno-based multi-agent system with AI SDK v5. Key differences:

- **TypeScript-first** instead of Python
- **Native Next.js integration** instead of FastAPI gateway
- **Built-in monitoring** instead of AgentOps
- **Flexible patterns** instead of rigid team structures

## Contributing

1. Follow the established patterns in the steering documents
2. Use the immigration tool factory for all new tools
3. Include comprehensive error handling and logging
4. Add tests for all new functionality
5. Update documentation for any API changes

## License

Private - Hijraah Immigration Platform