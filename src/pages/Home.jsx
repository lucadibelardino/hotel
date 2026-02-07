import React from 'react';
import Hero from '../components/Hero';
import Section from '../components/Section';

const Home = () => {
    return (
        <>
            <Hero />

            <Section
                id="intro"
                title="Hidden Treasure: La tua casa vacanze"
                image="https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            >
                <p>
                    Hidden Treasure è una splendida casa indipendente situata a Girasole, in Sardegna.
                    Immersa nella tranquillità e a pochi minuti dalle spiagge incontaminate dell'Ogliastra, è il luogo ideale per una vacanza in totale relax.
                </p>
                <p>
                    La casa offre ampi spazi interni ed esterni, perfetti per famiglie o gruppi di amici che desiderano vivere il mare con la libertà di sentirsi a casa.
                </p>
            </Section>

            <Section
                id="lacasa"
                title="Gli Ambienti"
                image="https://images.unsplash.com/photo-1613425669954-7259543f4835?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                reversed={true}
                linkText="Esplora la Casa"
                linkUrl="/camere"
            >
                <p>
                    Arredata con gusto e funzionalità, la struttura dispone di camere luminose, una cucina attrezzata e un'accogliente zona giorno.
                    Ogni dettaglio è pensato per garantire il massimo comfort durante il vostro soggiorno.
                </p>
            </Section>

            <Section
                id="servizi"
                title="Servizi e Comfort"
                image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                linkText="Scopri tutti i servizi"
                linkUrl="/servizi"
            >
                <p>
                    Goditi il giardino privato, il barbecue per le tue serate estive e la comodità del parcheggio riservato.
                    A tua disposizione tutto il necessario per una vacanza senza pensieri.
                </p>
            </Section>
        </>
    );
};

export default Home;
