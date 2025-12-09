import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import './BookingSearch.css';

const BookingSearch = () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Ricerca prenotazione: \nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nOspiti: ${guests}\n\n(Funzionalità dimostrativa)`);
    };

    return (
        <div className="booking-search-container">
            <form className="booking-search-bar" onSubmit={handleSearch}>
                <div className="search-field">
                    <label>Check-in</label>
                    <div className="input-wrapper">
                        <Calendar size={18} className="search-icon" />
                        <input
                            type="date"
                            required
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                </div>

                <div className="divider"></div>

                <div className="search-field">
                    <label>Check-out</label>
                    <div className="input-wrapper">
                        <Calendar size={18} className="search-icon" />
                        <input
                            type="date"
                            required
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
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
                        >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} Ospiti</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="search-button">
                    <Search size={20} />
                    <span>Cerca</span>
                </button>
            </form>
        </div>
    );
};

export default BookingSearch;
