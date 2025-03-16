'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth';
import { Case } from '@/types/cases';
import { Document, DocumentUpload } from '@/types/documents';
import { Skeleton } from '@/components/ui/skeleton';
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { AppSidebar } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { MoreVertical, Upload, Trash, Edit, AlertTriangle } from 'lucide-react';

// Temporary Timeline component
const CaseTimeline = ({ caseData }: { caseData: Case }) => {
    const events = [
        {
            id: '1',
            date: new Date(caseData.created_at).toLocaleDateString(),
            title: 'Case Created',
            description: `Case ${caseData.id} was created`,
        },
        {
            id: '2',
            date: new Date(caseData.updated_at).toLocaleDateString(),
            title: 'Last Updated',
            description: `Case was last updated`,
        },
    ];

    return (
        <div className="space-y-4">
            {events.map((event) => (
                <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    <div className="pb-4">
                        <div className="text-sm text-muted-foreground">{event.date}</div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Temporary DocumentList component
const DocumentList = ({ documents, onUpdated }: { documents: Document[]; onUpdated: () => Promise<void> }) => {
    return (
        <div className="space-y-4">
            {documents.map((document) => (
                <Card key={document.id}>
                    <CardHeader className="p-4">
                        <CardTitle className="text-base">{document.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Type: {document.file_type}</span>
                            <Button variant="outline" size="sm" onClick={() => { }}>
                                View Document
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

// Temporary Form components
const DocumentForm = ({ onSubmit, onCancel }: { onSubmit: (data: DocumentUpload) => Promise<void>; onCancel: () => void }) => {
    const [name, setName] = useState('New Document');
    const [description, setDescription] = useState('Sample description');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        if (!file) {
            alert('Please select a file');
            return;
        }

        onSubmit({
            name,
            description,
            file,
        } as DocumentUpload);
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-medium">Upload New Document</h2>
            <form onSubmit={handleSubmit} action="/api/documents" method="POST" encType="multipart/form-data" className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Document Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        rows={3}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="file" className="text-sm font-medium">File</label>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        className="w-full"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">Upload</Button>
                </div>
            </form>
        </div>
    );
};

const CaseForm = ({ initialData, onSubmit, onCancel }: { initialData?: Case; onSubmit: (data: Partial<Case>) => Promise<void>; onCancel: () => void }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        onSubmit({
            ...initialData,
            title,
            description,
        });
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-medium">Edit Case</h2>
            <form onSubmit={handleSubmit} action={`/api/cases/${initialData?.id}`} method="PUT" className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        rows={3}
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                </div>
            </form>
        </div>
    );
};

export default function CaseDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [caseData, setCaseData] = useState<Case | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeForm, setActiveForm] = useState<'edit' | 'document' | null>(null);
    const { user } = useAuth();
    const { toast } = useToast();

    const caseId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

    const loadData = useCallback(async () => {
        if (!user || !caseId) return;

        try {
            setIsLoading(true);

            // Use the API endpoints instead of direct service calls
            const [caseResponse, documentsResponse] = await Promise.all([
                fetch(`/api/cases/${caseId}`),
                fetch(`/api/documents?case_id=${caseId}`),
            ]);

            if (!caseResponse.ok) {
                throw new Error(`Failed to fetch case: ${caseResponse.status}`);
            }

            if (!documentsResponse.ok) {
                throw new Error(`Failed to fetch documents: ${documentsResponse.status}`);
            }

            const caseData = await caseResponse.json();
            const documentsData = await documentsResponse.json();

            setCaseData(caseData);
            setDocuments(documentsData);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to load case details',
            });

            // Navigate back to dashboard on error
            router.push('/dashboard');
        } finally {
            setIsLoading(false);
        }
    }, [user, caseId, router, toast]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleCaseUpdate = async (updatedCase: Partial<Case>) => {
        try {
            // Use the API endpoint instead of direct service call
            const response = await fetch(`/api/cases/${caseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCase),
            });

            if (!response.ok) {
                throw new Error(`Failed to update case: ${response.status}`);
            }

            setActiveForm(null);
            await loadData();
            toast({
                title: 'Success',
                description: 'Case updated successfully',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to update case',
            });
        }
    };

    const handleDocumentSubmit = async (data: DocumentUpload) => {
        try {
            // Use FormData for file upload
            const formData = new FormData();
            formData.append('file', data.file);
            formData.append('name', data.name);
            formData.append('case_id', caseId);
            if (data.description) {
                formData.append('description', data.description);
            }

            // Use the API endpoint instead of direct service call
            const response = await fetch('/api/documents', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to upload document: ${response.status}`);
            }

            setActiveForm(null);
            await loadData();
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

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
            return;
        }

        try {
            // Use the API endpoint instead of direct service call
            const response = await fetch(`/api/cases/${caseId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete case: ${response.status}`);
            }

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

    if (isLoading) {
        return (
            <div className="flex flex-col h-screen">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                    <Skeleton className="h-6 w-48" />
                </div>

                <div className="flex flex-1 overflow-hidden">
                    <div className="w-64 h-screen border-r">
                        <Skeleton className="h-screen w-full" />
                    </div>

                    <div className="flex-1 overflow-auto">
                        <div className="container mx-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <Skeleton className="h-8 w-64" />
                                <Skeleton className="h-10 w-24" />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 mb-6">
                                <Skeleton className="h-32 w-full rounded-lg" />
                                <Skeleton className="h-32 w-full rounded-lg" />
                            </div>

                            <Skeleton className="h-10 w-full max-w-md mb-6" />

                            <Skeleton className="h-80 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!caseData) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h1 className="text-xl font-bold mb-2">Case Not Found</h1>
                    <p className="text-muted-foreground mb-4">The case you&apos;re looking for does not exist or you don&apos;t have permission to view it.</p>
                    <Button onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
                </div>
            </div>
        );
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
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Case Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <AppSidebar className="h-screen" />

                <div className="flex-1 overflow-auto">
                    <div className="container mx-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">{caseData.title || 'Untitled Case'}</h1>
                            <div className="flex gap-2">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button onClick={() => setActiveForm('document')}>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Document
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent onChange={(open) => !open && setActiveForm(null)}>
                                        <SheetHeader>
                                            <SheetTitle>Upload Document</SheetTitle>
                                        </SheetHeader>
                                        <DocumentForm
                                            onSubmit={handleDocumentSubmit}
                                            onCancel={() => setActiveForm(null)}
                                        />
                                    </SheetContent>
                                </Sheet>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <DropdownMenuItem onSelect={(e) => {
                                                    e.preventDefault();
                                                    setActiveForm('edit');
                                                }}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Case
                                                </DropdownMenuItem>
                                            </SheetTrigger>
                                            <SheetContent onChange={(open) => !open && setActiveForm(null)}>
                                                <SheetHeader>
                                                    <SheetTitle>Edit Case</SheetTitle>
                                                </SheetHeader>
                                                <CaseForm
                                                    initialData={caseData}
                                                    onSubmit={handleCaseUpdate}
                                                    onCancel={() => setActiveForm(null)}
                                                />
                                            </SheetContent>
                                        </Sheet>
                                        <DropdownMenuItem className="text-red-600" onSelect={handleDelete}>
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete Case
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 mb-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Case Information</CardTitle>
                                    <CardDescription>Basic information about this case</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                                            <dd className="mt-1 font-medium">{caseData.status || 'Unknown'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                                            <dd className="mt-1 font-medium">{caseData.case_type || 'N/A'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                                            <dd className="mt-1 font-medium">{new Date(caseData.created_at).toLocaleDateString()}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                                            <dd className="mt-1">{caseData.description || 'No description provided'}</dd>
                                        </div>
                                    </dl>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Timeline</CardTitle>
                                    <CardDescription>Recent activity for this case</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CaseTimeline caseData={caseData} />
                                </CardContent>
                            </Card>
                        </div>

                        <Tabs defaultValue="documents" className="mb-6">
                            <TabsList>
                                <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                            </TabsList>

                            <TabsContent value="documents" className="space-y-4 mt-4">
                                {documents.length > 0 ? (
                                    <DocumentList documents={documents} onUpdated={loadData} />
                                ) : (
                                    <div className="text-center p-6 border rounded-lg bg-muted/50">
                                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                        <h3 className="text-lg font-medium mb-2">No Documents Yet</h3>
                                        <p className="text-muted-foreground mb-4">Upload documents to get started</p>
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button onClick={() => setActiveForm('document')}>
                                                    Upload Document
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent onChange={(open) => !open && setActiveForm(null)}>
                                                <SheetHeader>
                                                    <SheetTitle>Upload Document</SheetTitle>
                                                </SheetHeader>
                                                <DocumentForm
                                                    onSubmit={handleDocumentSubmit}
                                                    onCancel={() => setActiveForm(null)}
                                                />
                                            </SheetContent>
                                        </Sheet>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="notes" className="space-y-4 mt-4">
                                <div className="text-center p-6 border rounded-lg bg-muted/50">
                                    <h3 className="text-lg font-medium mb-2">Notes Coming Soon</h3>
                                    <p className="text-muted-foreground">This feature is under development</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="requirements" className="space-y-4 mt-4">
                                <div className="text-center p-6 border rounded-lg bg-muted/50">
                                    <h3 className="text-lg font-medium mb-2">Requirements Coming Soon</h3>
                                    <p className="text-muted-foreground">This feature is under development</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
} 