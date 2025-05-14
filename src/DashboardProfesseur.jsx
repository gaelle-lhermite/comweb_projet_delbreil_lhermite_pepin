import React from 'react';

const DashboardProfesseur = () => {
  // Simuler des données (à remplacer plus tard par une API)
  const professeur = {
    prenom: 'Jean',
    nom: 'Martin',
    eleves: [
      { nom: 'Alice', note: 15 },
      { nom: 'Bob', note: 13 },
    ],
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}> {professeur.prenom} {professeur.nom}</h2>
        <p style={styles.subtitle}>Voici les notes de vos élèves :</p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Élève</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {professeur.eleves.map((eleve, index) => (
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
