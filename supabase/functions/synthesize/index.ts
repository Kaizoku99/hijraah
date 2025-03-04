import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { OpenAI } from 'https://esm.sh/openai@4.20.1';

// Initialize OpenAI client with env variable
const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

// Type definitions
interface SynthesizeRequest {
  query: string;
  findings: string;
  sources: Array<{
    url: string;
    title: string;
    relevance: number;
  }>;
}

interface SynthesizeResponse {
  success: boolean;
  title: string;
  summary: string;
  keyFindings: string[];
  gaps: string[];
  nextSteps: string[];
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
    const requestBody = await req.json() as SynthesizeRequest;
    const { query, findings, sources } = requestBody;

    // Validate required fields
    if (!query || !findings) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: query, findings' 
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

    // Format sources for the prompt
    const sourcesText = sources && sources.length > 0
      ? sources.map((source, index) => 
          `${index + 1}. "${source.title}" - ${source.url} (Relevance: ${source.relevance}/1.0)`
        ).join('\n')
      : 'No sources provided';

    // Generate synthesis prompt
    const prompt = `
You are a research synthesis expert. Your job is to create a comprehensive synthesis of research findings.
You will be provided with a research query, a set of findings from multiple sources, and a list of those sources.
Your task is to synthesize this information into a coherent, insightful research report.

RESEARCH QUERY: "${query}"

FINDINGS FROM SOURCES:
${findings.substring(0, 8000)} // Limit to 8000 chars to avoid token limits

SOURCES USED:
${sourcesText}

Please create a comprehensive synthesis with:

1. A descriptive title for the research (25 words or less)
2. An executive summary (300-500 words)
3. 5-10 key findings with supporting evidence
4. 2-3 identified gaps in the research
5. 2-3 recommended next steps for further research

FORMAT YOUR RESPONSE IN JSON:
{
  "title": "Descriptive title here",
  "summary": "Executive summary here",
  "keyFindings": ["Key finding 1", "Key finding 2", ...],
  "gaps": ["Research gap 1", "Research gap 2", ...],
  "nextSteps": ["Next step 1", "Next step 2", ...]
}
`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a research synthesis expert that combines findings from multiple sources into a comprehensive report.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 2500,
      response_format: { type: 'json_object' },
    });

    // Parse the response
    const synthesisText = response.choices[0]?.message?.content || '{}';
    let synthesis;
    
    try {
      synthesis = JSON.parse(synthesisText);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      
      // Attempt to extract JSON from the response if it's not properly formatted
      const jsonMatch = synthesisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          synthesis = JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error('Failed to extract JSON from response:', e);
          synthesis = { 
            title: `Research on ${query}`,
            summary: 'Failed to generate synthesis',
            keyFindings: ['Error processing findings'],
            gaps: ['Unknown due to processing error'],
            nextSteps: ['Retry synthesis process']
          };
        }
      } else {
        synthesis = { 
          title: `Research on ${query}`,
          summary: 'Failed to generate synthesis',
          keyFindings: ['Error processing findings'],
          gaps: ['Unknown due to processing error'],
          nextSteps: ['Retry synthesis process']
        };
      }
    }

    // Return the synthesis
    return new Response(
      JSON.stringify({
        success: true,
        title: synthesis.title || `Research on ${query}`,
        summary: synthesis.summary || 'No summary available',
        keyFindings: synthesis.keyFindings || [],
        gaps: synthesis.gaps || [],
        nextSteps: synthesis.nextSteps || [],
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error: any) {
    console.error('Error in synthesize function:', error);
    
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