import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cache } from "hono/cache";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase/client";


/**
 * Immigration routes for immigration-related operations
 */
export function setupImmigrationRoutes(app: Hono) {
  // Validation schemas
  const countryQuerySchema = z.object({
    country: z.string().min(2).max(100),
  });

  const compareQuerySchema = z.object({
    countries: z.array(z.string().min(2).max(100)).min(2).max(5),
    category: z
      .enum([
        "visa",
        "citizenship",
        "residence",
        "business",
        "tax",
        "education",
        "healthcare",
      ])
      .optional(),
  });

  // Get immigration information for a specific country
  app.get(
    "/immigration/country",
    zValidator("query", countryQuerySchema),
    cache({
      cacheName: "immigration-country",
      cacheControl: "public, max-age=86400", // 24 hours
    }),
    async (c) => {
      const { country } = c.req.valid("query");

      try {
        const supabase = createServiceClient();
        const { data, error } = await supabase
          .from("immigration_data")
          .select("*")
          .eq("country", country)
          .single();

        if (error) throw error;

        return c.json({
          success: true,
          data,
        });
      } catch (error: any) {
        console.error("Immigration data fetch error:", error);
        throw new HTTPException(500, {
          message: "Failed to fetch immigration data",
        });
      }
    }
  );

  // Compare immigration policies between countries
  app.post(
    "/immigration/compare",
    zValidator("json", compareQuerySchema),
    cache({
      cacheName: "immigration-compare",
      cacheControl: "public, max-age=86400", // 24 hours
    }),
    async (c) => {
      const { countries, category } = c.req.valid("json");

      try {
        const supabase = createServiceClient();
        const { data, error } = await supabase
          .from("immigration_data")
          .select("*")
          .in("country", countries);

        if (error) throw error;

        // Filter by category if provided
        let filteredData = data;
        if (category) {
          filteredData = data.filter((item) => item.category === category);
        }

        return c.json({
          success: true,
          data: filteredData,
        });
      } catch (error: any) {
        console.error("Immigration comparison error:", error);
        throw new HTTPException(500, {
          message: "Failed to compare immigration data",
        });
      }
    }
  );

  // Get all available countries for immigration
  app.get(
    "/immigration/countries",
    cache({
      cacheName: "immigration-countries",
      cacheControl: "public, max-age=86400", // 24 hours
    }),
    async (c) => {
      try {
        const supabase = createServiceClient();
        const { data, error } = await supabase
          .from("immigration_data")
          .select("country")
          .order("country");

        if (error) throw error;

        // Extract unique countries
        const countries = [...new Set(data.map((item) => item.country))];

        return c.json({
          success: true,
          countries,
        });
      } catch (error: any) {
        console.error("Countries fetch error:", error);
        throw new HTTPException(500, { message: "Failed to fetch countries" });
      }
    }
  );

  return app;
}
