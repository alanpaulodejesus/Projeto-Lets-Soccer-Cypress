import { faker } from '@faker-js/faker'
import { routes } from '../../support/routes'

describe('Selecionar escalação', () => {

  it('deve selecionar escalação de time com sucesso', () => {

    const usuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      senha: '123456',
      confirmacaoSenha: '123456'
    }

    cy.request({
      method: 'POST',
      url: routes.usuarios.cadastro,
      body: usuario
    }).then((response) => {
      cy.log(`Nome: ${usuario.nome}`)
      cy.log(`Email: ${usuario.email}`)
      expect(response.status).to.eq(200)

      cy.visit('/')
      cy.loginUsuario({
        email: usuario.email,
        senha: usuario.senha
      })
      cy.contains('Bem-vindo!').should('be.visible')
    })
    cy.get('#card-cruzeiro').click()
    cy.contains('Clube definido com sucesso!').should('be.visible')
    cy.contains('Seu time é o Cruzeiro').should('be.visible')

    cy.get('#btnEsquema').click()
    cy.contains('#modalEsquema label', '4-4-2').click()
    cy.contains('#modalEsquema a', 'Confirmar').click()
    cy.get('#campoFutebol').should('be.visible')
    cy.get('#campoFutebol .posicao')
      .should('have.length', 11)
    cy.get('#modalJogadores > .modal-footer > .green').click()  

  })
})