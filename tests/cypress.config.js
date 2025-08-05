const { defineConfig } = require("cypress");
const { startDevServer } = require("@cypress/vite-dev-server");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
