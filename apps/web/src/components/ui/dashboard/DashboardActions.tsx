'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '@/lib/auth/hooks';
import { Case } from '@/types/cases';
import { DocumentUpload } from '@/types/documents';
import { Button } from '@/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/ui/sheet';

import { TemporaryCaseForm } from './TemporaryCaseForm';
import { TemporaryDocumentForm } from './TemporaryDocumentForm';


interface DashboardActionsProps {
    activeTab: string;
    cases: Case[];
    onCreateCase: (data: Partial<Case>) => Promise<void>;
    onUploadDocument: (data: Partial<DocumentUpload>) => Promise<void>;
}

export function DashboardActions({
    activeTab,
    cases,
    onCreateCase,
    onUploadDocument
}: DashboardActionsProps) {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();

    const handleSheetOpenChange = (open: boolean) => {
        setOpen(open);
    };

    const getActionLabel = () => {
        switch (activeTab) {
            case 'cases':
                return 'Create Case';
            case 'documents':
                return 'Upload Document';
            case 'analytics':
                return 'Export Report';
            default:
                return 'New Item';
        }
    };

    const handleCaseFormSubmit = async (data: Partial<Case>) => {
        await onCreateCase(data);
        setOpen(false);
    };

    const handleDocumentFormSubmit = async (data: Partial<DocumentUpload>) => {
        await onUploadDocument(data);
        setOpen(false);
    };

    if (!user) return null;

    return (
        <Sheet open={open} onOpenChange={handleSheetOpenChange}>
            <SheetTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    {getActionLabel()}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        {activeTab === 'cases' ? 'Create New Case' :
                            activeTab === 'documents' ? 'Upload New Document' :
                                'Export Report'}
                    </SheetTitle>
                </SheetHeader>

                {activeTab === 'cases' && (
                    <div className="py-4">
                        <TemporaryCaseForm
                            onSubmit={handleCaseFormSubmit}
                            onCancel={() => setOpen(false)}
                        />
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="py-4">
                        <TemporaryDocumentForm
                            userId={user.id}
                            onSubmit={handleDocumentFormSubmit}
                            onCancel={() => setOpen(false)}
                        />
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="py-4 space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Export analytics reports in various formats
                        </p>
                        <div className="space-y-2">
                            <Button className="w-full" variant="outline">
                                Export as PDF
                            </Button>
                            <Button className="w-full" variant="outline">
                                Export as CSV
                            </Button>
                            <Button className="w-full" variant="outline">
                                Export as Excel
                            </Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
} 