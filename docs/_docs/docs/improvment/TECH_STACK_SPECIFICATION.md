# Hijraah Implementation Tech Stack Specification

## Executive Summary

Based on the current Hijraah codebase analysis and the implementation roadmap, this document details the specific technologies, libraries, and services we'll use to implement each component of the AI production enhancement plan.

## Current Tech Stack Foundation

### Core Framework & Runtime
- **Frontend**: Next.js 15.5.2 (App Router, React 18.3.1)
- **Backend**: Next.js API Routes + Hono.js for advanced routing
- **Runtime**: Node.js (with Edge Runtime support)
- **Package Manager**: pnpm 10.12.4 with workspace support
- **Build System**: Turbo (Turborepo) for monorepo management

### Database & Storage
- **Primary Database**: Supabase (PostgreSQL 15) with pgvector extension
- **Cache**: Upstash Redis for high-performance caching
- **Vector Database**: Integrated pgvector + optional Pinecone for scaling
- **File Storage**: Vercel Blob + Supabase Storage
- **Search**: PostgreSQL full-text search + vector similarity

### AI & ML Infrastructure
- **AI SDK**: Vercel AI SDK 5.0.26 with multi-provider support
- **LLM Providers**: OpenAI, Anthropic, Google, Mistral, DeepSeek, Fireworks
- **Vector Embeddings**: OpenAI text-embedding-ada-002
- **Content Processing**: Langchain 0.3.30 ecosystem
- **Document Processing**: PDF-lib, Tesseract.js, Cheerio

## Agent Framework: Vercel AI SDK Implementation

### Core Agent Architecture Stack

#### Vercel AI SDK Agent Technologies
```typescript
// Agent Framework Technologies:
{
  "ai": "^5.0.26",                      // Vercel AI SDK Core (already in use)
  "@ai-sdk/openai": "^5.16.0",         // OpenAI provider (already in use)
  "@ai-sdk/anthropic": "^2.0.0",       // Anthropic provider (already in use)
  "@ai-sdk/google": "^1.0.0",          // Google provider (already in use)
  "@ai-sdk/react": "^1.0.0",           // React integration (already in use)
  "zod": "^4.1.4"                      // Schema validation (already in use)
}
```

#### Agent Orchestration Implementation
```bash
apps/web/src/lib/agents/
├── core/
│   ├── agent-orchestrator.ts         # Main orchestrator class
│   ├── multi-agent-system.ts         # Multi-agent coordination
│   ├── safe-agent-loop.ts            # Safety-controlled agent loops
│   ├── human-in-the-loop.ts          # Human approval controls
│   └── agent-types.ts                # Agent type definitions
├── specialized/
│   ├── immigration-agent.ts          # Immigration domain agent
│   ├── document-agent.ts             # Document processing agent
│   ├── calculation-agent.ts          # Points calculation agent
│   └── research-agent.ts             # Information research agent
├── safety/
│   ├── agent-safety-validator.ts     # Agent safety validation
│   ├── agent-guardrails.ts           # Behavioral guardrails
│   ├── emergency-stop.ts             # Circuit breaker system
│   └── risk-assessor.ts              # Risk level assessment
├── audit/
│   ├── agent-audit-logger.ts         # Comprehensive audit logging
│   ├── execution-tracker.ts          # Step-by-step tracking
│   ├── performance-monitor.ts        # Performance metrics
│   └── compliance-reporter.ts        # Compliance reporting
├── tools/
│   ├── immigration-tools.ts          # Immigration-specific tools
│   ├── document-tools.ts             # Document processing tools
│   ├── calculation-tools.ts          # Mathematical calculation tools
│   └── web-search-tools.ts           # Web research tools
└── monitoring/
    ├── agent-monitor.ts               # Real-time monitoring
    ├── alert-manager.ts               # Alert system
    ├── metrics-collector.ts           # Metrics collection
    └── dashboard-service.ts           # Monitoring dashboard
```

### Agent Safety & Security Framework

#### Comprehensive Safety Validation
```typescript
// lib/agents/safety/agent-safety-validator.ts
export class AgentSafetyValidator {
  private readonly validators: SafetyValidator[];
  private readonly riskThresholds: RiskThresholds;

  constructor() {
    this.validators = [
      new InputSanitationValidator(),
      new OutputContentValidator(),
      new PermissionValidator(),
      new RateLimitValidator(),
      new DataLeakageValidator(),
      new BusinessRuleValidator()
    ];
  }

  async validateInput(input: string, context: AgentContext): Promise<ValidationResult> {
    // Multi-layer input validation
    const results = await Promise.all(
      this.validators.map(validator => validator.validateInput(input, context))
    );

    const criticalIssues = results.filter(r => r.severity === 'critical');
    if (criticalIssues.length > 0) {
      throw new SafetyValidationError('Critical safety issues detected', criticalIssues);
    }

    return this.aggregateResults(results);
  }
}
```

