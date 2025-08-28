<?php
/**
 * Contact Form Processing Script
 * Handles form submissions from the contact page
 * Saddleworth Blinds Website
 */

// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method Not Allowed');
}

// Configuration
$TO_EMAIL = 'sales@saddleworthblinds.co.uk';
$FROM_EMAIL = 'hello@saddleworthblinds.co.uk';
$SUBJECT_PREFIX = '[Website Contact] ';
$REDIRECT_SUCCESS = '/contact.html?success=1';
$REDIRECT_ERROR = '/contact.html?error=1';

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to validate UK postcode
function validate_uk_postcode($postcode) {
    $postcode = strtoupper(str_replace(' ', '', $postcode));
    $pattern = '/^[A-Z]{1,2}[0-9R][0-9A-Z]?[0-9][ABD-HJLNP-UW-Z]{2}$/';
    return preg_match($pattern, $postcode);
}

// Function to log form submissions
function log_submission($data) {
    $log_entry = date('Y-m-d H:i:s') . " - Contact Form: " . json_encode($data) . "\n";
    file_put_contents('form_submissions.log', $log_entry, FILE_APPEND | LOCK_EX);
}

// Initialize variables
$errors = [];
$success = false;

// Get and sanitize form data
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
$address = isset($_POST['address']) ? sanitize_input($_POST['address']) : '';
$postcode = isset($_POST['postcode']) ? sanitize_input($_POST['postcode']) : '';
$subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
$contact_method = isset($_POST['contact_method']) ? sanitize_input($_POST['contact_method']) : '';

// Validation
if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!validate_email($email)) {
    $errors[] = 'Please enter a valid email address';
}

if (empty($phone)) {
    $errors[] = 'Phone number is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

if (!empty($postcode) && !validate_uk_postcode($postcode)) {
    $errors[] = 'Please enter a valid UK postcode';
}

// Basic spam protection
if (isset($_POST['website']) && !empty($_POST['website'])) {
    // Honeypot field - should be empty
    $errors[] = 'Spam detected';
}

// Check form submission time (should take at least 3 seconds)
if (isset($_POST['form_start_time'])) {
    $form_start_time = intval($_POST['form_start_time']);
    $current_time = time();
    if (($current_time - $form_start_time) < 3) {
        $errors[] = 'Form submitted too quickly';
    }
}

// If no errors, process the form
if (empty($errors)) {
    // Prepare email content
    $email_subject = $SUBJECT_PREFIX . ($subject ? $subject : 'New Contact Form Submission');
    
    $email_body = "New contact form submission from saddleworthblinds.co.uk\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Phone: " . $phone . "\n";
    if (!empty($address)) {
        $email_body .= "Address: " . $address . "\n";
    }
    if (!empty($postcode)) {
        $email_body .= "Postcode: " . $postcode . "\n";
    }
    if (!empty($contact_method)) {
        $email_body .= "Preferred Contact: " . $contact_method . "\n";
    }
    $email_body .= "\nMessage:\n" . $message . "\n\n";
    $email_body .= "---\n";
    $email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $email_body .= "User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "\n";
    
    // Email headers
    $headers = "From: " . $FROM_EMAIL . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($TO_EMAIL, $email_subject, $email_body, $headers)) {
        $success = true;
        
        // Log successful submission
        log_submission([
            'type' => 'contact',
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'subject' => $subject,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        
        // Send auto-reply to customer
        $auto_reply_subject = "Thank you for contacting Sunshine Blinds Saddleworth";
        $auto_reply_body = "Dear " . $name . ",\n\n";
        $auto_reply_body .= "Thank you for your enquiry. We've received your message and will get back to you within 24 hours.\n\n";
        $auto_reply_body .= "In the meantime, if you have an urgent query, please don't hesitate to call us on 01457 597091.\n\n";
        $auto_reply_body .= "Best regards,\n";
        $auto_reply_body .= "The Sunshine Blinds Saddleworth Team\n\n";
        $auto_reply_body .= "---\n";
        $auto_reply_body .= "Your message:\n" . $message;
        
        $auto_reply_headers = "From: " . $FROM_EMAIL . "\r\n";
        $auto_reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        mail($email, $auto_reply_subject, $auto_reply_body, $auto_reply_headers);
        
        // Redirect to success page
        header('Location: ' . $REDIRECT_SUCCESS);
        exit();
    } else {
        $errors[] = 'Failed to send message. Please try again or call us directly.';
    }
}

// If there are errors, redirect back with error message
if (!empty($errors)) {
    $error_message = implode(', ', $errors);
    header('Location: ' . $REDIRECT_ERROR . '&msg=' . urlencode($error_message));
    exit();
}

// Fallback redirect
header('Location: /contact.html');
exit();
?>
