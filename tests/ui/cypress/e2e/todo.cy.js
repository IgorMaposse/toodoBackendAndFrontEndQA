describe('Todo List CRUD', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[label="Username"]').type('admin');
    cy.get('input[label="Password"]').type('12345');
    cy.contains('Entrar').click();
    cy.contains('Todo List');
  });

  it('Criar um novo item', () => {
    cy.get('input[label="Item"]').type('Novo teste');
    cy.contains('Adicionar').click();
    cy.contains('Novo teste').should('exist');
  });

  it('Editar um item', () => {
    cy.get('input[label="Item"]').type('Item para editar');
    cy.contains('Adicionar').click();
    cy.contains('Item para editar').parent().find('button').first().click(); // Edit
    cy.get('input[label="Item"]').clear().type('Editado');
    cy.contains('Atualizar').click();
    cy.contains('Editado').should('exist');
  });

  it('Excluir um item', () => {
    cy.get('input[label="Item"]').type('Item a remover');
    cy.contains('Adicionar').click();
    cy.contains('Item a remover').parent().find('button').last().click(); // Delete
    cy.contains('Item a remover').should('not.exist');
  });
});
