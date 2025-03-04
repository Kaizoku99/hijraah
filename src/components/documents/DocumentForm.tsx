'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload } from '@/components/ui/file-upload'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { documentsService } from '@/lib/services/documents'

interface DocumentFormProps {
    caseId: string
    className?: string
    onUpload?: (document: Awaited<ReturnType<typeof documentsService.uploadDocument>>) => void
}

export const DocumentForm = ({ caseId, className, onUpload }: DocumentFormProps) => {
    const t = useTranslations('documents')
    const [isUploading, setIsUploading] = useState(false)

    const handleUpload = async (files: File[]) => {
        try {
            setIsUploading(true)

            for (const file of files) {
                const document = await documentsService.uploadDocument(file, caseId)
                onUpload?.(document)
                toast.success(t('form.uploadSuccess', { name: file.name }))
            }
        } catch (err) {
            console.error('Error uploading documents:', err)
            toast.error(t('form.uploadError'))
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Card className={cn('w-full', className)}>
            <CardHeader>
                <CardTitle>{t('form.title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <FileUpload
                    onChange={(files) => {
                        if (files && files.length > 0) {
                            handleUpload(files)
                        }
                    }}
                    maxSize={10} // 10MB
                    acceptedTypes={{
                        'application/pdf': ['.pdf'],
                        'image/*': ['.png', '.jpg', '.jpeg'],
                    }}
                    isUploading={isUploading}
                />
            </CardContent>
        </Card>
    )
}

export default DocumentForm 