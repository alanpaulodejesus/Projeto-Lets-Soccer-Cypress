import { faker } from '@faker-js/faker'
import { routes } from '../../support/routes'

describe('Selecionar escalação', () => {

  it('deve validar confirmar escalacao sem selecionar jogadores', () => {

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
    cy.contains('Seu time: Cruzeiro').should('be.visible')

    cy.get('#btnEsquema').click()
    cy.contains('#modalEsquema label', '4-4-2').click()
    cy.contains('#modalEsquema a', 'Confirmar').click()
    cy.get('#campoFutebol').should('be.visible')
    cy.get('#campoFutebol .posicao')
      .should('have.length', 11)
    cy.get('#confirmar-selecao').scrollIntoView().should('be.visible').click();
    cy.get('#mensagemJogadores').contains('Selecione exatamente 11 jogadores').should('be.visible')

  })

  it('deve validar escalação 5-4-1 com sucesso', () => {

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
    cy.contains('Seu time: Cruzeiro').should('be.visible')

    cy.get('#btnEsquema').click()
    cy.contains('#modalEsquema label', '5-4-1').click()
    cy.contains('#modalEsquema a', 'Confirmar').click()
    cy.get('#campoFutebol').should('be.visible')

    cy.get('#slot-0').click()  
    cy.contains('strong', 'Cássio').click()
    cy.get('#slot-4').click()  
    cy.contains('strong', 'Fabrício Bruno').click()
    cy.get('#slot-2').click()  
    cy.contains('strong', 'Jonathan Jesus').click()
    cy.get('#slot-3').click()  
    cy.contains('strong', 'Lucas Villalba').click()
    cy.get('#slot-5').click()  
    cy.contains('strong', 'Fagner').click()
    cy.get('#slot-1').click()  
    cy.contains('strong', 'Kaiki').click()
    cy.get('#slot-8').click()  
    cy.contains('strong', 'Lucas Romero').click()
    cy.get('#slot-7').click() 
    cy.contains('strong', 'Lucas Silva').click()    
    cy.get('#slot-9').click() 
    cy.contains('strong', 'Matheus Pereira').click()       
    cy.get('#slot-6').click()  
    cy.contains('strong', 'Gerson').click()      
    cy.get('#slot-10').click()  
    cy.contains('strong', 'Kaio Jorge').click()        
  })
})