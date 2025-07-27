"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { MainLayout } from "@/components/ui/layouts/main-layout";

export default function LocaleNotFound() {
  // Set default fallback values
  const defaultTitle = "Page Not Found";
  const defaultDescription = "The page you are looking for does not exist.";
  const defaultBackHome = "Back to Home";

  // Using try-catch for translation errors
  try {
    const t = useTranslations("errors");

    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-bold">
            {t("notFound", { fallback: defaultTitle })}
          </h1>
          <p className="mt-3 text-xl mb-6">
            {t("pageNotFound", { fallback: defaultDescription })}
          </p>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            legacyBehavior
          >
            {t("backHome", { fallback: defaultBackHome })}
          </Link>
        </div>
      </MainLayout>
    );
  } catch (error) {
    console.error("Translation error in not-found page:", error);
    // Fallback UI
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-bold">{defaultTitle}</h1>
          <p className="mt-3 text-xl mb-6">{defaultDescription}</p>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            legacyBehavior
          >
            {defaultBackHome}
          </Link>
        </div>
      </MainLayout>
    );
  }
}
