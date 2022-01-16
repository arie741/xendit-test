describe("Registration Test", () => {
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

  const mockEmail = "testemail@gmail.com";
  const mockPassword = "abcde";

  it("Can register if email is not exist.", () => {
    cy.visit("/register");
    cy.intercept("POST", "/users").as("request");
    cy.get("#register-input-email").type(mockEmail);
    cy.get("#register-input-password").type(mockPassword);
    cy.get("#register-input-confirm-password").type(mockPassword);
    cy.get("#register-submit-button").click();

    cy.wait("@request").then((req) => {
      cy.wrap(req).its("request.body.email").should("eq", mockEmail);
      cy.wrap(req).its("request.body.password").should("eq", mockPassword);
      cy.wrap(req).its("response.statusCode").should("eq", 200);
    });
    cy.get("#register-success-message").should(($message) => {
      expect($message).to.contain("Your Account is Created! Login");
    });
  });

  it("Rejects registration if email exists.", () => {
    cy.visit("/register");
    cy.intercept("POST", "/api/register").as("request");
    cy.get("#register-input-email").type(mockEmail);
    cy.get("#register-input-password").type(mockPassword);
    cy.get("#register-input-confirm-password").type(mockPassword);
    cy.get("#register-submit-button").click();

    cy.get("#error-message").should(($message) => {
      expect($message).to.contain("Email already exists.");
    });
  });

  it("Rejects if email format is invalid", () => {
    cy.visit("/register");
    cy.get("#register-input-email").type("invalidemailformat");
    cy.get("#register-input-password").type(mockPassword);
    cy.get("#register-input-confirm-password").type(mockPassword);
    cy.get("#register-submit-button").click();

    cy.get("#error-email-message").should(($message) => {
      expect($message).to.contain("Email address is invalid.");
    });
  });

  it("Rejects if password and confirm password is not equal", () => {
    cy.visit("/register");
    cy.get("#register-input-email").type(mockEmail);
    cy.get("#register-input-password").type(mockPassword);
    cy.get("#register-input-confirm-password").type("invalidconfirmpassword");
    cy.get("#register-submit-button").click();

    cy.get("#error-message").should(($message) => {
      expect($message).to.contain("Your password doesn't match");
    });
  });
});
