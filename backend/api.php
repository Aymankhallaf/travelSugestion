<?php
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/_functions.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
header('Content-type: application/json');

// Allow requests from your React app
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST requests
header("Access-Control-Allow-Headers: Content-Type"); // Allow JSON content type


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(200);
    echo json_encode(['error' => "Invalid methode d'access"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}


// Extract data from the request
$activity = strip_tags($data['activity'] )?? null;
$traveldate = strip_tags($data['traveldate']) ?? null;
$temperature = strip_tags($data['temperature']) ?? null;

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
        $temperature = getCityTemperature($city, date('Y-m-d')); // Use current date or dynamic date

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
