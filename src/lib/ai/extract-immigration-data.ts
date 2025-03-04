/**
 * Immigration Data Extraction Utility
 * 
 * Uses OpenAI's API to extract structured immigration data from text content.
 * Identifies key information like visa requirements, processing times, fees, etc.
 */

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Structure for immigration data
export interface ImmigrationData {
  // Document classification
  documentType: string; // 'policy' | 'guide' | 'form' | 'article' | 'news' | 'forum' | 'other'
  
  // Key information
  visaTypes?: string[];
  countries?: string[];
  fees?: string[];
  processingTimes?: string[];
  requirements?: string[];
  eligibilityCriteria?: string[];
  documentationNeeded?: string[];
  
  // Dates and deadlines
  validFrom?: string;
  validUntil?: string;
  applicationDeadlines?: string[];
  
  // Source credibility
  sourceType: string; // 'government' | 'legal' | 'news' | 'forum' | 'blog' | 'other'
  credibilityScore?: number; // 0-100
  
  // Additional context
  keyPoints?: string[];
  warnings?: string[];
  tips?: string[];
  
  // Metadata
  extractedAt: string;
}

// Default empty immigration data object
const defaultImmigrationData: ImmigrationData = {
  documentType: 'other',
  sourceType: 'other',
  extractedAt: new Date().toISOString(),
};

/**
 * Extract structured immigration data from text content
 */
export async function extractImmigrationData(
  text: string, 
  sourceUrl?: string
): Promise<ImmigrationData> {
  try {
    // Determine source type from URL if available
    const sourceType = sourceUrl ? determineSourceType(sourceUrl) : 'other';
    
    // Create system prompt for extraction
    const systemPrompt = `You are an immigration data extraction specialist. Extract structured data from the given text.
    Focus on identifying key information about immigration processes, visa requirements, fees, processing times, eligibility criteria, etc.
    Format your response as a valid JSON object with the following structure:
    {
      "documentType": string, // 'policy', 'guide', 'form', 'article', 'news', 'forum', 'other'
      "visaTypes": string[],
      "countries": string[],
      "fees": string[],
      "processingTimes": string[],
      "requirements": string[],
      "eligibilityCriteria": string[],
      "documentationNeeded": string[],
      "validFrom": string, // ISO date format if available
      "validUntil": string, // ISO date format if available
      "applicationDeadlines": string[],
      "sourceType": "${sourceType}",
      "credibilityScore": number, // 0-100 based on source reliability and content quality
      "keyPoints": string[],
      "warnings": string[],
      "tips": string[]
    }
    
    If a field cannot be determined or is not mentioned, omit it from the response.
    For dates, convert any mentioned dates to ISO format when possible.
    Be objective and extract only factual information.`;
    
    // Call OpenAI to extract data
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });
    
    // Parse the response
    const content = response.choices[0].message.content || '{}';
    const extractedData: Partial<ImmigrationData> = JSON.parse(content);
    
    // Merge with default data and ensure extractedAt is present
    return {
      ...defaultImmigrationData,
      ...extractedData,
      sourceType,
      extractedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error extracting immigration data:', error);
    return {
      ...defaultImmigrationData,
      sourceType: sourceUrl ? determineSourceType(sourceUrl) : 'other',
      warnings: ['Error extracting structured data from content'],
    };
  }
}

/**
 * Determine source type based on URL
 */
function determineSourceType(url: string): string {
  const lowercaseUrl = url.toLowerCase();
  
  // Government sites
  if (
    lowercaseUrl.includes('.gov') || 
    lowercaseUrl.includes('.gc.ca') ||
    lowercaseUrl.includes('.gouv.') ||
    lowercaseUrl.includes('government') ||
    lowercaseUrl.includes('immigration') && (
      lowercaseUrl.includes('.ca') ||
      lowercaseUrl.includes('.us') ||
      lowercaseUrl.includes('.uk') ||
      lowercaseUrl.includes('.au')
    )
  ) {
    return 'government';
  }
  
  // Legal sites
  if (
    lowercaseUrl.includes('law') ||
    lowercaseUrl.includes('legal') ||
    lowercaseUrl.includes('attorney') ||
    lowercaseUrl.includes('solicitor') ||
    lowercaseUrl.includes('advocate')
  ) {
    return 'legal';
  }
  
  // News sites
  if (
    lowercaseUrl.includes('news') ||
    lowercaseUrl.includes('times') ||
    lowercaseUrl.includes('post') ||
    lowercaseUrl.includes('herald') ||
    lowercaseUrl.includes('guardian') ||
    lowercaseUrl.includes('bbc') ||
    lowercaseUrl.includes('cnn') ||
    lowercaseUrl.includes('reuters')
  ) {
    return 'news';
  }
  
  // Forums
  if (
    lowercaseUrl.includes('forum') ||
    lowercaseUrl.includes('community') ||
    lowercaseUrl.includes('discuss') ||
    lowercaseUrl.includes('reddit.com')
  ) {
    return 'forum';
  }
  
  // Blogs
  if (
    lowercaseUrl.includes('blog') ||
    lowercaseUrl.includes('wordpress') ||
    lowercaseUrl.includes('medium.com')
  ) {
    return 'blog';
  }
  
  // Default
  return 'other';
}

/**
 * Calculate credibility score based on content and source
 */
export async function calculateCredibilityScore(
  text: string, 
  sourceType: string
): Promise<number> {
  // Base scores by source type
  const baseScores: Record<string, number> = {
    'government': 90,
    'legal': 80,
    'news': 70,
    'forum': 40,
    'blog': 50,
    'other': 30
  };
  
  // Get base score
  const baseScore = baseScores[sourceType] || 30;
  
  // For non-government sources, analyze content quality
  if (sourceType !== 'government') {
    const systemPrompt = `You are an expert at evaluating the credibility of immigration information.
    Analyze the given text and rate its credibility on a scale of 0-100 based on the following criteria:
    - Factual accuracy and alignment with known immigration policies
    - Presence of citations or references to official sources
    - Currency of information (mentions of dates/recent policy changes)
    - Objective tone vs. subjective opinions
    - Professional language vs. informal/emotional language
    - Comprehensiveness of information
    
    Return only a number from 0-100, nothing else.`;
    
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text.substring(0, 2000) } // Only analyze first part for efficiency
        ],
        temperature: 0.3,
        max_tokens: 5
      });
      
      const contentScore = parseInt(response.choices[0].message.content || '0', 10);
      
      if (!isNaN(contentScore) && contentScore >= 0 && contentScore <= 100) {
        // Weight: 70% base score (source type) + 30% content quality
        return Math.round(baseScore * 0.7 + contentScore * 0.3);
      }
    } catch (error) {
      console.error('Error calculating credibility score:', error);
    }
  }
  
  return baseScore;
} 