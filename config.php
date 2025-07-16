<?php
// Site Configuration
define('SITE_NAME', 'Sunshine Blinds Saddleworth');
define('SITE_URL', 'https://www.saddleworthblinds.co.uk');

// Email Configuration
define('ADMIN_EMAIL', 'sales@saddleworthblinds.co.uk');
define('ADMIN_NAME', 'Sunshine Blinds Saddleworth');
define('FROM_EMAIL', 'noreply@saddleworthblinds.co.uk');
define('FROM_NAME', 'Saddleworth Blinds Website');

// Contact Information
define('PHONE_NUMBER', '01457 597091');
define('SHOWROOM_ADDRESS', '6 Rochdale Road, Shaw, Oldham OL2 8AD');

// Business Hours
define('BUSINESS_HOURS_WEEKDAY', 'Mon-Fri: 9am-5pm');
define('BUSINESS_HOURS_SATURDAY', 'Saturday: 10am-4pm');
define('BUSINESS_HOURS_SUNDAY', 'Sunday: Closed');

// Service Areas
$SERVICE_AREAS = [
    'Uppermill',
    'Diggle', 
    'Delph',
    'Greenfield',
    'Dobcross',
    'Lydgate'
];

// Form Configuration
define('ENABLE_FORM_LOGGING', true);
define('LOG_FILE', 'form_submissions.log');

// Security Configuration
define('CSRF_TOKEN_EXPIRY', 3600); // 1 hour
define('MAX_SUBMISSIONS_PER_HOUR', 10);

// Email Templates
function getBookingEmailSubject($firstName, $lastName, $postcode) {
    return "New Blind Quote Request - $firstName $lastName from $postcode";
}

function getContactEmailSubject($name) {
    return "New Contact Form Message - $name";
}

function getCustomerConfirmationSubject() {
    return "Thank you for your blind quote request - " . SITE_NAME;
}

function getContactConfirmationSubject() {
    return "Thank you for your message - " . SITE_NAME;
}
?>