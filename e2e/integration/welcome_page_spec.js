import { getTokenExpireAt } from '../../src/util/jwtHelper';
import { visitOptions } from '../support';

describe('Welcome page', () => {
  describe('No session welcome page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000', visitOptions);
    });
    
    it('should search for Norge in the welcome page search field', () => {
      cy.get('[data-cy=query]').type('Norge', { delay: 100 });
      cy.get('[data-cy=submit]').click();
      cy.location().should(location => {
        expect(location.hash).to.be.empty;
        expect(location.pathname).to.eq('/learningpaths');
        expect(location.search).to.not.be.empty;
        expect(location.search).to.eq('?page=1&query=Norge&sort=-relevance');
      });
    });

    it('should scroll on the link feature click', () => {
      cy.get('[data-cy=feature-link]').click();
      cy.hash().should('eq', '#feature');
    });

    it('should go to /login when not logged in on mypage link click', () => {
      cy.get('[data-cy=mypage-link]').click();
      cy.location().should(location => {
        expect(location.pathname).to.eq('/login');
      });
    });

    it('should change the language when locale select is changed', () => {
      cy.get('[data-cy=select-locale]').select('English');
      cy.location().should(location => {
        expect(location.pathname).to.eq('/en/');
      });
      cy
        .get('[data-cy=welcomepage-title1]')
        .should('contain', 'Learning paths');
      cy
        .get('[data-cy=welcomepage-title2]')
        .should('contain', 'The Norwegian Digital Learning Arena');
    });

    it('should go to /login when login link is clicked', () => {
      cy.get('[data-cy=sitenav-login]').click();
      cy.location().should(location => {
        expect(location.pathname).to.eq('/login');
      });
    });

    it('should go to /login when create learning path is clicked', () => {
      cy.get('[data-cy=sitenav-create-path]').click();
      cy.location().should(location => {
        expect(location.pathname).to.eq('/login');
      });
    });

    it('should go to /learningpaths when find learning paths is clicked', () => {
      cy.get('[data-cy=sitenav-find-paths]').click();
      cy.location().should(location => {
        expect(location.hash).to.be.empty;
        expect(location.pathname).to.eq('/learningpaths');
        expect(location.search).to.be.empty;
      });
    });
  });

  describe('Session welcome page', () => {
    beforeEach(() => {
      const options = {
        method: 'POST',
        url: 'https://ndla.eu.auth0.com/oauth/token',
        body: {
          client_id: Cypress.env('NDLA_END_TO_END_TESTING_CLIENT_ID'),
          client_secret: Cypress.env('NDLA_END_TO_END_TESTING_CLIENT_SECRET'),
          grant_type: Cypress.env('NDLA_END_TO_END_TESTING_GRANT_TYPE'),
          audience: Cypress.env('NDLA_END_TO_END_TESTING_AUDIENCE'),
        },
      };
      cy
        .request(options)
        .then(res => {
          window.localStorage.setItem(
            'ndla:sti',
            `{ "accessToken": { "token": "${
              res.body.access_token
            }", "expiresAt": ${getTokenExpireAt(
              res.body.access_token,
            )} }, "authenticated": true}`,
          )
        }).then(() => {
          cy.fixture('mineLearningpaths.json').then((learningPaths) => {
            cy.server()
            cy.route({
              method: 'GET',
              url: '**/mine/',
              response: learningPaths
            }).as('getMineLearningPaths');
            cy.route({
              method: 'OPTIONS',
              url: '**/mine/',
              status: 204,
              response: {}
            });
          });
          cy.visit('http://localhost:3000', visitOptions);
      });
    });

    it('should access /minside when create new learning path', () => {
      cy.get('[data-cy=sitenav-create-path]').click();
      cy.wait('@getMineLearningPaths');
      cy.location().should(location => {
        expect(location.pathname).to.eq('/minside');
      });
    });

    it('should go to /minside when logged in on mypage link click', () => {
      cy.get('[data-cy=mypage-link]').click();
      cy.wait('@getMineLearningPaths');
      cy.location().should(location => {
        expect(location.pathname).to.eq('/minside');
      });
    });

    it('should go to /logout when logut link is clicked', () => {
      cy.get('[data-cy=sitenav-logout]').click();
      cy.location().should(location => {
        expect(location.pathname).to.eq('/logout');
      });
    });
  });
});
