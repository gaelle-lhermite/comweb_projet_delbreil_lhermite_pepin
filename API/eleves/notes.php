<?php
header('Content-Type: application/json');
require_once('../config/db.php');
require_once('auth.php');

$id_eleve = $_GET['id'] ?? null;

if (!$id_eleve) {
  echo json_encode(['error' => 'id_eleve manquant']);
  exit;
}


//requireRole('eleve');

//$eleve_user_id = getUserId(); // Ex: 'ldelbreil'

// Requête avec sous-requête pour récupérer l'id_eleve à partir de l'identifiant utilisateur
$sql = "SELECT e.nom_eleve, e.prenom_eleve, n.valeur_note, m.nom_matiere, p.nom_prof, p.prenom_prof
FROM eleves e
JOIN notes n ON e.id_eleve = n.id_eleve
JOIN matieres m ON n.id_matiere = m.id_matiere
JOIN professeurs p ON n.id_prof = p.id_prof
WHERE e.id_eleve = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id_eleve);
$stmt->execute();
$result = $stmt->get_result();

$notes = [];
while ($row = $result->fetch_assoc()) {
    $notes[] = $row;
}

echo json_encode($notes);