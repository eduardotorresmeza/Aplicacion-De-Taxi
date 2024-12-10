import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FaUsers, FaTaxi, FaCogs, FaMapSigns, FaHome } from 'react-icons/fa';  
import Usuarios from './components/Usuarios';
import Taxis from './components/Taxis';
import Categorias from './components/Categorias';
import Rutas from './components/Rutas'; 
import Bienvenida from './components/Bienvenida'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import taxiImage from './taxi.jpg';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning mb-4">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand text-dark">
              <img src={taxiImage} alt="Taxi" width="30" height="30" className="d-inline-block align-top" />
              {' '}TaxiPro
            </Link>
            <div className="navbar-nav ml-auto">
              <Link to="/bienvenida" className="nav-link text-dark">
                <FaHome className="mr-2" />
                Bienvenida
              </Link>
              <Link to="/usuarios" className="nav-link text-dark">
                <FaUsers className="mr-2" />
                Usuarios
              </Link>
              <Link to="/taxis" className="nav-link text-dark">
                <FaTaxi className="mr-2" />
                Taxis
              </Link>
              <Link to="/categorias" className="nav-link text-dark">
                <FaCogs className="mr-2" />
                Categorías
              </Link>
              <Link to="/rutas" className="nav-link text-dark">
                <FaMapSigns className="mr-2" />
                Rutas
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/bienvenida" replace />} />
          <Route path="/bienvenida" element={<Bienvenida />} /> { }
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/taxis" element={<Taxis />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/rutas" element={<Rutas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
