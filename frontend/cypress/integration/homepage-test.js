describe("Homepage test", () => {
    it("renders correctly", () => {
        cy.visit("/");
        cy.get("#search-form").should("exist")
    })
})