import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const [profil, setProfil] = useState('etudiant'); // Valeur par défaut
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification côté frontend
    if (!login || !password) {
      setErreur("Veuillez remplir tous les champs.");
      return;
    }

    const payload = {
      id_utilisateur: login,
      mdp_utilisateur: password,
    };

    try {
      const response = await fetch("http://localhost:8888/comweb_projet/API/authentification/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setErreur(data.error || "Erreur inconnue.");
        return;
      }

      if (data.success) {
        // Stocke TOUTE la réponse utile
        localStorage.setItem("user", JSON.stringify({
        id_utilisateur: data.id_utilisateur,
        role: data.role,
      }));

      // Redirection selon rôle choisi (ou réponse du backend si tu préfères)
      if (profil == 'etudiant') {
        navigate('/DashboardEtudiant');
      } else {
        navigate('/DashboardProfesseur');
      }
    }

    } catch (error) {
      console.error("Erreur de connexion au serveur :", error);
      setErreur("Erreur de connexion au serveur.");
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
        {erreur && <p style={{ color: 'red', textAlign: 'center' }}>{erreur}</p>}
      </form>
    </div>
  );
}

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