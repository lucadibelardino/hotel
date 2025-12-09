import React, { useState } from 'react';
import { Search, Calendar, Users, Mail, User } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './BookingSearch.css';
                    </div >
                </div >

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
            </form >
        </div >
    );
};

export default BookingSearch;
