import React from 'react';
import Section from '../components/Section';

const Servizi = () => {
    return (
        <div style={{ paddingTop: '80px' }}>
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--color-bg-light)' }}>
                <h1>I Nostri Servizi</h1>
                <p>Tutto quello che serve per una vacanza perfetta.</p>
            </div>

            <Section
                title="Piscina e Relax"
                image="https://images.unsplash.com/photo-1572331165267-854da2dc72af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            >
                <p>La nostra piscina è il cuore dell'hotel. Rilassati sui lettini, goditi un cocktail al bar o immergiti nell'idromassaggio.</p>
            </Section>

            <Section
                title="Escursioni e Territorio"
                image="https://images.unsplash.com/photo-1533630733-14936d656041?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                reversed={true}
            >
                <p>Organizziamo gite in barca nel Golfo di Orosei e trekking nel Supramonte. Scopri le bellezze selvaggie dell'Ogliastra.</p>
            </Section>
        </div>
    );
};

export default Servizi;
