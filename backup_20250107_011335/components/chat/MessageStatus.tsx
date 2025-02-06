interface MessageStatusProps {
  status: 'sending' | 'sent' | 'error';
}

export function MessageStatus({ status }: MessageStatusProps) {
  const statusConfig = {
    sending: {
      text: 'Sending...',
      className: 'text-gray-500',
    },
    sent: {
      text: 'Sent',
      className: 'text-green-500',
    },
    error: {
      text: 'Failed to send',
      className: 'text-red-500',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`text-xs ${config.className}`}>
      {config.text}
    </div>
  );
} 