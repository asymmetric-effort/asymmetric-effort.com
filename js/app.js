/*
 * Copyright (c) 2022-2025 Asymmetric Effort LLC
 *
 * React application entry point
 */
import React from 'https://esm.sh/react@18';
import { createRoot } from 'https://esm.sh/react-dom@18/client';
import { HashRouter, Routes, Route, Link } from 'https://esm.sh/react-router-dom@6';

import Home from './pages/home.js';
import About from './pages/about.js';
import GreyNet from './pages/greynet.js';
import CryptoTap from './pages/cryptotap.js';
import Gremlin from './pages/gremlin.js';
import Contact from './pages/contact.js';
import Blog from './pages/blog.js';

/**
 * Application component containing routes and navigation.
 * @returns {React.ReactElement}
 */
function App() {
  return React.createElement(
    HashRouter,
    null,
    React.createElement(
      'header',
      null,
      React.createElement(
        'a',
        { href: '#/' },
        React.createElement('img', { src: '/logo.png', alt: 'logo', width: 50, height: 50 })
      ),
      React.createElement(
        'nav',
        null,
        React.createElement(Link, { to: '/about' }, 'About Us'),
        React.createElement(Link, { to: '/greynet' }, 'GreyNet'),
        React.createElement(Link, { to: '/cryptotap' }, 'CryptoTap'),
        React.createElement(Link, { to: '/gremlin' }, 'Gremlin'),
        React.createElement(Link, { to: '/blog' }, 'Blog'),
        React.createElement(Link, { to: '/contact' }, 'Contact')
      )
    ),
    React.createElement(
      'main',
      { id: 'app' },
      React.createElement(
        Routes,
        null,
        React.createElement(Route, { path: '/', element: React.createElement(Home) }),
        React.createElement(Route, { path: '/about', element: React.createElement(About) }),
        React.createElement(Route, { path: '/greynet', element: React.createElement(GreyNet) }),
        React.createElement(Route, { path: '/cryptotap', element: React.createElement(CryptoTap) }),
        React.createElement(Route, { path: '/gremlin', element: React.createElement(Gremlin) }),
        React.createElement(Route, { path: '/blog', element: React.createElement(Blog) }),
        React.createElement(Route, { path: '/contact', element: React.createElement(Contact) }),
        React.createElement(Route, { path: '*', element: React.createElement(Home) })
      )
    ),
    React.createElement(
      'footer',
      null,
      React.createElement('span', null, '\u00A9 2022-2025 Asymmetric Effort LLC. All Rights Reserved.')
    )
  );
}

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
