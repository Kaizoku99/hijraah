import { z } from "zod";

export const CountryConfig = z.object({
  name: z.string(),
  baseUrl: z.string().url(),
  paths: z.array(z.string()),
  language: z.string(),
  rateLimit: z.number().int().positive(),
  selectors: z.object({
    content: z.string(),
    title: z.string(),
    lastUpdated: z.string().optional(),
    listItem: z.string().optional(),
    nextPage: z.string().optional(),
  }),
  source_type: z.string(),
  country_code: z.string().optional(),
  is_active: z.boolean(),
  trackChanges: z.boolean().optional().default(false),
  pageOptions: z
    .object({
      formats: z.array(z.string()).optional(),
      changeTrackingOptions: z
        .object({
          modes: z.array(z.enum(["git-diff", "json"])).optional(),
          schema: z.record(z.any()).optional(),
        })
        .optional(),
    })
    .optional(),
});

export type CountryConfigType = z.infer<typeof CountryConfig>;

// Remove static countryConfigs - this will be loaded from DB
// export const countryConfigs: Record<string, CountryConfigType> = { ... };

// Remove ScrapedData schema - content goes to R2, metadata to scraped_sources table
// export const ScrapedData = z.object({ ... });
// export type ScrapedDataType = z.infer<typeof ScrapedData>;
