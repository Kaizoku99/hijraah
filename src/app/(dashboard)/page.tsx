'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth';
import { Case } from '@/types/cases';
import { Document, DocumentUpload } from '@/types/documents';
import { caseService } from '@/lib/services/cases';
import { documentService } from '@/lib/services/documents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CaseList } from '@/components/cases/CaseList';
import { DocumentList } from '@/components/documents/DocumentList';
import { CaseForm } from '@/components/cases/CaseForm';
import { DocumentForm } from '@/components/documents/DocumentForm';
import { useToast } from '@/components/ui/use-toast';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function DashboardPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadData = useCallback(async () => {
    if (!user) {
      console.log('No user found in loadData');
      return;
    }

    try {
      console.log('Loading data for user:', user.id);
      setIsLoading(true);
      const [casesData, documentsData] = await Promise.all([
        caseService.getCases(user.id),
        documentService.getDocuments(user.id),
      ]);
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

  const handleCaseSubmit = async (data: Partial<Case>) => {
    try {
      await caseService.createCase({
        ...data,
        user_id: user!.id,
      });
      loadData();
      toast({
        title: 'Success',
        description: 'Case created successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create case',
      });
    }
  };

  const handleDocumentSubmit = async (data: Partial<DocumentUpload>) => {
    try {
      if (!data.name || !data.file) {
        throw new Error('Name and file are required');
      }
      
      await documentService.createDocument({
        name: data.name,
        file: data.file,
        user_id: user!.id,
        description: data.description,
        case_id: data.case_id,
        metadata: data.metadata
      });
      loadData();
      toast({
        title: 'Success',
        description: 'Document uploaded successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to upload document',
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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="cases">
        <div className="mb-6 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New</SheetTitle>
              </SheetHeader>
              {/* Form content based on active tab */}
            </SheetContent>
          </Sheet>
        </div>

        <TabsContent value="cases" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {cases.filter((c) => c.status === 'active').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {cases.filter((c) => c.status === 'pending_review').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {cases.filter((c) => c.status === 'completed').length}
                </div>
              </CardContent>
            </Card>
          </div>
          <CaseList cases={cases} onCaseUpdated={loadData} />
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documents.filter((d) => d.status === 'processing').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documents.filter((d) => d.status === 'ready').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documents.filter((d) => d.status === 'error').length}
                </div>
              </CardContent>
            </Card>
          </div>
          <DocumentList documents={documents} onDocumentUpdated={loadData} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 