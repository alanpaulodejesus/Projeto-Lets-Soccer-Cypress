import { faker } from '@faker-js/faker'
import { routes } from '../../support/routes'

describe('Cadastro Usuário', () => {

    it('Cadastro usuário com sucesso', () => {

        cy.request({
            url: routes.usuarios.cadastro,
            method: 'POST',
            body: {
                nome: 'Alan',
                email: faker.internet.email(),
                senha: '123456',
                confirmacaoSenha: '123456'
            }
        })
            .as('response');
        cy.get('@response').its('status').should('be.equal', 200);
        cy.get('@response').its('body.mensagem').should('equal', 'Usuário cadastrado com sucesso');
    })


    it('Não deve permitir cadastro com email já existente', () => {

        cy.request({
            url: routes.usuarios.cadastro,
            method: 'POST',
            failOnStatusCode: false,
            body: {
                nome: 'Alan',
                email: 'teste@duplicado.com',
                senha: '123456',
                confirmacaoSenha: '123456'
            }
        })


        cy.request({
            url: '/usuarios/cadastro',
            method: 'POST',
            failOnStatusCode: false,
            body: {
                nome: 'Alan',
                email: 'teste@duplicado.com',
                senha: '123456',
                confirmacaoSenha: '123456'
            }
        }).then((response) => {

            expect(response.status).to.eq(400)
            expect(response.body.mensagem)
                .to.eq('E-mail já cadastrado')

        })

    })
})