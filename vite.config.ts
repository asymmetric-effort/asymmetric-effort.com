import { defineConfig } from 'vite';
import path from 'path';

const specifyCoreSrc = path.resolve(__dirname, '../specifyjs/core/src');

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      'specifyjs-framework/dom': path.join(specifyCoreSrc, 'dom/index.ts'),
      'specifyjs-framework': path.join(specifyCoreSrc, 'index.ts'),
    },
  },
});
