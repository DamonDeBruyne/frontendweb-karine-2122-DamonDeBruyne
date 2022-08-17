import cy from "cypress";
describe("posts test", () => {
  beforeEach(() => {
		cy.login('damon.debruyne@student.hogent.be', '12345678');
	});
	it("show posts", () => {
		cy.intercept(
			"GET",
			"http://localhost:9000/api/posts/:groupsId",
			{ fixture: 'posts.json' }
		);

		cy.visit("http://localhost:3000");
		cy.get("[data-cy=post]").should("have.length", 1);
		cy.get("[data-cy=post_name]").eq(0).should("contain", "Damon De Bruyne");
    cy.get("[data-cy=post_date]").eq(0).should("contain", "2/4/2021 om 19:20");
    cy.get("[data-cy=post_description]").eq(0).should("contain", "dit is een post");
	});

  it("very slow response", () => {
    cy.intercept(
      "http://localhost:9000/api/posts/:groupsId",
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