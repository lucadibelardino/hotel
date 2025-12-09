import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Hotel Luca</h3>
                    <p>Località Sa Cruxi<br />08040 Girasole (OG)</p>
                    <p>Tel: +39 0782 668956</p>
                    <p>Email: info@hotelluca.it</p>
                </div>
                <div className="footer-section">
                    <h3>Link Rapidi</h3>
                    <ul>
                        <li><a href="#camere">Camere</a></li>
                        <li><a href="#servizi">Servizi</a></li>
                        <li><a href="#prenota">Prenota</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Seguici</h3>
                    <div className="social-links">
                        <span>Facebook</span>
                        <span>Instagram</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Hotel Luca. Replica sviluppata per scopi dimostrativi.</p>
            </div>
        </footer>
    );
};

export default Footer;
