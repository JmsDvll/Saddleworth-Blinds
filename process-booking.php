<?php
/**
 * Booking Form Processing Script
 * Handles form submissions from the book appointment page
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
$SUBJECT_PREFIX = '[Website Booking] ';
$REDIRECT_SUCCESS = '/book-appointment.html?success=1';
$REDIRECT_ERROR = '/book-appointment.html?error=1';

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
    $log_entry = date('Y-m-d H:i:s') . " - Booking Form: " . json_encode($data) . "\n";
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
$windows = isset($_POST['windows']) ? sanitize_input($_POST['windows']) : '';
$timeframe = isset($_POST['timeframe']) ? sanitize_input($_POST['timeframe']) : '';
$contact_time = isset($_POST['contact_time']) ? sanitize_input($_POST['contact_time']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

// Handle blind types (checkboxes)
$blind_types = [];
if (isset($_POST['blind_types']) && is_array($_POST['blind_types'])) {
    foreach ($_POST['blind_types'] as $type) {
        $blind_types[] = sanitize_input($type);
    }
}

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

if (empty($address)) {
    $errors[] = 'Address is required';
}

if (empty($postcode)) {
    $errors[] = 'Postcode is required';
} elseif (!validate_uk_postcode($postcode)) {
    $errors[] = 'Please enter a valid UK postcode';
}

if (empty($windows)) {
    $errors[] = 'Number of windows is required';
}

// Basic spam protection
if (isset($_POST['website']) && !empty($_POST['website'])) {
    // Honeypot field - should be empty
    $errors[] = 'Spam detected';
}

// Check form submission time (should take at least 5 seconds for booking form)
if (isset($_POST['form_start_time'])) {
    $form_start_time = intval($_POST['form_start_time']);
    $current_time = time();
    if (($current_time - $form_start_time) < 5) {
        $errors[] = 'Form submitted too quickly';
    }
}

// If no errors, process the form
if (empty($errors)) {
    // Prepare email content
    $email_subject = $SUBJECT_PREFIX . 'New Appointment Request from ' . $name;
    
    $email_body = "New appointment booking from saddleworthblinds.co.uk\n\n";
    $email_body .= "CUSTOMER DETAILS:\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Phone: " . $phone . "\n";
    $email_body .= "Address: " . $address . "\n";
    $email_body .= "Postcode: " . $postcode . "\n\n";
    
    $email_body .= "PROJECT DETAILS:\n";
    $email_body .= "Number of windows: " . $windows . "\n";
    
    if (!empty($blind_types)) {
        $email_body .= "Interested in: " . implode(', ', $blind_types) . "\n";
    }
    
    if (!empty($timeframe)) {
        $email_body .= "Timeframe: " . $timeframe . "\n";
    }
    
    if (!empty($contact_time)) {
        $email_body .= "Best time to contact: " . $contact_time . "\n";
    }
    
    if (!empty($message)) {
        $email_body .= "\nAdditional message:\n" . $message . "\n";
    }
    
    $email_body .= "\n---\n";
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
            'type' => 'booking',
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'address' => $address,
            'postcode' => $postcode,
            'windows' => $windows,
            'blind_types' => $blind_types,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        
        // Send auto-reply to customer
        $auto_reply_subject = "Your appointment request - Sunshine Blinds Saddleworth";
        $auto_reply_body = "Dear " . $name . ",\n\n";
        $auto_reply_body .= "Thank you for requesting a free home consultation with Sunshine Blinds Saddleworth.\n\n";
        $auto_reply_body .= "We've received your request and will contact you within 24 hours to arrange a convenient appointment time.\n\n";
        $auto_reply_body .= "Your consultation will include:\n";
        $auto_reply_body .= "• Free professional measuring\n";
        $auto_reply_body .= "• Expert advice on the best blinds for your home\n";
        $auto_reply_body .= "• Fabric samples and product demonstrations\n";
        $auto_reply_body .= "• No-obligation quotation\n\n";
        $auto_reply_body .= "If you have any urgent questions, please call us on 01457 597091.\n\n";
        $auto_reply_body .= "We look forward to helping you transform your home!\n\n";
        $auto_reply_body .= "Best regards,\n";
        $auto_reply_body .= "The Sunshine Blinds Saddleworth Team\n\n";
        $auto_reply_body .= "---\n";
        $auto_reply_body .= "Your request details:\n";
        $auto_reply_body .= "Address: " . $address . ", " . $postcode . "\n";
        $auto_reply_body .= "Windows: " . $windows . "\n";
        if (!empty($blind_types)) {
            $auto_reply_body .= "Interested in: " . implode(', ', $blind_types) . "\n";
        }
        
        $auto_reply_headers = "From: " . $FROM_EMAIL . "\r\n";
        $auto_reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        mail($email, $auto_reply_subject, $auto_reply_body, $auto_reply_headers);
        
        // Redirect to success page
        header('Location: ' . $REDIRECT_SUCCESS);
        exit();
    } else {
        $errors[] = 'Failed to send booking request. Please try again or call us directly on 01457 597091.';
    }
}

// If there are errors, redirect back with error message
if (!empty($errors)) {
    $error_message = implode(', ', $errors);
    header('Location: ' . $REDIRECT_ERROR . '&msg=' . urlencode($error_message));
    exit();
}

// Fallback redirect
header('Location: /book-appointment.html');
exit();
?>
