import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { createDataStreamResponse, streamText, tool } from "ai";
import { nanoid } from "nanoid";
import { z } from "zod";

import { customModel } from "@/lib/ai/models";
import { tools as aiTools } from "@/lib/ai/tools";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { ChatMessage, StreamData, ToolCallResult } from "@/types/chat";

// Define the system prompt for the AI assistant
export const systemPrompt = ({
  selectedChatModel,
}: {
  selectedChatModel: string;
}) => {
  return `You are an AI assistant for the Hijraah immigration platform. 
  You provide accurate, helpful information about immigration processes, requirements, and deadlines.
  You can help users with document analysis, eligibility assessment, and general immigration questions.
  
  When responding:
  - Be concise and accurate
  - Cite sources when possible
  - Provide step-by-step guidance for complex processes
  - Respect user privacy and never ask for sensitive personal information
  - If you don't know something, admit it and suggest where the user might find the information
  
  You have access to various tools to help users with their immigration journey.`;
};

// Define the tool names
export type ToolName =
  | "search"
  | "extract"
  | "scrape"
  | "createDocument"
  | "updateDocument"
  | "deepResearch"
  | "checkEligibility"
  | "getWeather"
  | "requestSuggestions";

// Define the active tools
export const activeTools: ToolName[] = [
  "search",
  "extract",
  "scrape",
  "createDocument",
  "updateDocument",
  "deepResearch",
  "checkEligibility",
  "getWeather",
  "requestSuggestions",
];

// Combine existing tools with new tools
export const combinedTools = {
  ...aiTools,

  // Add tools from the AI chatbot implementation
  getWeather: tool({
    description: "Get the current weather in a given location",
    parameters: z.object({
      location: z
        .string()
        .describe("The city and state, e.g. San Francisco, CA"),
    }),
    execute: async ({ location }: { location: string }) => {
      return {
        location,
        temperature: "72°F",
        forecast: ["sunny", "windy"],
      };
    },
  }),

  requestSuggestions: tool({
    description: "Request suggestions for the user based on the conversation",
    parameters: z.object({
      query: z.string().describe("The query to get suggestions for"),
    }),
    execute: async ({ query }: { query: string }, { dataStream }) => {
      try {
        // Send a loading state to the client
        dataStream?.update({
          id: nanoid(),
          type: "tool-call",
          state: "loading",
          name: "requestSuggestions",
        });

        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Generate suggestions based on the query
        const suggestions = [
          "How do I check my eligibility for immigration?",
          "What documents do I need for a work visa?",
          "How long does the immigration process take?",
        ];

        // Update the data stream with the result
        dataStream?.update({
          id: nanoid(),
          type: "tool-call",
          state: "complete",
          name: "requestSuggestions",
          result: { suggestions },
        });

        return { suggestions };
      } catch (error) {
        console.error("Error requesting suggestions:", error);

        // Update the data stream with the error
        dataStream?.update({
          id: nanoid(),
          type: "tool-call",
          state: "error",
          name: "requestSuggestions",
          error: "Failed to get suggestions",
        });

        return { suggestions: [] };
      }
    },
  }),
};

// Create a function to handle AI chat requests
export async function handleAIChatRequest({
  messages,
  selectedChatModel = "gpt-4o",
  userId,
  chatId,
  dataStream,
}: {
  messages: ChatMessage[];
  selectedChatModel?: string;
  userId?: string;
  chatId: string;
  dataStream?: StreamData;
}) {
  // Get the appropriate model based on the selection
  const model = customModel(selectedChatModel);

  // Create the stream response
  return streamText({
    model,
    system: systemPrompt({ selectedChatModel }),
    messages,
    maxSteps: 5,
    experimental_activeTools: activeTools,
    experimental_transform: (chunk) => chunk,
    experimental_generateMessageId: () => nanoid(),
    tools: combinedTools,
    onFinish: async ({ response, reasoning }) => {
      if (userId) {
        try {
          // Save the chat history to the database
          const supabase = getSupabaseClient();

          // Save the response message
          await supabase.from("chat_messages").insert({
            id: response.id || nanoid(),
            chat_id: chatId,
            user_id: userId,
            role: "assistant",
            content: response.content,
            created_at: new Date().toISOString(),
          });

          // If there's reasoning, save it as metadata
          if (reasoning) {
            await supabase.from("chat_message_metadata").insert({
              message_id: response.id || nanoid(),
              reasoning,
              created_at: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error("Failed to save chat:", error);
        }
      }
    },
  });
}

// Create a function to create a data stream response
export function createAIChatResponse({
  messages,
  selectedChatModel = "gpt-4o",
  userId,
  chatId,
}: {
  messages: ChatMessage[];
  selectedChatModel?: string;
  userId?: string;
  chatId: string;
}) {
  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = handleAIChatRequest({
        messages,
        selectedChatModel,
        userId,
        chatId,
        dataStream,
      });

      result.then((stream) => {
        stream.consumeStream();
        stream.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      });
    },
    onError: (error) => {
      console.error("Error in AI chat response:", error);
      return "An error occurred while processing your request. Please try again.";
    },
  });
}
