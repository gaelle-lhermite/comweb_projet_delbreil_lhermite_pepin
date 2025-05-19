<?php
///
// SCRIPT PHP : Gestion de la connexion à la base de données
///

$host = 'localhost';
$dbname = 'glhermite';     // Nom de la base sur phpMyAdmin
$user = 'glhermite';         // Identifiant Bordeaux INP
$password = 'GaeTrqlmonn?';     // Mdp de la partie PHP

$conn = mysqli_connect($host, $user, $password, $dbname, 3306); //Connexion à la BDD


//Si la connexion est un échec, message d'erreur. 
if (!$conn) {
    die(json_encode(["error" => "Erreur de connexion à la base de données"]));
}
?>
