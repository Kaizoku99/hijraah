import { tool } from "ai";
import { z } from "zod";
import { logger } from "@/lib/logger";

export const getWeather = tool({
  description: "Get the current weather at a specific location",
  // AI SDK v5 Beta - Using parameters schema (inputSchema/outputSchema may not be available in beta.6)
  parameters: z.object({
    latitude: z.number().describe("Latitude coordinate"),
    longitude: z.number().describe("Longitude coordinate"),
  }),
  execute: async ({ latitude, longitude }) => {
    // Context7 - Observability: Log tool execution start
    logger.info("Weather tool execution started", {
      latitude,
      longitude,
    });

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const weatherData = await response.json();

      // Context7 - Observability: Log successful weather fetch
      logger.info("Weather data fetched successfully", {
        latitude,
        longitude,
        temperature: weatherData.current?.temperature_2m,
        responseSize: JSON.stringify(weatherData).length,
      });

      return weatherData;
    } catch (error) {
      // Context7 - Observability: Log errors
      logger.error(
        "Weather tool execution failed",
        error instanceof Error ? error : new Error(String(error)),
        {
          latitude,
          longitude,
        },
      );
      throw error;
    }
  },
});
