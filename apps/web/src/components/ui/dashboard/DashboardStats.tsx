'use client';

import { FileCheck, Briefcase, AlertCircle, FileText, CheckCircle, XCircle } from 'lucide-react';

import { Case } from '@/types/cases';
import { Document } from '@/types/documents';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { TabsContent } from '@/ui/tabs';

interface DashboardStatsProps {
    cases: Case[];
    documents: Document[];
    activeTab: string;
}

export function DashboardStats({ cases, documents, activeTab }: DashboardStatsProps) {
    // Count cases by status
    const activeCases = cases.filter((c) => c.status === 'active').length;
    const pendingReviewCases = cases.filter((c) => c.status === 'pending_review').length;
    const completedCases = cases.filter((c) => c.status === 'completed').length;

    // Count documents by status
    const processingDocs = documents.filter((d) => d.status === 'processing').length;
    const readyDocs = documents.filter((d) => d.status === 'ready').length;
    const errorDocs = documents.filter((d) => d.status === 'error').length;

    // Display stats based on active tab
    if (activeTab === 'cases') {
        return (
            <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Cases
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeCases}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {activeCases > 0
                                ? `${Math.round((activeCases / cases.length) * 100)}% of total cases`
                                : 'No active cases'}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Review
                        </CardTitle>
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingReviewCases}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {pendingReviewCases > 0
                                ? `${Math.round((pendingReviewCases / cases.length) * 100)}% of total cases`
                                : 'No pending reviews'}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Completed Cases
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedCases}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {completedCases > 0
                                ? `${Math.round((completedCases / cases.length) * 100)}% of total cases`
                                : 'No completed cases'}
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (activeTab === 'documents') {
        return (
            <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Processing
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{processingDocs}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {processingDocs > 0
                                ? `${Math.round((processingDocs / documents.length) * 100)}% of total documents`
                                : 'No documents processing'}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Ready
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{readyDocs}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {readyDocs > 0
                                ? `${Math.round((readyDocs / documents.length) * 100)}% of total documents`
                                : 'No ready documents'}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Error
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{errorDocs}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {errorDocs > 0
                                ? `${Math.round((errorDocs / documents.length) * 100)}% of total documents`
                                : 'No documents with errors'}
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (activeTab === 'analytics') {
        return (
            <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Cases
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{cases.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Documents
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{documents.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Success Rate
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {documents.length > 0
                                ? `${Math.round((readyDocs / documents.length) * 100)}%`
                                : 'N/A'}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return null;
} 