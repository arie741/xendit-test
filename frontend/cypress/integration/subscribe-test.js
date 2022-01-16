describe("Subscribe test", () => {
  before(() => {
    cy.writeFile("../backend/public/mock_database/subscribers.json", "[]", "utf-8");
  });

  it("Can subscribe if email not exist.", () => {
    cy.visit("/subscribe");
    cy.intercept("POST", "/subscribers").as("request");

    cy.get("#subscribe-input").type("a.pranasakti@gmail.com");
    cy.get("#subscribe-submit-button").click();

    cy.wait("@request").then((req) => {
      cy.wrap(req).its("request.body.email").should("eq", "a.pranasakti@gmail.com");
      cy.wrap(req).its("response.statusCode").should("eq", 200);
    });
    cy.get("#subscribe-success-message").should(($message) => {
      expect($message).to.contain("Your email is subscribed!");
    });
  });

  it("Rejects subscription if email exist.", () => {
    cy.visit("/subscribe");
    cy.intercept("POST", "/subscribers").as("request");

    cy.get("#subscribe-input").type("a.pranasakti@gmail.com");
    cy.get("#subscribe-submit-button").click();

    cy.wait("@request").then((req) => {
      cy.wrap(req).its("request.body.email").should("eq", "a.pranasakti@gmail.com");
      cy.wrap(req).its("response.statusCode").should("eq", 409);
    });
    cy.get("#subscribe-error-message").should(($message) => {
      expect($message).to.contain("Email already subscribed.");
    });
  });

  it("Rejects if email format is invalid", () => {
    cy.visit("/subscribe");

    cy.get("#subscribe-input").type("invalidemailformat");
    cy.get("#subscribe-submit-button").click();

    cy.get("#subscribe-email-message").should(($message) => {
      expect($message).to.contain("Email address is invalid.");
    });
  });
});
