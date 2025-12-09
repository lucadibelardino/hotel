import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h1>Hotel L'Ulivo</h1>
                </div>
                <ul className="navbar-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/camere">Camere</Link></li>
                    <li><Link to="/ristorante">Ristorante</Link></li>
                    <li><Link to="/servizi">Servizi</Link></li>
                    <li><a href="#contatti" className="btn-book">Prenota Ora</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
