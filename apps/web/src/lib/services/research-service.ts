import FirecrawlApp from '@mendable/firecrawl-js';

import { 
  DeepResearchState, 
  Activity, 
  Source 
} from '@/lib/contexts/deep-research-context';

// Initialize Firecrawl client
const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY || '',
});

// Type for mapping Firecrawl response to our app's data structure
type FirecrawlMapper = {
  mapSources: (firecrawlSources: any[]) => Source[];
  mapActivities: (firecrawlActivities: any[]) => Activity[];
};

// Helper functions to map Firecrawl data to our app structure
const firecrawlMapper: FirecrawlMapper = {
  mapSources: (firecrawlSources) => {
    return firecrawlSources.map(source => ({
      url: source.url,
      title: source.title,
      description: source.description || '',
      relevance: source.relevance,
    }));
  },
  mapActivities: (firecrawlActivities) => {
    return firecrawlActivities.map(activity => ({
      type: mapActivityType(activity.type),
      status: mapActivityStatus(activity.status),
      message: activity.message,
      timestamp: activity.timestamp,
      depth: activity.depth,
    }));
  },
};

// Map Firecrawl activity types to our app's activity types
function mapActivityType(firecrawlType: string): Activity['type'] {
  const typeMap: Record<string, Activity['type']> = {
    'search': 'search',
    'extract': 'extract',
    'analyze': 'analyze',
    'reasoning': 'reasoning',
    'synthesis': 'synthesis',
    'thought': 'thought',
    'error': 'error',
  };
  return typeMap[firecrawlType] || 'analyze';
}

// Map Firecrawl activity status to our app's status
function mapActivityStatus(firecrawlStatus: string): Activity['status'] {
  const statusMap: Record<string, Activity['status']> = {
    'processing': 'pending',
    'completed': 'complete',
    'in_progress': 'pending',
    'error': 'error',
  };
  return statusMap[firecrawlStatus] || 'pending';
}

// Research service with Firecrawl and fallback
export const researchService = {
  async performResearch(query: string, maxDepth: number = 3) {
    try {
      // Try using Firecrawl first
      console.log('Using Firecrawl Deep Research API...');
      
      // Define parameters for Firecrawl API
      const params = {
        maxDepth,
        timeLimit: 180, // 3 minutes
        maxUrls: 15,    // Maximum URLs to analyze
      };
      
      // Start the research with Firecrawl
      const results = await firecrawl.deep_research(query, params);
      
      if (results.success) {
        // Map Firecrawl response to our app's structure
        return {
          sources: firecrawlMapper.mapSources(results.data.sources || []),
          activities: firecrawlMapper.mapActivities(results.data.activities || []),
          currentDepth: results.currentDepth || 1,
          maxDepth: results.maxDepth || maxDepth,
          completedSteps: results.data.activities?.length || 0,
          totalExpectedSteps: (results.maxDepth || maxDepth) * 5, // Estimate 5 steps per depth level
          finalAnalysis: results.data.finalAnalysis,
          success: true,
        };
      } else {
        throw new Error('Firecrawl research failed');
      }
    } catch (error) {
      console.error('Firecrawl error, falling back to local implementation:', error);
      
      // Fallback to current implementation
      // Note: Implement the actual fallback logic here that calls your existing code
      return await fallbackResearchImplementation(query, maxDepth);
    }
  }
};

// Implement the fallback research function that uses your current implementation
async function fallbackResearchImplementation(query: string, maxDepth: number) {
  // This should call your existing research implementation
  // For now, we'll just return a placeholder
  console.log('Using fallback research implementation...');
  
  // Make API call to your existing endpoint
  const response = await fetch('/api/deep-research', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      query, 
      maxDepth 
    }),
  });
  
  return await response.json();
}
