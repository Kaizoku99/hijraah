'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useArtifact } from '@/contexts/artifact-context';
import { cn } from '@/lib/utils';
import {
    FileText,
    MoreVertical,
    Pencil,
    Plus,
    Search,
    Share2,
    Trash2
} from 'lucide-react';
import { DocumentEditor } from './document-editor';
import { ArtifactVisibility } from '@/types/artifact';
import { useToast } from '@/components/ui/toast';

interface DocumentListProps {
    artifactType?: 'document' | 'scraped';
}

export function DocumentList({ artifactType = 'document' }: DocumentListProps) {
    const { artifacts, deleteArtifact, updateArtifactVisibility } = useArtifact();
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewDocument, setShowNewDocument] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    // Filter artifacts based on type and search term
    const documents = artifacts.filter(artifact => {
        // Filter by type - for scraped documents, check if source_url exists
        const matchesType = artifactType === 'scraped'
            ? artifact.type === 'document' && artifact.content?.source_url
            : artifact.type === 'document' && !artifact.content?.source_url;

        // Filter by search term
        const matchesSearch = artifact.title.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesType && matchesSearch;
    });

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (window.confirm('Are you sure you want to delete this document?')) {
            try {
                await deleteArtifact(id);
                toast({
                    title: 'Success',
                    description: 'Document deleted successfully',
                });
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to delete document',
                    variant: 'destructive',
                });
            }
        }
    };

    const handleUpdateVisibility = async (id: string, visibility: ArtifactVisibility, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await updateArtifactVisibility(id, visibility);
            toast({
                title: 'Success',
                description: `Document is now ${visibility}`,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update document visibility',
                variant: 'destructive',
            });
        }
    };

    const handleEditDocument = (id: string) => {
        router.push(`/documents/${id}`);
    };

    const handleDocumentCreated = (id: string) => {
        setShowNewDocument(false);
        router.push(`/documents/${id}`);
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                    {artifactType === 'scraped' ? 'Scraped Documents' : 'Documents'}
                </h2>
                {artifactType !== 'scraped' && (
                    <Button onClick={() => setShowNewDocument(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Document
                    </Button>
                )}
            </div>

            {showNewDocument && artifactType !== 'scraped' && (
                <div className="mb-6">
                    <DocumentEditor
                        onSave={handleDocumentCreated}
                        onCancel={() => setShowNewDocument(false)}
                    />
                </div>
            )}

            <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search documents..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {documents.length === 0 ? (
                <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No documents found</h3>
                    <p className="text-muted-foreground mt-2">
                        {searchTerm
                            ? 'Try a different search term'
                            : artifactType === 'scraped'
                                ? 'Use the scraper tool to create documents from websites'
                                : 'Create your first document to get started'
                        }
                    </p>
                    {!searchTerm && artifactType === 'scraped' && (
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => router.push('/documents/scrape')}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Scrape Website
                        </Button>
                    )}
                    {!searchTerm && artifactType !== 'scraped' && (
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => setShowNewDocument(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Document
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((document) => (
                        <Card
                            key={document.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleEditDocument(document.id)}
                        >
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg truncate">{document.title}</CardTitle>
                                <CardDescription>
                                    {new Date(document.updated_at).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="h-24 overflow-hidden text-sm opacity-70">
                                {document.content.text ? (
                                    <div className="line-clamp-4">{document.content.text}</div>
                                ) : (
                                    <div className="text-muted-foreground italic">No content</div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between pt-2">
                                <div className="text-xs text-muted-foreground flex items-center">
                                    {document.visibility === 'private' && (
                                        <span className="flex items-center">Private</span>
                                    )}
                                    {document.visibility === 'public' && (
                                        <span className="flex items-center">Public</span>
                                    )}
                                    {document.visibility === 'team' && (
                                        <span className="flex items-center">Team</span>
                                    )}
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={(e: any) => handleEditDocument(document.id)}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e: any) => handleUpdateVisibility(document.id, 'private', e)}>
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Make Private
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e: any) => handleUpdateVisibility(document.id, 'public', e)}>
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Make Public
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e: any) => handleUpdateVisibility(document.id, 'team', e)}>
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Share with Team
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-destructive"
                                            onClick={(e: any) => handleDelete(document.id, e)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
} 