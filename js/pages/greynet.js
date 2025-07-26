/*
 * Copyright (c) 2022-2025 Asymmetric Effort LLC
 *
 * GreyNet project description page
 */
import React from 'https://esm.sh/react@18';

/**
 * GreyNet page React component.
 * @returns {React.ReactElement}
 */
export default function GreyNet() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('h1', null, 'GreyNet'),
    React.createElement(
      'p',
      null,
      'GreyNet is an open source collection of network sensors aimed at discovering emerging threats.'
    )
  );
}
