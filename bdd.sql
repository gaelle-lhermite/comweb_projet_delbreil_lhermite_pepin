
-- Création des tables
CREATE TABLE utilisateurs (
    id_utilisateur VARCHAR(30) NOT NULL PRIMARY KEY,
    mdp_utilisateur VARCHAR(30) NOT NULL, 
    role_utilisateur VARCHAR(15) NOT NULL
);

CREATE TABLE eleves (
    id_eleve INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_eleve VARCHAR(30),
    prenom_eleve VARCHAR(30),
    classe_eleve VARCHAR(15),
    id_utilisateur VARCHAR(30),
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur)
);

CREATE TABLE professeurs (
    id_prof INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_prof VARCHAR(30),
    prenom_prof VARCHAR(30),
    id_utilisateur VARCHAR(30),
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur)
);

CREATE TABLE matieres (
    id_matiere INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_matiere VARCHAR(50)
);

CREATE TABLE notes (
    id_note INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    valeur_note DECIMAL(4,2),
    id_matiere INT,
    id_eleve INT,
    id_prof INT, 
    FOREIGN KEY (id_matiere) REFERENCES matieres(id_matiere),
    FOREIGN KEY (id_eleve) REFERENCES eleves(id_eleve), 
    FOREIGN KEY (id_prof) REFERENCES professeurs(id_prof)
);

-- Insertion des utilisateurs
INSERT INTO utilisateurs (id_utilisateur, mdp_utilisateur, role_utilisateur)
VALUES ('ldelbreil', 'azerty123','eleve'), ('lopepin', 'mdpsecurise','eleve');

-- Insertion des élèves
INSERT INTO eleves (nom_eleve, prenom_eleve, classe_eleve, id_utilisateur)
VALUES ('Delbreil', 'Laura', '1A', 'ldelbreil'), ('Pepin', 'Lou', '1A', 'lopepin');

-- Insertion des professeurs
INSERT INTO professeurs (nom_prof, prenom_prof, id_utilisateur)
VALUES ('Placin', 'Frédéric', 'fplacin');

-- Insertion des matières
INSERT INTO matieres (nom_matiere)
VALUES ('Maths'), ('Français'), ('Histoire');

-- Insertion des notes
INSERT INTO notes (valeur_note, id_matiere, id_eleve, id_prof)
VALUES
  (15.50, 1, 'ldelbreil', 'fplacin'),
  (17.00, 1, 'ldelbreil', 'fplacin'),
  (12.00, 2, 'lopepin', 'fplacin'),
  (13.00, 2, 'ldelbreil', 'fplacin'),
  (10.00, 3, 'lopepin', 'fplacin');