#### Human-in-the-Loop Controls
```typescript
// lib/agents/safety/human-in-the-loop.ts
export class HumanInTheLoopController {
  async createConfirmationFlow(
    toolCall: ToolCall,
    context: AgentContext
  ): Promise<ConfirmationFlow> {
    const riskLevel = await this.assessRiskLevel(toolCall, context);
    
    if (riskLevel === 'high') {
      // Tools requiring confirmation omit execute function
      return { approved: false, requiresApproval: true };
    }

    return { approved: true, autoApproved: true };
  }

  // High-risk tools configuration
  buildToolsWithConfirmation(tools: ToolSet): ToolSet {
    const safeTools = {};
    
    for (const [name, tool] of Object.entries(tools)) {
      const riskLevel = this.assessToolRisk(tool);
      
      if (riskLevel === 'high') {
        // Remove execute function to require human approval
        safeTools[name] = {
          description: tool.description,
          inputSchema: tool.inputSchema,
          outputSchema: tool.outputSchema
          // execute function omitted intentionally
        };
      } else {
        safeTools[name] = tool;
      }
    }
    
    return safeTools;
  }
}
```

### Multi-Agent System Architecture

#### Orchestrator-Worker Pattern
```typescript
// lib/agents/core/multi-agent-system.ts
export class HijraahMultiAgentSystem {
  private orchestrator: AgentOrchestrator;
  private workers: Map<string, SpecializedAgent>;

  async implementFeature(featureRequest: string): Promise<ImplementationResult> {
    // Orchestrator: Plan the implementation using o3-mini
    const { object: plan } = await generateObject({
      model: openai('o3-mini'),
      schema: z.object({
        files: z.array(z.object({
          purpose: z.string(),
          filePath: z.string(),
          changeType: z.enum(['create', 'modify', 'delete']),
          priority: z.enum(['high', 'medium', 'low']),
          dependencies: z.array(z.string()).optional(),
          riskLevel: z.enum(['low', 'medium', 'high'])
        })),
        estimatedComplexity: z.enum(['low', 'medium', 'high']),
        securityConsiderations: z.array(z.string()),
        testingRequirements: z.array(z.string())
      }),
      system: 'You are a senior software architect for Hijraah immigration platform...',
      prompt: `Analyze this feature request: ${featureRequest}`
    });

    // Workers: Execute in parallel with safety validation
    const results = await this.executeWorkersInParallel(plan);
    return this.validateAndMergeResults(results);
  }

  private async executeWorkersInParallel(plan: ImplementationPlan) {
    const toolPromises = plan.files.map(async (file) => {
      const worker = this.getWorkerForTask(file.changeType);
      return worker.execute(file, plan.context);
    });

    return Promise.all(toolPromises);
  }
}
```

#### Manual Agent Loop with Safety Controls
```typescript
// lib/agents/core/safe-agent-loop.ts
export class SafeAgentLoop {
  async executeWithSafetyControls(
    messages: ModelMessage[],
    tools: ToolSet,
    context: AgentContext
  ): Promise<AgentResult> {
    let iterations = 0;
    const MAX_ITERATIONS = this.getMaxIterations(context);
    const auditId = await this.auditLogger.startExecution('agent_loop', context);

    while (iterations < MAX_ITERATIONS) {
      iterations++;
      
      try {
        // Safety pre-check for this iteration
        await this.safetyValidator.validateIteration(messages, iterations, context);

        const result = streamText({
          model: openai('gpt-4o'),
          messages,
          tools: this.buildSafeTools(tools, context),
          prepareStep: async ({ stepNumber, steps, messages }) => {
            // Compress conversation history for longer loops
            if (messages.length > 20) {
              return {
                messages: await this.compressMessageHistory(messages.slice(-10))
              };
            }
            return {};
          }
        });

        // Process streaming response with safety monitoring
        for await (const chunk of result.fullStream) {
          await this.monitorStreamChunk(chunk, auditId);
          
          if (chunk.type === 'tool-call') {
            const approved = await this.humanInTheLoop.checkApproval(chunk, context);
            if (!approved) {
              throw new ToolExecutionDeniedError('Human approval required');
            }
          }
        }

        const responseMessages = (await result.response).messages;
        messages.push(...responseMessages);

        const finishReason = await result.finishReason;

        if (finishReason === 'tool-calls') {
          const toolCalls = await result.toolCalls;
          
          // Process tools with safety validation
          const toolResults = await this.processToolsWithSafety(
            toolCalls, 
            context, 
            auditId
          );
          
          messages.push(...toolResults);
        } else {
          // Final safety validation
          const finalText = await result.text;
          await this.safetyValidator.validateFinalOutput(finalText, context);
          
          await this.auditLogger.completeExecution(auditId, {
            text: finalText,
            iterations,
            safetyScore: await this.calculateFinalSafetyScore(messages)
          });
          
          return { text: finalText, iterations, auditId };
        }
        
      } catch (error) {
        await this.auditLogger.logError(auditId, error, iterations);
        
        if (this.isCriticalError(error)) {
          throw error;
        }
        
        // Implement recovery strategies for non-critical errors
        messages = await this.attemptRecovery(messages, error, context);
      }
    }

    throw new MaxIterationsExceededError(`Agent exceeded ${MAX_ITERATIONS} iterations`);
  }
}
```

