import { Metadata } from 'next';

interface GenerateMetadataProps {
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
}

export function generateMetadata({
    title,
    description,
    image,
    noIndex = false,
}: GenerateMetadataProps = {}): Metadata {
    const baseTitle = 'Hijraah - Immigration Platform';
    const baseDescription = 'Streamline your immigration process with Hijraah';
    const baseImage = '/og-image.png';

    const metadata: Metadata = {
        title: title ? `${title} | ${baseTitle}` : baseTitle,
        description: description || baseDescription,
        openGraph: {
            title: title ? `${title} | ${baseTitle}` : baseTitle,
            description: description || baseDescription,
            images: [{ url: image || baseImage }],
            type: 'website',
            siteName: baseTitle,
        },
        twitter: {
            card: 'summary_large_image',
            title: title ? `${title} | ${baseTitle}` : baseTitle,
            description: description || baseDescription,
            images: [image || baseImage],
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
        },
    };

    return metadata;
}