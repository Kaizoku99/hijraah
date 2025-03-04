import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './i18n';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'UTC',
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        },
        long: {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        },
        time: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }
      },
      number: {
        precise: {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        },
        compact: {
          notation: 'compact'
        },
        percent: {
          style: 'percent',
          maximumFractionDigits: 2
        }
      },
      list: {
        enumeration: {
          style: 'long',
          type: 'conjunction'
        }
      }
    }
  };
}); 