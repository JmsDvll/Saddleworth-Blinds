# GitHub Webhook Setup Instructions

This document provides instructions for setting up the GitHub webhook for automatic deployment of the Saddleworth Blinds website.

## Important Security Note

The `webhook-config.php` file contains your secret webhook token and MUST NOT be committed to GitHub. It has been added to `.gitignore` to prevent accidental commits.

## Prerequisites

1. Access to your GitHub repository settings
2. Access to your web server
3. PHP support on your web server
4. Git installed on your web server

## Step 1: Generate a Secret Token

Generate a secure random token for webhook verification:

```bash
# On Linux/Mac:
openssl rand -hex 32

# Or use any secure random string generator
```

## Step 2: Configure webhook-config.php

1. On your web server, navigate to the website root directory
2. Edit `webhook-config.php` and replace `your-secret-webhook-token-here` with your generated token:

```php
$SECRET_TOKEN = 'your-generated-token-here';
```

## Step 3: Set Up GitHub Webhook

1. Go to your GitHub repository
2. Click on **Settings** → **Webhooks** → **Add webhook**
3. Configure the webhook:
   - **Payload URL**: `https://saddleworthblinds.co.uk/webhook-deploy.php`
   - **Content type**: `application/json`
   - **Secret**: Enter the same token you put in `webhook-config.php`
   - **Which events?**: Select "Just the push event"
   - **Active**: Check the box

4. Click **Add webhook**

## Step 4: Test the Webhook

1. Make a small change to any file
2. Commit and push to the main branch
3. Check the webhook delivery status in GitHub (Settings → Webhooks → Recent Deliveries)
4. Check `deploy.log` on your server for deployment status

## Troubleshooting

### Webhook Returns 401 Unauthorized
- Verify the secret token matches in both GitHub and `webhook-config.php`
- Ensure `webhook-config.php` exists and is readable by PHP

### Webhook Returns 500 Error
- Check PHP error logs
- Verify Git is installed on the server
- Ensure the web server user has permission to run Git commands

### Changes Not Appearing
- Check `deploy.log` for error messages
- Verify the server repository path in `webhook-deploy.php` is correct
- Ensure the web server user has write permissions to the repository

### Security Best Practices

1. **Never commit webhook-config.php** - It contains sensitive information
2. **Use HTTPS** - Ensure your webhook URL uses HTTPS
3. **Rotate tokens regularly** - Change your webhook secret periodically
4. **Monitor logs** - Regularly check `deploy.log` for unauthorized attempts
5. **Restrict file permissions** - Ensure `webhook-config.php` is not publicly accessible

## File Permissions

Ensure proper permissions on your server:

```bash
# Make webhook config readable only by owner
chmod 600 webhook-config.php

# Ensure web server can write logs
chmod 666 deploy.log
chmod 666 form_submissions.log
```

## Deployment Flow

1. Developer pushes to main branch
2. GitHub sends webhook to your server
3. `webhook-deploy.php` verifies the webhook signature
4. If valid, Git pulls the latest changes
5. Changes are immediately live on the website

## Important Files

- `webhook-deploy.php` - Handles incoming webhooks
- `webhook-config.php` - Contains secret token (not in Git)
- `deploy.log` - Logs all deployment attempts
- `.htaccess` - Protects sensitive files from web access

---

For additional help or issues, check the deployment logs or contact your system administrator.