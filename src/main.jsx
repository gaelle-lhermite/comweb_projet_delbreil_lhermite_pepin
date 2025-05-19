import React from 'react';
import ReactDOM from 'react-dom/client'; // Importer ReactDOM avec createRoot pour React 18 et plus
import App from './App'; // Importer le composant principal App
import './index.css'; // style global si besoin

// Création d'un "root" pour l'application
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);