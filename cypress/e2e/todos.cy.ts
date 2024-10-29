describe("todos", () => {
  it("should be showing my todos", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#todo-list").should("exist");
  });
  it("should add new todo to the list", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#todo-title").type("Testa todo");
    cy.get("#todo-due-date").type("2023-12-31");
    cy.get("#add-todo-btn").click();

    cy.get("#todo-section > li").last().should("contain.text", "Testa todo");
  });

  it("should should toggle todo completion status on click", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#todo-title").type("Testa todo");
    cy.get("#todo-due-date").type("2023-12-31");
    cy.get("#add-todo-btn").click();

    cy.get("#todo-section > li").last().should("contain.text", "Testa todo");

    cy.get("#todo-section > li").last().click();
    cy.get("#todo-section > li:last h2").should(
      "have.css",
      "text-decoration",
      "line-through solid rgba(255, 255, 255, 0.87)"
    );

    cy.get("#todo-section > li").last().click();
    cy.get("#todo-section > li:last h2").should(
      "not.have.css",
      "text-decoration",
      "line-through solid rgba(255, 255, 255, 0.87)"
    );
  });
});
