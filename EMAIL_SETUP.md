# Email Setup Guide for Saddleworth Blinds Website

## Overview
The website now has fully functional contact forms that send emails to your business. This guide explains how to set up and configure the email functionality.

## Email Configuration

### 1. Update Email Addresses
Edit the `config.php` file to set your email addresses:

```php
// Email Configuration
define('ADMIN_EMAIL', 'sales@saddleworthblinds.co.uk');  // Your main business email
define('ADMIN_NAME', 'Sunshine Blinds Saddleworth');
define('FROM_EMAIL', 'noreply@saddleworthblinds.co.uk');  // System email (can be same as admin)
define('FROM_NAME', 'Saddleworth Blinds Website');
```

### 2. Email Addresses You Need to Create

You'll need to create these email addresses in your 20i hosting platform:

1. **sales@saddleworthblinds.co.uk** - Main business email (receives all form submissions)
2. **noreply@saddleworthblinds.co.uk** - System email (sends confirmation emails)

### 3. How to Create Email Addresses in 20i

1. Log into your 20i hosting control panel
2. Go to "Email" section
3. Click "Create Email Account"
4. Create the two email addresses listed above
5. Set up email forwarding if needed (e.g., forward sales@ to your personal email)

## How the Forms Work

### Booking Form (`/book-appointment.html`)
- **Sends to**: sales@saddleworthblinds.co.uk
- **Contains**: Customer details, project requirements, preferred times
- **Customer receives**: Confirmation email with next steps

### Contact Form (`/contact.html`)
- **Sends to**: sales@saddleworthblinds.co.uk
- **Contains**: Name, email, phone, message
- **Customer receives**: Confirmation email

## Security Features

The forms include several security measures:

1. **CSRF Protection** - Prevents cross-site request forgery
2. **Honeypot Fields** - Hidden fields that catch spam bots
3. **Input Validation** - Server-side validation of all fields
4. **Rate Limiting** - Prevents form spam (configurable in config.php)

## Testing the Forms

1. Fill out the booking form at `/book-appointment.html`
2. Fill out the contact form at `/contact.html`
3. Check your sales@saddleworthblinds.co.uk email
4. Check the customer's email for confirmation

## Troubleshooting

### Emails Not Sending
1. Check that the email addresses exist in 20i
2. Verify the email addresses in `config.php`
3. Check your hosting provider's email sending limits
4. Look for error logs in your hosting control panel

### Forms Not Working
1. Ensure PHP is enabled on your hosting
2. Check that all PHP files are uploaded
3. Verify file permissions (should be 644 for .php files)
4. Test with a simple form submission

### Spam Issues
1. The honeypot field should catch most bots
2. Consider adding reCAPTCHA if needed
3. Monitor the form_submissions.log file for suspicious activity

## File Structure

```
├── config.php              # Email and site configuration
├── init-session.php        # Session and CSRF token management
├── submit-booking.php      # Booking form processor
├── submit-contact.php      # Contact form processor
├── book-appointment.html   # Booking form page
├── contact.html           # Contact form page
├── thank-you.html         # Success page
└── form_submissions.log   # Form submission log (auto-created)
```

## Next Steps

1. Create the email addresses in 20i
2. Update the email addresses in `config.php`
3. Test both forms
4. Set up email forwarding if needed
5. Monitor form submissions and respond to leads

## Support

If you need help with the email setup:
1. Check your 20i hosting documentation
2. Contact 20i support for email configuration
3. Test with a simple form submission first

The website is now fully functional and ready to capture leads!