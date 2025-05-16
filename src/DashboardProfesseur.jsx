///
// COMPOSANT DASHBOARD PROFESSEUR : Ce composant représente le tableau de bord d’un professeur, il y accède après connexion
// Il récupère l’utilisateur depuis le localStorage et personnalise le contenu en fonction de ses données

// Actuellement il permet d'afficher : un message de bienvenu personnalisé, un liste fictive et statique d'élèves et de leurs notes
// Objectif de développement : relier la liste des élèves et de leurs notes à notre base de donnée et ajouter d'autres fonctionnalités (comme l'ajout de notes par exemple)
///

import React, { useEffect, useState } from 'react';// Récupération de la bibliothèque React et des hook utilisés dans le composant
import { useNavigate } from 'react-router-dom'; // Hook permettant la navigation entre les pages


///
// DÉFINITION DU COMPOSANT DASHBOARD PROFESSEUR 
///

const DashboardProfesseur = () => {
  const [professeur, setProfesseur] = useState(null); // création d'un état React permettant de stocker les informations du professeur

  useEffect(() => {
    const utilisateurString = localStorage.getItem("user"); // Récupère le professeur dans le localStorage au chargement du composant
    if (utilisateurString) {
      try {
        const userObj = JSON.parse(utilisateurString); // transforme le JSON en objet JS
        setProfesseur(userObj); // mise à jour de l'état
      } catch (e) {
        console.error("Erreur de parsing JSON :", e);
      }
    }
  }, []);

  // Exemple statique des élèves, à remplacer par un code de liaison à une base de donnée : BDD - API 
  const eleves = [
    { nom: 'Laura', note: 15 },
    { nom: 'Lou', note: 13 },
  ];

  // Mise en page et affichage de l'interface
  return (
    <div style={styles.container}>  {/* Div principale contenant toute la structure du dashboard*/}
      <div style={styles.card}>
        <h2 style={styles.title}>Bonjour professeur : {professeur.id_utilisateur}</h2>  {/* Message de bienvenu personnalisé en récupérant l'identifiant du professeur*/}
        <p style={styles.subtitle}>Voici les notes de vos élèves :</p>
        <table style={styles.table}>  {/* Tableau de notes, mise en page type html */}
          <thead>
            <tr>
              <th>Élève</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
          
            {eleves.map((eleve, index) => ( // permet de générer une ligne par élève
              <tr key={index}>
                <td>{eleve.nom}</td>
                <td>{eleve.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

///
// STYLE DU COMPOSANT DASHBOARD PROFESSEUR 
///

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    background: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '450px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '1px solid #ccc',
    padding: '0.5rem',
  },
  td: {
    padding: '0.5rem',
  },
};

export default DashboardProfesseur;
