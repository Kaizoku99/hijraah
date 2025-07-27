import { Metadata } from 'next';

import { DocumentAnalyzer } from '@/components/ui/documents/DocumentAnalyzer';

export const metadata: Metadata = {
    title: 'Document Analysis - Hijraah',
    description: 'Analyze and validate immigration documents with AI assistance',
};

export default function DocumentAnalysisPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Document Analysis</h1>
                    <p className="text-muted-foreground">
                        Upload your immigration documents for AI-powered analysis, validation, and data extraction.
                    </p>
                </div>

                <DocumentAnalyzer />

                <div className="mt-8 space-y-4">
                    <h2 className="text-xl font-semibold">About Document Analysis</h2>
                    <div className="prose prose-gray max-w-none">
                        <p>
                            Our AI-powered document analyzer helps you ensure your immigration documents are correct,
                            complete, and comply with requirements. The system can:
                        </p>
                        <ul>
                            <li>Validate document format and content</li>
                            <li>Extract key information automatically</li>
                            <li>Identify potential errors and issues</li>
                            <li>Provide suggestions for corrections</li>
                            <li>Detect document language</li>
                            <li>Assess document completeness</li>
                        </ul>
                        <p>
                            Currently supported document types include passports, visas, birth certificates,
                            marriage certificates, education credentials, employment letters, and more.
                        </p>
                        <h3>Privacy and Security</h3>
                        <p>
                            All document processing is performed securely. Your documents are encrypted during
                            transit and storage. The AI analysis is performed in isolated environments with strict
                            access controls. We do not use your documents for training our AI models.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 