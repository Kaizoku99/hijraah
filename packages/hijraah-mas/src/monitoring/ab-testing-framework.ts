import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'
import { 
  ABTestConfig, 
  ABTestResult,
  ABTestConfigSchema,
  ABTestResultSchema
} from './types'
import { sendMetrics } from '../utils/monitoring'

/**
 * A/B testing framework using AI SDK v5's experimental_prepareStep for model optimization
 */
export class ABTestingFramework {
  private activeTests: Map<string, ABTestConfig> = new Map()
  private testResults: Map<string, ABTestResult[]> = new Map()
  private trafficAllocator: TrafficAllocator = new TrafficAllocator()

  /**
   * Create a new A/B test configuration
   */
  async createABTest(
    testConfig: Omit<ABTestConfig, 'status'>
  ): Promise<ABTestConfig> {
    const config: ABTestConfig = {
      ...testConfig,
      status: 'draft'
    }

    const validatedConfig = ABTestConfigSchema.parse(config)
    this.activeTests.set(validatedConfig.testId, validatedConfig)
    
    // Initialize results storage
    this.testResults.set(validatedConfig.testId, [])

    await sendMetrics('ab_test.created', {
      testId: validatedConfig.testId,
      agentType: validatedConfig.agentType,
      variantCount: validatedConfig.variants.length
    })

    return validatedConfig
  }

  /**
   * Start an A/B test
   */
  async startABTest(testId: string): Promise<void> {
    const test = this.activeTests.get(testId)
    if (!test) {
      throw new Error(`Test not found: ${testId}`)
    }

    test.status = 'running'
    test.startDate = new Date()

    await sendMetrics('ab_test.started', {
      testId,
      agentType: test.agentType,
      expectedDuration: test.endDate.getTime() - test.startDate.getTime()
    })
  }

  /**
   * Create experimental_prepareStep function for A/B testing
   */
  createPrepareStepForTesting(testId: string, executionId: string) {
    const test = this.activeTests.get(testId)
    if (!test || test.status !== 'running') {
      return undefined
    }

    return async ({ stepNumber, steps }: { stepNumber: number; steps: any[] }) => {
      // Select variant based on traffic allocation
      const selectedVariant = this.trafficAllocator.selectVariant(
        executionId,
        test.variants
      )

      // Configure model and parameters based on variant
      const modelConfig = this.createModelConfig(selectedVariant)

      // Log variant selection for analysis
      await this.logVariantSelection(testId, executionId, selectedVariant.id, stepNumber)

      return {
        model: modelConfig.model,
        temperature: modelConfig.temperature,
        maxTokens: modelConfig.maxTokens,
        experimental_activeTools: selectedVariant.tools,
        // Add custom system prompt if specified
        ...(selectedVariant.systemPrompt && {
          system: selectedVariant.systemPrompt
        })
      }
    }
  }

  /**
   * Record A/B test result
   */
  async recordTestResult(
    testId: string,
    variantId: string,
    executionId: string,
    metrics: Record<string, number>
  ): Promise<void> {
    const test = this.activeTests.get(testId)
    if (!test || test.status !== 'running') {
      return
    }

    const result: ABTestResult = {
      testId,
      variantId,
      executionId,
      metrics,
      timestamp: new Date()
    }

    const validatedResult = ABTestResultSchema.parse(result)
    
    // Store result
    const results = this.testResults.get(testId) || []
    results.push(validatedResult)
    this.testResults.set(testId, results)

    // Send metrics
    await sendMetrics('ab_test.result', validatedResult)

    // Check if test should be completed
    await this.checkTestCompletion(testId)
  }

