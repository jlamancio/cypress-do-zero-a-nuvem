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
      cy.contains('button','Enviar').click();

      cy.get('.success')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.');

    })
    
    it('Exibe msg de erro ao submeter o formulário com um email com formatação inválida', () => {
      cy.get('#firstName').type('Jose Luis');
      cy.get('#lastName').type('Amancio');
      cy.get('#email').type('meuemail_email.com');
      cy.get('#open-text-area').type('Muito obrigado');
      cy.contains('button','Enviar').click();

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
      cy.get('#phone-checkbox').check();
      cy.contains('button','Enviar').click();

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
      cy.contains('button','Enviar').click();

      cy.get('.error')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!');

  })

  it('Envia o formulário com sucesso usando um comando customizado ', () => {
    cy.fillMandatoryFieldsAndSubmit();

      cy.get('.success')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.');

  })

  it('seleciona um produto (YouTube) por seu texto', () => {
     cy.get('#product')
       .select('YouTube')
       .should('have.value', 'youtube');
  })

  it('seleciona um produto (Mentoria) porseu valor', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria');
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog');
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked');
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked');
      });
  })

  it('marca ambos checkboxes, depois desmarca o segundo', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
    
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/messages.json')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('messages.json')
      });
   
  })

  it('seleciona um arquivo simulando drag and drop', () => {
      cy.get('#file-upload')
      .selectFile('cypress/fixtures/messages.json', { action: 'drag-drop'})
      .should(input =>{
        expect(input[0].files[0].name).to.equal('messages.json')
      });
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dado um alias name', () => {
     cy.fixture('messages.json').as('sampleFile')
     cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('messages.json')
      });
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target','_blank');
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
     cy.contains('a', 'Política de Privacidade')
       .invoke('removeAttr', 'target')
       .click();

     cy.contains('h1', 'Política de Privacidade').should('be.visible');

  })

})