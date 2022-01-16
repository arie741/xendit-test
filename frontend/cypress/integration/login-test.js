describe("Login Test", () => {
  before(() => {
    cy.writeFile(
      "../backend/public/mock_database/users.json",
      JSON.stringify([
        {
          uid: "as8asdydgas8",
          email: "a.pranasakti@gmail.com",
          password: "abcdef",
          favorites: [],
        },
      ]),
      "utf-8"
    );
  });
  it("Can log in with correct credentials", () => {
    cy.visit("/login");
    cy.location("pathname").should("eq", "/login");
    cy.intercept("post", "/users/auth").as("request");
    cy.get("#login-input-email").type("a.pranasakti@gmail.com");
    cy.get("#login-input-password").type("abcdef");
    cy.get("#login-submit-button").click();

    cy.wait("@request").then((req) => {
      cy.wrap(req).its("response.body").should("eq", true);
    });

    cy.location("pathname").should("eq", "/");
    cy.get("#logout-button").should("exist");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "xendit-email")
      .should("eq", "a.pranasakti@gmail.com");
  });

  it("Rejects log in with incorrect credentials", () => {
    cy.visit("/login");
    cy.location("pathname").should("eq", "/login");
    cy.intercept("post", "/users/auth").as("request");
    cy.get("#login-input-email").type("a.pranasakti@gmail.com");
    cy.get("#login-input-password").type("falsepassword");
    cy.get("#login-submit-button").click();

    cy.wait("@request").then((req) => {
      cy.wrap(req).its("response.body").should("eq", false);
    });

    cy.location("pathname").should("eq", "/login");
    cy.get("#logout-button").should("not.exist");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "xendit-email")
      .should("eq", null);
    cy.get("#error-message").should(($message) => {
      expect($message).to.contain("You put the wrong email or password.");
    });
  });

  it("Error shown if email format is invalid ", () => {
    cy.visit("/login");
    cy.location("pathname").should("eq", "/login");
    cy.get("#login-input-email").type("invalidemailformat");
    cy.get("#login-input-password").type("falsepassword");
    cy.get("#login-submit-button").click();
    cy.get("#error-email-message").should(($message) => {
      expect($message).to.contain("Email address is invalid.");
    });
  });
});
