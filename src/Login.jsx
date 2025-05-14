import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [profil, setProfil] = useState('etudiant'); // valeur par défaut
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // ne pas recharger la page

    // vérification des données

    if (login && password) {
      if (profil === 'etudiant') {
        navigate('/dashboard/etudiant');
      } else if (profil === 'professeur') {
        navigate('/dashboard/professeur');
      }
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '100px' }} />
        </div>
        <h2 style={{ textAlign: 'center' }}>Connexion</h2>

        <select
          value={profil}
          onChange={(e) => setProfil(e.target.value)}
          style={styles.input}
        >
          <option value="etudiant">Étudiant</option>
          <option value="professeur">Professeur</option>
        </select>

        <input
          type="text"
          placeholder="Identifiant"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f0f0',
  },
  form: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '300px',
  },
  input: {
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.8rem',
    background: 'black',
    fontSize: '1rem',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Login;
