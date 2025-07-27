'use client';

import { Languages } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useTransition } from 'react';

import { useI18n, Link, locales, localeConfigs } from '@/i18n/client';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
// Import from the client-safe i18n exports

export default function LanguageSwitcher({ variant = "default" }: { variant?: "default" | "sidebar" }) {
    const { locale, t } = useI18n();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const isSidebar = variant === "sidebar";

    // Get current path without locale prefix
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

    // Determine if we're in development mode
    const isDev = process.env.NODE_ENV === 'development';

    // Handle language switching with transition
    const switchLanguage = (newLocale: (typeof locales)[number]) => {
        // Skip if we're already switching or it's the current locale
        if (isPending || newLocale === locale) return;

        startTransition(() => {
            // Ensure path starts with a slash
            const path = `/${newLocale}${pathnameWithoutLocale.startsWith('/') ? pathnameWithoutLocale : `/${pathnameWithoutLocale}`}`;

            // Update HTML dir attribute for RTL support
            const config = localeConfigs[newLocale];
            document.documentElement.dir = config.direction;

            // Apply font class if specified
            if (config.fontClass) {
                document.documentElement.classList.forEach(className => {
                    if (className.startsWith('font-')) {
                        document.documentElement.classList.remove(className);
                    }
                });
                document.documentElement.classList.add(config.fontClass);
            }

            // Store the selected language in localStorage
            localStorage.setItem('NEXT_LOCALE', newLocale);

            // Navigate to the new path
            window.location.href = path;
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "relative h-9 w-9 rounded-full bg-background hover:bg-accent hover:text-accent-foreground",
                        "border border-border/40 shadow-sm transition-all duration-200",
                        "hover:shadow-md data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                        "focus-visible:ring-offset-0 focus-visible:border-primary/50",
                        isSidebar && "h-8 w-8 rounded-md",
                        isPending && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isPending}
                    aria-label={t('common.switchLanguage')}
                >
                    <Languages className={cn("h-[1.2rem] w-[1.2rem]", isSidebar && "h-4 w-4")} />
                    <span className="sr-only">{t('common.switchLanguage')}</span>
                    {isPending && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-full">
                            <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className={cn(
                    "animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                    "min-w-[150px]"
                )}
            >
                {locales.map((lang) => {
                    const config = localeConfigs[lang];
                    const isActive = locale === lang;

                    return (
                        <DropdownMenuItem
                            key={lang}
                            onClick={() => !isPending && switchLanguage(lang)}
                            className={cn(
                                "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                                isActive && "bg-accent font-medium text-accent-foreground",
                                isPending && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={isPending}
                        >
                            <span className="text-base">{config.flag}</span>
                            <span className={cn(
                                "flex-1",
                                lang === 'ar' && "font-arabic text-right"
                            )}>
                                {config.nativeName}
                            </span>
                            {isActive && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
