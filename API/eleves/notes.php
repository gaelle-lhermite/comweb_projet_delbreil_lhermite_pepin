<?php
header('Content-Type: application/json');
require_once('../config/db.php');
require_once('../authentification/auth.php');

requireRole('eleve');

$eleve_user_id = getUserId(); // Ex: 'ldelbreil'

// Requête avec sous-requête pour récupérer l'id_eleve à partir de l'identifiant utilisateur
$sql = "SELECT 
            n.valeur_note AS note,
            m.nom_matiere AS cours,
            CONCAT(p.nom_prof, ' ', p.prenom_prof) AS professeur
        FROM notes n
        JOIN matieres m ON n.id_matiere = m.id_matiere
        JOIN professeurs p ON n.id_prof = p.id_prof
        WHERE n.id_eleve = (
            SELECT e.id_eleve 
            FROM eleves e
            WHERE e.id_utilisateur = ?
        )";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $eleve_user_id);
$stmt->execute();
$result = $stmt->get_result();

$notes = [];
while ($row = $result->fetch_assoc()) {
    $notes[] = $row;
}

echo json_encode($notes);
