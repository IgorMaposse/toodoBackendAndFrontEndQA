describe("Login Page", () => {
  const baseUrl = "http://localhost:3000"; // React frontend URL
  const apiUrl = "http://localhost:5000/login"; // Backend URL

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });



it("should warn if fields are empty", () => {
  cy.wait(600);
  cy.contains("Sign In").click();

  cy.get(".Toastify__toast--warning", { timeout: 500 })
    .should("be.visible")
    .and("contain.text", "Please fill in all fields");
});


  it("should log in with valid credentials", () => {
  // Intercept the login request and mock a successful response
  cy.intercept("POST", apiUrl, {
    statusCode: 200,
    body: { token: "fake-jwt-token" },
  }).as("loginRequest");

  // Intercept the items fetch request aftter login to prevent 403 errors
  cy.intercept("GET", "http://localhost:5000/items", {
    statusCode: 200,
    body: [],
  });

  // Fill in the login form
  cy.get('[data-testid="username-input"]').type("admin", { delay: 100 });
  cy.get('[data-testid="password-input"]').type("12345", { delay: 100 });
  cy.contains("Sign In").click();

  
  cy.wait("@loginRequest"); // Wait for the login request to complet

  // Check if redirected to the home page and that the main content is visible
  cy.url().should("eq", `${baseUrl}/`);
  cy.contains("My List").should("exist"); // Replace with actual text shown on the home page
});


  it("should show error for invalid credentials", () => {
    cy.intercept("POST", apiUrl, {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("invalidLogin");

    cy.get('[data-testid="username-input"]').type("admin",{delay:100});
    cy.get('[data-testid="password-input"]').type("wrongpassword",{delay:100});
    cy.contains("Sign In").click();

    cy.wait("@invalidLogin");
    cy.contains("Invalid credentials").should("exist");
  });
});