### Comprehensive Audit & Monitoring System

#### Agent Audit Logger
```typescript
// lib/agents/audit/agent-audit-logger.ts
export class AgentAuditLogger {
  private readonly supabase: SupabaseClient;
  private readonly redisClient: Redis;

  async startExecution(task: string, context: AgentContext): Promise<string> {
    const auditId = generateId();
    
    const auditRecord = {
      id: auditId,
      task_description: task,
      context: context,
      started_at: new Date(),
      status: 'running',
      user_id: context.userId,
      session_id: context.sessionId,
      agent_type: context.agentType,
      model_used: context.modelName
    };

    await Promise.all([
      this.supabase.from('agent_audit_logs').insert(auditRecord),
      this.redisClient.set(
        `agent:execution:${auditId}`,
        JSON.stringify(auditRecord),
        'EX', 3600 // 1 hour expiry
      )
    ]);

    return auditId;
  }

  async logStep(auditId: string, stepData: AgentStepData): Promise<void> {
    const stepRecord = {
      audit_id: auditId,
      step_number: stepData.stepNumber,
      tool_calls: stepData.toolCalls,
      tool_results: stepData.toolResults,
      finish_reason: stepData.finishReason,
      usage: stepData.usage,
      timestamp: stepData.timestamp,
      safety_score: await this.calculateSafetyScore(stepData),
      performance_metrics: {
        execution_time_ms: stepData.executionTime,
        token_count: stepData.usage?.totalTokens,
        cost_estimate: stepData.costEstimate
      }
    };

    await Promise.all([
      this.supabase.from('agent_execution_steps').insert(stepRecord),
      this.updateRealTimeMonitoring(auditId, stepRecord)
    ]);
  }

  async generateAuditReport(auditId: string): Promise<AgentAuditReport> {
    const execution = await this.supabase
      .from('agent_audit_logs')
      .select(`
        *,
        agent_execution_steps(*),
        safety_violations(*),
        performance_metrics(*)
      `)
      .eq('id', auditId)
      .single();

    return {
      executionSummary: this.buildExecutionSummary(execution),
      safetyAnalysis: this.analyzeSafetyMetrics(execution),
      performanceMetrics: this.calculatePerformanceMetrics(execution),
      recommendations: this.generateRecommendations(execution),
      complianceStatus: this.assessCompliance(execution)
    };
  }
}
```

### Hijraah-Specific Agent Integration

#### Immigration Agent Tools
```typescript
// lib/agents/tools/immigration-tools.ts
export const immigrationTools = {
  searchKnowledge: tool({
    description: 'Search Hijraah immigration knowledge base for accurate information',
    inputSchema: z.object({
      query: z.string(),
      categories: z.array(z.enum(['visa', 'citizenship', 'documents', 'requirements'])),
      country: z.string().optional(),
      language: z.enum(['en', 'fr', 'ar']).default('en')
    }),
    execute: async ({ query, categories, country, language }) => {
      const results = await ragPipeline.search(query, { 
        categories, 
        country, 
        language 
      });
      return formatRAGResults(results);
    }
  }),

  calculatePoints: tool({
    description: 'Calculate immigration points for user profile',
    inputSchema: z.object({
      profile: z.object({
        age: z.number().min(18).max(65),
        education: z.string(),
        workExperience: z.number().min(0),
        languageScores: z.object({
          ielts: z.object({
            listening: z.number().min(0).max(9),
            reading: z.number().min(0).max(9),
            writing: z.number().min(0).max(9),
            speaking: z.number().min(0).max(9)
          }).optional(),
          french: z.object({
            tef: z.number().min(0).max(900)
          }).optional()
        }),
        jobOffer: z.boolean().default(false),
        canadianExperience: z.number().min(0).default(0)
      }),
      program: z.enum(['express_entry', 'pnp', 'quebec_skilled'])
    }),
    execute: async ({ profile, program }) => {
      return pointsCalculator.calculate(profile, program);
    }
  }),

  // High-risk tool requiring human approval
  submitApplication: tool({
    description: 'Submit official immigration application - REQUIRES HUMAN APPROVAL',
    inputSchema: z.object({
      applicationData: z.object({
        personalInfo: z.any(),
        documents: z.array(z.string()),
        paymentInfo: z.any(),
        declarationSigned: z.boolean()
      }),
      applicationType: z.enum(['express_entry', 'family_class', 'business_class'])
    }),
    outputSchema: z.object({
      applicationId: z.string(),
      confirmationNumber: z.string(),
      status: z.enum(['submitted', 'pending_review', 'rejected']),
      nextSteps: z.array(z.string())
    })
    // No execute function - requires human approval
  }),

  generateDocumentChecklist: tool({
    description: 'Generate personalized document checklist for immigration application',
    inputSchema: z.object({
      applicationType: z.string(),
      familySize: z.number(),
      hasSpouse: z.boolean(),
      hasChildren: z.boolean(),
      country: z.string()
    }),
    execute: async ({ applicationType, familySize, hasSpouse, hasChildren, country }) => {
      return documentGenerator.generateChecklist({
        applicationType,
        familySize,
        hasSpouse,
        hasChildren,
        country
      });
    }
  })
};
```

