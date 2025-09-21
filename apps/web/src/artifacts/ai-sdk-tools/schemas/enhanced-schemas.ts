"use client";

import { z } from 'zod';

/**
 * Enhanced Zod Schemas for Runtime Validation
 * Provides comprehensive validation with better error messages and type safety
 */

// Base schemas
export const artifactStatusSchema = z.enum(['idle', 'loading', 'streaming', 'complete', 'error'], {
  errorMap: (issue, ctx) => ({
    message: `Status must be one of: idle, loading, streaming, complete, error. Got: ${ctx.data}`
  })
});

export const documentIdSchema = z.string().min(1, "Document ID cannot be empty").optional();

export const timestampSchema = z.union([z.date(), z.string().datetime()]).transform((val) => 
  val instanceof Date ? val : new Date(val)
);

// Progress schema with validation
export const progressSchema = z.number()
  .min(0, "Progress cannot be negative")
  .max(1, "Progress cannot exceed 1")
  .optional();

// Enhanced Text Artifact Schema
export const enhancedTextArtifactSchema = z.object({
  title: z.string()
    .min(1, "Title cannot be empty")
    .max(200, "Title cannot exceed 200 characters")
    .default(''),
  content: z.string()
    .max(100000, "Content cannot exceed 100,000 characters") // Reasonable limit
    .default(''),
  status: artifactStatusSchema,
  documentId: documentIdSchema,
  
  // Enhanced metadata
  wordCount: z.number()
    .min(0, "Word count cannot be negative")
    .default(0),
  characterCount: z.number()
    .min(0, "Character count cannot be negative") 
    .default(0),
  paragraphCount: z.number()
    .min(0, "Paragraph count cannot be negative")
    .default(0),
  
  // Timestamps
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
  lastModified: timestampSchema.optional(),
  
  // Language and formatting
  language: z.enum(['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh', 'ko', 'ru', 'ar'])
    .default('en')
    .optional(),
  format: z.enum(['plain', 'markdown', 'html', 'rich'])
    .default('plain')
    .optional(),
    
  // Collaboration features
  isReadonly: z.boolean().default(false),
  collaborators: z.array(z.string()).default([]),
  
  // Progress and streaming
  progress: progressSchema,
  estimatedLength: z.number().min(0).optional(),
});

// Enhanced Code Artifact Schema  
export const enhancedCodeArtifactSchema = z.object({
  title: z.string()
    .min(1, "Title cannot be empty")
    .max(200, "Title cannot exceed 200 characters")
    .default(''),
  content: z.string()
    .max(50000, "Code cannot exceed 50,000 characters")
    .default(''),
  language: z.enum([
    'javascript', 'typescript', 'python', 'java', 'cpp', 'c', 'csharp',
    'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'scala', 'clojure',
    'haskell', 'elm', 'fsharp', 'ocaml', 'erlang', 'elixir', 'dart',
    'r', 'julia', 'matlab', 'sql', 'html', 'css', 'scss', 'less',
    'json', 'xml', 'yaml', 'toml', 'ini', 'dockerfile', 'bash', 'zsh',
    'powershell', 'vim', 'lua', 'perl', 'asm'
  ], {
    errorMap: () => ({ message: "Unsupported programming language" })
  }).default('javascript'),
  status: artifactStatusSchema,
  documentId: documentIdSchema,
  
  // Code-specific metadata
  lineCount: z.number().min(0).default(0),
  complexity: z.number().min(0).max(10).optional(),
  estimatedRuntime: z.number().min(0).optional(), // in milliseconds
  
  // Execution environment
  isExecuting: z.boolean().default(false),
  executionResult: z.object({
    output: z.string().optional(),
    error: z.string().optional(),
    exitCode: z.number().optional(),
    timestamp: timestampSchema.optional(),
    duration: z.number().min(0).optional(), // in milliseconds
  }).optional(),
  
  // Code quality metrics
  linting: z.object({
    errors: z.number().min(0).default(0),
    warnings: z.number().min(0).default(0),
    suggestions: z.number().min(0).default(0),
    issues: z.array(z.object({
      line: z.number().min(1),
      column: z.number().min(1),
      severity: z.enum(['error', 'warning', 'info', 'hint']),
      message: z.string(),
      rule: z.string().optional(),
    })).default([]),
  }).optional(),
  
  // Dependencies and imports
  dependencies: z.array(z.string()).default([]),
  imports: z.array(z.string()).default([]),
  
  // Timestamps
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
  lastExecuted: timestampSchema.optional(),
  
  // Progress
  progress: progressSchema,
});

