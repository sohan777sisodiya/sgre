<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capture data from POST request
    $phone = $_POST['phone'] ?? '';
    $password = $_POST['password'] ?? '';

    // Validate inputs
    if (empty($phone) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Phone number and password are required.']);
        exit;
    }

    // Sanitize inputs to prevent security issues
    $phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $password = htmlspecialchars($password, ENT_QUOTES, 'UTF-8');

    // Prepare data to store
    $data = [
        'phone' => $phone,
        'password' => $password, // Storing plain text password (NOT RECOMMENDED for production)
        'timestamp' => date('Y-m-d H:i:s')
    ];

    // Convert data to JSON
    $jsonData = json_encode($data) . "\n";

    // Append the data to a file
    $file = 'users.json';
    if (file_put_contents($file, $jsonData, FILE_APPEND)) {
        echo json_encode(['status' => 'success', 'message' => 'Data successfully stored.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to store data.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
