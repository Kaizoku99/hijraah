'use client'

import { Loader2, ChevronRight, ChevronDown } from 'lucide-react'
import { useState, useCallback } from 'react'

import { Card } from '@/components/ui/card'
import { Progress } from '@/shared/ui/atoms/progress'
import { ScrollArea } from '@/shared/ui/ui/scroll-area'
import { Tree, TreeItem } from '@/shared/ui/ui/tree'

interface ResearchNode {
    id: string;
    query: string;
    depth: number;
    status: 'pending' | 'processing' | 'completed' | 'error';
    children: ResearchNode[];
    findings: Array<{
        content: string;
        source: string;
        relevance: number;
    }>;
}

interface RecursiveResearchProps {
    initialQuery: string;
    maxDepth?: number;
    onComplete?: (results: ResearchNode) => void;
}

export function RecursiveResearch({
    initialQuery,
    maxDepth = 3,
    onComplete,
}: RecursiveResearchProps) {
    const [root, setRoot] = useState<ResearchNode>({
        id: '0',
        query: initialQuery,
        depth: 0,
        status: 'pending',
        children: [],
        findings: [],
    });

    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['0']));
    const [progress, setProgress] = useState(0);

    const toggleNode = useCallback((nodeId: string) => {
        setExpandedNodes(prev => {
            const next = new Set(prev);
            if (next.has(nodeId)) {
                next.delete(nodeId);
            } else {
                next.add(nodeId);
            }
            return next;
        });
    }, []);

    const renderNode = useCallback((node: ResearchNode) => {
        const isExpanded = expandedNodes.has(node.id);
        const hasChildren = node.children.length > 0;
        const icon = node.status === 'processing' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
        ) : hasChildren ? (
            isExpanded ? (
                <ChevronDown className="h-4 w-4" />
            ) : (
                <ChevronRight className="h-4 w-4" />
            )
        ) : null;

        return (
            <TreeItem
                key={node.id}
                className="py-2"
            >
                <div className="flex items-center gap-2" onClick={() => toggleNode(node.id)}>
                    {icon}
                    <span className="font-medium">{node.query}</span>
                    {node.status === 'completed' && (
                        <span className="text-sm text-muted-foreground">
                            ({node.findings.length} findings)
                        </span>
                    )}
                </div>
                {isExpanded && (
                    <>
                        {node.findings.length > 0 && (
                            <Card className="mt-2 p-4">
                                <ScrollArea className="h-[200px]">
                                    {node.findings.map((finding, index) => (
                                        <div key={index} className="mb-4">
                                            <p className="text-sm">{finding.content}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Source: {finding.source} (Relevance: {Math.round(finding.relevance * 100)}%)
                                            </p>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </Card>
                        )}
                        {hasChildren && (
                            <div className="ml-6 mt-2">
                                {node.children.map(child => renderNode(child))}
                            </div>
                        )}
                    </>
                )}
            </TreeItem>
        );
    }, [expandedNodes, toggleNode]);

    return (
        <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <Tree>
                {renderNode(root)}
            </Tree>
        </div>
    );
}