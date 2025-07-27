import { redirect } from 'next/navigation';
import React from 'react';

import { ArtifactGallery } from '@/components/ui/artifact-gallery';
import { auth } from '@/lib/auth';

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