  /**
   * Get A/B test analysis
   */
  async getTestAnalysis(testId: string): Promise<{
    status: string
    sampleSize: number
    variants: Array<{
      id: string
      name: string
      sampleSize: number
      metrics: Record<string, {
        mean: number
        standardDeviation: number
        confidenceInterval: [number, number]
      }>
    }>
    statisticalSignificance: Record<string, {
      metric: string
      pValue: number
      significant: boolean
      winningVariant: string | null
      confidenceLevel: number
    }>
    recommendations: string[]
  }> {
    const test = this.activeTests.get(testId)
    const results = this.testResults.get(testId) || []

    if (!test) {
      throw new Error(`Test not found: ${testId}`)
    }

    // Group results by variant
    const variantResults = this.groupResultsByVariant(results)
    
    // Calculate statistics for each variant
    const variantAnalysis = await Promise.all(
      test.variants.map(async variant => {
        const variantData = variantResults.get(variant.id) || []
        return {
          id: variant.id,
          name: variant.name,
          sampleSize: variantData.length,
          metrics: this.calculateVariantMetrics(variantData, test.metrics)
        }
      })
    )

    // Perform statistical significance testing
    const statisticalSignificance = await this.performStatisticalTests(
      variantAnalysis,
      test.metrics,
      test.confidenceLevel
    )

    // Generate recommendations
    const recommendations = await this.generateTestRecommendations(
      test,
      variantAnalysis,
      statisticalSignificance
    )

    return {
      status: test.status,
      sampleSize: results.length,
      variants: variantAnalysis,
      statisticalSignificance,
      recommendations
    }
  }

  /**
   * Complete A/B test
   */
  async completeABTest(testId: string): Promise<{
    winningVariant: string | null
    results: any
    recommendations: string[]
  }> {
    const test = this.activeTests.get(testId)
    if (!test) {
      throw new Error(`Test not found: ${testId}`)
    }

    test.status = 'completed'
    test.endDate = new Date()

    const analysis = await this.getTestAnalysis(testId)
    
    // Determine winning variant
    const winningVariant = this.determineWinningVariant(analysis.statisticalSignificance)

    // Generate final report
    const finalReport = await this.generateFinalReport(testId, analysis, winningVariant)

    await sendMetrics('ab_test.completed', {
      testId,
      winningVariant,
      sampleSize: analysis.sampleSize,
      duration: test.endDate.getTime() - test.startDate.getTime()
    })

    return {
      winningVariant,
      results: analysis,
      recommendations: finalReport.recommendations
    }
  }

  /**
   * Get active tests
   */
  getActiveTests(): ABTestConfig[] {
    return Array.from(this.activeTests.values()).filter(test => test.status === 'running')
  }

  /**
   * Pause A/B test
   */
  async pauseABTest(testId: string): Promise<void> {
    const test = this.activeTests.get(testId)
    if (!test) {
      throw new Error(`Test not found: ${testId}`)
    }

    test.status = 'paused'
    
    await sendMetrics('ab_test.paused', { testId })
  }

  /**
   * Resume A/B test
   */
  async resumeABTest(testId: string): Promise<void> {
    const test = this.activeTests.get(testId)
    if (!test) {
      throw new Error(`Test not found: ${testId}`)
    }

    test.status = 'running'
    
    await sendMetrics('ab_test.resumed', { testId })
  }

