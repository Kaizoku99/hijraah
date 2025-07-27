import { Metadata } from 'next';

import { NewCaseForm } from '@/components/presentation/cases/new-case-form';

export const metadata: Metadata = {
    title: 'Create New Case | Hijraah Immigration Platform',
    description: 'Create a new immigration case',
};

export default function NewCasePage() {
    return <NewCaseForm />;
} 