<?php
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/_functions.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
// header('Content-type: application/json');

// // Allow requests from your React app
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST requests
// header("Access-Control-Allow-Headers: Content-Type"); // Allow JSON content type

// $data = json_decode(file_get_contents('php://input'), true);
// var_dump(value: $data);



$locationData = getTripadvisorData("climbing");
if ($locationData !== null && !empty($locationData['data'])) {
    $locationId = $locationData['data'][0]['location_id']; // Get the first location's ID
    $photos = getTripadvisorPhotos($locationId);

    if ($photos !== null) {
        $locationData['data'][0]['photos'] = $photos; // Add photos to the location data
    }

    var_dump($locationData);
} else {
    echo 'Failed to retrieve data.';
}
