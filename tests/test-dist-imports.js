// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

/**
 * Validate that all import paths in dist/index.js include the .js extension and
 * that the referenced modules exist on disk. This prevents 404 errors when the
 * browser attempts to load modules by ensuring each import target is available.
 */
function validateImports() {
  const indexPath = path.join(__dirname, '..', 'dist', 'index.js');
  const text = fs.readFileSync(indexPath, 'utf8');
  const importRegex = /import\s+[^'"\n]+from\s+'(\.\/[^']+)'/g;
  let match;
  const seen = [];
  while ((match = importRegex.exec(text)) !== null) {
    const importPath = match[1];
    // Ensure the import includes the .js extension.
    assert.ok(importPath.endsWith('.js'), `${importPath} missing .js extension`);
    const filePath = path.join(__dirname, '..', 'dist', importPath);
    seen.push(filePath);
    // Ensure the referenced file exists.
    assert.ok(fs.existsSync(filePath), `${filePath} does not exist`);
  }
  assert.ok(seen.length > 0, 'No imports found to validate');
  console.log('Import validation passed');
}

validateImports();
