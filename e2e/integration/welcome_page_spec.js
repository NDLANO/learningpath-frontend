import { getTokenExpireAt } from "../../src/util/jwtHelper";
import { savePersonalToken } from "../../src/sources/localStorage";
import { visitOptions } from "../support";
import { setToken } from "../support/auth";

describe("Welcome page", () => {
  describe("No session welcome page", () => {
    beforeEach(() => {
      cy.visit("/", visitOptions);
    });

    it("should search for Norge in the welcome page search field", () => {
      cy.get("[data-cy=query]").type("Norge", { delay: 100 });
      cy.get("[data-cy=submit]").click();
      cy.location().should((location) => {
        expect(location.hash).to.be.empty;
        expect(location.pathname).to.eq("/learningpaths");
        expect(location.search).to.not.be.empty;
        expect(location.search).to.eq("?page=1&query=Norge&sort=-relevance");
      });
    });

    it("should change the language when locale select is changed", () => {
      cy.get("[data-cy=select-locale]").select("English");
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/en/");
      });
      cy.get("[data-cy=welcomepage-title1]").should("contain", "Learning paths");
      cy.get("[data-cy=welcomepage-title2]").should("contain", "The Norwegian Digital Learning Arena");
    });

    it("should go to /minside when login link is clicked", () => {
      cy.get("[data-cy=sitenav-login]").click();
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/minside");
      });
    });
  });

  describe("Session welcome page", () => {
    beforeEach(() => {
      setToken();
      cy.fixture("mineLearningpaths.json").then((learningPaths) => {
        cy.server();
        cy.route({
          method: "GET",
          url: "**/mine/",
          response: learningPaths,
        }).as("getMineLearningPaths");
        cy.route({
          method: "OPTIONS",
          url: "**/mine/",
          status: 204,
          response: {},
        });
      });
      cy.visit("/", visitOptions);
    });

    it("should go to /logout when logut link is clicked", () => {
      cy.get("[data-cy=sitenav-logout]").click();
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/logout");
      });
    });
  });
});
