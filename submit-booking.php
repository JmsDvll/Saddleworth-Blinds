<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /book-appointment.html');
    exit;
}

// Include session initialization
require_once 'init-session.php';

// Include configuration
require_once 'config.php';

// CSRF Protection
if (!isset($_POST['csrf_token']) || !validateCSRFToken($_POST['csrf_token'])) {
    header('Location: /book-appointment.html?error=security');
    exit;
}

// Validate required fields
$required_fields = ['firstName', 'lastName', 'email', 'phone', 'address', 'postcode', 'privacy'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        $errors[] = "The " . str_replace(['firstName', 'lastName'], ['first name', 'last name'], $field) . " field is required.";
    }
}

// Validate email
if (!empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Please enter a valid email address.";
}

// Validate phone number (basic UK format)
if (!empty($_POST['phone'])) {
    $phone = preg_replace('/[^0-9+]/', '', $_POST['phone']);
    if (strlen($phone) < 10) {
        $errors[] = "Please enter a valid phone number.";
    }
}

// Validate postcode (basic UK format)
if (!empty($_POST['postcode'])) {
    $postcode = strtoupper(trim($_POST['postcode']));
    if (!preg_match('/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/', $postcode)) {
        $errors[] = "Please enter a valid UK postcode.";
    }
}

// Check privacy agreement
if (empty($_POST['privacy']) || $_POST['privacy'] !== 'agreed') {
    $errors[] = "You must agree to the privacy policy to continue.";
}

// Honeypot spam protection
if (!empty($_POST['website'])) {
    // This is likely a bot, silently redirect
    header('Location: /thank-you.html?type=booking');
    exit;
}

// If there are validation errors, redirect back with errors
if (!empty($errors)) {
    $error_message = urlencode(implode(' ', $errors));
    header('Location: /book-appointment.html?error=validation&message=' . $error_message);
    exit;
}

// Sanitize input data
$firstName = htmlspecialchars(trim($_POST['firstName']));
$lastName = htmlspecialchars(trim($_POST['lastName']));
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($_POST['phone']));
$address = htmlspecialchars(trim($_POST['address']));
$postcode = strtoupper(trim($_POST['postcode']));
$blindType = htmlspecialchars(trim($_POST['blindType'] ?? ''));
$rooms = htmlspecialchars(trim($_POST['rooms'] ?? ''));
$timeframe = htmlspecialchars(trim($_POST['timeframe'] ?? ''));
$budget = htmlspecialchars(trim($_POST['budget'] ?? ''));
$preferredTime = isset($_POST['preferredTime']) ? $_POST['preferredTime'] : [];
$message = htmlspecialchars(trim($_POST['message'] ?? ''));
$marketing = isset($_POST['marketing']) ? 'Yes' : 'No';

// Prepare email content
$subject = getBookingEmailSubject($firstName, $lastName, $postcode);

$email_body = "
New blind quote request received from the website:

CUSTOMER DETAILS:
Name: $firstName $lastName
Email: $email
Phone: $phone
Address: $address
Postcode: $postcode

PROJECT DETAILS:
Blind Type: " . ($blindType ?: 'Not specified') . "
Number of Windows: " . ($rooms ?: 'Not specified') . "
Timeframe: " . ($timeframe ?: 'Not specified') . "
Budget: " . ($budget ?: 'Not specified') . "

Preferred Times: " . (empty($preferredTime) ? 'Not specified' : implode(', ', $preferredTime)) . "

Additional Message:
" . ($message ?: 'No additional message') . "

Marketing Opt-in: $marketing

---
This enquiry was submitted from the website contact form.
Submitted on: " . date('d/m/Y H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = array(
    'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $firstName . ' ' . $lastName . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
);

// Send email to admin
$mail_sent = mail(ADMIN_EMAIL, $subject, $email_body, implode("\r\n", $headers));

// Send confirmation email to customer
$customer_subject = getCustomerConfirmationSubject();

$customer_body = "
Dear $firstName,

Thank you for your blind quote request! We've received your enquiry and will be in touch very soon to arrange your free home consultation.

Here's what happens next:

1. We'll call you within the next few hours to arrange a convenient time
2. One of our experts will visit your home to measure up and show you samples
3. You'll receive a detailed, no-obligation quote
4. If you're happy, we'll arrange professional fitting

Your Details:
Name: $firstName $lastName
Address: $address, $postcode
Phone: $phone

If you have any questions in the meantime, please don't hesitate to call us on 01457 597091.

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
    $log_entry = date('Y-m-d H:i:s') . " - Quote request from $firstName $lastName ($email) - $postcode\n";
    file_put_contents(LOG_FILE, $log_entry, FILE_APPEND | LOCK_EX);
}

// Redirect to success page
if ($mail_sent) {
    header('Location: /thank-you.html?type=booking');
} else {
    header('Location: /book-appointment.html?error=email');
}
exit;
?>