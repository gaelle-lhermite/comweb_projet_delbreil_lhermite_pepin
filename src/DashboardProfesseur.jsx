import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardProfesseur = () => {
  const [professeur, setProfesseur] = useState(null);

  useEffect(() => {
    const utilisateurString = localStorage.getItem("user");
    if (utilisateurString) {
      try {
        const userObj = JSON.parse(utilisateurString);
        setProfesseur(userObj);
      } catch (e) {
        console.error("Erreur de parsing JSON :", e);
      }
    }
  }, []);

  // Exemple statique des élèves (à remplacer par un fetch plus tard)
  const eleves = [
    { nom: 'Alice', note: 15 },
    { nom: 'Bob', note: 13 },
  ];

  if (!professeur) {
    return <p>Chargement...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Bonjour professeur : {professeur.id_utilisateur}</h2>
        <p style={styles.subtitle}>Voici les notes de vos élèves :</p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Élève</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {eleves.map((eleve, index) => (
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
