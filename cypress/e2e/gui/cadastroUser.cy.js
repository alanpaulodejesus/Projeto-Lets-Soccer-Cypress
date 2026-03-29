import { faker } from '@faker-js/faker'

describe('Cadastro de usuário', () => {

    beforeEach(() => {
       cy.visit('/')
    });

  it('deve cadastrar um usuário com sucesso', () => {

   const usuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      senha: faker.internet.password()
    }

    cy.preencherCadastroUsuario(usuario)

    cy.get('#mensagem')
      .should('be.visible')
      .and('contain', 'Usuário cadastrado com sucesso')

  })

})