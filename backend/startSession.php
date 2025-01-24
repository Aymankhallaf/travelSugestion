<?php
require __DIR__ . '/includes/_functions.php';
require __DIR__ . '/includes/config.php';
// Allow requests from your React app's origin
header("Access-Control-Allow-Origin: $globalUrl");



// Handle preflight requests (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // No further action needed for preflight requests
}
session_start();
generateToken();
header('Content-Type: application/json');
echo json_encode(['token' => $_SESSION['token']]);