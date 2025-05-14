<?php
$host = "localhost";
$db_name = "projet_comweb";
$username = "root";
$password = ""; // pas de mot de passe local

$conn = mysqli_connect($host, $username, $password, $db_name);

if (!$conn) {
    die(json_encode(["error" => "Erreur de connexion à la base de données"]));
}
?>
