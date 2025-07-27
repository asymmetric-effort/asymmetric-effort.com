// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { parseBlogYaml } = require('../js/blogLoader.js');

/**
 * Basic test ensuring YAML loader parses blog post correctly.
 */
function testLoader() {
  const text = fs.readFileSync(path.join(__dirname, '..', 'blog-data', 'index.yml'), 'utf8');
  const data = parseBlogYaml(text);
  assert.strictEqual(data.title, 'Welcome to Asymmetric Effort');
  assert.ok(Array.isArray(data.content));
  assert.strictEqual(data.content.length, 4);
  console.log('All tests passed');
}

testLoader();
