///
// COMPOSANT LOGIN : Ce composant permet aux utilisateurs (professeurs et élèves) de s'identifier via un formulaire (identifiant, mot de passe, rôle).
// D'envoyer des données à un backend php (API REST) et d'envoyer (après analyse de ces données) l'utilisateur sur une page d'accueil spécifique et personnalisée.
///

import React, { useEffect, useState } from 'react';// Récupération de la bibliothèque React et des hook utilisés dans le composant
import { useNavigate } from 'react-router-dom'; // Hook permettant la navigation entre les pages

///
// DÉFINITION DU COMPOSANT LOGIN 
///

function Login() { // Déclaration du composant
  const [login, setLogin] = useState(''); //stockage des informations données par l’utilisateur
  const [password, setPassword] = useState(''); //stockage des informations données par l’utilisateur
  const [erreur, setErreur] = useState(''); // message d'erreur affiché si la saisie ou la connexion échoue
  const [profil, setProfil] = useState(''); // valeur sélectionnée dans la liste déroulante (étudiant ou professeur)
  const navigate = useNavigate(); // permet la redirection vers une autre page

  // fonction de connexion
  const handleSubmit = async (e) => { // fonction appelée au moment de l'envoie du formulaire par l'utilisateur
    e.preventDefault(); // empêche le rechargement de la page au moment de l'envoi

    // boucle qui vérifie que tous les champs sont remplis et si ce n'est pas le cas envoie un message d'erreur et arrête la fonction
    if (!login || !password) {
      setErreur("Saisie incorrecte.");
      return;
    }

    // objet contenant les informations envoyées à l'API pour l'authentification
    const payload = {
      id_utilisateur: login,
      mdp_utilisateur: password,
    };

    //Appel asynchrone à l’API avec une requête POST / URL dépendant du rôle choisis : étudiant ou professeur
    // + Envoi des données et lecture de la réponse JSON
    try {
      const response = await fetch("https://glhermite.zzz.bordeaux-inp.fr/API/authentification/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // boucle permettant de vérifier si le serveur à renvoyer une erreur HTTP ou une erreur côté PHP et d'afficher un message d'erreur en conséquence
      if (!response.ok) {
        setErreur(data.error || "Erreur inconnue.");
        return;
      }

      // Si la connexion réussi, on stocke les données de l'utilisateur dans localStorage pour les utiliser plus tard et ailleurs
      if (data.success) {
        localStorage.setItem("user", JSON.stringify({
        id_utilisateur: data.id_utilisateur,
        role: data.role,
      }));

      // Redirection de l'utilisateur selon le rôle choisi
      if (data.role === 'eleve') {
      navigate('/DashboardEtudiant'); // si élève alors interface élève
    } else if (data.role === 'professeur') {
      navigate('/DashboardProfesseur'); // si professeur alors interface professeur
    } else {
      setErreur("Rôle inconnu : " + data.role); // message d'erreur 
    }
}
    // affichage d'un message d'erreur en cas d'erreur réseau
    } catch (error) {
      console.error("Erreur de connexion au serveur :", error);
      setErreur("Erreur de connexion au serveur.");
    }
  };

  // Mise en page et affichage de l'interface utilisateur
  return (
    <div style={styles.container}> {/* Div principale contenant toute la structure du dashboard*/}
      <form onSubmit={handleSubmit} style={styles.form}> {/* utilisation de handleSubmit à la soumission*/}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '100px' }} /> {/* ajout du logo */}
        </div>
        <h2 style={{ textAlign: 'center' }}>Connexion</h2>

        <select // liste déroulante pour choisir le rôle entre étudiant et professeur
          value={profil}
          onChange={(e) => setProfil(e.target.value)}
          style={styles.input}
        >
          <option value="eleve">Étudiant</option>
          <option value="professeur">Professeur</option>
        </select>

        <input // champ texte pour que l'utilisateur entre son identifiant
          type="text"
          placeholder="Identifiant"
          value={login}
          onChange={(e) => setLogin(e.target.value)} // mise à jour du rôle
          style={styles.input}
        />
        <input // champ texte pour que l'utilisateur entre son mot de passe
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}> {/* Bouton d'envoi du formulaire */}
          Se connecter
        </button>
        {erreur && <p style={{ color: 'red', textAlign: 'center' }}>{erreur}</p>} {/* Message d'erreur */}
      </form>
    </div>
  );
}

///
// STYLE DU COMPOSANT LOGIN 
///

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