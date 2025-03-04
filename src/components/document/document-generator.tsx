'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useArtifact } from '@/contexts/artifact-context';

// Define schema for document generation form
const documentFormSchema = z.object({
    template: z.string({
        required_error: 'Please select a document template',
    }),
    prompt: z.string()
        .min(50, {
            message: 'Your document prompt must be at least 50 characters',
        })
        .max(2000, {
            message: 'Your document prompt cannot exceed 2000 characters',
        }),
    additionalContext: z.string().max(1000).optional(),
});

type DocumentFormValues = z.infer<typeof documentFormSchema>;

const templateOptions = [
    {
        id: 'cover-letter',
        name: 'Cover Letter',
        description: 'A formal letter explaining your immigration application',
        promptTips: 'Include your background, skills, qualifications, and reason for immigration'
    },
    {
        id: 'personal-statement',
        name: 'Personal Statement',
        description: 'A detailed statement explaining your personal circumstances',
        promptTips: 'Explain your background, education, work experience, and reasons for immigrating'
    },
    {
        id: 'legal-brief',
        name: 'Legal Brief',
        description: 'A formal legal argument to support your case',
        promptTips: 'Include relevant case details, applicable laws, and your legal arguments'
    },
    {
        id: 'affidavit',
        name: 'Affidavit',
        description: 'A sworn statement of facts related to your immigration case',
        promptTips: 'Include facts, dates, places, and relevant information about your application'
    },
];

export function DocumentGenerator() {
    const router = useRouter();
    const { toast } = useToast();
    const artifactContext = useArtifact();
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    // Initialize form
    const form = useForm<DocumentFormValues>({
        resolver: zodResolver(documentFormSchema),
        defaultValues: {
            prompt: '',
            additionalContext: '',
        },
    });

    const onSubmit = async (data: DocumentFormValues) => {
        setIsGenerating(true);

        try {
            // Get userId from local storage or session
            const userString = localStorage.getItem('supabase.auth.token');
            let userId = null;

            if (userString) {
                const userData = JSON.parse(userString);
                userId = userData.user?.id;
            }

            // Call the AI document generation API
            const response = await fetch('/api/ai/generate-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    userId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate document');
            }

            const result = await response.json();

            if (result.saved) {
                // Show success toast
                toast({
                    title: 'Document generated successfully',
                    description: 'Your document has been created and saved to your documents',
                    variant: 'default',
                });

                // Navigate to documents page and refresh the page to show new document
                router.push('/documents');
                router.refresh();
            } else {
                // Show failed to save toast
                toast({
                    title: 'Document generated',
                    description: 'Document generated but could not be saved. Please try again.',
                    variant: 'destructive',
                });
            }
        } catch (error: any) {
            console.error('Error generating document:', error);
            toast({
                title: 'Error generating document',
                description: error.message || 'Something went wrong',
                variant: 'destructive',
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleTemplateChange = (value: string) => {
        setSelectedTemplate(value);
        form.setValue('template', value);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Generate AI Document</CardTitle>
                    <CardDescription>
                        Create professional immigration documents with AI assistance
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="template"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Document Template</FormLabel>
                                    <Select
                                        onValueChange={handleTemplateChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a document template" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {templateOptions.map((template) => (
                                                <SelectItem key={template.id} value={template.id}>
                                                    {template.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-sm text-muted-foreground">
                                        {selectedTemplate
                                            ? templateOptions.find(t => t.id === selectedTemplate)?.description
                                            : 'Choose a template for your document'}
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Document Content Instructions</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={selectedTemplate
                                                ? templateOptions.find(t => t.id === selectedTemplate)?.promptTips
                                                : "Describe what you'd like to include in your document"
                                            }
                                            className="min-h-32"
                                            {...field}
                                        />
                                    </FormControl>
                                    <p className="text-sm text-muted-foreground">
                                        Provide detailed information for your document. The more specific you are, the better the result.
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="additionalContext"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Context (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Any additional information or context that might be useful"
                                            className="min-h-20"
                                            {...field}
                                        />
                                    </FormControl>
                                    <p className="text-sm text-muted-foreground">
                                        Add any other details that might help generate a better document
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isGenerating || !form.formState.isValid}
                                className="min-w-32"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Generate Document
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 