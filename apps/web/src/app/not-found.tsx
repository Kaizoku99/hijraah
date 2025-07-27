"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { defaultLocale } from "@/i18n/i18n";

export default function RootNotFound() {
  const router = useRouter();

  // Redirect to the default locale home page
  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="mt-3 text-xl">Redirecting to home page...</p>
    </div>
  );
}
