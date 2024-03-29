import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.ts",
    baseUrl: "https://practice.expandtesting.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
