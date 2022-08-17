import cy from "cypress";
describe("add group form",()=>{
  beforeEach(() => {
		cy.login('damon.debruyne@student.hogent.be', '12345678');
	});
it("add group", () => {
	cy.visit("http://localhost:3000/groups/");

  cy.get("[data-cy=name_input]").type("testgroup");
	cy.get("[data-cy=submit_group]").click();

  cy.get("[data-cy=group_name]").eq(1).contains("testgroup");

  cy.get("[data-cy=group]").should("have.length", 2);
});
it("remove again", () => {
	cy.visit("http://localhost:3000/groups/");
	cy.get("[data-cy=group_remove_btn]").eq(1).click();
  cy.get("[data-cy=group]").should("have.length", 1);
});
it("foutieve naam", () => {
  cy.visit("http://localhost:3000/groups/");

  cy.get("[data-cy=name_input").type("x");
  cy.get("[data-cy=submit_group").click();

  cy.get("[data-cy=error").should("be.visible");
  cy.get("[data-cy=error").eq(0).contains("Min length is 3");
  
});

})