#### Real-Time Agent Monitoring
```typescript
// lib/agents/monitoring/agent-monitor.ts
export class AgentMonitor {
  private readonly alertThresholds: AlertThresholds;
  private readonly metricsCollector: MetricsCollector;

  async monitorAgentExecution(auditId: string): Promise<void> {
    const execution = await this.getExecutionDetails(auditId);
    
    // Performance monitoring
    if (execution.duration > this.alertThresholds.maxExecutionTime) {
      await this.sendAlert('performance', {
        type: 'slow_execution',
        auditId,
        duration: execution.duration,
        threshold: this.alertThresholds.maxExecutionTime
      });
    }

    // Safety monitoring
    const safetyScore = await this.calculateSafetyScore(execution);
    if (safetyScore < this.alertThresholds.minSafetyScore) {
      await this.sendAlert('safety', {
        type: 'low_safety_score',
        auditId,
        score: safetyScore,
        threshold: this.alertThresholds.minSafetyScore
      });
    }

    // Token usage monitoring
    if (execution.totalTokens > this.alertThresholds.maxTokens) {
      await this.sendAlert('usage', {
        type: 'high_token_usage',
        auditId,
        tokens: execution.totalTokens,
        threshold: this.alertThresholds.maxTokens
      });
    }

    // Immigration-specific monitoring
    if (execution.agentType === 'immigration' && execution.riskScore > 0.7) {
      await this.sendAlert('compliance', {
        type: 'high_risk_immigration_advice',
        auditId,
        riskScore: execution.riskScore
      });
    }
  }

  async generateRealTimeDashboard(): Promise<DashboardData> {
    const activeExecutions = await this.getActiveExecutions();
    const recentAlerts = await this.getRecentAlerts();
    const systemHealth = await this.getSystemHealth();

    return {
      activeExecutions: activeExecutions.map(exec => ({
        id: exec.id,
        agentType: exec.agentType,
        status: exec.status,
        progress: exec.progress,
        safetyScore: exec.safetyScore,
        startTime: exec.startTime,
        estimatedCompletion: exec.estimatedCompletion,
        userImpact: exec.userImpact
      })),
      alerts: recentAlerts,
      systemHealth,
      metrics: {
        totalExecutions24h: await this.getTotalExecutions24h(),
        averageSafetyScore: await this.getAverageSafetyScore(),
        errorRate: await this.getErrorRate(),
        immigrationAgentUsage: await this.getImmigrationAgentMetrics(),
        humanApprovalRate: await this.getHumanApprovalRate()
      }
    };
  }
}
```

### Agent Database Schema Extensions

```sql
-- Agent execution audit logs
CREATE TABLE agent_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_description TEXT NOT NULL,
  context JSONB NOT NULL,
  agent_type VARCHAR(100) NOT NULL,
  model_used VARCHAR(100) NOT NULL,
  started_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'running',
  user_id UUID,
  session_id VARCHAR(255),
  total_steps INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  total_cost_usd DECIMAL(10,6) DEFAULT 0,
  safety_score DECIMAL(3,2),
  risk_level VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent execution steps
CREATE TABLE agent_execution_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES agent_audit_logs(id),
  step_number INTEGER NOT NULL,
  tool_calls JSONB,
  tool_results JSONB,
  finish_reason VARCHAR(50),
  usage JSONB,
  timestamp TIMESTAMP NOT NULL,
  safety_score DECIMAL(3,2),
  performance_metrics JSONB,
  error_occurred BOOLEAN DEFAULT FALSE,
  error_details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Human approval requests
CREATE TABLE agent_approval_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES agent_audit_logs(id),
  tool_name VARCHAR(255) NOT NULL,
  input_data JSONB NOT NULL,
  risk_level VARCHAR(20) NOT NULL,
  context JSONB,
  status VARCHAR(50) DEFAULT 'pending',
  approved_by UUID,
  approved_at TIMESTAMP,
  rejection_reason TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent safety violations
CREATE TABLE agent_safety_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES agent_audit_logs(id),
  violation_type VARCHAR(100) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  input_data JSONB,
  output_data JSONB,
  detection_method VARCHAR(100),
  blocked BOOLEAN DEFAULT FALSE,
  remediation_action VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent performance metrics
CREATE TABLE agent_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES agent_audit_logs(id),
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(10,4) NOT NULL,
  unit VARCHAR(50),
  measurement_time TIMESTAMP NOT NULL,
  context JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Environment Variables for Agent Framework

```bash
# Agent Framework Configuration
VERCEL_AI_SDK_AGENT_ENABLED=true
AGENT_MAX_ITERATIONS=10
AGENT_TIMEOUT_MS=300000
AGENT_SAFETY_THRESHOLD=0.8
AGENT_AUDIT_ENABLED=true

