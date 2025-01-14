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
$temperature = strip_tags($data['temperature']) ?? null;
$activity = strip_tags($data['activity'] )?? null;
$traveldate = strip_tags($data['traveldate']) ?? null;

// Validate the data
if (!$temperature || !$activity || !$traveldate) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

var_dump($data);
// var_dump(getCityTemperature("London", "2023-10-15"));

// $locationData = getTripadvisorData("climbing");
// if ($locationData !== null && !empty($locationData['data'])) {
//     $locationId = $locationData['data'][0]['location_id']; // Get the first location's ID
//     $photos = getTripadvisorPhotos($locationId);

//     if ($photos !== null) {
//         $locationData['data'][0]['photos'] = $photos; // Add photos to the location data
//     }

//     var_dump($locationData);
// } else {
//     echo 'Failed to retrieve data.';
// }
