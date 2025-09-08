import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.SP_BASE_URL || 'https://secure.simplepractice.com';
const headless = (process.env.PW_HEADLESS || 'true') === 'true';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['line']],
  use: {
    baseURL,
    headless,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
