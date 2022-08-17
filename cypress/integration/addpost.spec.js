import cy from "cypress";
describe("add post form",()=>{
  beforeEach(() => {
		cy.login('damon.debruyne@student.hogent.be', '12345678');
	});
it("add post", () => {
	cy.visit("http://localhost:3000/posts/:groupsId");

  cy.get("[data-cy=description_input]").type("test tekst");
	cy.get("[data-cy=submit_post]").click();

  cy.get("[data-cy=group_name]").eq(1).contains("test tekst");

  cy.get("[data-cy=group]").should("have.length", 2);
});
it("remove again", () => {
	cy.visit("http://localhost:3000/posts/:groupsId");
	cy.get("[data-cy=post_remove_btn]").eq(1).click();
  cy.get("[data-cy=post]").should("have.length", 1);
});
it("foutieve naam", () => {
  cy.visit("http://localhost:3000/posts/:groupsId");

  cy.get("[data-cy=description_input").type("x");
  cy.get("[data-cy=submit_post").click();

  cy.get("[data-cy=error").should("be.visible");
  cy.get("[data-cy=error").eq(0).contains("Min length is 5");
  
});

})