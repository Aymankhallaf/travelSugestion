<?php
require_once __DIR__ . '/includes/_functions.php';
session_start();
generateToken();
header('Content-Type: application/json');
echo json_encode(['token' => $_SESSION['token']]);