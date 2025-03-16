'use client';

import * as React from 'react';
import { Languages } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { locales, localeConfigs } from '@/i18n';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
] as const;

export default function LanguageSwitcher({ variant = "default" }: { variant?: "default" | "sidebar" }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const isSidebar = variant === "sidebar";

    const switchLanguage = (locale: (typeof languages)[number]['code']) => {
        startTransition(() => {
            // Get the current path without the locale
            const newPath = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
            // Ensure path starts with a slash
            const path = `/${locale}${newPath.startsWith('/') ? newPath : `/${newPath}`}`;

            // Update HTML dir attribute for RTL support
            document.documentElement.dir = localeConfigs[locale].direction;

            // Store the selected language in localStorage
            localStorage.setItem('NEXT_LOCALE', locale);

            // Navigate to the new path
            router.push(path);
            router.refresh();
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
                >
                    <Languages className={cn("h-[1.2rem] w-[1.2rem]", isSidebar && "h-4 w-4")} />
                    <span className="sr-only">Switch language</span>
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
                {languages.map((lang) => {
                    const isActive = pathname.startsWith(`/${lang.code}`);
                    return (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => !isPending && switchLanguage(lang.code)}
                            className={cn(
                                "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                                isActive && "bg-accent font-medium text-accent-foreground",
                                isPending && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={isPending}
                        >
                            <span className="text-base">{lang.flag}</span>
                            <span className={cn(
                                "flex-1",
                                lang.code === 'ar' && "font-arabic text-right"
                            )}>
                                {lang.name}
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
