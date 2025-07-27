// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Blog from './pages/Blog.js';
import Contact from './pages/Contact.js';
import GreyNet from './projects/GreyNet.js';
import CryptoTap from './projects/CryptoTap.js';
import Gremlin from './projects/Gremlin.js';

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
