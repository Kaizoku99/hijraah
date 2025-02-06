'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth';
import { Case } from '@/types/cases';
import { Document, DocumentUpload } from '@/types/documents';
import { CaseService } from '@/lib/services/cases';
import { DocumentService } from '@/lib/services/documents';
import { CaseTimeline } from '@/components/cases/CaseTimeline';
import { DocumentList } from '@/components/documents/DocumentList';
import { CaseForm } from '@/components/cases/CaseForm';
import { DocumentForm } from '@/components/documents/DocumentForm';
import { Loading } from '@/components/ui/loading';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Edit,
  MoreVertical,
  Trash,
  Plus,
  FileText,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';

const caseService = new CaseService();
const documentService = new DocumentService();

export default function CaseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [case_, setCase_] = useState<Case | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [caseData, documentsData] = await Promise.all([
        caseService.getCase(params.id as string, user!.id),
        documentService.getDocumentsByCase(params.id as string, user!.id),
      ]);
      setCase_(caseData);
      setDocuments(documentsData);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load case details',
      });
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  }, [params.id, user, toast, router]);

  useEffect(() => {
    if (!user || !params.id) return;
    loadData();
  }, [user, params.id, loadData]);

  const handleCaseUpdate = async (updatedCase: Partial<Case>) => {
    await loadData();
    setShowEditForm(false);
    toast({
      title: 'Success',
      description: 'Case updated successfully',
    });
  };

  const handleDocumentSubmit = async (data: DocumentUpload) => {
    await loadData();
    setShowDocumentForm(false);
    toast({
      title: 'Success',
      description: 'Document added successfully',
    });
  };

  const handleDelete = async () => {
    try {
      await caseService.deleteCase(params.id as string, user!.id);
      toast({
        title: 'Success',
        description: 'Case deleted successfully',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete case',
      });
    }
  };

  if (isLoading || !case_) {
    return <Loading text="Loading case details..." />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{case_.case_type.replace('_', ' ')} - {case_.destination_country}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline">{case_.case_type}</Badge>
            <Badge
              variant={
                case_.status === 'completed' || case_.status === 'approved'
                  ? 'default'
                  : case_.status === 'active' || case_.status === 'in_progress'
                  ? 'secondary'
                  : 'outline'
              }
            >
              {case_.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowDocumentForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Document
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditForm(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Case
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Case
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Active</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {format(new Date(case_.created_at), 'PP')}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {case_.target_date
                ? format(new Date(case_.target_date), 'PP')
                : 'Not set'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            {case_.status === 'completed' || case_.status === 'approved' ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {case_.status.replace('_', ' ')}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <CaseTimeline case={case_} timeline={case_.timeline || []} />
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Case Documents</CardTitle>
              <CardDescription>
                Manage and track all documents related to this case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentList
                documents={documents}
                onDocumentUpdated={loadData}
                showCaseColumn={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Case Details</CardTitle>
              <CardDescription>
                View and manage case information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Notes</h3>
                <p className="text-sm text-muted-foreground">
                  {case_.notes || 'No notes provided'}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Requirements</h3>
                {Object.entries(case_.requirements || {}).length > 0 ? (
                  <ul className="list-inside list-disc text-sm text-muted-foreground">
                    {Object.entries(case_.requirements || {}).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No requirements specified
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showEditForm && (
        <CaseForm
          initialData={case_}
          onSubmit={handleCaseUpdate}
          onCancel={() => setShowEditForm(false)}
        />
      )}

      {showDocumentForm && (
        <DocumentForm
          userId={user!.id}
          caseId={params.id as string}
          onSubmit={handleDocumentSubmit}
          onCancel={() => setShowDocumentForm(false)}
        />
      )}

      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the case
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 