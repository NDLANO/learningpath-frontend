
describe('Login and logout actions', () => {
  describe('Login at learningpath with google user.', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });

    it('should go to /login when login link is clicked', () => {
      cy.get('[data-cy=sitenav-login]').click();
      cy.location().should(location => {
        expect(location.pathname).to.eq('/login');
      });
      cy.get('[data-cy=login-google-button]').click();
    });
  });
});
