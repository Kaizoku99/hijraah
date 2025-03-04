# restore-project.ps1
# Script to restore Hijraah project from backup

$backupPath = "E:\downloads\hijraah_backup_20250223_035027"
$projectPath = "E:\downloads\Hijraah"

# Check if backup path exists
if (-not (Test-Path $backupPath)) {
    Write-Error "Backup path not found: $backupPath"
    exit 1
}

# Check if project path exists
if (-not (Test-Path $projectPath)) {
    Write-Error "Project path not found: $projectPath"
    exit 1
}

# Create a temporary backup of the current project
$tempBackupPath = "$projectPath-temp-backup-$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Write-Host "Creating temporary backup of current project to $tempBackupPath..."
Copy-Item -Path $projectPath -Destination $tempBackupPath -Recurse -Force

# Function to restore specific directories
function Restore-Directory {
    param (
        [string]$Source,
        [string]$Destination,
        [string]$DirectoryName
    )

    $sourcePath = Join-Path -Path $Source -ChildPath $DirectoryName
    $destinationPath = Join-Path -Path $Destination -ChildPath $DirectoryName

    if (Test-Path $sourcePath) {
        Write-Host "Restoring $DirectoryName..."
        if (-not (Test-Path $destinationPath)) {
            New-Item -Path $destinationPath -ItemType Directory -Force | Out-Null
        }
        Copy-Item -Path "$sourcePath\*" -Destination $destinationPath -Recurse -Force
    }
    else {
        Write-Host "Directory not found in backup: $DirectoryName" -ForegroundColor Yellow
    }
}

# Restore key directories
Write-Host "Starting project restoration from backup..."

# Restore src directory and its contents
Restore-Directory -Source $backupPath -Destination $projectPath -DirectoryName "src"

# Restore configuration files
$configFiles = @(
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "next.config.js",
    "next.config.mjs",
    "tailwind.config.ts",
    "postcss.config.js",
    "components.json"
)

foreach ($file in $configFiles) {
    $sourceFile = Join-Path -Path $backupPath -ChildPath $file
    $destinationFile = Join-Path -Path $projectPath -ChildPath $file
    
    if (Test-Path $sourceFile) {
        Write-Host "Restoring $file..."
        Copy-Item -Path $sourceFile -Destination $destinationFile -Force
    }
    else {
        Write-Host "File not found in backup: $file" -ForegroundColor Yellow
    }
}

# Restore other important directories
$directories = @(
    "public",
    "supabase",
    "messages",
    "docs",
    "config",
    "data",
    "__tests__"
)

foreach ($dir in $directories) {
    Restore-Directory -Source $backupPath -Destination $projectPath -DirectoryName $dir
}

# Create directories for the restructured project
$newDirectories = @(
    "src/features/immigration/components",
    "src/features/immigration/lib",
    "src/features/immigration/api",
    "src/features/research/components",
    "src/features/research/lib",
    "src/features/research/api",
    "src/features/auth/components",
    "src/features/dashboard/components",
    "src/features/chat/components",
    "src/features/profile/components",
    "src/features/documents/components",
    "src/shared/components/ui",
    "src/shared/hooks",
    "src/shared/utils",
    "src/shared/styles",
    "src/app/[locale]/(marketing)",
    "src/app/[locale]/(static)"
)

foreach ($dir in $newDirectories) {
    $path = Join-Path -Path $projectPath -ChildPath $dir
    if (-not (Test-Path $path)) {
        Write-Host "Creating directory: $dir"
        New-Item -Path $path -ItemType Directory -Force | Out-Null
    }
}

# Restore specific files from the chat history
# Restore Research Processor
$researchProcessorDir = Join-Path -Path $projectPath -ChildPath "src/features/research/lib"
$researchProcessorFile = Join-Path -Path $researchProcessorDir -ChildPath "processor.ts"

if (-not (Test-Path $researchProcessorDir)) {
    New-Item -Path $researchProcessorDir -ItemType Directory -Force | Out-Null
}

