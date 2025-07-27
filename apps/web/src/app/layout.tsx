import "@/globals.css";
// import "@fontsource/noto-sans-arabic/400.css";
// import "@fontsource/noto-sans-arabic/500.css";
// import "@fontsource/noto-sans-arabic/600.css";
// import "@fontsource/noto-sans-arabic/700.css";
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Removed getMessages and font imports, as these are handled in [locale]/layout.tsx
// Removed cn utility as it's not used here anymore

import type { Metadata, Viewport } from "next";

// This is the root layout - middleware handles locale redirects
// All the actual UI is in [locale]/layout.tsx

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
  // The getMessages() call and font classNames were incorrect here and have been removed.
  // They are correctly handled in [locale]/layout.tsx.
  const stagewiseConfig = { plugins: [] }; // Define config for StagewiseToolbar

  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
      {/* Render StagewiseToolbar conditionally if config exists */}
      {stagewiseConfig && <StagewiseToolbar config={stagewiseConfig} />}
    </>
  );
}
