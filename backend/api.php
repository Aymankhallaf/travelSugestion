<?php
require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ );
$dotenv->load();
// header('Content-type: application/json');

// // Allow requests from your React app
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST requests
// header("Access-Control-Allow-Headers: Content-Type"); // Allow JSON content type

// $data = json_decode(file_get_contents('php://input'), true);
// var_dump(value: $data);

if (isset($_ENV['DB_HOST'])) {
    echo $_ENV['DB_HOST'];
} else {
    echo "Environment variable not set.";
}

var_dump ($_ENV);

// $client = new \GuzzleHttp\Client();

// $response = $client->request('GET', 'https://api.content.tripadvisor.com/api/v1/location/search?key=api&searchQuery=swimming&language=en', [
//     'headers' => [
//         'accept' => 'application/json',
//     ],
// ]);

// echo $response->getBody();




if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode(['message' => 'Your POST request was successful']);



  
} else {
    echo json_encode(['message' => 'Your Post request was unsuccessful']);
}
