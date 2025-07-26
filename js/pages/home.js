/*
 * Copyright (c) 2022-2025 Asymmetric Effort LLC
 *
 * Home page component
 */
import React from 'https://esm.sh/react@18';

/**
 * Home page React component.
 * @returns {React.ReactElement}
 */
export default function Home() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('h1', null, 'Welcome to Asymmetric Effort'),
    React.createElement(
      'p',
      null,
      'We are Asymmetric Effort. Our mission is to improve cybersecurity through innovative approaches focused on helping everyone stay safe online.'
    )
  );
}
