# Multi-Agent Systems Architecture with AI SDK v5

## Framework Selection: Vercel AI SDK v5

Based on comprehensive analysis of Agno, LangGraph, and Vercel AI SDK v5, **AI SDK v5** is the recommended framework for Hijraah's multi-agent systems due to:

- **Perfect Stack Alignment**: Native TypeScript, Next.js 15, and Vercel integration
- **Flexibility**: Multiple agent patterns without framework lock-in  
- **Production Ready**: Built-in streaming, error handling, and observability
- **Tool Ecosystem**: Rich integration capabilities for existing services
- **Incremental Adoption**: Can be integrated gradually into existing codebase

## Core Agent Patterns

### 1. Orchestrator-Worker Pattern
Use for complex workflows requiring coordination between specialized agents:

```typescript
// Immigration Processing Orchestrator
export class ImmigrationOrchestrator {
  async processCase(caseData: CaseData) {
    // Orchestrator: Plan the processing
    const { object: plan } = await generateObject({
      model: openai('gpt-4o'),
      schema: processingPlanSchema,
      system: 'Immigration case processing planner...',
      prompt: `Analyze case and create processing plan: ${JSON.stringify(caseData)}`,
    });

    // Workers: Execute specialized tasks
    const results = await Promise.all(
      plan.tasks.map(async task => {
        const { object: result } = await generateObject({
          model: getModelForTask(task.type),
          schema: getSchemaForTask(task.type),
          system: getSystemPromptForTask(task.type),
          prompt: `Execute ${task.type}: ${task.description}`,
        });
        return { task, result };
      })
    );

    return { plan, results };
  }
}
```

### 2. Parallel Processing Pattern
Use for independent tasks that can run concurrently:

```typescript
async function parallelDocumentAnalysis(documents: Document[]) {
  const [authenticity, compliance, completeness] = await Promise.all([
    generateObject({
      model: openai('gpt-4o'),
      system: 'Document authenticity expert...',
      schema: authenticitySchema,
      tools: { verifyDocument: documentVerificationTool },
      prompt: `Verify authenticity: ${JSON.stringify(documents)}`,
    }),
    generateObject({
      model: openai('gpt-4o'),
      system: 'Immigration compliance expert...',
      schema: complianceSchema,
      tools: { checkRegulations: regulationCheckTool },
      prompt: `Check compliance: ${JSON.stringify(documents)}`,
    }),
    generateObject({
      model: openai('gpt-4o'),
      system: 'Document completeness expert...',
      schema: completenessSchema,
      prompt: `Assess completeness: ${JSON.stringify(documents)}`,
    }),
  ]);

  // Aggregate results
  const summary = await generateText({
    model: openai('gpt-4o'),
    system: 'Immigration case manager...',
    prompt: `Synthesize document analysis: ${JSON.stringify({ authenticity, compliance, completeness })}`,
  });

  return { authenticity, compliance, completeness, summary };
}
```

### 3. Evaluator-Optimizer Pattern
Use for quality assurance and iterative improvement:

```typescript
async function processApplicationWithQA(application: Application) {
  let currentProcessing = await initialProcessing(application);
  let iterations = 0;
  const MAX_ITERATIONS = 3;

  while (iterations < MAX_ITERATIONS) {
    // Evaluate current processing
    const { object: evaluation } = await generateObject({
      model: openai('gpt-4o'),
      schema: evaluationSchema,
      system: 'Immigration processing quality assessor...',
      prompt: `Evaluate processing quality: ${JSON.stringify(currentProcessing)}`,
    });

    // Check if quality meets standards
    if (evaluation.qualityScore >= 8 && evaluation.meetsRequirements) {
      break;
    }

    // Improve based on feedback
    currentProcessing = await generateObject({
      model: openai('gpt-4o'),
      schema: processingSchema,
      system: 'Immigration processing specialist...',
      prompt: `Improve processing based on feedback: ${evaluation.feedback}`,
    });

    iterations++;
  }

  return { processing: currentProcessing, iterations };
}
```

## Agent Configuration Standards

### Tool Definition Pattern
```typescript
export const createImmigrationTool = (name: string, description: string, schema: z.ZodSchema, execute: Function) => 
  tool({
    description: `${description} - Immigration context aware`,
    parameters: schema,
    execute: async (params) => {
      try {
        const result = await execute(params);
        // Log for audit trail
        await logToolExecution(name, params, result);
        return result;
      } catch (error) {
        await logToolError(name, params, error);
        throw error;
      }
    },
  });

// Example usage
export const documentAnalysisTool = createImmigrationTool(
  'analyzeDocument',
  'Analyze immigration document for completeness and authenticity',
  z.object({
    documentId: z.string(),
    documentType: z.enum(['passport', 'visa', 'certificate', 'form']),
  }),
  async ({ documentId, documentType }) => {
    // Implementation
  }
);
```

