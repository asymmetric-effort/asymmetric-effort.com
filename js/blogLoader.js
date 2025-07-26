/*
 * Copyright (c) 2022-2025 Asymmetric Effort LLC
 *
 * Blog YAML loader utilities
 */

/**
 * Parse a very small subset of YAML into an array of blog posts.
 *
 * Supported features:
 *  - Top-level list of posts introduced with "-".
 *  - String values in the form `key: value`.
 *  - Multiline strings using `|` after a key.
 *  - Array values written as:
 *      key:
 *        - item1
 *        - item2
 *
 * This parser is intentionally tiny and only sufficient for the
 * blog format used by this project.
 *
 * @param {string} text - YAML text
 * @returns {Array<Record<string, string|Array<string>>>} array of blog posts
 */
export function parseBlogYaml(text) {
  const lines = text.replace(/\r/g, '').split('\n');
  const posts = [];
  let post = null;
  let mode = null; // 'block' | 'array'
  let currentKey = null;
  let buffer = [];
  let array = [];

  const finish = () => {
    if (!currentKey) return;
    if (mode === 'block') {
      post[currentKey] = buffer.join('\n');
      buffer = [];
    } else if (mode === 'array') {
      post[currentKey] = array.slice();
      array = [];
    }
    mode = null;
    currentKey = null;
  };

  for (let line of lines) {
    if (!line.trim()) continue;

    if (!line.startsWith(' ') && line.startsWith('- ')) {
      if (post) {
        finish();
        posts.push(post);
      }
      post = {};
      line = line.slice(2);
      if (!line.trim()) continue;
    }

    const m = line.match(/^(\s*)(\w+):\s*(.*)$/);
    if (m) {
      finish();
      currentKey = m[2];
      const val = m[3];
      if (val === '|') {
        mode = 'block';
      } else if (val === '') {
        mode = 'array';
      } else {
        post[currentKey] = val.replace(/^"|"$/g, '');
        currentKey = null;
      }
    } else if (mode === 'block') {
      buffer.push(line.replace(/^\s+/, ''));
    } else if (mode === 'array') {
      let item = line.trim().replace(/^-\s*/, '');
      item = item.replace(/^"|"$/g, '');
      array.push(item);
    }
  }

  if (post) {
    finish();
    posts.push(post);
  }
  return posts;
}

/**
 * Load a YAML file from disk or over the network depending on environment.
 * This helper allows tests to read local files using Node.js while the
 * browser version fetches the resource via HTTP.
 *
 * @param {string} path - path to the YAML file
 * @returns {Promise<string>} resolved YAML text
 */
export async function loadYaml(path) {
  if (typeof window === 'undefined') {
    if (path.startsWith('/')) path = path.slice(1);
    const fs = await import('fs/promises');
    return fs.readFile(path, 'utf8');
  }
  const resp = await fetch(path);
  if (!resp.ok) throw new Error('Failed to load ' + path);
  return resp.text();
}

/**
 * Load the list of article filenames from the article index.
 * @returns {Promise<string[]>} array of article YAML filenames
 */
export async function loadArticleIndex() {
  const text = await loadYaml('/blog-content/article-index.yaml');
  return text
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.trim().replace(/^-\s*/, ''))
    .filter((l) => l);
}

/**
 * Load a single blog article from the blog-data directory.
 * @param {string} file - YAML filename
 * @returns {Promise<Record<string, string|Array<string>>>} blog post data
 */
export async function loadArticle(file) {
  const text = await loadYaml(`/blog-data/${file}`);
  const posts = parseBlogYaml(text);
  return posts[0] || {};
}
