describe('Validar página de política de privacidade', () => {
    Cypress._.times(5, () => {
        
    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html');
        cy.contains('p', 'Talking About Testing')
          .should('be.visible');

    })

    })
})

