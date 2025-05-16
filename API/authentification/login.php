<?php
// =======================
// CONFIGURATION DES EN-TÊTES
// =======================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// OPTIONS → réponse immédiate (prévol CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// =======================
// LECTURE DU CORPS JSON
// =======================
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// DEBUG (optionnel) : voir ce que PHP reçoit
// file_put_contents("debug.txt", $input); // utile si tu veux loguer le corps

if (!is_array($data) || !isset($data['id_utilisateur']) || !isset($data['mdp_utilisateur'])) {
    echo json_encode(["error" => "Champs manquants"]);
    exit;
}

// =======================
// CONNEXION À LA BDD
// =======================
try {
    $pdo = new PDO(
        "mysql:host=localhost;port=8889;dbname=comweb;charset=utf8",
        "root",
        "root" // ou "" si tu as changé les identifiants MAMP
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Connexion BDD échouée : " . $e->getMessage()]);
    exit;
}

// =======================
// VÉRIFICATION UTILISATEUR
// =======================
$id = $data['id_utilisateur'];
$mdp = $data['mdp_utilisateur'];

$stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE pseudo_utilisateur = ? AND mdp_utilisateur = ?");
$stmt->execute([$id, $mdp]);

if ($stmt->rowCount() === 1) {
    $utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode([
        "success" => true,
        "id_utilisateur" => $utilisateur['pseudo_utilisateur'],
        "role" => $utilisateur['role_utilisateur']
    ]);
} else {
    echo json_encode(["error" => "Identifiants incorrects"]);
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// DEBUG : afficher ce que PHP reçoit
file_put_contents("debug.txt", $input); // Crée un fichier debug.txt dans le même dossier

if (!is_array($data)) {
    echo json_encode(["error" => "JSON invalide", "debug" => $input]);
    exit;
}
