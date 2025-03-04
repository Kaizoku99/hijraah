'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { FileText, Trash2, Download, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { documentsService } from '@/lib/services/documents'

interface DocumentListProps {
    caseId: string
    className?: string
    onDelete?: (id: string) => void
}

export const DocumentList = ({ caseId, className, onDelete }: DocumentListProps) => {
    const t = useTranslations('documents')
    const [documents, setDocuments] = useState<Awaited<ReturnType<typeof documentsService.getDocuments>>>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchDocuments = async () => {
        try {
            setIsLoading(true)
            const data = await documentsService.getDocuments(caseId)
            setDocuments(data)
        } catch (err) {
            console.error('Error fetching documents:', err)
            setError(t('list.fetchError'))
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await documentsService.deleteDocument(id)
            setDocuments(prev => prev.filter(doc => doc.id !== id))
            onDelete?.(id)
            toast.success(t('list.deleteSuccess'))
        } catch (err) {
            console.error('Error deleting document:', err)
            toast.error(t('list.deleteError'))
        }
    }

    if (error) {
        return (
            <Card className={cn('w-full', className)}>
                <CardContent className="p-6">
                    <div className="flex items-center justify-center text-red-500">
                        <span>{error}</span>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className={cn('w-full', className)}>
            <CardHeader>
                <CardTitle>{t('list.title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : documents.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                        {t('list.noDocuments')}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center gap-4 rounded-lg border p-4"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => window.open(doc.url, '_blank')}
                                    >
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">{t('list.view')}</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            const a = document.createElement('a')
                                            a.href = doc.url
                                            a.download = doc.name
                                            a.click()
                                        }}
                                    >
                                        <Download className="h-4 w-4" />
                                        <span className="sr-only">{t('list.download')}</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(doc.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">{t('list.delete')}</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default DocumentList 