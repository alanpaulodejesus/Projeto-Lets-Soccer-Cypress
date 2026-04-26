const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false ,
  e2e: {
    baseUrl: "http://localhost:8080",
    testIsolation: true, // Obrigatório conforme as dicas do Gist
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});