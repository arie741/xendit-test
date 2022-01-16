describe("Interface test", () => {
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

  beforeEach(() => {
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

  it("User can browse its favorites", () => {
    cy.visit("/favorite");
    cy.location("pathname").should("eq", "/favorite");
    cy.get("#favorites").should("exist");
    cy.get("#favorites-empty-message").should(
      "contain",
      "You have no favorite universities, add some!"
    );
  });

  it("User can add favorites", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.get("#search-input-country").select("Afghanistan");
    cy.intercept("http://universities.hipolabs.com/*").as("request");
    cy.get("#search-submit-button").click();
    cy.get("#universities-list").should("exist");

    cy.get("#university-item-0 .favorites-item").click();
    cy.get("#university-item-2 .favorites-item").click();

    cy.visit("/favorite")
    cy.location("pathname").should("eq", "/favorite");
    cy.get("#favorites").should("exist");
    cy.get("#favorites-item-0 > div > div.university-name").should("contain", "Afghan University")
    cy.get("#favorites-item-1 > div > div.university-name").should("contain", "Al-Birony University")
  });

  it("User can logout", () => {
      cy.visit("/");
      cy.location("pathname").should("eq", "/");
      cy.get("#logout-button").should("exist");
      cy.get("#logout-button").click();

      cy.get("#logout-button").should("not.exist");

      cy.window()
      .its("localStorage")
      .invoke("getItem", "xendit-email")
      .should("eq", null);
  })
});
