'use client';

import { format } from 'date-fns';
import { Eye, Download, Calendar, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'expired' | 'required';

export interface DocumentCardProps {
    id: string;
    title: string;
    description?: string;
    status: DocumentStatus;
    documentType?: string;
    dateSubmitted?: Date;
    expiryDate?: Date;
    requiresAction?: boolean;
    onView?: () => void;
    onDownload?: () => void;
    className?: string;
}

export function DocumentCard({
    id,
    title,
    description,
    status,
    documentType,
    dateSubmitted,
    expiryDate,
    requiresAction = false,
    onView,
    onDownload,
    className,
}: DocumentCardProps) {
    const t = useTranslations('documents');
    const [isHovered, setIsHovered] = useState(false);

    const statusConfig = {
        pending: {
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            icon: <Clock className="h-4 w-4 mr-1" />,
        },
        approved: {
            color: 'bg-green-100 text-green-800 border-green-200',
            icon: <CheckCircle className="h-4 w-4 mr-1" />,
        },
        rejected: {
            color: 'bg-red-100 text-red-800 border-red-200',
            icon: <XCircle className="h-4 w-4 mr-1" />,
        },
        expired: {
            color: 'bg-gray-100 text-gray-800 border-gray-200',
            icon: <AlertCircle className="h-4 w-4 mr-1" />,
        },
        required: {
            color: 'bg-blue-100 text-blue-800 border-blue-200',
            icon: <AlertCircle className="h-4 w-4 mr-1" />,
        },
    };

    // Check if document is about to expire (within 30 days)
    const isNearExpiry = expiryDate && new Date(expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return (
        <Card
            className={cn(
                'transition-all duration-200 border overflow-hidden',
                requiresAction && 'border-l-4 border-l-amber-500',
                isHovered && 'shadow-md',
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg font-medium">{title}</CardTitle>
                        {documentType && (
                            <CardDescription className="text-xs mt-1">
                                {t('type')}: {documentType}
                            </CardDescription>
                        )}
                    </div>
                    <Badge
                        variant="outline"
                        className={cn('flex items-center px-2 py-1 rounded-full', statusConfig[status].color)}
                    >
                        {statusConfig[status].icon}
                        {t(`status.${status}`)}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent>
                {description && <p className="text-sm text-gray-600 mb-3">{description}</p>}

                <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                    {dateSubmitted && (
                        <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            <span>{t('dateSubmitted')}: {format(dateSubmitted, 'PPP')}</span>
                        </div>
                    )}

                    {expiryDate && (
                        <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            <span className={cn(isNearExpiry && 'text-amber-600 font-medium')}>
                                {t('expiryDate')}: {format(expiryDate, 'PPP')}
                                {isNearExpiry && ` (${t('expiringSoon')})`}
                            </span>
                        </div>
                    )}

                    {requiresAction && (
                        <div className="mt-2 text-amber-600 font-medium flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1.5" />
                            {t('actionRequired')}
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="pt-2 flex gap-2 justify-end">
                {onView && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="sm" variant="outline" onClick={onView}>
                                <Eye className="h-4 w-4 mr-2" />
                                {t('actions.view')}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {t('actions.view')}
                        </TooltipContent>
                    </Tooltip>
                )}

                {onDownload && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="sm" variant="outline" onClick={onDownload}>
                                <Download className="h-4 w-4 mr-2" />
                                {t('actions.download')}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {t('actions.download')}
                        </TooltipContent>
                    </Tooltip>
                )}
            </CardFooter>
        </Card>
    );
} 