# Human-in-the-Loop Configuration
HUMAN_APPROVAL_REQUIRED=true
APPROVAL_TIMEOUT_MINUTES=5
HIGH_RISK_TOOLS=submitApplication,deleteUserData,processPayment
EMERGENCY_CONTACT_EMAIL=admin@hijraah.com

# Agent-Specific Models
ORCHESTRATOR_MODEL=o3-mini
WORKER_MODEL=gpt-4o
SAFETY_MODEL=gpt-4o-mini
EMBEDDING_MODEL=text-embedding-ada-002

# Monitoring Configuration
AGENT_MONITORING_ENABLED=true
REAL_TIME_DASHBOARD=true
ALERT_ON_SAFETY_VIOLATIONS=true
METRICS_RETENTION_DAYS=90
```

This comprehensive Vercel AI SDK agent framework implementation provides enterprise-grade agent orchestration with full safety controls, audit trails, and monitoring specifically designed for Hijraah's immigration services requirements.

## Phase 1: Critical Security & Safety Tech Stack

### 1.1 Input/Output Guardrails

#### Content Safety & Moderation
```typescript
// Primary Technologies:
{
  "openai": "^5.16.0",           // OpenAI Moderation API
  "azure-cognitive-services": "^8.0.0", // Azure Content Safety (to add)
  "google-cloud-dlp": "^5.0.0", // Google Cloud DLP (to add)
  "perspective-api": "^2.0.0"    // Google Perspective API (to add)
}
```

**Implementation Stack**:
- **OpenAI Moderation API**: Primary content safety filtering
- **Azure Content Safety**: Secondary validation and advanced threat detection
- **Google Perspective API**: Toxicity and harassment detection
- **Custom Pattern Matching**: RegExp-based prompt injection detection
- **ML Classification**: TensorFlow.js for client-side pre-filtering

#### Prompt Injection Detection
```typescript
// Detection Technologies:
{
  "@huggingface/inference": "^2.7.0", // HuggingFace models
  "compromise": "^14.14.0",            // NLP parsing
  "natural": "^8.0.1",                // Text classification
  "ml-matrix": "^6.11.1"              // Vector operations
}
```

**Detection Approaches**:
1. **Pattern-based Detection**: Custom RegExp patterns for known injection techniques
2. **Semantic Analysis**: Embedding similarity to known injection patterns
3. **ML Classification**: Fine-tuned BERT model for injection detection
4. **Entropy Analysis**: Statistical analysis of input randomness

#### Implementation Structure
```bash
apps/web/src/lib/guardrails/
├── input-validator.ts          # Main validation orchestrator
├── prompt-injection-detector.ts # Injection pattern detection
├── content-safety.ts          # Multi-provider safety checks
├── output-filter.ts           # Response filtering
├── patterns/
│   ├── injection-patterns.ts  # Known injection patterns
│   ├── safety-patterns.ts     # Content safety patterns
│   └── custom-rules.ts        # Domain-specific rules
├── providers/
│   ├── openai-moderation.ts   # OpenAI integration
│   ├── azure-safety.ts        # Azure Content Safety
│   ├── perspective-api.ts     # Google Perspective
│   └── custom-ml.ts           # Custom ML models
└── types.ts                   # Type definitions
```

### 1.2 Agent Safety Controls

#### Agent Behavior Validation
```typescript
// Agent Safety Technologies:
{
  "zod": "^4.1.4",              // Schema validation (already in use)
  "ajv": "^8.17.1",             // JSON schema validation (to add)
  "validator": "^13.12.0",       // Input validation (to add)
  "dompurify": "^3.1.7"         // HTML sanitization (to add)
}
```

**Safety Implementation**:
- **Output Schema Validation**: Strict Zod schemas for agent responses
- **Behavior Constraints**: Rule-based agent action validation
- **Content Filtering**: Multi-layer output sanitization
- **Emergency Stops**: Circuit breakers for dangerous behaviors

#### Implementation Structure
```bash
apps/web/src/lib/agents/safety/
├── agent-guardrails.ts        # Main safety orchestrator
├── behavior-validator.ts      # Agent behavior validation
├── output-reviewer.ts         # Response review system
├── safety-constraints.ts      # Safety rule definitions
├── emergency-stop.ts          # Circuit breaker system
└── audit-logger.ts           # Safety event logging
```

## Phase 2: Performance & Reliability Tech Stack

### 2.1 Advanced Semantic Caching

#### Vector Similarity Caching
```typescript
// Caching Technologies:
{
  "@upstash/redis": "^1.35.3",           // Primary cache (already in use)
  "ioredis": "^5.7.0",                   // Advanced Redis features (already in use)
  "hnswlib-node": "^3.0.0",             // Vector similarity search (already in use)
  "@pinecone-database/pinecone": "^2.2.2", // Vector database (already in use)
  "lru-cache": "^10.4.3",               // In-memory LRU cache (already in use)
  "node-cache": "^5.1.2"                // Local caching (already in use)
}
```

**Caching Architecture**:
- **L1 Cache**: In-memory LRU cache for ultra-fast access
- **L2 Cache**: Redis with semantic similarity matching
- **L3 Cache**: PostgreSQL with pgvector for persistent storage
- **Vector Similarity**: HNSW algorithm for efficient similarity search

#### Implementation Structure
```bash
apps/web/src/lib/caching/
├── semantic-cache.ts          # Main semantic cache orchestrator
├── multi-layer-cache.ts       # Cache hierarchy management
├── similarity-matcher.ts      # Vector similarity algorithms
├── cache-strategy.ts          # Caching strategies & policies
├── cache-analytics.ts         # Cache performance metrics
├── adapters/
│   ├── redis-adapter.ts       # Redis cache adapter
│   ├── postgres-adapter.ts    # PostgreSQL cache adapter
│   ├── memory-adapter.ts      # In-memory cache adapter
│   └── pinecone-adapter.ts    # Pinecone vector cache
└── types.ts                   # Cache type definitions
```

### 2.2 AI-Specific Observability

#### Monitoring & Metrics
```typescript
// Observability Technologies:
{
  "@sentry/nextjs": "^9.44.0",          // Error tracking (already in use)
  "pino": "^9.4.0",                     // Structured logging (to add)
  "prometheus-client": "^15.1.3",       // Metrics collection (to add)
  "opentelemetry": "^1.28.0",          // Distributed tracing (to add)
  "@datadog/browser-rum": "^5.35.1"     // Real user monitoring (already in use)
}
```

**Monitoring Stack**:
- **Application Monitoring**: Sentry for error tracking and performance
- **Infrastructure Monitoring**: Prometheus + Grafana for metrics
- **Distributed Tracing**: OpenTelemetry for request tracing
- **Log Aggregation**: Structured logging with Pino
- **Real User Monitoring**: Datadog RUM for frontend performance

#### Implementation Structure
```bash
apps/web/src/lib/monitoring/
├── ai-metrics-collector.ts    # AI-specific metrics collection
├── performance-tracker.ts     # Performance monitoring
├── alert-manager.ts          # Alert system
├── health-checker.ts         # System health checks
├── analytics-service.ts      # Usage analytics
├── tracing/
│   ├── tracer.ts             # OpenTelemetry tracer
│   ├── spans.ts              # Custom span definitions
│   └── instrumentation.ts    # Auto-instrumentation
├── loggers/
│   ├── structured-logger.ts  # Pino-based structured logging
│   ├── ai-logger.ts          # AI-specific logging
│   └── audit-logger.ts       # Security audit logging
└── dashboards/
    ├── metrics-dashboard.ts  # Metrics visualization
    └── health-dashboard.ts   # System health dashboard
