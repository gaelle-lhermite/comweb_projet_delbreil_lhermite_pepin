<?php
$host = 'localhost';
$port = 8888;           // ⚠️ Important : le port MySQL MAMP est 8889
$dbname = 'comweb';     // Nom de ta base (à créer/importer dans phpMyAdmin)
$user = 'root';         // Par défaut sous MAMP
$password = 'root';     // Par défaut sous MAMP

$conn = mysqli_connect($host, $username, $password, $db_name);



if (!$conn) {
    die(json_encode(["error" => "Erreur de connexion à la base de données"]));
}
?>
