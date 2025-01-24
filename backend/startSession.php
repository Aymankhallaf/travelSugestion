<?php
require __DIR__ . '/includes/_functions.php';
require __DIR__ . '/includes/_config.php';
session_start();

// Allow requests from your React app's origin
header("Access-Control-Allow-Origin: $globalUrl");
header("Access-Control-Allow-Credentials: true");


generateToken();
header('Content-Type: application/json');
var_dump($_SESSION);
var_dump( session_id());


echo json_encode($_SESSION['token']);