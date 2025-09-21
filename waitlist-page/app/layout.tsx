import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { LanguageProvider } from '../contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'هجرة - Hijraah | مستشارك الشخصي للهجرة | Arabic-First Immigration Platform',
  description: 'أول منصة هجرة عربية تقدم استشارات شخصية، تدقيق وثائق، وخارطة طريق مخصصة للمحترفين العرب. انضم لآلاف المحترفين الناجحين.',
  keywords: 'هجرة, immigration, استشارات هجرة, Arabic immigration, visa consultant, document validation, مستشار هجرة',
  authors: [{ name: 'Hijraah Team' }],
  creator: 'Hijraah',
  openGraph: {
    title: 'هجرة - Hijraah | مستشارك الشخصي للهجرة',
    description: 'أول منصة هجرة عربية مع مستشارين محترفين وتدقيق وثائق معتمد',
    url: 'https://www.hijraah.com',
    siteName: 'Hijraah',
    type: 'website',
    locale: 'ar_AE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'هجرة - Hijraah | Arabic-First Immigration Platform',
    description: 'Your personal immigration consultant with Arabic-speaking experts',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scrollbar-none">
      <body className="overflow-x-hidden w-full max-w-full scrollbar-none">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}