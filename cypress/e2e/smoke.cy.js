describe('HIIT&FLOW smoke', () => {
  it('runs access to stop flow', () => {
    cy.visit('/');
    cy.contains('Enter').click();
    cy.contains('Start').click();
    cy.contains('Pause').click();
    cy.contains('Resume').click();
    cy.get('button[aria-label="Stop"]').click();
    cy.contains('Start');
  });

  it('prevents premium selection and quick starts last prefs', () => {
    cy.visit('/');
    cy.contains('Enter').click();
    cy.contains('15 min').click();
    cy.contains('Premium – Coming soon');
    cy.contains('Quick Start').click();
    cy.contains('seconds');
  });
});
