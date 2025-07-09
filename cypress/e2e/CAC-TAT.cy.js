/// <reference types="cypress"/>

  beforeEach(() => {
    cy.visit('./src/index.html');
  })

  describe('Central de Atendimento ao Cliente TAT', () => {
    it('verifica p título da aplicação', () => {  
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');

    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
      const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10);

      cy.get('#firstName').type('Jose Luis');
      cy.get('#lastName').type('Amancio');
      cy.get('#email').type('meuemail@email.com');
      cy.get('#open-text-area').type(longText, { delay: 0 });
      cy.get('button[type="submit"]').click();

      cy.get('.success')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.');

    })
    
    it('Exibe msg de erro ao submeter o formulário com um email com formatação inválida', () => {
      cy.get('#firstName').type('Jose Luis');
      cy.get('#lastName').type('Amancio');
      cy.get('#email').type('meuemail_email.com');
      cy.get('#open-text-area').type('Muito obrigado');
      cy.get('button[type="submit"]').click();

      cy.get('.error')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!');

    })

    it('Campo telefone continua vazio quando preenchido com valor não numérico', () => {
      cy.get('#phone')
        .type('abcde')
        .should('have.value','');
    
    })

    it('Exibe msg de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#firstName').type('Jose Luis');
      cy.get('#lastName').type('Amancio');
      cy.get('#email').type('meuemail_email.com');
      cy.get('#open-text-area').type('Muito obrigado');
      cy.get('#phone-checkbox').click();
      cy.get('button[type="submit"]').click();

      cy.get('.error')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!');

    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName')
        .type('Jose Luis')
        .should('have.value', 'Jose Luis')
        .clear()
        .should('have.value', '');

      cy.get('#lastName')
        .type('Amancio')
        .should('have.value', 'Amancio')
        .clear()
        .should('have.value', '');
        
      cy.get('#email')
        .type('meuemail_email.com')
        .should('have.value', 'meuemail_email.com')
        .clear()
        .should('have.value', '');
      
      cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '');

  })

  it('Exibe msg de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.get('button[type="submit"]').click();

      cy.get('.error')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!');

  })

  it.only('Envia o formulário com sucesso usando um comando customizado ', () => {
    const data = {
      firstName: 'Jose Luis',
      lastName: 'Amancio',
      email: 'meuemail@email.com',
      text: 'Muito obrigado'
    } 
    
    cy.fillMandatoryFieldsAndSubmit(data);

      cy.get('.success')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.');

  })

})