### Agent Step Control
```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  tools: { /* tools */ },
  maxSteps: 10,
  stopWhen: stepCountIs(5), // or hasToolCall('finalDecision')
  onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
    // Log each step for audit trail
    logAgentStep({
      step: stepNumber,
      text,
      toolCalls,
      toolResults,
      finishReason,
      usage,
      timestamp: new Date(),
    });
  },
  experimental_prepareStep: async ({ stepNumber, steps }) => {
    // Dynamic model selection based on step complexity
    if (stepNumber === 0) {
      return {
        model: openai('gpt-4o'), // Use powerful model for initial analysis
        experimental_activeTools: ['analyzeCase', 'classifyApplication'],
      };
    }
    // Use smaller model for follow-up steps
    return { model: openai('gpt-4o-mini') };
  },
});
```

## Immigration-Specific Agent Teams

### Document Processing Team
```typescript
export class DocumentProcessingTeam {
  async processDocuments(documents: Document[], caseContext: CaseContext) {
    // Classification agent
    const classification = await generateObject({
      model: openai('gpt-4o'),
      schema: documentClassificationSchema,
      system: 'Immigration document classifier...',
      prompt: `Classify documents: ${JSON.stringify(documents)}`,
    });

    // Parallel processing by document type
    const processingResults = await Promise.all(
      classification.documentGroups.map(async group => {
        return this.processDocumentGroup(group, caseContext);
      })
    );

    // Quality assurance
    const qaResult = await this.performQualityAssurance(processingResults);

    return { classification, processingResults, qaResult };
  }

  private async processDocumentGroup(group: DocumentGroup, context: CaseContext) {
    return generateObject({
      model: openai('gpt-4o'),
      schema: documentProcessingSchema,
      tools: {
        extractText: textExtractionTool,
        verifyAuthenticity: authenticationTool,
        checkCompliance: complianceTool,
      },
      maxSteps: 5,
      system: `Process ${group.type} documents for immigration case...`,
      prompt: `Process documents: ${JSON.stringify(group.documents)}`,
    });
  }
}
```

### Policy Compliance Team
```typescript
export class PolicyComplianceTeam {
  async checkCompliance(application: Application, currentPolicies: Policy[]) {
    // Multi-step compliance checking
    const complianceCheck = await generateObject({
      model: openai('gpt-4o'),
      schema: complianceSchema,
      tools: {
        queryPolicyDatabase: policyQueryTool,
        checkRequirements: requirementCheckTool,
        validateEligibility: eligibilityTool,
      },
      maxSteps: 8,
      stopWhen: hasToolCall('finalComplianceDecision'),
      system: 'Immigration policy compliance expert...',
      prompt: `Check compliance for: ${JSON.stringify(application)}`,
    });

    return complianceCheck;
  }
}
```

### Case Decision Team
```typescript
export class CaseDecisionTeam {
  async makeDecision(caseData: ProcessedCaseData) {
    // Structured decision making with reasoning
    const decision = await generateObject({
      model: openai('gpt-4o'),
      schema: decisionSchema,
      tools: {
        consultPrecedents: precedentTool,
        calculateRiskScore: riskAssessmentTool,
        generateRecommendation: recommendationTool,
        // Answer tool for structured final decision
        finalDecision: tool({
          description: 'Provide final immigration case decision',
          parameters: z.object({
            decision: z.enum(['approve', 'deny', 'request_additional_info']),
            reasoning: z.array(z.string()),
            confidence: z.number().min(0).max(1),
            requiredActions: z.array(z.string()).optional(),
          }),
          // No execute function - terminates agent
        }),
      },
      toolChoice: 'required',
      stopWhen: stepCountIs(10),
      system: 'Senior immigration officer making case decisions...',
      prompt: `Make decision for case: ${JSON.stringify(caseData)}`,
    });

    return decision;
  }
}
```

## Integration with Existing Stack

### Supabase Integration
```typescript
// Store agent execution logs
export const logAgentExecution = async (execution: AgentExecution) => {
  const supabase = await createClient();
  await supabase.from('agent_executions').insert({
    agent_type: execution.type,
    case_id: execution.caseId,
    steps: execution.steps,
    result: execution.result,
    duration_ms: execution.duration,
    token_usage: execution.tokenUsage,
    created_at: new Date(),
  });
};

// Retrieve case processing history
export const getCaseProcessingHistory = async (caseId: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('agent_executions')
    .select('*')
    .eq('case_id', caseId)
    .order('created_at', { ascending: false });
  return data;
};
```

### Redis Caching
```typescript
// Cache agent results for similar cases
export const cacheAgentResult = async (key: string, result: any, ttl = 3600) => {
  const redis = await getRedisClient();
  await redis.setex(`agent:${key}`, ttl, JSON.stringify(result));
};

export const getCachedAgentResult = async (key: string) => {
  const redis = await getRedisClient();
  const cached = await redis.get(`agent:${key}`);
  return cached ? JSON.parse(cached) : null;
};
```

