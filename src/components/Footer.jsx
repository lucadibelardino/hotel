import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Hidden Treasure</h3>
                    <p>Girasole (OG), Sardegna</p>
                    <p>Tel: +39 0782 668956</p>
                    <p>Email: info@hiddentreasure.it</p>
                </div>
                <div className="footer-section">
                    <h3>Menu</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/camere">La Casa</a></li>
                        <li><a href="/servizi">Servizi</a></li>
                        <li><a href="/prenota">Richiedi Info</a></li>
                    </ul>
                </div>
                {/* Removed Social Links if not needed, or keep generic */}
                <div className="footer-section">
                    {/* Empty or privacy */}
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Hidden Treasure Casa Vacanze.</p>
            </div>
        </footer>
    );
};

export default Footer;
