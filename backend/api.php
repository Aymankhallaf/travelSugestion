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



