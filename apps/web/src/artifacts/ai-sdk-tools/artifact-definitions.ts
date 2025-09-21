"use client";

import { artifact } from '@ai-sdk-tools/artifacts';
import { z } from 'zod';

/**
 * Text Artifact Definition with AI SDK Tools
 * Enhanced with Zod schema validation and progress tracking
 */
export const textArtifactSchema = z.object({
  title: z.string().default(''),
  content: z.string().default(''),
  status: z.enum(['idle', 'loading', 'streaming', 'complete', 'error']).default('idle'),
  documentId: z.string().optional(),
  wordCount: z.number().default(0),
  characterCount: z.number().default(0),
  lastModified: z.date().optional(),
});

export const textArtifact = artifact('text-artifact', textArtifactSchema);

/**
 * Code Artifact Definition with AI SDK Tools
 * Enhanced with language support and execution status
 */
export const codeArtifactSchema = z.object({
  title: z.string().default(''),
  content: z.string().default(''),
  language: z.string().default('javascript'),
  status: z.enum(['idle', 'loading', 'streaming', 'complete', 'error']).default('idle'),
  documentId: z.string().optional(),
  isExecuting: z.boolean().default(false),
  executionResult: z.object({
    output: z.string().optional(),
    error: z.string().optional(),
    timestamp: z.date().optional(),
  }).optional(),
  lineCount: z.number().default(0),
});

export const codeArtifact = artifact('code-artifact', codeArtifactSchema);

/**
 * Sheet Artifact Definition with AI SDK Tools
 * Enhanced with column metadata and data validation
 */
export const sheetArtifactSchema = z.object({
  title: z.string().default(''),
  status: z.enum(['idle', 'loading', 'streaming', 'complete', 'error']).default('idle'),
  documentId: z.string().optional(),
  columns: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['string', 'number', 'boolean', 'date']).default('string'),
    width: z.number().optional(),
  })).default([]),
  rows: z.array(z.record(z.string(), z.any())).default([]),
  rowCount: z.number().default(0),
  columnCount: z.number().default(0),
  isFiltered: z.boolean().default(false),
  isSorted: z.boolean().default(false),
  sortColumn: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});

export const sheetArtifact = artifact('sheet-artifact', sheetArtifactSchema);

/**
 * Image Artifact Definition with AI SDK Tools
 * Enhanced with metadata and processing status
 */
export const imageArtifactSchema = z.object({
  title: z.string().default(''),
  status: z.enum(['idle', 'loading', 'streaming', 'complete', 'error']).default('idle'),
  documentId: z.string().optional(),
  url: z.string().url().optional(),
  base64: z.string().optional(),
  metadata: z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    format: z.string().optional(),
    size: z.number().optional(),
    altText: z.string().optional(),
  }).optional(),
  isProcessing: z.boolean().default(false),
  processingProgress: z.number().min(0).max(1).default(0),
  annotations: z.array(z.object({
    id: z.string(),
    type: z.string(),
    x: z.number(),
    y: z.number(),
    width: z.number().optional(),
    height: z.number().optional(),
    text: z.string().optional(),
  })).default([]),
});

export const imageArtifact = artifact('image-artifact', imageArtifactSchema);

/**
 * Generic Artifact Definition for unknown types
 * Provides fallback support for any artifact type
 */
export const genericArtifactSchema = z.object({
  title: z.string().default(''),
  content: z.any().optional(),
  status: z.enum(['idle', 'loading', 'streaming', 'complete', 'error']).default('idle'),
  documentId: z.string().optional(),
  kind: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const genericArtifact = artifact('generic-artifact', genericArtifactSchema);

/**
 * All artifact definitions for easy access
 */
export const artifactDefinitions = {
  text: textArtifact,
  code: codeArtifact,
  sheet: sheetArtifact,
  image: imageArtifact,
  generic: genericArtifact,
} as const;

export type ArtifactType = keyof typeof artifactDefinitions;

// Type helpers for getting artifact data types
export type TextArtifactData = z.infer<typeof textArtifactSchema>;
export type CodeArtifactData = z.infer<typeof codeArtifactSchema>;
export type SheetArtifactData = z.infer<typeof sheetArtifactSchema>;
export type ImageArtifactData = z.infer<typeof imageArtifactSchema>;
export type GenericArtifactData = z.infer<typeof genericArtifactSchema>;

// Union type for all artifact data
export type ArtifactData = 
  | TextArtifactData 
  | CodeArtifactData 
  | SheetArtifactData 
  | ImageArtifactData 
  | GenericArtifactData;