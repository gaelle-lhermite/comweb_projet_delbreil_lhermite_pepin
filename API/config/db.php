<?php
///
// SCRIPT PHP : Gestion de la connexion à la base de données
///

$host = 'localhost';
$dbname = 'glhermite';     // Nom de la base sur phpMyAdmin
$user = 'glhermite';         // Identifiant Bordeaux INP
$password = 'GaeTrqlmonn?';     // Mdp de la partie PHP

$conn = mysqli_connect($host, $username, $password, $db_name); //Connexion à la BDD


//Si la connexion est un échec, message d'erreur. 
if (!$conn) {
    die(json_encode(["error" => "Erreur de connexion à la base de données"]));
}
?>
