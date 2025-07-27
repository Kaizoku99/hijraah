import React, { useState, useCallback } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Locale } from '@/shared/emails/i18n/translations';

// Import email templates
import PasswordResetI18n from '@/shared/emails/templates/PasswordResetI18n';
// Import other templates as needed...

type EmailType =
    | 'passwordReset'
    | 'emailConfirmation'
    | 'magicLink'
    | 'emailChange'
    | 'userInvitation';

interface UseEmailTemplatesConfig {
    defaultLocale?: Locale;
}

interface PasswordResetProps {
    actionUrl: string;
    email: string;
    name?: string;
}

// Add other email template props here...

type EmailProps = {
    passwordReset: PasswordResetProps;
    // Add other email types here...
    [key: string]: Record<string, any>;
};

interface GenerateEmailOptions<T extends EmailType> {
    locale?: Locale;
    type: T;
    props: EmailProps[T];
}

/**
 * Hook to generate email HTML based on our React templates
 */
export function useEmailTemplates(config: UseEmailTemplatesConfig = {}) {
    const { defaultLocale = 'en' } = config;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Generate email HTML client-side
     */
    const generateEmailHtml = useCallback(<T extends EmailType>(options: GenerateEmailOptions<T>) => {
        const { locale = defaultLocale, type, props } = options;

        try {
            let emailElement: React.ReactElement;

            // Select the correct template based on type
            switch (type) {
                case 'passwordReset':
                    emailElement = (
                        <PasswordResetI18n
                            locale={locale}
                            {...(props as PasswordResetProps)}
                        />
                    );
                    break;

                // Add other cases as needed when implementing other i18n templates

                default:
                    throw new Error(`Unsupported email type: ${type}`);
            }

            // Render the React component to HTML
            return renderToStaticMarkup(emailElement);
        } catch (err) {
            console.error('Error generating email HTML:', err);
            throw err;
        }
    }, [defaultLocale]);

    /**
     * Call the API to generate email HTML server-side
     */
    const generateEmailHtmlAsync = useCallback(async <T extends EmailType>(options: GenerateEmailOptions<T>) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/template`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: options.type,
                    metadata: {
                        ...options.props,
                        locale: options.locale || defaultLocale,
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            return data.html;
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setLoading(false);
            throw err;
        }
    }, [defaultLocale]);

    return {
        generateEmailHtml,
        generateEmailHtmlAsync,
        loading,
        error,
    };
} 