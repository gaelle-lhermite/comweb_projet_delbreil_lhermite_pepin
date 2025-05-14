<?php
session_start(); 
require_once("../config/db.php");
require_once("../outils/reponse.php");

$data = json_decode(file_get_contents("php://input"), true);

// Vérification des champs requis
if (!isset($data['id_utilisateur']) || !isset($data['mdp_utilisateur'])) {
    send_json(["error" => "Champs manquants"]);
}

// Sécurisation
$id_utilisateur = mysqli_real_escape_string($conn, $data['id_utilisateur']);
$mdp_utilisateur = $data['mdp_utilisateur'];

// Requête
$sql = "SELECT * FROM utilisateurs WHERE id_utilisateur = '$id_utilisateur'";
$result = mysqli_query($conn, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    $utilisateur = mysqli_fetch_assoc($result);

    // Vérification mot de passe (en clair ici)
    if ($mdp_utilisateur === $utilisateur['mdp_utilisateur']) {
        $_SESSION['id_utilisateur'] = $utilisateur['id_utilisateur'];
        $_SESSION['role_utilisateur'] = $utilisateur['role_utilisateur'];

        send_json(["success" => true, "role" => $utilisateur['role_utilisateur']]);
    } else {
        send_json(["error" => "Mot de passe incorrect"]);
    }
} else {
    send_json(["error" => "Utilisateur non trouvé"]);
}
