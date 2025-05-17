<?php
///
// SCRIPT PHP : Récupération des notes d'un élève
///

header('Content-Type: application/json');//Réponse est en JSON
require_once('../config/db.php');//Inclusion du fichier avec les informations de connexion à la BDD

///
// RÉCUPÉRATION DE L’ID DE L’ÉLÈVE DEPUIS L’URL (paramètre GET)
///
$id_eleve = $_GET['id'] ?? null; //si il il n'y a pas de paramètre id dans l'url, $id_eleve est null

//Vérification de la présence de l'ID
if (!$id_eleve) {
  echo json_encode(['error' => 'id_eleve manquant']); //Erreur si l'ID est manquant
  exit;
}


///
// REQUÊTE SQL POUR RÉCUPÉRER LES NOTES D’UN ÉLÈVE
///
// La requête récupère : nom/prénom de l’élève, valeur des notes, matière concernée, et professeur associé

$sql = "SELECT e.nom_eleve, e.prenom_eleve, n.valeur_note, m.nom_matiere, p.nom_prof, p.prenom_prof
FROM eleves e
JOIN notes n ON e.id_eleve = n.id_eleve
JOIN matieres m ON n.id_matiere = m.id_matiere
JOIN professeurs p ON n.id_prof = p.id_prof
WHERE e.id_eleve = ?";

//Préparation de la requête
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_eleve); //parce que le paramètre est un int
$stmt->execute(); //Exécution de la requête
$result = $stmt->get_result(); //Récupération des résultats

//Ajout des notes trouvés dans un tableau
$notes = [];
while ($row = $result->fetch_assoc()) {
    $notes[] = $row;
}

//Envoi des informations sous le format JSON
echo json_encode($notes);

?>