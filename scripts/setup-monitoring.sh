#!/bin/bash

# Install monitoring dependencies
npm install @vercel/analytics @vercel/speed-insights

# Create necessary directories
mkdir -p logs
touch logs/error.log
touch logs/access.log

# Set up log rotation
cat > /etc/logrotate.d/hijraah << EOF
/var/log/hijraah/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 640 root root
}
EOF

echo "Monitoring setup complete!"