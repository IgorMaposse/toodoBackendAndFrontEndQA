describe('TodoList Component', () => {
  const token = 'fake-jwt-token';

  beforeEach(() => {
    // Simula token no localStorage
    window.localStorage.setItem('token', token);

    // Intercepta requisição inicial de tarefas
    cy.intercept('GET', 'http://localhost:5000/items', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Test task 1' },
        { id: 2, name: 'Test task 2' },
      ],
    }).as('getItems');

    cy.visit('http://localhost:3000');
    cy.wait('@getItems');
    cy.wait(1000); // 👈 Espera para visualizar carregamento
  });

  it('should display the task list', () => {
    cy.get('[data-testid="task-1"]').should('contain.text', 'Test task 1');
    cy.wait(1000);
    cy.get('[data-testid="task-2"]').should('contain.text', 'Test task 2');
    cy.wait(1000);
  });

  it('should allow adding a new task', () => {
    cy.intercept('POST', 'http://localhost:5000/items', {
      statusCode: 201,
      body: { id: 3, name: 'New task' },
    }).as('postItem');

    cy.get('[data-testid="task-input"]').clear().type('New task');
    cy.wait(1000);

    cy.get('[data-testid="submit-button"]').click();
    cy.wait('@postItem');
    cy.wait(1000);

    // Intercepta novo GET com a tarefa adicionada
    cy.intercept('GET', 'http://localhost:5000/items', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Test task 1' },
        { id: 2, name: 'Test task 2' },
        { id: 3, name: 'New task' },
      ],
    }).as('getUpdatedItems');

    cy.reload();
    cy.wait('@getUpdatedItems');
    cy.wait(1000);

    cy.get('[data-testid="task-3"]').should('contain.text', 'New task');
    cy.wait(1000);
  });

  it('should allow editing an existing task', () => {
    cy.intercept('PUT', 'http://localhost:5000/items/1', {
      statusCode: 200,
      body: { id: 1, name: 'Updated task' },
    }).as('updateItem');

    cy.get('[data-testid="edit-1"]').click();
    cy.wait(1000);

    cy.get('[data-testid="task-input"]').clear().type('Updated task');
    cy.wait(1000);

    cy.get('[data-testid="submit-button"]').click();
    cy.wait('@updateItem');
    cy.wait(1000);

    cy.intercept('GET', 'http://localhost:5000/items', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Updated task' },
        { id: 2, name: 'Test task 2' },
      ],
    }).as('getAfterUpdate');

    cy.reload();
    cy.wait('@getAfterUpdate');
    cy.wait(1000);

    cy.get('[data-testid="task-1"]').should('contain.text', 'Updated task');
    cy.wait(1000);
  });

  it('should allow deleting a task', () => {
    cy.intercept('DELETE', 'http://localhost:5000/items/2', {
      statusCode: 200,
    }).as('deleteItem');

    cy.get('[data-testid="delete-2"]').click();
    cy.wait('@deleteItem');
    cy.wait(1000);

    cy.intercept('GET', 'http://localhost:5000/items', {
      statusCode: 200,
      body: [{ id: 1, name: 'Test task 1' }],
    }).as('getAfterDelete');

    cy.reload();
    cy.wait('@getAfterDelete');
    cy.wait(1000);

    cy.get('[data-testid="task-2"]').should('not.exist');
    cy.wait(1000);
  });

  it('should log out and redirect to the login page', () => {
    cy.get('button').contains('Logout').click();
    cy.wait(1000);
    cy.url().should('include', '/login');
    cy.wait(1000);
  });
});
