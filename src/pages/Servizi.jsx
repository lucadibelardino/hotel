import React from 'react';
import Section from '../components/Section';

const Servizi = () => {
    return (
        <div style={{ paddingTop: '80px' }}>
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--color-bg-light)' }}>
                <h1>I Nostri Servizi</h1>
                <p>Relax e comodità per la tua vacanza ideale.</p>
            </div>

            <Section
                title="Giardino e BBQ"
                image="https://images.unsplash.com/photo-1558036117-15ea630a269b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            >
                <p>
                    La casa è circondata da un ampio giardino verde, perfetto per rilassarsi all'ombra o per far giocare i bambini in sicurezza.
                    È a disposizione un'area barbecue attrezzata per le tue grigliate estive all'aperto.
                </p>
            </Section>

            <Section
                title="Spiaggia a due passi"
                image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                reversed={true}
            >
                <p>
                    Dimentica l'auto: la splendida spiaggia di Girasole si raggiunge comodamente a piedi in pochi minuti.
                    Troverai sabbia dorata, acqua cristallina e una pineta dove riposare nelle ore più calde.
                </p>
            </Section>

            <Section
                title="Comfort di Casa"
                image="https://images.unsplash.com/photo-1484154218962-a1c002085d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            >
                <p>
                    Cucina completamente attrezzata, lavatrice, aria condizionata, Wi-Fi gratuito e parcheggio privato interno.
                    Ti forniamo biancheria da letto e da bagno, così potrai viaggiare leggero.
                </p>
            </Section>
        </div>
    );
};

export default Servizi;
