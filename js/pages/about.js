/*
 * Copyright (c) 2022-2025 Asymmetric Effort LLC
 *
 * About page component
 */
import React from 'https://esm.sh/react@18';

/**
 * About page React component.
 * @returns {React.ReactElement}
 */
export default function About() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('h1', null, 'About Us'),
    React.createElement(
      'p',
      null,
      'Asymmetric Effort creates tools and solutions that protect data and identities. We believe digital privacy and security are human rights.'
    )
  );
}
