import React from 'react';
import { ArtifactGallery } from '@/components/artifact-gallery';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ArtifactsPage() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect('/login?callbackUrl=/artifacts');
    }

    return (
        <div className="min-h-screen">
            <ArtifactGallery />
        </div>
    );
} 