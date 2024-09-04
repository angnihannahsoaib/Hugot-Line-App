<?php
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allows GET, POST, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allows Content-Type and Authorization headers
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hugot_app";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle GET request - Fetch all hugot lines
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT hl.id, hl.content, hl.created_at, u.username 
            FROM hugot_lines hl 
            JOIN users u ON hl.user_id = u.id 
            ORDER BY hl.created_at DESC";
    $result = $conn->query($sql);

    $hugotLines = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $hugotLines[] = $row;
        }
    }

    echo json_encode($hugotLines);
}

// Handle POST request - Add a new hugot line
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $user_id = $conn->real_escape_string($input['user_id']);
    $content = $conn->real_escape_string($input['content']);

    if (!empty($content) && !empty($user_id)) {
        $sql = "INSERT INTO hugot_lines (user_id, content) VALUES ('$user_id', '$content')";
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Hugot line added successfully']);
        } else {
            echo json_encode(['message' => 'Error: ' . $conn->error]);
        }
    } else {
        echo json_encode(['message' => 'Please provide all required fields']);
    }
}

$conn->close();
?>
