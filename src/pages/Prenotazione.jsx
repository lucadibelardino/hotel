import React from 'react';
import BookingSearch from '../components/BookingSearch';
import { motion } from 'framer-motion';

const Prenotazione = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div
                style={{
                    position: 'relative',
                    height: '60vh',
                    backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    padding: '0 1rem'
                }}
            >
                {/* Dark overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>

                <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '900px', textAlign: 'center' }}>
                    <motion.h1
                        style={{ fontSize: '3rem', marginBottom: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Prenota la tua vacanza da sogno
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <BookingSearch />
                    </motion.div>
                </div>
            </div>

            <div style={{ flex: 1, padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h2>Perché prenotare direttamente?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                    <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px' }}>
                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Miglior Prezzo Garantito</h3>
                        <p>Prenotando dal nostro sito hai sempre la tariffa più conveniente.</p>
                    </div>
                    <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px' }}>
                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Offerte Esclusive</h3>
                        <p>Accesso a pacchetti e promozioni riservate solo ai nostri ospiti diretti.</p>
                    </div>
                    <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px' }}>
                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Flessibilità</h3>
                        <p>Condizioni di cancellazione più flessibili per venire incontro alle tue esigenze.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prenotazione;
