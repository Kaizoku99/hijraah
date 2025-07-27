import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseDetail } from '@/components/presentation/cases/case-detail';

export const metadata: Metadata = {
    title: 'Case Details | Hijraah Immigration Platform',
    description: 'View and manage case details',
};

interface CaseDetailPageProps {
    params: {
        id: string;
    };
}

export default function CaseDetailPage({ params }: CaseDetailPageProps) {
    // The ID will be passed to the component to fetch the specific case data
    return <CaseDetail id={params.id} />;
} 