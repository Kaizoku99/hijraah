import { generateObject, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { 
  PolicyChangeSchema, 
  PolicyMonitoringContext,
  PolicyChangeResult 
} from './types';

/**
 * Policy Monitoring Agent - Specialized agent for detecting and analyzing policy changes
 * Uses AI SDK v5's generateObject with structured policy analysis and change detection
 */
export class PolicyMonitoringAgent {
  private supabaseClient: any;

  constructor() {
    this.initializeSupabaseClient();
  }

  private async initializeSupabaseClient() {
    this.supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }

  /**
   * Monitor policy sources for changes using structured analysis
   */
  async monitorPolicyChanges(
    context: PolicyMonitoringContext
  ): Promise<PolicyChangeResult[]> {
    const { object: analysis } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        detectedChanges: z.array(PolicyChangeSchema),
        monitoringSummary: z.object({
          sourcesChecked: z.number(),
          changesDetected: z.number(),
          highPriorityChanges: z.number(),
          lastUpdated: z.string().datetime(),
        }),
        recommendations: z.array(z.object({
          action: z.string(),
          priority: z.enum(['low', 'medium', 'high']),
          rationale: z.string(),
        })),
      }),
      tools: {
        queryPolicyDatabase: this.createPolicyDatabaseTool(),
        fetchPolicyContent: this.createPolicyFetchTool(),
        analyzeContentChanges: this.createChangeAnalysisTool(),
        validatePolicyStructure: this.createValidationTool(),
      },
      maxSteps: 10,
      system: `You are a specialized Policy Monitoring Agent with expertise in immigration law and policy analysis.

Your responsibilities:
- Monitor official government immigration policy sources
- Detect policy changes, amendments, and new regulations
- Analyze the significance and impact of detected changes
- Classify changes by type, severity, and affected categories
- Provide structured analysis with confidence scores

Key capabilities:
- Real-time policy change detection
- Content comparison and diff analysis
- Legal document structure understanding
- Multi-jurisdiction policy monitoring
- Automated categorization and prioritization

Guidelines:
- Always verify changes against official sources
- Provide confidence scores for all detections
- Flag critical changes that require immediate attention
- Maintain detailed audit trails for all detections
- Consider temporal aspects of policy implementations`,
      prompt: `Monitor policy changes for the following context:

Sources to monitor: ${context.sources.join(', ')}
Last check: ${context.lastCheck.toISOString()}
Monitoring rules:
- Keywords: ${context.monitoringRules.keywords.join(', ')}
- Categories: ${context.monitoringRules.categories.join(', ')}
- Jurisdictions: ${context.monitoringRules.jurisdictions.join(', ')}

Please:
1. Check each source for policy changes since the last monitoring run
2. Analyze detected changes for significance and impact
3. Classify changes by type, severity, and affected categories
4. Provide structured results with confidence scores
5. Recommend follow-up actions for detected changes`,
    });

    // Store monitoring results in database
    await this.storePolicyChanges(analysis.detectedChanges);

    return analysis.detectedChanges;
  }

  /**
   * Analyze specific policy document for changes
   */
  async analyzePolicyDocument(
    documentUrl: string,
    previousVersion?: string
  ): Promise<PolicyChangeResult | null> {
    const { object: analysis } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        hasChanges: z.boolean(),
        change: PolicyChangeSchema.optional(),
        analysis: z.object({
          contentDifferences: z.array(z.string()),
          structuralChanges: z.array(z.string()),
          semanticChanges: z.array(z.string()),
          confidenceScore: z.number().min(0).max(1),
        }),
      }),
      tools: {
        fetchDocument: this.createDocumentFetchTool(),
        compareVersions: this.createVersionComparisonTool(),
        extractStructuredData: this.createDataExtractionTool(),
      },
      maxSteps: 8,
      system: `You are analyzing a specific policy document for changes. Focus on:
- Identifying substantive changes vs. formatting updates
- Understanding legal implications of modifications
- Extracting structured information from policy text
- Providing accurate confidence assessments`,
      prompt: `Analyze the policy document at: ${documentUrl}
${previousVersion ? `Compare against previous version: ${previousVersion}` : 'Perform initial analysis'}

Provide detailed analysis of any changes detected, including their significance and potential impact.`,
    });

    if (analysis.hasChanges && analysis.change) {
      await this.storePolicyChanges([analysis.change]);
      return analysis.change;
    }

    return null;
  }

  /**
   * Get policy monitoring status and statistics
   */
  async getMonitoringStatus(): Promise<{
    activeSources: number;
    recentChanges: number;
    pendingReviews: number;
    systemHealth: 'healthy' | 'warning' | 'error';
  }> {
    const { object: status } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        activeSources: z.number(),
        recentChanges: z.number(),
        pendingReviews: z.number(),
        systemHealth: z.enum(['healthy', 'warning', 'error']),
        details: z.object({
          lastSuccessfulCheck: z.string().datetime(),
          failedSources: z.array(z.string()),
          averageResponseTime: z.number(),
        }),
      }),
      tools: {
        queryMonitoringLogs: this.createLogQueryTool(),
        checkSourceHealth: this.createHealthCheckTool(),
      },
      system: `Provide current status of the policy monitoring system based on recent activity and system health metrics.`,
      prompt: `Generate a comprehensive status report for the policy monitoring system, including active sources, recent changes, and overall system health.`,
    });

    return status;
  }

  // Tool implementations
  private createPolicyDatabaseTool() {
    return tool({
      description: 'Query the policy database for existing records and historical data',
      parameters: z.object({
        query: z.string(),
        jurisdiction: z.string().optional(),
        dateRange: z.object({
          start: z.string().datetime(),
          end: z.string().datetime(),
        }).optional(),
      }),
      execute: async ({ query, jurisdiction, dateRange }) => {
        try {
          let dbQuery = this.supabaseClient
            .from('policy_changes')
            .select('*')
            .ilike('title', `%${query}%`);

          if (jurisdiction) {
            dbQuery = dbQuery.eq('jurisdiction', jurisdiction);
          }

          if (dateRange) {
            dbQuery = dbQuery
              .gte('detected_at', dateRange.start)
              .lte('detected_at', dateRange.end);
          }

          const { data, error } = await dbQuery.limit(50);

          if (error) throw error;

          return {
            success: true,
            results: data || [],
            count: data?.length || 0,
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Database query failed',
            results: [],
            count: 0,
          };
        }
      },
    });
  }

  private createPolicyFetchTool() {
    return tool({
      description: 'Fetch policy content from official sources',
      parameters: z.object({
        url: z.string().url(),
        format: z.enum(['html', 'pdf', 'xml']).optional(),
      }),
      execute: async ({ url, format = 'html' }) => {
        try {
          // In a real implementation, this would use Firecrawl or similar service
          const response = await fetch(url);
          const content = await response.text();

          return {
            success: true,
            content,
            metadata: {
              url,
              fetchedAt: new Date().toISOString(),
              contentType: response.headers.get('content-type'),
              size: content.length,
            },
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch content',
            content: '',
          };
        }
      },
    });
  }

  private createChangeAnalysisTool() {
    return tool({
      description: 'Analyze content for changes and modifications',
      parameters: z.object({
        currentContent: z.string(),
        previousContent: z.string().optional(),
        analysisType: z.enum(['diff', 'semantic', 'structural']),
      }),
      execute: async ({ currentContent, previousContent, analysisType }) => {
        try {
          // Simplified change analysis - in production would use more sophisticated diff algorithms
          const changes = {
            diff: previousContent ? this.calculateTextDiff(currentContent, previousContent) : [],
            semantic: this.analyzeSemanticChanges(currentContent, previousContent),
            structural: this.analyzeStructuralChanges(currentContent),
          };

          return {
            success: true,
            changes: changes[analysisType],
            summary: {
              totalChanges: changes[analysisType].length,
              significantChanges: changes[analysisType].filter((c: any) => c.significance === 'high').length,
            },
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Change analysis failed',
            changes: [],
          };
        }
      },
    });
  }

  private createValidationTool() {
    return tool({
      description: 'Validate policy structure and content integrity',
      parameters: z.object({
        content: z.string(),
        expectedStructure: z.array(z.string()).optional(),
      }),
      execute: async ({ content, expectedStructure }) => {
        try {
          const validation = {
            isValid: true,
            issues: [] as string[],
            structure: this.extractPolicyStructure(content),
            confidence: 0.95,
          };

          // Basic validation logic
          if (content.length < 100) {
            validation.isValid = false;
            validation.issues.push('Content too short for policy document');
            validation.confidence = 0.3;
          }

          return {
            success: true,
            validation,
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Validation failed',
            validation: { isValid: false, issues: ['Validation error'], structure: [], confidence: 0 },
          };
        }
      },
    });
  }

  private createDocumentFetchTool() {
    return tool({
      description: 'Fetch and parse policy documents',
      parameters: z.object({
        url: z.string().url(),
        parseOptions: z.object({
          extractText: z.boolean().default(true),
          extractMetadata: z.boolean().default(true),
          extractStructure: z.boolean().default(false),
        }).optional(),
      }),
      execute: async ({ url, parseOptions = {} }) => {
        try {
          // Simplified document fetching - would use proper document parsing in production
          const response = await fetch(url);
          const content = await response.text();

          return {
            success: true,
            document: {
              url,
              content: parseOptions.extractText ? content : '',
              metadata: parseOptions.extractMetadata ? {
                title: this.extractTitle(content),
                lastModified: response.headers.get('last-modified'),
                contentLength: content.length,
              } : {},
              structure: parseOptions.extractStructure ? this.extractPolicyStructure(content) : [],
            },
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Document fetch failed',
            document: null,
          };
        }
      },
    });
  }

  private createVersionComparisonTool() {
    return tool({
      description: 'Compare two versions of a policy document',
      parameters: z.object({
        currentVersion: z.string(),
        previousVersion: z.string(),
        comparisonType: z.enum(['text', 'semantic', 'structural']).default('text'),
      }),
      execute: async ({ currentVersion, previousVersion, comparisonType }) => {
        try {
          const comparison = {
            differences: this.calculateTextDiff(currentVersion, previousVersion),
            similarity: this.calculateSimilarity(currentVersion, previousVersion),
            significantChanges: this.identifySignificantChanges(currentVersion, previousVersion),
          };

          return {
            success: true,
            comparison,
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Version comparison failed',
            comparison: null,
          };
        }
      },
    });
  }

  private createDataExtractionTool() {
    return tool({
      description: 'Extract structured data from policy documents',
      parameters: z.object({
        content: z.string(),
        extractionTargets: z.array(z.enum(['dates', 'requirements', 'procedures', 'fees', 'contacts'])),
      }),
      execute: async ({ content, extractionTargets }) => {
        try {
          const extractedData: Record<string, any> = {};

          for (const target of extractionTargets) {
            switch (target) {
              case 'dates':
                extractedData.dates = this.extractDates(content);
                break;
              case 'requirements':
                extractedData.requirements = this.extractRequirements(content);
                break;
              case 'procedures':
                extractedData.procedures = this.extractProcedures(content);
                break;
              case 'fees':
                extractedData.fees = this.extractFees(content);
                break;
              case 'contacts':
                extractedData.contacts = this.extractContacts(content);
                break;
            }
          }

          return {
            success: true,
            extractedData,
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Data extraction failed',
            extractedData: {},
          };
        }
      },
    });
  }

  private createLogQueryTool() {
    return tool({
      description: 'Query monitoring logs and system activity',
      parameters: z.object({
        timeRange: z.object({
          start: z.string().datetime(),
          end: z.string().datetime(),
        }),
        logLevel: z.enum(['info', 'warning', 'error']).optional(),
      }),
      execute: async ({ timeRange, logLevel }) => {
        try {
          let query = this.supabaseClient
            .from('monitoring_logs')
            .select('*')
            .gte('created_at', timeRange.start)
            .lte('created_at', timeRange.end);

          if (logLevel) {
            query = query.eq('level', logLevel);
          }

          const { data, error } = await query.order('created_at', { ascending: false }).limit(100);

          if (error) throw error;

          return {
            success: true,
            logs: data || [],
            count: data?.length || 0,
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Log query failed',
            logs: [],
            count: 0,
          };
        }
      },
    });
  }

  private createHealthCheckTool() {
    return tool({
      description: 'Check health status of monitoring sources',
      parameters: z.object({
        sources: z.array(z.string().url()),
      }),
      execute: async ({ sources }) => {
        try {
          const healthChecks = await Promise.all(
            sources.map(async (source) => {
              try {
                const start = Date.now();
                const response = await fetch(source, { method: 'HEAD' });
                const responseTime = Date.now() - start;

                return {
                  source,
                  status: response.ok ? 'healthy' : 'error',
                  responseTime,
                  statusCode: response.status,
                };
              } catch (error) {
                return {
                  source,
                  status: 'error',
                  responseTime: -1,
                  error: error instanceof Error ? error.message : 'Unknown error',
                };
              }
            })
          );

          return {
            success: true,
            healthChecks,
            summary: {
              healthy: healthChecks.filter(h => h.status === 'healthy').length,
              errors: healthChecks.filter(h => h.status === 'error').length,
              averageResponseTime: healthChecks
                .filter(h => h.responseTime > 0)
                .reduce((sum, h) => sum + h.responseTime, 0) / healthChecks.length,
            },
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Health check failed',
            healthChecks: [],
          };
        }
      },
    });
  }

  // Helper methods
  private async storePolicyChanges(changes: PolicyChangeResult[]): Promise<void> {
    try {
      const { error } = await this.supabaseClient
        .from('policy_changes')
        .insert(changes.map(change => ({
          id: change.id,
          title: change.title,
          description: change.description,
          country: change.country,
          jurisdiction: change.jurisdiction,
          effective_date: change.effectiveDate,
          detected_at: change.detectedAt,
          change_type: change.changeType,
          severity: change.severity,
          affected_categories: change.affectedCategories,
          source_url: change.sourceUrl,
          confidence: change.confidence,
          raw_content: change.rawContent,
          structured_data: change.structuredData,
        })));

      if (error) {
        console.error('Failed to store policy changes:', error);
      }
    } catch (error) {
      console.error('Error storing policy changes:', error);
    }
  }

  private calculateTextDiff(current: string, previous: string): any[] {
    // Simplified diff calculation - would use proper diff library in production
    const currentLines = current.split('\n');
    const previousLines = previous.split('\n');
    const differences = [];

    for (let i = 0; i < Math.max(currentLines.length, previousLines.length); i++) {
      if (currentLines[i] !== previousLines[i]) {
        differences.push({
          line: i + 1,
          type: currentLines[i] ? (previousLines[i] ? 'modified' : 'added') : 'removed',
          current: currentLines[i] || '',
          previous: previousLines[i] || '',
          significance: this.assessChangeSignificance(currentLines[i], previousLines[i]),
        });
      }
    }

    return differences;
  }

  private analyzeSemanticChanges(current: string, previous?: string): any[] {
    // Simplified semantic analysis
    return [{
      type: 'semantic_change',
      description: 'Content analysis would be performed here',
      significance: 'medium',
    }];
  }

  private analyzeStructuralChanges(content: string): any[] {
    // Simplified structural analysis
    return [{
      type: 'structural_change',
      description: 'Structure analysis would be performed here',
      significance: 'low',
    }];
  }

  private extractPolicyStructure(content: string): string[] {
    // Simplified structure extraction
    const sections = content.match(/^#+\s+(.+)$/gm) || [];
    return sections.map(section => section.replace(/^#+\s+/, ''));
  }

  private calculateSimilarity(text1: string, text2: string): number {
    // Simplified similarity calculation
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
  }

  private identifySignificantChanges(current: string, previous: string): any[] {
    // Simplified significant change identification
    return [{
      type: 'significant_change',
      description: 'Significant change analysis would be performed here',
      impact: 'high',
    }];
  }

  private assessChangeSignificance(current?: string, previous?: string): 'low' | 'medium' | 'high' {
    if (!current && !previous) return 'low';
    if (!current || !previous) return 'high';
    
    // Simple heuristic - would be more sophisticated in production
    const lengthDiff = Math.abs(current.length - previous.length);
    if (lengthDiff > 100) return 'high';
    if (lengthDiff > 20) return 'medium';
    return 'low';
  }

  private extractTitle(content: string): string {
    const titleMatch = content.match(/<title>(.*?)<\/title>/i) || content.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1] : 'Untitled Document';
  }

  private extractDates(content: string): string[] {
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{4}-\d{2}-\d{2}\b/g;
    return content.match(dateRegex) || [];
  }

  private extractRequirements(content: string): string[] {
    // Simplified requirement extraction
    const requirementRegex = /(?:must|shall|required?|mandatory)[^.!?]*[.!?]/gi;
    return content.match(requirementRegex) || [];
  }

  private extractProcedures(content: string): string[] {
    // Simplified procedure extraction
    const procedureRegex = /(?:step|procedure|process)[^.!?]*[.!?]/gi;
    return content.match(procedureRegex) || [];
  }

  private extractFees(content: string): string[] {
    // Simplified fee extraction
    const feeRegex = /\$\d+(?:,\d{3})*(?:\.\d{2})?/g;
    return content.match(feeRegex) || [];
  }

  private extractContacts(content: string): string[] {
    // Simplified contact extraction
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const phoneRegex = /\b\d{3}-\d{3}-\d{4}\b|\b\(\d{3}\)\s*\d{3}-\d{4}\b/g;
    
    const emails = content.match(emailRegex) || [];
    const phones = content.match(phoneRegex) || [];
    
    return [...emails, ...phones];
  }
}