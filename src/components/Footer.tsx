// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
import React from 'react';

/** Application footer with dynamic year. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <span>&copy; 2022-{year} Asymmetric Effort, LLC. All Rights Reserved.</span>
    </footer>
  );
}
