import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { LogOut, Check, X, Trash2, Calendar, User } from 'lucide-react';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check Auth
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
            } else {
                setUser(user);
                fetchBookings();
            }
        };
        checkUser();
    }, [navigate]);

    const fetchBookings = async () => {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            alert('Errore nel caricamento delle prenotazioni');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
        } catch (error) {
            alert('Errore aggiornamento stato: ' + error.message);
        }
    };

    const deleteBooking = async (id) => {
        if (!window.confirm('Sei sicuro di voler eliminare questa prenotazione?')) return;

        try {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setBookings(bookings.filter(b => b.id !== id));
        } catch (error) {
            alert('Errore eliminazione: ' + error.message);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Caricamento...</div>;

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem' }}>Admin Dashboard</h1>
                        <p style={{ color: '#666' }}>Benvenuto, {user?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        <LogOut size={16} /> Esci
                    </button>
                </header>

                <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                                <tr>
                                    <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem', color: '#4b5563' }}>ID</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem', color: '#4b5563' }}>Stato</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem', color: '#4b5563' }}>Ospite</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem', color: '#4b5563' }}>Camera</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem', color: '#4b5563' }}>Date</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem', color: '#4b5563' }}>Prezzo</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem', color: '#4b5563' }}>Azioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td style={{ padding: '1rem', color: '#666' }}>#{booking.id}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                backgroundColor:
                                                    booking.status === 'confirmed' ? '#dcfce7' :
                                                        booking.status === 'cancelled' ? '#fee2e2' : '#fef9c3',
                                                color:
                                                    booking.status === 'confirmed' ? '#166534' :
                                                        booking.status === 'cancelled' ? '#991b1b' : '#854d0e'
                                            }}>
                                                {booking.status?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: '500' }}>{booking.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>{booking.email}</div>
                                            {booking.extras?.phone && <div style={{ fontSize: '0.8rem', color: '#999' }}>{booking.extras.phone}</div>}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {booking.room_type}
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>{booking.guests} Ospiti</div>
                                            {booking.extras?.breakfast && <span style={{ fontSize: '0.75rem', color: '#16a34a', display: 'block' }}>+ Colazione</span>}
                                        </td>
                                        <td style={{ padding: '1rem', fontSize: '0.9rem' }}>
                                            <div>In: {format(parseISO(booking.check_in), 'dd/MM/yyyy')}</div>
                                            <div>Out: {format(parseISO(booking.check_out), 'dd/MM/yyyy')}</div>
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: '600' }}>
                                            €{booking.total_price}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {booking.status !== 'confirmed' && (
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'confirmed')}
                                                        title="Conferma"
                                                        style={{ padding: '6px', backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                )}
                                                {booking.status !== 'cancelled' && (
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'cancelled')}
                                                        title="Cancella"
                                                        style={{ padding: '6px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteBooking(booking.id)}
                                                    title="Elimina"
                                                    style={{ padding: '6px', backgroundColor: '#f3f4f6', color: '#666', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
                                            Nessuna prenotazione trovata
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
