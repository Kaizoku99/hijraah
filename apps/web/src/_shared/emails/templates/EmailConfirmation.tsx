import React from "react";

import BaseEmail from "./BaseSuabaseEmail";

interface EmailConfirmationProps {
  actionUrl: string;
  email: string;
  name?: string;
}

export const EmailConfirmation: React.FC<EmailConfirmationProps> = ({
  actionUrl,
  email,
  name,
}) => {
  const greeting = name ? `Hello, ${name}` : "Hello";

  return (
    <BaseEmail
      previewText="Confirm your Hijraah email address"
      title="Confirm Your Email"
    >
      <h2>Verify Your Email Address</h2>
      <p>{greeting},</p>
      <p>
        Thank you for signing up for Hijraah! Please confirm your email address
        by clicking the button below.
      </p>

      <div className="text-center">
        <a href={actionUrl} className="button">
          Confirm Email Address
        </a>
      </div>

      <p>
        If you didn&apos;t create an account with us, you can safely ignore this
        email.
      </p>

      <p className="text-secondary">
        This confirmation link will expire in 24 hours. If you don&apos;t
        confirm within that time, you&apos;ll need to sign up again.
      </p>

      <p className="mb-2">
        Welcome to Hijraah!
        <br />
        The Hijraah Team
      </p>
    </BaseEmail>
  );
};

export default EmailConfirmation;
