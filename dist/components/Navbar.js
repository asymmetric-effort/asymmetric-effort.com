// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
import React from 'react';
import { Link } from 'react-router-dom';
/** Navigation bar with project dropdown. */
export default function Navbar() {
    return (React.createElement("nav", { className: "navbar" },
        React.createElement(Link, { to: "/" }, "Home"),
        React.createElement(Link, { to: "/about" }, "About"),
        React.createElement("div", { className: "dropdown" },
            React.createElement("span", null, "Projects"),
            React.createElement("div", { className: "dropdown-content" },
                React.createElement(Link, { to: "/projects/greynet" }, "GreyNet"),
                React.createElement(Link, { to: "/projects/cryptotap" }, "CryptoTap"),
                React.createElement(Link, { to: "/projects/gremlin" }, "Gremlin"))),
        React.createElement(Link, { to: "/blog" }, "Blog"),
        React.createElement(Link, { to: "/contact" }, "Contact Us")));
}
