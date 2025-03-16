import { Metadata } from 'next';
import { MistralOcrUploader } from '@/components/document/MistralOcrUploader';
import { MistralDocumentUnderstanding } from '@/components/document/MistralDocumentUnderstanding';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
    title: 'Mistral Document Processing',
    description: 'Demo of Mistral OCR and Document Understanding capabilities',
};

export default function MistralDocumentDemoPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold mb-2">Mistral Document Processing</h1>
                <p className="text-muted-foreground">
                    Process documents with Mistral OCR and ask questions about their content
                </p>
            </div>

            <Tabs defaultValue="ocr" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="ocr">OCR Processing</TabsTrigger>
                    <TabsTrigger value="understanding">Document Understanding</TabsTrigger>
                </TabsList>
                <TabsContent value="ocr">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Optical Character Recognition</h2>
                        <p className="text-muted-foreground mb-6">
                            Extract text from PDFs and images while preserving document structure and formatting
                        </p>
                    </div>
                    <MistralOcrUploader />
                </TabsContent>
                <TabsContent value="understanding">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Document Understanding</h2>
                        <p className="text-muted-foreground mb-6">
                            Ask questions about document content and get AI-powered answers
                        </p>
                    </div>
                    <MistralDocumentUnderstanding />
                </TabsContent>
            </Tabs>

            <div className="mt-16 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">About Mistral Document Processing</h2>
                <div className="prose dark:prose-invert">
                    <p>
                        Mistral AI's document processing capabilities combine powerful OCR technology with large language model understanding
                        to extract information from documents and enable natural language interaction with document content.
                    </p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Document OCR</strong> - Extract text while preserving document structure and formatting</li>
                        <li><strong>Table Detection</strong> - Identify and extract tables from documents</li>
                        <li><strong>Document Understanding</strong> - Ask questions about document content in natural language</li>
                        <li><strong>Multi-format Support</strong> - Process PDFs, images, and other document formats</li>
                    </ul>

                    <h3>Common Use Cases</h3>
                    <ul>
                        <li>Automatically process legal documents, contracts, and agreements</li>
                        <li>Extract information from business documents and forms</li>
                        <li>Build document Q&A systems and chatbots</li>
                        <li>Analyze research papers and technical documents</li>
                        <li>Process invoices, receipts, and financial documents</li>
                    </ul>
                </div>
            </div>
        </div>
    );
} 