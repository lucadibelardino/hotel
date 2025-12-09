import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Check if we are on a page with a hero header (Home or Reservation or other specialized pages)
    // Actually, usually we want this effect on pages with a big background image at top.
    // For now, let's apply this logic everywhere, but start transparent only if at top.

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h1>Hotel L'Ulivo</h1>
                </div>
                <ul className="navbar-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/camere">Camere</Link></li>
                    <li><Link to="/ristorante">Ristorante</Link></li>
                    <li><Link to="/servizi">Servizi</Link></li>
                    <li><Link to="/prenota" className="btn-book">Prenota Ora</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
