import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Satellite from './pages/Satellite'
import Validation from './pages/Validation'
import Irrigation from './pages/Irrigation'
import Analytics from './pages/Analytics'
import Documentation from './pages/Documentation'
import About from './pages/About'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/satellite" element={<Satellite />} />
          <Route path="/validation" element={<Validation />} />
          <Route path="/irrigation" element={<Irrigation />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
