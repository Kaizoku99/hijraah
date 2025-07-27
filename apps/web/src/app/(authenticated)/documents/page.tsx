"use client";

import { Search, Plus, FileText, Globe, Shield } from "lucide-react";
import Link from "next/link";
import { Suspense } from 'react';

import { DocumentList } from '@/components/ui/documents/DocumentList';
import { ArtifactProvider } from '@/lib/contexts/artifact-context';
import { Button } from '@/ui/button';
import { Skeleton } from '@/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

function DocumentListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="h-12 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-52 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Documents</h1>
          <p className="text-muted-foreground">
            Manage and organize your immigration related documents.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/documents/create" legacyBehavior>
              <Plus className="mr-2 h-4 w-4" /> Create Document
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/documents/search" legacyBehavior>
              <Search className="mr-2 h-4 w-4" /> Semantic Search
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/documents/scrape" legacyBehavior>
              <Globe className="mr-2 h-4 w-4" /> Scrape Website
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/admin/scraping-sources" legacyBehavior>
              <Shield className="mr-2 h-4 w-4" /> Manage Sources
            </Link>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="ai-generated" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="ai-generated">AI-Generated Documents</TabsTrigger>
          <TabsTrigger value="scraped">Website Scrapes</TabsTrigger>
          <TabsTrigger value="uploaded">Uploaded Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-generated" className="space-y-4">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              These documents are generated with AI assistance based on your inputs.
            </p>
          </div>
          <ArtifactProvider>
            <Suspense fallback={<DocumentListSkeleton />}>
              <DocumentList />
            </Suspense>
          </ArtifactProvider>
        </TabsContent>

        <TabsContent value="scraped" className="space-y-4">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Documents created from web content using the scraper tool.
            </p>
          </div>
          <ArtifactProvider>
            <Suspense fallback={<DocumentListSkeleton />}>
              <DocumentList />
            </Suspense>
          </ArtifactProvider>
        </TabsContent>

        <TabsContent value="uploaded" className="space-y-4">
          <div className="bg-muted/50 p-12 rounded-md text-center">
            <h3 className="text-lg font-medium mb-2">Document Upload Feature</h3>
            <p className="text-muted-foreground mb-4">
              This feature is coming soon. You will be able to upload and process documents with AI.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}