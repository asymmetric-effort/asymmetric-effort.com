#!/usr/bin/env node
import fs from 'fs';
import assert from 'assert';
import {
  parseBlogYaml,
  loadArticleIndex,
  loadArticle,
} from '../js/blogLoader.js';

const text = fs.readFileSync('blog-data/index.yml', 'utf8');
const posts = parseBlogYaml(text);
assert.strictEqual(Array.isArray(posts), true);
assert.strictEqual(posts[0].h1, 'Welcome to the Blog');
assert.deepStrictEqual(posts[0].ul, ['First item', 'Second item']);
assert.strictEqual(posts[0].img, '/logo.png');
assert.deepStrictEqual(posts[0].table, ['Col1|Col2', 'A|B']);
assert.strictEqual(posts[0].dt, 'Example');
assert.strictEqual(posts[0].dd, 'Description');

const index = await loadArticleIndex();
assert.ok(Array.isArray(index) && index.length >= 1);
assert.ok(index.includes('fecs-toy.yml'));
const article = await loadArticle(index[0]);
assert.strictEqual(article.h1, 'Welcome to the Blog');

console.log('Blog loader tests passed');
