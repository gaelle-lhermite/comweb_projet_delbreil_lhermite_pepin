import React from 'react';
import ReactDOM from 'react-dom/client'; // Importer ReactDOM avec createRoot pour React 18 et plus
import App from './App'; // Importer ton composant principal App
import './index.css'; // (si tu utilises des styles globaux)

// Créer un "root" pour l'application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendre ton application dans l'élément #root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);