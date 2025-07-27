import React from "react";

import {
  Locale,
  getTranslations,
  formatString,
} from "@/_shared/emails/i18n/translations";

import BaseEmailI18n, { EmailButton } from "./BaseEmailI18n";

interface PasswordResetI18nProps {
  actionUrl: string;
  email: string;
  name?: string;
  locale?: Locale;
}

export const PasswordResetI18n: React.FC<PasswordResetI18nProps> = ({
  actionUrl,
  email,
  name,
  locale = "en",
}) => {
  const t = getTranslations(locale);
  const greeting = name ? `${t.common.greeting}, ${name}` : t.common.greeting;

  const emailWithVariables = formatString(t.passwordReset.description, {
    email,
  });

  return (
    <BaseEmailI18n
      locale={locale}
      previewText={t.passwordReset.previewText}
      title={t.passwordReset.subject}
    >
      <h2>{t.passwordReset.title}</h2>
      <p>{greeting},</p>
      <p>{emailWithVariables}</p>

      <EmailButton
        href={actionUrl}
        text={t.passwordReset.button}
        align="center"
      />

      <p>{t.passwordReset.ignoreText}</p>

      <p className="text-secondary">{t.passwordReset.expiryText}</p>

      <p className="mb-2">
        {t.common.cta.regards}
        <br />
        {t.common.cta.team}
      </p>
    </BaseEmailI18n>
  );
};

export default PasswordResetI18n;
