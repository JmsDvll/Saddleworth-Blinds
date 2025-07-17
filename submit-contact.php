<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contact.html');
    exit;
}

// Include session initialization
require_once 'init-session.php';

// Include configuration
require_once 'config.php';

// CSRF Protection
if (!isset($_POST['csrf_token']) || !validateCSRFToken($_POST['csrf_token'])) {
    header('Location: /contact.html?error=security');
    exit;
}

// Validate required fields
$required_fields = ['name', 'email'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        $errors[] = "The " . $field . " field is required.";
    }
}

// Validate email
if (!empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Please enter a valid email address.";
}

// Honeypot spam protection
if (!empty($_POST['website'])) {
    // This is likely a bot, silently redirect
    header('Location: /thank-you.html?type=contact');
    exit;
}

// If there are validation errors, redirect back with errors
if (!empty($errors)) {
    $error_message = urlencode(implode(' ', $errors));
    header('Location: /contact.html?error=validation&message=' . $error_message);
    exit;
}

// Sanitize input data
$name = htmlspecialchars(trim($_POST['name']));
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

// Prepare email content
$subject = getContactEmailSubject($name);

$email_body = "
New contact form message received from the website:

CUSTOMER DETAILS:
Name: $name
Email: $email
Phone: " . ($phone ?: 'Not provided') . "

MESSAGE:
" . ($message ?: 'No message provided') . "

---
This message was submitted from the website contact form.
Submitted on: " . date('d/m/Y H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = array(
    'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
);

// Send email to admin
$mail_sent = mail(ADMIN_EMAIL, $subject, $email_body, implode("\r\n", $headers));

// Send confirmation email to customer
$customer_subject = getContactConfirmationSubject();

$customer_body = "
Dear $name,

Thank you for getting in touch with us! We've received your message and will get back to you as soon as possible.

We aim to respond to all enquiries within a few hours during business hours.

If your enquiry is urgent, please don't hesitate to call us directly on 01457 597091.

Best regards,
The Sunshine Blinds Team
01457 597091
sales@saddleworthblinds.co.uk

---
Sunshine Blinds Saddleworth
Serving Uppermill, Diggle, Delph, Greenfield, Dobcross, Lydgate and all Saddleworth villages
";

$customer_headers = array(
    'From: ' . ADMIN_NAME . ' <' . FROM_EMAIL . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
);

$customer_mail_sent = mail($email, $customer_subject, $customer_body, implode("\r\n", $customer_headers));

// Log the submission (optional)
if (ENABLE_FORM_LOGGING) {
    $log_entry = date('Y-m-d H:i:s') . " - Contact form from $name ($email)\n";
    file_put_contents(LOG_FILE, $log_entry, FILE_APPEND | LOCK_EX);
}

// Redirect to success page
if ($mail_sent) {
    header('Location: /thank-you.html?type=contact');
} else {
    header('Location: /contact.html?error=email');
}
exit;
?>