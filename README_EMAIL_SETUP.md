# Email Integration Setup Guide

## Overview
This application uses **Resend** for sending transactional emails. The system automatically sends:
- Confirmation emails to users who submit demo requests
- Notification emails to admins when new requests arrive
- Email tracking for open rates

## Setup Instructions

### 1. Create a Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email address

### 2. Get Your API Key
1. Log into your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Copy your API key

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Resend API key:
   ```
   VITE_RESEND_API_KEY=re_your_actual_api_key_here
   VITE_FROM_EMAIL=noreply@innobiz.io
   VITE_ADMIN_EMAIL=jaricapa@innobiz.io
   ```

### 4. Verify Domain (Optional but Recommended)
For production use, verify your domain in Resend:
1. Go to **Domains** in Resend dashboard
2. Add your domain (e.g., innobiz.io)
3. Add the DNS records provided by Resend
4. Wait for verification (usually 5-10 minutes)

### 5. Enable Real Email Sending
Currently, the app uses simulated email sending. To enable real emails:

1. Open `src/services/emailService.ts`
2. Uncomment the `sendEmailWithResend` function at the bottom
3. Replace the `simulateEmailSend` calls with real API calls:

```typescript
// Replace this:
return simulateEmailSend(request.email, 'Subject', html);

// With this:
return sendEmailWithResend({
  to: request.email,
  subject: 'Subject',
  html: html
});
```

## Email Templates

### Confirmation Email (User)
- **Subject**: "Confirmación de Demo - DataSense"
- **Content**: Branded HTML template with Innobiz AI styling
- **Includes**: Request details, next steps, contact information

### Admin Notification Email
- **Subject**: "Nueva Solicitud de Demo - DataSense"
- **Content**: Request details with direct link to admin dashboard
- **Includes**: Name, email, company, phone, message, timestamp

## Email Tracking

The system tracks:
- **Emails Sent**: Total confirmation emails sent
- **Emails Opened**: Number of emails opened by recipients
- **Open Rate**: Percentage of opened emails

View tracking metrics in the Admin Dashboard > Overview tab.

## Testing

### Test Email Flow
1. Submit a demo request on the landing page
2. Check browser console for email logs
3. Verify email appears in Admin Dashboard > Demo Requests
4. Check email status indicators (mail icon colors)

### Console Output
When emails are sent, you'll see:
```
📧 Sending confirmation email to: user@example.com
✅ Email sent to user@example.com: Confirmación de Demo - DataSense
📧 Sending admin notification to: jaricapa@innobiz.io
✅ Email sent to jaricapa@innobiz.io: Nueva Demo Request: Company Name
```

## Troubleshooting

### Emails Not Sending
- Verify API key is correct in `.env`
- Check Resend dashboard for API usage/errors
- Ensure domain is verified (for production)
- Check browser console for error messages

### Email Tracking Not Working
- Email opens are tracked via pixel
- Some email clients block tracking pixels
- Open rates may be lower than actual opens

## Production Checklist
- [ ] Resend account created
- [ ] API key added to environment variables
- [ ] Domain verified in Resend
- [ ] Real email sending enabled in code
- [ ] Test emails sent successfully
- [ ] Admin notifications working
- [ ] Email tracking verified

## Cost Considerations
- **Free Tier**: 100 emails/day, 3,000/month
- **Paid Plans**: Start at $20/month for 50,000 emails
- Monitor usage in Resend dashboard

## Support
For issues with Resend integration:
- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- Innobiz AI Support: jaricapa@innobiz.io
