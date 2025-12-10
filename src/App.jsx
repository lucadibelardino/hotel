import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Camere from './pages/Camere'
import Ristorante from './pages/Ristorante'
import Servizi from './pages/Servizi'
import Prenotazione from './pages/Prenotazione'
import ScrollToTop from './components/ScrollToTop'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Demo3D from './pages/Demo3D'
import './App.css'

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camere" element={<Camere />} />
        <Route path="/ristorante" element={<Ristorante />} />
        <Route path="/servizi" element={<Servizi />} />
        <Route path="/prenota" element={<Prenotazione />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/3d" element={<Navigate to="/3d/standard" replace />} />
        <Route path="/3d/:roomId" element={<Demo3D />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
