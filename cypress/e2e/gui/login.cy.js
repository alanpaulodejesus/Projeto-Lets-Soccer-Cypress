import { faker } from '@faker-js/faker'
import { routes } from '../../support/routes'

describe('Cadastro via API + Login via GUI', () => {

  it('deve cadastrar usuario via API e logar pela interface com sucesso', () => {

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
  })


  it('usuario de clube já selecionado visualiza seu clube com sucesso', () => {

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
    }).then((cadastroResponse) => {
      expect(cadastroResponse.status).to.eq(200)

      cy.request({
        method: 'POST',
        url: routes.usuarios.login,
        body: {
          email: usuario.email,
          senha: usuario.senha
        }
      }).then((loginResponse) => {

        const token = loginResponse.body.token

        expect(token).to.exist

        cy.request({
          method: 'POST',
          url: routes.usuarios.usuarioClube,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            clubeId: 1
          }
        }).then((clubeResponse) => {

          expect(clubeResponse.status).to.eq(200)

          cy.visit('/')
          cy.loginUsuario({
            email: usuario.email,
            senha: usuario.senha
          })
          cy.contains('Seu time: Cruzeiro').should('be.visible')
        })
      })
    })
  })
})