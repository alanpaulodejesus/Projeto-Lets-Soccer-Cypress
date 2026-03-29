Cypress.Commands.add('loginUsuario', ({ email, senha }) => {
  
      cy.get('#email')
        .clear()
        .click()
        .type(email, { delay: 20, force: true })
      cy.get('#senha').type(senha)
      cy.contains('button', 'Entrar').click()

})

Cypress.Commands.add('preencherCadastroUsuario', ({ nome, email, senha }) => {
  
  cy.get('.link-cadastro').click()
  cy.get('#nome')
  .clear()
  .click()
  .type(nome, { delay: 20, force: true })
  cy.get('#email').type(email)
  cy.get('#senha').type(senha)
  cy.get('#confirmacaoSenha').type(senha)
  cy.contains('button', 'Cadastrar').click()

})