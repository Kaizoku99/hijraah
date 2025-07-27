import { Inter, Roboto_Mono, Noto_Sans_Arabic } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"], // Match weights from existing @fontsource imports
  variable: "--font-noto-sans-arabic",
});
