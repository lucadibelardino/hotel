import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <main>
        <section id="intro" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2>Benvenuti all'Hotel L'Ulivo</h2>
          <p style={{ marginTop: '1rem', color: 'var(--color-text-light)' }}>
            L'hotel ideale per le tue vacanze in Ogliastra, tra mare cristallino e natura incontaminata.
            Goditi la nostra piscina, il ristorante tipico e l'atmosfera rilassante.
          </p>
        </section>

        {/* Placeholder per altre sezioni */}
        <section id="camere" style={{ padding: '4rem 2rem', backgroundColor: 'var(--color-bg-light)' }}>
          <h2 style={{ textAlign: 'center' }}>Le Nostre Camere</h2>
          <p style={{ textAlign: 'center' }}>Comfort e stile per il tuo riposo.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
