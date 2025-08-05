describe('Login Tests', () => {
  const URL = 'http://localhost:3000';

  it('Login com credenciais válidas', () => {
    cy.visit(`${URL}/login`);
    cy.get('input[label="Username"]').type('admin');
    cy.get('input[label="Password"]').type('12345');
    cy.contains('Entrar').click();
    cy.contains('Todo List').should('exist');
  });

  it('Login com credenciais inválidas', () => {
    cy.visit(`${URL}/login`);
    cy.get('input[label="Username"]').type('admin');
    cy.get('input[label="Password"]').type('wrong');
    cy.contains('Entrar').click();
    cy.contains('Credenciais inválidas').should('exist');
  });
});
