/// <reference lib="deno.ns" />

import { ApiError } from "../_shared/types.ts";
import { analyzeQuery } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { query, context } = await req.json();

    if (!query) {
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Analyze query intent and complexity
    const analysis = await analyzeQuery(query);

    // Determine the appropriate service endpoint
    let serviceEndpoint: string;
    if (analysis.requiresLegalExpertise) {
      serviceEndpoint = Deno.env.get("LEGAL_AGENT_ENDPOINT") ?? "";
    } else if (analysis.isDocumentRelated) {
      serviceEndpoint = Deno.env.get("DOCUMENT_AGENT_ENDPOINT") ?? "";
    } else {
      serviceEndpoint = Deno.env.get("GENERAL_AGENT_ENDPOINT") ?? "";
    }

    if (!serviceEndpoint) {
      return new Response(
        JSON.stringify({ error: "Service endpoint not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // Forward the request to the appropriate service
    const response = await fetch(serviceEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, context, analysis }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const apiError: ApiError = {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
    return new Response(JSON.stringify({ error: apiError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
