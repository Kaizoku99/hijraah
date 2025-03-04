import {getRequestConfig} from 'next-intl/server';
import {locales} from '../i18n';

export default getRequestConfig(async ({locale}) => {
  // Load messages from external source
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    messages,
    // You can pass other configuration options here
    timeZone: 'UTC',
    now: new Date(),
  };
}); 