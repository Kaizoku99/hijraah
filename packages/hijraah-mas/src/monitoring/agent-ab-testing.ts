import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { claude } from '@ai-sdk/anthropic'
import { z } from 'zod'
import { 
  ABTestConfiguration, 
  ABTestVariant, 
  ABTestResult,
  AgentPerformanceMetrics
} from './types'
import { createClient } from '@/utils/supabase/server'
import { sendMetrics } from '../utils/monitoring'

/**
 * Agent A/B Testing for model comparison and optimization
 * Uses AI SDK v5's model comparison with performance evaluation
 */
export class AgentABTesting {
  private activeTests: Map<string, ABTestConfiguration> = new Map()
  private testResults: Map<string, ABTestResult[]> = new Map()

  /**
   * Create a new A/B test configuration
   */
  async createABTest(config: {
    name: string
    description: string
    variants: Array<{
      name: string
      description: string
      model?: string
      temperature?: number
      maxTokens?: number
      systemPrompt?: string
      tools?: string[]
      [key: string]: any
    }>
    trafficSplit?: Record<string, number>
    metrics?: string[]
    duration?: number // days
  }): Promise<ABTestConfiguration> {
    const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Validate traffic split
    const trafficSplit = config.trafficSplit || this.generateEqualSplit(config.variants.length)
    const totalTraffic = Object.values(trafficSplit).reduce((sum, split) => sum + split, 0)
    
    if (Math.abs(totalTraffic - 1.0) > 0.01) {
      throw new Error('Traffic split must sum to 1.0')
    }

    // Create variants with IDs
    const variants: ABTestVariant[] = config.variants.map((variant, index) => ({
      id: `variant_${index}`,
      name: variant.name,
      description: variant.description,
      configuration: {
        model: variant.model || 'gpt-4o',
        temperature: variant.temperature ?? 0.7,
        maxTokens: variant.maxTokens ?? 4000,
        systemPrompt: variant.systemPrompt,
        tools: variant.tools || [],
        ...variant
      }
    }))

    const testConfig: ABTestConfiguration = {
      testId,
      name: config.name,
      description: config.description,
      variants,
      trafficSplit,
      metrics: config.metrics || ['success_rate', 'response_time', 'token_usage', 'quality_score'],
      startDate: new Date(),
      endDate: config.duration ? new Date(Date.now() + config.duration * 24 * 60 * 60 * 1000) : undefined,
      status: 'running'
    }

    // Store test configuration
    await this.storeTestConfiguration(testConfig)
    this.activeTests.set(testId, testConfig)
    this.testResults.set(testId, [])

    console.log(`A/B test created: ${testConfig.name} (${testId})`)
    return testConfig
  }

  /**
   * Execute agent with A/B test variant selection
   */
  async executeWithABTest(
    testId: string,
    agentFunction: (config: any) => Promise<any>,
    input: any,
    metadata: Record<string, any> = {}
  ): Promise<{
    result: any
    variantId: string
    metrics: Record<string, number>
    executionId: string
  }> {
    const test = this.activeTests.get(testId)
    if (!test || test.status !== 'running') {
      throw new Error(`Test ${testId} is not active`)
    }

    // Select variant based on traffic split
    const selectedVariant = this.selectVariant(test)
    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const startTime = Date.now()
    let result: any
    let success = false
    let error: string | undefined

    try {
      // Execute agent with variant configuration
      result = await agentFunction({
        ...selectedVariant.configuration,
        executionId,
        testId,
        variantId: selectedVariant.id
      })
      success = true
    } catch (err) {
      error = (err as Error).message
      result = null
    }

    const endTime = Date.now()
    const duration = endTime - startTime

    // Calculate metrics
    const metrics = await this.calculateExecutionMetrics(
      result,
      duration,
      success,
      selectedVariant.configuration,
      input,
      metadata
    )

    // Record test result
    const testResult: ABTestResult = {
      testId,
      variantId: selectedVariant.id,
      executionId,
      metrics,
      outcome: success ? 'success' : 'failure',
      timestamp: new Date(),
      metadata: {
        ...metadata,
        input,
        error,
        duration
      }
    }

    await this.recordTestResult(testResult)

    return {
      result,
      variantId: selectedVariant.id,
      metrics,
      executionId
    }
  }

