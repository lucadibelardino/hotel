import React, { useState } from 'react';
import { Search, Calendar, Users, Mail, User } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './BookingSearch.css';
import { supabase } from '../supabaseClient';

const BookingSearch = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guests, setGuests] = useState(2);

    // New fields for booking
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // Modal State
    const [modal, setModal] = useState({ show: false, type: 'success', title: '', message: '' });

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate || !name || !email) {
            setModal({
                show: true,
                type: 'error',
                title: 'Campi Mancanti',
                message: "Per favore, compila tutti i campi obbligatori (Date, Nome, Email)."
            });
            return;
        }

        setLoading(true);

        try {
            // Helper to format date as YYYY-MM-DD for Supabase DATE type
            const formatDate = (date) => {
                if (!date) return null;
                const offset = date.getTimezoneOffset();
                const localDate = new Date(date.getTime() - (offset * 60 * 1000));
                return localDate.toISOString().split('T')[0];
            };

            const formattedCheckIn = formatDate(startDate);
            const formattedCheckOut = formatDate(endDate);
            const bookingData = {
                check_in: formattedCheckIn,
                check_out: formattedCheckOut,
                guests: guests,
                name: name,
                email: email
            };

            console.log("Saving booking:", bookingData);

            // 1. Insert booking into Supabase
            const { error: insertError } = await supabase
                .from('bookings')
                .insert([bookingData]);

            if (insertError) {
                console.error("Supabase Insert Error:", insertError);
                throw insertError;
            }

            console.log("Booking saved. Invoking Edge Function...");

            // 2. Call Supabase Edge Function to send email
            const { data: funcData, error: funcError } = await supabase.functions.invoke('send-booking-email', {
                body: { record: bookingData }
            });

            // Handle network/invoke transport errors (real 500s or 404s that blocked execution)
            if (funcError) {
                console.error("Invoke Error:", funcError);
                let errorMsg = `Connessione alla funzione email fallita: ${funcError.message}`;
                if (funcError.code === 'not_found' || funcError.message?.includes('404')) {
                    errorMsg = "Funzione Email non trovata (Deploy mancante?).";
                }
                setModal({
                    show: true,
                    type: 'warning',
                    title: 'Prenotazione Salvata',
                    message: `La prenotazione è confermata, ma l'email automatica non è partita.\n(${errorMsg})`
                });
            }
            // Handle logical errors returned by the function (soft errors)
            else if (funcData && funcData.success === false) {
                console.error("Function Logic Error:", funcData.error);
                setModal({
                    show: true,
                    type: 'warning',
                    title: 'Prenotazione Salvata',
                    message: `Prenotazione ok, ma invio email fallito.\nMotivo: ${funcData.error}`
                });
            }
            // Success
            else {
                console.log("Edge Function Success:", funcData);
                setModal({
                    show: true,
                    type: 'success',
                    title: 'Prenotazione Confermata!',
                    message: `Grazie ${name}, abbiamo ricevuto la tua richiesta.\nUn'email di conferma è stata inviata a ${email}.`
                });

                // Clear success form logic
                setStartDate(null);
                setEndDate(null);
                setGuests(2);
                setName('');
                setEmail('');
            }

        } catch (err) {
            console.error('Full Error Object:', err);
            setModal({
                show: true,
                type: 'error',
                title: 'Errore',
                message: `Si è verificato un errore durante la prenotazione.\n${err.message || 'Riprova più tardi.'}`
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-search-container">
            <form className="booking-search-bar" onSubmit={handleSearch}>
                {/* Row 1: Dates & Guests */}
                <div className="search-section">
                    <div className="search-field">
                        <label>Check-in</label>
                        <div className="input-wrapper">
                            <Calendar size={18} className="search-icon" />
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Arrivo"
                                className="luxury-input"
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                required
                            />
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="search-field">
                        <label>Check-out</label>
                        <div className="input-wrapper">
                            <Calendar size={18} className="search-icon" />
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate || new Date()}
                                placeholderText="Partenza"
                                className="luxury-input"
                                dateFormat="dd/MM/yyyy"
                                required
                            />
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="search-field">
                        <label>Ospiti</label>
                        <div className="input-wrapper">
                            <Users size={18} className="search-icon" />
                            <select
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className="luxury-input"
                            >
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num} Ospiti</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Vertical Divider for Desktop, Spacing for Mobile */}
                <div className="section-divider"></div>

                {/* Row 2: User Details */}
                <div className="search-section">
                    <div className="search-field">
                        <label>Nome</label>
                        <div className="input-wrapper">
                            <User size={18} className="search-icon" />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Il tuo nome"
                                className="luxury-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="given-name"
                            />
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="search-field">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <Mail size={18} className="search-icon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="tua@email.com"
                                className="luxury-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>
                </div>

                <div className="search-button-wrapper">
                    <button type="submit" className="search-button" disabled={loading}>
                        {loading ? (
                            <span>Attendi...</span>
                        ) : (
                            <>
                                <Search size={20} />
                                <span>Prenota</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Custom Modal */}
            {modal.show && (
                <div className="booking-modal-overlay" onClick={() => setModal({ ...modal, show: false })}>
                    <div className="booking-modal" onClick={e => e.stopPropagation()}>
                        <div className={`modal-header ${modal.type}`}>
                            <h3>{modal.title}</h3>
                        </div>
                        <div className="modal-body">
                            <p style={{ whiteSpace: 'pre-line' }}>{modal.message}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="confirm-btn" onClick={() => setModal({ ...modal, show: false })}>
                                Chiudi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingSearch;
