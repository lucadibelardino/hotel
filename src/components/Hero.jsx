import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Un'oasi di pace nel cuore dell'Ogliastra
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Vivi l'autentica ospitalità sarda a pochi passi dal mare.
                </motion.p>
                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a href="#prenota" className="btn btn-primary">Prenota il tuo soggiorno</a>
                    <a href="#scopri" className="btn btn-outline">Scopri L'Ulivo</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
