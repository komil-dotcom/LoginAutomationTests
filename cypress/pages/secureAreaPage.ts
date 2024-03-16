// This is the landing page after user logs in
export class SecureAreaPage {
  elements = {
    get pageHeader() {
      return cy.findByRole("heading", { name: "Secure Area", level: 1 });
    },

    get pageSubHeader() {
      return cy.findByRole("heading", {
        name: /Welcome to the Secure Area/,
        level: 4,
      });
    },

    get logoutBtn() {
      return cy.findByRole("link", { name: "Logout" });
    },

    get breadcrumbNavigation() {
      return cy.findByRole("navigation", { name: /breadcrumb/ });
    },
  };
}
