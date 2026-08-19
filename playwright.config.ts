import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // 1. Tell Playwright to ONLY look in the ./tests directory
  testDir: "./tests",

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use (html is great for viewing results)
  reporter: "html",

  // Shared settings for all projects
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Automatically start your Next.js dev server before running tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
