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
                    La tua casa al mare in Ogliastra
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Relax, natura e comfort a due passi dalle spiagge più belle.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ marginTop: '2.5rem' }}
                >
                    <a href="/prenota" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>Richiedi Disponibilità</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
