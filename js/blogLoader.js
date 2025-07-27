// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.

/**
 * Very small YAML loader supporting top level keys and array values of simple objects.
 * Supports one level of nested arrays for lists.
 * @param {string} text
 * @returns {object}
 */
function parseBlogYaml(text) {
  const result = {};
  const lines = text.split(/\r?\n/);
  let key = null;
  let currentObj = null;
  for (const raw of lines) {
    if (!raw.trim() || raw.trim() === '---') continue;
    if (/^[^\s].*:\s*$/.test(raw)) {
      key = raw.split(':')[0].trim();
      result[key] = [];
      currentObj = null;
    } else if (/^[^\s].*:\s+/.test(raw)) {
      const idx = raw.indexOf(':');
      key = raw.slice(0, idx).trim();
      result[key] = raw.slice(idx + 1).trim().replace(/^"|"$/g, '');
      currentObj = null;
    } else if (/^\s+-\s+.*:\s*$/.test(raw)) {
      const k = raw.trim().slice(2, -1).trim();
      currentObj = { [k]: [] };
      result[key].push(currentObj);
    } else if (/^\s+-\s+.*:\s+/.test(raw)) {
      const part = raw.trim().slice(2);
      const idx = part.indexOf(':');
      const k = part.slice(0, idx).trim();
      const v = part.slice(idx + 1).trim().replace(/^"|"$/g, '');
      result[key].push({ [k]: v });
      currentObj = null;
    } else if (/^\s{2,}-\s+/.test(raw)) {
      const v = raw.trim().slice(1).trim().replace(/^\-\s+/, '').replace(/^"|"$/g, '');
      if (currentObj) {
        const nestedKey = Object.keys(currentObj)[0];
        currentObj[nestedKey].push(v);
      }
    }
  }
  return result;
}

if (typeof module !== 'undefined') module.exports = { parseBlogYaml };
