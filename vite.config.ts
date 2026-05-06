import { defineConfig } from 'vite';
import path from 'path';
import { specifyJsSeoPlugin } from '../specifyjs/core/src/build/seo-plugin';
import { specifyJsNoscriptPlugin } from '../specifyjs/core/src/build/noscript-plugin';

// Alias to SpecifyJS source to avoid the dual-package issue where the
// pre-built dom bundle inlines its own copy of the reconciler. The CI
// workflows clone the specifyjs repo alongside this project for this purpose.
// Once the npm package ships a dom bundle that imports from the main entry
// instead of inlining, these aliases can be removed.
const specifyCoreSrc = path.resolve(__dirname, '../specifyjs/core/src');
const specifyComponents = path.resolve(__dirname, '../specifyjs/components');

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@asymmetric-effort/specifyjs/dom': path.join(specifyCoreSrc, 'dom/index.ts'),
      '@asymmetric-effort/specifyjs/components/footer': path.join(specifyComponents, 'layout/footer/src/index.ts'),
      '@asymmetric-effort/specifyjs/components/http-error-page': path.join(specifyComponents, 'errors/_shared/src/index.ts'),
      '@asymmetric-effort/specifyjs': path.join(specifyCoreSrc, 'index.ts'),
    },
  },
  plugins: [
    specifyJsSeoPlugin({
      siteUrl: 'https://asymmetric-effort.com',
      title: 'Asymmetric Effort',
      description: 'Asymmetric Effort builds open-source frameworks, security tooling and collaboration platforms to help everyone stay safe online.',
      routes: ['/', '/#/projects', '/#/resources'],
      author: 'Sam Caldwell',
      license: 'Proprietary',
      repository: 'https://github.com/asymmetric-effort',
    }),
    specifyJsNoscriptPlugin({
      title: 'Asymmetric Effort',
      description: 'Open-source frameworks, security tooling and collaboration platforms to help everyone stay safe online.',
      copyright: '\u00A9 2022-2026 Asymmetric Effort, LLC.',
      sections: [
        {
          id: 'about',
          title: 'About Us',
          html: `
            <p>We are Asymmetric Effort. Our mission is to improve cybersecurity through
            innovative approaches focused on helping everyone stay safe online. Whether you
            are a business or a consumer, our goal is to develop tools, solutions and systems
            which protect your identity, data and peace of mind.</p>
            <p>We build open-source frameworks, security tooling and collaboration platforms
            that empower developers and organizations to ship safer, more reliable software.</p>
          `,
        },
        {
          id: 'projects',
          title: 'Projects',
          html: `
            <ul>
              <li><a href="https://specifyjs.asymmetric-effort.com">SpecifyJS</a> — A declarative TypeScript UI framework with zero runtime dependencies, built-in routing, and a 56-component library in under 4KB gzipped.</li>
              <li><a href="https://scrutineer.asymmetric-effort.com">Scrutineer</a> — Security analysis and auditing platform for identifying vulnerabilities and ensuring compliance across your infrastructure.</li>
              <li><a href="https://convocate.asymmetric-effort.com">Convocate</a> — A collaboration platform designed to bring teams together for secure, efficient communication and project coordination.</li>
              <li><a href="https://actions.asymmetric-effort.com">Actions</a> — Reusable GitHub Actions and CI/CD workflows for Asymmetric Effort projects.</li>
              <li><a href="https://github.com/asymmetric-effort/linux-oidc-plugin">Linux PAM OIDC</a> — A Linux PAM module enabling OpenID Connect (OIDC) authentication for system login.</li>
              <li>GreyNet — Decentralized, peer-to-peer zero trust network access without reliance on centralized control planes.</li>
            </ul>
          `,
        },
        {
          id: 'resources',
          title: 'Resources',
          html: `
            <ul>
              <li><a href="https://coding-standards.asymmetric-effort.com">Coding Standards</a> — Organization-wide coding standards and best practices for all Asymmetric Effort projects.</li>
            </ul>
          `,
        },
      ],
    }),
  ],
});
