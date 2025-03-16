'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppSidebar } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useOnboarding } from '@/components/onboarding/OnboardingProvider';
import { Skeleton } from '@/components/ui/skeleton';

// Import types
import { Case } from '@/types/cases';
import { Document, DocumentUpload } from '@/types/documents';

// Import dashboard components
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { CasesList } from '@/components/dashboard/CasesList';
import { DocumentsList } from '@/components/dashboard/DocumentsList';
import { DashboardActions } from '@/components/dashboard/DashboardActions';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';

export default function DashboardPage() {
    const [cases, setCases] = useState<Case[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string>('cases');
    const { user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const { onboarding, resetOnboarding } = useOnboarding();

    const loadData = useCallback(async () => {
        if (!user) {
            console.log('No user found in loadData');
            return;
        }

        try {
            console.log('Loading data for user:', user.id);
            setIsLoading(true);

            // Use the API endpoints instead of direct service calls
            const [casesResponse, documentsResponse] = await Promise.all([
                fetch(`/api/cases?user_id=${user.id}`),
                fetch(`/api/documents?user_id=${user.id}`),
            ]);

            if (!casesResponse.ok) {
                throw new Error(`Failed to fetch cases: ${casesResponse.status}`);
            }

            if (!documentsResponse.ok) {
                throw new Error(`Failed to fetch documents: ${documentsResponse.status}`);
            }

            const casesData = await casesResponse.json();
            const documentsData = await documentsResponse.json();

            console.log('Loaded data:', { cases: casesData, documents: documentsData });
            setCases(casesData);
            setDocuments(documentsData);
        } catch (error) {
            console.error('Error loading data:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to load data',
            });
        } finally {
            setIsLoading(false);
        }
    }, [user, toast]);

    useEffect(() => {
        console.log('Dashboard mounted, user:', user);
        if (!user) return;
        loadData();
    }, [user, loadData]);

    useEffect(() => {
        const initOnboarding = async () => {
            try {
                // Fetch current onboarding status
                const res = await fetch('/api/onboarding/steps');
                const data = await res.json();

                if (!data.initialized || data.shouldStartOnboarding) {
                    // If onboarding needs to be initialized or started
                    await fetch('/api/onboarding/init', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    // Explicitly refresh onboarding state if needed
                    if (!onboarding.isActive) {
                        resetOnboarding();
                    }
                }
            } catch (error) {
                console.error('Error checking onboarding status:', error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to initialize onboarding. Please try refreshing the page.'
                });
            }
        };

        initOnboarding();
    }, [onboarding.isActive, resetOnboarding, toast]);

    const handleCreateCase = async (data: Partial<Case>) => {
        try {
            if (!data.title) {
                throw new Error('Title is required');
            }

            const response = await fetch('/api/cases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    user_id: user!.id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to create case: ${response.status}`);
            }

            // Reload data
            await loadData();

            toast({
                title: 'Success',
                description: 'Case created successfully',
            });
        } catch (error) {
            console.error('Error creating case:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to create case',
            });
        }
    };

    const handleUploadDocument = async (data: Partial<DocumentUpload>) => {
        try {
            if (!data.name || !data.file) {
                throw new Error('Name and file are required');
            }

            // Use FormData to upload the file
            const formData = new FormData();
            formData.append('file', data.file);
            formData.append('name', data.name);
            formData.append('case_id', data.case_id || 'default');
            formData.append('user_id', user!.id);

            if (data.description) {
                formData.append('description', data.description);
            }

            const response = await fetch('/api/documents', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to upload document: ${response.status}`);
            }

            // Reload data
            await loadData();

            toast({
                title: 'Success',
                description: 'Document uploaded successfully',
            });
        } catch (error) {
            console.error('Error uploading document:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to upload document',
            });
        }
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg">Please sign in to access the dashboard</p>
            </div>
        );
    }

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-between px-4 py-2 border-b">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <AppSidebar className="h-screen" />

                <div className="flex-1 overflow-auto">
                    <div className="container mx-auto p-6">
                        <Tabs
                            defaultValue={activeTab}
                            data-tour="dashboard"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <TabsList>
                                    <TabsTrigger value="cases" onClick={() => setActiveTab('cases')}>Cases</TabsTrigger>
                                    <TabsTrigger value="documents" onClick={() => setActiveTab('documents')}>Documents</TabsTrigger>
                                    <TabsTrigger value="analytics" onClick={() => setActiveTab('analytics')}>Analytics</TabsTrigger>
                                </TabsList>

                                <DashboardActions
                                    activeTab={activeTab}
                                    cases={cases}
                                    onCreateCase={handleCreateCase}
                                    onUploadDocument={handleUploadDocument}
                                />
                            </div>

                            <DashboardStats
                                cases={cases}
                                documents={documents}
                                activeTab={activeTab}
                            />

                            <TabsContent value="cases" className="space-y-4" data-tour="applications">
                                <CasesList cases={cases} onCaseUpdated={loadData} />
                            </TabsContent>

                            <TabsContent value="documents" className="space-y-4" data-tour="documents">
                                <DocumentsList documents={documents} onDocumentUpdated={loadData} />
                            </TabsContent>

                            <TabsContent value="analytics" className="space-y-4">
                                <div className="h-[400px] w-full rounded-md border border-dashed flex items-center justify-center">
                                    <p className="text-center text-muted-foreground">
                                        Analytics view coming soon
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
} 