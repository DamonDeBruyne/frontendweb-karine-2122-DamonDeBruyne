import cy from "cypress";
describe("groups test", () => {
  beforeEach(() => {
		cy.login('damon.debruyne@student.hogent.be', '12345678');
	});
	it("show groups", () => {
		cy.intercept(
			"GET",
			"http://localhost:9000/api/groups",
			{ fixture: 'groups.json' }
		);

		cy.visit("http://localhost:3000");
		cy.get("[data-cy=group]").should("have.length", 1);
		cy.get("[data-cy=group_name]").eq(0).should("contain", "groep 1");
	});

  it("very slow response", () => {
    cy.intercept(
      "http://localhost:9000/api/groups",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      }
    ).as("slowResponse");
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });
});