$researchProcessorContent = @'
import { OpenAI } from 'openai';
import { SupabaseClient } from '@supabase/supabase-js';
import { Document } from '@/types/document';
import { cache } from '@/lib/cache';

const CACHE_TTL = 3600; // 1 hour

export class ResearchProcessor {
  private openai: OpenAI;
  private supabase: SupabaseClient;

  constructor(
    apiKey: string,
    supabaseUrl: string,
    supabaseKey: string
  ) {
    this.openai = new OpenAI({ apiKey });
    this.supabase = new SupabaseClient(supabaseUrl, supabaseKey);
  }

  async deepResearch(query: string, options: {
    country?: string;
    category?: string;
    depth?: 'basic' | 'detailed' | 'comprehensive';
  }): Promise<string> {
    try {
      const cacheKey = `research:${JSON.stringify({ query, options })}`;
      const cached = await cache.get(cacheKey);
      if (cached) return cached;

      const relevantDocs = await this.getRelevantContent(query, options);
      const context = relevantDocs.map(doc => doc.content).join('\n---\n');

      const systemPrompt = this.getSystemPrompt(options.depth || 'detailed');
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Research Query: ${query}\n\nContext:\n${context}`
          }
        ],
        temperature: 0.3,
        max_tokens: 3000
      });

      const research = response.choices[0].message.content;
      if (!research) throw new Error('Failed to generate research');
      
      await cache.set(cacheKey, research, CACHE_TTL);
      return research;
    } catch (error) {
      console.error('Research error:', error);
      throw error;
    }
  }

  private getSystemPrompt(depth: 'basic' | 'detailed' | 'comprehensive'): string {
    const basePrompt = `You are an expert immigration research system. Analyze the provided information and generate a comprehensive research report.

Instructions:
1. Structure the analysis clearly with sections and subsections
2. Focus on accuracy and detail
3. Cite specific requirements and conditions
4. Include relevant timelines and deadlines
5. Note any exceptions or special cases
6. Consider cost implications
7. Reference official sources when available
8. Highlight key points and takeaways`;

    switch (depth) {
      case 'basic':
        return `${basePrompt}\n\nProvide a basic overview focusing on key points and essential information.`;
      case 'comprehensive':
        return `${basePrompt}\n\nProvide an exhaustive analysis including:
- Historical context and policy evolution
- Comparative analysis with similar policies
- Statistical data and trends
- Expert opinions and interpretations
- Future outlook and potential changes
- Risk analysis and mitigation strategies
- Alternative pathways and options
- Case studies and precedents`;
      default:
        return `${basePrompt}\n\nProvide a detailed analysis balancing depth with clarity.`;
    }
  }

  private async getRelevantContent(query: string, options: {
    country?: string;
    category?: string;
  }): Promise<Document[]> {
    const { data: documents, error } = await this.supabase
      .from('documents')
      .select('*')
      .textSearch('content', query)
      .eq('country', options.country || '')
      .eq('category', options.category || '')
      .limit(10);

    if (error) throw error;
    return documents || [];
  }
}
'@

Set-Content -Path $researchProcessorFile -Value $researchProcessorContent

# Restore Document Type
$typesDir = Join-Path -Path $projectPath -ChildPath "src/types"
$documentTypeFile = Join-Path -Path $typesDir -ChildPath "document.ts"

if (-not (Test-Path $typesDir)) {
    New-Item -Path $typesDir -ItemType Directory -Force | Out-Null
}

$documentTypeContent = @'
export interface Document {
  id: string;
  title: string;
  content: string;
  url: string;
  country: string;
  category: string;
  lastUpdated?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
'@

Set-Content -Path $documentTypeFile -Value $documentTypeContent

# Restore DeepResearch Component
$researchComponentsDir = Join-Path -Path $projectPath -ChildPath "src/features/research/components"
$deepResearchFile = Join-Path -Path $researchComponentsDir -ChildPath "DeepResearch.tsx"

if (-not (Test-Path $researchComponentsDir)) {
    New-Item -Path $researchComponentsDir -ItemType Directory -Force | Out-Null
}

$deepResearchContent = @'
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { countryConfigs } from '@/lib/scrapers/config';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DeepResearchProps {
  onResearch: (query: string, options: {
    country?: string;
    category?: string;
    depth: 'basic' | 'detailed' | 'comprehensive';
  }) => Promise<void>;
  isLoading: boolean;
  results: string | null;
}

const categories = [
  'visa',
  'study',
  'work',
  'immigrate',
  'citizenship',
];

const depthLevels = [
  { value: 'basic', label: 'Basic Overview' },
  { value: 'detailed', label: 'Detailed Analysis' },
  { value: 'comprehensive', label: 'Comprehensive Research' },
] as const;

export function DeepResearch({
  onResearch,
  isLoading,
  results,
}: DeepResearchProps) {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDepth, setSelectedDepth] = useState<'basic' | 'detailed' | 'comprehensive'>('detailed');

  const availableCountries = Object.keys(countryConfigs);

  const handleResearch = async () => {
    if (!query.trim()) {
      toast.error('Please enter a research query');
      return;
    }

    try {
      await onResearch(query, {
        country: selectedCountry || undefined,
        category: selectedCategory || undefined,
        depth: selectedDepth,
      });
    } catch (error) {
      console.error('Research error:', error);
      toast.error('Failed to perform research. Please try again.');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Deep Immigration Research</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Research Query</h3>
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your research question..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Country (Optional)</h3>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Country</SelectItem>
                  {availableCountries.map(country => (
                    <SelectItem key={country} value={country}>
                      {country.charAt(0).toUpperCase() + country.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Category (Optional)</h3>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Category</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Research Depth</h3>
              <Select value={selectedDepth} onValueChange={(value: 'basic' | 'detailed' | 'comprehensive') => setSelectedDepth(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select depth" />
                </SelectTrigger>
                <SelectContent>
                  {depthLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          onClick={handleResearch}
          disabled={isLoading || !query.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Researching...
            </>
          ) : (
            'Start Deep Research'
          )}
        </Button>

        {results && (
          <>
            <Separator />
            <div className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold mb-4">Research Results</h2>
              <ScrollArea className="h-[600px]">
                <div className="prose dark:prose-invert max-w-none">
                  {results}
                </div>
              </ScrollArea>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
'@

Set-Content -Path $deepResearchFile -Value $deepResearchContent

# Restore Research Page
$researchPageDir = Join-Path -Path $projectPath -ChildPath "src/app/research"
$researchPageFile = Join-Path -Path $researchPageDir -ChildPath "page.tsx"

if (-not (Test-Path $researchPageDir)) {
    New-Item -Path $researchPageDir -ItemType Directory -Force | Out-Null
}

$researchPageContent = @'
'use client';

import { useState } from 'react';
import { DeepResearch } from '@/features/research/components/DeepResearch';
import { ResearchProcessor } from '@/features/research/lib/processor';
import { toast } from 'sonner';

const researchProcessor = new ResearchProcessor(
  process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default function ResearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const handleResearch = async (query: string, options: {
    country?: string;
    category?: string;
    depth: 'basic' | 'detailed' | 'comprehensive';
  }) => {
    setIsLoading(true);
    try {
      const research = await researchProcessor.deepResearch(query, options);
      setResults(research);
      toast.success('Research completed successfully');
    } catch (error) {
      console.error('Research error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to complete research');
      setResults('Failed to complete research. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Deep Immigration Research</h1>
      <DeepResearch
        onResearch={handleResearch}
        isLoading={isLoading}
        results={results}
      />
    </div>
  );
}
'@

Set-Content -Path $researchPageFile -Value $researchPageContent

# Create cache.ts if it doesn't exist
$libDir = Join-Path -Path $projectPath -ChildPath "src/lib"
$cacheFile = Join-Path -Path $libDir -ChildPath "cache.ts"

if (-not (Test-Path $libDir)) {
    New-Item -Path $libDir -ItemType Directory -Force | Out-Null
}

if (-not (Test-Path $cacheFile)) {
    $cacheContent = @'
// Simple in-memory cache implementation
type CacheEntry = {
  value: string;
  expiresAt: number;
};

class Cache {
  private cache: Map<string, CacheEntry> = new Map();

  async get(key: string): Promise<string | null> {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000
    });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

export const cache = new Cache();
'@
    Set-Content -Path $cacheFile -Value $cacheContent
}

# Create country config if it doesn't exist
$scrapersDir = Join-Path -Path $projectPath -ChildPath "src/lib/scrapers"
$configFile = Join-Path -Path $scrapersDir -ChildPath "config.ts"

if (-not (Test-Path $scrapersDir)) {
    New-Item -Path $scrapersDir -ItemType Directory -Force | Out-Null
}

if (-not (Test-Path $configFile)) {
    $configContent = @'
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

export type CountryConfig = z.infer<typeof CountryConfig>;

export const countryConfigs: Record<string, CountryConfig> = {
  australia: {
    baseUrl: 'https://immi.homeaffairs.gov.au',
    paths: [
      '/visa-staying-australia',
      '/visa-work-australia',
      '/visa-study-australia',
    ],
    language: 'en',
    rateLimit: 2000,
    selectors: {
      content: '.main-content',
      lastUpdated: '.last-updated',
      title: 'h1',
      category: '.breadcrumb',
    },
  },
  canada: {
    baseUrl: 'https://www.canada.ca',
    paths: [
      '/en/immigration-refugees-citizenship/services/immigrate-canada.html',
      '/en/immigration-refugees-citizenship/services/study-canada.html',
      '/en/immigration-refugees-citizenship/services/work-canada.html',
    ],
    language: 'en',
    rateLimit: 1500,
    selectors: {
      content: '#wb-auto-4',
      lastUpdated: '.datemod',
      title: 'h1',
      category: '.breadcrumb',
    },
  },
  uk: {
    baseUrl: 'https://www.gov.uk',
    paths: [
      '/browse/visas-immigration/work-visas',
      '/browse/visas-immigration/student-visas',
      '/browse/visas-immigration/family-visas',
    ],
    language: 'en',
    rateLimit: 1000,
    selectors: {
      content: '.govuk-main-wrapper',
      lastUpdated: '.gem-c-metadata__definition',
      title: 'h1',
      category: '.govuk-breadcrumbs',
    },
  },
  usa: {
    baseUrl: 'https://www.uscis.gov',
    paths: [
      '/working-in-the-united-states',
      '/family',
      '/green-card',
    ],
    language: 'en',
    rateLimit: 3000,
    selectors: {
      content: '.page-content',
      lastUpdated: '.field--name-field-last-update',
      title: 'h1',
      category: '.breadcrumb',
    },
  },
  newzealand: {
    baseUrl: 'https://www.immigration.govt.nz',
    paths: [
      '/new-zealand-visas/options/live-permanently',
      '/new-zealand-visas/options/work',
      '/new-zealand-visas/options/study',
    ],
    language: 'en',
    rateLimit: 1200,
    selectors: {
      content: '.main-content',
      lastUpdated: '.last-modified',
      title: 'h1',
      category: '.breadcrumbs',
    },
  },
  germany: {
    baseUrl: 'https://www.make-it-in-germany.com',
    paths: [
      '/en/visa-residence',
      '/en/study-training',
      '/en/working-in-germany',
    ],
    language: 'en',
    rateLimit: 1000,
    selectors: {
      content: '.content-main',
      title: 'h1',
      category: '.breadcrumb',
    },
  },
};
'@
    Set-Content -Path $configFile -Value $configContent
}

# Install required dependencies
Write-Host "Installing required dependencies..."
Set-Location $projectPath
npm install --save openai @supabase/supabase-js zod sonner lucide-react

Write-Host "Project restored successfully from backup!" -ForegroundColor Green
Write-Host "Temporary backup of the original project is available at: $tempBackupPath" -ForegroundColor Green 