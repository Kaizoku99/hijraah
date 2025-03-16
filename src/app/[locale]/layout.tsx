import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { locales, localeConfigs } from '@/i18n';
import { Providers } from '../providers';
import { RootErrorBoundary } from '@/components/root-error-boundary';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

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

// Load messages
async function getMessages(locale: string): Promise<AbstractIntlMessages> {
    try {
        return (await import(`../../../messages/${locale}.json`)).default;
    } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
        notFound();
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
    // Validate and get locale asynchronously
    const locale = await validateLocale(params.locale);
    const messages = await getMessages(locale);

    // Get direction from config
    const direction = localeConfigs[locale as keyof typeof localeConfigs].direction;

    return (
        <html
            lang={locale}
            dir={direction}
            className={cn(
                "h-full antialiased",
                direction === 'rtl' && "font-arabic"
            )}
            suppressHydrationWarning
        >
            <body className="h-full">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Providers>
                        <RootErrorBoundary>
                            {children}
                            <Toaster
                                position={direction === 'rtl' ? 'bottom-left' : 'bottom-right'}
                                dir={direction}
                                closeButton
                                className={cn(
                                    "toaster-root",
                                    direction === 'rtl' && "font-arabic"
                                )}
                            />
                        </RootErrorBoundary>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
