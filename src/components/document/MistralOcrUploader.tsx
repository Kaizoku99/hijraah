import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Upload, FileText, Link as LinkIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface OcrResult {
    success: boolean;
    data?: {
        content: Array<{
            type: 'text' | 'image';
            text?: string;
            image_data?: string;
            page_number?: number;
        }>;
        meta?: {
            pages: number;
            filename?: string;
            filesize?: number;
        };
    };
    text?: string;
    error?: string;
}

export function MistralOcrUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState('');
    const [preserveFormatting, setPreserveFormatting] = useState(true);
    const [detectTables, setDetectTables] = useState(true);
    const [extractPlainText, setExtractPlainText] = useState(true);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<OcrResult | null>(null);

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // Process document with file upload
    const processFileUpload = async () => {
        if (!file) return;

        setLoading(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('preserveFormatting', preserveFormatting.toString());
            formData.append('detectTables', detectTables.toString());
            formData.append('extractPlainText', extractPlainText.toString());

            const response = await fetch('/api/ocr/process-file', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error processing file:', error);
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
        if (!url) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/ocr/process-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url,
                    preserveFormatting,
                    detectTables,
                    extractPlainText,
                }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error processing URL:', error);
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
                <CardTitle>Document OCR Processing</CardTitle>
                <CardDescription>
                    Upload a document or provide a URL to extract text using Mistral OCR
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
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="preserveFormatting"
                                checked={preserveFormatting}
                                onCheckedChange={(checked) =>
                                    setPreserveFormatting(checked === true)
                                }
                            />
                            <Label htmlFor="preserveFormatting">Preserve Formatting</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="detectTables"
                                checked={detectTables}
                                onCheckedChange={(checked) =>
                                    setDetectTables(checked === true)
                                }
                            />
                            <Label htmlFor="detectTables">Detect Tables</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="extractPlainText"
                                checked={extractPlainText}
                                onCheckedChange={(checked) =>
                                    setExtractPlainText(checked === true)
                                }
                            />
                            <Label htmlFor="extractPlainText">Extract Plain Text</Label>
                        </div>
                    </div>
                </Tabs>

                {result && (
                    <div className="mt-6">
                        <h3 className="font-medium mb-2">OCR Results</h3>
                        {result.success ? (
                            <div className="space-y-4">
                                {result.text && (
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">Extracted Text</h4>
                                        <Textarea
                                            className="w-full h-60 font-mono text-sm"
                                            readOnly
                                        >
                                            {result.text}
                                        </Textarea>
                                    </div>
                                )}

                                {result.data?.meta && (
                                    <div className="text-sm">
                                        <p>Pages: {result.data.meta.pages}</p>
                                        {result.data.meta.filename && <p>Filename: {result.data.meta.filename}</p>}
                                        {result.data.meta.filesize && (
                                            <p>File size: {Math.round(result.data.meta.filesize / 1024)} KB</p>
                                        )}
                                    </div>
                                )}
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
                    setResult(null);
                }}>
                    Clear
                </Button>
                <Button
                    onClick={url ? processUrl : processFileUpload}
                    disabled={loading || (!file && !url)}
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