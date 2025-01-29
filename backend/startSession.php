<?php
require __DIR__ . '/includes/_functions.php';
require __DIR__ . '/includes/_config.php';

// Configure CORS and session
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_set_cookie_params([
    'lifetime' => 3600,
    'path' => '/',
    'domain' => 'localhost',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

// Generate new token only if none exists or regenerate for each request
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Return token and session ID
echo json_encode([
    'csrf_token' => $_SESSION['csrf_token'],
    'session_id' => session_id()
]);