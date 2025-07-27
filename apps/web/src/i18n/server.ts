/**
 * Server-side i18n functionality
 * IMPORTANT: This file should NEVER be imported in client components
 */

import { getMessages as getNextIntlMessages } from "next-intl/server";

import requestConfig from "./request";

export default requestConfig;

export const getMessages = async () => {
  return getNextIntlMessages();
};
