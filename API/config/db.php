<?php
$host = "localhost";
$db_name = "comweb";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $db_name);

if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion à la base de données"]);
    exit();
}
