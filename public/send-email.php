<?php
/**
 * Shalom Music Studios - Custom Email Dispatch Gateway
 * 
 * This script handles AJAX/fetch form submissions natively, sanitizes inputs, 
 * formats a premium HTML email, and dispatches it via SMTP/local mail server.
 */

// 1. CORS Headers to allow local testing (e.g., from Vite dev server at http://localhost:5173)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ensure the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Only POST requests are accepted."
    ]);
    exit();
}

// 2. SMTP & Mail Server Configuration
define("RECIPIENT_EMAIL", "info@shalommusic.co.tz");
define("SENDER_EMAIL", "webmaster@shalommusic.co.tz"); // Must match your hosting domain to avoid SPF/spam issues
define("SMTP_ENABLED", false); // Set to true to override local mail server and use external SMTP

// If SMTP_ENABLED is true, populate these credentials
define("SMTP_HOST", "mail.shalommusic.co.tz");
define("SMTP_PORT", 465); // 465 (SSL) or 587 (TLS/STARTTLS)
define("SMTP_USER", "notifications@shalommusic.co.tz");
define("SMTP_PASS", "your-secure-smtp-password-here");
define("SMTP_SECURE", "ssl"); // 'ssl' or 'tls'

// 3. Retrieve and Parse JSON Body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Fallback to standard POST fields if JSON is empty
if (empty($data)) {
    $data = $_POST;
}

// 4. Validate and Sanitize Inputs
$name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($data['phone']) ? strip_tags(trim($data['phone'])) : '';
$service = isset($data['service']) ? strip_tags(trim($data['service'])) : '';
$message = isset($data['message']) ? strip_tags(trim($data['message'])) : '';

if (empty($name) || empty($email) || empty($phone) || empty($service) || empty($message)) {
    http_response_code(400); // Bad Request
    echo json_encode([
        "success" => false,
        "message" => "Please fill out all required fields."
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid email address format."
    ]);
    exit();
}

// Prevent header injection attacks
$name = str_replace(array("\r", "\n"), '', $name);
$email = str_replace(array("\r", "\n"), '', $email);
$phone = str_replace(array("\r", "\n"), '', $phone);
$service = str_replace(array("\r", "\n"), '', $service);

// 5. Compose Premium Symmetrical HTML Email Template
$subject = "New Enquiry: {$service} - from {$name}";

$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>New Shalom Music Enquiry</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #050508;
            color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0c0c0f;
            border: 1px solid #1a1a24;
            padding: 40px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #ff2a74;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo-img {
            height: 90px;
            max-height: 90px;
            width: auto;
            margin-bottom: 15px;
            display: inline-block;
        }
        .title {
            font-size: 18px;
            font-weight: bold;
            color: #ffffff;
            margin-top: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .field-group {
            margin-bottom: 20px;
            border-bottom: 1px solid #14141d;
            padding-bottom: 15px;
        }
        .field-label {
            font-size: 11px;
            color: #ff2a74;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .field-value {
            font-size: 15px;
            color: #e0e0e6;
            line-height: 1.5;
        }
        .message-box {
            background-color: #050508;
            border: 1px solid #14141d;
            padding: 15px;
            color: #b0b0b8;
            font-style: italic;
            white-space: pre-wrap;
            line-height: 1.6;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.35);
            border-top: 1px solid #1a1a24;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <img src='https://shalommusic.co.tz/logo.webp' alt='Shalom Music Studios' class='logo-img' />
            <div class='title'>Session Reservation Inquiry</div>
        </div>
        
        <div class='field-group'>
            <div class='field-label'>Full Name</div>
            <div class='field-value'>".htmlspecialchars($name)."</div>
        </div>
        
        <div class='field-group'>
            <div class='field-label'>Email Address</div>
            <div class='field-value'>".htmlspecialchars($email)."</div>
        </div>
        
        <div class='field-group'>
            <div class='field-label'>Phone Number</div>
            <div class='field-value'>".htmlspecialchars($phone)."</div>
        </div>
        
        <div class='field-group'>
            <div class='field-label'>Service Requested</div>
            <div class='field-value'>".htmlspecialchars($service)."</div>
        </div>
        
        <div class='field-group'>
            <div class='field-label'>Client Message</div>
            <div class='message-box'>".htmlspecialchars($message)."</div>
        </div>
        
        <div class='footer'>
            This inquiry was securely generated via the Shalom Music Studios Portal.<br>
            &copy; ".date("Y")." Shalom Music Studios. All rights reserved.
        </div>
    </div>
</body>
</html>
";

// 6. Send the Email
if (SMTP_ENABLED) {
    // Custom native SMTP Socket implementation
    $success = sendMailSMTP(RECIPIENT_EMAIL, $subject, $email_body, $email);
} else {
    // Standard secure HTML PHP mail()
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Shalom Webmaster <" . SENDER_EMAIL . ">\r\n";
    $headers .= "Reply-To: {$name} <{$email}>\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $success = mail(RECIPIENT_EMAIL, $subject, $email_body, $headers);
}

// 7. Return JSON response
if ($success) {
    echo json_encode([
        "success" => true,
        "message" => "Your inquiry has been successfully transmitted via our secure PHP SMTP gateway!"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "The local mail dispatch subsystem failed to transmit the message."
    ]);
}

/**
 * Socket-based SMTP Client for PHP (Single File Dependency-Free)
 */
function sendMailSMTP($to, $subject, $message, $replyTo) {
    $host = SMTP_HOST;
    $port = SMTP_PORT;
    $username = SMTP_USER;
    $password = SMTP_PASS;
    $secure = strtolower(SMTP_SECURE);

    $socketPrefix = ($secure === 'ssl') ? 'ssl://' : '';
    $socket = fsockopen($socketPrefix . $host, $port, $errno, $errstr, 15);

    if (!$socket) {
        return false;
    }

    function getResponse($socket) {
        $data = "";
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) === " ") {
                break;
            }
        }
        return $data;
    }

    getResponse($socket); // Connection greeting

    fwrite($socket, "EHLO " . $_SERVER['SERVER_NAME'] . "\r\n");
    getResponse($socket);

    if ($secure === 'tls') {
        fwrite($socket, "STARTTLS\r\n");
        getResponse($socket);
        // Upgrade connection to encrypted
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return false;
        }
        fwrite($socket, "EHLO " . $_SERVER['SERVER_NAME'] . "\r\n");
        getResponse($socket);
    }

    fwrite($socket, "AUTH LOGIN\r\n");
    getResponse($socket);

    fwrite($socket, base64_encode($username) . "\r\n");
    getResponse($socket);

    fwrite($socket, base64_encode($password) . "\r\n");
    $authResponse = getResponse($socket);

    if (substr($authResponse, 0, 3) !== "235") {
        fclose($socket);
        return false;
    }

    fwrite($socket, "MAIL FROM: <" . SENDER_EMAIL . ">\r\n");
    getResponse($socket);

    fwrite($socket, "RCPT TO: <" . $to . ">\r\n");
    getResponse($socket);

    fwrite($socket, "DATA\r\n");
    getResponse($socket);

    // Headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "To: <" . $to . ">\r\n";
    $headers .= "From: Shalom Webmaster <" . SENDER_EMAIL . ">\r\n";
    $headers .= "Reply-To: <" . $replyTo . ">\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "\r\n";

    fwrite($socket, $headers . $message . "\r\n.\r\n");
    $dataResponse = getResponse($socket);

    fwrite($socket, "QUIT\r\n");
    fclose($socket);

    return substr($dataResponse, 0, 3) === "250";
}
