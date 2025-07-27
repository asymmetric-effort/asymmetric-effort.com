// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
import React from 'react';
import { Link } from 'react-router-dom';

/** Navigation bar with project dropdown. */
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <div className="dropdown">
        <span>Projects</span>
        <div className="dropdown-content">
          <Link to="/projects/greynet">GreyNet</Link>
          <Link to="/projects/cryptotap">CryptoTap</Link>
          <Link to="/projects/gremlin">Gremlin</Link>
        </div>
      </div>
      <Link to="/blog">Blog</Link>
      <Link to="/contact">Contact Us</Link>
    </nav>
  );
}
