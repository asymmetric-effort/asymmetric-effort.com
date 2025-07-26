/*
 * Copyright (c) 2022-2025 Asymmetric Effort LLC
 *
 * Blog page component
 */
import React from 'https://esm.sh/react@18';
import { loadArticleIndex, loadArticle } from '../blogLoader.js';

/**
 * Blog page React component.
 * @returns {React.ReactElement}
 */
export default function Blog() {
  const [index, setIndex] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [articleIdx, setArticleIdx] = React.useState(0);
  const [article, setArticle] = React.useState(null);

  React.useEffect(() => {
    loadArticleIndex()
      .then((idx) => {
        setIndex(idx);
        if (idx.length) {
          loadArticle(idx[0]).then(setArticle).catch(() => setArticle(null));
        }
      })
      .catch(() => setIndex([]));
  }, []);

  React.useEffect(() => {
    if (index[articleIdx]) {
      loadArticle(index[articleIdx])
        .then(setArticle)
        .catch(() => setArticle(null));
    }
  }, [articleIdx, index]);

  const prevArticle = () => setArticleIdx(Math.max(articleIdx - 1, 0));
  const nextArticle = () =>
    setArticleIdx(Math.min(articleIdx + 1, index.length - 1));

  const prevList = () => setOffset(Math.max(offset - 5, 0));
  const nextList = () =>
    setOffset(Math.min(offset + 5, Math.max(index.length - 5, 0)));

  return React.createElement(
    'div',
    { className: 'blog-container' },
    React.createElement(
      'aside',
      null,
      React.createElement(
        'ul',
        null,
        index.slice(offset, offset + 5).map((file, idx) =>
          React.createElement(
            'li',
            { key: file },
            React.createElement(
              'a',
              {
                href: '#',
                onClick: (e) => {
                  e.preventDefault();
                  setArticleIdx(offset + idx);
                },
              },
              file.replace(/\.yml$/, '').replace(/_/g, ' ')
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'pager' },
        React.createElement(
          'button',
          { onClick: prevList, disabled: offset === 0 },
          'Prev'
        ),
        React.createElement(
          'button',
          { onClick: nextList, disabled: offset + 5 >= index.length },
          'Next'
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'article-wrapper' },
      React.createElement(
        'div',
        { className: 'pager' },
        React.createElement(
          'button',
          { onClick: prevArticle, disabled: articleIdx === 0 },
          'Prev Article'
        ),
        React.createElement(
          'button',
          { onClick: nextArticle, disabled: articleIdx === index.length - 1 },
          'Next Article'
        )
      ),
      article ? React.createElement(Post, { post: article }) : null,
      React.createElement(
        'div',
        { className: 'pager' },
        React.createElement(
          'button',
          { onClick: prevArticle, disabled: articleIdx === 0 },
          'Prev Article'
        ),
        React.createElement(
          'button',
          { onClick: nextArticle, disabled: articleIdx === index.length - 1 },
          'Next Article'
        )
      )
    )
  );
}

/**
 * Render a single blog post.
 * @param {{post: Record<string, string>}} props - post data
 * @returns {React.ReactElement}
 */
function Post({ post }) {
  const elements = [];
  for (const [k, v] of Object.entries(post)) {
    if (/^h[1-6]$/.test(k)) {
      elements.push(React.createElement(k, { key: k }, v));
    } else if (k === 'p') {
      elements.push(React.createElement('p', { key: k }, v));
    } else if (k === 'code') {
      elements.push(
        React.createElement('pre', { key: k }, React.createElement('code', null, v))
      );
    } else if (k === 'img') {
      elements.push(React.createElement('img', { key: k, src: v, alt: '' }));
    } else if (k === 'ul' || k === 'ol') {
      const items = Array.isArray(v) ? v : [v];
      elements.push(
        React.createElement(
          k,
          { key: k },
          items.map((item, i) => React.createElement('li', { key: i }, item))
        )
      );
    } else if (k === 'li' || k === 'div' || k === 'dt' || k === 'dd') {
      elements.push(React.createElement(k, { key: k }, v));
    } else if (k === 'table') {
      const rows = Array.isArray(v) ? v : [v];
      elements.push(
        React.createElement(
          'table',
          { key: k },
          rows.map((row, i) =>
            React.createElement(
              'tr',
              { key: i },
              row.split('|').map((cell, j) => React.createElement('td', { key: j }, cell.trim()))
            )
          )
        )
      );
    }
  }
  return React.createElement('article', null, elements);
}
