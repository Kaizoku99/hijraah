"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { LocaleConfig } from "@/_shared/i18n/i18n";

interface ClientIndexPageProps {
  locale: string;
  config: LocaleConfig;
}

export default function ClientIndexPage({
  locale,
  config,
}: ClientIndexPageProps) {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <header className="mb-6">
        <h1 className="text-4xl font-bold">{t("common.appName")}</h1>
        <p className="text-xl mt-2">{t("common.tagline")}</p>
      </header>
      <main className="max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">{t("Home.title")}</h2>
        <p className="mb-6">{t("Home.description")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            href={`/${locale}/services`}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            legacyBehavior
          >
            {t("nav.services")}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            legacyBehavior
          >
            {t("nav.about")}
          </Link>
        </div>
      </main>
      <footer className="mt-auto py-4">
        <p>
          {t("common.appName")} &copy; {new Date().getFullYear()}
        </p>
        <div className="flex justify-center gap-2 mt-2">
          {/* Language switcher example */}
          <span>Language: {config.nativeName}</span>
        </div>
      </footer>
    </div>
  );
}
