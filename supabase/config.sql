-- Enable the SMTP configuration
update auth.config 
set enable_signup = true,
    mailer_autoconfirm = false,
    smtp_admin_email = 'your-sender-email@yourdomain.com',
    smtp_host = 'smtp.youremailprovider.com',
    smtp_port = 587,
    smtp_user = 'your-smtp-username',
    smtp_pass = 'your-smtp-password',
    smtp_max_frequency = 60; 