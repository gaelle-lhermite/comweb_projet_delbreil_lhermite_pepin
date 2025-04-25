<?php
/*
Lire les infos envoyées depuis le site (username + password)

Vérifier si ce compte existe dans bdd

Si oui, vérifier le mot de passe

Si tout okayyyyyyyyy, répondre "ok" avec le rôle (élève ou prof)
*/

session_start(); // session PHP 
require_once("../config/db.php");


require_once("../outils/reponse.php"); // fonction d'envoi de réponse JSON

$data = json_decode(file_get_contents(filename: "php://input"), true); // lecture  données JSON via méthode POST

// Vérification des champs requis (username et password)
if (!isset($data['username']) || !isset($data['password'])) 
{
    send_json(["error" => "Champs manquants"]); // erreur
}

// Sécurisation entrée 
$username = mysqli_real_escape_string($conn, $data['username']);
$password = $data['password']; 

// requête SQL 
$sql = "SELECT * FROM users WHERE username = '$username'";
$result = mysqli_query($conn, $sql);

// Si un utilisateur est trouvé
if ($result && mysqli_num_rows($result) > 0) 
{
    $user = mysqli_fetch_assoc($result);

   
    if (password_verify($password, $user['password'])) 
    {  // Vérification mot de passe comparaison avec hash sécurisé)
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];

        send_json(["success" => true, "role" => $user['role']]);
    }
    else 
    {
        send_json(["error" => "Mot de passe incorrect"]); // Mot de passe incorrect
    }
} 
else 
{
    send_json(["error" => "Utilisateur non trouvé"]); // Aucun utilisateur trouvé
}