### Trigger.dev Integration
```typescript
// Background agent processing
export const processImmigrationCaseJob = job({
  id: 'process-immigration-case',
  name: 'Process Immigration Case',
  version: '1.0.0',
  trigger: eventTrigger({
    name: 'immigration.case.submitted',
  }),
  run: async (payload, io) => {
    const orchestrator = new ImmigrationOrchestrator();
    
    await io.logger.info('Starting case processing', { caseId: payload.caseId });
    
    const result = await orchestrator.processCase(payload.caseData);
    
    await io.logger.info('Case processing completed', { 
      caseId: payload.caseId,
      decision: result.decision 
    });
    
    return result;
  },
});
```

## Error Handling and Monitoring

### Agent Error Handling
```typescript
export const withAgentErrorHandling = (agentFn: Function) => {
  return async (...args: any[]) => {
    try {
      return await agentFn(...args);
    } catch (error) {
      // Log to Sentry
      Sentry.captureException(error, {
        tags: { component: 'multi-agent-system' },
        extra: { args },
      });
      
      // Fallback to simpler processing
      return await fallbackProcessing(...args);
    }
  };
};
```

### Performance Monitoring
```typescript
export const monitorAgentPerformance = (agentName: string) => {
  return async (execution: AgentExecution) => {
    const metrics = {
      agent_name: agentName,
      duration_ms: execution.duration,
      token_usage: execution.tokenUsage,
      step_count: execution.steps.length,
      success: execution.success,
    };
    
    // Send to monitoring service
    await sendMetrics('agent.execution', metrics);
  };
};
```

## Development Guidelines

### Documentation First Rule
**MANDATORY**: Before implementing any agent functionality, you MUST use the Context7 MCP server to get the latest documentation for all technologies involved.

**Process**:
1. **Identify Technologies**: List all frameworks, libraries, and services the agent will use
2. **Resolve Library IDs**: Use `resolve_library_id()` for each technology
3. **Get Latest Docs**: Use `get_library_docs()` with specific topics relevant to the agent implementation
4. **Apply Current Patterns**: Always prioritize Context7 documentation over potentially outdated knowledge

**Example**:
```typescript
// Before implementing an agent that uses Supabase and AI SDK
// 1. Get latest Supabase documentation
resolve_library_id("Supabase")
get_library_docs("/supabase/supabase", {
  topic: "Server-side client, RLS, real-time subscriptions",
  tokens: 5000
})

// 2. Get latest AI SDK documentation  
resolve_library_id("Vercel AI SDK")
get_library_docs("/vercel/ai", {
  topic: "generateObject, tools, multi-step agents",
  tokens: 5000
})

// 3. Then implement the agent using the latest patterns
export class DocumentProcessingAgent {
  // Implementation using latest patterns from Context7 docs
}
```

**Technologies to Always Check**:
- Vercel AI SDK v5 (for agent patterns and tool usage)
- Supabase (for database operations and real-time features)
- Next.js 15 (for server actions and app router integration)
- Turborepo (for monorepo task orchestration)
- Any other stack technologies the agent interacts with

### Agent Testing
```typescript
// Test agent behavior with mock tools
describe('ImmigrationOrchestrator', () => {
  it('should process case correctly', async () => {
    const mockTools = {
      analyzeDocument: vi.fn().mockResolvedValue({ authentic: true }),
      checkCompliance: vi.fn().mockResolvedValue({ compliant: true }),
    };
    
    const orchestrator = new ImmigrationOrchestrator(mockTools);
    const result = await orchestrator.processCase(mockCaseData);
    
    expect(result.decision).toBeDefined();
    expect(mockTools.analyzeDocument).toHaveBeenCalled();
  });
});
```

### Agent Debugging
```typescript
// Enable detailed logging for development
const debugAgent = process.env.NODE_ENV === 'development';

const result = await generateText({
  model: openai('gpt-4o'),
  tools: { /* tools */ },
  onStepFinish: debugAgent ? ({ text, toolCalls }) => {
    console.log('Agent Step:', { text, toolCalls });
  } : undefined,
});
```

## Migration Strategy

1. **Phase 1**: Implement core orchestrator pattern for new features
2. **Phase 2**: Migrate existing document processing to parallel pattern
3. **Phase 3**: Add evaluator-optimizer for quality assurance
4. **Phase 4**: Integrate with existing MAS Python components via API
5. **Phase 5**: Full migration of complex workflows to AI SDK v5

## Best Practices

- **Always use structured outputs** with Zod schemas for predictable results
- **Implement proper error handling** with fallback strategies
- **Log all agent executions** for audit trails and debugging
- **Use appropriate model sizes** - GPT-4o for complex reasoning, GPT-4o-mini for simple tasks
- **Cache results** for similar cases to improve performance
- **Monitor token usage** and implement cost controls
- **Test agent behavior** with comprehensive unit and integration tests