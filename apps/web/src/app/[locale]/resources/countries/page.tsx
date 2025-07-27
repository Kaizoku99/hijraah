"use client";

import { useParams } from "next/navigation";

export default function CountryInformationPage() {
  const params = useParams();
  const locale = params.locale || "en"; // Fallback locale

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Country Information Page</h1>
      <p>Current Locale: {locale.toString()}</p>
      {/* Add actual country information content here later */}
    </div>
  );
}