// Enhanced Sheet Artifact Schema
export const enhancedSheetArtifactSchema = z.object({
  title: z.string()
    .min(1, "Title cannot be empty")
    .max(200, "Title cannot exceed 200 characters")
    .default(''),
  status: artifactStatusSchema,
  documentId: documentIdSchema,
  
  // Column definitions
  columns: z.array(z.object({
    id: z.string().min(1, "Column ID cannot be empty"),
    name: z.string().min(1, "Column name cannot be empty"),
    type: z.enum(['string', 'number', 'boolean', 'date', 'currency', 'percentage', 'url', 'email']),
    width: z.number().min(50).max(1000).optional(),
    sortable: z.boolean().default(true),
    filterable: z.boolean().default(true),
    required: z.boolean().default(false),
    validation: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      pattern: z.string().optional(),
      format: z.string().optional(),
    }).optional(),
  })).default([]),
  
  // Row data with validation
  rows: z.array(z.record(z.string(), z.any()))
    .max(10000, "Cannot exceed 10,000 rows")
    .default([]),
  
  // Statistics
  rowCount: z.number().min(0).default(0),
  columnCount: z.number().min(0).default(0),
  
  // Filtering and sorting
  isFiltered: z.boolean().default(false),
  isSorted: z.boolean().default(false),
  sortColumn: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  filters: z.array(z.object({
    column: z.string(),
    operator: z.enum(['equals', 'contains', 'startsWith', 'endsWith', 'greaterThan', 'lessThan']),
    value: z.any(),
  })).default([]),
  
  // Pagination
  pageSize: z.number().min(10).max(1000).default(50),
  currentPage: z.number().min(1).default(1),
  
  // Export options
  exportFormats: z.array(z.enum(['csv', 'json', 'xlsx', 'pdf'])).default(['csv', 'json']),
  
  // Timestamps
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
  
  // Progress
  progress: progressSchema,
});

