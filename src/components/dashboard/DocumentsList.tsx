'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    MoreHorizontal,
    FileText,
    Download,
    File,
    Eye,
    ChevronRight,
    Clock,
    Paperclip
} from 'lucide-react';
import { Document } from '@/types/documents';
import { format } from 'date-fns';
import { bytesToSize } from '@/lib/utils';

interface DocumentsListProps {
    documents: Document[];
    onDocumentUpdated: () => Promise<void>;
}

export function DocumentsList({ documents, onDocumentUpdated }: DocumentsListProps) {
    const router = useRouter();
    const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

    const handleViewDocument = (documentId: string) => {
        router.push(`/dashboard/documents/${documentId}`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'processing':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
            case 'ready':
            case 'verified':
                return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'error':
            case 'rejected':
                return 'bg-red-100 text-red-800 hover:bg-red-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
            case 'expired':
                return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        }
    };

    const getDocumentTypeIcon = (fileType: string) => {
        switch (fileType?.toLowerCase()) {
            case 'pdf':
                return <File className="h-4 w-4 text-red-500" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <File className="h-4 w-4 text-blue-500" />;
            case 'doc':
            case 'docx':
                return <File className="h-4 w-4 text-blue-700" />;
            case 'xls':
            case 'xlsx':
                return <File className="h-4 w-4 text-green-600" />;
            default:
                return <File className="h-4 w-4 text-gray-500" />;
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), 'MMM d, yyyy');
        } catch (e) {
            return 'Invalid date';
        }
    };

    if (documents.length === 0) {
        return (
            <div className="text-center p-12 border rounded-lg">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No documents found</h3>
                <p className="text-muted-foreground mb-4">Get started by uploading your first document</p>
                <Button onClick={() => router.push('/dashboard/documents/upload')}>
                    Upload a Document
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {documents.map((document) => (
                <Card
                    key={document.id}
                    className={selectedDocument === document.id ? 'border-primary' : ''}
                >
                    <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-gray-100 rounded-md">
                                    {getDocumentTypeIcon(document.file_type)}
                                </div>
                                <div>
                                    <CardTitle className="text-lg">
                                        {document.name || 'Untitled Document'}
                                    </CardTitle>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        {document.file_type?.toUpperCase()} • {bytesToSize(document.file_size || 0)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(document.status)}>
                                    {document.status?.replace('_', ' ')}
                                </Badge>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleViewDocument(document.id)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Document
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => window.open(document.file_path, '_blank')}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </DropdownMenuItem>
                                        {document.case_id && (
                                            <DropdownMenuItem
                                                onClick={() => router.push(`/dashboard/cases/${document.case_id}`)}
                                            >
                                                <Paperclip className="mr-2 h-4 w-4" />
                                                View Related Case
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={async () => {
                                                // Implement delete functionality here
                                                await onDocumentUpdated();
                                            }}
                                        >
                                            Delete Document
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap text-sm text-muted-foreground gap-y-1">
                            {document.description && (
                                <p className="w-full mb-2">{document.description}</p>
                            )}
                            <div className="flex items-center mr-4">
                                <Clock className="mr-1 h-4 w-4" />
                                <span>Uploaded: {formatDate(document.created_at)}</span>
                            </div>
                            {document.case_id && (
                                <div className="flex items-center">
                                    <Paperclip className="mr-1 h-4 w-4" />
                                    <span>Linked to case</span>
                                </div>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex justify-end">
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleViewDocument(document.id)}
                        >
                            View Document
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
} 