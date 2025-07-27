'use client'

import { Upload, X, Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { cn } from '@/lib/utils'

import { Button } from './button'


interface FileUploadProps {
    value?: Array<{
        name: string
        url: string
        type: string
    }>
    onChange?: (files: File[]) => void
    onRemove?: (index: number) => void
    maxSize?: number // in MB
    acceptedTypes?: Record<string, string[]>
    className?: string
    isUploading?: boolean
}

export const FileUpload = ({
    value = [],
    onChange,
    onRemove,
    maxSize = 10,
    acceptedTypes = {
        'application/pdf': ['.pdf'],
        'image/*': ['.png', '.jpg', '.jpeg'],
    },
    className,
    isUploading = false,
}: FileUploadProps) => {
    const [error, setError] = useState<string | null>(null)

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            try {
                setError(null)
                onChange?.(acceptedFiles)
            } catch (err) {
                console.error('Error handling files:', err)
                setError('Failed to process files')
            }
        },
        [onChange]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedTypes,
        maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
        onError: (err) => {
            console.error('Dropzone error:', err)
            setError('Error handling files')
        },
        onDropRejected: (fileRejections) => {
            const errors = fileRejections.map((rejection) => {
                if (rejection.errors[0]?.code === 'file-too-large') {
                    return `File ${rejection.file.name} is too large. Max size is ${maxSize}MB`
                }
                return `File ${rejection.file.name} was rejected: ${rejection.errors[0]?.message}`
            })
            setError(errors.join('. '))
        },
    })

    return (
        <div className={className}>
            <div
                {...getRootProps()}
                className={cn(
                    'border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors',
                    isDragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-muted-foreground/25 hover:border-primary',
                    isUploading && 'opacity-50 cursor-not-allowed'
                )}
            >
                <input {...getInputProps()} disabled={isUploading} />
                <div className="flex flex-col items-center gap-2 text-center">
                    {isUploading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                        <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                    <p className="text-sm text-muted-foreground">
                        {isDragActive
                            ? 'Drop the files here...'
                            : isUploading
                                ? 'Uploading files...'
                                : 'Drag & drop files here, or click to select files'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Supported files: PDF, PNG, JPG, JPEG (up to {maxSize}MB)
                    </p>
                </div>
            </div>

            {error && (
                <p className="mt-2 text-sm text-destructive">{error}</p>
            )}

            {value.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {value.map((file, index) => (
                        <li
                            key={file.url}
                            className="flex items-center justify-between rounded-md border p-2"
                        >
                            <span className="text-sm truncate flex-1">{file.name}</span>
                            {onRemove && !isUploading && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemove(index)}
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Remove file</span>
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default FileUpload 