```

## Phase 3: Advanced Features Tech Stack

### 3.1 Advanced Prompt Engineering

#### Prompt Management & Optimization
```typescript
// Prompt Engineering Technologies:
{
  "langchain": "^0.3.30",               // Prompt templates (already in use)
  "promptfoo": "^0.84.0",              // Prompt testing (to add)
  "semantic-kernel": "^1.0.0",         // Microsoft Semantic Kernel (to add)
  "autogen": "^2.0.0"                  // Multi-agent prompting (to add)
}
```

**Prompt Engineering Features**:
- **Template Management**: Versioned prompt templates with A/B testing
- **Dynamic Prompting**: Context-aware prompt generation
- **Prompt Optimization**: Automated prompt testing and optimization
- **Multi-language Prompts**: Internationalized prompt templates

#### Implementation Structure
```bash
apps/web/src/lib/prompts/
├── template-manager.ts        # Prompt template management
├── prompt-optimizer.ts        # Automated optimization
├── dynamic-prompting.ts       # Context-aware prompts
├── version-control.ts         # Template versioning
├── a-b-testing.ts            # Prompt A/B testing
├── templates/
│   ├── system-prompts/       # System prompt templates
│   ├── user-prompts/         # User interaction prompts
│   ├── agent-prompts/        # Agent-specific prompts
│   └── i18n/                 # Internationalized prompts
└── optimization/
    ├── metrics.ts            # Prompt performance metrics
    ├── evaluators.ts         # Prompt quality evaluators
    └── experiments.ts        # A/B testing framework
