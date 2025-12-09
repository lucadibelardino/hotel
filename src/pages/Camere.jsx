import React from 'react';
import Section from '../components/Section';

const Camere = () => {
    return (
        <div style={{ paddingTop: '80px' }}>
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--color-bg-light)' }}>
                <h1>Le Nostre Camere</h1>
                <p>Relax e comfort in ogni dettaglio.</p>
            </div>

            <Section
                title="Camera Doppia Standard"
                image="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                reversed={false}
            >
                <p>Una soluzione accogliente e funzionale, ideale per coppie.</p>
                <ul>
                    <li>Aria Condizionata</li>
                    <li>Wi-Fi Gratuito</li>
                    <li>Bagno Privato</li>
                </ul>
            </Section>

            <Section
                title="Camera Superior Vista Giardino"
                image="https://images.unsplash.com/photo-1590490360182-f33fb0d41022?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                reversed={true}
            >
                <p>Spaza e luminosa, con un balcone privato che affaccia sul nostro lussureggiante giardino.</p>
                <ul>
                    <li>Balcone Privato</li>
                    <li>Minibar</li>
                    <li>TV Satellitare</li>
                </ul>
            </Section>
        </div>
    );
};

export default Camere;
