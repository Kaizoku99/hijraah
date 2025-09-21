# Deployment Instructions for Hijraah Waitlist Page

## Quick Deploy to Replace Current Website

### Option 1: Vercel (Recommended - Fastest)

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up with GitHub

2. **Push to GitHub**:
   ```bash
   cd waitlist-page
   git init
   git add .
   git commit -m "Initial Hijraah 2.0 waitlist page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hijraah-waitlist.git
   git push -u origin main
   ```

3. **Deploy on Vercel**:
   - Connect your GitHub repository
   - Choose "hijraah-waitlist" repository
   - Configure domain to point to `www.hijraah.com`
   - Deploy automatically

4. **Custom Domain Setup**:
   - Go to Vercel project settings
   - Add domain: `www.hijraah.com`
   - Configure DNS records as instructed by Vercel

### Option 2: Netlify

1. **Build the static site**:
   ```bash
   cd waitlist-page
   npm install
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `out/` folder to [netlify.com/drop](https://netlify.com/drop)
   - Or connect GitHub repository for auto-deployment

3. **Custom Domain**:
   - Go to Netlify site settings
   - Add custom domain: `www.hijraah.com`
   - Configure DNS as instructed

### Option 3: Static File Upload (Any Host)

1. **Generate static files**:
   ```bash
   cd waitlist-page
   npm install
   npm run build
   ```

2. **Upload files**:
   - Upload entire `out/` folder contents to your web server
   - Ensure `index.html` is the default file

## DNS Configuration

Update your DNS records to point to the new hosting:

### For Vercel:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### For Netlify:
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

## Environment Variables (Production)

Set these in your hosting platform:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Post-Deployment Checklist

### Immediate (Within 24 hours):
- [ ] Verify site loads at www.hijraah.com
- [ ] Test waitlist form submission
- [ ] Check mobile responsiveness
- [ ] Verify analytics tracking
- [ ] Test page load speed

### Week 1:
- [ ] Monitor signup conversion rates
- [ ] Check analytics dashboard
- [ ] Gather user feedback
- [ ] A/B test different headlines
- [ ] Monitor email list growth

### Ongoing:
- [ ] Weekly analytics review
- [ ] Update testimonials and stats
- [ ] Optimize conversion rates
- [ ] Plan launch announcement

## Performance Monitoring

The page includes:
- **Core Web Vitals**: Automatically tracked by Vercel
- **Real User Monitoring**: Via Vercel Speed Insights
- **Custom Analytics**: Waitlist conversions and engagement

## Security Considerations

- HTTPS enabled automatically
- Form validation and sanitization
- Rate limiting ready
- CSRF protection via Next.js

## Backup Strategy

- GitHub repository serves as code backup
- Waitlist emails stored in multiple locations:
  - API endpoint (primary)
  - localStorage (backup)
  - Analytics events (tracking)

## Scaling Preparation

When ready to handle more traffic:
1. Implement database storage (Supabase/PostgreSQL)
2. Add email service integration (Resend/Mailchimp)
3. Enable CDN for global distribution
4. Add server-side analytics

## Launch Marketing

Use these assets from the page:
- Social media graphics (from design elements)
- Email templates (from success messages)
- Press kit materials (from feature descriptions)
- SEO-optimized meta tags (already configured)

## Troubleshooting

**Site not loading**: Check DNS propagation (24-48 hours)
**Form not working**: Verify API endpoints and CORS settings
**Analytics not tracking**: Check environment variables
**Mobile issues**: Test on multiple devices and browsers

## Support Contacts

For technical issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- DNS: Contact your domain registrar

---

**Estimated deployment time**: 15-30 minutes
**Go-live timeline**: Same day (DNS permitting)
**Rollback plan**: Keep current site backup until 48 hours after successful deployment