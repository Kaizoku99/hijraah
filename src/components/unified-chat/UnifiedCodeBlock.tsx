'use client'

import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface UnifiedCodeBlockProps {
    language: string
    code: string
    className?: string
}

export function UnifiedCodeBlock({ language, code, className }: UnifiedCodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <div className={cn('relative my-4 rounded-md bg-muted', className)}>
            <div className="flex items-center justify-between rounded-t-md bg-muted px-4 py-2 font-mono text-xs">
                <div className="text-muted-foreground">{language}</div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={copyToClipboard}
                >
                    {isCopied ? (
                        <CheckIcon className="h-3.5 w-3.5 text-primary" />
                    ) : (
                        <CopyIcon className="h-3.5 w-3.5" />
                    )}
                    <span className="sr-only">Copy code</span>
                </Button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={vs}
                customStyle={{ margin: 0, borderRadius: '0 0 0.375rem 0.375rem' }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
} 