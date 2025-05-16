'use client'

import { useState, useEffect } from 'react'
import { Message } from 'ai'
import { FileText, Upload, Search, File, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { UnifiedMarkdown } from './UnifiedMarkdown'

// Extended Attachment type with OCR data
interface OcrAttachment {
    id: string
    name: string
    type: string
    ocrText?: string
    ocrStatus: 'idle' | 'processing' | 'complete' | 'error'
    progress: number
    errorMessage?: string
    questions?: {
        question: string
        answer: string
        timestamp: number
    }[]
}

interface UnifiedDocumentProcessorProps {
    chatId: string
    attachments: any[]
    append: (message: Message | Message[]) => Promise<void>
    isLoading: boolean
    isVisible: boolean
    className?: string
}

export function UnifiedDocumentProcessor({
    chatId,
    attachments,
    append,
    isLoading,
    isVisible,
    className
}: UnifiedDocumentProcessorProps) {
    const [processedDocuments, setProcessedDocuments] = useState<OcrAttachment[]>([])
    const [activeDocument, setActiveDocument] = useState<OcrAttachment | null>(null)
    const [activeTab, setActiveTab] = useState('documents')
    const [question, setQuestion] = useState('')
    const [isAsking, setIsAsking] = useState(false)

    // Load processed documents from sessionStorage on initial render
    useEffect(() => {
        if (!chatId) return

        const storedDocuments = sessionStorage.getItem(`documents-${chatId}`)
        if (storedDocuments) {
            setProcessedDocuments(JSON.parse(storedDocuments))
        }
    }, [chatId])

    // Save processed documents to sessionStorage when they change
    useEffect(() => {
        if (!chatId) return

        sessionStorage.setItem(`documents-${chatId}`, JSON.stringify(processedDocuments))
    }, [chatId, processedDocuments])

    // Process attachments for OCR when they change
    useEffect(() => {
        // Filter out attachments that are already processed or being processed
        const newAttachments = attachments.filter(
            att => !processedDocuments.some(doc => doc.id === att.id)
        )

        if (newAttachments.length === 0) return

        // Add new attachments to the processed documents list
        const newProcessedDocs = newAttachments.map(att => ({
            id: att.id,
            name: att.name,
            type: att.type,
            ocrStatus: 'idle' as const,
            progress: 0,
            questions: []
        }))

        setProcessedDocuments(prev => [...prev, ...newProcessedDocs])

        // Process each new attachment
        newProcessedDocs.forEach(doc => {
            processDocument(doc.id, att => newAttachments.find(a => a.id === att))
        })
    }, [attachments])

    // Process document using Mistral OCR API
    const processDocument = async (docId: string, getAttachment: (id: string) => any) => {
        // Update status to processing
        setProcessedDocuments(prev =>
            prev.map(doc =>
                doc.id === docId
                    ? { ...doc, ocrStatus: 'processing' as const, progress: 10 }
                    : doc
            )
        )

        try {
            const attachment = getAttachment(docId)
            if (!attachment) {
                throw new Error('Attachment not found')
            }

            // Prepare the file content
            let fileContent = ''
            let fileUrl = ''

            // If the attachment has a URL, use it
            if (attachment.url) {
                fileUrl = attachment.url
            } else if (attachment.file) {
                // Otherwise read the file content as base64
                const file = attachment.file
                fileContent = await new Promise<string>((resolve) => {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        if (e.target?.result) {
                            // Extract the base64 part if it's a data URL
                            const result = e.target.result.toString()
                            const base64 = result.includes('base64,')
                                ? result.split('base64,')[1]
                                : result
                            resolve(base64)
                        } else {
                            resolve('')
                        }
                    }
                    reader.readAsDataURL(file)
                })
            }

            // Update progress
            setProcessedDocuments(prev =>
                prev.map(doc =>
                    doc.id === docId
                        ? { ...doc, progress: 30 }
                        : doc
                )
            )

            // Call the OCR API
            const response = await fetch('/api/documents/ocr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileId: docId,
                    chatId,
                    fileName: attachment.name,
                    fileType: attachment.type,
                    fileUrl,
                    fileContent
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to process document')
            }

            // Update progress
            setProcessedDocuments(prev =>
                prev.map(doc =>
                    doc.id === docId
                        ? { ...doc, progress: 90 }
                        : doc
                )
            )

            const ocrResult = await response.json()

            // Update the document with the OCR result
            setProcessedDocuments(prev =>
                prev.map(doc =>
                    doc.id === docId
                        ? {
                            ...doc,
                            ocrStatus: 'complete' as const,
                            progress: 100,
                            ocrText: ocrResult.text
                        }
                        : doc
                )
            )
        } catch (error) {
            console.error('Error processing document:', error)

            // Update status to error
            setProcessedDocuments(prev =>
                prev.map(doc =>
                    doc.id === docId
                        ? {
                            ...doc,
                            ocrStatus: 'error' as const,
                            progress: 0,
                            errorMessage: error instanceof Error ? error.message : 'Unknown error'
                        }
                        : doc
                )
            )
        }
    }

    // Ask a question about the document
    const askQuestion = async () => {
        if (!activeDocument || !question.trim() || isAsking || isLoading) return

        setIsAsking(true)

        // Add the question to the document's question list
        setProcessedDocuments(prev =>
            prev.map(doc =>
                doc.id === activeDocument.id
                    ? {
                        ...doc,
                        questions: [
                            ...(doc.questions || []),
                            {
                                question,
                                answer: 'Processing...',
                                timestamp: Date.now()
                            }
                        ]
                    }
                    : doc
            )
        )

        try {
            // Call the document Q&A API
            const response = await fetch('/api/documents/ocr/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileId: activeDocument.id,
                    chatId,
                    question,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to process question')
            }

            const result = await response.json()

            // Update the answer in the document's question list
            setProcessedDocuments(prev =>
                prev.map(doc => {
                    if (doc.id === activeDocument.id) {
                        const updatedQuestions = [...(doc.questions || [])]
                        const lastQuestionIndex = updatedQuestions.length - 1

                        if (lastQuestionIndex >= 0) {
                            updatedQuestions[lastQuestionIndex].answer = result.answer
                        }

                        return { ...doc, questions: updatedQuestions }
                    }
                    return doc
                })
            )

            // Create a system message to add to chat
            const systemMessage = {
                id: Date.now().toString(),
                role: 'system' as const,
                content: `Document Q&A:
      
Document: ${activeDocument.name}
Question: ${question}
Answer: ${result.answer}`
            }

            // Append system message to chat
            await append(systemMessage)

            setQuestion('')
        } catch (error) {
            console.error('Error asking question:', error)

            // Update the answer with error message
            setProcessedDocuments(prev =>
                prev.map(doc => {
                    if (doc.id === activeDocument.id) {
                        const updatedQuestions = [...(doc.questions || [])]
                        const lastQuestionIndex = updatedQuestions.length - 1

                        if (lastQuestionIndex >= 0) {
                            updatedQuestions[lastQuestionIndex].answer =
                                `Error: ${error instanceof Error ? error.message : 'Failed to process question'}`
                        }

                        return { ...doc, questions: updatedQuestions }
                    }
                    return doc
                })
            )
        } finally {
            setIsAsking(false)
        }
    }

    if (!isVisible) return null

    // If no documents, show upload prompt
    if (processedDocuments.length === 0) {
        return (
            <div className="flex flex-col gap-4 p-4">
                <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertTitle>Document Processor</AlertTitle>
                    <AlertDescription>
                        Upload documents to extract text and ask questions about their content.
                    </AlertDescription>
                </Alert>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">Upload Documents</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Attach documents to your message to process them with Mistral OCR
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Supported formats: PDF, DOCX, JPG, PNG
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-4 p-4">
            <Tabs defaultValue="documents" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                        value="documents"
                        onClick={() => setActiveTab('documents')}
                    >
                        Documents ({processedDocuments.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="qa"
                        onClick={() => setActiveTab('qa')}
                        disabled={!activeDocument || activeDocument.ocrStatus !== 'complete'}
                    >
                        Q&A
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="documents" className="mt-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Processed Documents</CardTitle>
                            <CardDescription>
                                Documents processed with Mistral OCR to extract text
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-4">
                                    {processedDocuments.map((doc) => (
                                        <Card key={doc.id} className={`overflow-hidden ${activeDocument?.id === doc.id ? 'border-primary' : ''}`}>
                                            <CardHeader className="p-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <File className="h-4 w-4 text-muted-foreground" />
                                                        <div>
                                                            <h4 className="text-sm font-medium leading-none">{doc.name}</h4>
                                                            <p className="text-xs text-muted-foreground">{doc.type}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant={
                                                        doc.ocrStatus === 'complete' ? 'default' :
                                                            doc.ocrStatus === 'processing' ? 'outline' :
                                                                doc.ocrStatus === 'error' ? 'destructive' : 'secondary'
                                                    }>
                                                        {doc.ocrStatus}
                                                    </Badge>
                                                </div>
                                            </CardHeader>

                                            {doc.ocrStatus === 'processing' && (
                                                <div className="px-3 pb-3">
                                                    <Progress value={doc.progress} className="h-1" />
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Processing: {doc.progress}%
                                                    </p>
                                                </div>
                                            )}

                                            {doc.ocrStatus === 'complete' && (
                                                <CardFooter className="p-3 pt-0">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full"
                                                        onClick={() => setActiveDocument(doc)}
                                                    >
                                                        View Content
                                                    </Button>
                                                </CardFooter>
                                            )}

                                            {doc.ocrStatus === 'error' && (
                                                <div className="px-3 pb-3">
                                                    <div className="flex items-center text-destructive text-xs">
                                                        <AlertCircle className="h-3 w-3 mr-1" />
                                                        {doc.errorMessage || 'Processing failed'}
                                                    </div>
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {activeDocument && activeDocument.ocrStatus === 'complete' && (
                        <Card className="mt-4">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{activeDocument.name}</CardTitle>
                                <CardDescription>
                                    Extracted document content with Mistral OCR
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[200px] pr-4">
                                    <div className="prose-sm dark:prose-invert">
                                        <UnifiedMarkdown content={activeDocument.ocrText || 'No content extracted'} />
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => setActiveTab('qa')}
                                    className="w-full"
                                >
                                    Ask Questions About This Document
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="qa" className="mt-2">
                    {activeDocument && (
                        <div className="space-y-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">Ask About {activeDocument.name}</CardTitle>
                                    <CardDescription>
                                        Ask questions about the document content using Mistral AI
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={(e) => { e.preventDefault(); askQuestion(); }} className="flex flex-col gap-4">
                                        <Textarea
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            placeholder="Ask a question about this document..."
                                            className="min-h-[80px]"
                                        />
                                        <Button
                                            type="submit"
                                            disabled={!question.trim() || isAsking || isLoading}
                                        >
                                            {isAsking ? 'Processing...' : 'Ask Question'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {activeDocument.questions && activeDocument.questions.length > 0 && (
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Document Q&A History</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[300px] pr-4">
                                            <div className="space-y-4">
                                                {[...activeDocument.questions].reverse().map((qa, index) => (
                                                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                                                        <p className="font-medium text-sm">Q: {qa.question}</p>
                                                        <div className="text-sm mt-2">
                                                            <p>A: </p>
                                                            <UnifiedMarkdown content={qa.answer} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
} 