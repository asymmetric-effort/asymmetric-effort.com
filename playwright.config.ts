import { defineConfig } from '@playwright/test';

const baseURL = process.env.PDV_BASE_URL || 'https://asymmetric-effort.com';

export default defineConfig({
  testDir: './tests/pdv',
  timeout: 30_000,
  retries: 2,
  use: {
    baseURL,
    ignoreHTTPSErrors: false,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
