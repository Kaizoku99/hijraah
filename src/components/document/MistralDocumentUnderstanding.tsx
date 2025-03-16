import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Upload, FileText, Link as LinkIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface DocumentUnderstandingResult {
    success: boolean;
    answer?: string;
    error?: string;
}

export function MistralDocumentUnderstanding() {
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState('');
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DocumentUnderstandingResult | null>(null);

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // Process document with file upload
    const processFileUpload = async () => {
        if (!file || !question) return;

        setLoading(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('question', question);

            const response = await fetch('/api/ocr/ask-document', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error processing document question:', error);
            setResult({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            });
        } finally {
            setLoading(false);
        }
    };

    // Process document with URL
    const processUrl = async () => {
        if (!url || !question) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/ocr/ask-document-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url,
                    question,
                }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error processing document question:', error);
            setResult({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Document Understanding</CardTitle>
                <CardDescription>
                    Upload a document or provide a URL to ask questions about its content
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="file" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="file">File Upload</TabsTrigger>
                        <TabsTrigger value="url">URL</TabsTrigger>
                    </TabsList>

                    <TabsContent value="file" className="space-y-4">
                        <div className="grid w-full gap-2">
                            <Label htmlFor="file">Upload Document</Label>
                            <Input
                                id="file"
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg,.tiff,.tif"
                                onChange={handleFileChange}
                            />
                            {file && (
                                <p className="text-sm text-muted-foreground">
                                    Selected: {file.name} ({Math.round(file.size / 1024)} KB)
                                </p>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="url" className="space-y-4">
                        <div className="grid w-full gap-2">
                            <Label htmlFor="url">Document URL</Label>
                            <Input
                                id="url"
                                type="url"
                                placeholder="https://example.com/document.pdf"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                    </TabsContent>

                    <div className="flex flex-col gap-4 mt-4">
                        <div className="grid w-full gap-2">
                            <Label htmlFor="question">Your Question</Label>
                            <Textarea
                                id="question"
                                placeholder="What is the main topic of this document?"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="min-h-[100px]"
                            />
                        </div>
                    </div>
                </Tabs>

                {result && (
                    <div className="mt-6">
                        <h3 className="font-medium mb-2">Answer</h3>
                        {result.success ? (
                            <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
                                {result.answer}
                            </div>
                        ) : (
                            <div className="text-red-500">
                                Error: {result.error || 'Unknown error occurred'}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                    setFile(null);
                    setUrl('');
                    setQuestion('');
                    setResult(null);
                }}>
                    Clear
                </Button>
                <Button
                    onClick={url ? processUrl : processFileUpload}
                    disabled={loading || (!file && !url) || !question}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            {url ? (
                                <>
                                    <LinkIcon className="mr-2 h-4 w-4" />
                                    Process URL
                                </>
                            ) : (
                                <>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Process Document
                                </>
                            )}
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
} 