'use client';

import { CalendarIcon, ArrowUpDown, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDocumentAnalysisHistory } from '@/lib/document/analysis-storage';
import { compareDocumentAnalysis } from '@/lib/document/comparison';
import { DocumentAnalysis } from '@/types/documents';

interface AnalysisHistoryProps {
    documentId: string;
    onSelectAnalysis?: (analysis: any) => void;
    className?: string;
}

export function AnalysisHistory({ documentId, onSelectAnalysis, className }: AnalysisHistoryProps) {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnalysisIds, setSelectedAnalysisIds] = useState<string[]>([]);
    const [comparisonResult, setComparisonResult] = useState<any>(null);

    useEffect(() => {
        async function fetchHistory() {
            try {
                setLoading(true);
                const data = await getDocumentAnalysisHistory(documentId);
                setHistory(data);
                setError(null);
            } catch (err) {
                setError('Failed to load analysis history');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, [documentId]);

    const toggleAnalysisSelection = (analysisId: string) => {
        if (selectedAnalysisIds.includes(analysisId)) {
            setSelectedAnalysisIds(selectedAnalysisIds.filter(id => id !== analysisId));
        } else {
            // Limit to 2 selections
            if (selectedAnalysisIds.length < 2) {
                setSelectedAnalysisIds([...selectedAnalysisIds, analysisId]);
            } else {
                // Replace the oldest selection
                setSelectedAnalysisIds([selectedAnalysisIds[1], analysisId]);
            }
        }
    };

    const compareSelectedAnalyses = () => {
        if (selectedAnalysisIds.length !== 2) return;

        const analysis1 = history.find(item => item.id === selectedAnalysisIds[0]);
        const analysis2 = history.find(item => item.id === selectedAnalysisIds[1]);

        if (analysis1 && analysis2) {
            const result = compareDocumentAnalysis(
                analysis1 as DocumentAnalysis,
                analysis2 as DocumentAnalysis
            );
            setComparisonResult(result);
        }
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Analysis History
                </CardTitle>
                <CardDescription>
                    View previous analysis results and compare document versions
                </CardDescription>
            </CardHeader>

            <Tabs defaultValue="history">
                <TabsList className="mx-6">
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger
                        value="comparison"
                        disabled={selectedAnalysisIds.length !== 2}
                        onClick={compareSelectedAnalyses}
                    >
                        Comparison
                    </TabsTrigger>
                </TabsList>

                <CardContent className="pt-6">
                    <TabsContent value="history">
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8 text-destructive">{error}</div>
                        ) : history.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">No analysis history found</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12"></TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Valid</TableHead>
                                        <TableHead>Completeness</TableHead>
                                        <TableHead>Errors</TableHead>
                                        <TableHead>Language</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {history.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAnalysisIds.includes(item.id)}
                                                    onChange={() => toggleAnalysisSelection(item.id)}
                                                    className="h-4 w-4"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span>{new Date(item.created_at).toLocaleString()}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={item.is_valid ? "default" : "destructive"}>
                                                    {item.is_valid ? "Valid" : "Invalid"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {Math.round(item.completeness_score * 100)}%
                                            </TableCell>
                                            <TableCell>
                                                {item.format_errors.length + item.content_errors.length}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{item.language.toUpperCase()}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onSelectAnalysis?.(item)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </TabsContent>

                    <TabsContent value="comparison">
                        {comparisonResult && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium">Document Comparison</h3>
                                    <Badge
                                        variant={comparisonResult.overallImprovement > 0 ? "default" : "destructive"}
                                        className="text-sm"
                                    >
                                        {comparisonResult.overallImprovement > 0 ? (
                                            <span className="flex items-center gap-1">
                                                <ArrowUpDown className="h-3 w-3" />
                                                Improved
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                <ArrowUpDown className="h-3 w-3" />
                                                Regressed
                                            </span>
                                        )}
                                    </Badge>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium">Completeness</h4>
                                    <div className="flex gap-4">
                                        <div className="flex-1 p-3 border rounded-lg">
                                            <div className="text-sm text-muted-foreground">First version</div>
                                            <div className="text-2xl font-bold">
                                                {Math.round(comparisonResult.completenessComparison.source1Score * 100)}%
                                            </div>
                                        </div>
                                        <div className="flex-1 p-3 border rounded-lg">
                                            <div className="text-sm text-muted-foreground">Second version</div>
                                            <div className="text-2xl font-bold">
                                                {Math.round(comparisonResult.completenessComparison.source2Score * 100)}%
                                            </div>
                                        </div>
                                        <div className="flex-1 p-3 border rounded-lg">
                                            <div className="text-sm text-muted-foreground">Difference</div>
                                            <div className={`text-2xl font-bold ${comparisonResult.completenessComparison.difference > 0 ? 'text-green-600' : comparisonResult.completenessComparison.difference < 0 ? 'text-red-600' : ''}`}>
                                                {comparisonResult.completenessComparison.difference > 0 ? '+' : ''}
                                                {Math.round(comparisonResult.completenessComparison.difference * 100)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium">Errors</h4>
                                    <div className="flex gap-4">
                                        <div className="flex-1 p-3 border rounded-lg">
                                            <div className="text-sm text-muted-foreground">First version</div>
                                            <div className="text-2xl font-bold">
                                                {comparisonResult.errorComparison.source1ErrorCount}
                                            </div>
                                        </div>
                                        <div className="flex-1 p-3 border rounded-lg">
                                            <div className="text-sm text-muted-foreground">Second version</div>
                                            <div className="text-2xl font-bold">
                                                {comparisonResult.errorComparison.source2ErrorCount}
                                            </div>
                                        </div>
                                        <div className="flex-1 p-3 border rounded-lg">
                                            <div className="text-sm text-muted-foreground">Reduction</div>
                                            <div className={`text-2xl font-bold ${comparisonResult.errorComparison.difference > 0 ? 'text-green-600' : comparisonResult.errorComparison.difference < 0 ? 'text-red-600' : ''}`}>
                                                {comparisonResult.errorComparison.difference > 0 ? '+' : ''}
                                                {comparisonResult.errorComparison.difference}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium">Field Differences</h4>
                                    {comparisonResult.fieldDifferences.length === 0 ? (
                                        <div className="text-center py-4 text-muted-foreground">No field differences found</div>
                                    ) : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Field</TableHead>
                                                    <TableHead>First Value</TableHead>
                                                    <TableHead>Second Value</TableHead>
                                                    <TableHead>Significance</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {comparisonResult.fieldDifferences.map((diff, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium">{diff.field}</TableCell>
                                                        <TableCell>{diff.source1Value?.toString() || '-'}</TableCell>
                                                        <TableCell>{diff.source2Value?.toString() || '-'}</TableCell>
                                                        <TableCell>
                                                            {diff.isSignificant ? (
                                                                <span className="flex items-center text-amber-600">
                                                                    <AlertTriangle className="h-4 w-4 mr-1" />
                                                                    Significant
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center text-green-600">
                                                                    <CheckCircle className="h-4 w-4 mr-1" />
                                                                    Minor
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </div>
                            </div>
                        )}
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    );
}
