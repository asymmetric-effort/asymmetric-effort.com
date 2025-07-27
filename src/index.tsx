// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

/** Display the landing page content. */
function Home() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are Asymmetric Effort.</p>
    </div>
  );
}

/** Display company information. */
function About() {
  return (
    <div>
      <h1>About</h1>
      <p>Company information.</p>
    </div>
  );
}

/** Show contact details. */
function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>scaldwell@asymmetric-effort.com</p>
    </div>
  );
}

/** Placeholder for the blog page. */
function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      <p>Blog coming soon.</p>
    </div>
  );
}

/** Main application component wiring the router. */
function App() {
  return (
    <HashRouter>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/about">About</Link> |
        <Link to="/blog">Blog</Link> |
        <Link to="/contact">Contact Us</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </HashRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
