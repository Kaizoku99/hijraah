import '../globals.css'
import '@fontsource/noto-sans-arabic/400.css'
import '@fontsource/noto-sans-arabic/500.css'
import '@fontsource/noto-sans-arabic/600.css'
import '@fontsource/noto-sans-arabic/700.css'
import { AppSidebar } from '@/components/app-sidebar'
import { Footer } from '@/components/ui/footer'
import { Providers } from './providers'
import { RootErrorBoundary } from '@/components/root-error-boundary'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Search, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import LanguageSwitcher from '@/components/ui/language-switcher'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useSearchContext } from '@/lib/contexts/search-context'
import { SearchBar } from '@/components/ui/search-bar'
import { NotificationButton } from '@/components/ui/notification-button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Hijraah - Immigration Comparison',
    template: '%s | Hijraah'
  },
  description: 'Compare immigration policies across countries with AI-powered insights',
  keywords: ['immigration', 'visa', 'comparison', 'countries', 'policies'],
  authors: [{ name: 'Hijraah Team' }],
  creator: 'Hijraah',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hijraah.vercel.app',
    title: 'Hijraah - Immigration Comparison',
    description: 'Compare immigration policies across countries with AI-powered insights',
    siteName: 'Hijraah'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hijraah - Immigration Comparison',
    description: 'Compare immigration policies across countries with AI-powered insights',
    creator: '@hijraah'
  },
  robots: {
    index: true,
    follow: true
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' }
  ],
  width: 'device-width',
  initialScale: 1
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head />
      <body
        suppressHydrationWarning
        className={`${inter.className} h-full m-0 p-0 overflow-x-hidden antialiased`}
      >
        <RootErrorBoundary>
          <Providers>
            <SidebarProvider defaultOpen={true}>
              <AppSidebar />
              <SidebarInset className="flex flex-col min-h-screen w-full">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-border bg-background/95 backdrop-blur-sm">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1">
                      <span className="sr-only">Toggle Sidebar</span>
                    </SidebarTrigger>
                    <Separator orientation="vertical" className="shrink-0 bg-border w-[1px] mr-2 h-4" />
                  </div>

                  <div className="ml-auto flex items-center gap-4 px-4">
                    <SearchBar />
                    <NotificationButton />
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </header>
                <main className="flex-1 flex flex-col">
                  {children}
                  <Footer />
                </main>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </Providers>
        </RootErrorBoundary>
      </body>
    </html>
  )
}