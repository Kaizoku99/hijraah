import "@/globals.css";
// import "@fontsource/noto-sans-arabic/400.css";
// import "@fontsource/noto-sans-arabic/500.css";
// import "@fontsource/noto-sans-arabic/600.css";
// import "@fontsource/noto-sans-arabic/700.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "@/app/providers";

import type { Metadata, Viewport } from "next";

// Root layout for the entire app. Locale-specific UI and providers are composed in [locale]/layout.tsx.

export const metadata: Metadata = {
  title: {
    default: "Hijraah - Navigate Your Immigration Journey",
    template: "%s | Hijraah",
  },
  metadataBase: new URL("https://hijraah.vercel.app"),
  description:
    "Navigate your immigration journey with AI guidance - Compare immigration policies across countries with intelligent insights",
  keywords: [
    "immigration",
    "visa",
    "comparison",
    "countries",
    "policies",
    "AI guidance",
    "immigration journey",
  ],
  authors: [{ name: "Hijraah Team" }],
  creator: "Hijraah",
  icons: {
    icon: "/Hijraah_logo.png",
    apple: "/Hijraah_logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hijraah.vercel.app",
    title: "Hijraah - Immigration Comparison",
    description:
      "Compare immigration policies across countries with AI-powered insights",
    siteName: "Hijraah",
    images: [
      {
        url: "/Hijraah_logo.png",
        width: 800,
        height: 800,
        alt: "Hijraah Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hijraah - Immigration Comparison",
    description:
      "Compare immigration policies across countries with AI-powered insights",
    creator: "@hijraah",
    images: ["/Hijraah_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#18181b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
