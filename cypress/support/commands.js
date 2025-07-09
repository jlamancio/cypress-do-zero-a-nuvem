Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Jose Luis');
    cy.get('#lastName').type('Amancio');
    cy.get('#email').type('meuemail@email.com');
    cy.get('#open-text-area').type('Muito obrigado');
    cy.get('#phone-checkbox').click();
    cy.get('#phone').type('123456789');
    cy.get('button[type="submit"]').click();

})