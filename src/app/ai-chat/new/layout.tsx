import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'New Chat - Hijraah',
    description: 'Start a new AI chat conversation',
};

export default function NewChatLayout({ children }: { children: ReactNode }) {
    return children;
} 