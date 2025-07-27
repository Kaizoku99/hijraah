"use client";

import { Loader2, Trash2, Upload, File, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';

// Document types accepted for upload
const ACCEPTED_DOCUMENT_TYPES = {
    'application/pdf': ['.pdf'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/tiff': ['.tiff', '.tif'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};

interface BatchFile {
    id: string;
    file: File;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    documentId?: string;
    error?: string;
    result?: any;
}

interface BatchProcessorProps {
    onComplete?: (results: BatchFile[]) => void;
    maxFiles?: number;
    showControls?: boolean;
}

export function BatchProcessor({
    onComplete,
    maxFiles = 10,
    showControls = true
}: BatchProcessorProps) {
    const [files, setFiles] = useState<BatchFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [preserveFormatting, setPreserveFormatting] = useState(true);
    const [detectTables, setDetectTables] = useState(true);
    const [rateLimitInfo, setRateLimitInfo] = useState<{
        exceeded: boolean;
        message?: string;
        allowed?: number;
        tier?: string;
    } | null>(null);

    // Handle file drop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Add new files to the list
        const newFiles = acceptedFiles.map(file => ({
            id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            file,
            status: 'pending' as const,
            progress: 0
        }));

        setFiles(prevFiles => {
            // Don't exceed max files
            const totalFiles = [...prevFiles, ...newFiles];
            if (totalFiles.length > maxFiles) {
                alert(`You can only upload a maximum of ${maxFiles} files at once.`);
                return [...prevFiles, ...newFiles.slice(0, maxFiles - prevFiles.length)];
            }
            return totalFiles;
        });
    }, [maxFiles]);

    // Set up file dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ACCEPTED_DOCUMENT_TYPES,
        maxFiles,
    });

    // Remove a file from the list
    const removeFile = (fileId: string) => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    };

    // Clear all files
    const clearFiles = () => {
        setFiles([]);
        setRateLimitInfo(null);
    };

    // Format file size
    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    // Check if batch processing is allowed
    const checkBatchProcessing = async () => {
        try {
            const response = await fetch('/api/ocr/check-batch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileCount: files.length
                }),
            });

            const data = await response.json();

            if (!data.success || !data.allowed) {
                setRateLimitInfo({
                    exceeded: true,
                    message: data.message || 'Rate limit exceeded',
                    allowed: data.maxBatchSize,
                    tier: data.tier
                });
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error checking batch processing:', error);
            setRateLimitInfo({
                exceeded: true,
                message: error instanceof Error ? error.message : 'Unknown error checking batch limits'
            });
            return false;
        }
    };

    // Process a single file
    const processFile = async (fileData: BatchFile) => {
        try {
            // Update status to processing
            setFiles(prevFiles =>
                prevFiles.map(f =>
                    f.id === fileData.id
                        ? { ...f, status: 'processing' as const, progress: 10 }
                        : f
                )
            );

            // Create form data
            const formData = new FormData();
            formData.append('file', fileData.file);
            formData.append('preserveFormatting', preserveFormatting.toString());
            formData.append('detectTables', detectTables.toString());

            // Process the file
            const response = await fetch('/api/ocr/process-file-batch', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }

            const data = await response.json();

            // Update file with the result
            setFiles(prevFiles =>
                prevFiles.map(f =>
                    f.id === fileData.id
                        ? {
                            ...f,
                            status: 'completed' as const,
                            progress: 100,
                            documentId: data.documentId,
                            result: data.result
                        }
                        : f
                )
            );

            return {
                success: true,
                fileId: fileData.id,
                documentId: data.documentId,
                result: data.result
            };
        } catch (error) {
            console.error(`Error processing file ${fileData.file.name}:`, error);

            // Update file with the error
            setFiles(prevFiles =>
                prevFiles.map(f =>
                    f.id === fileData.id
                        ? {
                            ...f,
                            status: 'failed' as const,
                            progress: 0,
                            error: error instanceof Error ? error.message : 'Unknown error'
                        }
                        : f
                )
            );

            return {
                success: false,
                fileId: fileData.id,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    };

    // Process all files in batch
    const processBatch = async () => {
        if (files.length === 0) return;

        // Check if batch processing is allowed
        const canProceed = await checkBatchProcessing();
        if (!canProceed) return;

        setIsProcessing(true);

        try {
            // Process files in parallel, but with concurrency limit
            const MAX_CONCURRENT = 3;
            let currentIndex = 0;
            const pendingFiles = files.filter(f => f.status === 'pending');
            const results = [];

            while (currentIndex < pendingFiles.length) {
                const batch = pendingFiles.slice(currentIndex, currentIndex + MAX_CONCURRENT);
                const batchPromises = batch.map(file => processFile(file));

                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults);

                currentIndex += MAX_CONCURRENT;
            }

            if (onComplete) {
                onComplete(files);
            }
        } catch (error) {
            console.error('Batch processing error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Update progress for a file
    const updateFileProgress = (fileId: string, progress: number) => {
        setFiles(prevFiles =>
            prevFiles.map(f =>
                f.id === fileId
                    ? { ...f, progress }
                    : f
            )
        );
    };

    // Calculate overall progress
    const calculateOverallProgress = () => {
        if (files.length === 0) return 0;

        const totalProgress = files.reduce((acc, file) => acc + file.progress, 0);
        return Math.floor(totalProgress / files.length);
    };

    // Render file status badge
    const renderStatusBadge = (status: BatchFile['status']) => {
        switch (status) {
            case 'pending':
                return <Badge variant="outline">Pending</Badge>;
            case 'processing':
                return <Badge variant="secondary">Processing</Badge>;
            case 'completed':
                return <Badge variant="success" className="bg-green-100 text-green-800">Completed</Badge>;
            case 'failed':
                return <Badge variant="destructive">Failed</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {rateLimitInfo?.exceeded && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Rate Limit Exceeded</AlertTitle>
                    <AlertDescription>
                        {rateLimitInfo.message}
                        {rateLimitInfo.allowed && (
                            <p className="mt-2">Maximum allowed batch size: {rateLimitInfo.allowed} files.</p>
                        )}
                        {rateLimitInfo.tier && (
                            <p className="mt-1">Current tier: {rateLimitInfo.tier}</p>
                        )}
                    </AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Batch Document Processing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Dropzone for file uploads */}
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${isDragActive ? 'border-primary bg-muted/50' : 'border-border'
                            }`}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="font-medium">
                                {isDragActive
                                    ? 'Drop the files here...'
                                    : `Drag & drop files, or click to select`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Supported formats: PDF, JPG, PNG, TIFF, DOC, DOCX
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Maximum {maxFiles} files
                            </p>
                        </div>
                    </div>

                    {/* Processing options */}
                    {showControls && (
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="preserveFormatting"
                                    checked={preserveFormatting}
                                    onCheckedChange={(checked) =>
                                        setPreserveFormatting(checked === true)
                                    }
                                    disabled={isProcessing}
                                />
                                <label
                                    htmlFor="preserveFormatting"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Preserve Formatting
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="detectTables"
                                    checked={detectTables}
                                    onCheckedChange={(checked) =>
                                        setDetectTables(checked === true)
                                    }
                                    disabled={isProcessing}
                                />
                                <label
                                    htmlFor="detectTables"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Detect Tables
                                </label>
                            </div>
                        </div>
                    )}

                    {/* File list */}
                    {files.length > 0 && (
                        <div className="mt-4">
                            <ScrollArea className="h-[300px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>File</TableHead>
                                            <TableHead>Size</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Progress</TableHead>
                                            <TableHead className="w-[80px]">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {files.map((file) => (
                                            <TableRow key={file.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <File className="h-4 w-4" />
                                                        <span className="truncate max-w-[200px]">{file.file.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{formatFileSize(file.file.size)}</TableCell>
                                                <TableCell>{renderStatusBadge(file.status)}</TableCell>
                                                <TableCell>
                                                    <div className="w-[100px]">
                                                        <Progress
                                                            value={file.progress}
                                                            className="h-2"
                                                            color={
                                                                file.status === 'failed'
                                                                    ? 'bg-red-600'
                                                                    : file.status === 'completed'
                                                                        ? 'bg-green-600'
                                                                        : undefined
                                                            }
                                                        />
                                                    </div>
                                                    {file.error && (
                                                        <p className="text-xs text-red-600 mt-1 truncate max-w-[200px]" title={file.error}>
                                                            {file.error}
                                                        </p>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeFile(file.id)}
                                                        disabled={isProcessing}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </div>
                    )}

                    {/* Overall progress */}
                    {files.length > 0 && isProcessing && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Overall Progress:</span>
                                <span>{calculateOverallProgress()}%</span>
                            </div>
                            <Progress value={calculateOverallProgress()} className="h-2" />
                        </div>
                    )}
                </CardContent>

                {/* Action buttons */}
                {files.length > 0 && (
                    <CardFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={clearFiles}
                            disabled={isProcessing}
                        >
                            Clear All
                        </Button>
                        <Button
                            onClick={processBatch}
                            disabled={isProcessing || files.length === 0 || files.every(f => f.status !== 'pending')}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>Process {files.filter(f => f.status === 'pending').length} Files</>
                            )}
                        </Button>
                    </CardFooter>
                )}
            </Card>

            {/* Results summary */}
            {files.some(f => f.status === 'completed') && (
                <Card>
                    <CardHeader>
                        <CardTitle>Processing Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex space-x-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <span>
                                    Successfully processed: {files.filter(f => f.status === 'completed').length} files
                                </span>
                            </div>

                            {files.some(f => f.status === 'failed') && (
                                <div className="flex space-x-2">
                                    <AlertCircle className="h-5 w-5 text-red-600" />
                                    <span>
                                        Failed: {files.filter(f => f.status === 'failed').length} files
                                    </span>
                                </div>
                            )}

                            {files.some(f => f.status === 'pending' || f.status === 'processing') && (
                                <div className="flex space-x-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>
                                        Pending/Processing: {files.filter(f => f.status === 'pending' || f.status === 'processing').length} files
                                    </span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
} 