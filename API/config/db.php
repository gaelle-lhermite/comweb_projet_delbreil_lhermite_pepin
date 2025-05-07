<?php
$host = "localhost";
$db_name = "projet_comweb";
$username = "root";
$password = ""; //pas de password

$conn = mysqli_connect($host, $username, $password, $db_name);


if (!$conn) {
    echo (["error" => "Erreur de connexion à la base de données"]);
    exit();
}
else{
    echo "blablabla";
}