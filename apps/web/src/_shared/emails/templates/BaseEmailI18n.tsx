import React from "react";

import {
  Locale,
  getTranslations,
  formatString,
} from "@/_shared/emails/i18n/translations";

export interface BaseEmailI18nProps {
  locale?: Locale;
  previewText?: string;
  children: React.ReactNode;
  title?: string;
  footerText?: string;
  direction?: "ltr" | "rtl";
  brandColor?: string;
}

export const BaseEmailI18n: React.FC<BaseEmailI18nProps> = ({
  locale = "en",
  previewText,
  children,
  title,
  footerText,
  direction = locale === "ar" ? "rtl" : "ltr",
  brandColor = "#134e4a",
}) => {
  const t = getTranslations(locale);
  const year = new Date().getFullYear();
  const defaultFooter = formatString(t.common.footer.copyright, { year });

  return (
    <html dir={direction}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>{title}</title>
        {previewText && <meta name="description" content={previewText} />}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Base styles */
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f6f6f6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: ${brandColor};
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
          }
          .button {
            display: inline-block;
            background-color: ${brandColor};
            color: white !important;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #999;
          }
          h1, h2, h3 {
            color: ${brandColor};
          }
          a {
            color: ${brandColor};
          }
          .text-center {
            text-align: center;
          }
          .text-secondary {
            color: #666;
          }
          .mb-4 {
            margin-bottom: 16px;
          }
          .mb-2 {
            margin-bottom: 8px;
          }
          .mt-4 {
            margin-top: 16px;
          }
          
          /* RTL specific styles */
          [dir="rtl"] .content {
            text-align: right;
          }
          
          /* Mobile responsive */
          @media only screen and (max-width: 620px) {
            .container {
              width: 100% !important;
            }
            
            .content, .header {
              padding: 10px !important;
            }
          }
        `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>Hijraah</h1>
          </div>
          <div className="content">{children}</div>
          <div className="footer">
            <p>{footerText || defaultFooter}</p>
            <p>{t.common.footer.automated}</p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default BaseEmailI18n;

// Convenience component for buttons
export const EmailButton: React.FC<{
  href: string;
  text: string;
  fullWidth?: boolean;
  align?: "left" | "center" | "right";
}> = ({ href, text, fullWidth = false, align = "center" }) => {
  return (
    <div className={`text-${align}`} style={{ textAlign: align }}>
      <a
        href={href}
        className="button"
        style={{
          width: fullWidth ? "100%" : "auto",
          display: fullWidth ? "block" : "inline-block",
        }}
      >
        {text}
      </a>
    </div>
  );
};
