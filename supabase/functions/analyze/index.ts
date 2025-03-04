import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { OpenAI } from 'https://esm.sh/openai@4.20.1';

// Initialize OpenAI client with env variable
const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

// Type definitions
interface AnalyzeRequest {
  content: string;
  query: string;
  depth?: number;
}

interface AnalyzeResponse {
  success: boolean;
  summary: string;
  findings: string[];
  error?: string;
}

serve(async (req: Request) => {
  try {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Get the request body
    const requestBody = await req.json() as AnalyzeRequest;
    const { content, query, depth = 1 } = requestBody;

    // Validate required fields
    if (!content || !query) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: content, query' 
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Generate analysis prompt
    const prompt = `
You are a research analyst expert in analyzing and extracting information from content.
You will be given content from a web page and a research query.
Your task is to analyze the content and extract the most relevant information related to the query.

RESEARCH QUERY: "${query}"

CONTENT:
${content.substring(0, 15000)} // Limit to 15000 chars to avoid token limits

Depth level: ${depth} (Higher means more detailed analysis)

Please provide:

1. A concise summary of the content as it relates to the research query (100-200 words)
2. A list of key findings or facts extracted from the content (up to 8 items)
3. Determine the relevance and credibility of this content to the research query (scale 0-10)

FORMAT YOUR RESPONSE IN JSON:
{
  "summary": "Concise summary here",
  "findings": ["Finding 1", "Finding 2", "Finding 3", ...],
  "relevance": 7,
  "credibility": 8
}
`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a research analyst that extracts information from content and provides structured analysis.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    });

    // Parse the response
    const analysisText = response.choices[0]?.message?.content || '{}';
    let analysis;
    
    try {
      analysis = JSON.parse(analysisText);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      
      // Attempt to extract JSON from the response if it's not properly formatted
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          analysis = JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error('Failed to extract JSON from response:', e);
          analysis = { 
            summary: 'Failed to parse analysis',
            findings: ['Error processing content'],
            relevance: 0,
            credibility: 0
          };
        }
      } else {
        analysis = { 
          summary: 'Failed to parse analysis',
          findings: ['Error processing content'],
          relevance: 0,
          credibility: 0
        };
      }
    }

    // Return the analysis
    return new Response(
      JSON.stringify({
        success: true,
        summary: analysis.summary || 'No summary available',
        findings: analysis.findings || [],
        relevance: analysis.relevance || 0,
        credibility: analysis.credibility || 0,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error in analyze function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'An unknown error occurred',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}); 