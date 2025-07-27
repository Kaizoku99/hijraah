"use client";

import { useParams } from "next/navigation";

export default function DocumentVerificationPage() {
  const params = useParams();
  const locale = params.locale || "en"; // Fallback locale

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Document Verification Page</h1>
      <p>Current Locale: {locale.toString()}</p>
      {/* Add actual document verification content here later */}
    </div>
  );
}
