/*
 * Copyright (c) 2022-2025 Asymmetric Effort LLC
 *
 * Contact page component
 */
import React from 'https://esm.sh/react@18';

/**
 * Contact page React component.
 * @returns {React.ReactElement}
 */
export default function Contact() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('h1', null, 'Contact Us'),
    React.createElement(
      'p',
      null,
      React.createElement(
        'a',
        { href: 'mailto:scaldwell@asymmetric-effort.com' },
        'scaldwell@asymmetric-effort.com'
      )
    )
  );
}
