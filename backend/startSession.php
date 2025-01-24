<?php
session_start();
generateToken();
header('Content-Type: application/json');
echo json_encode(['token' => $_SESSION['token']]);