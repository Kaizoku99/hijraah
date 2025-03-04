import { useState } from 'react'
import { SearchEngine } from '@/lib/scrapers/search'
import { SearchResult } from '@/types/search'

interface SearchOptions {
  searchMode?: 'vector' | 'firecrawl' | 'hybrid'
  rerank?: boolean
  filters?: Record<string, string>
}

interface SearchParams {
  query: string
  model: string
  options?: SearchOptions
}

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const search = async ({ query, model, options }: SearchParams) => {
    try {
      setIsSearching(true)
      setError(null)

      const searchEngine = new SearchEngine({
        modelManager: {
          model,
          temperature: 0.3,
          maxTokens: 1000
        }
      })

      const searchResults = await searchEngine.search(query, options)
      setResults(searchResults)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Search failed'))
      throw err
    } finally {
      setIsSearching(false)
    }
  }

  const clearResults = () => {
    setResults([])
    setError(null)
  }

  return {
    results,
    isSearching,
    error,
    search,
    clearResults
  }
}