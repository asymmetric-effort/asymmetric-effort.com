/*
 * Copyright (c) 2022-2025 Asymmetric Effort LLC
 *
 * Gremlin project description page
 */
import React from 'https://esm.sh/react@18';

/**
 * Gremlin page React component.
 * @returns {React.ReactElement}
 */
export default function Gremlin() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('h1', null, 'Gremlin'),
    React.createElement(
      'p',
      null,
      'Gremlin monitors system calls to detect potentially malicious behaviors.'
    )
  );
}
