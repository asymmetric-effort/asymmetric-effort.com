// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
/** Display the landing page content. */
function Home() {
    return (React.createElement("div", null,
        React.createElement("h1", null, "About Us"),
        React.createElement("p", null, "We are Asymmetric Effort.")));
}
/** Display company information. */
function About() {
    return (React.createElement("div", null,
        React.createElement("h1", null, "About"),
        React.createElement("p", null, "Company information.")));
}
/** Show contact details. */
function Contact() {
    return (React.createElement("div", null,
        React.createElement("h1", null, "Contact Us"),
        React.createElement("p", null, "scaldwell@asymmetric-effort.com")));
}
/** Placeholder for the blog page. */
function Blog() {
    return (React.createElement("div", null,
        React.createElement("h1", null, "Blog"),
        React.createElement("p", null, "Blog coming soon.")));
}
/** Main application component wiring the router. */
function App() {
    return (React.createElement(HashRouter, null,
        React.createElement("nav", null,
            React.createElement(Link, { to: "/" }, "Home"),
            " |",
            React.createElement(Link, { to: "/about" }, "About"),
            " |",
            React.createElement(Link, { to: "/blog" }, "Blog"),
            " |",
            React.createElement(Link, { to: "/contact" }, "Contact Us")),
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
            React.createElement(Route, { path: "/about", element: React.createElement(About, null) }),
            React.createElement(Route, { path: "/blog", element: React.createElement(Blog, null) }),
            React.createElement(Route, { path: "/contact", element: React.createElement(Contact, null) }))));
}
var root = createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));
