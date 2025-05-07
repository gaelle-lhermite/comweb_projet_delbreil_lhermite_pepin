<?php
/*
Lire les infos envoyées depuis le site (id_utilisateur + mdp_utilisateur)

Vérifier si ce compte existe dans bdd

Si oui, vérifier le mot de passe

Si tout okayyyyyyyyy, répondre "ok" avec le rôle (élève ou prof)
*/

session_start(); // session PHP 
require_once("../config/db.php");


require_once("../outils/reponse.php"); // fonction d'envoi de réponse JSON

$data = json_decode(file_get_contents(filename: "php://input"), true); // lecture  données JSON via méthode POST

// Vérification des champs requis (id_utilisateur et mdp_utilisateur)
if (!isset($data['id_utilisateur']) || !isset($data['mdp_utilisateur'])) 
{
    send_json(["error" => "Champs manquants"]); // erreur
}

// Sécurisation entrée 
$id_utilisateur = mysqli_real_escape_string($conn, $data['id_utilisateur']);
$mdp_utilisateur = $data['mdp_utilisateur']; 

// requête SQL 
$sql = "SELECT * FROM utilisateurs WHERE id_utilisateur = '$id_utilisateur'";
$result = mysqli_query($conn, $sql);

// Si un utilisateur est trouvé
if ($result && mysqli_num_rows($result) > 0) 
{
    $utilisateurs = mysqli_fetch_assoc($result);

   
    if (mdp_utilisateur_verify($mdp_utilisateur, $utilisateurs['mdp_utilisateur'])) 
    {  // Vérification mot de passe comparaison avec hash sécurisé)
        $_SESSION['utilisateurs_id'] = $utilisateurs['id'];
        $_SESSION['role'] = $utilisateurs['role'];

        send_json(["success" => true, "role" => $utilisateurs['role']]);
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
