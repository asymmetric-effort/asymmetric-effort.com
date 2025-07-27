// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    return (React.createElement(BrowserRouter, null,
        React.createElement(Header, null),
        React.createElement(Navbar, null),
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
            React.createElement(Route, { path: "/about", element: React.createElement(About, null) }),
            React.createElement(Route, { path: "/blog", element: React.createElement(Blog, null) }),
            React.createElement(Route, { path: "/contact", element: React.createElement(Contact, null) }),
            React.createElement(Route, { path: "/projects/greynet", element: React.createElement(GreyNet, null) }),
            React.createElement(Route, { path: "/projects/cryptotap", element: React.createElement(CryptoTap, null) }),
            React.createElement(Route, { path: "/projects/gremlin", element: React.createElement(Gremlin, null) })),
        React.createElement(Footer, null)));
}
var root = createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));
