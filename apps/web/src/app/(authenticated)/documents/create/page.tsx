"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from 'react';

import { DocumentForm } from '@/components/ui/documents/DocumentForm';
import { ArtifactProvider } from '@/lib/contexts/artifact-context';
import { Button } from '@/ui/button';

function DocumentGeneratorSkeleton() {
    return (
        <div className="w-full max-w-4xl mx-auto bg-muted/20 rounded-lg p-8 animate-pulse">
            <div className="h-8 w-64 bg-muted mb-4 rounded-md"></div>
            <div className="h-4 w-96 bg-muted/70 mb-8 rounded-md"></div>
            <div className="space-y-6">
                <div className="h-10 w-full bg-muted rounded-md"></div>
                <div className="h-32 w-full bg-muted rounded-md"></div>
                <div className="h-20 w-full bg-muted rounded-md"></div>
                <div className="flex justify-end">
                    <div className="h-10 w-32 bg-muted rounded-md"></div>
                </div>
            </div>
        </div>
    );
}

export default function CreateDocumentPage() {
    return (
        <div className="container py-8">
            <div className="flex items-center mb-6">
                <Link href="/documents" legacyBehavior>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Documents
                    </Button>
                </Link>
            </div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Create AI Document</h1>
            </div>
            <ArtifactProvider>
                <Suspense fallback={<DocumentGeneratorSkeleton />}>
                    <DocumentForm />
                </Suspense>
            </ArtifactProvider>
        </div>
    );
} 