# Supabase Setup Guide for Hijraah Waitlist

## Quick Setup (5 minutes)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create account
2. Click "New Project"
3. Choose organization and enter:
   - **Name**: `hijraah-waitlist`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"

### 2. Set Up Database Table

1. Go to SQL Editor in Supabase dashboard
2. Copy and paste the entire contents of `supabase-setup.sql`
3. Click "Run" to execute the SQL
4. Verify the `waitlist` table was created in the Table Editor

### 3. Get API Keys

1. Go to Project Settings → API
2. Copy these values to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Test the Integration

1. Install dependencies:
   ```bash
   cd waitlist-page
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3001](http://localhost:3001)
4. Test the waitlist form with a real email
5. Check Supabase Table Editor to see the entry

## Production Deployment

### Environment Variables

Set these in your hosting platform (Vercel/Netlify):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-google-analytics-id
```

### Security Settings

1. **Row Level Security**: Already enabled in setup script
2. **API Rate Limiting**: Configure in Supabase dashboard
3. **Email Validation**: Built into the form component

## Managing Waitlist Data

### View Signups

1. Go to Supabase Dashboard → Table Editor
2. Select `waitlist` table
3. View all signups with timestamps and metadata

### Export Data

```sql
-- Export to CSV (run in SQL Editor)
SELECT email, created_at, source, metadata 
FROM waitlist 
ORDER BY created_at DESC;
```

### Analytics Query

```sql
-- Daily signup counts
SELECT 
  DATE(created_at) as date,
  COUNT(*) as signups,
  COUNT(*) OVER (ORDER BY DATE(created_at)) as total
FROM waitlist 
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

## Email Integration (Optional)

### Add Confirmation Emails

1. Enable Email Auth in Supabase
2. Configure SMTP settings
3. Create email template
4. Update API to send confirmation

### Mailchimp Integration

```typescript
// Add to API route after Supabase insert
const mailchimp = require('@mailchimp/mailchimp_marketing');

await mailchimp.lists.addListMember(LIST_ID, {
  email_address: email,
  status: 'subscribed',
  tags: ['hijraah-waitlist']
});
```

## Monitoring & Alerts

### Supabase Webhooks

1. Go to Database → Webhooks
2. Create webhook for `waitlist` table
3. Configure Slack/Discord notifications:

```json
{
  "text": "New Hijraah waitlist signup: {{ record.email }}",
  "channel": "#marketing"
}
```

### Real-time Dashboard

```sql
-- Create real-time subscription (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE waitlist;
```

## Troubleshooting

### Common Issues

**"Invalid API key"**
- Check environment variables are set correctly
- Ensure no trailing spaces in keys
- Verify project URL is correct

**"Row Level Security violation"**
- Confirm RLS policies were created
- Check user permissions in Supabase

**"Network error"**
- Verify Supabase project is active
- Check API rate limits
- Ensure correct region/URL

### Support Queries

```sql
-- Check table structure
\d waitlist

-- Count total signups
SELECT COUNT(*) FROM waitlist;

-- Recent signups
SELECT * FROM waitlist ORDER BY created_at DESC LIMIT 10;

-- Check for duplicates
SELECT email, COUNT(*) FROM waitlist GROUP BY email HAVING COUNT(*) > 1;
```

## Data Privacy & GDPR

### User Rights

The setup includes:
- **Right to be forgotten**: Delete user data
- **Data portability**: Export user data
- **Consent tracking**: Metadata includes consent info

### Compliance Commands

```sql
-- Delete user data (GDPR)
DELETE FROM waitlist WHERE email = 'user@example.com';

-- Export user data
SELECT * FROM waitlist WHERE email = 'user@example.com';
```

## Performance Optimization

### Indexes (Already Created)

- `idx_waitlist_email`: Fast email lookups
- `idx_waitlist_created_at`: Fast date queries

### Query Optimization

```sql
-- Efficient pagination
SELECT * FROM waitlist 
ORDER BY created_at DESC 
LIMIT 50 OFFSET 0;

-- Count without loading data
SELECT COUNT(*) FROM waitlist;
```

## Backup & Recovery

### Automated Backups

Supabase automatically backs up your database daily. For additional safety:

1. Set up weekly SQL dumps
2. Export waitlist data regularly
3. Store backups in separate location

### Manual Backup

```sql
-- Export all waitlist data
COPY waitlist TO '/tmp/waitlist_backup.csv' CSV HEADER;
```

---

**Need help?** Contact Supabase support or check their documentation at [supabase.com/docs](https://supabase.com/docs)