  /**
   * Get test recommendations based on current results
   */
  async getTestRecommendations(testId: string): Promise<{
    shouldContinue: boolean
    estimatedTimeToSignificance: number | null
    currentLeader: string | null
    confidenceLevel: number
    recommendations: string[]
  }> {
    const analysis = await this.getTestAnalysis(testId)
    const test = this.activeTests.get(testId)!

    const { object: recommendations } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        shouldContinue: z.boolean(),
        estimatedTimeToSignificance: z.number().nullable(),
        currentLeader: z.string().nullable(),
        confidenceLevel: z.number(),
        recommendations: z.array(z.string())
      }),
      system: `You are a statistical analyst specializing in A/B testing for AI systems.
      
      Analyze test results and provide recommendations on:
      - Whether to continue the test
      - Statistical significance and confidence
      - Performance trends and patterns
      - Optimization opportunities`,
      prompt: `Analyze this A/B test and provide recommendations:
      
      Test: ${test.name}
      Status: ${test.status}
      Sample Size: ${analysis.sampleSize}
      Target Sample Size: ${test.sampleSize}
      
      Variants: ${JSON.stringify(analysis.variants, null, 2)}
      Statistical Significance: ${JSON.stringify(analysis.statisticalSignificance, null, 2)}
      
      Provide specific recommendations for this test.`
    })

    return recommendations
  }

  // Private helper methods

  private createModelConfig(variant: ABTestConfig['variants'][0]): {
    model: any
    temperature?: number
    maxTokens?: number
  } {
    // Map model string to actual model instance
    const modelMap: Record<string, any> = {
      'gpt-4o': openai('gpt-4o'),
      'gpt-4o-mini': openai('gpt-4o-mini'),
      'claude-3-sonnet': anthropic('claude-3-5-sonnet-20241022'),
      'claude-3-haiku': anthropic('claude-3-haiku-20240307')
    }

    return {
      model: modelMap[variant.model] || openai('gpt-4o-mini'),
      temperature: variant.temperature,
      maxTokens: variant.maxTokens
    }
  }

  private async logVariantSelection(
    testId: string,
    executionId: string,
    variantId: string,
    stepNumber: number
  ): Promise<void> {
    await sendMetrics('ab_test.variant_selected', {
      testId,
      executionId,
      variantId,
      stepNumber,
      timestamp: new Date()
    })
  }

  private async checkTestCompletion(testId: string): Promise<void> {
    const test = this.activeTests.get(testId)
    const results = this.testResults.get(testId) || []

    if (!test || test.status !== 'running') return

    // Check if we've reached the target sample size
    if (results.length >= test.sampleSize) {
      await this.completeABTest(testId)
      return
    }

    // Check if test duration has been reached
    if (new Date() >= test.endDate) {
      await this.completeABTest(testId)
      return
    }

    // Check for early stopping conditions (statistical significance reached)
    const analysis = await this.getTestAnalysis(testId)
    const hasSignificantResults = Object.values(analysis.statisticalSignificance)
      .some(result => result.significant)

    if (hasSignificantResults && results.length >= test.sampleSize * 0.5) {
      // Early stopping - we have significant results with at least 50% of target sample
      await this.completeABTest(testId)
    }
  }

  private groupResultsByVariant(results: ABTestResult[]): Map<string, ABTestResult[]> {
    const grouped = new Map<string, ABTestResult[]>()
    
    results.forEach(result => {
      if (!grouped.has(result.variantId)) {
        grouped.set(result.variantId, [])
      }
      grouped.get(result.variantId)!.push(result)
    })
    
    return grouped
  }

  private calculateVariantMetrics(
    results: ABTestResult[],
    metricNames: string[]
  ): Record<string, {
    mean: number
    standardDeviation: number
    confidenceInterval: [number, number]
  }> {
    const metrics: Record<string, {
      mean: number
      standardDeviation: number
      confidenceInterval: [number, number]
    }> = {}

    metricNames.forEach(metricName => {
      const values = results.map(r => r.metrics[metricName]).filter(v => v !== undefined)
      
      if (values.length === 0) {
        metrics[metricName] = {
          mean: 0,
          standardDeviation: 0,
          confidenceInterval: [0, 0]
        }
        return
      }

      const mean = values.reduce((sum, val) => sum + val, 0) / values.length
      const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
      const standardDeviation = Math.sqrt(variance)
      
      // 95% confidence interval
      const marginOfError = 1.96 * (standardDeviation / Math.sqrt(values.length))
      const confidenceInterval: [number, number] = [mean - marginOfError, mean + marginOfError]

      metrics[metricName] = {
        mean,
        standardDeviation,
        confidenceInterval
      }
    })

    return metrics
  }

  private async performStatisticalTests(
    variantAnalysis: any[],
    metricNames: string[],
    confidenceLevel: number
  ): Promise<Record<string, {
    metric: string
    pValue: number
    significant: boolean
    winningVariant: string | null
    confidenceLevel: number
  }>> {
    const results: Record<string, {
      metric: string
      pValue: number
      significant: boolean
      winningVariant: string | null
      confidenceLevel: number
    }> = {}

    // Simple statistical testing - would use proper statistical libraries in production
    metricNames.forEach(metricName => {
      if (variantAnalysis.length < 2) {
        results[metricName] = {
          metric: metricName,
          pValue: 1.0,
          significant: false,
          winningVariant: null,
          confidenceLevel
        }
        return
      }

      // Find the best performing variant for this metric
      const sortedVariants = variantAnalysis
        .filter(v => v.sampleSize > 0)
        .sort((a, b) => b.metrics[metricName]?.mean - a.metrics[metricName]?.mean)

      if (sortedVariants.length < 2) {
        results[metricName] = {
          metric: metricName,
          pValue: 1.0,
          significant: false,
          winningVariant: null,
          confidenceLevel
        }
        return
      }

      const best = sortedVariants[0]
      const second = sortedVariants[1]

      // Simple significance test based on confidence intervals
      const bestCI = best.metrics[metricName]?.confidenceInterval || [0, 0]
      const secondCI = second.metrics[metricName]?.confidenceInterval || [0, 0]

      // Check if confidence intervals don't overlap
      const significant = bestCI[0] > secondCI[1] || secondCI[0] > bestCI[1]
      
      results[metricName] = {
        metric: metricName,
        pValue: significant ? 0.03 : 0.15, // Simplified p-value calculation
        significant,
        winningVariant: significant ? best.id : null,
        confidenceLevel
      }
    })

    return results
  }

  private async generateTestRecommendations(
    test: ABTestConfig,
    variantAnalysis: any[],
    statisticalSignificance: any
  ): Promise<string[]> {
    const { object: recommendations } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        recommendations: z.array(z.string())
      }),
      system: 'You are an A/B testing specialist. Provide actionable recommendations based on test results.',
      prompt: `Provide recommendations for this A/B test:
      
      Test: ${test.name}
      Variants: ${JSON.stringify(variantAnalysis, null, 2)}
      Statistical Results: ${JSON.stringify(statisticalSignificance, null, 2)}
      
      Focus on actionable insights and next steps.`
    })

    return recommendations.recommendations
  }

  private determineWinningVariant(
    statisticalSignificance: Record<string, any>
  ): string | null {
    // Find the variant that wins the most metrics with statistical significance
    const variantWins = new Map<string, number>()

    Object.values(statisticalSignificance).forEach((result: any) => {
      if (result.significant && result.winningVariant) {
        const wins = variantWins.get(result.winningVariant) || 0
        variantWins.set(result.winningVariant, wins + 1)
      }
    })

    if (variantWins.size === 0) return null

    // Return the variant with the most wins
    return Array.from(variantWins.entries())
      .sort(([,a], [,b]) => b - a)[0][0]
  }

  private async generateFinalReport(
    testId: string,
    analysis: any,
    winningVariant: string | null
  ): Promise<{
    summary: string
    recommendations: string[]
  }> {
    const { text: summary } = await generateText({
      model: openai('gpt-4o'),
      system: 'You are an A/B testing analyst. Generate comprehensive final reports for completed tests.',
      prompt: `Generate a final report for A/B test ${testId}:
      
      Winning Variant: ${winningVariant || 'No clear winner'}
      Analysis: ${JSON.stringify(analysis, null, 2)}
      
      Provide a comprehensive summary of results and insights.`
    })

    const { object: recommendations } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        recommendations: z.array(z.string())
      }),
      system: 'You are an optimization specialist. Provide specific recommendations based on A/B test results.',
      prompt: `Based on the test results, provide implementation recommendations:
      
      Winning Variant: ${winningVariant}
      Results: ${JSON.stringify(analysis.statisticalSignificance, null, 2)}
      
      Focus on actionable next steps and implementation guidance.`
    })

    return {
      summary,
      recommendations: recommendations.recommendations
    }
  }
}

/**
 * Traffic allocator for A/B testing
 */
class TrafficAllocator {
  /**
   * Select variant based on execution ID and traffic weights
   */
  selectVariant(
    executionId: string,
    variants: ABTestConfig['variants']
  ): ABTestConfig['variants'][0] {
    // Use execution ID hash for consistent variant selection
    const hash = this.hashString(executionId)
    const random = (hash % 10000) / 10000 // Convert to 0-1 range

    let cumulativeWeight = 0
    for (const variant of variants) {
      cumulativeWeight += variant.weight
      if (random <= cumulativeWeight) {
        return variant
      }
    }

    // Fallback to first variant
    return variants[0]
  }

  private hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }
}

// Export singleton instance
export const abTestingFramework = new ABTestingFramework()