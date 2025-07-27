/// <reference lib="deno.ns" />

import { OpenAI } from "npm:openai@4.20.1";

// Initialize OpenAI client with env variable
const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

// Type definitions
interface QueryRequest {
  originalQuery: string;
  findings: string;
  depth: number;
}

interface QueryResponse {
  success: boolean;
  queries: string[];
  error?: string;
}

Deno.serve(async (req: Request) => {
  try {
    // Handle CORS preflight request
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Get the request body
    const requestBody = (await req.json()) as QueryRequest;
    const { originalQuery, findings, depth } = requestBody;

    // Validate required fields
    if (!originalQuery) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required field: originalQuery",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    // Generate follow-up queries prompt
    const prompt = `
You are a research analyst expert in generating targeted follow-up questions to deepen research on a topic.
You will be given an original research query and the findings so far.
Your task is to generate ${3 + depth} follow-up queries that will help uncover new information.

ORIGINAL RESEARCH QUERY: "${originalQuery}"

CURRENT FINDINGS:
${findings || "No findings yet available."}

Current research depth: ${depth} (Higher means we're getting more detailed/specific)

Please generate follow-up questions that:
1. Fill gaps in the research not covered by the original query
2. Explore potential contradictions or inconsistencies
3. Look for deeper details on the most important aspects
4. Target specific aspects that would strengthen the overall research
5. Increase in specificity with each level of depth

FORMAT YOUR RESPONSE IN JSON:
{
  "queries": [
    "Follow-up query 1",
    "Follow-up query 2",
    "Follow-up query 3",
    ...
  ]
}
`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a research analyst that generates targeted follow-up questions to deepen research.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7, // Higher temperature for more diverse questions
      max_tokens: 800,
      response_format: { type: "json_object" },
    });

    // Parse the response
    const queriesText = response.choices[0]?.message?.content || "{}";
    let queriesData;

    try {
      queriesData = JSON.parse(queriesText);
    } catch (error) {
      console.error("Failed to parse OpenAI response:", error);

      // Attempt to extract JSON from the response if it's not properly formatted
      const jsonMatch = queriesText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          queriesData = JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error("Failed to extract JSON from response:", e);
          queriesData = {
            queries: [`More specific information about ${originalQuery}`],
          };
        }
      } else {
        queriesData = {
          queries: [`More specific information about ${originalQuery}`],
        };
      }
    }

    // Return the queries
    return new Response(
      JSON.stringify({
        success: true,
        queries: queriesData.queries || [
          `More specific information about ${originalQuery}`,
        ],
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (error: any) {
    console.error("Error in generate-queries function:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An unknown error occurred",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
});
