import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <h2>Un'oasi di pace nel cuore dell'Ogliastra</h2>
                <p>Vivi l'autentica ospitalità sarda a pochi passi dal mare.</p>
                <div className="hero-actions">
                    <a href="#prenota" className="btn btn-primary">Prenota il tuo soggiorno</a>
                    <a href="#scopri" className="btn btn-outline">Scopri L'Ulivo</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
