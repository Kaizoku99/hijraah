'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '@/lib/utils'

interface MarkdownProps {
    content: string
    className?: string
}

export function Markdown({ content, className }: MarkdownProps) {
    return (
        <div className={cn('prose prose-sm dark:prose-invert max-w-none', className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    },
                    a: ({ node, ...props }) => (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                            {...props}
                        />
                    ),
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto">
                            <table className="border-collapse border border-border" {...props} />
                        </div>
                    ),
                    th: ({ node, ...props }) => (
                        <th className="border border-border bg-muted px-4 py-2 text-left" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                        <td className="border border-border px-4 py-2" {...props} />
                    ),
                    img: ({ node, ...props }) => (
                        <img className="rounded-md" {...props} />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
} 