import './globals.css'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { SidebarWrapper } from '@/components/ui/sidebar/client-wrapper'
import { AuthProvider } from '@/contexts/auth'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import { ErrorBoundary } from '@/components/error-boundary'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <ErrorBoundary
          onError={(error, errorInfo) => {
            // Log error to monitoring service
            console.error('Root error boundary caught error:', error, errorInfo);
          }}
        >
          <Providers>
            <AuthProvider>
              <SidebarProvider>
                <div className="flex min-h-screen">
                  <SidebarWrapper />
                  <main className="flex-1 transition-all duration-300 ease-in-out">
                    <div className="p-6">{children}</div>
                  </main>
                </div>
              </SidebarProvider>
            </AuthProvider>
          </Providers>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  )
}