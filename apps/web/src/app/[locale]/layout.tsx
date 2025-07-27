import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AbstractIntlMessages } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";
import { Toaster } from "sonner";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Footer } from "@/components/ui/footer";
import LanguageSwitcherWrapper from "@/components/ui/language-switcher-wrapper";
import { NotificationButton } from "@/components/ui/notification-button";
import { Search as SearchBar } from "@/components/ui/search";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { locales, getLocaleConfig, getLocaleFont } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

import { IntlClientProvider } from "../client-providers";
import { Providers } from "../providers";

// Define font
const inter = Inter({ subsets: ["latin"] });

// Validate locale at build time
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Validate locale at runtime
export async function validateLocale(locale: string): Promise<string> {
  if (!locales.includes(locale as any)) {
    notFound();
  }
  return locale;
}

// Load messages with caching
const messageCache = new Map<string, AbstractIntlMessages>();

async function getMessages(locale: string): Promise<AbstractIntlMessages> {
  // Return cached messages if available
  if (messageCache.has(locale)) {
    return messageCache.get(locale)!;
  }

  try {
    const messages = (await import(`@/i18n/locales/${locale}.json`)).default;
    messageCache.set(locale, messages);
    return messages;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);

    // Fallback to English if the locale file is not found
    if (locale !== "en") {
      try {
        const defaultMessages = (await import(`@/i18n/locales/en.json`))
          .default;
        messageCache.set("en", defaultMessages);
        console.warn(`Falling back to en locale for missing locale: ${locale}`);
        return defaultMessages;
      } catch (fallbackError) {
        console.error("Failed to load fallback locale messages", fallbackError);
        return {}; // Return empty object instead of notFound() to prevent crashes
      }
    }

    return {}; // Return empty object instead of notFound() to prevent crashes
  }
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Await the entire params object first (Next.js 15 requirement)
  const resolvedParams = await Promise.resolve(params);
  const localeParam = resolvedParams.locale;

  // Validate and get locale asynchronously
  const locale = await validateLocale(localeParam);
  const messages = await getMessages(locale);

  // Get locale config
  const config = getLocaleConfig(locale);
  const direction = config.direction;
  const fontClass = getLocaleFont(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="h-full"
      dir={direction}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          inter.className,
          fontClass,
          "h-full m-0 p-0 overflow-x-hidden antialiased",
        )}
      >
        <NuqsAdapter>
          <IntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="UTC"
          >
            <ErrorBoundary>
              <Providers>
                <SidebarProvider defaultOpen={true}>
                  <AppSidebar />
                  <SidebarInset className="flex flex-col min-h-screen w-full">
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-blue-800/20 bg-gradient-to-r from-blue-950/95 to-indigo-950/95 dark:from-blue-950/95 dark:to-indigo-950/95 backdrop-blur-sm">
                      <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 text-blue-100">
                          <span className="sr-only">Toggle Sidebar</span>
                        </SidebarTrigger>
                        <Separator
                          orientation="vertical"
                          className="shrink-0 bg-blue-700/30 w-[1px] mr-2 h-4"
                        />
                        <Image
                          src="/Hijraah_logo.png"
                          alt="Hijraah"
                          width={32}
                          height={32}
                          className="h-8 w-8 mr-2"
                          priority
                        />
                        <span className="font-semibold text-lg hidden md:inline-block text-blue-100">
                          Hijraah
                        </span>
                      </div>

                      <div className="ml-auto flex items-center gap-4 px-4">
                        <SearchBar />
                        <NotificationButton />
                        {/* Import is safe since we\'re using the wrapper */}
                        <LanguageSwitcherWrapper />
                        <ThemeToggle />
                      </div>
                    </header>
                    <main className="flex-1 flex flex-col">
                      {children}
                      <Footer />
                    </main>
                  </SidebarInset>
                </SidebarProvider>
              </Providers>
            </ErrorBoundary>
            <Analytics />
          </IntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
