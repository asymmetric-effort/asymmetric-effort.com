import { defineConfig } from 'vite';
import path from 'path';

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
      '@asymmetric-effort/specifyjs': path.join(specifyCoreSrc, 'index.ts'),
    },
  },
});
