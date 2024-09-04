<?php
// login.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Get the POST data
$postData = json_decode(file_get_contents('php://input'));

if (!isset($postData->email) || !isset($postData->password)) {
    echo json_encode(['error' => 'Email or password not provided']);
    exit;
}

$email = $postData->email;
$password = $postData->password;

// Connect to the database
$conn = new mysqli('localhost', 'root', '', 'hugot_app');

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Check if the user exists
$stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($user_id, $hashed_password);
    $stmt->fetch();

    // Verify the password
    if (password_verify($password, $hashed_password)) {
        echo json_encode(['user_id' => $user_id]);
    } else {
        echo json_encode(['error' => 'Incorrect password']);
    }
} else {
    echo json_encode(['error' => 'User not found']);
}

$stmt->close();
$conn->close();
?>
