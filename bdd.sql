
-- Création des tables
CREATE TABLE utilisateurs (
    id_utilisateur INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_utilisateur VARCHAR(30) NOT NULL,
    mdp_utilisateur VARCHAR(30) NOT NULL
);

CREATE TABLE eleves (
    id_eleve INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_eleve VARCHAR(30),
    prenom_eleve VARCHAR(30),
    classe_eleve VARCHAR(15),
    age_eleve INT,
    id_utilisateur INT,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur)
);

CREATE TABLE matieres (
    id_matiere INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_matiere VARCHAR(50)
);

CREATE TABLE notes (
    id_note INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    valeur_note DECIMAL(2,2),
    id_matiere INT,
    id_eleve INT,
    FOREIGN KEY (id_matiere) REFERENCES matieres(id_matiere),
    FOREIGN KEY (id_eleve) REFERENCES eleves(id_eleve)
);

-- Insertion des utilisateurs
INSERT INTO utilisateurs (nom_utilisateur, mdp_utilisateur)
VALUES ('alice', 'azerty123'), ('bob', 'mdpsecurise');

-- Insertion des élèves
INSERT INTO eleves (nom_eleve, prenom_eleve, classe_eleve, age_eleve, id_utilisateur)
VALUES ('Dupont', 'Alice', '5A', 14, 1), ('Martin', 'Bob', '5B', 15, 2);

-- Insertion des matières
INSERT INTO matieres (nom_matiere)
VALUES ('Maths'), ('Français'), ('Histoire');

-- Insertion des notes
INSERT INTO notes (valeur_note, id_matiere, id_eleve)
VALUES
  (15.5, 1, 1),
  (17.0, 1, 1),
  (12.0, 2, 1),
  (13.0, 2, 2),
  (10.0, 3, 1);