```

### 3.2 Enhanced Data Quality Framework

#### Data Validation & Quality
```typescript
// Data Quality Technologies:
{
  "zod": "^4.1.4",              // Schema validation (already in use)
  "yup": "^1.4.0",              // Alternative validation (to add)
  "joi": "^17.13.3",            // Data validation (to add)
  "great-expectations": "^1.0.0", // Data profiling (Python integration)
  "data-forge": "^1.10.2"       // Data manipulation (to add)
}
```

**Data Quality Features**:
- **Schema Enforcement**: Multi-layer data validation
- **Data Profiling**: Automated data quality assessment
- **Anomaly Detection**: Statistical outlier detection
- **Data Lineage**: Track data flow and transformations

#### Implementation Structure
```bash
apps/web/src/lib/data-quality/
├── quality-validator.ts      # Main quality validator
├── schema-enforcer.ts        # Schema validation
├── data-profiler.ts          # Data profiling and analysis
├── anomaly-detector.ts       # Anomaly detection
├── quality-metrics.ts        # Quality measurement
├── validators/
│   ├── immigration-data.ts   # Immigration-specific validation
│   ├── document-validator.ts # Document validation
│   └── user-data.ts          # User data validation
└── profilers/
    ├── statistical-profiler.ts # Statistical analysis
    ├── pattern-profiler.ts    # Pattern detection
    └── completeness-checker.ts # Data completeness
```

## Database Schema Enhancements

### Guardrails & Security Tables
```sql
-- Content safety cache with vector similarity
CREATE TABLE content_safety_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_hash VARCHAR(64) UNIQUE NOT NULL,
  content_embedding vector(1536),
  is_safe BOOLEAN NOT NULL,
  moderation_results JSONB,
  provider VARCHAR(50) NOT NULL,
  confidence_score DECIMAL(3,2),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Prompt injection detection cache
CREATE TABLE prompt_injection_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  input_hash VARCHAR(64) UNIQUE NOT NULL,
  input_embedding vector(1536),
  is_injection BOOLEAN NOT NULL,
  detection_method VARCHAR(50) NOT NULL,
  confidence_score DECIMAL(3,2),
  patterns_matched JSONB,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent safety audit log
CREATE TABLE agent_safety_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id VARCHAR(255) NOT NULL,
  agent_type VARCHAR(100) NOT NULL,
  action_type VARCHAR(100) NOT NULL,
  input_data JSONB,
  output_data JSONB,
  safety_violations JSONB,
  risk_score DECIMAL(3,2),
  blocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Semantic Caching Tables
```sql
-- Multi-layer semantic cache
CREATE TABLE semantic_cache_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key VARCHAR(255) NOT NULL,
  content_hash VARCHAR(64) NOT NULL,
  query_embedding vector(1536),
  response_data JSONB NOT NULL,
  metadata JSONB,
  hit_count INTEGER DEFAULT 0,
  last_accessed TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cache analytics and performance
CREATE TABLE cache_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_layer VARCHAR(50) NOT NULL,
  operation_type VARCHAR(50) NOT NULL,
  hit_rate DECIMAL(5,2),
  average_latency INTEGER,
  total_requests INTEGER,
  total_hits INTEGER,
  total_misses INTEGER,
  recorded_at TIMESTAMP DEFAULT NOW()
);
```

### AI Observability Tables
```sql
-- AI model performance metrics
CREATE TABLE ai_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id VARCHAR(255) NOT NULL,
  model_provider VARCHAR(100) NOT NULL,
  model_name VARCHAR(100) NOT NULL,
  operation_type VARCHAR(50) NOT NULL,
  token_count INTEGER,
  response_time_ms INTEGER,
  cost_usd DECIMAL(10,6),
  quality_score DECIMAL(3,2),
  user_satisfaction INTEGER,
  error_occurred BOOLEAN DEFAULT FALSE,
  error_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Alert definitions and history
CREATE TABLE alert_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  metric_name VARCHAR(100) NOT NULL,
  threshold_value DECIMAL(10,2) NOT NULL,
  comparison_operator VARCHAR(10) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE alert_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_definition_id UUID REFERENCES alert_definitions(id),
  alert_name VARCHAR(255) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  metric_value DECIMAL(10,2),
  threshold_value DECIMAL(10,2),
  resolved_at TIMESTAMP,
  acknowledged_at TIMESTAMP,
  acknowledged_by UUID,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Environment Configuration

### Required Environment Variables
```bash
# Guardrails Configuration
OPENAI_MODERATION_ENABLED=true
AZURE_CONTENT_SAFETY_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
AZURE_CONTENT_SAFETY_KEY=your-azure-key
GOOGLE_PERSPECTIVE_API_KEY=your-perspective-key
PROMPT_INJECTION_THRESHOLD=0.8
CONTENT_SAFETY_THRESHOLD=0.9

