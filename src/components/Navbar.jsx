import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h1>Hotel L'Ulivo</h1>
                </div>
                <ul className="navbar-menu">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#camere">Camere</a></li>
                    <li><a href="#ristorante">Ristorante</a></li>
                    <li><a href="#servizi">Servizi</a></li>
                    <li><a href="#contatti" className="btn-book">Prenota Ora</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
