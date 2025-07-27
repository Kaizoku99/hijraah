import React from 'react';

import BaseEmail from './BaseSuabaseEmail';

interface PasswordResetProps {
    actionUrl: string;
    email: string;
    name?: string;
}

export const PasswordReset: React.FC<PasswordResetProps> = ({
    actionUrl,
    email,
    name,
}) => {
    const greeting = name ? `Hello, ${name}` : 'Hello';

    return (
        <BaseEmail previewText="Reset your Hijraah password" title="Reset Your Password">
            <h2>Reset Your Password</h2>
            <p>{greeting},</p>
            <p>
                We received a request to reset the password for your Hijraah account
                ({email}). Click the button below to reset it.
            </p>

            <div className="text-center">
                <a href={actionUrl} className="button">
                    Reset Password
                </a>
            </div>

            <p>
                If you did not request a password reset, please ignore this email
                or contact us if you have questions.
            </p>

            <p className="text-secondary">
                This link is only valid for the next 24 hours.
            </p>

            <p className="mb-2">
                Best regards,<br />
                The Hijraah Team
            </p>
        </BaseEmail>
    );
};

export default PasswordReset; 