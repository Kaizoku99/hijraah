import { HomeClient } from "@/components/home-client";

// This is a server component that awaits params properly
export default async function IndexPage({
  params,
}: {
  params: { locale: string };
}) {
  // Await params object first (Next.js 15 requirement)
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;

  // Use the client component that has the full UI styling and i18n support
  return <HomeClient locale={locale} />;
}
