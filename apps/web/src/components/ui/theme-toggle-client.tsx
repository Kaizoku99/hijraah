"use client";

import dynamic from "next/dynamic";

// Create a client-only version of ThemeToggle to prevent hydration mismatches
// Context7 Pattern: Use dynamic import with ssr: false for components with random IDs
const ThemeToggleInternal = dynamic(
  () => import("./theme-toggle").then((mod) => ({ default: mod.ThemeToggle })),
  {
    ssr: false,
    loading: () => (
      <div className="h-9 w-9 rounded-full bg-background border border-border/40 animate-pulse" />
    ),
  }
);

export function ThemeToggle({
  variant = "default",
}: {
  variant?: "default" | "sidebar";
}) {
  return <ThemeToggleInternal variant={variant} />;
}
