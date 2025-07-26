/*
 * Copyright (c) 2022-2025 Asymmetric Effort LLC
 *
 * CryptoTap project description page
 */
import React from 'https://esm.sh/react@18';

/**
 * CryptoTap page React component.
 * @returns {React.ReactElement}
 */
export default function CryptoTap() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('h1', null, 'CryptoTap'),
    React.createElement(
      'p',
      null,
      'CryptoTap is a desktop tool for capturing and decrypting TLS traffic for network security analysis.'
    ),
    React.createElement(
      'p',
      null,
      React.createElement(
        'a',
        { href: 'https://github.com/asymmetric-effort/cryptotap' },
        'GitHub Repository'
      ),
      ' | ',
      React.createElement(
        'a',
        { href: 'https://cryptotap.asymmetric-effort.com' },
        'Project Page'
      )
    )
  );
}
