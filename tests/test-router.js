// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
const fs = require('fs');
const assert = require('assert');

/**
 * Ensure the compiled app uses BrowserRouter so routes work without hashes.
 */
function validateRouter() {
  const indexJs = fs.readFileSync('dist/index.js', 'utf8');
  assert.ok(indexJs.includes('BrowserRouter'), 'BrowserRouter not configured');
  console.log('Router validation passed');
}

validateRouter();
