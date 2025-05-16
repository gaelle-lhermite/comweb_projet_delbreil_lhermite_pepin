import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const daysInMonth = 31;
const currentDay = new Date().getDate();

const DashboardEtudiant = () => {
  const navigate = useNavigate();
  const [eleve, setEtudiant] = useState(null);

  useEffect(() => {
    const utilisateurString = localStorage.getItem("user");
    if (utilisateurString) {
      try {
        const userObj = JSON.parse(utilisateurString);
        setEtudiant(userObj);
      } catch (e) {
        console.error("Erreur de parsing JSON :", e);
      }
    }
  }, []);

  if (!eleve) {
    return <p>Chargement...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <h2 style={styles.title}>Bonjour : {eleve.id_utilisateur || "utilisateur"}</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
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

          <div style={styles.card}>
            <h3>Dernières notes</h3>
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {(eleve.notes || []).map((n, index) => (
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

          <div style={styles.card}>
            <h3>Informations diverses</h3>
            <p>📌 Prochain contrôle : Mathématiques - 22 mai</p>
            <p>📎 Réunion parents/prof : 28 mai</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Déplacer le style ici
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