  /**
   * Get A/B test results and analysis
   */
  async getTestResults(testId: string): Promise<{
    configuration: ABTestConfiguration
    results: {
      totalExecutions: number
      variantPerformance: Array<{
        variantId: string
        variantName: string
        executions: number
        successRate: number
        averageResponseTime: number
        averageTokenUsage: number
        averageQualityScore: number
        metrics: Record<string, number>
      }>
      statisticalSignificance: Record<string, {
        metric: string
        pValue: number
        significant: boolean
        confidenceInterval: [number, number]
      }>
      winner: {
        variantId: string
        variantName: string
        confidence: number
        improvements: Record<string, number>
      } | null
    }
    insights: string[]
    recommendations: string[]
  }> {
    const test = this.activeTests.get(testId)
    if (!test) {
      throw new Error(`Test ${testId} not found`)
    }

    // Get test results from database
    const results = await this.getStoredTestResults(testId)
    
    if (results.length === 0) {
      return {
        configuration: test,
        results: {
          totalExecutions: 0,
          variantPerformance: [],
          statisticalSignificance: {},
          winner: null
        },
        insights: ['No test results available yet'],
        recommendations: ['Continue running the test to collect data']
      }
    }

    // Analyze variant performance
    const variantPerformance = await this.analyzeVariantPerformance(test, results)
    
    // Calculate statistical significance
    const statisticalSignificance = await this.calculateStatisticalSignificance(test, results)
    
    // Determine winner
    const winner = await this.determineWinner(test, variantPerformance, statisticalSignificance)
    
    // Generate insights and recommendations
    const { insights, recommendations } = await this.generateTestInsights(test, variantPerformance, winner)

    return {
      configuration: test,
      results: {
        totalExecutions: results.length,
        variantPerformance,
        statisticalSignificance,
        winner
      },
      insights,
      recommendations
    }
  }

