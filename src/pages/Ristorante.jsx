import React from 'react';
import Section from '../components/Section';

const Ristorante = () => {
    return (
        <div style={{ paddingTop: '80px' }}>
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--color-bg-light)' }}>
                <h1>Ristorante L'Ulivo</h1>
                <p>I sapori autentici della Sardegna.</p>
            </div>

            <Section
                title="La Nostra Cucina"
                image="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            >
                <p>Utilizziamo solo ingredienti locali e di stagione per portare in tavola la vera tradizione culinaria sarda.</p>
            </Section>

            <Section
                title="Eventi e Cerimonie"
                image="https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                reversed={true}
            >
                <p>La location perfetta per i tuoi momenti speciali. Matrimoni, battesimi e feste private a bordo piscina.</p>
            </Section>
        </div>
    );
};

export default Ristorante;
