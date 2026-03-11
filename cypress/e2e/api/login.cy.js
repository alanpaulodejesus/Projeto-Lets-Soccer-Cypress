import { routes } from '../../support/routes'

describe('Login', () => {

    it('Login com sucesso', () => {

        cy.request({
            url: routes.usuarios.login,
            method: 'POST',
            body: {
                email: 'teste@duplicado.com',
                senha: '123456',
            }
        })
            .as('response');
        cy.get('@response').its('status').should('be.equal', 200);
        cy.get('@response').its('body.token').should('not.be.empty');
    })


    it('Não autorizado', () => {

        cy.request({
            url: routes.usuarios.login,
            method: 'POST',
            failOnStatusCode: false,
            body: {
                email: 'teste@duplicado.com',
                senha: '123457',
            }
        })
            .as('response');
        cy.get('@response').its('status').should('be.equal', 401);
    })


})