// Enhanced Image Artifact Schema
export const enhancedImageArtifactSchema = z.object({
  title: z.string()
    .min(1, "Title cannot be empty")
    .max(200, "Title cannot exceed 200 characters")
    .default(''),
  status: artifactStatusSchema,
  documentId: documentIdSchema,
  
  // Image sources
  url: z.string().url("Invalid image URL").optional(),
  base64: z.string()
    .regex(/^data:image\/[a-zA-Z]+;base64,/, "Invalid base64 image format")
    .optional(),
  blob: z.instanceof(Blob).optional(),
  
  // Image metadata
  metadata: z.object({
    width: z.number().min(1, "Width must be positive").optional(),
    height: z.number().min(1, "Height must be positive").optional(),
    format: z.enum(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp']).optional(),
    size: z.number().min(0, "Size cannot be negative").optional(), // in bytes
    colorSpace: z.enum(['rgb', 'rgba', 'cmyk', 'grayscale']).optional(),
    dpi: z.number().min(1).optional(),
    altText: z.string().max(500, "Alt text cannot exceed 500 characters").optional(),
    caption: z.string().max(1000, "Caption cannot exceed 1000 characters").optional(),
  }).optional(),
  
  // Processing state
  isProcessing: z.boolean().default(false),
  processingProgress: progressSchema,
  processingStep: z.enum(['uploading', 'analyzing', 'optimizing', 'generating', 'finalizing']).optional(),
  
  // Annotations and markup
  annotations: z.array(z.object({
    id: z.string(),
    type: z.enum(['text', 'arrow', 'rectangle', 'circle', 'highlight', 'blur']),
    x: z.number(),
    y: z.number(),
    width: z.number().optional(),
    height: z.number().optional(),
    text: z.string().optional(),
    style: z.object({
      color: z.string().optional(),
      fontSize: z.number().optional(),
      fontFamily: z.string().optional(),
      strokeWidth: z.number().optional(),
      opacity: z.number().min(0).max(1).optional(),
    }).optional(),
  })).default([]),
  
  // Filters and effects
  filters: z.object({
    brightness: z.number().min(0).max(2).default(1),
    contrast: z.number().min(0).max(2).default(1),
    saturation: z.number().min(0).max(2).default(1),
    blur: z.number().min(0).max(10).default(0),
    sepia: z.number().min(0).max(1).default(0),
    grayscale: z.number().min(0).max(1).default(0),
  }).optional(),
  
  // Timestamps
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
  
  // Progress
  progress: progressSchema,
});

// Generic Artifact Schema for unknown types
export const enhancedGenericArtifactSchema = z.object({
  title: z.string().default(''),
  content: z.any().optional(),
  status: artifactStatusSchema,
  documentId: documentIdSchema,
  kind: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  progress: progressSchema,
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
});

// Validation utilities
export const validationUtils = {
  /**
   * Validate artifact data with detailed error reporting
   */
  validateArtifact: <T>(schema: z.ZodSchema<T>, data: unknown) => {
    const result = schema.safeParse(data);
    
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message,
        code: err.code,
      }));
      
      return {
        success: false,
        errors,
        data: null,
      };
    }
    
    return {
      success: true,
      errors: [],
      data: result.data,
    };
  },

  /**
   * Transform legacy artifact data to new schema format
   */
  transformLegacyData: (legacyData: any, targetType: 'text' | 'code' | 'sheet' | 'image' | 'generic') => {
    const baseTransform = {
      title: legacyData.title || '',
      status: legacyData.status || 'idle',
      documentId: legacyData.documentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    switch (targetType) {
      case 'text':
        return {
          ...baseTransform,
          content: legacyData.content || '',
          wordCount: typeof legacyData.content === 'string' 
            ? legacyData.content.split(/\s+/).filter(w => w.length > 0).length 
            : 0,
          characterCount: typeof legacyData.content === 'string' 
            ? legacyData.content.length 
            : 0,
        };
        
      case 'code':
        return {
          ...baseTransform,
          content: legacyData.content || '',
          language: legacyData.language || 'javascript',
          lineCount: typeof legacyData.content === 'string'
            ? legacyData.content.split('\n').length
            : 0,
        };
        
      case 'sheet':
        return {
          ...baseTransform,
          columns: legacyData.columns || [],
          rows: legacyData.rows || [],
          rowCount: Array.isArray(legacyData.rows) ? legacyData.rows.length : 0,
          columnCount: Array.isArray(legacyData.columns) ? legacyData.columns.length : 0,
        };
        
      case 'image':
        return {
          ...baseTransform,
          url: legacyData.url,
          metadata: legacyData.metadata || {},
        };
        
      default:
        return {
          ...baseTransform,
          content: legacyData.content,
          kind: legacyData.kind,
          metadata: legacyData.metadata,
        };
    }
  },

  /**
   * Generate schema documentation
   */
  generateSchemaDoc: (schema: z.ZodSchema<any>) => {
    // This is a simplified version - in practice, you'd want a more sophisticated approach
    return {
      type: schema._def.typeName,
      description: 'Generated schema documentation',
      properties: Object.keys(schema._def.shape || {}),
    };
  },
};

// Export all enhanced schemas
export const enhancedSchemas = {
  text: enhancedTextArtifactSchema,
  code: enhancedCodeArtifactSchema, 
  sheet: enhancedSheetArtifactSchema,
  image: enhancedImageArtifactSchema,
  generic: enhancedGenericArtifactSchema,
} as const;

// Type exports
export type EnhancedTextArtifactData = z.infer<typeof enhancedTextArtifactSchema>;
export type EnhancedCodeArtifactData = z.infer<typeof enhancedCodeArtifactSchema>;
export type EnhancedSheetArtifactData = z.infer<typeof enhancedSheetArtifactSchema>;
export type EnhancedImageArtifactData = z.infer<typeof enhancedImageArtifactSchema>;
export type EnhancedGenericArtifactData = z.infer<typeof enhancedGenericArtifactSchema>;

export type EnhancedArtifactData = 
  | EnhancedTextArtifactData
  | EnhancedCodeArtifactData
  | EnhancedSheetArtifactData
  | EnhancedImageArtifactData
  | EnhancedGenericArtifactData;