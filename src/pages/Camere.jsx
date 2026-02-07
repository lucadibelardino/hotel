import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { ROOMS_DATA } from '../data/rooms';

const Camere = () => {

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

                <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a1a1a' }}
                    >
                        Gli Ambienti della Casa
                    </motion.h1>
                    <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Scopri gli spazi pensati per il tuo relax. Tre camere da letto spaziose, una zona giorno luminosa e tutto il comfort di una vera casa.
                    </p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', paddingBottom: '4rem' }}>
                    {ROOMS_DATA.map((room, index) => (
                        <motion.div
                            key={room.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ height: '250px', overflow: 'hidden' }}>
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>

                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#1a1a1a' }}>{room.name}</h3>
                                </div>

                                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                    {room.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                                    {room.features.map(f => (
                                        <span key={f} style={{
                                            backgroundColor: '#f3f4f6',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            color: '#4b5563',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            <Check size={14} color="#10b981" /> {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Camere;