  /**
   * Compare multiple models for a specific task
   */
  async compareModels(
    models: string[],
    task: {
      name: string
      systemPrompt: string
      testCases: Array<{
        input: any
        expectedOutput?: any
        evaluationCriteria: string[]
      }>
    },
    options: {
      temperature?: number
      maxTokens?: number
      iterations?: number
    } = {}
  ): Promise<{
    modelComparison: Array<{
      model: string
      averageScore: number
      successRate: number
      averageResponseTime: number
      averageTokenUsage: number
      averageCost: number
      strengths: string[]
      weaknesses: string[]
    }>
    bestModel: {
      model: string
      score: number
      reasoning: string
    }
    detailedResults: Array<{
      testCase: number
      results: Array<{
        model: string
        output: any
        score: number
        responseTime: number
        tokenUsage: number
        cost: number
      }>
    }>
  }> {
    const iterations = options.iterations || 1
    const detailedResults: any[] = []
    const modelResults: Record<string, any[]> = {}

    // Initialize model results
    models.forEach(model => {
      modelResults[model] = []
    })

    // Run test cases
    for (let i = 0; i < task.testCases.length; i++) {
      const testCase = task.testCases[i]
      const testCaseResults: any[] = []

      for (const model of models) {
        const modelProvider = this.getModelProvider(model)
        const results: any[] = []

        // Run multiple iterations for statistical significance
        for (let iter = 0; iter < iterations; iter++) {
          const startTime = Date.now()
          
          try {
            const { object: result } = await generateObject({
              model: modelProvider,
              schema: z.object({
                output: z.any(),
                reasoning: z.string().optional()
              }),
              system: task.systemPrompt,
              prompt: JSON.stringify(testCase.input),
              temperature: options.temperature ?? 0.7,
              maxTokens: options.maxTokens ?? 4000
            })

            const endTime = Date.now()
            const responseTime = endTime - startTime

            // Evaluate result
            const score = await this.evaluateResult(
              result.output,
              testCase.expectedOutput,
              testCase.evaluationCriteria
            )

            const tokenUsage = this.estimateTokenUsage(task.systemPrompt, JSON.stringify(testCase.input), JSON.stringify(result.output))
            const cost = this.calculateCost(model, tokenUsage.promptTokens, tokenUsage.completionTokens)

            results.push({
              output: result.output,
              reasoning: result.reasoning,
              score,
              responseTime,
              tokenUsage: tokenUsage.totalTokens,
              cost
            })
          } catch (error) {
            console.error(`Error testing ${model}:`, error)
            results.push({
              output: null,
              reasoning: `Error: ${(error as Error).message}`,
              score: 0,
              responseTime: 0,
              tokenUsage: 0,
              cost: 0
            })
          }
        }

        // Average results across iterations
        const avgResult = {
          model,
          output: results[0]?.output,
          score: results.reduce((sum, r) => sum + r.score, 0) / results.length,
          responseTime: results.reduce((sum, r) => sum + r.responseTime, 0) / results.length,
          tokenUsage: results.reduce((sum, r) => sum + r.tokenUsage, 0) / results.length,
          cost: results.reduce((sum, r) => sum + r.cost, 0) / results.length
        }

        testCaseResults.push(avgResult)
        modelResults[model].push(avgResult)
      }

      detailedResults.push({
        testCase: i + 1,
        results: testCaseResults
      })
    }

    // Analyze model performance
    const modelComparison = await Promise.all(
      models.map(async model => {
        const results = modelResults[model]
        const averageScore = results.reduce((sum, r) => sum + r.score, 0) / results.length
        const successRate = results.filter(r => r.score > 0.7).length / results.length
        const averageResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length
        const averageTokenUsage = results.reduce((sum, r) => sum + r.tokenUsage, 0) / results.length
        const averageCost = results.reduce((sum, r) => sum + r.cost, 0) / results.length

        const { strengths, weaknesses } = await this.analyzeModelPerformance(model, results, task)

        return {
          model,
          averageScore,
          successRate,
          averageResponseTime,
          averageTokenUsage,
          averageCost,
          strengths,
          weaknesses
        }
      })
    )

    // Determine best model
    const bestModel = await this.determineBestModel(modelComparison, task)

    return {
      modelComparison,
      bestModel,
      detailedResults
    }
  }

  /**
   * Stop an active A/B test
   */
  async stopTest(testId: string, reason?: string): Promise<void> {
    const test = this.activeTests.get(testId)
    if (!test) {
      throw new Error(`Test ${testId} not found`)
    }

    test.status = 'completed'
    test.endDate = new Date()

    await this.updateTestConfiguration(test)
    
    console.log(`A/B test stopped: ${test.name} (${testId})${reason ? ` - ${reason}` : ''}`)
  }

  /**
   * Get all active tests
   */
  getActiveTests(): ABTestConfiguration[] {
    return Array.from(this.activeTests.values()).filter(test => test.status === 'running')
  }

  /**
   * Private helper methods
   */
  private generateEqualSplit(variantCount: number): Record<string, number> {
    const split = 1.0 / variantCount
    const trafficSplit: Record<string, number> = {}
    
    for (let i = 0; i < variantCount; i++) {
      trafficSplit[`variant_${i}`] = split
    }
    
    return trafficSplit
  }

  private selectVariant(test: ABTestConfiguration): ABTestVariant {
    const random = Math.random()
    let cumulativeProbability = 0

    for (const variant of test.variants) {
      cumulativeProbability += test.trafficSplit[variant.id] || 0
      if (random <= cumulativeProbability) {
        return variant
      }
    }

    // Fallback to first variant
    return test.variants[0]
  }

  private async calculateExecutionMetrics(
    result: any,
    duration: number,
    success: boolean,
    configuration: any,
    input: any,
    metadata: Record<string, any>
  ): Promise<Record<string, number>> {
    const metrics: Record<string, number> = {
      success_rate: success ? 1 : 0,
      response_time: duration,
      token_usage: this.estimateTokenUsage(
        configuration.systemPrompt || '',
        JSON.stringify(input),
        JSON.stringify(result)
      ).totalTokens,
      quality_score: success ? await this.evaluateQuality(result, input) : 0
    }

    // Add custom metrics from metadata
    Object.entries(metadata).forEach(([key, value]) => {
      if (typeof value === 'number') {
        metrics[key] = value
      }
    })

    return metrics
  }

