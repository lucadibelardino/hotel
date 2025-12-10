import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { ROOMS_DATA } from '../data/rooms';
import { differenceInDays, parseISO, format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Calendar, User, Mail, CreditCard, CheckCircle, Coffee, Clock } from 'lucide-react';

const Prenotazione = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get Params
    const roomId = searchParams.get('roomId');
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');
    const guests = parseInt(searchParams.get('guests') || '2');

    const [room, setRoom] = useState(null);
    const [nights, setNights] = useState(0);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    // Extras State
    const [extras, setExtras] = useState({
        breakfast: false,
        lateCheckout: false
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (roomId) {
            const foundRoom = ROOMS_DATA.find(r => r.id === roomId);
            if (foundRoom) setRoom(foundRoom);
        }
        if (checkInParam && checkOutParam) {
            const d = differenceInDays(parseISO(checkOutParam), parseISO(checkInParam));
            setNights(d > 0 ? d : 0);
        }
    }, [roomId, checkInParam, checkOutParam]);

    // Calculate Totals
    const roomTotal = room ? room.basePrice * nights : 0;
    const breakfastPrice = extras.breakfast ? (15 * guests * nights) : 0;
    const lateCheckoutPrice = extras.lateCheckout ? 30 : 0;
    const grandTotal = roomTotal + breakfastPrice + lateCheckoutPrice;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const bookingPayload = {
                check_in: checkInParam,
                check_out: checkOutParam,
                guests: guests,
                room_type: room ? room.name : roomId,
                total_price: grandTotal,
                extras: extras,
                name: formData.name,
                email: formData.email,
                // store phone in extras or notes since schema doesn't have phone column yet? 
                // Adding to extras JSON for now to avoid schema error if column missing
                status: 'confirmed'
            };

            // Allow phone in extras json
            const finalExtras = { ...extras, phone: formData.phone, notes: formData.notes };
            bookingPayload.extras = finalExtras;

            const { error } = await supabase.from('bookings').insert([bookingPayload]);

            if (error) throw error;

            // Send Email (Fire and forget or await)
            await supabase.functions.invoke('send-booking-email', { body: { record: bookingPayload } });

            setSuccess(true);

        } catch (err) {
            alert('Errore durante la prenotazione: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '2rem' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                >
                    <CheckCircle size={80} color="#10b981" style={{ marginBottom: '1.5rem' }} />
                    <h1 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>Prenotazione Confermata!</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Grazie {formData.name}, ti abbiamo inviato un'email di riepilogo.</p>
                    <button
                        onClick={() => navigate('/')}
                        style={{ marginTop: '2rem', padding: '1rem 2rem', backgroundColor: '#1a1a1a', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                    >
                        Torna alla Home
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!room || !checkInParam || !checkOutParam) {
        return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Parametri mancanti. Torna alla home.</div>;
    }

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '4rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem' }}>

                {/* Left Column: Form & Extras */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Completa la tua prenotazione</h1>

                        {/* Section: Personal Info */}
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                <User size={20} color="#2563eb" /> I tuoi Dati
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Nome Completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        className="luxury-input"
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        className="luxury-input"
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Telefono</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        autoComplete="tel"
                                        className="luxury-input"
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Extras */}
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                <CheckCircle size={20} color="#2563eb" /> Servizi Aggiuntivi
                            </h3>

                            <div
                                style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '1rem', cursor: 'pointer', backgroundColor: extras.breakfast ? '#eff6ff' : 'white', borderColor: extras.breakfast ? '#2563eb' : '#e5e7eb' }}
                                onClick={() => setExtras({ ...extras, breakfast: !extras.breakfast })}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ backgroundColor: '#fed7aa', padding: '8px', borderRadius: '50%' }}><Coffee size={20} color="#c2410c" /></div>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>Colazione a Buffet</div>
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Prodotti freschi locali ogni mattina</div>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: 'bold' }}>+€15<span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>/p/n</span></div>
                                </div>
                            </div>

                            <div
                                style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', backgroundColor: extras.lateCheckout ? '#eff6ff' : 'white', borderColor: extras.lateCheckout ? '#2563eb' : '#e5e7eb' }}
                                onClick={() => setExtras({ ...extras, lateCheckout: !extras.lateCheckout })}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ backgroundColor: '#e9d5ff', padding: '8px', borderRadius: '50%' }}><Clock size={20} color="#7e22ce" /></div>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>Late Check-out</div>
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Goditi la camera fino alle 14:00</div>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: 'bold' }}>+€30</div>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>

                {/* Right Column: Summary Sticky */}
                <div>
                    <div style={{ position: 'sticky', top: '120px' }}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                        >
                            <img src={room.image} alt={room.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{room.name}</h3>
                                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
                                    <span>{nights} notti</span> • <span>{guests} Ospiti</span>
                                </div>

                                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                        <span>Camera</span>
                                        <span>€{roomTotal}</span>
                                    </div>
                                    {extras.breakfast && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#16a34a' }}>
                                            <span>Colazione</span>
                                            <span>€{breakfastPrice}</span>
                                        </div>
                                    )}
                                    {extras.lateCheckout && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#16a34a' }}>
                                            <span>Late Check-out</span>
                                            <span>€{lateCheckoutPrice}</span>
                                        </div>
                                    )}
                                </div>

                                <div style={{ borderTop: '1px solid #eee', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '600' }}>Totale</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>€{grandTotal}</span>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || !formData.name || !formData.email}
                                    style={{
                                        width: '100%',
                                        marginTop: '1.5rem',
                                        padding: '1rem',
                                        backgroundColor: loading ? '#9ca3af' : '#1a1a1a',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    {loading ? 'Elaborazione...' : 'Conferma e Paga'}
                                </button>
                                <p style={{ fontSize: '0.8rem', color: '#999', textAlign: 'center', marginTop: '1rem' }}>
                                    Pagamento sicuro. Nessun addebito immediato.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Prenotazione;
