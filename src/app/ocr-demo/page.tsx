import { MistralOcrUploader } from '@/components/document/MistralOcrUploader';

export const metadata = {
    title: 'Mistral OCR Demo',
    description: 'Demo of Mistral OCR capabilities for document processing',
};

export default function OcrDemoPage() {
    return (
        <div className="container py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Mistral OCR Demo</h1>
                <p className="text-muted-foreground">
                    Upload documents or provide URLs to process them with Mistral OCR API
                </p>
            </div>

            <MistralOcrUploader />

            <div className="mt-12 space-y-4 text-sm">
                <h2 className="text-xl font-semibold">Supported Document Types</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>PDF Documents</strong> - Multi-page documents with text and images</li>
                    <li><strong>Images</strong> - JPG, PNG, TIFF containing text</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8">OCR Features</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>High-accuracy text extraction</strong> - Extract text from images and scanned documents</li>
                    <li><strong>Table detection</strong> - Identify and extract tabular data</li>
                    <li><strong>Format preservation</strong> - Maintain document layout and structure</li>
                    <li><strong>Multi-language support</strong> - Process documents in various languages</li>
                </ul>

                <p className="mt-4 text-muted-foreground">
                    Note: Processing large documents may take some time. Please be patient.
                </p>
            </div>
        </div>
    );
} 