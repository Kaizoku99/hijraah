import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MistralOcrUploader } from '@/components/document/MistralOcrUploader';
import { MistralDocumentUnderstanding } from '@/components/document/MistralDocumentUnderstanding';
import { BatchProcessor } from '@/components/document/BatchProcessor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, InfoIcon } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Advanced Mistral OCR',
    description: 'Enhanced OCR capabilities with persistent storage, caching, progress tracking, and batch processing',
};

export default function MistralOcrAdvancedPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold mb-2">Advanced Mistral OCR</h1>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                    Enhanced document processing with persistent storage, caching, progress tracking, and batch processing
                </p>
            </div>

            <Tabs defaultValue="single" className="w-full max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="single">Single Document</TabsTrigger>
                    <TabsTrigger value="batch">Batch Processing</TabsTrigger>
                    <TabsTrigger value="understanding">Document Understanding</TabsTrigger>
                </TabsList>

                <TabsContent value="single">
                    <div className="mb-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Single Document Processing</CardTitle>
                                <CardDescription>
                                    Process a single document with real-time progress tracking and result caching
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Alert className="mb-4">
                                    <InfoIcon className="h-4 w-4" />
                                    <AlertTitle>Enhanced OCR Processing</AlertTitle>
                                    <AlertDescription>
                                        This OCR processor now includes persistent storage, caching for faster repeated processing,
                                        and real-time progress tracking.
                                    </AlertDescription>
                                </Alert>
                                <MistralOcrUploader />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="batch">
                    <div className="mb-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Batch Document Processing</CardTitle>
                                <CardDescription>
                                    Process multiple documents at once with parallel processing and progress tracking
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Alert className="mb-4">
                                    <InfoIcon className="h-4 w-4" />
                                    <AlertTitle>Efficient Batch Processing</AlertTitle>
                                    <AlertDescription>
                                        Upload multiple documents at once for efficient processing. The system handles rate limiting,
                                        parallel processing, and provides detailed progress for each document.
                                    </AlertDescription>
                                </Alert>
                                <BatchProcessor maxFiles={5} />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="understanding">
                    <div className="mb-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Document Understanding</CardTitle>
                                <CardDescription>
                                    Ask questions about document content and get AI-powered answers with caching
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Alert className="mb-4">
                                    <InfoIcon className="h-4 w-4" />
                                    <AlertTitle>Intelligent Document Q&A</AlertTitle>
                                    <AlertDescription>
                                        Upload a document or provide a URL to ask questions about its content. Answers are cached for
                                        improved performance when asking similar questions.
                                    </AlertDescription>
                                </Alert>
                                <MistralDocumentUnderstanding />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="mt-16 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Enhanced OCR Capabilities</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Persistent Storage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Documents are now stored securely in Supabase Storage, providing reliable and persistent access
                                to your uploaded files.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Result Caching</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                OCR results are cached using Redis, significantly improving performance for repeated processing
                                of the same documents and reducing API costs.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Rate Limiting</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Intelligent rate limiting prevents abuse of the OCR API while providing fair usage based on
                                user tiers (standard, premium, enterprise).
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Progress Tracking</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Real-time progress updates keep you informed about the status of document processing,
                                especially useful for large documents and batch operations.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Implementation Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Technology Stack</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Next.js 15 with App Router for the frontend</li>
                                    <li>Hono.js for API routes and middleware</li>
                                    <li>Supabase for document storage and metadata</li>
                                    <li>Upstash Redis for caching and rate limiting</li>
                                    <li>Mistral AI API for OCR and document understanding</li>
                                    <li>React and Shadcn UI for the user interface</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Performance Enhancements</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Document results cached for 7 days by default</li>
                                    <li>Token-based rate limiting with tier-specific quotas</li>
                                    <li>Concurrent batch processing with adjustable limits</li>
                                    <li>Real-time progress updates via polling</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription>
                        This is a demonstration environment. Processing times and capabilities may be limited.
                        In a production environment, document processing would be handled by background jobs
                        for improved scalability.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
} 