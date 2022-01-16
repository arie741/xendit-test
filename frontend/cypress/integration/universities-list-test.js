describe("Universities List", () => {
  it("Is page loaded", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.get("#search-form").should("exist");
  });

  it("Can search universities by name", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.get("#search-input-name").type("airlangga");
    cy.intercept("http://universities.hipolabs.com/*").as("request");
    cy.get("#search-submit-button").click();
    cy.get("#universities-list").should("exist");

    cy.wait("@request").its("request.url").should("contain", "name=airlangga");
    cy.get("#universities-list .text-xl").should(($message) => {
      expect($message).to.contain("Universitas Airlangga");
    });
  });

  it("Can search universities by country", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.get("#search-input-country").select("Afghanistan");
    cy.intercept("http://universities.hipolabs.com/*").as("request");
    cy.get("#search-submit-button").click();
    cy.get("#universities-list").should("exist");

    cy.wait("@request")
      .its("request.url")
      .should("contain", "country=Afghanistan");
    cy.get("#universities-list .text-xl").should(($message) => {
      expect($message).to.contain("Afghan University");
    });
  });

  it("Open new tab if university website is clicked", () => {
    cy.get("#universities-list > div a").each((item) => {
      cy.get(item).should("have.attr", "target", "_blank");
    });
  });
});
