<?php
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/includes/_functions.php';
require __DIR__ . '/includes/_config.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
session_start();

//  debugging code 
// error_log('Session ID   : ' . session_id());
// error_log('Received Token: ' . ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? 'No token received'));
// error_log('Stored Token: ' . ($_SESSION['csrfToken'] ?? 'No token in session'));


// Allow requests from your React app
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-CSRF-Token");
header("Access-Control-Allow-Credentials: true");
header('Content-type: application/json');

// Handle preflight requests first
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(["error" => "Invalid access method"]);
    exit;
}



if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);
    echo json_encode(['error' => "Invalid methode d'access"]);
    exit;
}


if (!isset($_SERVER["HTTP_X_CSRF_TOKEN"]) || $_SERVER["HTTP_X_CSRF_TOKEN"] !== ($_SESSION["csrfToken"] ?? "")) {
    http_response_code(403);
    echo json_encode([
        'error' => 'Invalid CSRF token',
        'debug' => [
            'received' => $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null,
            'expected' => $_SESSION['csrfToken'] ?? null
        ]
    ]);
    exit;
}



// Get the raw POST data
$data = json_decode(file_get_contents('php://input'),  true);

if ($data === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}


// csfr 
if (!isServerOk($globalUrl)) {
    echo json_encode(['error' => 'Server error 1']);
    exit;
}

// echo json_encode(['success' => 'Server is ok']);

$temperature = getCityWeather("paris", date: '2025-02-01'); // Use current date or dynamic date
// Extract data from the request
$activity = ($data['activity']) ?? null;
$traveldate = ($data['traveldate']) ?? null;
$temperature = ($data['temperature']) ?? null;


// Validate the data
if (!$temperature || !$activity || !$traveldate) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}


try {
    // Step 1: Fetch city names based on the activity
    $locationData = getTripadvisorData($activity);
    if ($locationData === null || empty($locationData['data'])) {
        throw new RuntimeException('No locations found for the activity.');
    }

    $results = [];
    foreach ($locationData['data'] as $location) {
        $city = $location['name'];
        $locationId = $location['location_id'];

        // Step 2: Fetch photos for the city using the location ID
        $photos = getTripadvisorPhotos($locationId);

        // Step 3: Fetch temperature for the city
        $temperature = getCityWeather($city, date('Y-m-d')); // Use current date or dynamic date

        // Add the result for this city
        $results[] = [
            'city' => $city,
            'photos' => $photos,
            'temperature' => $temperature,
        ];
    }

    // Return the results
    echo json_encode([
        'status' => 'success',
        'results' => $results,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
