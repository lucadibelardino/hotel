import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, Tv, Wind, Coffee, Check } from 'lucide-react';
import { differenceInDays, parseISO, format } from 'date-fns';
import { it } from 'date-fns/locale';

import { ROOMS_DATA } from '../data/rooms';

const Camere = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Parse params
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');
    const guestsParam = parseInt(searchParams.get('guests') || '2');

    const [nights, setNights] = useState(0);

    useEffect(() => {
        if (checkInParam && checkOutParam) {
            try {
                const days = differenceInDays(parseISO(checkOutParam), parseISO(checkInParam));
                setNights(days > 0 ? days : 0);
            } catch (e) {
                console.error("Date error", e);
            }
        }
    }, [checkInParam, checkOutParam]);

    const handleBook = (roomId) => {
        // Pass existing params + selected room to checkout
        const params = new URLSearchParams(searchParams);
        params.set('roomId', roomId);
        navigate(`/prenota?${params.toString()}`);
    };

    // Filter rooms based on capacity (simple mock logic)
    const availableRooms = ROOMS_DATA.filter(r => r.capacity >= guestsParam);

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

                <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a1a1a' }}
                    >
                        Camere Disponibili
                    </motion.h1>
                    {nights > 0 && (
                        <p style={{ color: '#666' }}>
                            Soggiorno di <strong>{nights} notti</strong> per <strong>{guestsParam} ospiti</strong>
                            <br />
                            <span style={{ fontSize: '0.9rem' }}>
                                Dal {format(parseISO(checkInParam), 'd MMMM yyyy', { locale: it })} al {format(parseISO(checkOutParam), 'd MMMM yyyy', { locale: it })}
                            </span>
                        </p>
                    )}
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {availableRooms.map((room, index) => (
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

                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <span style={{ fontSize: '0.9rem', color: '#666' }}>Prezzo totale</span>
                                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2563eb' }}>
                                            €{nights > 0 ? room.basePrice * nights : room.basePrice}
                                        </div>
                                        {nights > 0 && <span style={{ fontSize: '0.8rem', color: '#999' }}>€{room.basePrice}/notte</span>}
                                    </div>

                                    <button
                                        onClick={() => handleBook(room.id)}
                                        style={{
                                            backgroundColor: '#2563eb',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.8rem 1.5rem',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#2563eb'}
                                    >
                                        Prenota Ora
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {availableRooms.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                        <h3>Nessuna camera disponibile per i filtri selezionati.</h3>
                        <p>Prova a modificare date o numero di ospiti.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Camere;