# Semantic Caching
SEMANTIC_CACHE_ENABLED=true
EMBEDDING_MODEL=text-embedding-ada-002
SIMILARITY_THRESHOLD=0.85
CACHE_TTL_HOURS=24
CACHE_MAX_SIZE=10000
VECTOR_DIMENSION=1536

# Monitoring & Observability
SENTRY_DSN=your-sentry-dsn
SENTRY_AI_METRICS=true
DATADOG_API_KEY=your-datadog-key
PROMETHEUS_ENABLED=true
METRICS_COLLECTION_ENABLED=true
ALERT_WEBHOOK_URL=your-webhook-url
LOG_LEVEL=info
STRUCTURED_LOGGING=true

# AI Model Configuration
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_AI_API_KEY=your-google-key
MISTRAL_API_KEY=your-mistral-key
FIREWORKS_API_KEY=your-fireworks-key

# Vector Database
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENVIRONMENT=your-environment
PINECONE_INDEX_NAME=hijraah-vectors

# Cache Configuration
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
REDIS_CLUSTER_ENABLED=false
```

## Package Dependencies to Add

### Security & Guardrails
```json
{
  "@azure/ai-content-safety": "^1.0.0",
  "@google-cloud/dlp": "^5.0.0",
  "perspective-api-client": "^2.0.0",
  "@huggingface/inference": "^2.7.0",
  "compromise": "^14.14.0",
  "natural": "^8.0.1",
  "validator": "^13.12.0",
  "dompurify": "^3.1.7",
  "ajv": "^8.17.1"
}
```

### Observability & Monitoring
```json
{
  "pino": "^9.4.0",
  "pino-pretty": "^11.2.2",
  "@opentelemetry/api": "^1.9.0",
  "@opentelemetry/auto-instrumentations-node": "^0.50.0",
  "@opentelemetry/exporter-prometheus": "^0.54.0",
  "prometheus-client": "^15.1.3"
}
```

### Advanced Features
```json
{
  "promptfoo": "^0.84.0",
  "yup": "^1.4.0",
  "joi": "^17.13.3",
  "data-forge": "^1.10.2",
  "ml-matrix": "^6.11.1"
}
```

## Infrastructure Requirements

### Redis Configuration
```yaml
# redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru
appendonly yes
appendfsync everysec

# Vector similarity search
loadmodule /usr/lib/redis/modules/redisearch.so
loadmodule /usr/lib/redis/modules/redisvl.so
```

### PostgreSQL Extensions
```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Vector similarity indexes
CREATE INDEX idx_content_safety_embedding 
ON content_safety_cache USING ivfflat (content_embedding vector_cosine_ops);

CREATE INDEX idx_prompt_injection_embedding 
ON prompt_injection_cache USING ivfflat (input_embedding vector_cosine_ops);

CREATE INDEX idx_semantic_cache_embedding 
ON semantic_cache_entries USING ivfflat (query_embedding vector_cosine_ops);
```

## Development & Testing Stack

### Testing Framework
```json
{
  "jest": "^29.7.0",
  "@testing-library/react": "^14.3.1",
  "@testing-library/jest-dom": "^6.6.4",
  "playwright": "^1.48.0",
  "k6": "^0.52.0"
}
```

### Code Quality
```json
{
  "eslint": "^8.57.1",
  "prettier": "^3.3.3",
  "husky": "^9.1.7",
  "@commitlint/cli": "^19.8.1",
  "sonarjs": "^1.0.4"
}
```

## Deployment & CI/CD

### Vercel Configuration
```json
{
  "functions": {
    "apps/web/src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "crons": [
    {
      "path": "/api/cron/cache-cleanup",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/metrics-aggregation", 
      "schedule": "*/5 * * * *"
    }
  ]
}
```

### Docker Configuration
```dockerfile
# Multi-stage build for production
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS development
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance Optimization

### Webpack Optimizations
```javascript
// next.config.mjs additions
module.exports = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
      'lodash',
      'recharts'
    ]
  },
  webpack: (config) => {
    config.optimization.splitChunks.cacheGroups.guardrails = {
      name: 'guardrails',
      test: /[\\/]src[\\/]lib[\\/]guardrails/,
      priority: 30,
      chunks: 'all'
    };
    return config;
  }
};
```

## Security Considerations

### Content Security Policy
```javascript
const csp = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-eval'", 'https://va.vercel-scripts.com'],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'connect-src': ["'self'", 'https://api.openai.com', 'https://*.supabase.co'],
  'frame-src': ["'none'"],
  'object-src': ["'none'"]
};
```

This comprehensive tech stack specification provides the foundation for implementing all components in the Hijraah enhancement roadmap, leveraging both existing infrastructure and carefully selected new technologies for optimal performance, security, and maintainability.
