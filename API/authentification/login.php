<?php
///
// SCRIPT PHP : Gestion de la connexion utilisateur
///

//Configurations pour que la partie frond communique avec le back sans restriction
header("Access-Control-Allow-Origin: *"); //Requêtes avec n'importe quelle origine
header("Access-Control-Allow-Headers: Content-Type"); //Requêtes avec des entêtes 'content-type'
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Requêtes avec des méthodes POST et OPTIONS
header("Content-Type: application/json"); //Réponse est en JSON

// OPTIONS → réponse immédiate
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

///LECTURE DU CORPS DE LA REQUÊTE JSON ///
// Identifiants de connexion // 
$input = file_get_contents("php://input"); //Récupération des données JSON brutes 
$data = json_decode($input, true); // Transformation en tableau associatif PHP

// Vérification que les champs nécessaires sont présents -> sinon erreur "Champs manquants" s'affiche

if (!is_array($data) || !isset($data['id_utilisateur']) || !isset($data['mdp_utilisateur'])) {
    echo json_encode(["error" => "Champs manquants"]);
    exit;
}

///
// CONNEXION A LA BASE DE DONNEES
///
try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=glhermite;charset=utf8",
        "glhermite",
        "GaeTrqlmonn?" 
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Connexion BDD échouée : " . $e->getMessage()]); //Erreur si la connexion avec la BDD n'a pas fonctionné
    exit;
}

///
// VERIFICATION DE L'UTILISATEUR DANS LA BDD
///
$id = $data['id_utilisateur']; //Id_utilisateur étant la clé primaire, on va l'utiliser pour chercher l'utilisateur
$mdp = $data['mdp_utilisateur']; // on veut aussi son mot de passe

$stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE pseudo_utilisateur = ? AND mdp_utilisateur = ?"); //Requête SQL pour avoir le pseudo et le mdp utilisateur
$stmt->execute([$id, $mdp]); //Données entrées dans la requête

if ($stmt->rowCount() === 1) {
    $utilisateur = $stmt->fetch(PDO::FETCH_ASSOC); //Récupération des données de l'utilisateur
    //Si jamais l'utilisateur est trouvé, on récupère son pseudo et son role
    echo json_encode([
        "success" => true,
        "id_utilisateur" => $utilisateur['pseudo_utilisateur'],
        "role" => $utilisateur['role_utilisateur']
    ]);
} else { 
    //Dans le cas où l'utilisateur n'est pas trouvé
    echo json_encode(["error" => "Identifiants incorrects"]);
}

?>
