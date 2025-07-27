'use client';

import { Languages, Check } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import useTranslations from '@/hooks/use-translations';
import { locales, localeConfigs, localeNames, Locale } from '@/i18n';
import { cn } from '@/lib/utils';

type LanguageInfo = {
    code: Locale;
    name: string;
    nativeName: string;
    flag: string;
    direction: 'ltr' | 'rtl';
};

const languages: LanguageInfo[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', direction: 'ltr' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', direction: 'ltr' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', direction: 'ltr' },
];

interface LanguageSwitcherProps {
    variant?: "default" | "sidebar" | "minimal";
    className?: string;
}

export default function EnhancedLanguageSwitcher({
    variant = "default",
    className
}: LanguageSwitcherProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const isSidebar = variant === "sidebar";
    const isMinimal = variant === "minimal";
    const { t } = useTranslations('common');

    // Get current locale from pathname
    const currentLocale = locales.find(locale =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    ) || 'en';

    // Determine current language direction
    const isRtl = localeConfigs[currentLocale as Locale]?.direction === 'rtl';

    const switchLanguage = (locale: Locale) => {
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

    // Find current language info
    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

    if (isMinimal) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className={cn("rounded-full", className)}>
                        <span className="text-lg">{currentLanguage.flag}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRtl ? "start" : "end"}>
                    {languages.map((language) => (
                        <DropdownMenuItem
                            key={language.code}
                            onClick={() => switchLanguage(language.code)}
                            className={cn(
                                "flex items-center gap-2 cursor-pointer",
                                language.code === currentLocale && "font-bold"
                            )}
                        >
                            <span className="text-lg">{language.flag}</span>
                            <span>{language.nativeName}</span>
                            {language.code === currentLocale && (
                                <Check className="w-4 h-4 ml-auto" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    if (isSidebar) {
        return (
            <div className={cn("px-2 py-2", className)}>
                <h4 className="text-sm font-medium mb-2">{t('language')}</h4>
                <div className="space-y-1">
                    {languages.map((language) => (
                        <Button
                            key={language.code}
                            variant={language.code === currentLocale ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => switchLanguage(language.code)}
                        >
                            <span className="mr-2">{language.flag}</span>
                            <span>{language.nativeName}</span>
                        </Button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "gap-1",
                        isRtl && "flex-row-reverse",
                        className
                    )}
                >
                    <Languages className="h-4 w-4" />
                    <span className="text-xs sm:text-sm">{currentLanguage.nativeName}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRtl ? "start" : "end"} className="w-[180px]">
                <DropdownMenuLabel>{t('selectLanguage')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => switchLanguage(language.code)}
                        className={cn(
                            "flex items-center gap-2 cursor-pointer",
                            language.code === currentLocale && "font-bold",
                            language.direction === "rtl" && "font-arabic"
                        )}
                    >
                        <span className="text-lg">{language.flag}</span>
                        <span className="flex-1">{language.nativeName}</span>
                        {language.code === currentLocale && (
                            <Check className="w-4 h-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 