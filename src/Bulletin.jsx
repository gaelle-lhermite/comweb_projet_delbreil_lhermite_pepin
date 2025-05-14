import React from 'react';

const Bulletin = () => {
  const notes = [
    { matiere: 'Mathématiques', note: '16', appreciation: 'Bon travail' },
    { matiere: 'Français', note: '13.5', appreciation: 'Doit participer davantage' },
    { matiere: 'Anglais', note: '17', appreciation: 'Excellent' },
    { matiere: 'SVT', note: '15', appreciation: 'Sérieux et appliqué' },
    { matiere: 'Histoire', note: '14', appreciation: 'Bonne compréhension' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.bulletin}>
        <h2 style={{ textAlign: 'center' }}>Relevé de notes – Trimestre 3</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Matière</th>
              <th>Note</th>
              <th>Appréciation</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((n, index) => (
              <tr key={index}>
                <td>{n.matiere}</td>
                <td>{n.note}/20</td>
                <td>{n.appreciation}</td>
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
    background: '#f0f0f0',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },

  bulletin: {
    background: 'white',
    padding: '3rem',
    borderRadius: '8px',
    justifyContent: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '1000px',

  },
  table: {
    width: '100%',
    height:'30vh',
    marginTop: '1.5rem',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ccc',
    padding: '1rem',
    textAlign: 'left',
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #eee',
  },
};

export default Bulletin;