  private async evaluateQuality(result: any, input: any): Promise<number> {
    try {
      const { object: evaluation } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          score: z.number().min(0).max(1),
          reasoning: z.string()
        }),
        system: 'You are a quality evaluator. Rate the quality of AI agent responses on a scale of 0-1.',
        prompt: `
Input: ${JSON.stringify(input)}
Output: ${JSON.stringify(result)}

Evaluate the quality of this response considering:
- Accuracy and correctness
- Completeness
- Relevance to the input
- Clarity and coherence

Provide a score between 0 and 1.
        `
      })

      return evaluation.score
    } catch (error) {
      console.error('Failed to evaluate quality:', error)
      return 0.5 // Default neutral score
    }
  }

  private estimateTokenUsage(systemPrompt: string, input: string, output: string): {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  } {
    // Rough estimation: ~4 characters per token
    const promptTokens = Math.ceil((systemPrompt + input).length / 4)
    const completionTokens = Math.ceil(output.length / 4)
    
    return {
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens
    }
  }

  private calculateCost(model: string, promptTokens: number, completionTokens: number): number {
    const MODEL_COSTS: Record<string, { input: number; output: number }> = {
      'gpt-4o': { input: 0.005, output: 0.015 },
      'gpt-4o-mini': { input: 0.00015, output: 0.0006 },
      'claude-3-5-sonnet-20241022': { input: 0.003, output: 0.015 },
      'claude-3-haiku-20240307': { input: 0.00025, output: 0.00125 }
    }

    const costs = MODEL_COSTS[model] || { input: 0.001, output: 0.002 }
    return (promptTokens / 1000) * costs.input + (completionTokens / 1000) * costs.output
  }

  private getModelProvider(model: string): any {
    if (model.startsWith('gpt-')) {
      return openai(model)
    } else if (model.startsWith('claude-')) {
      return claude(model)
    }
    // Add more providers as needed
    return openai('gpt-4o') // Default fallback
  }

  private async evaluateResult(
    output: any,
    expectedOutput: any,
    evaluationCriteria: string[]
  ): Promise<number> {
    try {
      const { object: evaluation } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          score: z.number().min(0).max(1),
          criteriaScores: z.record(z.number()),
          reasoning: z.string()
        }),
        system: 'You are an AI output evaluator. Score outputs based on given criteria.',
        prompt: `
Output to evaluate: ${JSON.stringify(output)}
Expected output: ${JSON.stringify(expectedOutput)}
Evaluation criteria: ${evaluationCriteria.join(', ')}

Evaluate the output against each criterion and provide an overall score (0-1).
        `
      })

      return evaluation.score
    } catch (error) {
      console.error('Failed to evaluate result:', error)
      return 0
    }
  }

  private async analyzeModelPerformance(
    model: string,
    results: any[],
    task: any
  ): Promise<{ strengths: string[]; weaknesses: string[] }> {
    try {
      const { object: analysis } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          strengths: z.array(z.string()),
          weaknesses: z.array(z.string())
        }),
        system: 'You are an AI model performance analyst. Identify strengths and weaknesses.',
        prompt: `
Analyze the performance of ${model} on the following task:

Task: ${task.name}
Results: ${JSON.stringify(results.map(r => ({
  score: r.score,
  responseTime: r.responseTime,
  tokenUsage: r.tokenUsage,
  cost: r.cost
})), null, 2)}

Identify the model's strengths and weaknesses based on these results.
        `
      })

      return analysis
    } catch (error) {
      console.error('Failed to analyze model performance:', error)
      return {
        strengths: ['Unable to analyze strengths'],
        weaknesses: ['Unable to analyze weaknesses']
      }
    }
  }

  private async determineBestModel(
    modelComparison: any[],
    task: any
  ): Promise<{ model: string; score: number; reasoning: string }> {
    try {
      const { object: decision } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          bestModel: z.string(),
          score: z.number(),
          reasoning: z.string()
        }),
        system: 'You are an AI model selection expert. Choose the best model based on comprehensive analysis.',
        prompt: `
Task: ${task.name}
Model comparison results:
${JSON.stringify(modelComparison, null, 2)}

Select the best model considering:
- Overall performance score
- Success rate
- Cost efficiency
- Response time
- Task-specific requirements

Provide the model name, overall score, and detailed reasoning.
        `
      })

      return {
        model: decision.bestModel,
        score: decision.score,
        reasoning: decision.reasoning
      }
    } catch (error) {
      console.error('Failed to determine best model:', error)
      const bestByScore = modelComparison.reduce((best, current) => 
        current.averageScore > best.averageScore ? current : best
      )
      return {
        model: bestByScore.model,
        score: bestByScore.averageScore,
        reasoning: 'Selected based on highest average score'
      }
    }
  }

  // Database operations
  private async storeTestConfiguration(config: ABTestConfiguration): Promise<void> {
    try {
      const supabase = await createClient()
      
      await supabase.from('ab_test_configurations').insert({
        test_id: config.testId,
        name: config.name,
        description: config.description,
        variants: config.variants,
        traffic_split: config.trafficSplit,
        metrics: config.metrics,
        start_date: config.startDate.toISOString(),
        end_date: config.endDate?.toISOString(),
        status: config.status
      })
    } catch (error) {
      console.error('Failed to store test configuration:', error)
    }
  }

  private async updateTestConfiguration(config: ABTestConfiguration): Promise<void> {
    try {
      const supabase = await createClient()
      
      await supabase
        .from('ab_test_configurations')
        .update({
          status: config.status,
          end_date: config.endDate?.toISOString()
        })
        .eq('test_id', config.testId)
    } catch (error) {
      console.error('Failed to update test configuration:', error)
    }
  }

  private async recordTestResult(result: ABTestResult): Promise<void> {
    try {
      const supabase = await createClient()
      
      await supabase.from('ab_test_results').insert({
        test_id: result.testId,
        variant_id: result.variantId,
        execution_id: result.executionId,
        metrics: result.metrics,
        outcome: result.outcome,
        timestamp: result.timestamp.toISOString(),
        metadata: result.metadata
      })

      // Add to in-memory cache
      const results = this.testResults.get(result.testId) || []
      results.push(result)
      this.testResults.set(result.testId, results)

      await sendMetrics('ab_test.result', {
        test_id: result.testId,
        variant_id: result.variantId,
        outcome: result.outcome,
        metrics: result.metrics
      })
    } catch (error) {
      console.error('Failed to record test result:', error)
    }
  }

  private async getStoredTestResults(testId: string): Promise<ABTestResult[]> {
    try {
      const supabase = await createClient()
      
      const { data } = await supabase
        .from('ab_test_results')
        .select('*')
        .eq('test_id', testId)
        .order('timestamp')

      return data?.map(result => ({
        testId: result.test_id,
        variantId: result.variant_id,
        executionId: result.execution_id,
        metrics: result.metrics,
        outcome: result.outcome,
        timestamp: new Date(result.timestamp),
        metadata: result.metadata
      })) || []
    } catch (error) {
      console.error('Failed to get stored test results:', error)
      return []
    }
  }

  private async analyzeVariantPerformance(
    test: ABTestConfiguration,
    results: ABTestResult[]
  ): Promise<any[]> {
    return test.variants.map(variant => {
      const variantResults = results.filter(r => r.variantId === variant.id)
      
      if (variantResults.length === 0) {
        return {
          variantId: variant.id,
          variantName: variant.name,
          executions: 0,
          successRate: 0,
          averageResponseTime: 0,
          averageTokenUsage: 0,
          averageQualityScore: 0,
          metrics: {}
        }
      }

      const successRate = variantResults.filter(r => r.outcome === 'success').length / variantResults.length
      const averageResponseTime = variantResults.reduce((sum, r) => sum + (r.metrics.response_time || 0), 0) / variantResults.length
      const averageTokenUsage = variantResults.reduce((sum, r) => sum + (r.metrics.token_usage || 0), 0) / variantResults.length
      const averageQualityScore = variantResults.reduce((sum, r) => sum + (r.metrics.quality_score || 0), 0) / variantResults.length

      // Calculate average for all metrics
      const metrics: Record<string, number> = {}
      test.metrics.forEach(metric => {
        metrics[metric] = variantResults.reduce((sum, r) => sum + (r.metrics[metric] || 0), 0) / variantResults.length
      })

      return {
        variantId: variant.id,
        variantName: variant.name,
        executions: variantResults.length,
        successRate,
        averageResponseTime,
        averageTokenUsage,
        averageQualityScore,
        metrics
      }
    })
  }

  private async calculateStatisticalSignificance(
    test: ABTestConfiguration,
    results: ABTestResult[]
  ): Promise<Record<string, any>> {
    // Simplified statistical significance calculation
    // In a real implementation, you'd use proper statistical tests
    const significance: Record<string, any> = {}

    test.metrics.forEach(metric => {
      const variantData = test.variants.map(variant => {
        const variantResults = results.filter(r => r.variantId === variant.id)
        return variantResults.map(r => r.metrics[metric] || 0)
      })

      // Simple t-test approximation (would need proper implementation)
      significance[metric] = {
        metric,
        pValue: 0.05, // Placeholder
        significant: variantData.length >= 2 && variantData.every(data => data.length >= 30),
        confidenceInterval: [0, 1] // Placeholder
      }
    })

    return significance
  }

  private async determineWinner(
    test: ABTestConfiguration,
    variantPerformance: any[],
    statisticalSignificance: Record<string, any>
  ): Promise<any> {
    if (variantPerformance.length < 2) return null

    // Find variant with best overall performance
    const bestVariant = variantPerformance.reduce((best, current) => {
      const bestScore = best.averageQualityScore * best.successRate
      const currentScore = current.averageQualityScore * current.successRate
      return currentScore > bestScore ? current : best
    })

    // Check if the difference is statistically significant
    const hasSignificantResults = Object.values(statisticalSignificance).some(
      (sig: any) => sig.significant
    )

    if (!hasSignificantResults) return null

    // Calculate improvements over other variants
    const improvements: Record<string, number> = {}
    const otherVariants = variantPerformance.filter(v => v.variantId !== bestVariant.variantId)
    
    if (otherVariants.length > 0) {
      const avgOtherSuccess = otherVariants.reduce((sum, v) => sum + v.successRate, 0) / otherVariants.length
      const avgOtherQuality = otherVariants.reduce((sum, v) => sum + v.averageQualityScore, 0) / otherVariants.length
      
      improvements.successRate = ((bestVariant.successRate - avgOtherSuccess) / avgOtherSuccess) * 100
      improvements.qualityScore = ((bestVariant.averageQualityScore - avgOtherQuality) / avgOtherQuality) * 100
    }

    return {
      variantId: bestVariant.variantId,
      variantName: bestVariant.variantName,
      confidence: 0.95, // Placeholder
      improvements
    }
  }

  private async generateTestInsights(
    test: ABTestConfiguration,
    variantPerformance: any[],
    winner: any
  ): Promise<{ insights: string[]; recommendations: string[] }> {
    try {
      const { object: analysis } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          insights: z.array(z.string()),
          recommendations: z.array(z.string())
        }),
        system: 'You are an A/B testing analyst. Provide insights and recommendations based on test results.',
        prompt: `
A/B Test: ${test.name}
Description: ${test.description}

Variant Performance:
${JSON.stringify(variantPerformance, null, 2)}

Winner: ${winner ? JSON.stringify(winner, null, 2) : 'No clear winner'}

Provide insights about the test results and recommendations for next steps.
        `
      })

      return analysis
    } catch (error) {
      console.error('Failed to generate test insights:', error)
      return {
        insights: ['Unable to generate insights due to analysis error'],
        recommendations: ['Review test results manually and consider extending the test duration']
      }
    }
  }
}