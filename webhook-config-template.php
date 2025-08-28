<?php
/**
 * Webhook Configuration Template
 * Copy this file to 'webhook-config.php' and update with your actual values
 * DO NOT COMMIT webhook-config.php to GitHub for security reasons
 */

// GitHub Webhook Secret Token
// Generate a secure random string and set this in your GitHub webhook settings
// Example: openssl rand -hex 32
$SECRET_TOKEN = 'YOUR_WEBHOOK_SECRET_TOKEN_HERE';

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Copy this file to webhook-config.php
 * 2. Generate a secure secret token:
 *    - Online: Use a password generator with 64+ characters
 *    - Command line: openssl rand -hex 32
 * 3. Replace 'YOUR_WEBHOOK_SECRET_TOKEN_HERE' with your actual token
 * 4. Set the same token in your GitHub repository webhook settings:
 *    - Go to your repo -> Settings -> Webhooks
 *    - Add webhook with URL: https://saddleworthblinds.co.uk/webhook-deploy.php
 *    - Set Content type: application/json
 *    - Set Secret: [your token here]
 *    - Select events: Just the push event
 * 5. Add webhook-config.php to your .gitignore file
 * 
 * SECURITY NOTE:
 * Never commit the actual webhook-config.php file to your repository.
 * The secret token should remain private and only be known by GitHub and your server.
 */

// Email notifications for deployment (optional)
$NOTIFY_EMAIL = 'admin@saddleworthblinds.co.uk'; // Set to empty string to disable
$NOTIFY_ON_SUCCESS = true;
$NOTIFY_ON_ERROR = true;

// Deployment settings
$ALLOWED_BRANCHES = ['main', 'master']; // Only deploy from these branches
$MAINTENANCE_MODE = false; // Set to true to disable deployments temporarily

?>
