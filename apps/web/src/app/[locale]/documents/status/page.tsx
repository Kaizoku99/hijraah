"use client";

import { useParams } from "next/navigation";

export default function DocumentStatusPage() {
  const params = useParams();
  const locale = params.locale || "en"; // Fallback locale

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Document Status Page</h1>
      <p>Current Locale: {locale.toString()}</p>
      {/* Add actual document status content here later */}
    </div>
  );
}
