# Asymmetric Effort Website

This repository hosts the single-page React application for [Asymmetric Effort](https://asymmetric-effort.com).  The site is written in TypeScript and deployed to GitHub Pages via GitHub Actions.  A small YAML loader is used to render blog posts both in Node tests and in the browser.

## Development

Run the unit tests:

```bash
npm test
```

Compile the TypeScript source to JavaScript:

```bash
tsc
```

The compiled files are output to the `dist/` directory and served by `index.html`.

During deployment, the workflow automatically updates the `CNAME` file to use
`dev.asymmetric-effort.com` when the `dev` branch is published and
`asymmetric-effort.com` when `main` is published.

