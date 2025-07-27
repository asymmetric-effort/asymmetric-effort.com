// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

/**
 * Recursively gather all JavaScript files under a directory.
 *
 * @param {string} dir - Directory to search.
 * @returns {string[]} Array of JS file paths.
 */
function collectJsFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const resolved = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectJsFiles(resolved));
    } else if (entry.isFile() && resolved.endsWith('.js')) {
      files.push(resolved);
    }
  }
  return files;
}

/**
 * Validate that all relative import paths in the dist directory include the
 * `.js` extension and reference files that exist on disk. Checking every file
 * helps prevent browser 404 errors for missing modules.
 */
function validateImports() {
  const distDir = path.join(__dirname, '..', 'dist');
  const jsFiles = collectJsFiles(distDir);
  const importRegex = /import\s+[^'"\n]+from\s+['"]([^'"]+)['"]/g;
  let checked = 0;

  for (const file of jsFiles) {
    const text = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = importRegex.exec(text)) !== null) {
      const importPath = match[1];
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        assert.ok(
          importPath.endsWith('.js'),
          `${file}: ${importPath} missing .js extension`
        );

        const resolved = path.resolve(path.dirname(file), importPath);
        assert.ok(
          fs.existsSync(resolved),
          `${file}: ${resolved} does not exist`
        );
        checked++;
      }
    }
  }

  assert.ok(checked > 0, 'No relative imports found to validate');
  console.log('Import validation passed');
}

validateImports();
