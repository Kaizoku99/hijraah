import { ReactNode } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import LanguageSwitcher from '@/components/ui/language-switcher';
import { Separator } from '@/components/ui/separator';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
    breadcrumbs?: {
        title: string;
        href?: string;
    }[];
    heroSection?: React.ReactNode;
}

/**
 * MainLayout - Page content layout that adds a header and content container
 * Used within the main content area of the Root Layout (SidebarInset)
 */
export function MainLayout({
    children,
    title = "Dashboard",
    breadcrumbs = [],
    heroSection
}: MainLayoutProps) {
    return (
        <>
            <header className="sticky top-0 z-40 flex h-16 items-center border-b border-border bg-background/95 backdrop-blur-sm px-4 transition-[width,height] ease-linear">
                <div className="flex items-center gap-2 mr-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="h-4 mr-2" />

                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((item, index) => (
                                <BreadcrumbItem key={index} className="hidden md:block">
                                    {item.href ? (
                                        <BreadcrumbLink href={item.href}>
                                            {item.title}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                    )}
                                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                </BreadcrumbItem>
                            ))}
                            {breadcrumbs.length === 0 && (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="ml-auto flex items-center gap-4">
                    <div className="relative hidden md:block w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-full bg-background pl-8 md:w-60 lg:w-72"
                        />
                    </div>

                    <Button size="icon" variant="ghost" className="relative">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                            3
                        </span>
                    </Button>
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <Avatar className="h-8 w-8 border border-border">
                        <span className="font-medium text-sm">U</span>
                    </Avatar>
                </div>
            </header>

            {heroSection && (
                <div className="bg-sidebar-background text-sidebar-foreground">
                    {heroSection}
                </div>
            )}

            <div className="flex-1">
                <div className="container py-6 max-w-full px-6">
                    {children}
                </div>
            </div>
        </>
    );
}
