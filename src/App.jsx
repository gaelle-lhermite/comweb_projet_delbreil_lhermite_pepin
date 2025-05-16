import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import DashboardEtudiant from './DashboardEtudiant';
import DashboardProfesseur from './DashboardProfesseur';
import Bulletin from './Bulletin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DashboardEtudiant" element={<DashboardEtudiant />} />
        <Route path="/DashboardProfesseur" element={<DashboardProfesseur />} />
        <Route path="/bulletin" element={<Bulletin />} />
      </Routes>
    </Router>
  );
}

export default App;
