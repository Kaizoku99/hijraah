'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Briefcase, MoreHorizontal, Calendar, ChevronRight } from 'lucide-react';
import { Case, CaseStatus } from '@/types/cases';
import { format } from 'date-fns';

interface CasesListProps {
    cases: Case[];
    onCaseUpdated: () => Promise<void>;
}

export function CasesList({ cases, onCaseUpdated }: CasesListProps) {
    const router = useRouter();
    const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);

    const getStatusColor = (status: CaseStatus) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'pending':
            case 'pending_review':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
            case 'completed':
            case 'approved':
                return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 hover:bg-red-200';
            case 'archived':
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), 'MMM d, yyyy');
        } catch (e) {
            return 'Invalid date';
        }
    };

    const toggleExpand = (caseId: string) => {
        setExpandedCaseId(expandedCaseId === caseId ? null : caseId);
    };

    if (cases.length === 0) {
        return (
            <div className="text-center p-12 border rounded-lg">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No cases found</h3>
                <p className="text-muted-foreground mb-4">Get started by creating your first case</p>
                <Button onClick={() => router.push('/dashboard/cases/new')}>
                    Create a Case
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {cases.map((caseItem) => (
                <Card
                    key={caseItem.id}
                    className={expandedCaseId === caseItem.id ? 'border-primary' : ''}
                >
                    <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg">{caseItem.title || 'Untitled Case'}</CardTitle>
                                <CardDescription className="text-sm text-muted-foreground mt-1">
                                    {caseItem.description?.substring(0, 100)}
                                    {caseItem.description && caseItem.description.length > 100 ? '...' : ''}
                                </CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(caseItem.status)}>
                                    {caseItem.status?.replace('_', ' ')}
                                </Badge>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/cases/${caseItem.id}`)}>
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/cases/${caseItem.id}/edit`)}>
                                            Edit Case
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/cases/${caseItem.id}/documents`)}>
                                            View Documents
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={async () => {
                                                // Implement archive/delete functionality here
                                                await onCaseUpdated();
                                            }}
                                        >
                                            Archive Case
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap text-sm text-muted-foreground gap-y-1">
                            <div className="flex items-center mr-4">
                                <Briefcase className="mr-1 h-4 w-4" />
                                <span>Type: {caseItem.case_type || 'N/A'}</span>
                            </div>
                            {caseItem.target_date && (
                                <div className="flex items-center mr-4">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    <span>Target: {formatDate(caseItem.target_date)}</span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <span>Created: {formatDate(caseItem.created_at)}</span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpand(caseItem.id)}
                        >
                            {expandedCaseId === caseItem.id ? 'Show less' : 'Show more'}
                        </Button>

                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => router.push(`/dashboard/cases/${caseItem.id}`)}
                        >
                            View Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </CardFooter>

                    {expandedCaseId === caseItem.id && (
                        <div className="px-4 pb-4 border-t pt-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <h4 className="font-medium mb-2">Case Details</h4>
                                    <p className="text-muted-foreground mb-1">
                                        <strong>ID:</strong> {caseItem.id}
                                    </p>
                                    <p className="text-muted-foreground mb-1">
                                        <strong>Destination:</strong> {caseItem.destination_country || 'N/A'}
                                    </p>
                                    <p className="text-muted-foreground">
                                        <strong>Last Updated:</strong> {formatDate(caseItem.updated_at)}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Requirements</h4>
                                    {caseItem.requirements ? (
                                        <ul className="list-disc list-inside text-muted-foreground">
                                            {Object.entries(caseItem.requirements).slice(0, 3).map(([key, value]) => (
                                                <li key={key}>{key}: {String(value)}</li>
                                            ))}
                                            {Object.keys(caseItem.requirements).length > 3 && (
                                                <li>And {Object.keys(caseItem.requirements).length - 3} more...</li>
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="text-muted-foreground">No requirements specified</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
} 