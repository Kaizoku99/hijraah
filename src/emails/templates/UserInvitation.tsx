import React from 'react';
import BaseEmail from './BaseSuabaseEmail';

interface UserInvitationProps {
    actionUrl: string;
    inviterName: string;
    inviterEmail: string;
    organizationName: string;
    recipientEmail: string;
}

export const UserInvitation: React.FC<UserInvitationProps> = ({
    actionUrl,
    inviterName,
    inviterEmail,
    organizationName,
    recipientEmail,
}) => {
    return (
        <BaseEmail
            previewText={`You've been invited to join ${organizationName}`}
            title={`You've been invited to join ${organizationName}`}
        >
            <h2>You&apos;ve Been Invited</h2>
            <p>Hello,</p>
            <p>
                <strong>{inviterName}</strong> ({inviterEmail}) has invited you
                to join <strong>{organizationName}</strong> on Hijraah.
            </p>

            <div className="text-center">
                <a href={actionUrl} className="button">
                    Accept Invitation
                </a>
            </div>

            <p>
                Hijraah is an immigration platform that simplifies and streamlines
                the immigration process. Once you accept this invitation, you&apos;ll be
                able to access the organization&apos;s immigration services and tools.
            </p>

            <p className="text-secondary">
                This invitation was sent to {recipientEmail}. If you weren&apos;t expecting this
                invitation, you can safely ignore it.
            </p>

            <p className="mb-2">
                We&apos;re excited to have you on board!<br />
                The Hijraah Team
            </p>
        </BaseEmail>
    );
};

export default UserInvitation; 