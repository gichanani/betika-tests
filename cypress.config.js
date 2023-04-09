const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config)
      return config;
    },
    video: false,
    baseUrl: 'https://www.betika.com/en-ke',
    specPattern: 'cypress/e2e/*.cy.js'
  },
});
