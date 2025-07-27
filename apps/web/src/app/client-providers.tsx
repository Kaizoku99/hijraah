"use client";

import { NextIntlClientProvider , IntlErrorCode } from "next-intl";
import { ReactNode } from "react";

import { getLocaleConfig } from "@/i18n/i18n";

interface IntlProviderProps {
  locale: string;
  messages: any;
  timeZone?: string;
  now?: Date;
  children: ReactNode;
}

export function IntlClientProvider({
  locale,
  messages,
  timeZone = "UTC",
  now = new Date(),
  children,
}: IntlProviderProps) {
  // Get locale configuration
  const config = getLocaleConfig(locale);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
      now={now}
      onError={(error) => {
        if (error.code === IntlErrorCode.MISSING_MESSAGE) {
          // Only log missing messages in development, not in production
          if (process.env.NODE_ENV === "development") {
            console.debug(`Translation warning: ${error.message}`);
          }
        } else {
          // Log other errors normally
          console.error("Translation error:", error);
        }
      }}
      getMessageFallback={({ namespace, key, error }) => {
        // Return a reasonable fallback based on the key
        const fallback =
          key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");

        // Log in development for debugging
        if (process.env.NODE_ENV === "development") {
          console.debug(
            `Missing translation: ${namespace ? `${namespace}.${key}` : key}`,
            error
          );
        }

        if (namespace) {
          return `${fallback}`;
        }

        return fallback;
      }}
      formats={{
        dateTime: {
          short: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          },
          medium: {
            day: "numeric",
            month: "short",
            year: "numeric",
          },
          long: {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
          full: {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          },
          time: {
            hour: "2-digit",
            minute: "2-digit",
            hour12: config.htmlLang === "en",
          },
        },
        number: {
          precise: {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          },
          compact: {
            notation: "compact",
          },
          percent: {
            style: "percent",
            maximumFractionDigits: 2,
          },
          currency: {
            style: "currency",
            currency: "USD",
          },
        },
        list: {
          enumeration: {
            style: "long",
            type: "conjunction",
          },
          or: {
            style: "long",
            type: "disjunction",
          },
        },
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
