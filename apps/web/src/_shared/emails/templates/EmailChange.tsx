import React from "react";

import { BaseEmail, Button } from "../components/BaseEmail";

interface EmailChangeProps {
  actionUrl: string;
  name?: string;
  oldEmail: string;
  newEmail: string;
}

export const EmailChange: React.FC<EmailChangeProps> = ({
  actionUrl,
  name,
  oldEmail,
  newEmail,
}) => {
  const greeting = name ? `Hello, ${name}` : "Hello";

  return (
    <BaseEmail
      title="Confirm Your Email Change"
      previewText="Action required to change your email address on Hijraah"
    >
      <h1
        style={{
          color: "#134e4a",
          fontFamily: "sans-serif",
          fontWeight: 300,
          lineHeight: "1.4",
          margin: 0,
          marginBottom: "30px",
        }}
      >
        Confirm Email Change
      </h1>

      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "14px",
          fontWeight: "normal",
          margin: 0,
          marginBottom: "15px",
        }}
      >
        {greeting},
      </p>

      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "14px",
          fontWeight: "normal",
          margin: 0,
          marginBottom: "15px",
        }}
      >
        We received a request to change the email address associated with your
        Hijraah account from <strong>{oldEmail}</strong> to{" "}
        <strong>{newEmail}</strong>.
      </p>

      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "14px",
          fontWeight: "normal",
          margin: 0,
          marginBottom: "15px",
        }}
      >
        Please click the button below to confirm this change:
      </p>

      <Button text="Confirm Email Change" url={actionUrl} />

      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "14px",
          fontWeight: "normal",
          margin: 0,
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        If you didn&apos;t request this change, please contact us immediately by
        replying to this email or through our support channels.
      </p>

      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "14px",
          fontWeight: "normal",
          margin: 0,
          marginBottom: "15px",
        }}
      >
        This confirmation link will expire in 30 minutes.
      </p>

      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "14px",
          fontWeight: "normal",
          margin: 0,
        }}
      >
        Thanks for using Hijraah,
        <br />
        The Hijraah Team
      </p>
    </BaseEmail>
  );
};

export default EmailChange;
