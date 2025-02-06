import { z } from 'zod';

export const CountryConfig = z.object({
  baseUrl: z.string().url(),
  paths: z.array(z.string()),
  language: z.string(),
  rateLimit: z.number().default(1000),
  selectors: z.object({
    content: z.string(),
    lastUpdated: z.string().optional(),
    title: z.string(),
    category: z.string(),
  }),
});

export type CountryConfigType = z.infer<typeof CountryConfig>;

export const countryConfigs: Record<string, CountryConfigType> = {
  canada: {
    baseUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship',
    paths: ['/visa', '/study', '/work', '/immigrate'],
    language: 'en',
    rateLimit: 2000,
    selectors: {
      content: 'main',
      lastUpdated: '.datemod',
      title: 'h1',
      category: '.gc-document-type',
    },
  },
  australia: {
    baseUrl: 'https://immi.homeaffairs.gov.au',
    paths: ['/visa', '/study', '/work', '/migrate'],
    language: 'en',
    rateLimit: 2000,
    selectors: {
      content: '.main-content',
      title: 'h1',
      category: '.visa-category',
    },
  },
  germany: {
    baseUrl: 'https://www.bamf.de/EN/Themen/themen-node.html',
    paths: ['/migration', '/visa', '/study', '/work'],
    language: 'en',
    rateLimit: 2000,
    selectors: {
      content: '.article',
      title: 'h1',
      category: '.category-label',
    },
  },
  france: {
    baseUrl: 'https://france-visas.gouv.fr/en',
    paths: ['/web/france-visas/visa-types', '/web/france-visas/work', '/web/france-visas/study'],
    language: 'en',
    rateLimit: 2000,
    selectors: {
      content: '.content-area',
      title: 'h1',
      category: '.visa-type',
    },
  },
  netherlands: {
    baseUrl: 'https://ind.nl/en',
    paths: ['/en/residence-permits', '/en/work', '/en/study'],
    language: 'en',
    rateLimit: 2000,
    selectors: {
      content: '.content-container',
      title: 'h1',
      category: '.permit-type',
    },
  },
};

export const ScrapedData = z.object({
  url: z.string().url(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  country: z.string(),
  language: z.string(),
  lastUpdated: z.date().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export type ScrapedDataType = z.infer<typeof ScrapedData>; 