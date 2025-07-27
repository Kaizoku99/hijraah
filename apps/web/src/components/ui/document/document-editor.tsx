'use client';

import { Save, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast';
import { useArtifact } from '@/lib/contexts/artifact-context';
import { cn } from '@/lib/utils';
import { DocumentContent } from '@/types/artifact';


// Dynamically import markdown viewer to avoid SSR issues
const MarkdownViewer = dynamic(() => import('../markdown-viewer').then(mod => ({ default: mod.MarkdownViewer })), {
    ssr: false,
    loading: () => <div className="p-4 animate-pulse">Loading markdown preview...</div>
});

interface DocumentEditorProps {
    id?: string;
    initialTitle?: string;
    initialContent?: string;
    onSave?: (id: string, title: string, content: string) => void;
    onCancel?: () => void;
    className?: string;
    readOnly?: boolean;
}

export function DocumentEditor({
    id,
    initialTitle = '',
    initialContent = '',
    onSave,
    onCancel,
    className,
    readOnly = false
}: DocumentEditorProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState<string>(initialContent);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('edit');
    const { updateArtifact, createArtifact } = useArtifact();
    const { toast } = useToast();

    useEffect(() => {
        if (initialTitle) setTitle(initialTitle);
        if (initialContent) setContent(initialContent);
    }, [initialTitle, initialContent]);

    const handleSave = async () => {
        if (!title.trim()) {
            toast({
                title: 'Error',
                description: 'Please enter a title for your document',
                variant: 'destructive',
            });
            return;
        }

        try {
            setSaving(true);

            if (id) {
                // Update existing document
                await updateArtifact(id, {
                    title,
                    content: { text: content, format: 'markdown' },
                });

                toast({
                    title: 'Success',
                    description: 'Document updated successfully',
                });
            } else {
                // Create new document
                const artifact = await createArtifact(
                    title,
                    'document',
                    { text: content, format: 'markdown' }
                );

                toast({
                    title: 'Success',
                    description: 'Document created successfully',
                });

                if (onSave) {
                    onSave(artifact.id, title, content);
                }
            }
        } catch (error) {
            console.error('Error saving document:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to save document',
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Card className={cn("w-full border shadow-md", className)}>
            <CardHeader className="px-4 py-3 border-b">
                <Input
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    placeholder="Document Title"
                    className="text-xl font-semibold border-none shadow-none focus-visible:ring-0"
                    disabled={readOnly}
                />
            </CardHeader>

            <Tabs defaultValue="edit" className="w-full">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                    <TabsList>
                        <TabsTrigger value="edit" onClick={() => setActiveTab('edit')}>Edit</TabsTrigger>
                        <TabsTrigger value="preview" onClick={() => setActiveTab('preview')}>Preview</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="edit" className="px-0 py-0 mt-0">
                    <CardContent className="p-0">
                        <Textarea
                            className="min-h-[400px] resize-none rounded-none border-0 focus-visible:ring-0 p-4 font-mono text-sm"
                            disabled={readOnly}
                            onChange={(e: React.ChangeEvent<HTMLDivElement>) => {
                                const target = e.target as HTMLDivElement;
                                setContent(target.innerText || '');
                            }}
                        >
                            {content}
                        </Textarea>
                    </CardContent>
                </TabsContent>

                <TabsContent value="preview" className="px-0 py-0 mt-0">
                    <CardContent className="min-h-[400px] p-4 prose prose-sm max-w-none dark:prose-invert">
                        <MarkdownViewer content={content} />
                    </CardContent>
                </TabsContent>
            </Tabs>

            {!readOnly && (
                <CardFooter className="flex justify-end space-x-2 px-4 py-3 border-t">
                    {onCancel && (
                        <Button variant="outline" onClick={onCancel} disabled={saving}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    )}
                    <Button onClick={handleSave} disabled={saving || !title.trim()}>
                        <Save className="mr-2 h-4 w-4" />
                        {saving ? 'Saving...' : 'Save Document'}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
} 