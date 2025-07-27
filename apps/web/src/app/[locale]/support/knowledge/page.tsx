"use client";

import { useParams } from "next/navigation";

export default function KnowledgeBasePage() {
  const params = useParams();
  const locale = params.locale || "en"; // Fallback locale

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Knowledge Base Page</h1>
      <p>Current Locale: {locale.toString()}</p>
      {/* Add actual knowledge base content here later */}
    </div>
  );
}
