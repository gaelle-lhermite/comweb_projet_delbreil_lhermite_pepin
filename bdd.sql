-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 16 mai 2025 à 07:40
-- Version du serveur : 8.0.40
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `COMWEB`
--

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `id_eleve` int NOT NULL,
  `nom_eleve` varchar(30) DEFAULT NULL,
  `prenom_eleve` varchar(30) DEFAULT NULL,
  `classe_eleve` varchar(15) DEFAULT NULL,
  `id_utilisateur` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`id_eleve`, `nom_eleve`, `prenom_eleve`, `classe_eleve`, `id_utilisateur`) VALUES
(1, 'Delbreil', 'Laura', '1A', 'ldelbreil'),
(2, 'Pepin', 'Lou', '1A', 'lopepin');

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

CREATE TABLE `matieres` (
  `id_matiere` int NOT NULL,
  `nom_matiere` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `matieres`
--

INSERT INTO `matieres` (`id_matiere`, `nom_matiere`) VALUES
(1, 'Maths'),
(2, 'Français'),
(3, 'Histoire');

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `id_note` int NOT NULL,
  `valeur_note` decimal(4,2) DEFAULT NULL,
  `id_matiere` int DEFAULT NULL,
  `id_eleve` int DEFAULT NULL,
  `id_prof` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id_note`, `valeur_note`, `id_matiere`, `id_eleve`, `id_prof`) VALUES
(1, 15.50, 1, 1, 1),
(2, 17.00, 1, 1, 1),
(3, 12.00, 2, 2, 1),
(4, 13.00, 2, 1, 1),
(5, 10.00, 3, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `professeurs`
--

CREATE TABLE `professeurs` (
  `id_prof` int NOT NULL,
  `nom_prof` varchar(30) DEFAULT NULL,
  `prenom_prof` varchar(30) DEFAULT NULL,
  `id_utilisateur` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `professeurs`
--

INSERT INTO `professeurs` (`id_prof`, `nom_prof`, `prenom_prof`, `id_utilisateur`) VALUES
(1, 'Placin', 'Frédéric', 'fplacin');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_utilisateur` int NOT NULL,
  `pseudo_utilisateur` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mdp_utilisateur` varchar(30) NOT NULL,
  `role_utilisateur` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `pseudo_utilisateur`, `mdp_utilisateur`, `role_utilisateur`) VALUES
(1, 'fplacin', 'mdp', 'professeur'),
(2, 'ldelbreil', 'azerty123', 'eleve'),
(3, 'lopepin', 'mdpsecurise', 'eleve');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`id_eleve`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`id_matiere`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id_note`),
  ADD KEY `id_matiere` (`id_matiere`),
  ADD KEY `id_eleve` (`id_eleve`),
  ADD KEY `id_prof` (`id_prof`);

--
-- Index pour la table `professeurs`
--
ALTER TABLE `professeurs`
  ADD PRIMARY KEY (`id_prof`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`pseudo_utilisateur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `eleves`
--
ALTER TABLE `eleves`
  MODIFY `id_eleve` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `id_matiere` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `id_note` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `professeurs`
--
ALTER TABLE `professeurs`
  MODIFY `id_prof` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD CONSTRAINT `eleves_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`pseudo_utilisateur`);

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`id_matiere`) REFERENCES `matieres` (`id_matiere`),
  ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`id_eleve`) REFERENCES `eleves` (`id_eleve`),
  ADD CONSTRAINT `notes_ibfk_3` FOREIGN KEY (`id_prof`) REFERENCES `professeurs` (`id_prof`);

--
-- Contraintes pour la table `professeurs`
--
ALTER TABLE `professeurs`
  ADD CONSTRAINT `professeurs_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`pseudo_utilisateur`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
