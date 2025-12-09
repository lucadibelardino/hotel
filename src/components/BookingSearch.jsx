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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate || !name || !email) {
            alert("Per favore, compila tutti i campi obbligatori (Date, Nome, Email).");
            return;
        }

        setLoading(true);

        try {
            // Insert booking into Supabase
            const { data, error } = await supabase
                .from('bookings')
                .insert([
                    {
                        check_in: startDate,
                        check_out: endDate,
                        guests: guests,
                        name: name,
                        email: email
                    },
                ])
                .select();

            if (error) {
                console.error('Supabase error:', error);
                throw new Error("Errore nel salvataggio della prenotazione.");
            }

            alert(`Prenotazione confermata per il Sig./Sig.ra ${name}!\nControlla la tua email (${email}) per i dettagli.`);

            // Reset form
            setStartDate(null);
            setEndDate(null);
            setGuests(2);
            setName('');
            setEmail('');

        } catch (err) {
            console.error(err);
            alert("Si è verificato un errore durante la prenotazione. Riprova più tardi.");
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
                                placeholder="Il tuo nome"
                                className="luxury-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="search-field">
                        <label>Email</label>
                        <div className="input-wrapper">
                            <Mail size={18} className="search-icon" />
                            <input
                                type="email"
                                placeholder="tua@email.com"
                                className="luxury-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
        </div>
    );
};

export default BookingSearch;
