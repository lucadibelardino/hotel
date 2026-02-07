import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, User, MessageSquare, CheckCircle } from 'lucide-react';

const Prenotazione = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulation of sending
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    if (submitted) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '2rem', paddingTop: '100px' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                >
                    <CheckCircle size={80} color="#10b981" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
                    <h1 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>Richiesta Inviata!</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Grazie {formData.name}, ti risponderemo al più presto.</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{ marginTop: '2rem', padding: '1rem 2rem', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                    >
                        Torna alla Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '4rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center', color: 'var(--color-primary-dark)' }}>Richiedi Disponibilità</h1>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
                        Compila il modulo per ricevere un preventivo personalizzato per la tua vacanza.
                    </p>

                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Nome Completo</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="text"
                                            required
                                            style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                            placeholder="Mario Rossi"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Email</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="email"
                                            required
                                            style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                            placeholder="mario@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Telefono</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                    <input
                                        type="tel"
                                        style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                        placeholder="+39 333 1234567"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Check-in (Indicativo)</label>
                                    <div style={{ position: 'relative' }}>
                                        <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="date"
                                            style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                            value={formData.checkIn}
                                            onChange={e => setFormData({ ...formData, checkIn: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Check-out (Indicativo)</label>
                                    <div style={{ position: 'relative' }}>
                                        <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="date"
                                            style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                            value={formData.checkOut}
                                            onChange={e => setFormData({ ...formData, checkOut: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Messaggio</label>
                                <div style={{ position: 'relative' }}>
                                    <MessageSquare size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: '#9ca3af' }} />
                                    <textarea
                                        rows="4"
                                        style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', resize: 'vertical' }}
                                        placeholder="Note particolari, numero di ospiti..."
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    fontSize: '1.1rem',
                                    cursor: 'pointer',
                                    marginTop: '1rem',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)'}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                            >
                                Invia Richiesta
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Prenotazione;
