import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "@/i18n/i18n";

// Define the routing configuration
export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
});

// Create navigation utilities with routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
