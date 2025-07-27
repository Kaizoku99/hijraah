import React from "react";

import BaseEmail from "./BaseSuabaseEmail";

interface MagicLinkProps {
  actionUrl: string;
  email: string;
  name?: string;
}

export const MagicLink: React.FC<MagicLinkProps> = ({
  actionUrl,
  email,
  name,
}) => {
  const greeting = name ? `Hello, ${name}` : "Hello";

  return (
    <BaseEmail
      previewText="Sign in to your Hijraah account"
      title="Your Magic Link"
    >
      <h2>Sign In to Hijraah</h2>
      <p>{greeting},</p>
      <p>
        You requested to sign in to Hijraah using a magic link. Click the button
        below to securely sign in to your account.
      </p>

      <div className="text-center">
        <a href={actionUrl} className="button">
          Sign In to Hijraah
        </a>
      </div>

      <p>
        If you didn&apos;t request this login link, you can safely ignore this
        email.
      </p>

      <p className="text-secondary">
        This link will expire in 10 minutes and can only be used once.
      </p>

      <p className="mb-2">
        Thank you,
        <br />
        The Hijraah Team
      </p>
    </BaseEmail>
  );
};

export default MagicLink;
