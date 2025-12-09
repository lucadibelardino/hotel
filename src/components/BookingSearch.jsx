import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './BookingSearch.css';

const BookingSearch = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guests, setGuests] = useState(2);

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Ricerca prenotazione: \nCheck-in: ${startDate ? startDate.toLocaleDateString() : 'Non selezionato'}\nCheck-out: ${endDate ? endDate.toLocaleDateString() : 'Non selezionato'}\nOspiti: ${guests}\n\n(Funzionalità dimostrativa)`);
    };

    return (
        <div className="booking-search-container">
            <form className="booking-search-bar" onSubmit={handleSearch}>
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

                <button type="submit" className="search-button">
                    <Search size={20} />
                    <span>Cerca</span>
                </button>
            </form>
        </div>
    );
};

export default BookingSearch;
