///
// COMPOSANT APP : MISE EN PLACE DE LA STRUCTURE DE NAVIGATION ENTRE TOUS LES COMPOSANTS
///

import React from 'react'; // Récupération de la bibliothèque React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Récupère élements Router, Routes, Route : permet la navigation sur le site sans rechargement des pages

// Autres composants utilisés
import Login from './Login'; // Page de connexion
import DashboardEtudiant from './DashboardEtudiant'; // Interface Étudiants
import DashboardProfesseur from './DashboardProfesseur'; // Interface Professeurs
import Bulletin from './Bulletin'; // Affichage du bulletin scolaire depuis la page Étudiant

// FONCTION PRINCIPALE ///
function App() {
  return (
    <Router> {/* Mise en place du système de routage qui encapsule toute la fonction */}
      <Routes> {/* regroupe toutes les routes de navigation du site, chaque route correspond à une page spécifique */}
        <Route path="/" element={<Login />} /> {/* Page de connexion, route par défault */}
        <Route path="/DashboardEtudiant" element={<DashboardEtudiant />} /> {/* vers interface étudiant */}
        <Route path="/DashboardProfesseur" element={<DashboardProfesseur />} /> {/* vers interface professeurs */}
        <Route path="/bulletin" element={<Bulletin />} /> {/* vers page d'affichage du bulletin */}
      </Routes>
    </Router>
  );
}

export default App;