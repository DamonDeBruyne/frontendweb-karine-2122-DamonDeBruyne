import cy from "cypress";
describe("mijn eerste test", () => {
	it("draait de applicatie", () => {
		cy.visit('http://localhost:3000')
		cy.get("h1").should("exist");
	});
	it("should login", () => {
		cy.login('damon.debruyne@student.hogent.be', '12345678');
	});
});
