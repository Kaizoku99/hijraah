import { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import { ReactNode } from "react";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";


export const metadata: Metadata = {
  // Updated title for consolidated structure
  title: "Unified Chat - Hijraah",
  description: "Chat with our AI assistant to get immigration help",
};

export const experimental_ppr = true;

// Note: Renamed from AIChatLayout to UnifiedChatLayout, now adopting source's structure
export default async function UnifiedChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get("sidebar:state")?.value !== "true";

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
