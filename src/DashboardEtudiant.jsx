///
// COMPOSANT DASHBOARDETUDIANT : Ce composant représente le tableau de bord d’un étudiant, il y accède après connexion
// Il récupère l’utilisateur depuis le localStorage et personnalise le contenu en fonction de ses données

// Actuellement il permet d'afficher : un message de bienvenu personnalisé, un calendrier du mois en cours, un aperçu des dernières notes, des informations pratiques, un accés au bulletin de l'élève
// Objectif de développement : relier l'aperçu des dernières notes à notre base de donnée, coordonner le calendrier avec la date actuelle et améliorer l'aspect et les fonctionnalités de la page
///

import React, { useEffect, useState } from 'react'; // Récupération de la bibliothèque React et des hook utilisés dans le composant
import { useNavigate } from 'react-router-dom'; // Hook permettant la navigation entre les pages

// constantes nécessaires à l'affichage du calendrier (ici, uniquement pour le mois de mai)
const daysInMonth = 31; // nombre de jours dans le mois
const currentDay = new Date().getDate(); // récupération de la date actuelle

///
// DÉFINITION DU COMPOSANT DASHBOARD ÉTUDIANT 
///

const DashboardEtudiant = () => {
  const navigate = useNavigate(); // Hook permettant le changement de page
  const [eleve, setEtudiant] = useState(null); // création d'un état React permettant de stocker les informations de l'élève 


  useEffect(() => {
    const utilisateurString = localStorage.getItem("user"); // Récupère l'étudiant dans le localStorage au chargement du composant 

    if (utilisateurString) {
      try {
        const userObj = JSON.parse(utilisateurString); // transforme le JSON en objet JS
        setEtudiant(userObj); // mise à jour de l'état
      } catch (e) {
        console.error("Erreur de parsing JSON :", e);
      }
    }
  }, []); // Ne s'exécute qu'une seule fois

  // Mise en page et affichage de l'interface
  return (
    <div style={styles.container}>  {/* Div principale contenant toute la structure du dashboard*/}
      <div style={styles.dashboard}> {/* Div principale contenant toute la structure du dashboard*/}
        <h2 style={styles.title}>Bonjour : {eleve.id_utilisateur || "utilisateur"}</h2> {/* Message d'accueil personnalisé avec l'ID utilisateur */}

        <div style={styles.grid}>
          <div style={styles.card}> {/* Div permettant l'affichage du calendrier */}
            <h3>Calendrier – Mai 2025</h3>
            <div style={styles.calendar}>
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isToday = day === currentDay;
                return (
                  <div
                    key={day}
                    style={{
                      ...styles.day,
                      backgroundColor: isToday ? '#000' : '#fff',
                      color: isToday ? '#fff' : '#000',
                      border: isToday ? '2px solid #000' : '1px solid #ccc',
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={styles.card}> {/* Div permettant l'affichage des notes récentes, pas de notes car pas relié à l'API */}
            <h3>Dernières notes</h3>
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {(eleve.notes || []).map((n, index) => ( // permet de générer une ligne par élève
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <strong>{n.matiere} :</strong> {n.note}
                </li>
              ))}
              {(eleve.notes || []).length === 0 && <li>Aucune note disponible</li>}
            </ul>
            <button style={styles.button} onClick={() => navigate('/bulletin')}>
              Voir le relevé de notes
            </button>
          </div>

          <div style={styles.card}> {/* Div permettant l'affichage des infos pratiques (factices) */}
            <h3>Informations diverses</h3>
            <p>📌 Prochain contrôle : Mathématiques - 22 mai</p>
            <p>📎 Réunion parents/prof : 28 mai</p>
          </div>
        </div>
      </div>
    </div>
  );
};

///
// STYLE DU COMPOSANT DASHBOARD ÉTUDIANT 
///

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    background: '#f0f0f0',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  dashboard: {
    width: '100%',
    maxWidth: '1300px',
  },
  title: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  card: {
    background: 'white',
    flex: '1 1 30%',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    minWidth: '300px',
    height: 'auto',
  },
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  day: {
    width: '100%',
    padding: '0.5rem',
    textAlign: 'center',
    borderRadius: '4px',
  },
  button: {
    marginTop: '1rem',
    padding: '0.6rem 1rem',
    background: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default DashboardEtudiant;
