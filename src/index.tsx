// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import GreyNet from './projects/GreyNet';
import CryptoTap from './projects/CryptoTap';
import Gremlin from './projects/Gremlin';

/** Main application component wiring the router. */
function App() {
  return (
    <HashRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/greynet" element={<GreyNet />} />
        <Route path="/projects/cryptotap" element={<CryptoTap />} />
        <Route path="/projects/gremlin" element={<Gremlin />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
