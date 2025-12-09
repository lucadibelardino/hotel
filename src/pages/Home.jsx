import React from 'react';
import Hero from '../components/Hero';
import Section from '../components/Section';

const Home = () => {
    return (
        <>
            <Hero />

            <Section
                id="intro"
                title="Hotel 3 stelle in Ogliastra"
                image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            >
                <p>
                    Hotel L’Ulivo è un hotel 3 stelle situato a Girasole, in Sardegna, nel cuore dell’Ogliastra.
                    La struttura si trova a soli 2 km dal mare e dal centro di Tortolì, ed è circondata da un bellissimo giardino.
                </p>
                <p>
                    L’hotel dispone di una piscina privata e di una zona relax con idromassaggio, ideali per rilassarsi e godersi il sole in totale tranquillità.
                </p>
            </Section>

            <Section
                id="camere"
                title="Le Nostre Camere"
                image="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                reversed={true}
                linkText="Scopri le Camere"
                linkUrl="/camere"
            >
                <p>
                    Le camere sono curate e accoglienti, e dispongono di tutti i comfort necessari per un soggiorno confortevole.
                    Arredate in stile tradizionale sardo con tocchi moderni, offrono un rifugio fresco e silenzioso dopo una giornata di mare.
                </p>
            </Section>

            <Section
                id="ristorante"
                title="Il Ristorante"
                image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                linkText="Scopri il Menù"
                linkUrl="/ristorante"
            >
                <p>
                    Il ristorante propone piatti della cucina mediterranea e sarda, serviti anche a bordo piscina in un’atmosfera elegante e romantica.
                    Ingredienti locali freschissimi, pasta fatta in casa e il pesce del nostro mare.
                </p>
            </Section>

            <Section
                id="servizi"
                title="I Nostri Servizi"
                image="https://images.unsplash.com/photo-1572331165267-854da2dc72af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                reversed={true}
                linkText="Tutti i servizi"
                linkUrl="/servizi"
            >
                <p>
                    Oltre alla piscina e all'idromassaggio, offriamo noleggio bici, prenotazione escursioni e navetta per le spiagge.
                    Scopri il territorio dell'Ogliastra con i nostri consigli personalizzati.
                </p>
            </Section>
        </>
    );
};

export default Home;
