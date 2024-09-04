<?php
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allows GET, POST, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allows Content-Type and Authorization headers
header('Content-Type: application/json');


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_hugot_line";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
