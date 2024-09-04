<?php
// register.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Get the POST data
$postData = json_decode(file_get_contents('php://input'));

if (!isset($postData->username) || !isset($postData->email) || !isset($postData->password)) {
    echo json_encode(['error' => 'Username, email, or password not provided']);
    exit;
}

$username = $postData->username;
$email = $postData->email;
$password = $postData->password;

// Connect to the database
$conn = new mysqli('localhost', 'root', '', 'hugot_app');

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Check if email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['error' => 'Email already in use']);
    $stmt->close();
    $conn->close();
    exit;
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Insert the new user into the database
$stmt = $conn->prepare("INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())");
$stmt->bind_param('sss', $username, $email, $hashed_password);

if ($stmt->execute()) {
    echo json_encode(['message' => 'User registered successfully']);
} else {
    echo json_encode(['error' => 'Failed to register user']);
}

$stmt->close();
$conn->close();
?>
