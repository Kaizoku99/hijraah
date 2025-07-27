import { useState } from 'react'

import { AIModelManager } from '@/lib/ai/models'
import { CredibilityScorer } from '@/lib/analysis/credibility'
import { CrossReferenceAnalyzer } from '@/lib/analysis/cross-reference'
import { TimelineAnalyzer } from '@/lib/analysis/timeline'
import { SearchResult } from '@/types/search'

interface AnalysisOptions {
  timeline?: {
    granularity: 'day' | 'week' | 'month' | 'year'
    includeTrends?: boolean
  }
  credibility?: {
    minConfidence?: number
  }
  crossReference?: {
    minSimilarity?: number
    maxConnections?: number
  }
}

interface AnalysisParams {
  sources: SearchResult[]
  model: string
  options?: AnalysisOptions
}

export function useAnalysis() {
  const [timeline, setTimeline] = useState<any[]>([])
  const [credibility, setCredibility] = useState<any[]>([])
  const [crossReferences, setCrossReferences] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const analyze = async ({ sources, model, options }: AnalysisParams) => {
    try {
      setIsAnalyzing(true)
      setError(null)

      const modelManager = new AIModelManager({
        model,
        temperature: 0.3,
        maxTokens: 1000
      })

      // Run analyses in parallel
      const [timelineResults, credibilityResults, crossRefResults] = await Promise.all([
        // Timeline analysis
        new TimelineAnalyzer(modelManager).createTimeline(
          sources.map(s => ({
            date: new Date(s.metadata?.date || Date.now()),
            title: s.title,
            description: s.description,
            sources: [s.url],
            importance: s.score,
            relatedEvents: [],
            confidence: 0.8
          })),
          {
            granularity: options?.timeline?.granularity || 'month',
            includeTrends: options?.timeline?.includeTrends
          }
        ),

        // Credibility analysis
        Promise.all(
          sources.map(s =>
            new CredibilityScorer(modelManager).scoreSource(
              s.content,
              {
                domain: new URL(s.url).hostname,
                publishDate: s.metadata?.date ? new Date(s.metadata.date) : undefined,
                citations: s.metadata?.citations,
                backlinks: s.metadata?.backlinks
              }
            )
          )
        ),

        // Cross-reference analysis
        new CrossReferenceAnalyzer(modelManager).analyzeSources(
          sources.map(s => ({
            id: s.url,
            content: s.content
          })),
          {
            minSimilarity: options?.crossReference?.minSimilarity,
            maxConnections: options?.crossReference?.maxConnections
          }
        )
      ])

      setTimeline(timelineResults)
      setCredibility(credibilityResults)
      setCrossReferences(crossRefResults)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Analysis failed'))
      throw err
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clearAnalysis = () => {
    setTimeline([])
    setCredibility([])
    setCrossReferences([])
    setError(null)
  }

  return {
    timeline,
    credibility,
    crossReferences,
    isAnalyzing,
    error,
    analyze,
    clearAnalysis
  }
}