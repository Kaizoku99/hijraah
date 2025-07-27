'use client';

import { useParams } from 'next/navigation';

export default function BusinessImmigrationPage() {
    const params = useParams();
    const locale = params.locale || 'en'; // Fallback locale

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Business Immigration Page</h1>
            <p>Current Locale: {locale.toString()}</p>
            {/* Add actual business immigration content here later */}
        </div>
    );
} 