<?php
// Report all errors
error_reporting(E_ALL);
$servername = "cassanovas-rds-db.cx7segmie3ms.eu-west-3.rds.amazonaws.com";
$database = "cassanovas-rds-db";
$username = "root";
$password = "Admin99yu76";

// Create connection

$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection

if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

mysqli_close($conn);

?>